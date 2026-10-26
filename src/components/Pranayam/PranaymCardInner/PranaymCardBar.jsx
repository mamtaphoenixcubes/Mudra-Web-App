"use client";

import {
  SlidersHorizontal,
  Play,
  Music2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { spacing } from "../../../theme";
import { useTheme } from "../../../context/ThemeContext";

export default function PranaymCardBar({
  session = {},
  onOpenSettings,
  mudra = null,
  pranayama = null,
  meditation = null,
}) {
  const { dark, textColor } = useTheme();
  const router = useRouter();
  const item = meditation || pranayama || mudra || {};
  const durationValue = session?.duration || item?.durationPickerCard?.defaultDuration || 10;
  const musicLabel = item?.audio_playlists?.[0]?.title || "Gentle Rain";
  const isMusicOn = musicLabel && musicLabel !== "None";

  const handleStartPractice = () => {
    const params = new URLSearchParams();
    const id = item?.documentId || item?.id || null;
    if (id) params.set("id", id);
    if (durationValue) params.set("duration", String(durationValue));
    const query = params.toString();
    router.push(`/PranayamPlaySession${query ? `?${query}` : ""}`);
  };

  return (
    <div className={`w-full ${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`} style={{ backgroundColor: dark ? "#111827" : "#ffffff" }}>
      <div className={`${spacing.sectionPaddingX} pt-5 pb-3 sm:pt-6 sm:pb-4`} style={{ background: `linear-gradient(135deg, ${textColor} 0%, ${textColor}dd 100%)`, borderRadius: "28px", boxShadow: `0 -4px 20px rgba(0,0,0,0.15)` }}>
        <div className="text-center mb-4">
          <h3 className="text-white text-[15px] sm:text-[16px] font-semibold">{item.name || "Pranayama"}</h3>
          <p className="text-white/75 text-[12px] sm:text-[13px] mt-0.5">
            {[
              item?.duration || `${durationValue} min`,
              item?.level,
              item?.element,
            ].filter(Boolean).join(" · ") || "No data available"}
          </p>
        </div>

        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <button onClick={onOpenSettings} className="flex flex-col items-center gap-2 flex-1 bg-transparent border-0 cursor-pointer" aria-label="Open pranayama settings">
            <SlidersHorizontal size={22} className="text-white/90" strokeWidth={1.75} />
            <span className="text-[12px] sm:text-[13px] text-white/80 font-medium">Settings</span>
          </button>

          <button onClick={handleStartPractice} className="flex flex-col items-center gap-2 flex-shrink-0 mx-2 bg-transparent border-0 cursor-pointer" aria-label="Start pranayama practice">
            <span className="w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform">
              <Play size={26} className="text-[#8E7CF0] ml-1" fill="#8E7CF0" />
            </span>
            <span className="text-[12px] sm:text-[13px] text-white/90 font-medium whitespace-nowrap">Start Practice</span>
          </button>

          <div className="flex flex-col items-center gap-2 flex-1" aria-label="Background music for pranayama">
            <Music2 size={22} className={isMusicOn ? "text-white" : "text-white/90"} strokeWidth={1.75} />
            <span className={`text-[12px] sm:text-[13px] font-medium text-center leading-tight ${isMusicOn ? "text-white" : "text-white/80"}`}>
              {musicLabel}
            </span>
          </div>
        </div>

        <div className="flex justify-center mt-4 sm:mt-5">
          <div className="w-32 sm:w-36 h-1 rounded-full bg-white/50" />
        </div>
      </div>
    </div>
  );
}