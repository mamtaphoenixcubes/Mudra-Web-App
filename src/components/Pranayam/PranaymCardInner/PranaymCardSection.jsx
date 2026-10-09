"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { spacing, typography } from "../../../theme";
import { useTheme } from "../../../context/ThemeContext";
import { IMAGES } from "../../../assets/assets";

function QuoteIcon({ color }) {
  return (
    <svg width="32" height="26" viewBox="0 0 32 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.5 0C4.25 0 0 4.25 0 9.5v7c0 1.9 1.6 3.5 3.5 3.5h4C9.4 20 11 18.4 11 16.5v-4C11 10.6 9.4 9 7.5 9H4.3C4.9 5.9 7.2 3.5 10 2.7c.9-.3 1.5-1.1 1.5-2 0-1.3-1.1-1.9-2-.7z"
        fill={color}
      />
      <path
        d="M25.5 0C20.25 0 16 4.25 16 9.5v7c0 1.9 1.6 3.5 3.5 3.5h4c1.9 0 3.5-1.6 3.5-3.5v-4c0-1.9-1.6-3.5-3.5-3.5h-3.2c.6-3.1 2.9-5.5 5.7-6.3.9-.3 1.5-1.1 1.5-2 0-1.3-1.1-1.9-2-.7z"
        fill={color}
      />
    </svg>
  );
}

function LightbulbIcon({ color }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 00-3.6 10.8c.5.4.8 1 .8 1.7h5.6c0-.7.3-1.3.8-1.7A6 6 0 0012 3z" />
      <path d="M12 3V2" />
      <path d="M18 6l.7-.7" />
      <path d="M6 6l-.7-.7" />
      <path d="M21 12h1" />
      <path d="M2 12h1" />
    </svg>
  );
}

// ─── Image-based Icons ──────────────────────────────────────
function ClockImageIcon({ dark }) {
  const [imageError, setImageError] = useState(false);

  return IMAGES.Clock && !imageError ? (
    <Image
      src={IMAGES.Clock}
      alt="Clock"
      width={20}
      height={20}
      className="w-[56px] h-[56px] sm:w-[60px] sm:h-[60px] object-contain"
      style={{
        filter: dark ? "brightness(0) invert(0.7)" : "none",
      }}
      onError={() => setImageError(true)}
      priority={false}
    />
  ) : (
    <div
      className="w-[26px] h-[26px] sm:w-[30px] sm:h-[30px] rounded-full"
      style={{ backgroundColor: dark ? "#4a4a5a" : "#e0ddd5" }}
    />
  );
}

function LotusImageIcon({ dark }) {
  const [imageError, setImageError] = useState(false);

  return IMAGES.Energy && !imageError ? (
    <Image
      src={IMAGES.Energy}
      alt="Lotus"
      width={22}
      height={22}
      className="w-[82px] h-[52px] object-contain"
      style={{
        filter: dark
          ? "brightness(0) invert(0.6) sepia(1) hue-rotate(80deg) saturate(0.8)"
          : "none",
      }}
      onError={() => setImageError(true)}
      priority={false}
    />
  ) : (
    <div
      className="w-[22px] h-[22px] rounded-full"
      style={{ backgroundColor: dark ? "#4a4a5a" : "#e0ddd5" }}
    />
  );
}

// ─── Static Config ──────────────────────────────────────────
const AFFIRMATION_TEXT =
  "My breath is steady, my mind is calm, and my prana flows freely.";
const DURATION_OPTIONS = [5, 10, 15, 20];
const TIP_TEXT =
  "Practice pranayama daily on an empty stomach for best results. Increase the duration gradually as your breath capacity grows.";

