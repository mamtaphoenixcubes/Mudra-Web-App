"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { spacing, typography, heroImage } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

export default function ElementDetailTemplateHero({
  category = "Five Elements",
  title = "Earth Element",
  tags = ["Stability", " Grounding", "Nurturing"],
  description = "The Earth element represents stability, strength, and nourishment. It is associated with grounding energy, physical body, and material well-being.",
  image = null,
  onPlayClick,
  onSaveClick,
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
        delay: i * 0.04,
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
            <span>›</span>
            <motion.div whileHover={{ x: 2, transition: { duration: 0.2 } }}>
              <Link href="/FiveElements" className="hover:text-primary transition-colors" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
                {category}
              </Link>
            </motion.div>
            <span>›</span>
            <motion.span 
              style={{ color: dark ? "#e5e7eb" : "#374151" }}
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

          {/* CTA buttons */}
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.button
              onClick={onPlayClick}
              className="text-white font-medium text-xs md:text-[10px] lg:text-sm rounded-xl px-5 py-2.5 transition-colors"
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
              Key Benefits
            </motion.button>
            <motion.button
              onClick={onSaveClick}
              className="font-medium text-xs md:text-[10px] lg:text-sm rounded-xl px-5 py-2.5 transition-colors"
              style={{
                border: dark ? "1px solid #ffffff" : "1px solid #d1d5db",
                color: dark ? "#e5e7eb" : "#374151",
                backgroundColor: "transparent",
              }}
              whileHover={{
                scale: 1.05,
                backgroundColor: dark ? "#374151" : "#f9fafb",
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              How to Balance
            </motion.button>
          </motion.div>

        </motion.div>

        {/* ── RIGHT: App mockup image using theme ── */}
        <motion.div 
          className={`${heroImage.wrapper} ${spacing.heroRightColW} order-2 md:order-2`}
          variants={fadeInRight}
        >
          <motion.div
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
            className="w-full max-w-[420px] sm:max-w-[500px] md:max-w-full mx-auto md:mx-0"
          >
            {(() => {
              const finalImage = image
                ? (image.startsWith("http") ? image : `http://192.168.1.14:1337${image}`)
                : IMAGES.EarthImage;
              return finalImage ? (
                <Image
                  src={finalImage}
                  alt="Mudras App Preview"
                  width={800}
                  height={600}
                  className={`${heroImage.width} h-auto object-contain rounded-2xl border-2`}
                  style={{
                    borderColor: dark ? "#374151" : "#e5e7eb",
                  }}
                  priority
                  unoptimized={true}
                />
              ) : (
                <div className="w-full aspect-[4/3] rounded-2xl flex items-center justify-center border-2" style={{
                  backgroundColor: dark ? "#374151" : "#f3f4f6",
                  borderColor: dark ? "#ffffff" : "#e5e7eb",
                }}>
                  <span className="text-sm" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>App Preview</span>
                </div>
              );
            })()}
          </motion.div>
        </motion.div>

      </motion.div>
    </motion.section>
  );
}