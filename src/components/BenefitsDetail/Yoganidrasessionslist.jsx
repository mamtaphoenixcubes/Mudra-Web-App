"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { spacing, typography } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";

// ── Data ───────────────────────────────────────────────────────
const SESSIONS = [
  {
    id: "healing-sleep",
    title: "Healing Sleep Yoga Nidra",
    duration: "45 min",
    tag: "Deep Reset & Healing",
    imgKey: "HealingRecovery",
  },
  {
    id: "chakra-balancing",
    title: "Chakra Balancing Yoga Nidra",
    duration: "35 min",
    tag: "Chakra Balance",
    imgKey: "RestfulSleep",
  },
  {
    id: "gratitude-before-sleep",
    title: "Gratitude Before Sleep",
    duration: "20 min",
    tag: "Gratitude & Positivity",
    imgKey: "PeacefulSleep",
  },
  {
    id: "releasing-the-day",
    title: "Releasing the Day Yoga Nidra",
    duration: "25 min",
    tag: "Let Go & Relax",
    imgKey: "Relaxation",
  },
];

// ── Icons ──────────────────────────────────────────────────────
const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M4 2.8v10.4a.8.8 0 0 0 1.22.68l8.3-5.2a.8.8 0 0 0 0-1.36l-8.3-5.2A.8.8 0 0 0 4 2.8Z" />
  </svg>
);

const MoreIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
    <circle cx="10" cy="4" r="1.5" />
    <circle cx="10" cy="10" r="1.5" />
    <circle cx="10" cy="16" r="1.5" />
  </svg>
);

// ── Session row ───────────────────────────────────────────────
function SessionRow({ session, index, onPlay, dark, textColor }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const titleColor = dark ? "#ffffff" : "#111827";
  const metaColor = dark ? "rgba(255,255,255,0.5)" : "#6b7280";
  const descColor = dark ? "rgba(255,255,255,0.4)" : "#9ca3af";
  const borderColor = dark ? "rgba(87, 87, 87, 0.08)" : "#494848";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="relative flex items-center gap-4 py-4 border-b last:border-0"
      style={{ borderColor }}
    >
      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0" style={{ backgroundColor: dark ? "#26262b" : "#f3f4f6" }}>
        <Image
          src={IMAGES[session.imgKey]}
          alt={session.title}
          width={64}
          height={64}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className={`${typography.sessionCardTitle} truncate`} style={{ color: titleColor }}>
          {session.title}
        </h3>
        <p className={`${typography.sessionCardMeta} mt-1`} style={{ color: metaColor }}>
          {session.duration} <span className="mx-1">•</span> {session.tag}
        </p>
      </div>

      <button
        onClick={() => onPlay(session)}
        aria-label={`Play ${session.title}`}
        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform hover:scale-105"
        style={{ border: `1.5px solid ${textColor}`, color: textColor }}
      >
        <PlayIcon />
      </button>

      <div className="relative shrink-0">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="More options"
          className="w-8 h-8 flex items-center justify-center"
          style={{ color: descColor }}
        >
          <MoreIcon />
        </button>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-9 z-10 w-36 rounded-xl shadow-lg py-1 text-[12px]"
              style={{
                backgroundColor: dark ? "#1f2937" : "#ffffff",
                border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "#e5e7eb"}`,
              }}
            >
              <button
                className="w-full text-left px-3 py-2 hover:bg-black/5"
                style={{ color: titleColor }}
                onClick={() => {
                  onPlay(session);
                  setMenuOpen(false);
                }}
              >
                Play session
              </button>
              <button
                className="w-full text-left px-3 py-2 hover:bg-black/5"
                style={{ color: titleColor }}
                onClick={() => setMenuOpen(false)}
              >
                Add to saved
              </button>
              <button
                className="w-full text-left px-3 py-2 hover:bg-black/5"
                style={{ color: titleColor }}
                onClick={() => setMenuOpen(false)}
              >
                Share
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ── Main component ───────────────────────────────────────────
export default function YogaNidraSessionsList({ sessions = SESSIONS, onPlay = () => {} }) {
  const { dark, textColor } = useTheme();

  return (
    <section
      className={` ${spacing.sectionPaddingX} py-6 md:py-10`}
      style={{ backgroundColor: dark ? "#111827" : "#ffffff" }}
    >
      <div
      className={` ${spacing.sectionPaddingX} py-6 md:py-10  rounded-3xl px-5 border`}
        style={{
          backgroundColor: dark ? "#413f3f" : "#f0f0f0",
          borderColor: dark ? "rgba(255,255,255,0.06)" : "#f3f4f6",
        }}
      >
        {sessions.map((session, i) => (
          <SessionRow
            key={session.id}
            session={session}
            index={i}
            onPlay={onPlay}
            dark={dark}
            textColor={textColor}
          />
        ))}
      </div>
    </section>
  );
}