// ─── Pranayama Timer Popup ──────────────────────────────────
function PranayamaTimerModal({ dark, duration, onClose }) {
  const { textColor } = useTheme();
  const totalSeconds = duration * 60;
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [playTune, setPlayTune] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setSecondsLeft(totalSeconds);
    setIsRunning(false);
  }, [totalSeconds]);

  const playSingingBowlSound = () => {
    if (typeof window === "undefined") return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(220, ctx.currentTime);

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(440, ctx.currentTime);

      gain1.gain.setValueAtTime(0.5, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 5.0);

      gain2.gain.setValueAtTime(0.2, ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 5.0);

      osc1.connect(gain1);
      osc2.connect(gain2);

      gain1.connect(ctx.destination);
      gain2.connect(ctx.destination);

      osc1.start(ctx.currentTime);
      osc2.start(ctx.currentTime);

      osc1.stop(ctx.currentTime + 5.0);
      osc2.stop(ctx.currentTime + 5.0);
    } catch (e) {
      console.warn("Failed to synthesize bell sound:", e);
    }
  };

  // Pure interval timer tick
  useEffect(() => {
    if (isRunning && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, secondsLeft]);

  // Handle timer completion (no backend)
  useEffect(() => {
    if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      if (playTune) playSingingBowlSound();
    }
  }, [isRunning, secondsLeft, playTune]);

  const handleStart = () => {
    if (secondsLeft === 0) setSecondsLeft(totalSeconds);
    setIsRunning(true);
  };

  const handlePauseToggle = () => {
    setIsRunning((prev) => !prev);
  };

  const handleStop = () => {
    setIsRunning(false);
    setSecondsLeft(totalSeconds);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const progress = totalSeconds > 0 ? 1 - secondsLeft / totalSeconds : 0;
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  const status =
    secondsLeft === totalSeconds ? "Ready" : secondsLeft === 0 ? "Complete" : isRunning ? "In progress" : "Paused";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-3xl px-6 py-8 flex flex-col items-center text-center"
        style={{
          backgroundColor: dark ? "#1a1625" : "#ffffff",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full transition-colors"
          style={{ color: dark ? "#9ca3af" : "#6B6659" }}
        >
          <X size={20} />
        </button>

        <h3 className="text-lg font-bold mb-1" style={{ color: dark ? "#f3f4f6" : "#1f2937" }}>
          Pranayama Timer
        </h3>
        <p className="text-sm mb-5" style={{ color: dark ? "#9ca3af" : "#6B6659" }}>
          {duration} minute practice
        </p>

        <label
          className="w-full flex items-center gap-3 rounded-xl px-4 py-3 mb-6 cursor-pointer"
          style={{ backgroundColor: dark ? "#241f33" : "#f3f4f6" }}
        >
          <input
            type="checkbox"
            checked={playTune}
            onChange={(e) => setPlayTune(e.target.checked)}
            className="w-4 h-4 rounded"
          />
          <span className="text-sm" style={{ color: dark ? "#e5e7eb" : "#3A362E" }}>
            Play background peace tune
          </span>
        </label>

        <div className="relative w-[220px] h-[220px] mb-6 flex items-center justify-center">
          <svg width="220" height="220" viewBox="0 0 220 220" className="-rotate-90">
            <circle cx="110" cy="110" r={radius} fill="none" stroke={dark ? "#2d2640" : "#e5e7eb"} strokeWidth="10" />
            <circle
              cx="110"
              cy="110"
              r={radius}
              fill="none"
              stroke={textColor}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-4xl font-bold" style={{ color: dark ? "#f3f4f6" : "#1f2937" }}>
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </span>
            <span className="text-sm mt-1" style={{ color: dark ? "#9ca3af" : "#6B6659" }}>
              {status}
            </span>
          </div>
        </div>

        <div className="w-full flex gap-3">
          {secondsLeft === totalSeconds && !isRunning ? (
            <>
              <button
                onClick={handleStart}
                className="flex-1 py-3 rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  backgroundColor: textColor,
                  color: "#ffffff"
                }}
              >
                Start
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  backgroundColor: dark ? "#2d2640" : "#f3f4f6",
                  color: dark ? "#e5e7eb" : "#3A362E"
                }}
              >
                Close
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handlePauseToggle}
                className="flex-1 py-3 rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  backgroundColor: isRunning ? "#6b7280" : textColor,
                  color: "#ffffff"
                }}
              >
                {isRunning ? "Pause" : "Resume"}
              </button>
              <button
                onClick={handleStop}
                className="flex-1 py-3 rounded-xl font-semibold transition-all border hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  borderColor: dark ? "#4b5563" : "#d1d5db",
                  color: dark ? "#e5e7eb" : "#374151",
                  backgroundColor: "transparent"
                }}
              >
                Stop
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Affirmation Card ──────────────────────────────────────
function AffirmationCard({ dark }) {
  return (
    <div
      className={`rounded-[20px] px-5 sm:px-6 py-6 sm:py-7 flex flex-col items-center text-center ${spacing.cardMinH}`}
      style={{ backgroundColor: dark ? "#1f3320" : "#E1F3D8" }}
    >
      <h3
        className={`${typography.cardTitle} mb-4`}
        style={{ color: dark ? "#e5e7eb" : "#3A362E" }}
      >
        Affirmation
      </h3>

      <QuoteIcon color={dark ? "#6b8f63" : "#5C7A56"} />

      <p
        className={`${typography.cardBody} mt-4 mb-4 max-w-[220px]`}
        style={{ color: dark ? "#d1d5db" : "#3A362E" }}
      >
        {AFFIRMATION_TEXT}
      </p>

      <LotusImageIcon dark={dark} />
    </div>
  );
}

