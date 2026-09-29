"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { typography, spacing, card } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";

// ── Data ──────────────────────────────────────────────────────
const items = [
  {
    id: 1,
    bg: "bg-[#FEF3C7]",
    image: IMAGES.GLOBE,
    title: "Universal Language",
    body: "Hands speak a language understood in every culture and tradition.",
  },
  {
    id: 2,
    bg: "bg-[#F3E8FF]",
    image: IMAGES.PEOPLE,
    title: "Shared Purpose",
    body: "To heal, protect, connect and awaken higher consciousness.",
  },
  {
    id: 3,
    bg: "bg-[#DBEAFE]",
    image: IMAGES.INFINITY,
    title: "Different Paths",
    body: "Whether through yoga, Buddhism, energy healing or meditation–the essence is the same.",
  },
  {
    id: 4,
    bg: "bg-[#FCE7F3]",
    image: IMAGES.HolisticWellbeing,
    title: "Integration & Respect",
    body: "Learning from many traditions deepens appreciation and broadens our practice.",
  },
  {
    id: 5,
    bg: "bg-[#DCFCE7]",
    image: IMAGES.EmotionalBalance,
    title: "Unity in Diversity",
    body: "Different traditions, one truth–balance, healing and wholeness.",
  },
];

// ── Mobile card sub-component ──────────────────────────────────
function MobileItem({ item, dark, textColor, index }) {
  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div 
      className="flex flex-col items-center text-center px-1"
      variants={itemVariants}
      whileHover={{
        y: -4,
        transition: { duration: 0.2 }
      }}
    >
      <motion.div 
        className={`rounded-full flex items-center justify-center mb-3 w-14 h-14 shrink-0 overflow-hidden`} 
        style={{
          backgroundColor: dark ? "#374151" : undefined,
        }}
        whileHover={{
          scale: 1.1,
          rotate: 5,
          transition: { duration: 0.2 }
        }}
      >
        <div className="relative w-6 h-6">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-contain"
          />
        </div>
      </motion.div>
      <motion.h3 
        className={`${typography.benefitsCardTitle} mb-1`} 
        style={{ color: textColor }}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.2 }
        }}
      >
        {item.title}
      </motion.h3>
      <p className={`${typography.benefitsCardBody}`} style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
        {item.body}
      </p>
    </motion.div>
  );
}

// ── Component ──────────────────────────────────────────────────
export default function AcrossTraditions() {
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.1,
    margin: "-50px"
  });

  // Fade up variants for header
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
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Item variants for desktop
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

  return (
    <motion.section 
      ref={sectionRef}
      className={`${spacing.sectionPaddingX} py-10 md:py-14 lg:py-16 xl:py-20`} 
      style={{
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className={spacing.container}>

        {/* ── Heading block ── */}
        <motion.div 
          className="text-center mb-8 md:mb-10 lg:mb-14"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p className={`${typography.benefitsSectionLabel} mb-2`} style={{ color: dark ? "#ffffff" : "#9ca3af" }}>
            Across Traditions
          </p>
          <h2 className={`${typography.fingerHeading} mb-3 md:mb-4`} style={{ color: textColor }}>
            One Wisdom, Many Expressions
          </h2>
          <p className={`${typography.fingerSubheading} max-w-[600px] lg:max-w-[700px] mx-auto`} style={{ color: dark ? "#ffffff" : "#6b7280" }}>
            Mudras transcend culture, religion and time–uniting us through the power of intentional gesture.
          </p>
        </motion.div>

        {/* ── Desktop / Tablet: 5-col row with dividers ── */}
        <motion.div 
          className="hidden md:flex items-start justify-between"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {items.map((item, idx) => (
            <motion.div 
              key={item.id} 
              className="flex items-start flex-1"
              variants={itemVariants}
            >
              {/* Item */}
              <div className="flex flex-col items-center text-center px-2 lg:px-3 xl:px-4 w-full">
                {/* Circle image */}
                <motion.div 
                  className={`${item.bg} rounded-full flex items-center justify-center mb-4
                  w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 shrink-0 overflow-hidden`}
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="relative w-6 h-6 md:w-7 md:h-7 lg:w-9 lg:h-9 xl:w-10 xl:h-10">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </motion.div>
                <motion.h3 
                  className={`${typography.benefitTitle} mb-1.5`} 
                  style={{ color: textColor }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  {item.title}
                </motion.h3>
                <p className={`${typography.benefitBody}`} style={{ color: dark ? "#f7f7f7" : "#6b7280" }}>
                  {item.body}
                </p>
              </div>

              {/* Divider — between items, not after last */}
              {idx < items.length - 1 && (
                <motion.div 
                  className="self-stretch flex items-center shrink-0"
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 + 0.3 }}
                >
                  <div className="w-px h-20 md:h-24 lg:h-28 xl:h-32" style={{
                    backgroundColor: dark ? "#374151" : "#e5e7eb",
                  }} />
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* ── Mobile: 2-col grid, last item centered ── */}
        <motion.div 
          className="md:hidden"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Top 4 in 2×2 grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-8">
            {items.slice(0, 4).map((item, index) => (
              <MobileItem key={item.id} item={item} dark={dark} textColor={textColor} index={index} />
            ))}
          </div>

          {/* 5th item centered below */}
          <div className="flex justify-center mt-8">
            <div className="w-1/2">
              <MobileItem item={items[4]} dark={dark} textColor={textColor} index={4} />
            </div>
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
}