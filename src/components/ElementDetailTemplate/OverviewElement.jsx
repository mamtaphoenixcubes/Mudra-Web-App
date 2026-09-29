"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { spacing, typography } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";

export default function OverviewElement({ overview = null, title = null }) {
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.1,
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

  const slideInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  // Character animation for heading
  const charVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.06,
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

  const headingText = "Overview";
  const headingChars = headingText.split("");
  
  const descriptionText = overview || "Earth is the foundation of life. It provides structure, support, and nourishment. When balanced, it brings feelings of security, patience, and abundance. When imbalanced, it can lead to heaviness, lethargy, and attachment.";
  const descriptionWords = descriptionText.split(" ");

  return (
    <motion.section 
      ref={sectionRef}
      className={`w-full ${spacing.sectionPaddingX} ${spacing.sectionPaddingY} flex justify-center`} 
      style={{
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className={`${typography.gyanMudraCard.container} max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl`}
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        whileHover={{
          boxShadow: dark 
            ? "0 8px 30px rgba(0,0,0,0.3)"
            : "0 8px 30px rgba(0,0,0,0.06)",
          transition: { duration: 0.3 }
        }}
      >
        {/* Icon Circle with Image */}
        <motion.div 
          className={typography.gyanMudraCard.iconWrapper} 
          style={{
            backgroundColor: dark ? "#ffffff" : "#f3f4f6",
          }}
          variants={slideInLeft}
          whileHover={{
            scale: 1.1,
            rotate: 5,
            transition: { duration: 0.2 }
          }}
        >
          <Image
            src={IMAGES.VectorImage}
            alt="Gyan Mudra"
            width={80}
            height={80}
            className={typography.gyanMudraCard.iconImage}
          />
        </motion.div>

        {/* Content */}
        <motion.div 
          className={typography.gyanMudraCard.contentWrapper}
          variants={slideInRight}
        >
          {/* Heading - Character by character */}
          <motion.h3 
            className={typography.gyanMudraCard.title} 
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
          </motion.h3>

          {/* Description - Word by word */}
          <motion.p 
            className={typography.gyanMudraCard.description} 
            style={{ color: dark ? "#000000" : "#4b5563" }}
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
        </motion.div>

      </motion.div>
    </motion.section>
  );
}