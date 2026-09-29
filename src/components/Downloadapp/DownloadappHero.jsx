"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { IMAGES } from "../../assets/assets";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

function AppStoreBadge({ dark }) {
  return (
    <motion.a
      href="#"
      className="flex items-center gap-2 rounded-xl px-3.5 py-2 border transition-colors shrink-0"
      style={{
        backgroundColor: dark ? "#1f2937" : "#000000",
        borderColor: dark ? "#374151" : "#374151",
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white shrink-0" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="text-[9px] text-gray-300 font-normal">Download on the</span>
        <span className="text-[13px] font-semibold tracking-tight text-white">App Store</span>
      </div>
    </motion.a>
  );
}

function GooglePlayBadge({ dark }) {
  return (
    <motion.a
      href="#"
      className="flex items-center gap-2 rounded-xl px-3.5 py-2 border transition-colors shrink-0"
      style={{
        backgroundColor: dark ? "#1f2937" : "#000000",
        borderColor: dark ? "#374151" : "#374151",
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.18 23.5c.3.17.64.26.99.24l11.4-11.4-2.83-2.84L3.18 23.5z" fill="#EA4335" />
        <path d="M20.5 10.72l-2.78-1.6-3.17 3.17 3.17 3.16 2.81-1.62a1.6 1.6 0 0 0 0-3.1z" fill="#FBBC04" />
        <path d="M3.18.5C2.82.72 2.57 1.1 2.57 1.6v20.8c0 .5.25.88.61 1.1l11.56-11.57L3.18.5z" fill="#4285F4" />
        <path d="M4.17.24l10.36 10.36-2.82 2.83L3.18.5c.3-.17.66-.26.99-.26z" fill="#34A853" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="text-[9px] text-gray-300 font-normal">GET IT ON</span>
        <span className="text-[13px] font-semibold tracking-tight text-white">Google Play</span>
      </div>
    </motion.a>
  );
}

function StarRating({ rating = 4.8, count = "10K+", dark }) {
  return (
    <motion.div
      className="flex items-center gap-2"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <motion.svg
            key={i}
            viewBox="0 0 24 24"
            className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 + 0.5, duration: 0.3 }}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </motion.svg>
        ))}
      </div>
      <motion.span
        className="text-xs sm:text-sm font-medium"
        style={{ color: dark ? "#9ca3af" : "#4b5563" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        {rating}/5 from {count} users
      </motion.span>
    </motion.div>
  );
}

export default function DownloadAppHero() {
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
    margin: "-50px"
  });

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  // Character animation for heading
  const charVariants = {
    hidden: { opacity: 0, y: 20, rotateX: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.04,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Word animation for body text
  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Split text
  const headingText = "Your Practice. Anywhere, Anytime.";
  const headingChars = headingText.split("");

  const bodyText = "Take the power of Mudras and Yoga Nidra with you. Download the Mudras app and start your journey to balance, clarity, and inner peace.";
  const bodyWords = bodyText.split(" ");

  return (
    <motion.section
      ref={sectionRef}
      className={`w-full ${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`}
      style={{
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className={`${spacing.container} grid grid-cols-2 md:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-center`}
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* ── LEFT: Text content ── */}
        <motion.div
          className="flex flex-col"
          variants={fadeInLeft}
        >
          {/* Heading */}
          <h1 className={`${typography.aboutHeading} leading-tight mb-2 sm:mb-3`} style={{ color: textColor }}>
            Your Practice.<br />Anywhere, Anytime.
          </h1>

          {/* Underline */}
          <motion.div
            className="w-8 sm:w-10 lg:w-14 h-[2px] sm:h-[3px] rounded-full mt-1 sm:mt-2 mb-3 sm:mb-5"
            style={{ backgroundColor: textColor }}
            initial={{ width: 0 }}
            animate={isInView ? { width: "3.5rem" } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />

          {/* Body - Word by word */}
          <motion.p
            className={`${typography.heroBody} leading-relaxed mb-6 sm:mb-8 max-w-sm sm:max-w-md`}
            style={{ color: dark ? "#ffffff" : "#4b5563" }}
          >
            {bodyWords.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{ display: "inline-block", marginRight: "0.25em" }}
                transition={{ delay: i * 0.05 + 0.2 }}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          {/* Store badges */}
          <motion.div
            className="flex flex-row items-center gap-2.5 flex-wrap mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <AppStoreBadge dark={dark} />
            <GooglePlayBadge dark={dark} />
          </motion.div>

          {/* Star rating */}
          <StarRating rating={4.8} count="10K+" dark={dark} />

        </motion.div>

        {/* ── RIGHT: App mockup image ── */}
        <motion.div
          className="flex justify-center md:justify-end items-center w-full"
          variants={fadeInRight}
        >
          <motion.div
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
          >
            {IMAGES.Downloadapp ? (
              <Image
                src={IMAGES.Downloadapp}
                alt="Mudras App Preview"
                width={600}
                height={420}
                className="w-full max-w-[340px] sm:max-w-[420px] md:max-w-full object-contain rounded-2xl border-2"
                style={{
                  borderColor: dark ? "#374151" : "#e5e7eb",
                }}
                priority
              />
            ) : (
              <div className="w-full max-w-[340px] sm:max-w-[420px] md:max-w-full aspect-[4/3] rounded-2xl flex items-center justify-center border-2" style={{
                backgroundColor: dark ? "#374151" : "#f3f4f6",
                borderColor: dark ? "#374151" : "#e5e7eb",
              }}>
                <span className="text-sm" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>App Preview</span>
              </div>
            )}
          </motion.div>
        </motion.div>

      </motion.div>
    </motion.section>
  );
}