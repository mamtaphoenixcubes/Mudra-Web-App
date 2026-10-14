"use client";

import {
  Music,
  MoreHorizontal,
  SkipBack,
  Play,
  Pause,
  SkipForward,
} from "lucide-react";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

// ─── Static placeholder data ────────────────────────────────────────────────
const UP_NEXT_ITEMS = [
  { id: 1, title: "Deep Sleep Yoga Nidra", duration: "30 min", mode: "Audio" },
  { id: 2, title: "Morning Pranayama Flow", duration: "15 min", mode: "Audio" },
  { id: 3, title: "Root Chakra Grounding", duration: "20 min", mode: "Audio" },
  { id: 4, title: "Evening Body Scan", duration: "25 min", mode: "Audio" },
];

// ─── Up Next Row (clickable) ─────────────────────────────────────
function UpNextRow({ item, isLast, dark, textColor, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(item)}
      className="relative flex w-full items-center gap-3 md:gap-4 px-4 md:px-5 py-4 text-left"
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
        <span
          aria-label={`More options for ${item.title}`}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors"
        >
          <MoreHorizontal size={18} style={{ color: dark ? "#9ca3af" : "#8A8577" }} />
        </span>
      </div>
    </button>
  );
}

// ─── Up Next Section (clickable) ─────────────────────────────────
export function UpNextSection({ items = UP_NEXT_ITEMS, onSelectTrack }) {
  const { dark, textColor } = useTheme();

  return (
    <div className={spacing.sectionPaddingX}>
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <h2 className={`${typography.playerHeading}`} style={{ color: textColor }}>
          Up Next
        </h2>
        <button
          type="button"
          className="flex items-center gap-1 text-[13px] md:text-[14px] font-medium hover:opacity-70 transition-opacity"
          style={{ color: "#9A85FE" }}
        >
          View Playlist
          <span aria-hidden="true">›</span>
        </button>
      </div>

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
            onSelect={onSelectTrack}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Mini Player Bar (bound to current selection) ─────────────────────────
export function MiniPlayerBar({
  title = "Deep Sleep Yoga Nidra",
  current = "00:00",
  total = "30:00",
  playing = false,
  onTogglePlay,
  onPrev,
  onNext,
}) {
  const { dark, textColor } = useTheme();

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
            <p
              className="text-[12px] md:text-[13px] mt-0.5"
              style={{ color: dark ? "#9ca3af" : "#8A8577" }}
            >
              {current} / {total}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-5 flex-shrink-0">
          <button
            type="button"
            aria-label="Previous"
            onClick={onPrev}
            style={{ color: textColor }}
            className="hover:scale-110 transition-transform"
          >
            <SkipBack size={20} fill="currentColor" />
          </button>
          <button
            type="button"
            aria-label={playing ? "Pause" : "Play"}
            onClick={onTogglePlay}
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
            type="button"
            aria-label="Next"
            onClick={onNext}
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

// ─── Combined default export ─────────────────────────
export default function UpNextWithMiniAsanasPlayer({
  asana = null,
  selectedMedia = null,
  selectedMediaId = null,
  mediaType = null,
  playlistTracks = [],
  currentTrackIndex = 0,
  setCurrentTrackIndex,
  playing = false,
  setPlaying,
  current = 0,
  totalSecs = 0,
}) {
  const { dark } = useTheme();
  const resolvedMediaType = mediaType || selectedMedia?.mediaType || null;

  const dataTracks = playlistTracks.length > 0
    ? playlistTracks
    : (() => {
        if (!selectedMedia && !asana) return [];
        const data = asana?.data || asana || {};

        if (resolvedMediaType === "AUDIO_SINGLE" || resolvedMediaType === "VIDEO_SINGLE") {
          return [selectedMedia].filter(Boolean);
        }

        if (resolvedMediaType === "AUDIO_PLAYLIST") {
          return [...(selectedMedia?.audios || data?.audio_playlists?.[0]?.audios || [])];
        }

        if (resolvedMediaType === "VIDEO_PLAYLIST") {
          return [...(selectedMedia?.videos || data?.video_playlists?.[0]?.videos || [])];
        }

        return [];
      })();

  const items = dataTracks.map((track, idx) => ({
    id: track?.documentId || track?.id || idx,
    title: track?.title || selectedMedia?.title || "Session",
    duration: track?.durationInSeconds ? `${Math.floor(track.durationInSeconds / 60)} min` : "15 min",
    mode: (resolvedMediaType === "VIDEO_SINGLE" || resolvedMediaType === "VIDEO_PLAYLIST") ? "Video" : "Audio",
  }));

  const activeTrack = dataTracks[currentTrackIndex] || dataTracks[0];

  const handleSelectTrack = (item) => {
    if (!setCurrentTrackIndex || dataTracks.length === 0) return;
    const nextIndex = dataTracks.findIndex((track) => {
      const currentId = track?.documentId || track?.id;
      return String(currentId) === String(item.id);
    });

    if (nextIndex !== -1) {
      setCurrentTrackIndex(nextIndex);
      if (setPlaying) setPlaying(true);
    }
  };

  const handlePrev = () => {
    if (dataTracks.length > 1 && setCurrentTrackIndex) {
      const prevIdx = (currentTrackIndex - 1 + dataTracks.length) % dataTracks.length;
      setCurrentTrackIndex(prevIdx);
      if (setPlaying) setPlaying(true);
    }
  };

  const handleNext = () => {
    if (dataTracks.length > 1 && setCurrentTrackIndex) {
      const nextIdx = (currentTrackIndex + 1) % dataTracks.length;
      setCurrentTrackIndex(nextIdx);
      if (setPlaying) setPlaying(true);
    }
  };

  const formatTime = (secs) => {
    if (!secs || Number.isNaN(Number(secs))) return "00:00";
    const total = Number(secs);
    const m = Math.floor(total / 60).toString().padStart(2, "0");
    const s = Math.floor(total % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div
      className="w-full pb-2 flex flex-col justify-between"
      style={{ backgroundColor: dark ? "#111827" : "#ffffff" }}
    >
      {items.length > 0 && (
        <div className="pt-6 md:pt-8 pb-6">
          <UpNextSection items={items} onSelectTrack={handleSelectTrack} />
        </div>
      )}

      {activeTrack && (
        <MiniPlayerBar
          title={activeTrack.title || selectedMedia?.title || "Asana session"}
          current={formatTime(current)}
          total={formatTime(totalSecs || activeTrack.durationInSeconds || 0)}
          playing={playing}
          onTogglePlay={() => setPlaying && setPlaying((prev) => !prev)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}