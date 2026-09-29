"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import { useRouter } from "next/navigation";

export default function BalancetheElements() {
  const { dark, textColor } = useTheme();
  const router = useRouter();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.2,
    margin: "-50px"
  });

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

  // Image animation
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, x: -30, rotateY: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      rotateY: 0,
      transition: { 
        duration: 0.7, 
        ease: [0.22, 1, 0.36, 1],
        delay: 0.2
      }
    }
  };

  // Button animation
  const buttonVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: [0.22, 1, 0.36, 1],
        delay: 0.4
      }
    }
  };

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  // Split text
  const headingText = "Balance the Elements. Balance Your Life.";
  const headingLines = headingText.split(". ");
  const headingChars = headingText.split("");
  
  const bodyText = "Explore personalized tools, mudras and practices to balance elements and thrive every day.";
  const bodyWords = bodyText.split(" ");

  // Floating particles
  const particles = [
    { id: 1, x: 10, y: 20, size: 3, duration: 6, delay: 0 },
    { id: 2, x: 85, y: 15, size: 4, duration: 8, delay: 1 },
    { id: 3, x: 20, y: 80, size: 2, duration: 5, delay: 2 },
    { id: 4, x: 75, y: 85, size: 3, duration: 7, delay: 0.5 },
  ];

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
      {/* Background decorative elements */}
      <motion.div
        className="absolute -top-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-5"
        style={{ backgroundColor: textColor }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-5"
        style={{ backgroundColor: textColor }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Floating Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: textColor,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: 0.05,
          }}
          animate={{
            y: [0, -30 - p.id * 5, 0],
            x: [0, (p.id % 2 === 0 ? 1 : -1) * 15, 0],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="w-full max-w-7xl sm:max-w-[90%] md:max-w-[1000px] lg:max-w-[1100px] xl:max-w-[1200px] 2xl:max-w-[2100px] mx-auto">

        {/* Card */}
        <motion.div 
          className={`bg-[#E9FFDB] ${spacing.ctaCardRadius} ${spacing.ctaCardPad} flex flex-col sm:flex-row items-center ${spacing.ctaCardGap} relative`}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          whileHover={{
            boxShadow: dark 
              ? "0 20px 60px rgba(0,0,0,0.3)"
              : "0 20px 60px rgba(0,0,0,0.1)",
            transition: { duration: 0.3 }
          }}
        >
          {/* Image with zoom on hover */}
          <motion.div 
            className={`${spacing.ctaImgWidth} aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shrink-0 cursor-pointer relative`} 
            style={{
              backgroundColor: dark ? "#374151" : "#e5e7eb",
            }}
            variants={imageVariants}
            whileHover={{ 
              scale: 1.05,
              boxShadow: `0 12px 40px ${textColor}25`,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
          >
            {IMAGES.JourneyInward && (
              <motion.div
                className="w-full h-full"
                whileHover={{ 
                  scale: 1.12,
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
              >
                <Image
                  src={IMAGES.JourneyInward}
                  alt="Transform Your Life"
                  width={600}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
            
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

          {/* Text */}
          <motion.div 
            className="flex flex-col items-start w-full sm:flex-1"
            variants={containerVariants}
          >
            {/* Heading - Character by character with line breaks */}
            <motion.h2 
              className={`${typography.ctaHeading} ${spacing.ctaTitleMb}`} 
              style={{ color: textColor }}
            >
              {headingLines.map((line, lineIndex) => (
                <motion.span
                  key={lineIndex}
                  className="block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{
                    delay: lineIndex * 0.2 + 0.2,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {line.split("").map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      custom={charIndex}
                      variants={charVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      style={{ display: "inline-block" }}
                      transition={{ delay: charIndex * 0.03 + lineIndex * 0.2 + 0.2 }}
                    >
                      {char === " " ? "\u00A0" : char}
                      {charIndex === line.length - 1 && lineIndex === 0 && "."}
                    </motion.span>
                  ))}
                </motion.span>
              ))}
            </motion.h2>

            {/* Body - Word by word */}
            <motion.p 
              className={`${typography.ctaBody} ${spacing.ctaBodyMb}`} 
              style={{ color: dark ? "#000000" : "#4b5563" }}
            >
              {bodyWords.map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  style={{ display: "inline-block", marginRight: "0.25em" }}
                  transition={{ delay: i * 0.05 + 0.3 }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>

            {/* CTA button */}
            <motion.button 
              className={`
                ${typography.ctaBtnText} ${spacing.ctaBtnPad} ${spacing.ctaBtnMb}
                rounded-lg sm:rounded-xl
                transition-all duration-200 cursor-pointer
                shadow-[7.19px_8.13px_2.65px_0px_rgba(0,0,0,0.06)]
                relative overflow-hidden group
              `}
              style={{
                backgroundColor: textColor,
                color: "#ffffff",
              }}
              variants={buttonVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: `0 8px 40px ${textColor}40`,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/MudraLibrary")}
            >
              <motion.span
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative flex items-center gap-2">
                Explore Element Tracker
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </motion.div>

          {/* Decorative corner accents */}
          <motion.div
            className="absolute top-0 right-0 w-20 h-20"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2" style={{ borderColor: textColor + "20" }} />
          </motion.div>
          <motion.div
            className="absolute bottom-0 left-0 w-20 h-20"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2" style={{ borderColor: textColor + "20" }} />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}