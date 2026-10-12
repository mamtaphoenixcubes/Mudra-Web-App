"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

const items = [
  {
    title: "Body",
    icon: IMAGES.Body,
    description: "Regulate the nervous system, improve health and support the natural healing process.",
    iconBg: "bg-[#D8EBC6]",
  },
  {
    title: "Breath",
    icon: IMAGES.Breath,
    description: "Guide and deepen breath, increasing vitality and calm.",
    iconBg: "bg-[#EECAD9]",
  },
  {
    title: "Mind",
    icon: IMAGES.Mind,
    description: "Calm thoughts, improve focus, and create mental clarity.",
    iconBg: "bg-[#BFDDF2]",
  },
  {
    title: "Energy",
    icon: IMAGES.Energy,
    description: "Balance the elements and chakras, awakening inner energy.",
    iconBg: "bg-[#DCC2F2]",
  },
];

export default function WhyMudrasMatter() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const { dark, textColor } = useTheme();

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

  return (
    <motion.section
      ref={sectionRef}
      className={`
        w-full
        ${spacing.sectionPaddingX}
        ${spacing.sectionPaddingY}
      `}
      style={{
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <p className={`${typography.sectionLabel} mb-2`} style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
            WHY MUDRAS MATTER
          </p>
          <h2 className={`${typography.sectionHeading} mb-3`} style={{ color: textColor }}>
            Small Gestures. Profound Impact.
          </h2>
          <p className={`${typography.sectionMb} max-w-2xl mx-auto`} style={{ color: dark ? "#e5e7eb" : "#374151" }}>
            Mudras are simple yet powerful tools to restore balance, enhance well-being and support transformation at every level.
          </p>
        </motion.div>

        {/* 4 Items Row */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 relative"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {items.map((item, i) => (
            <motion.div 
              key={i} 
              className="relative flex flex-col items-center text-center px-4"
              variants={itemVariants}
              whileHover={{
                y: -6,
                transition: { duration: 0.2 }
              }}
            >
              {/* Circular Icon Container */}
              <motion.div 
                className={`w-16 h-16 rounded-full ${item.iconBg} flex items-center justify-center mb-4 shrink-0 shadow-xs`}
                style={{
                  backgroundColor: dark ? undefined : undefined,
                  border: dark ? "1px solid #4b5563" : "none"
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3 }
                }}
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                  style={{ filter: dark ? "brightness(0.8)" : "none" }}
                />
              </motion.div>

              {/* Title */}
              <h3 className={`${typography.benefitTitle} mb-2`} style={{ color: dark ? "#f9fafb" : "#111827" }}>
                {item.title}
              </h3>

              {/* Text */}
              <p className={`${typography.benefitBody} max-w-[220px]`} style={{ color: dark ? "#d1d5db" : "#4b5563" }}>
                {item.description}
              </p>

              {/* Vertical divider */}
              {i < items.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-28 bg-gray-200" 
                  style={{ backgroundColor: dark ? "#374151" : "#e5e7eb" }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
}