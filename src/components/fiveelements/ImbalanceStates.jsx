"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { card, spacing, typography } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";

const PROBLEMS = [
  {
    title: "Earth Imbalance",
    icon: IMAGES.EarthIcon,
    bg: "bg-problem-1",
    color: "#4CAF50",
    bullets: [
      "Feeling ungrounded",
      "Fatigue",
      "Overthinking",
      "Digestive heaviness",
    ],
  },
  {
    title: "Water Imbalance",
    icon: IMAGES.WaterIcon,
    bg: "bg-problem-2",
    color: "#2196F3",
    bullets: [
      "Emotional ups and downs",
      "Water retention",
      "Lack of creativity",
      "Joint stiffness",
    ],
  },
  {
    title: "Fire Imbalance",
    icon: IMAGES.FireIcon,
    bg: "bg-problem-3",
    color: "#f44336",
    bullets: [
      "Irritability or anger",
      "Acid reflux",
      "Low confidence",
      "Inflammation",
    ],
  },
  {
    title: "Air Imbalance",
    icon: IMAGES.AirIcon,
    bg: "bg-problem-4",
    color: "#9C27B0",
    bullets: [
      "Anxiety",
      "Restlessness",
      "Dry skin",
      "Poor digestion",
    ],
  },
  {
    title: "Space Imbalance",
    icon: IMAGES.SpaceIcon,
    bg: "bg-problem-5",
    color: "#FF9800",
    bullets: [
      "Disconnection",
      "Lack of purpose",
      "Mental fog",
      "Insomnia",
    ],
  },
];

const documentIds = {
  "Water": "taqtjc5zg7zt46uv3fy0dimr",
  "Fire": "b7vupswbjvkqyxijo50swxkr",
  "Air": "vf3u1ukmxn229f66p6jg6m6r",
  "Space": "sr0xc8z5coitas3l7l2n75g1",
  "Earth": "in4vcbjj65hiqpk4gs49mja7"
};

function Card({ item, dark, textColor, index, isInView }) {
  const router = useRouter();
  const element = item.title.split(" ")[0];
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
        delay: index * 0.08
      }
    }
  };

  // Title character animation
  const titleCharVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.04 + index * 0.08 + 0.3,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Bullet item animation
  const bulletVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.06 + index * 0.08 + 0.4,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const titleChars = item.title.split("");

  return (
    <motion.div 
      onClick={() => router.push(`/ElementDetailTemplate?id=${documentIds[element]}`)}
      className={`${item.bg} ${card.radius} ${card.hover} ${spacing.cardPadding} ${spacing.cardMinH} flex flex-col items-center w-full h-full relative overflow-hidden cursor-pointer`}
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
        className={`rounded-full ${spacing.cardIconBox} ${spacing.cardIconBoxMb} flex items-center justify-center shrink-0 relative`} 
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
          className={`${spacing.cardIconInner} object-contain relative z-10`} 
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
            delay: index * 0.15,
          }}
        />
      </motion.div>

      {/* Title - Character by character */}
      <motion.h3 
        className={`${typography.cardTitle} ${spacing.cardTitleMb} text-center`} 
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
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h3>

      {/* Bullet list */}
      <ul className="w-full mt-1 sm:mt-1.5 md:mt-2 space-y-0.5 sm:space-y-1">
        {item.bullets.map((b, i) => (
          <motion.li 
            key={i} 
            custom={i}
            variants={bulletVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={`${typography.cardBody} flex items-start gap-1 sm:gap-1.5`} 
            style={{ color: dark ? "#141414" : "#4b5563" }}
          >
            <motion.span 
              className="mt-[3px] shrink-0 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full inline-block" 
              style={{
                backgroundColor: textColor,
                opacity: 0.6,
              }}
              animate={{
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.15,
              }}
            />
            <span>{b}</span>
          </motion.li>
        ))}
      </ul>


    </motion.div>
  );
}

export default function ImbalanceStates() {
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
        delay: i * 0.03,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Split text
  const labelText = "IMBALANCE STATES";
  const labelChars = labelText.split("");
  
  const headingText = "Signs of Elemental Imbalance";
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

        {/* Heading */}
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
                transition={{ delay: i * 0.03 + 0.2 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h2>
        </div>

        {/* Desktop: 5-col grid */}
        <div className={`hidden md:grid md:grid-cols-5 ${spacing.cardMbGap} items-stretch`}>
          {PROBLEMS.map((item, i) => (
            <Card key={i} item={item} dark={dark} textColor={textColor} index={i} isInView={isInView} />
          ))}
        </div>

        {/* Mobile: 2-col grid + last card centred */}
        <div className="md:hidden">
          <div className={`grid grid-cols-2 ${spacing.cardGapSm}`}>
            {PROBLEMS.slice(0, 4).map((item, i) => (
              <Card key={i} item={item} dark={dark} textColor={textColor} index={i} isInView={isInView} />
            ))}
          </div>
          <motion.div 
            className="flex justify-center mt-3 sm:mt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="w-[calc(50%-6px)] sm:w-[calc(50%-8px)]">
              <Card item={PROBLEMS[4]} dark={dark} textColor={textColor} index={4} isInView={isInView} />
            </div>
          </motion.div>
        </div>

      </div>
    </motion.section>
  );
}