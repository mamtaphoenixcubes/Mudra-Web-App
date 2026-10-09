"use client";

import {
  Music,
  MoreHorizontal,
  SkipBack,
  Play,
  SkipForward,
} from "lucide-react";
import { spacing, typography } from "../../../theme";
import { useTheme } from "../../../context/ThemeContext";

// ─── Static placeholder data ────────────────────────────────────────────────
const UP_NEXT_ITEMS = [
  { id: 1, title: "Deep Sleep Yoga Nidra", duration: "30 min", mode: "Audio" },
  { id: 2, title: "Morning Pranayama Flow", duration: "15 min", mode: "Audio" },
  { id: 3, title: "Root Chakra Grounding", duration: "20 min", mode: "Audio" },
  { id: 4, title: "Evening Body Scan", duration: "25 min", mode: "Audio" },
];

// ─── Up Next Row (presentational only) ─────────────────────────────────────
function UpNextRow({ item, isLast, dark, textColor }) {
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
          aria-label={`More options for ${item.title}`}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors"
        >
          <MoreHorizontal size={18} style={{ color: dark ? "#9ca3af" : "#8A8577" }} />
        </button>
      </div>
    </div>
  );
}

// ─── Up Next Section (presentational only) ─────────────────────────────────
export function UpNextSection({ items = UP_NEXT_ITEMS }) {
  const { dark, textColor } = useTheme();

  return (
    <div className={spacing.sectionPaddingX}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <h2 className={`${typography.playerHeading}`} style={{ color: textColor }}>
          Up Next
        </h2>
        <button
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
          />
        ))}
      </div>
    </div>
  );
}

// ─── Mini Player Bar (presentational only) ─────────────────────────────────
export function MiniPlayerBar({
  title = "Deep Sleep Yoga Nidra",
  current = "00:00",
  total = "30:00",
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
            <p
              className="text-[12px] md:text-[13px] mt-0.5"
              style={{ color: dark ? "#9ca3af" : "#8A8577" }}
            >
              {current} / {total}
            </p>
          </div>
        </div>

        {/* Transport controls (visual only) */}
        <div className="flex items-center gap-4 md:gap-5 flex-shrink-0">
          <button
            aria-label="Previous"
            style={{ color: textColor }}
            className="hover:scale-110 transition-transform"
          >
            <SkipBack size={20} fill="currentColor" />
          </button>
          <button
            aria-label="Play"
            className="w-11 h-11 md:w-12 md:h-12 rounded-full text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-md"
            style={{ backgroundColor: dark ? "#374151" : "#3A362E" }}
          >
            <Play size={18} fill="white" className="ml-0.5" />
          </button>
          <button
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

// ─── Combined default export (presentational only) ─────────────────────────
export default function UpNextWithMiniMeditationPlaylist() {
  const { dark } = useTheme();

  return (
    <div
      className="w-full pb-2 flex flex-col justify-between"
      style={{ backgroundColor: dark ? "#111827" : "#ffffff" }}
    >
      <div className="pt-6 md:pt-8 pb-6">
        <UpNextSection items={UP_NEXT_ITEMS} />
      </div>

      <MiniPlayerBar
        title="Deep Sleep Yoga Nidra"
        current="00:00"
        total="30:00"
      />
    </div>
  );
}