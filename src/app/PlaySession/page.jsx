"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense, useCallback } from "react";
import { yogaNidraService, mudraService } from "../../services/apiService";
import UpNextWithMiniPlayer from "../../components/PlaySession/UpNextWithMiniPlayer";
import SessionPlayerHero from "../../components/PlaySession/SessionPlayerHero";
import SessionPlayerHeroNidra from "../../components/PlaySessionNidra/SessionPlayerHeroNidra";

function PlaySessionContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "ui2phqjaaqub5r1k38gkppko";
  const type = searchParams.get("type") || "yoganidra";
  const mode = searchParams.get("mode") || "guided";
  const durationParam = searchParams.get("duration"); // e.g. "300" (seconds)
  
  const [detailData, setDetailData] = useState(null);
  const isMudra = type === "mudra";

  const getProfileDocId = () => {
    if (typeof window !== "undefined") {
      try {
        const userObjStr = localStorage.getItem("user");
        if (userObjStr) {
          const userObj = JSON.parse(userObjStr);
          if (userObj && userObj.id) {
            return userObj.id;
          }
        }
      } catch (e) {
        console.error("Error reading user from localStorage:", e);
      }
    }
    return null;
  };
  const loggedInProfileDocId = getProfileDocId() || "nh0p1vtynpr7mge2orest5mt";

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [totalSecs, setTotalSecs] = useState(0);
  const [activeTab, setActiveTab] = useState("audio");
  const [selectedMedia, setSelectedMedia] = useState(null);

  const setMudraViewsIfNeeded = useCallback(async (mudraData) => {
    if (!isMudra || !mudraData) return;
    const docId = mudraData.documentId || mudraData.id;
    if (docId) {
      try {
        await mudraService.incrementMudraView(docId, loggedInProfileDocId);
      } catch (vErr) {
        console.warn("Failed to increment mudra view count on play session:", vErr);
      }
    }
  }, [isMudra, loggedInProfileDocId]);

  useEffect(() => {
    async function loadDetail() {
      try {
        let json;
        if (isMudra) {
          json = await mudraService.getMudraDetail(id, loggedInProfileDocId);
        } else {
          json = await yogaNidraService.getYogaNidraById(id, loggedInProfileDocId);
        }
        let finalData = null;
        if (json && json.success && json.data) {
          finalData = json.data;
        } else if (json && json.data) {
          finalData = json.data;
        } else if (json) {
          finalData = json;
        }
        if (finalData && finalData.data) {
          finalData = finalData.data;
        }
        setMudraViewsIfNeeded(finalData);
        setDetailData(finalData);
      } catch (err) {
        console.warn("Failed fetching session detail for player, using fallbacks:", err);
      }
    }
    if (id) {
      loadDetail();
    }
  }, [id, loggedInProfileDocId, isMudra, setMudraViewsIfNeeded]);

  const actualData = detailData?.data || detailData;

  // Resolve playlist tracks dynamically based on Mudra/Yoga Nidra schema structure
  const playlistTracks = isMudra
    ? (
        actualData?.mediaType === "AUDIO_SINGLE"
          ? (actualData?.audioSingleSessions || [])
          : actualData?.mediaType === "AUDIO_PLAYLIST"
            ? (actualData?.audio_playlists?.[0]?.audios || actualData?.audio_playlists || [])
            : actualData?.mediaType === "VIDEO_SINGLE"
              ? (actualData?.videoSingleSessions || [])
              : actualData?.mediaType === "VIDEO_PLAYLIST"
                ? (actualData?.video_playlists?.[0]?.videos || actualData?.video_playlists || [])
                : []
      )
    : (
        (actualData?.AudioSingleSessions && actualData.AudioSingleSessions.length > 0)
          ? actualData.AudioSingleSessions
          : (actualData?.AudioPlaylist?.[0]?.audios || [])
      );

  const mediaItems =
    activeTab === "audio"
      ? [
          ...(actualData?.audioSingleSessions || []).map((item) => ({ ...item, mediaType: "AUDIO_SINGLE" })),
          ...(actualData?.audio_playlists || []).map((item) => ({ ...item, mediaType: "AUDIO_PLAYLIST" })),
        ]
      : [
          ...(actualData?.videoSingleSessions || []).map((item) => ({ ...item, mediaType: "VIDEO_SINGLE" })),
          ...(actualData?.video_playlists || []).map((item) => ({ ...item, mediaType: "VIDEO_PLAYLIST" })),
        ];

  const getImageUrl = (item) => {
    const url =
      item?.thumbnail?.url ||
      item?.videos?.[0]?.thumbnail?.url ||
      item?.audios?.[0]?.thumbnail?.url ||
      item?.coverImage?.url ||
      item?.image?.url;

    if (!url) return "";
    return url.startsWith("http") ? url : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${url}`;
  };

  const getDuration = (item) => {
    const seconds =
      item?.durationInSeconds ??
      item?.audios?.[0]?.durationInSeconds ??
      item?.videos?.[0]?.durationInSeconds ??
      item?.duration ??
      item?.audioDuration ??
      item?.videoDuration;

    if (seconds != null) {
      const minutes = Math.floor(Number(seconds) / 60);
      const remainingSeconds = Number(seconds) % 60;
      return minutes > 0
        ? `${minutes} min${remainingSeconds ? ` ${remainingSeconds} sec` : ""}`
        : `${remainingSeconds} sec`;
    }

    return item?.audios || item?.videos
      ? `${item.audios?.length ?? item.videos?.length ?? 0} items`
      : "Duration unavailable";
  };

  const effectivePlaylistTracks = selectedMedia
    ? selectedMedia.mediaType?.endsWith("PLAYLIST")
      ? (selectedMedia.audios || selectedMedia.videos || [])
      : [selectedMedia]
    : playlistTracks;

  if (selectedMedia) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-6xl px-4 pt-6">
          <button
            onClick={() => {
              setSelectedMedia(null);
              setCurrentTrackIndex(0);
              setCurrent(0);
              setPlaying(false);
              setTotalSecs(0);
            }}
            className="mb-5 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            ← Back to media
          </button>
        </div>

        {isMudra ? (
          <SessionPlayerHero
            sessionData={detailData}
            type={type}
            mode={mode}
            durationParam={durationParam}
            currentTrackIndex={currentTrackIndex}
            setCurrentTrackIndex={setCurrentTrackIndex}
            playing={playing}
            setPlaying={setPlaying}
            current={current}
            setCurrent={setCurrent}
            totalSecs={totalSecs}
            setTotalSecs={setTotalSecs}
            playlistTracks={effectivePlaylistTracks}
          />
        ) : (
          <SessionPlayerHeroNidra
            sessionData={detailData}
            type={type}
            mode={mode}
            durationParam={durationParam}
            currentTrackIndex={currentTrackIndex}
            setCurrentTrackIndex={setCurrentTrackIndex}
            playing={playing}
            setPlaying={setPlaying}
            current={current}
            setCurrent={setCurrent}
            totalSecs={totalSecs}
            setTotalSecs={setTotalSecs}
            playlistTracks={effectivePlaylistTracks}
          />
        )}

        {effectivePlaylistTracks && effectivePlaylistTracks.length > 0 && (
          <UpNextWithMiniPlayer
            playlistTracks={effectivePlaylistTracks}
            currentTrackIndex={currentTrackIndex}
            setCurrentTrackIndex={setCurrentTrackIndex}
            playing={playing}
            setPlaying={setPlaying}
            current={current}
            totalSecs={totalSecs}
          />
        )}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF9FF] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-[#9A85FE]">
            Your practice
          </p>
          <h1 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
            {actualData?.name || actualData?.title || "Session"}
          </h1>
          <p className="mt-3 max-w-2xl whitespace-pre-line text-sm leading-6 text-gray-600 sm:text-base">
            {actualData?.description || actualData?.aboutSession || "Select a session to begin your practice."}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {[actualData?.level, actualData?.element, actualData?.chakra]
              .filter(Boolean)
              .map((value) => (
                <span
                  key={value}
                  className="rounded-full bg-white px-4 py-2 text-xs font-medium text-gray-600 ring-1 ring-gray-200"
                >
                  {value}
                </span>
              ))}
          </div>
        </div>

        <div className="mb-6 flex rounded-2xl bg-gray-100 p-1.5">
          {[
            { key: "audio", label: "Audio sessions", icon: "♫" },
            { key: "video", label: "Video sessions", icon: "▶" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setCurrentTrackIndex(0);
                setCurrent(0);
                setPlaying(false);
                setTotalSecs(0);
              }}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition sm:text-base ${
                activeTab === tab.key
                  ? "bg-white text-[#8065EE] shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {activeTab === "audio" ? "Audio library" : "Video library"}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Choose a session to begin your practice.
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-white px-3 py-1.5 text-sm text-gray-500 ring-1 ring-gray-200">
            {mediaItems.length} sessions
          </span>
        </div>

        {mediaItems.length > 0 ? (
          <div className="space-y-4">
            {mediaItems.map((item, index) => {
              const isPlaylist = item.mediaType.endsWith("PLAYLIST");
              const imageUrl = getImageUrl(item);

              return (
                <button
                  key={`${item.mediaType}-${item.documentId || item.id || index}`}
                  onClick={() => {
                    setSelectedMedia(item);
                    setCurrentTrackIndex(0);
                    setCurrent(0);
                    setPlaying(false);
                    setTotalSecs(0);
                  }}
                  className="group flex w-full items-center gap-4 rounded-2xl border border-gray-200 bg-white p-3 text-left transition hover:border-[#C5B7FF] hover:shadow-md sm:gap-5 sm:p-4"
                >
                  <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-[#F0ECFF] sm:h-24 sm:w-32">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={item.title || "Session"}
                        width={160}
                        height={120}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-3xl text-[#9A85FE]">
                        {activeTab === "audio" ? "♫" : "▶"}
                      </div>
                    )}

                    <span className="absolute inset-0 flex items-center justify-center bg-black/10 transition group-hover:bg-black/20">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#8065EE] shadow">
                        {activeTab === "audio" ? "♫" : "▶"}
                      </span>
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#F0ECFF] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#8065EE]">
                        {isPlaylist ? "Playlist" : "Single session"}
                      </span>
                    </div>

                    <h3 className="truncate text-sm font-semibold text-gray-900 sm:text-base">
                      {item.title || "Untitled session"}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                      {getDuration(item)}
                    </p>

                    {isPlaylist && (
                      <p className="mt-1 text-xs text-gray-400">
                        {activeTab === "audio"
                          ? `${item.audios?.length ?? 0} tracks`
                          : `${item.videos?.length ?? 0} videos`}
                      </p>
                    )}
                  </div>

                  <span className="shrink-0 text-xl text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#8065EE]">
                    →
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
            <div className="mb-4 text-4xl text-[#9A85FE]">
              {activeTab === "audio" ? "♫" : "▶"}
            </div>
            <h3 className="font-semibold text-gray-800">
              No {activeTab} sessions available
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              There are currently no {activeTab} sessions for this session. Try the other tab.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default function PlaySession() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Session Player...</div>}>
      <PlaySessionContent />
    </Suspense>
  );
}
