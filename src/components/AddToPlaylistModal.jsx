"use client";

import { useState, useEffect } from "react";
import { X, Search, Plus, FolderHeart, Trash2, Check } from "lucide-react";
import { playlistService } from "../services/apiService";

export default function AddToPlaylistModal({
  dark = false,
  textColor = "#2B2621",
  audioId,
  profileDocId,
  isMudra = false,
  isVideo = false,
  onClose,
}) {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [newPlaylistTitle, setNewPlaylistTitle] = useState("");
  const [creatingLoading, setCreatingLoading] = useState(false);

  // Local Toast Notification
  const [toast, setToast] = useState(null);
  const showLocalToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  // Optimistic Undo Deletion State
  const [pendingDeletion, setPendingDeletion] = useState(null);

  const contentTypeVal = isMudra ? "mudra" : "nidra";

  const fetchPlaylists = async () => {
    try {
      let res;
      if (isVideo) {
        res = await playlistService.getUserVideoPlaylists(profileDocId);
      } else {
        res = await playlistService.getUserAudioPlaylists(profileDocId);
      }
      let rawList = res?.data || res;
      if (rawList && rawList.data) {
        rawList = rawList.data;
      }
      setPlaylists(Array.isArray(rawList) ? rawList : []);
    } catch (e) {
      console.warn("Failed to load user playlists:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (profileDocId) {
      fetchPlaylists();
    }
  }, [profileDocId, isVideo]);

  const executeDelete = async (playlistId) => {
    try {
      if (isVideo) {
        await playlistService.deleteVideoPlaylist(playlistId);
      } else {
        await playlistService.deleteAudioPlaylist(playlistId);
      }
      await fetchPlaylists();
    } catch (err) {
      console.warn("Failed to execute delete on server:", err);
      showLocalToast("Failed to delete playlist");
    }
  };

  const handleDeleteClick = (e, playlist) => {
    e.stopPropagation();
    const playlistId = playlist.documentId || playlist.id;

    if (pendingDeletion) {
      clearTimeout(pendingDeletion.timeoutId);
      executeDelete(pendingDeletion.id);
    }

    const timeoutId = setTimeout(() => {
      executeDelete(playlistId);
      setPendingDeletion(null);
    }, 4000);

    setPendingDeletion({
      id: playlistId,
      title: playlist.title,
      timeoutId,
    });
  };

  const handleUndoDelete = () => {
    if (!pendingDeletion) return;
    clearTimeout(pendingDeletion.timeoutId);
    const restoredTitle = pendingDeletion.title;
    setPendingDeletion(null);
    showLocalToast(`Restored "${restoredTitle}"`);
  };

  const handleCloseModal = () => {
    if (pendingDeletion) {
      clearTimeout(pendingDeletion.timeoutId);
      executeDelete(pendingDeletion.id);
      setPendingDeletion(null);
    }
    onClose();
  };

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    if (!newPlaylistTitle.trim()) return;
    setCreatingLoading(true);
    try {
      if (isVideo) {
        await playlistService.createVideoPlaylist(profileDocId, newPlaylistTitle.trim(), contentTypeVal);
      } else {
        await playlistService.createAudioPlaylist(profileDocId, newPlaylistTitle.trim(), contentTypeVal);
      }
      setNewPlaylistTitle("");
      setIsCreating(false);
      await fetchPlaylists();
    } catch (e) {
      console.warn("Failed to create playlist:", e);
    } finally {
      setCreatingLoading(false);
    }
  };

  const handleToggleItem = async (playlist) => {
    const playlistId = playlist.documentId || playlist.id;
    const itemsList = isVideo ? (playlist.videos || []) : (playlist.audios || []);
    const isAdded = itemsList.some(x => 
      (x.documentId && audioId && x.documentId === audioId) || 
      (x.id && audioId && String(x.id) === String(audioId))
    );

    try {
      if (isVideo) {
        if (isAdded) {
          await playlistService.removeVideosFromPlaylist(playlistId, [audioId]);
          showLocalToast(`Removed from "${playlist.title}"`);
        } else {
          await playlistService.addVideosToPlaylist(playlistId, [audioId]);
          showLocalToast(`Added to "${playlist.title}"`);
        }
      } else {
        if (isAdded) {
          await playlistService.removeAudiosFromPlaylist(playlistId, [audioId]);
          showLocalToast(`Removed from "${playlist.title}"`);
        } else {
          await playlistService.addAudiosToPlaylist(playlistId, [audioId]);
          showLocalToast(`Added to "${playlist.title}"`);
        }
      }
      await fetchPlaylists();
    } catch (e) {
      console.warn("Failed to toggle playlist item:", e);
      showLocalToast("Action failed");
    }
  };

  const filteredPlaylists = playlists.filter((p) => {
    const playlistId = p.documentId || p.id;
    if (pendingDeletion && pendingDeletion.id === playlistId) return false;
    return p.title?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm"
      onClick={handleCloseModal}
    >
      <div
        className="relative w-full max-w-md md:max-w-lg rounded-[32px] px-7 py-7 flex flex-col min-h-[480px] max-h-[85vh] shadow-2xl"
        style={{
          backgroundColor: dark ? "#1f2937" : "#ffffff",
          color: dark ? "#ffffff" : "#2B2621",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleCloseModal}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          style={{ color: dark ? "#9ca3af" : "#6B6659" }}
        >
          <X size={22} />
        </button>

        {/* Title */}
        <div className="mb-5">
          <h3 className="text-2xl font-bold" style={{ color: dark ? "#f3f4f6" : "#2B2621" }}>
            Add to playlist
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Click on any playlist to save or remove this session
          </p>
        </div>

        {/* Search */}
        <div
          className="flex items-center gap-2.5 rounded-2xl px-4 py-3 mb-4 border transition-colors"
          style={{
            borderColor: dark ? "#374151" : "#E9E3D6",
            backgroundColor: dark ? "#111827" : "#FBF9F5",
          }}
        >
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Find a playlist"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-400"
            style={{ color: dark ? "#ffffff" : "#2B2621" }}
          />
        </div>

        {/* Create playlist section */}
        {isCreating ? (
          <form onSubmit={handleCreatePlaylist} className="flex flex-col gap-2.5 mb-4 p-4 rounded-2xl border" style={{ borderColor: dark ? "#374151" : "#E9E3D6" }}>
            <input
              type="text"
              placeholder="Playlist name"
              value={newPlaylistTitle}
              onChange={(e) => setNewPlaylistTitle(e.target.value)}
              className="bg-transparent border-none outline-none text-sm px-2 py-2 w-full border-b"
              style={{
                color: dark ? "#ffffff" : "#2B2621",
                borderColor: dark ? "#374151" : "#E9E3D6",
              }}
              autoFocus
            />
            <div className="flex gap-2 justify-end mt-1">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold border"
                style={{ borderColor: dark ? "#4b5563" : "#d1d5db" }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={creatingLoading}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white"
                style={{ backgroundColor: "#9A85FE" }}
              >
                {creatingLoading ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-3.5 w-full p-3.5 rounded-2xl mb-4 hover:scale-[1.01] transition-transform text-left"
            style={{ backgroundColor: dark ? "#2d3748" : "#EDE7FE" }}
          >
            <span className="w-9 h-9 rounded-xl bg-[#9A85FE] text-white flex items-center justify-center">
              <Plus size={18} />
            </span>
            <span className="text-sm font-semibold text-[#9A85FE]">
              Create new playlist
            </span>
          </button>
        )}

        {/* Playlists List */}
        <p className="text-[11px] uppercase font-bold tracking-wider text-gray-400 mb-2.5">
          Your Playlists
        </p>

        <div className="flex-1 overflow-y-auto max-h-72 md:max-h-80 pr-1 space-y-2.5 mb-4 scrollbar-thin">
          {loading ? (
            <div className="py-10 text-center text-xs text-gray-400">Loading playlists...</div>
          ) : filteredPlaylists.length === 0 ? (
            <div className="py-10 text-center text-xs text-gray-400">No playlists found</div>
          ) : (
            filteredPlaylists.map((item) => {
              const playlistId = item.documentId || item.id;
              const itemsList = isVideo ? (item.videos || []) : (item.audios || []);
              const isAdded = itemsList.some(x => 
                (x.documentId && audioId && x.documentId === audioId) || 
                (x.id && audioId && String(x.id) === String(audioId))
              );

              return (
                <div
                  key={playlistId}
                  onClick={() => handleToggleItem(item)}
                  className="flex items-center justify-between p-3.5 rounded-2xl cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors border"
                  style={{ borderColor: dark ? "#374151" : "#F3F4F6" }}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="w-9 h-9 rounded-xl bg-slate-800 text-white flex items-center justify-center">
                      <FolderHeart size={18} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold truncate" style={{ color: dark ? "#f3f4f6" : "#2B2621" }}>
                        {item.title}
                      </p>
                      <span className="inline-block text-[10px] font-semibold text-[#9A85FE] bg-[#EDE7FE] dark:bg-purple-950/40 px-2 py-0.5 rounded-full mt-0.5">
                        {itemsList.length} {isVideo ? (itemsList.length === 1 ? "video" : "videos") : (itemsList.length === 1 ? "audio" : "audios")}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => handleDeleteClick(e, item)}
                      className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-500/10 transition-colors"
                      title="Delete playlist"
                    >
                      <Trash2 size={16} />
                    </button>
                    <span
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                        isAdded ? "bg-[#9A85FE] border-[#9A85FE]" : "border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      {isAdded && <Check size={12} className="text-white" />}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Done button */}
        <button
          onClick={handleCloseModal}
          className="w-full py-3.5 rounded-2xl text-sm font-semibold text-white shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all mt-auto"
          style={{ backgroundColor: "#9A85FE" }}
        >
          Done
        </button>

        {/* Toast Message */}
        {toast && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-50 bg-[#9A85FE] text-white text-xs px-4 py-2 rounded-full shadow-lg font-semibold whitespace-nowrap">
            {toast}
          </div>
        )}

        {/* Floating Undo Banner for Playlist Deletion */}
        {pendingDeletion && (
          <div className="absolute bottom-20 left-6 right-6 z-50 flex items-center justify-between bg-[#2B2621] text-white px-4 py-3 rounded-2xl shadow-2xl border border-white/10 animate-fade-in">
            <span className="text-xs truncate">
              Deleted <strong>"{pendingDeletion.title}"</strong>
            </span>
            <button
              onClick={handleUndoDelete}
              className="text-xs font-bold text-[#9A85FE] hover:text-[#b4a3fe] flex-shrink-0 ml-3 px-3 py-1 bg-white/10 rounded-xl transition-colors"
            >
              Undo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
