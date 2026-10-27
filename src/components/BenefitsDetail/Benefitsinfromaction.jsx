"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { card, maxW, spacing, typography } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";
import SiteContainer from "../../common/SiteContainer";

const benefits = [
  {
    title: "Inner Peace",
    icon: IMAGES.HastaMudras,
    description: "Experience deep calm and tranquility in your daily life.",
    bg: "bg-benefit-1",
    color: "#B8A7F0", // ✅ added — was missing, breaking glow/shadow/ring/particles
  },
  {
    title: "Mental Clarity",
    icon: IMAGES.KayaMudras,
    description: "Cut through mental fog and think with razor-sharp focus.",
    bg: "bg-benefit-2",
    color: "#F5C97A",
  },
  {
    title: "Better Sleep",
    icon: IMAGES.ManaMudras,
    description: "Fall asleep faster and wake up feeling completely refreshed.",
    bg: "bg-benefit-3",
    color: "#9BB8E3",
  },
  {
    title: "Emotional Balance",
    icon: IMAGES.BandhaMudras,
    description: "Manage your emotions and build unshakeable inner strength.",
    bg: "bg-benefit-4",
    color: "#F4A5B8",
  },
];

export default function Benefitsinfromaction() {
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.15,
    margin: "-50px",
  });

  /* ---------- animation variants ---------- */
  const letterVariants = {
    hidden: { opacity: 0, y: 20, rotateX: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { delay: i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
  };
  const charVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.025, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
  };
  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    }),
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  /* ---------- text ---------- */
  const labelChars = "KEY BENEFITS".split("");
  const headingChars = "What Mudras Can Do For You".split("");
  const subtitleWords =
    "Discover the powerful benefits of regular mudra practice for your well-being.".split(
      " "
    );

  return (
    <motion.section
      ref={sectionRef}
      className="w-full relative overflow-hidden"
      style={{ backgroundColor: dark ? "#111827" : "#ffffff" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* background decorative blobs */}
      <motion.div
        className="absolute -top-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-5 pointer-events-none"
        style={{ backgroundColor: textColor }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.05, 0.08, 0.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-5 pointer-events-none"
        style={{ backgroundColor: textColor }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.08, 0.05] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* ✅ SiteContainer replaces sectionPadding + spacing.container */}
      <SiteContainer>
        <div className={`text-center ${spacing.headingBlockMb}`}>
          {/* Label */}
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
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.p>

          {/* Heading */}
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
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className={`${typography.sectionMbBody} ${maxW.sectionBody} ${spacing.bodyMt}`}
            style={{ color: dark ? "#e5e7eb" : "#4b5563" }}
          >
            {subtitleWords.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{ display: "inline-block", marginRight: "0.25em" }}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        </div>

        {/* Desktop grid */}
        <motion.div
          className={`hidden md:grid md:grid-cols-4 ${spacing.cardMbGap} items-stretch`}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {benefits.map((item, i) => (
            <BenefitCard
              key={i}
              item={item}
              dark={dark}
              textColor={textColor}
              index={i}
              isInView={isInView}
            />
          ))}
        </motion.div>

        {/* Mobile grid */}
        <div className="md:hidden">
          <motion.div
            className={`grid grid-cols-2 ${spacing.cardGapSm}`}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {benefits.map((item, i) => (
              <BenefitCard
                key={i}
                item={item}
                dark={dark}
                textColor={textColor}
                index={i}
                isInView={isInView}
              />
            ))}
          </motion.div>
        </div>
      </SiteContainer>
    </motion.section>
  );
}

/* ---------- card (local — swap to common/<Card> when ready) ---------- */
function BenefitCard({ item, dark, textColor, index, isInView }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.08,
      },
    },
  };

  /* title/desc word-char split variants — delay handled here, not inline */
  const titleCharVariants = {
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
  };
  const descWordVariants = {
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
  };

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
        boxShadow: `0 12px 40px ${item.color}30`, // ✅ now works (color was undefined)
        transition: { duration: 0.3 },
      }}
    >
      {/* glow */}
      <motion.div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-2xl pointer-events-none"
        style={{ backgroundColor: item.color }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.2,
        }}
      />

      {/* icon circle */}
      <motion.div
        className={`
          rounded-full bg-white
          ${spacing.cardIconBox} ${spacing.cardIconBoxMb}
          flex items-center justify-center shrink-0 relative
        `}
        whileHover={{
          scale: 1.15,
          rotate: 5,
          boxShadow: `0 8px 30px ${item.color}40`,
          transition: { duration: 0.3 },
        }}
      >
        <Image
          src={item.icon}
          alt={item.title}
          width={28}
          height={28}
          className="object-contain relative z-10"
        />

        {/* pulsing ring */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ border: `2px solid ${item.color}30` }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2,
          }}
        />
      </motion.div>

      {/* title */}
      <motion.h3
        className={`${typography.cardTitle} ${spacing.cardTitleMb}`}
        style={{ color: textColor }}
        whileHover={{
          color: item.color,
          scale: 1.05,
          transition: { duration: 0.2 },
        }}
      >
        {item.title.split("").map((char, i) => (
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

      {/* description */}
      <motion.p
        className={`${typography.cardBody}`}
        style={{ color: dark ? "#e5e7eb" : "#374151" }} // ✅ was #000000 (invisible on dark)
      >
        {item.description.split(" ").map((word, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={descWordVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ display: "inline-block", marginRight: "0.25em" }}
          >
            {word}
          </motion.span>
        ))}
      </motion.p>

      {/* particles */}
      {[0, 1].map((p) => (
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