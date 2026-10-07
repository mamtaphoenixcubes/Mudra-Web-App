"use client";

import {
  SlidersHorizontal,
  Play,
  Music2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { spacing } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

// ─── Config ─────────────────────────────────────────────────────────────────
const SESSION_INFO = {
  title: "Jnana Mudra Meditation",
  subtitle: "10 min · Beginner · Air Element",
  musicLabel: "Gentle Rain",
  settingsLabel: "Settings",
  playLabel: "Start Practice",
};

// ─── Practice Action Bar (presentational only) ─────────────────────────────
export default function AsanasMeditationBar({
  session = SESSION_INFO,
  onOpenSettings,
  mudra = null,
}) {
  const { dark, textColor } = useTheme();
  const router = useRouter();
  const isMusicOn = session.musicLabel && session.musicLabel !== "None";

  const handleStartPractice = () => {
    // Optionally pass mudra id / duration via query params
    const params = new URLSearchParams();
    if (mudra?.documentId || mudra?.id) {
      params.set("mudraId", mudra.documentId || mudra.id);
    }
    if (session?.duration) {
      params.set("duration", String(session.duration));
    }
    const query = params.toString();
    router.push(`/AsanasPlaySession${query ? `?${query}` : ""}`);
  };

  return (
    <div
      className={`w-full ${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`}
      style={{ backgroundColor: dark ? "#111827" : "#ffffff" }}
    >
      <div
        className={`${spacing.sectionPaddingX} pt-5 pb-3 sm:pt-6 sm:pb-4`}
        style={{
          background: `linear-gradient(135deg, ${textColor} 0%, ${textColor}dd 100%)`,
          borderRadius: "28px",
          boxShadow: `0 -4px 20px rgba(0,0,0,0.15)`,
        }}
      >
        {/* Session info */}
        <div className="text-center mb-4">
          <h3 className="text-white text-[15px] sm:text-[16px] font-semibold">
            {session.title}
          </h3>
          <p className="text-white/75 text-[12px] sm:text-[13px] mt-0.5">
            {session.subtitle}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {/* Settings */}
          <button
            onClick={onOpenSettings}
            className="flex flex-col items-center gap-2 flex-1 bg-transparent border-0 cursor-pointer"
            aria-label="Settings"
          >
            <SlidersHorizontal size={22} className="text-white/90" strokeWidth={1.75} />
            <span className="text-[12px] sm:text-[13px] text-white/80 font-medium">
              {session.settingsLabel}
            </span>
          </button>

          {/* Play → navigates to /AsanasPlaySession */}
          <button
            onClick={handleStartPractice}
            className="flex flex-col items-center gap-2 flex-shrink-0 mx-2 bg-transparent border-0 cursor-pointer"
            aria-label="Start practice"
          >
            <span className="w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform">
              <Play size={26} className="text-[#8E7CF0] ml-1" fill="#8E7CF0" />
            </span>
            <span className="text-[12px] sm:text-[13px] text-white/90 font-medium whitespace-nowrap">
              {session.playLabel}
            </span>
          </button>

          {/* Music */}
          <div
            className="flex flex-col items-center gap-2 flex-1"
            aria-label="Background music"
          >
            <Music2
              size={22}
              className={isMusicOn ? "text-white" : "text-white/90"}
              strokeWidth={1.75}
            />
            <span
              className={`text-[12px] sm:text-[13px] font-medium text-center leading-tight ${
                isMusicOn ? "text-white" : "text-white/80"
              }`}
            >
              {session.musicLabel}
            </span>
          </div>
        </div>

        {/* Drag handle */}
        <div className="flex justify-center mt-4 sm:mt-5">
          <div className="w-32 sm:w-36 h-1 rounded-full bg-white/50" />
        </div>
      </div>
    </div>
  );
}