"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import {
  SlidersHorizontal,
  Play,
  Pause,
  Music2,
  X,
  Check,
  Volume2,
  Bell,
  Vibrate,
  SkipForward,
  Mic,
} from "lucide-react";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

// ─── Config ─────────────────────────────────────────────────────────────────
const MUSIC_TRACKS = [
  { id: "none", label: "None" },
  { id: "rain", label: "Gentle Rain" },
  { id: "ocean", label: "Ocean Waves" },
  { id: "forest", label: "Forest Ambience" },
  { id: "bowls", label: "Singing Bowls" },
  { id: "silence", label: "Silence" },
];

// ─── Sheet Wrapper (now portaled) ───────────────────────────────────────────
function BottomSheet({ title, onClose, dark, children }) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
      <div
        className="relative w-full sm:w-[420px] max-h-[80vh] rounded-t-[28px] sm:rounded-[28px] sm:mb-6 overflow-hidden flex flex-col"
        style={{ backgroundColor: dark ? "#1f2937" : "#FBF7EF" }}
      >
        <div
          className="flex items-center justify-between px-5 py-4 border-b flex-shrink-0"
          style={{ borderColor: dark ? "#374151" : "#E9E3D6" }}
        >
          <h3 className={`${typography.cardTitle} font-semibold`} style={{ color: dark ? "#e5e7eb" : "#3A362E" }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors"
          >
            <X size={16} style={{ color: dark ? "#9ca3af" : "#8A8577" }} />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 px-5 py-4">{children}</div>
      </div>
    </div>,
    document.body
  );
}

// ─── Toggle Row ─────────────────────────────────────────────────────────────
function ToggleRow({ icon, label, sublabel, value, onChange, dark }) {
  const { textColor } = useTheme();
  const Icon = icon;
  
  return (
    <div className="flex items-center justify-between py-3.5">
      <div className="flex items-center gap-3 min-w-0">
        <span
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: dark ? "#374151" : "#EDE7FE" }}
        >
          <Icon size={16} style={{ color: textColor }} />
        </span>
        <div className="min-w-0">
          <p className="text-[13.5px] font-medium" style={{ color: dark ? "#e5e7eb" : "#3A362E" }}>
            {label}
          </p>
          {sublabel && (
            <p className="text-[11.5px]" style={{ color: dark ? "#9ca3af" : "#8A8577" }}>
              {sublabel}
            </p>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={() => onChange(!value)}
        aria-pressed={value}
        aria-label={label}
        className="relative flex-shrink-0"
        style={{
          width: "44px",
          height: "24px",
          borderRadius: "9999px",
          backgroundColor: value ? textColor : dark ? "#4b5563" : "#E9E3D6",
          transition: "background-color 0.2s ease",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "2px",
            left: value ? "22px" : "2px",
            width: "20px",
            height: "20px",
            borderRadius: "9999px",
            backgroundColor: "#ffffff",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            transition: "left 0.2s ease",
          }}
        />
      </button>
    </div>
  );
}

// ─── Settings Panel ─────────────────────────────────────────────────────────
function SettingsPanel({ settings, onChange, onClose, dark }) {
  return (
    <BottomSheet title="Practice Settings" onClose={onClose} dark={dark}>
      <div className="divide-y" style={{ borderColor: dark ? "#374151" : "#EDEBE4" }}>
        <ToggleRow
          icon={Mic}
          label="Voice Guidance"
          sublabel="Spoken instructions during practice"
          value={settings.voiceGuidance}
          onChange={(v) => onChange({ ...settings, voiceGuidance: v })}
          dark={dark}
        />
        <ToggleRow
          icon={Bell}
          label="Reminders"
          sublabel="Daily practice notifications"
          value={settings.reminders}
          onChange={(v) => onChange({ ...settings, reminders: v })}
          dark={dark}
        />
        <ToggleRow
          icon={Vibrate}
          label="Haptic Feedback"
          sublabel="Gentle vibration on transitions"
          value={settings.haptics}
          onChange={(v) => onChange({ ...settings, haptics: v })}
          dark={dark}
        />
        <ToggleRow
          icon={SkipForward}
          label="Auto-play Next"
          sublabel="Continue to next session automatically"
          value={settings.autoPlayNext}
          onChange={(v) => onChange({ ...settings, autoPlayNext: v })}
          dark={dark}
        />
      </div>
    </BottomSheet>
  );
}

