"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { spacing } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";

const defaultDetails = [
  { icon: IMAGES.Clock, label: "Duration", value: "30 Minutes" },
  { icon: IMAGES.ImprovedOutcomes, label: "Level", value: "Beginner Friendly" },
  { icon: IMAGES.Volume, label: "Type", value: "Audio Guided" },
  { icon: IMAGES.EnhancesFocus, label: "Focus", value: "Relaxation, Stress Relief, Restorative" },
];

const defaultPractice = [
  {
    icon: IMAGES.IconYogaNidra,
    title: "How to Practice",
    lines: [
      "Find a quiet, comfortable space where you won't be disturbed.",
      "Lie down on your back, close your eyes, and listen with awareness.",
      "Allow yourself to relax and follow the guidance.",
    ],
  },
  {
    icon: IMAGES.ClockStopwatch,
    title: "Best Time to Practice",
    lines: [
      "Evening or before bedtime for better sleep.",
      "During the day when you need to relax and recharge.",
    ],
  },
];

function IconCircle({ src, alt, dark, index }) {
  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: index * 0.08 + 0.2,
      },
    },
  };

  return (
    <motion.div 
      className="rounded-full w-11 h-11 flex items-center justify-center shrink-0 shadow-sm" 
      style={{
        backgroundColor: dark ? "#ffffff" : "#ffffff",
      }}
      variants={iconVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{
        scale: 1.12,
        rotate: 5,
        transition: { duration: 0.2 }
      }}
    >
      {src ? (
        <Image src={src} alt={alt} width={20} height={20} className="object-contain" />
      ) : (
        <div className="w-5 h-5 rounded-full" style={{ backgroundColor: dark ? "#ffffff" : "#e5e7eb" }} />
      )}
    </motion.div>
  );
}

function DetailRow({ icon, label, value, dark, textColor, index }) {
  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.1 + 0.3,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div 
      className="flex items-start gap-4"
      variants={rowVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{
        x: 3,
        transition: { duration: 0.2 }
      }}
    >
      <IconCircle src={icon} alt={label} dark={dark} index={index} />
      <div>
        <motion.p 
          className="text-sm md:text-xs lg:text-sm font-semibold" 
          style={{ color: textColor }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          {label}
        </motion.p>
        <p className="text-xs md:text-[10px] lg:text-sm mt-0.5" style={{ color: dark ? "#ffffff" : "#6b7280" }}>
          {value}
        </p>
      </div>
    </motion.div>
  );
}

function PracticeBlock({ icon, title, lines, dark, textColor, index }) {
  const blockVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.1 + 0.4,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Character animation for title
  const charVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.04 + 0.2,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <motion.div 
      className="flex items-start gap-4"
      variants={blockVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{
        x: 3,
        transition: { duration: 0.2 }
      }}
    >
      <IconCircle src={icon} alt={title} dark={dark} index={index + 4} />
      <div>
        <motion.p 
          className="text-sm md:text-xs lg:text-sm font-semibold mb-1" 
          style={{ color: textColor }}
        >
          {title.split("").map((char, i) => (
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
        </motion.p>
        {lines.map((line, i) => (
          <motion.p
            key={i}
            className="text-xs md:text-[10px] lg:text-sm leading-relaxed"
            style={{ color: dark ? "#ffffff" : "#6b7280" }}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 + 0.1, duration: 0.3 }}
            whileHover={{
              x: 3,
              transition: { duration: 0.2 }
            }}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}

export default function SessionDetailsCard({
  details = defaultDetails,
  practice = defaultPractice,
}) {
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.1,
    margin: "-50px"
  });

  // Container variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Character animation for "Session Details" heading
  const headingVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.04 + 0.2,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const headingText = "Session Details";
  const headingChars = headingText.split("");

  return (
    <motion.section 
      ref={sectionRef}
      className={`w-full ${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`} 
      style={{
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className={`${spacing.container} rounded-3xl p-8 md:p-10`} 
        style={{
          backgroundColor: dark ? "#374151" : textColor + "10",
        }}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        whileHover={{
          boxShadow: dark 
            ? "0 8px 30px rgba(0,0,0,0.3)"
            : "0 8px 30px rgba(0,0,0,0.06)",
          transition: { duration: 0.3 }
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-2 gap-10 md:gap-0">

          {/* LEFT: Session Details */}
          <motion.div 
            className="flex flex-col gap-6 md:pr-10 md:border-r" 
            style={{
              borderColor: dark ? "#4b5563" : "#d1d5db",
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.h3 
              className="text-base md:text-sm lg:text-lg font-semibold" 
              style={{ color: textColor }}
            >
              {headingChars.map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={headingVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  style={{ display: "inline-block" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h3>
            <div className="flex flex-col gap-5">
              {details.map((d, i) => (
                <DetailRow key={i} icon={d.icon} label={d.label} value={d.value} dark={dark} textColor={textColor} index={i} />
              ))}
            </div>
          </motion.div>

          {/* RIGHT: How to Practice */}
          <motion.div 
            className="flex flex-col gap-7 md:pl-10"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {practice.map((p, i) => (
              <PracticeBlock key={i} icon={p.icon} title={p.title} lines={p.lines} dark={dark} textColor={textColor} index={i} />
            ))}
          </motion.div>

        </div>
      </motion.div>
    </motion.section>
  );
}