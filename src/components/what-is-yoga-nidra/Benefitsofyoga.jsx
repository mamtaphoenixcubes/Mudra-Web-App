"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { card, spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import { mudraService } from "../../services/apiService";

const fallbackBenefits = [
  {
    title: "Deep Relaxation",
    description: "Activates the body's relaxation response and calms the nervous system.",
    bg: "bg-problem-1",
    cardBg: "#FFF6BF",
    icon: "🧘",
    color: "#ef4444"
  },
  {
    title: "Better Sleep",
    description: "Improves sleep quality and helps reduce insomnia.",
    bg: "bg-problem-2",
    cardBg: "#EBCFFF",
    icon: "😴",
    color: "#8b5cf6"
  },
  {
    title: "Stress Relief",
    description: "Reduces stress anxiety and emotional overwhelm.",
    bg: "bg-problem-3",
    cardBg: "#CBECFF",
    icon: "🌿",
    color: "#06b6d4"
  },
  {
    title: "Emotional Balance",
    description: "Supports emotional healing and inner stability.",
    bg: "bg-problem-4",
    cardBg: "#FFDBE7",
    icon: "⚖️",
    color: "#10b981"
  },
  {
    title: "Improved Focus",
    description: "Enhances clarity concentration and mental performance.",
    bg: "bg-problem-5",
    cardBg: "#E9FFDB",
    icon: "🎯",
    color: "#f59e0b"
  },
  {
    title: "Energy Restoration",
    description: "Replenishes energy and promotes overall well-being.",
    bg: "bg-problem-1",
    cardBg: "#FFF6BF",
    icon: "⚡",
    color: "#3b82f6"
  },
];

const YOGA_BENEFIT_METADATA = {
  "deep relaxation": { icon: "🧘", color: "#ef4444" },
  "better sleep": { icon: "😴", color: "#8b5cf6" },
  "stress relief": { icon: "🌿", color: "#06b6d4" },
  "emotional balance": { icon: "⚖️", color: "#10b981" },
  "improved focus": { icon: "🎯", color: "#f59e0b" },
  "energy restoration": { icon: "⚡", color: "#3b82f6" },
};

// ─── Animation Variants ──────────────────────────────────────

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
      delay: i * 0.035,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// Title character animation
const titleCharVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.03,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// Description word animation
const descWordVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// Card animation
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1],
    }
  }
};

// Container animation for cards
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    }
  }
};

export default function BenefitsOfYoga() {
  const { dark, textColor } = useTheme();
  const [benefitsList, setBenefitsList] = useState([]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.15,
    margin: "-50px"
  });

  useEffect(() => {
    async function fetchYogaBenefits() {
      try {
        const response = await mudraService.getYogaNidrasBenefits();
        let list = [];
        if (response && response.data) {
          list = response.data;
        } else if (response && Array.isArray(response)) {
          list = response;
        }
        
        if (list.length > 0) {
          const mapped = list.map((item, index) => {
            const titleKey = (item.Name || item.name || "").toLowerCase();
            const meta = YOGA_BENEFIT_METADATA[titleKey] || {
              icon: "🧘",
              color: "#ef4444"
            };
            return {
              id: item.id,
              documentId: item.documentId,
              title: item.Name || item.name || "Benefit",
              description: item.Description || item.description || "Description",
              cardBg: item.CardBg || item.cardBg || "#FFF6BF",
              icon: meta.icon,
              color: meta.color,
              bg: `bg-problem-${(index % 5) + 1}`
            };
          });
          setBenefitsList(mapped);
        } else {
          setBenefitsList(fallbackBenefits);
        }
      } catch (err) {
        console.warn("Failed to fetch Yoga Nidra benefits, using fallbacks:", err);
        setBenefitsList(fallbackBenefits);
      }
    }
    fetchYogaBenefits();
  }, []);

  const displayItems = benefitsList.length > 0 ? benefitsList : fallbackBenefits;

  // Split text
  const labelText = "BENEFITS OF YOGA NIDRA";
  const labelChars = labelText.split("");
  
  const headingText = "Deep Rest. Lasting Benefits.";
  const headingChars = headingText.split("");

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

        {/* Heading block */}
        <div className={`text-center ${spacing.headingBlockMb}`}>
          {/* Label - Character by character */}
          <motion.p 
            className={`${typography.benefitsSectionLabel}`} 
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
            className={`${typography.benefitsSectionHeading} ${spacing.labelMt}`} 
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
                transition={{ delay: i * 0.035 + 0.2 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h2>
        </div>

        {/* Tablet → Large screen: 6 columns */}
        <motion.div 
          className={`hidden md:grid md:grid-cols-6 ${spacing.cardGap}`}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {displayItems.map((item, i) => (
            <Card key={item.documentId || i} item={item} dark={dark} textColor={textColor} index={i} isInView={isInView} />
          ))}
        </motion.div>

        {/* Mobile: 2-col grid */}
        <div className="md:hidden">
          <motion.div 
            className={`grid grid-cols-2 items-stretch ${spacing.cardGapSm}`}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {displayItems.map((item, i) => (
              <Card key={item.documentId || i} item={item} dark={dark} textColor={textColor} index={i} isInView={isInView} />
            ))}
          </motion.div>
        </div>

      </div>
    </motion.section>
  );
}

