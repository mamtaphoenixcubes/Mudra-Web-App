"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { spacing, typography, btn } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";

// ─── Icons ────────────────────────────────────────────────────────────────────
const Ic = {
  edit: ({ color }) => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  lotus: ({ color }) => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
      <path d="M12 22c0 0-8-4-8-12a8 8 0 0 1 16 0c0 8-8 12-8 12z"/>
    </svg>
  ),
};

export default function ProfileHero({ user, onEditProfile }) {
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.1,
    margin: "-50px"
  });

  const {
    name = "Alexandra",
    email = "alexandra@email.com",
    tagline = "Inner balance, every day",
  } = user || {};

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  // Character animation for heading
  const charVariants = {
    hidden: { opacity: 0, y: 15, rotateX: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.04,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const headingText = "Profile";
  const headingChars = headingText.split("");

  return (
    <motion.div 
      ref={sectionRef}
      className="min-h-screen" 
      style={{
        backgroundColor: dark ? "#111827" : "var(--holistic-bg)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* ── Sticky header ── */}
      <motion.div 
        className={`border-b ${spacing.sectionPaddingX} py-3.5 flex items-center justify-between sticky top-0 z-30`} 
        style={{
          backgroundColor: dark ? "#1f2937" : "rgba(255,255,255,0.9)",
          borderColor: dark ? "#374151" : "#f3f4f6",
        }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="flex items-center gap-3">
          <div>
            <motion.h1 
              className="text-sm font-bold leading-tight" 
              style={{ color: dark ? "#e5e7eb" : "#1f2937" }}
            >
              {headingChars.map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={charVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  style={{ display: "inline-block" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p 
              className="text-[10px]" 
              style={{ color: dark ? "#6b7280" : "#9ca3af" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              Your account & preferences
            </motion.p>
          </div>
        </div>
        <motion.button
          onClick={onEditProfile}
          className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-xl transition-all border"
          style={{
            color: textColor,
            borderColor: textColor + "40",
          }}
          whileHover={{
            scale: 1.05,
            backgroundColor: textColor + "10",
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Ic.edit color={textColor} />
          Edit Profile
        </motion.button>
      </motion.div>

      <div className={`${spacing.sectionPaddingX} py-5`}>
        <motion.div 
          className="max-w-2xl mx-auto space-y-4"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* ── Profile card ── */}
          <motion.div 
            className="rounded-2xl border shadow-sm p-5" 
            style={{
              backgroundColor: dark ? "#1f2937" : "#ffffff",
              borderColor: dark ? "#374151" : "#f3f4f6",
            }}
            whileHover={{
              boxShadow: dark 
                ? "0 8px 30px rgba(0,0,0,0.3)"
                : "0 8px 30px rgba(0,0,0,0.06)",
              transition: { duration: 0.3 }
            }}
          >
            <motion.div 
              className="flex items-center gap-4"
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.1 }}
            >
              {/* Avatar */}
              <motion.div 
                className="relative w-16 h-16 rounded-2xl border shrink-0 overflow-hidden flex items-center justify-center" 
                style={{
                  backgroundColor: dark ? "#374151" : "var(--holistic-bg)",
                  borderColor: dark ? "#4b5563" : "#f3e8ff",
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: 5,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="relative w-10 h-10">
                  <Image
                    src={IMAGES.HolisticWellbeing}
                    alt="Lotus icon"
                    fill
                    className="object-contain"
                    style={{
                      filter: dark ? "brightness(0.8) invert(1)" : "none",
                    }}
                  />
                </div>
              </motion.div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <motion.div 
                  className="flex items-center gap-2 mb-0.5"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <motion.p 
                    className="text-sm font-bold truncate" 
                    style={{ color: dark ? "#e5e7eb" : "#1f2937" }}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {name}
                  </motion.p>
                  <motion.span 
                    className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border" 
                    style={{
                      backgroundColor: dark ? "#374151" : "#f5f3ff",
                      color: textColor,
                      borderColor: dark ? "#4b5563" : "#e9d5ff",
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    Member
                  </motion.span>
                </motion.div>
                <motion.p 
                  className="text-[11px] truncate mb-1" 
                  style={{ color: dark ? "#6b7280" : "#9ca3af" }}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  {email}
                </motion.p>
                <motion.span 
                  className="inline-flex items-center gap-1 text-[10px]" 
                  style={{ color: dark ? "#6b7280" : "#9ca3af" }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  <motion.span 
                    className="relative w-3 h-3 opacity-60 inline-block"
                    whileHover={{
                      scale: 1.2,
                      rotate: 180,
                      transition: { duration: 0.4 }
                    }}
                  >
                    <Image src={IMAGES.HolisticWellbeing} alt="" fill className="object-contain" style={{
                      filter: dark ? "brightness(0.8) invert(1)" : "none",
                    }} />
                  </motion.span>
                  {tagline}
                </motion.span>
              </div>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </motion.div>
  );
}