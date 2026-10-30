
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { asanaService } from "../../services/apiService";
import AsanasPlayHero from "../../components/AsanasPlaySession/AsanasPlayHero";
import UpNextWithMiniAsanasPlayer from "../../components/AsanasPlaySession/UpNextWithMiniAsanasPlayer";

const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "";

export default function AsanasMeditation() {
  const searchParams = useSearchParams();
  const id = searchParams.get("asanaId");
  const durationMinutes = Number(searchParams.get("duration") || 0);
  const durationSeconds = Number.isFinite(durationMinutes) && durationMinutes > 0 ? durationMinutes * 60 : null;

  const [asana, setAsana] = useState(null);

  const [isLoading, setIsLoading] = useState(Boolean(id));
  const [activeTab, setActiveTab] = useState("audio");
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [totalSecs, setTotalSecs] = useState(0);

  useEffect(() => {
    if (!id) {
      setAsana(null);
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    async function fetchAsana() {
      try {
        setIsLoading(true);

        const response = await asanaService.getAsanaById(id);
        const data = response?.data ?? response;

        if (isMounted) {
          setAsana(data);
        }
      } catch (error) {
        console.error("Error fetching asana:", error);

        if (isMounted) {
          setAsana(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchAsana();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const mediaItems =
    activeTab === "audio"
      ? [
          ...(asana?.data?.audioSingleSessions || []).map((item) => ({
            ...item,
            mediaType: "AUDIO_SINGLE",
          })),
          ...(asana?.data?.audio_playlists || []).map((item) => ({
            ...item,
            mediaType: "AUDIO_PLAYLIST",
          })),
        ]
      : [
          ...(asana?.data?.videoSingleSessions || []).map((item) => ({
            ...item,
            mediaType: "VIDEO_SINGLE",
          })),
          ...(asana?.data?.video_playlists || []).map((item) => ({
            ...item,
            mediaType: "VIDEO_PLAYLIST",
          })),
        ];

  const getImageUrl = (item) => {
    const url =
      item?.thumbnail?.url ||
      item?.videos?.[0]?.thumbnail?.url ||
      item?.audios?.[0]?.thumbnail?.url;

    if (!url) return "";

    return url.startsWith("http") ? url : `${IMAGE_URL}${url}`;
  };

  const getDuration = (item) => {
    const seconds =
      item?.durationInSeconds ??
      item?.audios?.[0]?.durationInSeconds ??
      item?.videos?.[0]?.durationInSeconds;

    if (seconds != null) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;

      return minutes > 0
        ? `${minutes} min${remainingSeconds ? ` ${remainingSeconds} sec` : ""}`
        : `${remainingSeconds} sec`;
    }

    return item?.audios || item?.videos
      ? `${item.audios?.length ?? item.videos?.length ?? 0} items`
      : "Duration unavailable";
  };

  if (isLoading) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center">
        <div className="flex items-center gap-3 text-[#9A85FE]">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#9A85FE] border-t-transparent" />
          Loading asana details...
        </div>
      </main>
    );
  }

  if (!asana) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center px-6">
        <p className="text-gray-500">
          No asana found. Please check the asanaId parameter.
        </p>
      </main>
    );
  }

  // Show the selected media player
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

    <AsanasPlayHero
  sessionData={asana}
  asana={asana}
  selectedMedia={selectedMedia}
  selectedMediaId={selectedMedia?.documentId || selectedMedia?.id}
  mediaType={selectedMedia?.mediaType}
  playerKind={selectedMedia?.playerKind || activeTab}
  type="asanas"
  durationParam={durationSeconds}
  mode="timer"
  currentTrackIndex={currentTrackIndex}
  setCurrentTrackIndex={setCurrentTrackIndex}
  playing={playing}
  setPlaying={setPlaying}
  current={current}
  setCurrent={setCurrent}
  totalSecs={totalSecs}
  setTotalSecs={setTotalSecs}
/>

        <hr className="w-full border-t border-gray-200" />

        <UpNextWithMiniAsanasPlayer
          asana={asana}
          selectedMedia={selectedMedia}
          selectedMediaId={selectedMedia?.documentId || selectedMedia?.id}
          mediaType={selectedMedia?.mediaType}
          currentTrackIndex={currentTrackIndex}
          setCurrentTrackIndex={setCurrentTrackIndex}
          playing={playing}
          setPlaying={setPlaying}
          current={current}
          totalSecs={totalSecs}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF9FF] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Asana heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-[#9A85FE]">
            Your practice
          </p>

          <h1 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
            {asana.name}
          </h1>

          <p className="mt-3 max-w-2xl whitespace-pre-line text-sm leading-6 text-gray-600 sm:text-base">
            {asana.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {[asana.level, asana.element, asana.chakra]
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

        {/* Audio / Video tabs */}
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

        {/* List heading */}
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

        {/* Media list */}
        {mediaItems.length > 0 ? (
          <div className="space-y-4">
            {mediaItems.map((item, index) => {
              const isPlaylist = item.mediaType.endsWith("PLAYLIST");
              const imageUrl = getImageUrl(item);

              return (
                <button
                  key={`${item.mediaType}-${item.documentId || item.id || index}`}
                onClick={() => {
  setSelectedMedia({
    ...item,
    playerKind: activeTab,
  });

  setCurrentTrackIndex(0);
  setCurrent(0);
  setPlaying(false);
  setTotalSecs(0);
}}
                  className="group flex w-full items-center gap-4 rounded-2xl border border-gray-200 bg-white p-3 text-left transition hover:border-[#C5B7FF] hover:shadow-md sm:gap-5 sm:p-4"
                >
                  {/* Thumbnail */}
                  <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-[#F0ECFF] sm:h-24 sm:w-32">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={item.title || "Asana session"}
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

                  {/* Session details */}
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
              There are currently no {activeTab} sessions for this asana.
              Try the other tab.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}