function Card({ item, dark, textColor, index, isInView }) {
  const titleChars = (item.title || "").split("");
  const descWords = (item.description || "").split(" ");

  const cardBgStyle = dark 
    ? { backgroundColor: "#1f2937" } 
    : (item.cardBg && item.cardBg.startsWith("#") ? { backgroundColor: item.cardBg } : {});

  return (
    <motion.div
      className={`
        ${!item.cardBg ? item.bg : ""} ${card.radius} ${card.hover}
        ${spacing.cardPadding} ${spacing.benefitsCardMinH}
        flex flex-col items-center text-center
        w-full h-full
        relative overflow-hidden
      `}
      style={cardBgStyle}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: index * 0.06 }}
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
          opacity: [0.05, 0.12, 0.05],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.15,
        }}
      />

      {/* Icon circle */}
      <motion.div
        className={`
          rounded-full flex items-center justify-center shrink-0
          ${spacing.benefitsIconBox} ${spacing.benefitsIconBoxMb}
          relative
        `}
        style={{
          backgroundColor: dark ? "#fafafa" : "#ffffff",
        }}
        whileHover={{ 
          scale: 1.15,
          rotate: 5,
          boxShadow: `0 8px 30px ${item.color}40`,
          transition: { duration: 0.3 }
        }}
      >
        <span className="text-lg relative z-10 select-none">{item.icon}</span>
        
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
            delay: index * 0.15,
          }}
        />
      </motion.div>

      {/* Title - Character by character */}
      <motion.h3 
        className={`${typography.benefitsCardTitle} ${spacing.cardTitleMb}`} 
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
            variants={titleCharVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ display: "inline-block" }}
            transition={{ delay: i * 0.03 + index * 0.06 + 0.3 }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h3>

      {/* Description - Word by word */}
      <motion.p 
        className={`${typography.benefitsCardBody}`} 
        style={{ color: dark ? "#ffffff" : "#4b5563" }}
      >
        {descWords.map((word, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={descWordVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ display: "inline-block", marginRight: "0.25em" }}
            transition={{ delay: i * 0.04 + index * 0.06 + 0.4 }}
          >
            {word}
          </motion.span>
        ))}
      </motion.p>

      {/* Floating particle */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 2,
          height: 2,
          backgroundColor: item.color,
          right: "15%",
          top: "20%",
          opacity: 0.1,
        }}
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 4 + index * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.2,
        }}
      />
    </motion.div>
  );
}