// ─── Background Music Panel ─────────────────────────────────────────────────
function MusicPanel({ selectedTrack, onSelectTrack, volume, onVolumeChange, onClose, dark }) {
  const { textColor } = useTheme();
  
  return (
    <BottomSheet title="Background Music" onClose={onClose} dark={dark}>
      <div className="mb-5 pb-5 border-b" style={{ borderColor: dark ? "#374151" : "#EDEBE4" }}>
        <div className="flex items-center gap-3">
          <Volume2 size={18} style={{ color: dark ? "#9ca3af" : "#8A8577" }} />
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => onVolumeChange(Number(e.target.value))}
            className="flex-1 accent-[#9A85FE]"
            aria-label="Music volume"
            style={{
              accentColor: textColor,
            }}
          />
          <span
            className="text-[12px] font-medium w-8 text-right"
            style={{ color: dark ? "#9ca3af" : "#8A8577" }}
          >
            {volume}%
          </span>
        </div>
      </div>

      <div className="space-y-1">
        {MUSIC_TRACKS.map((track) => {
          const isSelected = track.id === selectedTrack;
          return (
            <button
              key={track.id}
              onClick={() => onSelectTrack(track.id)}
              className="w-full flex items-center justify-between px-3 py-3 rounded-2xl hover:bg-black/5 transition-colors"
              style={{
                backgroundColor: isSelected ? (dark ? "#374151" : "#EDE7FE") : "transparent",
              }}
            >
              <span
                className="text-[13.5px] font-medium"
                style={{ color: isSelected ? textColor : dark ? "#e5e7eb" : "#3A362E" }}
              >
                {track.label}
              </span>
              {isSelected && <Check size={16} style={{ color: textColor }} />}
            </button>
          );
        })}
      </div>
    </BottomSheet>
  );
}

// ─── Practice Action Bar ────────────────────────────────────────────────────
export default function PracticeActionBar({
  onSettings,
  onToggleMusic,
  onStartPractice,
  playing: playingProp,
  onTogglePlay,
}) {
  const { dark, textColor } = useTheme();
  const router = useRouter();
  const [localPlaying, setLocalPlaying] = useState(false);
  const isControlled = playingProp !== undefined;
  const playing = isControlled ? playingProp : localPlaying;

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [musicOpen, setMusicOpen] = useState(false);

  const [settings, setSettings] = useState({
    voiceGuidance: true,
    reminders: false,
    haptics: true,
    autoPlayNext: false,
  });

  const [selectedTrack, setSelectedTrack] = useState("rain");
  const [volume, setVolume] = useState(60);
  const isMusicOn = selectedTrack !== "none" && selectedTrack !== "silence";

  function handlePlayToggle() {
    if (onStartPractice) {
      onStartPractice();
      return;
    }
    router.push("/PlaySession");
    if (onTogglePlay) onTogglePlay();
    if (!isControlled) setLocalPlaying((p) => !p);
  }

  function handleSettingsClick() {
    onSettings?.();
    setSettingsOpen(true);
  }

  function handleMusicClick() {
    onToggleMusic?.();
    setMusicOpen(true);
  }

  return (
    <>
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
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <button
              onClick={handleSettingsClick}
              className="flex flex-col items-center gap-2 flex-1 hover:opacity-80 transition-opacity"
              aria-label="Settings"
            >
              <SlidersHorizontal size={22} className="text-white/90" strokeWidth={1.75} />
              <span className="text-[12px] sm:text-[13px] text-white/80 font-medium">
                Settings
              </span>
            </button>

            <button
              onClick={handlePlayToggle}
              className="flex flex-col items-center gap-2 flex-shrink-0 mx-2"
              aria-label={playing ? "Pause practice" : "Start practice"}
            >
              <span className="w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform">
                {playing ? (
                  <Pause size={26} className="text-[#8E7CF0]" fill="#8E7CF0" />
                ) : (
                  <Play size={26} className="text-[#8E7CF0] ml-1" fill="#8E7CF0" />
                )}
              </span>
              <span className="text-[12px] sm:text-[13px] text-white/90 font-medium whitespace-nowrap">
                {playing ? "Pause Practice" : "Start Practice"}
              </span>
            </button>

            <button
              onClick={handleMusicClick}
              className="flex flex-col items-center gap-2 flex-1 hover:opacity-80 transition-opacity"
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
                Background
                <br className="sm:hidden" /> music
              </span>
            </button>
          </div>

          <div className="flex justify-center mt-4 sm:mt-5">
            <div className="w-32 sm:w-36 h-1 rounded-full bg-white/50" />
          </div>
        </div>
      </div>

      {settingsOpen && (
        <SettingsPanel
          settings={settings}
          onChange={setSettings}
          onClose={() => setSettingsOpen(false)}
          dark={dark}
        />
      )}

      {musicOpen && (
        <MusicPanel
          selectedTrack={selectedTrack}
          onSelectTrack={setSelectedTrack}
          volume={volume}
          onVolumeChange={setVolume}
          onClose={() => setMusicOpen(false)}
          dark={dark}
        />
      )}
    </>
  );
}