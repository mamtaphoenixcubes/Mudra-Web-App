"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { typography, spacing } from "../../theme";
import { IMAGES } from "../../assets/assets";
import Image from "next/image";
import { useTheme } from "../../context/ThemeContext";

const features = [
  {
    icon: IMAGES.Energy,
    title: "100+ Mudras",
    desc: "Detailed guides and benefits",
  },
  {
    icon: IMAGES.HeadPhone,
    title: "100+ Yoga Nidra",
    desc: "Guided sessions for every need",
  },
  {
    icon: IMAGES.Recommendations,
    title: "Personalized Recommendations",
    desc: "Tailored to you",
  },
  {
    icon: IMAGES.EmotionalBalance,
    title: "Track & Save",
    desc: "Your progress and favorites",
  },
  {
    icon: IMAGES.OfflineAccess,
    title: "Offline Access",
    desc: "Practice anytime, anywhere",
  },
  {
    icon: IMAGES.IconPractice,
    title: "Export Content",
    desc: "Articles, guides and more",
  },
];

export default function CompletePracticeSection() {
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

  // Container variants for stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  // Item variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
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

  const headingText = "Everything You Need for a Complete Practice";
  const headingChars = headingText.split("");

  return (
    <motion.section 
      ref={sectionRef}
      className={`${spacing.sectionPaddingX} py-8 sm:py-10 md:py-12 lg:py-16`} 
      style={{
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="bg-primary/10 border border-primary/20 rounded-2xl p-6 sm:p-8 md:p-10"
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
        {/* Heading - Character by character */}
        <motion.h2
          className={`${typography.sectionMbHeading} text-center mb-8 sm:mb-10`}
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
        </motion.h2>

        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((item, index) => (
            <motion.div
              key={item.title}
              className="flex flex-col items-center text-center gap-3"
              variants={itemVariants}
              whileHover={{
                y: -6,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-sm" 
                style={{
                  backgroundColor: dark ? "#374151" : "#ffffff",
                }}
                whileHover={{
                  scale: 1.12,
                  rotate: 5,
                  transition: { duration: 0.2 }
                }}
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
                  style={{
                    filter: dark ? "brightness(0.8) invert(1)" : "none",
                  }}
                />
              </motion.div>
              <motion.h3 
                className={`${typography.cardTitle} font-semibold`} 
                style={{ color: textColor }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                {item.title}
              </motion.h3>
              <p className={`${typography.cardBody}`} style={{ color: dark ? "#ffffff" : "#6b7280" }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}