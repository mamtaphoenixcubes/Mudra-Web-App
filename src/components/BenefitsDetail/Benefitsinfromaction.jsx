"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { card, maxW, spacing, typography } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";

const benefits = [
  { 
    title: "Inner Peace", 
    icon: IMAGES.HastaMudras, 
    description: "Experience deep calm and tranquility in your daily life.", 
    bg: "bg-benefit-1",
    iconEmoji: "☮️"
  },
  { 
    title: "Mental Clarity", 
    icon: IMAGES.KayaMudras, 
    description: "Cut through mental fog and think with razor-sharp focus.", 
    bg: "bg-benefit-2",
    iconEmoji: "💡"
  },
  { 
    title: "Better Sleep", 
    icon: IMAGES.ManaMudras, 
    description: "Fall asleep faster and wake up feeling completely refreshed.", 
    bg: "bg-benefit-3",
    iconEmoji: "🌙"
  },
  { 
    title: "Emotional Balance", 
    icon: IMAGES.BandhaMudras, 
    description: "Manage your emotions and build unshakeable inner strength.", 
    bg: "bg-benefit-4",
    iconEmoji: "⚖️"
  },
];

export default function Benefitsinfromaction() {
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.15,
    margin: "-50px"
  });

  // Letter animation for label
  const letterVariants = {
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

  // Character animation for heading
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

  // Word animation for subtitle
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

  // Container animation for cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      }
    }
  };

  // Split text
  const labelText = "KEY BENEFITS";
  const labelChars = labelText.split("");
  
  const headingText = "What Mudras Can Do For You";
  const headingChars = headingText.split("");
  
  const subtitleText = "Discover the powerful benefits of regular mudra practice for your well-being.";
  const subtitleWords = subtitleText.split(" ");

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

      <div className={spacing.container}>

        <div className={`text-center ${spacing.headingBlockMb}`}>
          {/* Label - Character by character */}
          <motion.p 
            className={`${typography.sectionLabel}`} 
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
            className={`${typography.sectionMbHeading} ${spacing.labelMt}`} 
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
          
          {/* Subtitle - Word by word */}
          <motion.p 
            className={`${typography.sectionMbBody} ${maxW.sectionBody} ${spacing.bodyMt}`} 
            style={{ color: dark ? "#ffffff" : "#4b5563" }}
          >
            {subtitleWords.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{ display: "inline-block", marginRight: "0.25em" }}
                transition={{ delay: i * 0.04 + 0.4 }}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        </div>

        {/* Desktop: 4 columns */}
        <motion.div 
          className={`hidden md:grid md:grid-cols-4 ${spacing.cardMbGap} items-stretch`}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {benefits.map((item, i) => (
            <Card key={i} item={item} dark={dark} textColor={textColor} index={i} isInView={isInView} />
          ))}
        </motion.div>

        {/* Mobile: 2-col grid */}
        <div className="md:hidden">
          <motion.div 
            className={`grid grid-cols-2 ${spacing.cardGapSm}`}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {benefits.slice(0, 4).map((item, i) => (
              <Card key={i} item={item} dark={dark} textColor={textColor} index={i} isInView={isInView} />
            ))}
          </motion.div>
          {benefits.length % 2 !== 0 && (
            <motion.div 
              className="flex justify-center mt-3 sm:mt-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="w-[calc(50%-6px)] sm:w-[calc(50%-8px)]">
                <Card item={benefits[benefits.length - 1]} dark={dark} textColor={textColor} index={4} isInView={isInView} />
              </div>
            </motion.div>
          )}
        </div>

      </div>
    </motion.section>
  );
}

function Card({ item, dark, textColor, index, isInView }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.08
      }
    }
  };

  const titleChars = item.title.split("");
  const descWords = item.description.split(" ");

  return (
    <motion.div 
      className={`
        ${item.bg} ${card.radius} ${card.hover}
        ${spacing.cardPadding}
        ${spacing.cardMinH}
        text-center flex flex-col items-center w-full h-full
        relative overflow-hidden
      `}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        boxShadow: `0 12px 40px ${item.color}30`,
        transition: { duration: 0.3 }
      }}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-2xl opacity-10"
        style={{ backgroundColor: item.color }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.2,
        }}
      />

      {/* Icon circle */}
      <motion.div 
        className={`
          rounded-full
          ${spacing.cardIconBox} ${spacing.cardIconBoxMb}
          flex items-center justify-center shrink-0 relative
        `} 
        style={{
          backgroundColor: dark ? "#ffffff" : "#ffffff",
        }}
        whileHover={{ 
          scale: 1.15,
          rotate: 5,
          boxShadow: `0 8px 30px ${item.color}40`,
          transition: { duration: 0.3 }
        }}
      >
        <Image
          src={item.icon}
          alt={item.title}
          width={28}
          height={28}
          className="object-contain relative z-10"
        />
        
        {/* Pulsing ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: `2px solid ${item.color}30` }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2,
          }}
        />
      </motion.div>

      {/* Title - Character by character */}
      <motion.h3 
        className={`${typography.cardTitle} ${spacing.cardTitleMb}`} 
        style={{ color: textColor }}
        whileHover={{ 
          color: item.color,
          scale: 1.05,
          transition: { duration: 0.2 }
        }}
      >
        {titleChars.map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={{
              hidden: { opacity: 0, y: 10, scale: 0.8 },
              visible: (i) => ({
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  delay: i * 0.03 + index * 0.08 + 0.3,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                },
              }),
            }}
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
        className={`${typography.cardBody}`}
        style={{ color: dark ? "#000000" : "#374151" }}
      >
        {descWords.map((word, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: (i) => ({
                opacity: 1,
                y: 0,
                transition: {
                  delay: i * 0.04 + index * 0.08 + 0.4,
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                },
              }),
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ display: "inline-block", marginRight: "0.25em" }}
          >
            {word}
          </motion.span>
        ))}
      </motion.p>


      {/* Floating particles */}
      {[...Array(2)].map((_, p) => (
        <motion.div
          key={p}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 2 + p * 2,
            height: 2 + p * 2,
            backgroundColor: item.color,
            left: `${20 + p * 40}%`,
            top: `${10 + p * 35}%`,
            opacity: 0.08,
          }}
          animate={{
            y: [0, -15 - p * 10, 0],
            x: [0, (p % 2 === 0 ? 1 : -1) * 8, 0],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 4 + p * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p * 0.5,
          }}
        />
      ))}
    </motion.div>
  );
}