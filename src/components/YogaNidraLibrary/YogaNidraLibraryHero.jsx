"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";
import SiteContainer from "../../common/SiteContainer";     // ← adjust depth

export default function YogaNidraLibraryHero() {
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.1,
    margin: "-50px 0px",
  });

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="w-full"
      style={{ backgroundColor: dark ? "#111827" : "#ffffff" }}
    >
      <SiteContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* ── LEFT CONTENT ── */}
          <motion.div
            className="flex flex-col items-start"
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#9A85FE] tracking-tight mb-2"
              style={{ color: "#9A85FE" }}
            >
              Yoga Nidra Library
            </h1>

            {/* Underline matching Figma */}
            <div className="w-12 h-[3px] bg-[#9A85FE] mb-4" />

            {/* Subtitle text matching Figma */}
            <p
              className="text-sm sm:text-base lg:text-lg font-medium leading-relaxed mb-6 max-w-xl"
              style={{ color: dark ? "#9ca3af" : "#0F0F0F" }}
            >
              Rest deeply. Reset completely. Explore guided Yoga Nidra sessions
              for every need and moment.
            </p>

            {/* Info Card Banner matching Figma */}
            <motion.div
              className="bg-[#EDE9FE] rounded-2xl p-4 sm:p-5 flex items-start sm:items-center gap-4 max-w-lg w-full"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* Icon container */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                <Image
                  src={IMAGES.Energy}
                  alt="Yoga Nidra icon"
                  width={24}
                  height={24}
                  className="w-5 h-5 sm:w-10 sm:h-10 object-contain"
                />
              </div>

              {/* Text content */}
              <div className="flex flex-col gap-0.5">
                <p
                  className="font-bold text-xs sm:text-sm"
                  style={{ color: dark ? "#f3f4f6" : "#0F0F0F" }}
                >
                  This is a preview library
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: dark ? "#9ca3af" : "#0F0F0F" }}
                >
                  For the full experience with complete sessions, guided
                  variations and personalization, try the Mudras App
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN — Lotus illustration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.95 }
              }
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div className="relative w-full max-w-[440px] lg:max-w-[600px]">
                <Image
                  src={IMAGES.hero}
                  alt="Mudra Lotus Hand"
                  width={800}
                  height={800}
                  priority
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 800px"
                  className="w-full h-auto object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </SiteContainer>
    </section>
  );
}