// ─── Duration Card ─────────────────────────────────────────
function DurationCard({ dark, textColor, duration, setDuration, onOpenTimer }) {
  return (
    <button
      onClick={onOpenTimer}
      className={`rounded-[20px] px-5 sm:px-6 py-6 sm:py-7 flex flex-col items-center text-center w-full text-left hover:scale-[1.01] active:scale-[0.99] transition-transform ${spacing.cardMinH}`}
      style={{ backgroundColor: dark ? "#3a222b" : "#FCE3EC" }}
    >
      <h3
        className={`${typography.cardTitle} mb-4`}
        style={{ color: dark ? "#e5e7eb" : "#3A362E" }}
      >
        Duration
      </h3>

      <ClockImageIcon dark={dark} />

      <p
        className="text-[24px] sm:text-[26px] font-bold mt-3 mb-4"
        style={{ color: dark ? "#f3f4f6" : "#2B2621" }}
      >
        {duration} min
      </p>

      <div className="flex items-center gap-2 flex-wrap justify-center">
        {DURATION_OPTIONS.map((opt) => {
          const active = opt === duration;
          return (
            <span
              key={opt}
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                setDuration(opt);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.stopPropagation();
                  setDuration(opt);
                }
              }}
              className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors cursor-pointer ${
                active ? "bg-[#2B2621] text-white" : dark ? "bg-[#4b5563] text-[#d1d5db]" : "bg-white text-[#5C574C]"
              }`}
            >
              {opt} min
            </span>
          );
        })}
      </div>
    </button>
  );
}

// ─── Tip Banner ──────────────────────────────────────────────
function TipBanner({ dark }) {
  const { textColor } = useTheme();

  return (
    <div
      className={`rounded-[20px] px-5 sm:px-6 py-5 sm:py-6 flex items-start gap-4 `}
      style={{ backgroundColor: dark ? "#2a2438" : "#E4DFF7" }}
    >
      <span
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: dark ? "#3a3350" : "#ffffff" }}
      >
        <LightbulbIcon color={dark ? "#c4b5fd" : "#6B5CA5"} />
      </span>
      <div className="pt-1">
        <h4
          className={`${typography.cardTitle} mb-1`}
          style={{ color: textColor }}
        >
          Tip
        </h4>
        <p
          className={`${typography.cardBody} leading-relaxed`}
          style={{ color: dark ? "#9ca3af" : "#6B6459" }}
        >
          {TIP_TEXT}
        </p>
      </div>
    </div>
  );
}

// ─── Combined Component ──────────────────────────────────────
export default function PranaymCardSection({
  // Accept a meditation object (not required for rendering)
  meditation = null,
  duration,
  setDuration,
}) {
  const { dark, textColor } = useTheme();
  const [localDuration, setLocalDuration] = useState(10);
  const activeDuration = duration !== undefined ? duration : localDuration;
  const activeSetDuration = setDuration || setLocalDuration;

  const [timerOpen, setTimerOpen] = useState(false);

  return (
    <div
      className={`w-full ${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`}
      style={{ backgroundColor: dark ? "#111827" : "#ffffff" }}
    >
      <div className={`${spacing.container} space-y-4 sm:space-y-5`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <AffirmationCard dark={dark} />
          <DurationCard
            dark={dark}
            textColor={textColor}
            duration={activeDuration}
            setDuration={activeSetDuration}
            onOpenTimer={() => setTimerOpen(true)}
          />
        </div>

        <TipBanner dark={dark} />
      </div>

      {timerOpen && (
        <PranayamaTimerModal
          dark={dark}
          duration={activeDuration}
          onClose={() => setTimerOpen(false)}
        />
      )}
    </div>
  );
}