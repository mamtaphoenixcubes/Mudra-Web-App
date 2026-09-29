"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { IMAGES } from "../../assets/assets";
import { maxW, spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

const items = [
  {
    title: "Mudra Library",
    icon: IMAGES.Mudras,
    description: "Learn, explore & practice 100+ Mudras",
    iconBg: "bg-[#ffffff]",
  },
  {
    title: "Yoga Nidra Sessions",
    icon: IMAGES.HolisticWellbeing,
    description: "Guided sessions for deep relaxation & Healing",
    iconBg: "bg-[#ffffff]",
  },
  {
    title: "Track Your Journey",
    icon: IMAGES.ImprovedOutcomes,
    description: "Track streaks, sessions & total practice time",
    iconBg: "bg-[#ffffff]",
  },
  {
    title: "Personalized Guidance",
    icon: IMAGES.ReduceStress,
    description: "Recommendations tailored to your goals",
    iconBg: "bg-[#ffffff]",
  },
  {
    title: "Sleep Mode",
    icon: IMAGES.SleepBetter,
    description: "Special sessions & mudras for better sleep",
    iconBg: "bg-[#ffffff]",
  },
  {
    title: "Element Tracker",
    icon: IMAGES.Flower,
    description: "Balance the five elements within you",
    iconBg: "bg-[#ffffff]",
  },
];

const validItems = items.filter(item => item.icon && item.icon !== "");

export default function WhyMudrasMatter() {
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
    hidden: { opacity: 0, y: 20, scale: 0.95 },
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
        delay: i * 0.04,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const headingText = "Small Gestures. Profound Impact.";
  const headingChars = headingText.split("");

  return (
    <motion.section 
      ref={sectionRef}
      className={`w-full ${spacing.sectionPadding}`} 
      style={{
        backgroundColor: dark ? "#111827" : "var(--holistic-bg)",
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className={spacing.container}>

        {/* Heading block */}
        <motion.div 
          className={`text-center ${spacing.headingBlockMb}`}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p 
            className={`${typography.sectionLabel}`} 
            style={{ color: dark ? "#ffffff" : "#9ca3af" }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            WHY MUDRAS MATTER
          </motion.p>
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
                whileInView="visible"
                viewport={{ once: true }}
                style={{ display: "inline-block" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h2>
          <motion.p 
            className={`${typography.sectionMbBody} ${maxW.sectionBody} ${spacing.bodyMt}`} 
            style={{ color: dark ? "#ffffff" : "#4b5563" }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Mudras are simple yet powerful tools to restore balance, enhance well-being
            and support transformation at every level.
          </motion.p>
        </motion.div>

        {/* ── Desktop: horizontal row with vertical dividers ── */}
        <motion.div 
          className="hidden md:flex md:flex-row items-stretch gap-3 md:gap-4 lg:gap-8 xl:gap-10 2xl:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {validItems.map((item, i) => (
            <div key={i} className="flex flex-1 relative">

              {/* Content */}
              <motion.div 
                className="flex flex-row items-start gap-2 md:gap-2 lg:gap-3 xl:gap-3 2xl:gap-4 flex-1"
                variants={itemVariants}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.2 }
                }}
              >
                {/* Coloured circle */}
                <motion.div 
                  className={`
                    ${item.iconBg} shrink-0
                    w-9 h-9 md:w-10 md:h-10 lg:w-14 lg:h-14 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20
                    flex items-center justify-center rounded-[12px] shadow-sm
                  `} 
                  style={{
                    backgroundColor: dark ? "#ffffff" : "#ffffff",
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  {item.icon && item.icon !== "" && (
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={28}
                      height={28}
                      className="object-contain w-4 h-4 md:w-5 md:h-5 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10"
                    />
                  )}
                </motion.div>

                {/* Text */}
                <div>
                  <motion.h3 
                    className={`${typography.cardBody} mb-1 font-semibold`} 
                    style={{ color: textColor }}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {item.title}
                  </motion.h3>
                  <p className={`${typography.Downloadapp}`} style={{ color: dark ? "#ffffff" : "#4b5563" }}>
                    {item.description}
                  </p>
                </div>
              </motion.div>

              {/* Vertical divider — not after last item */}
              {i < validItems.length - 1 && (
                <motion.div 
                  className="absolute right-[-0.375rem] md:right-[-0.4rem] lg:right-[-1rem] xl:right-[-1.25rem] 2xl:right-[-1.5rem] top-0 bottom-0 w-px" 
                  style={{
                    backgroundColor: dark ? "#ffffff" : "#9ca3af",
                  }}
                  initial={{ opacity: 0, scaleY: 0 }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 + 0.3 }}
                />
              )}

            </div>
          ))}
        </motion.div>

        {/* ── Mobile: vertical list with dividers ── */}
        <motion.div 
          className="md:hidden flex flex-col"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {validItems.map((item, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
            >
              <motion.div 
                className="flex flex-row items-start gap-4 py-4"
                whileHover={{
                  x: 5,
                  transition: { duration: 0.2 }
                }}
              >
                {/* Coloured circle */}
                <motion.div 
                  className={`
                    ${item.iconBg} rounded-[12px] shrink-0
                    w-12 h-12 sm:w-14 sm:h-14
                    flex items-center justify-center shadow-sm
                  `} 
                  style={{
                    backgroundColor: dark ? "#ffffff" : "#ffffff",
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  {item.icon && item.icon !== "" && (
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={24}
                      height={24}
                      className="object-contain w-6 h-6 sm:w-7 sm:h-7"
                    />
                  )}
                </motion.div>

                {/* Text */}
                <div className="flex flex-col justify-center">
                  <motion.h3 
                    className="text-sm sm:text-base font-semibold mb-0.5" 
                    style={{ color: textColor }}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {item.title}
                  </motion.h3>
                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: dark ? "#9ca3af" : "#4b5563" }}>
                    {item.description}
                  </p>
                </div>

              </motion.div>

              {/* Horizontal divider — not after last item */}
              {i < validItems.length - 1 && (
                <motion.div 
                  className="w-full h-px" 
                  style={{
                    backgroundColor: dark ? "#374151" : "#e5e7eb",
                  }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 + 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
}