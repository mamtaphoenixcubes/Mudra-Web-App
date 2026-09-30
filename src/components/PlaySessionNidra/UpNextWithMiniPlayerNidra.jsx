"use client";

import { useState, useRef, useEffect } from "react";
import {
  Music,
  MoreHorizontal,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  PlayCircle,
  Download,
  Trash2,
  ListPlus,
} from "lucide-react";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

// ─── Config ─────────────────────────────────────────────────────────────────

const ROW_MENU_OPTIONS = [
  { key: "playNext", label: "Play Next", icon: PlayCircle },
  { key: "download", label: "Download", icon: Download },
  { key: "addToPlaylist", label: "Add to Playlist", icon: ListPlus },
  { key: "remove", label: "Remove from Up Next", icon: Trash2, danger: true },
];

// ─── Row Options Menu (three-dot dropdown) ─────────────────────────────────
function RowOptionsMenu({ item, dark, onSelect, onClose }) {
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-full mt-1.5 w-52 rounded-2xl shadow-xl border overflow-hidden z-50"
      style={{
        backgroundColor: dark ? "#1f2937" : "#ffffff",
        borderColor: dark ? "#374151" : "#E9E3D6",
      }}
    >
      <div className="py-1.5">
        {ROW_MENU_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          return (
            <button
              key={opt.key}
              onClick={() => {
                onSelect(opt.key, item);
                onClose();
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] hover:bg-black/5 transition-colors"
              style={{
                color: opt.danger ? "#C4744E" : dark ? "#e5e7eb" : "#3A362E",
              }}
            >
              <Icon size={15} />
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Up Next Row ────────────────────────────────────────────────────────────
function UpNextRow({ item, isLast, dark, textColor, menuOpenId, setMenuOpenId, onOptionSelect }) {
  const isMenuOpen = menuOpenId === item.id;

  return (
    <div
      className="relative flex items-center gap-3 md:gap-4 px-4 md:px-5 py-4"
      style={{
        borderBottom: isLast ? "none" : `1px solid ${dark ? "#374151" : "#EDEBE4"}`,
      }}
    >
      <span
        className="w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: dark ? "#374151" : "#EDE7FE" }}
      >
        <Music size={18} style={{ color: "#9A85FE" }} />
      </span>

      <div className="flex-1 min-w-0">
        <p
          className={`${typography.playerAboutTitle} truncate`}
          style={{ color: textColor, fontWeight: 500 }}
        >
          {item.title}
        </p>
        <p
          className="text-[12px] md:text-[13px] mt-1 flex items-center gap-1.5"
          style={{ color: dark ? "#9ca3af" : "#8A8577" }}
        >
          {item.duration}
          <span aria-hidden="true">·</span>
          {item.mode}
        </p>
      </div>

      <div className="relative flex-shrink-0">
        <button
          onClick={() => setMenuOpenId(isMenuOpen ? null : item.id)}
          aria-label={`More options for ${item.title}`}
          aria-expanded={isMenuOpen}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors"
        >
          <MoreHorizontal size={18} style={{ color: dark ? "#9ca3af" : "#8A8577" }} />
        </button>

        {isMenuOpen && (
          <RowOptionsMenu
            item={item}
            dark={dark}
            onSelect={onOptionSelect}
            onClose={() => setMenuOpenId(null)}
          />
        )}
      </div>
    </div>
  );
}

// ─── Up Next Section ────────────────────────────────────────────────────────
export function UpNextSection({ items = [], onViewPlaylist, onOptionSelect }) {
  const { dark, textColor } = useTheme();
  const [menuOpenId, setMenuOpenId] = useState(null);

  function handleOptionSelect(key, item) {
    onOptionSelect?.(key, item);
  }

  return (
    <div className={spacing.sectionPaddingX}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <h2 className={`${typography.playerHeading}`} style={{ color: textColor }}>
          Up Next
        </h2>
        <button
          onClick={onViewPlaylist}
          className="flex items-center gap-1 text-[13px] md:text-[14px] font-medium hover:opacity-70 transition-opacity"
          style={{ color: "#9A85FE" }}
        >
          View Playlist
          <span aria-hidden="true">›</span>
        </button>
      </div>

      {/* List card */}
      <div
        className="rounded-[20px] border overflow-visible"
        style={{
          backgroundColor: dark ? "#1f2937" : "#ffffff",
          borderColor: dark ? "#374151" : "#E9E3D6",
        }}
      >
        {items.map((item, i) => (
          <UpNextRow
            key={item.id}
            item={item}
            isLast={i === items.length - 1}
            dark={dark}
            textColor={textColor}
            menuOpenId={menuOpenId}
            setMenuOpenId={setMenuOpenId}
            onOptionSelect={handleOptionSelect}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Mini Player Bar (sticky bottom) ───────────────────────────────────────
export function MiniPlayerBar({
  title = "",
  current = "00:00",
  total = "00:00",
  playing: playingProp,
  onTogglePlay,
  onPrev,
  onNext,
}) {
  const { dark, textColor } = useTheme();
  const [localPlaying, setLocalPlaying] = useState(false);

  const isControlled = playingProp !== undefined;
  const playing = isControlled ? playingProp : localPlaying;

  function handleToggle() {
    if (onTogglePlay) onTogglePlay();
    if (!isControlled) setLocalPlaying((p) => !p);
  }

  return (
    <div
      className="sticky bottom-0 left-0 right-0 z-30 border-t"
      style={{
        backgroundColor: dark ? "#1f2937" : "#ffffff",
        borderColor: dark ? "#374151" : "#E9E3D6",
      }}
    >
      <div
        className={`${spacing.sectionPaddingX} flex items-center justify-between gap-3 py-3 md:py-4`}
      >
        {/* Track info */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <span
            className="w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: dark ? "#374151" : "#EDE7FE" }}
          >
            <Music size={18} style={{ color: "#9A85FE" }} />
          </span>
          <div className="min-w-0">
            <p
              className={`${typography.playerAboutTitle} truncate`}
              style={{ color: textColor, fontWeight: 500 }}
            >
              {title}
            </p>
            <p className="text-[12px] md:text-[13px] mt-0.5" style={{ color: dark ? "#9ca3af" : "#8A8577" }}>
              {current} / {total}
            </p>
          </div>
        </div>

        {/* Transport controls */}
        <div className="flex items-center gap-4 md:gap-5 flex-shrink-0">
          <button
            onClick={onPrev}
            aria-label="Previous"
            style={{ color: textColor }}
            className="hover:scale-110 transition-transform"
          >
            <SkipBack size={20} fill="currentColor" />
          </button>
          <button
            onClick={handleToggle}
            aria-label={playing ? "Pause" : "Play"}
            className="w-11 h-11 md:w-12 md:h-12 rounded-full text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-md"
            style={{ backgroundColor: dark ? "#374151" : "#3A362E" }}
          >
            {playing ? (
              <Pause size={18} fill="white" />
            ) : (
              <Play size={18} fill="white" className="ml-0.5" />
            )}
          </button>
          <button
            onClick={onNext}
            aria-label="Next"
            style={{ color: textColor }}
            className="hover:scale-110 transition-transform"
          >
            <SkipForward size={20} fill="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Combined default export ───────────────────────────────────────────────
export default function UpNextWithMiniPlayer({
  playlistTracks = [],
  currentTrackIndex = 0,
  setCurrentTrackIndex,
  playing = false,
  setPlaying,
  current = 0,
  totalSecs = 0,
}) {
  const { dark } = useTheme();

  const activeTrack = playlistTracks[currentTrackIndex] || playlistTracks[0];

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return "00:00";
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = Math.floor(secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleTogglePlay = () => {
    if (setPlaying) setPlaying(!playing);
  };

  const handlePrev = () => {
    if (playlistTracks.length > 1 && setCurrentTrackIndex) {
      const prevIdx = (currentTrackIndex - 1 + playlistTracks.length) % playlistTracks.length;
      setCurrentTrackIndex(prevIdx);
      if (setPlaying) setPlaying(true);
    }
  };

  const handleNext = () => {
    if (playlistTracks.length > 1 && setCurrentTrackIndex) {
      const nextIdx = (currentTrackIndex + 1) % playlistTracks.length;
      setCurrentTrackIndex(nextIdx);
      if (setPlaying) setPlaying(true);
    }
  };

  const handleOptionSelect = (key, item) => {
    if (key === "playNext" || key === "playNext") {
      const idx = playlistTracks.findIndex((t) => t.id === item.id);
      if (idx !== -1 && setCurrentTrackIndex) {
        setCurrentTrackIndex(idx);
        if (setPlaying) setPlaying(true);
      }
    }
  };

  // Convert playlistTracks to UP_NEXT items format
  const items = playlistTracks.map((track) => ({
    id: track.id,
    title: track.title,
    duration: track.durationInSeconds ? `${Math.floor(track.durationInSeconds / 60)} min` : "15 min",
    mode: "Audio",
  }));

  return (
    <div
      className="w-full pb-2 flex flex-col justify-between"
      style={{ backgroundColor: dark ? "#111827" : "#ffffff" }}
    >
      {items.length > 0 && (
        <div className="pt-6 md:pt-8 pb-6">
          <UpNextSection
            items={items}
            onViewPlaylist={() => {}}
            onOptionSelect={handleOptionSelect}
          />
        </div>
      )}

      {activeTrack && (
        <MiniPlayerBar
          title={activeTrack.title}
          current={formatTime(current)}
          total={formatTime(totalSecs)}
          playing={playing}
          onTogglePlay={handleTogglePlay}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}