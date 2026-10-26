"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { typography } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";
import SiteContainer from "../../common/SiteContainer";

const defaultSessions = [
  {
    image: IMAGES.StressRelief,
    title: "Stress Relief Yoga Nidra",
    description: "Release stress and tension",
    duration: "25 min",
    level: "Beginner",
    cardBg: "#D1FAE5", // green-100
  },
  {
    image: IMAGES.HealingRecovery,
    title: "Healing & Recovery Nidra",
    description: "Support healing and inner balance",
    duration: "35 min",
    level: "All Levels",
    cardBg: "#FCE7F3", // pink-100
  },
  {
    image: IMAGES.SleepDeep,
    title: "Sleep Deep Yoga Nidra",
    description: "Prepare your mind and body for restful sleep",
    duration: "30 min",
    level: "Beginner",
    cardBg: "#FEF3C7", // yellow-100
  },
  {
    image: IMAGES.YogaNidraFeature,
    title: "Anxiety Relief Nidra",
    description: "Calm anxiety and cultivate inner peace",
    duration: "28 min",
    level: "Beginner",
    cardBg: "#E9D5FF", // purple-100
  },
];

function SessionCard({
  image,
  title,
  description,
  duration,
  level,
  cardBg,
  dark,
  textColor,
  index,
}) {
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      className="flex flex-col rounded-2xl overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{
        y: -6,
        boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        transition: { duration: 0.2 },
      }}
    >
      <motion.div
        className="relative w-full aspect-[4/3]"
        style={{ backgroundColor: dark ? "#374151" : "#f3f4f6" }}
        whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
      >
        {image ? (
          <Image src={image} alt={title} fill className="object-cover" />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: dark ? "#374151" : "#f3f4f6" }}
          >
            <span
              className="text-xs"
              style={{ color: dark ? "#6b7280" : "#9ca3af" }}
            >
              Image
            </span>
          </div>
        )}
      </motion.div>

      <motion.div
        className="flex flex-col gap-2 px-5 py-5 flex-1"
        style={{
          // ✅ single source of truth for card bg; dark mode falls back to dark surface
          backgroundColor: dark ? (cardBg || "#1f2937") : cardBg,
        }}
        whileHover={{
          backgroundColor: dark
            ? "rgba(255,255,255,0.05)"
            : "rgba(0,0,0,0.02)",
          transition: { duration: 0.2 },
        }}
      >
        <motion.h3
          className="text-sm md:text-xs lg:text-base font-semibold"
          style={{ color: "#0F0F0F" }}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-xs md:text-[10px] lg:text-sm"
          style={{ color: dark ? "#ffffff" : "#0F0F0F80" }}
          whileHover={{ x: 2, transition: { duration: 0.2 } }}
        >
          {description}
        </motion.p>
        <p
          className="text-xs md:text-[10px] lg:text-sm mt-auto pt-3"
          style={{ color: "#0F0F0F80" }}
        >
          {duration} <span className="mx-1">•</span> {level}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function MoreYogaNidraSessions({ sessions = defaultSessions }) {
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.05,
    margin: "-50px",
  });

  const charVariants = {
    hidden: { opacity: 0, y: 20, rotateX: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { delay: i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const headingChars = "More Yoga Nidra Sessions".split("");

  return (
    <motion.section
      ref={sectionRef}
      style={{ backgroundColor: dark ? "#111827" : "#ffffff" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* ✅ SiteContainer replaces sectionPaddingX/Y + spacing.container */}
      <SiteContainer>
        {/* Heading */}
        <motion.h2
          className={typography.howToPractice.heading}
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

        {/* Divider */}
        <motion.div
          className={typography.howToPractice.dividerWrapper}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.span
            className={typography.whySubscribe.dividerLine}
            style={{ backgroundColor: dark ? "#ffffff" : "#0F0F0F99" }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          />
          <motion.div className={typography.howToPractice.lotusDivider}>
            <Image
              src={IMAGES.Energy}
              alt="Lotus divider"
              width={40}
              height={40}
              className="w-full h-full object-contain"
              style={{ filter: dark ? "brightness(0.8) invert(1)" : "none" }}
            />
          </motion.div>
          <motion.span
            className={typography.whySubscribe.dividerLine}
            style={{ backgroundColor: dark ? "#ffffff" : "#0F0F0F99" }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          />
        </motion.div>

        {/* Grid — 1 → 2 → 4 columns, keeping tablets at 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sessions.map((session, i) => (
            <SessionCard
              key={i}
              {...session}
              dark={dark}
              textColor={textColor}
              index={i}
            />
          ))}
        </div>
      </SiteContainer>
    </motion.section>
  );
}