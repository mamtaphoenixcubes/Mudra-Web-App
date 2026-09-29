"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { typography } from "../../theme/typography";
import { spacing } from "../../theme/spacing";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";

export default function Research() {
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.2,
    margin: "-50px"
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const letterVariants = {
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

  const charVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.025,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, x: -30 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { 
        duration: 0.7, 
        ease: [0.22, 1, 0.36, 1],
        delay: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1],
        delay: 0.3
      }
    }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.5,
      },
    },
  };

  // Split text
  const labelText = "RESEARCH & RESPONSIBLE FRAMING";
  const labelChars = labelText.split("");
  
  const headingText = "Rooted in Tradition. Supported by Research.";
  const headingChars = headingText.split("");
  
  const bodyText = "Yoga Nidra is an ancient practice with growing scientific interest. Studies suggest it may help reduce stress, improve sleep, enhance mood and support overall well-being";
  const bodyWords = bodyText.split(" ");

  return (
    <motion.section 
      ref={sectionRef}
      className={`w-full ${spacing.sectionPadding} relative overflow-hidden`} 
      style={{
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className={spacing.container}>

        {/* ── Label + Heading ───────────────────────────────── */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-14 2xl:mb-16">
          {/* Label - Character by character */}
          <motion.p 
            className={`${typography.benefitsSectionLabel} mb-2 sm:mb-3`} 
            style={{ color: dark ? "#ffffff" : "#9ca3af" }}
          >
            {labelChars.map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{ display: "inline-block" }}
              >
                {char}
              </motion.span>
            ))}
          </motion.p>
          
          {/* Heading - Character by character */}
          <motion.h2 
            className={`${typography.benefitsSectionHeading} max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-5xl mx-auto`} 
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
                transition={{ delay: i * 0.025 + 0.2 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h2>
        </div>

        {/* ── Two-column layout ─────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-start gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-14 2xl:gap-20">

          {/* ── Left: image with zoom on hover ───────────────────── */}
          <motion.div 
            className="w-full md:w-[42%] lg:w-[40%] xl:w-[38%] 2xl:w-[36%] shrink-0"
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div 
              className="relative w-full aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
              style={{
                backgroundColor: dark ? "#374151" : "#f3f4f6",
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: `0 12px 40px ${textColor}25`,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <motion.div
                className="w-full h-full"
                whileHover={{ 
                  scale: 1.12,
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
              >
                <Image
                  src={IMAGES.ResearchYogaNidra}
                  alt="Yoga Nidra research"
                  fill
                  className="object-cover"
                />
              </motion.div>
              
              {/* Zoom indicator overlay - optional */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-black/0"
                whileHover={{ 
                  backgroundColor: "rgba(0,0,0,0.1)",
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div
                  className="opacity-0 flex items-center gap-2 text-white text-sm font-medium px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm"
                  whileHover={{ 
                    opacity: 1,
                    transition: { duration: 0.3 }
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                  Zoom
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── Right: body + disclaimer ──────────────────────── */}
          <div className="flex-1 flex flex-col justify-center">

            {/* Body - Word by word */}
            <motion.p 
              className={`${typography.sectionMbBody} mb-4 sm:mb-5 md:mb-6 lg:mb-8 xl:mb-10 2xl:mb-12`} 
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
                  transition={{ delay: i * 0.04 + 0.2 }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>

            {/* Disclaimer card */}
            <motion.div 
              className="rounded-xl flex flex-row items-start gap-3 sm:gap-4 lg:gap-5 2xl:gap-6 p-3 sm:p-4 md:p-5 lg:p-6 2xl:p-8 max-w-full md:max-w-[480px] lg:max-w-[520px] xl:max-w-[560px] 2xl:max-w-[700px]"
              style={{
                backgroundColor: dark ? "#374151" : "#EAE8F8",
              }}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{
                scale: 1.02,
                boxShadow: `0 8px 30px ${textColor}15`,
                transition: { duration: 0.3 }
              }}
            >
              {/* Icon */}
              <motion.div 
                className="shrink-0 mt-0.5 relative w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10"
                variants={iconVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <Image
                  src={IMAGES.ShieldTick}
                  alt="Shield check"
                  fill
                  className="object-contain"
                />
              </motion.div>

              <div>
                {/* Card Title - Character by character */}
                <motion.p 
                  className={`${typography.cardTitle} mb-0.5 sm:mb-1`} 
                  style={{ color: textColor }}
                >
                  {"Mudras is not a medical provider".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={letterVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      style={{ display: "inline-block" }}
                      transition={{ delay: i * 0.02 + 0.6 }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.p>
                
                {/* Card Body - Word by word */}
                <motion.p 
                  className={`${typography.cardBody}`} 
                  style={{ color: dark ? "#ffffff" : "#4b5563" }}
                >
                  {"Our content is for educational purposes only and is not a substitute for professional medical advice, diagnosis or treatment.".split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={wordVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      style={{ display: "inline-block", marginRight: "0.25em" }}
                      transition={{ delay: i * 0.04 + 0.7 }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}