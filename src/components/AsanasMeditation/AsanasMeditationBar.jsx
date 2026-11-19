"use client";

import { useRef, useState, useEffect } from "react";
import { SlidersHorizontal, Play, Music2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { spacing } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

const MUSIC_OPTIONS = [
  { id: "peace", label: "Peace Tune", src: "/audio/peace-tune.mp3" },
  { id: "song1", label: "Song 1", src: "/audio/song1.mp3" },
  { id: "song2", label: "Song 2", src: "/audio/song2.mp3" },
  { id: "song3", label: "Song 3", src: "/audio/song3.mp3" },
  { id: "song4", label: "Song 4", src: "/audio/song4.mp3" },
];

export default function AsanasMeditationBar({
  session = null,
  onOpenSettings,
  mudra = null,
  asana = null,
  duration: selectedDuration,
}) {
  const { dark, textColor } = useTheme();
  const router = useRouter();
  const audioRef = useRef(null);
  const [showMusicMenu, setShowMusicMenu] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState(() => {
    const current = session?.musicLabel || "Peace Tune";
    return MUSIC_OPTIONS.some((track) => track.label === current) ? current : "Peace Tune";
  });

  const source = mudra || asana || session || {};
  const title = session?.title || source?.name || source?.title || "Practice Session";
  const level = source?.data?.level || source?.data?.Level || "Beginner";
  const element = source?.data?.element || source?.data?.Element || "Balanced";
  const duration = selectedDuration ?? source?.data?.duration ?? source?.duration ?? 10;
  const subtitle = session?.subtitle || `${duration} min · ${level} · ${element} Element`;
  const settingsLabel = session?.settingsLabel || "Settings";
  const playLabel = session?.playLabel || "Start Practice";
  const selectedTrack = MUSIC_OPTIONS.find((track) => track.label === selectedMusic) || MUSIC_OPTIONS[0];
  const isMusicOn = Boolean(selectedMusic && selectedMusic !== "None");

  useEffect(() => {
    if (!audioRef.current) return;

    if (!selectedTrack?.src) return;

    audioRef.current.src = selectedTrack.src;
    audioRef.current.load();
    audioRef.current.play().catch(() => {
      console.warn("Autoplay was blocked for selected music.");
    });
  }, [selectedTrack]);

  const handleStartPractice = () => {
    const params = new URLSearchParams();
    const sourceId = source?.data?.documentId || source?.id;

    if (sourceId) {
      params.set("asanaId", String(sourceId));
    }

    if (duration) {
      params.set("duration", String(duration));
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
        <div className="text-center mb-4">
          <h3 className="text-white text-[15px] sm:text-[16px] font-semibold">{title}</h3>
          <p className="text-white/75 text-[12px] sm:text-[13px] mt-0.5">{subtitle}</p>
        </div>

        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <button
            onClick={onOpenSettings}
            className="flex flex-col items-center gap-2 flex-1 bg-transparent border-0 cursor-pointer"
            aria-label="Settings"
          >
            <SlidersHorizontal size={22} className="text-white/90" strokeWidth={1.75} />
            <span className="text-[12px] sm:text-[13px] text-white/80 font-medium">{settingsLabel}</span>
          </button>

          <button
            onClick={handleStartPractice}
            className="flex flex-col items-center gap-2 flex-shrink-0 mx-2 bg-transparent border-0 cursor-pointer"
            aria-label="Start practice"
          >
            <span className="w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform">
              <Play size={26} className="text-[#8E7CF0] ml-1" fill="#8E7CF0" />
            </span>
            <span className="text-[12px] sm:text-[13px] text-white/90 font-medium whitespace-nowrap">{playLabel}</span>
          </button>

          <div className="relative flex flex-col items-center gap-2 flex-1" aria-label="Background music">
            <button
              type="button"
              onClick={() => setShowMusicMenu((prev) => !prev)}
              className="flex flex-col items-center gap-2 bg-transparent border-0 cursor-pointer"
              aria-label="Choose background music"
            >
              <Music2 size={22} className={isMusicOn ? "text-white" : "text-white/90"} strokeWidth={1.75} />
              <span className={`text-[12px] sm:text-[13px] font-medium text-center leading-tight ${isMusicOn ? "text-white" : "text-white/80"}`}>
                {selectedMusic}
              </span>
            </button>

            {showMusicMenu && (
              <div
                className="absolute left-1/2 top-full z-20 mt-2 w-40 -translate-x-1/2 rounded-2xl border shadow-xl"
                style={{
                  backgroundColor: dark ? "#1f2937" : "#ffffff",
                  borderColor: dark ? "#374151" : "#e5e7eb",
                }}
              >
                <div className="max-h-52 overflow-y-auto p-2">
                  {MUSIC_OPTIONS.map((track) => (
                    <button
                      key={track.id}
                      type="button"
                      onClick={() => {
                        setSelectedMusic(track.label);
                        setShowMusicMenu(false);
                      }}
                      className="w-full rounded-xl px-3 py-2 text-left text-[12px] sm:text-[13px] transition-colors"
                      style={{
                        backgroundColor: selectedMusic === track.label ? (dark ? "#374151" : "#f3f4f6") : "transparent",
                        color: dark ? "#f9fafb" : "#111827",
                      }}
                    >
                      {track.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <audio ref={audioRef} preload="auto" loop />

        <div className="flex justify-center mt-4 sm:mt-5">
          <div className="w-32 sm:w-36 h-1 rounded-full bg-white/50" />
        </div>
      </div>
    </div>
  );
}