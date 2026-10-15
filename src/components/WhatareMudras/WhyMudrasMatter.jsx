"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import Section from "../../common/Section";
import SiteContainer from "../../common/SiteContainer";
import SectionHeader from "../../common/SectionHeader";

const items = [
  {
    title: "Body",
    icon: IMAGES.Body,
    description:
      "Regulate the nervous system, improve health and support the natural healing process.",
    iconBg: "#D8EBC6",
  },
  {
    title: "Breath",
    icon: IMAGES.Breath,
    description:
      "Guide and deepen breath, increasing vitality and calm.",
    iconBg: "#EECAD9",
  },
  {
    title: "Mind",
    icon: IMAGES.Mind,
    description:
      "Calm thoughts, improve focus, and create mental clarity.",
    iconBg: "#BFDDF2",
  },
  {
    title: "Energy",
    icon: IMAGES.Energy,
    description:
      "Balance the elements and chakras, awakening inner energy.",
    iconBg: "#DCC2F2",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function WhyMudrasMatter() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.3,
  });

  const { dark, textColor } = useTheme();

  return (
    <Section
      ref={sectionRef}
      className="why-mudras-section"
      sx={{
        backgroundColor: dark ? "#111827" : "#ffffff",
        overflow: "hidden",
      }}
    >
      <SiteContainer>
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: -20 }
          }
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            title="Small Gestures. Profound Impact."
            subtitle="Mudras are simple yet powerful tools to restore balance, enhance well-being and support transformation at every level."
            align="center"
            className="why-mudras-header"
            sx={{
              mb: { xs: 4, sm: 5, md: 6 },
              "& h2": {
                color: textColor,
                fontFamily:
                  '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
                fontWeight: 700,
              },
              "& p": {
                color: dark ? "#D1D5DB" : "#374151",
                fontFamily:
                  '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
              },
            }}
          />

          {/* Section Label */}
          <p
            className={`${typography.sectionLabel} text-center -mt-4 mb-3`}
            style={{
              color: dark ? "#9CA3AF" : "#6B7280",
            }}
          >
            WHY MUDRAS MATTER
          </p>
        </motion.div>

        {/* Four Items */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-y-0 relative"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              className="relative flex flex-col items-center text-center px-4 sm:px-6"
              variants={itemVariants}
              whileHover={{
                y: -6,
                transition: { duration: 0.2 },
              }}
            >
              {/* Circular Icon */}
              <motion.div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4 shrink-0"
                style={{
                  backgroundColor: item.iconBg,
                  border: dark ? "1px solid #4B5563" : "none",
                  boxShadow: dark
                    ? "0 4px 12px rgba(0,0,0,0.15)"
                    : "0 4px 12px rgba(0,0,0,0.05)",
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3 },
                }}
              >
                <Image
                  src={item.icon}
                  alt={`${item.title} icon`}
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                  style={{
                    filter: dark ? "brightness(0.9)" : "none",
                  }}
                />
              </motion.div>

              {/* Title */}
              <h3
                className={`${typography.benefitTitle} mb-2`}
                style={{
                  color: dark ? "#F9FAFB" : "#0F0F0FCC",
                }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                className={`${typography.benefitBody} max-w-[220px]`}
                style={{
                  color: dark ? "#D1D5DB" : "#0F0F0F80",
                }}
              >
                {item.description}
              </p>

              {/* Vertical Divider */}
              {index < items.length - 1 && (
                <div
                  className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-28"
                  style={{
                    backgroundColor: dark ? "#374151" : "#E5E7EB",
                  }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </SiteContainer>
    </Section>
  );
}