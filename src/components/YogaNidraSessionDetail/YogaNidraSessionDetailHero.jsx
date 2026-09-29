"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, BarChart2, Headphones, Play, Bookmark, Heart, Download, Share2 } from "lucide-react";
import { IMAGES } from "../../assets/assets";
import { spacing, typography, heroImage } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

export default function YogaNidraSessionDetailHero({
  category = "Yoga Nidra",
  title = "Deep Relaxation Yoga Nidra",
  tags = ["Relaxation", " Restorative", "Rejuvenating"],
  description = "This Yoga Nidra session is designed to guide you into deep rest and relaxation, helping you release stress, calm the mind, and restore energy.",
  duration = "30 min",
  level = "Beginner Friendly",
  audioGuided = true,
  onPlayClick,
  onSaveClick,
  onLikeClick,
  onDownloadClick,
  onShareClick,
  isLiked = false,
  isSaved = false,
  isDownloaded = false,
  imgSrc = null,
}) {
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
        delay: i * 0.03,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Word animation for description
  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.04,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Breadcrumb animation
  const breadcrumbVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.1,
      },
    },
  };

  // Tag animation
  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.2,
      },
    },
  };

  // Metadata items animation
  const metaVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08 + 0.3,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  const headingText = title;
  const headingChars = headingText.split("");
  const descriptionWords = description.split(" ");

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
        className={`${spacing.container} grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-center`}
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* ── LEFT: Text content ── */}
        <motion.div 
          className="flex flex-col items-start order-1 md:order-1"
          variants={fadeInLeft}
        >
          {/* Breadcrumb */}
          <motion.nav 
            className="flex items-center gap-2 text-xs md:text-[10px] lg:text-sm mb-4" 
            style={{ color: dark ? "#9ca3af" : "#6b7280" }}
            variants={breadcrumbVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div whileHover={{ x: 2, transition: { duration: 0.2 } }}>
              <Link href="/Home" className="hover:text-primary transition-colors cursor-pointer" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
                Home
              </Link>
            </motion.div>
            <span>&gt;</span>
            <motion.div whileHover={{ x: 2, transition: { duration: 0.2 } }}>
              <Link href="/YogaNidraLibrary" className="hover:text-primary transition-colors cursor-pointer" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
                Yoga Nidra
              </Link>
            </motion.div>
            <span>&gt;</span>
            <motion.span 
              style={{ color: dark ? "#ffffff" : "#374151" }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              {title}
            </motion.span>
          </motion.nav>

          {/* Heading - Character by character */}
          <motion.h1 
            className={`${typography.heroHeading} mb-3`} 
            style={{ color: textColor }}
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

          {/* Tag pill */}
          <motion.div 
            className="text-xs md:text-[10px] lg:text-sm font-medium rounded-full px-4 py-1.5 mb-5" 
            style={{
              backgroundColor: dark ? textColor + "20" : textColor + "20",
              color: textColor,
            }}
            variants={tagVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            {tags.join(" • ")}
          </motion.div>

          {/* Description - Word by word */}
          <motion.p 
            className="text-xs md:text-[10px] lg:text-base leading-relaxed mb-6 max-w-xl" 
            style={{ color: dark ? "#ffffff" : "#4b5563" }}
          >
            {descriptionWords.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{ display: "inline-block", marginRight: "0.25em" }}
                transition={{ delay: i * 0.04 + 0.2 }}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          {/* Metadata row */}
          <div className="flex items-center gap-5 text-xs md:text-[10px] lg:text-sm mb-8" style={{ color: dark ? "#ffffff" : "#6b7280" }}>
            {[
              { icon: Clock, label: duration },
              { icon: BarChart2, label: level },
              ...(audioGuided ? [{ icon: Headphones, label: "Audio Guided" }] : []),
            ].map((item, i) => (
              <motion.span 
                key={i} 
                className="flex items-center gap-1.5"
                custom={i}
                variants={metaVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <item.icon size={16} style={{ color: dark ? "#ffffff" : "#9ca3af" }} />
                {item.label}
              </motion.span>
            ))}
          </div>

          {/* CTA buttons */}
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.button
              onClick={onPlayClick}
              className="flex items-center gap-2 text-white font-medium text-xs md:text-[10px] lg:text-sm rounded-xl px-5 py-2.5 transition-colors"
              style={{
                backgroundColor: textColor,
              }}
              whileHover={{
                scale: 1.05,
                opacity: 0.85,
                boxShadow: `0 4px 20px ${textColor}40`,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Play size={16} fill="currentColor" />
              Play Session
            </motion.button>
            <motion.button
              onClick={onSaveClick}
              className="flex items-center gap-2 font-medium text-xs md:text-[10px] lg:text-sm rounded-xl px-5 py-2.5 transition-colors"
              style={{
                border: dark ? "1px solid #ffffff" : "1px solid #d1d5db",
                color: isSaved ? "#10b981" : (dark ? "#ffffff" : "#374151"),
                backgroundColor: isSaved ? "rgba(16, 185, 129, 0.1)" : "transparent",
              }}
              whileHover={{
                scale: 1.05,
                backgroundColor: isSaved ? "rgba(16, 185, 129, 0.15)" : (dark ? "#374151" : "#f9fafb"),
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
              {isSaved ? "Saved" : "Save"}
            </motion.button>
            <motion.button
              onClick={onLikeClick}
              className="flex items-center gap-2 font-medium text-xs md:text-[10px] lg:text-sm rounded-xl px-5 py-2.5 transition-colors"
              style={{
                border: dark ? "1px solid #ffffff" : "1px solid #d1d5db",
                color: isLiked ? "#ef4444" : (dark ? "#ffffff" : "#374151"),
                backgroundColor: isLiked ? "rgba(239, 68, 68, 0.1)" : "transparent",
              }}
              whileHover={{
                scale: 1.05,
                backgroundColor: isLiked ? "rgba(239, 68, 68, 0.15)" : (dark ? "#374151" : "#f9fafb"),
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
              {isLiked ? "Liked" : "Like"}
            </motion.button>
            <motion.button
              onClick={onDownloadClick}
              className="flex items-center gap-2 font-medium text-xs md:text-[10px] lg:text-sm rounded-xl px-5 py-2.5 transition-colors"
              style={{
                border: dark ? "1px solid #ffffff" : "1px solid #d1d5db",
                color: isDownloaded ? "#3b82f6" : (dark ? "#ffffff" : "#374151"),
                backgroundColor: isDownloaded ? "rgba(59, 130, 246, 0.1)" : "transparent",
              }}
              whileHover={{
                scale: 1.05,
                backgroundColor: isDownloaded ? "rgba(59, 130, 246, 0.15)" : (dark ? "#374151" : "#f9fafb"),
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={16} />
              {isDownloaded ? "Downloaded" : "Download"}
            </motion.button>
            <motion.button
              onClick={onShareClick}
              className="flex items-center gap-2 font-medium text-xs md:text-[10px] lg:text-sm rounded-xl px-5 py-2.5 transition-colors"
              style={{
                border: dark ? "1px solid #ffffff" : "1px solid #d1d5db",
                color: dark ? "#ffffff" : "#374151",
                backgroundColor: "transparent",
              }}
              whileHover={{
                scale: 1.05,
                backgroundColor: dark ? "#374151" : "#f9fafb",
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 size={16} />
              Share
            </motion.button>
          </motion.div>

        </motion.div>

        {/* ── RIGHT: App mockup image using theme ── */}
        <motion.div 
          className={`${heroImage.wrapper} ${spacing.heroRightColW} order-2 md:order-2`}
          variants={fadeInRight}
        >
          <div className="flex justify-center md:justify-end items-center w-full">
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={title}
              className="w-full max-w-[340px] sm:max-w-[450px] md:max-w-[560px] lg:max-w-full object-cover border-2 border-gray-200 rounded-2xl aspect-[3/2]"
              onError={(e) => {
                e.target.src = IMAGES.MudraDetailTemplate.src || IMAGES.MudraDetailTemplate;
              }}
            />
          ) : IMAGES.MudraDetailTemplate ? (
            <Image
              src={IMAGES.MudraDetailTemplate}
              alt="Mudras App Preview"
              width={600}
              height={420}
              className="w-full max-w-[340px] sm:max-w-[450px] md:max-w-[560px] lg:max-w-full object-contain border-2 border-gray-200 rounded-2xl"
              priority
            />
          ) : (
            <div className="w-full max-w-[340px] sm:max-w-[420px] md:max-w-[560px] lg:max-w-full aspect-[4/3] bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-gray-200">
              <span className="text-gray-400 text-sm">App Preview</span>
            </div>
          )}
        </div>
        </motion.div>

      </motion.div>
    </motion.section>
  );
}