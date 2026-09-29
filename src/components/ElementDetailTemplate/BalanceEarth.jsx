"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { card, spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

const staticBenefits = [
  {
    title: "Mudras",
    description: "Practice Prithvi Mudra to strengthen and balance Earth energy.",
    bg: "bg-[#F5E6A8]",
    image: IMAGES.HastaMudras,
  },
  {
    title: "Yoga Nidra",
    description: "Earth-focused Yoga Nidra sessions promote deep grounding.",
    bg: "bg-[#E3DDFF]",
    image: IMAGES.IconYogaNidra,
  },
  {
    title: "Diet",
    description: "Eat nourishing, whole foods like root vegetables, grains, and nuts.",
    bg: "bg-[#C8E8F5]",
    image: IMAGES.Diet,
  },
  {
    title: "Nature",
    description: "Spend time in nature and connect with the ground.",
    bg: "bg-[#F8D4DC]",
    image: IMAGES.Tree,
  },
  {
    title: "Boosts Immunity",
    description: "Supports the body's natural defence mechanisms.",
    bg: "bg-[#D4F5D4]",
    image: IMAGES.Crystals,
  },
];

const fallbackBgs = ["bg-[#F5E6A8]", "bg-[#E3DDFF]", "bg-[#C8E8F5]", "bg-[#F8D4DC]", "bg-[#D4F5D4]"];

function Card({ item, dark, textColor, index }) {
  const cardVariants = {
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

  const isHexBg = item.bg?.startsWith("#");

  return (
    <motion.div
      className={`
        ${isHexBg ? "" : item.bg} ${card.radius} ${card.hover}
        ${spacing.cardPadding}
        min-h-[170px] sm:min-h-[200px] md:min-h-[150px] lg:min-h-[180px] xl:min-h-[200px] 2xl:min-h-[300px]
        flex flex-col items-center text-center
        w-full h-full
      `}
      style={{
        backgroundColor: isHexBg ? item.bg : undefined,
      }}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{
        y: -6,
        boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        transition: { duration: 0.2 }
      }}
    >
      <motion.div
        className={`
          bg-white rounded-full flex items-center justify-center shrink-0
          ${card.benefitsIconBox} ${spacing.benefitsIconBoxMb}
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
        <Image
          src={item.image}
          alt={item.title}
          width={40}
          height={40}
          className={`${card.benefitsIconInner} object-contain`}
        />
      </motion.div>

      <motion.h3 
        className={`${typography.benefitsCardTitle} ${spacing.cardTitleMb}`} 
        style={{ color: textColor }}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.2 }
        }}
      >
        {item.title}
      </motion.h3>
      <p className={`${typography.benefitsCardBody}`} style={{ color: dark ? "#000000" : "#4b5563" }}>
        {item.description}
      </p>
    </motion.div>
  );
}

export default function BalanceEarth({ howToBalance = [], elementName = "Earth" }) {
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.05,
    margin: "-50px"
  });

  const finalBenefits = howToBalance.length > 0
    ? howToBalance.map((h, idx) => ({
        title: h.title || h.Name || "",
        description: h.description || h.Description || "",
        bg: h.CardBg || fallbackBgs[idx % fallbackBgs.length],
        image: h.Icon?.url ? (h.Icon.url.startsWith("http") ? h.Icon.url : `http://192.168.1.14:1337${h.Icon.url}`) : IMAGES.HastaMudras,
      }))
    : staticBenefits;

  const isOdd = finalBenefits.length % 2 !== 0;

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

  const headingText = `How to Balance ${elementName}`;
  const headingChars = headingText.split("");

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

  return (
    <motion.section 
      ref={sectionRef}
      className={`w-full ${spacing.sectionPaddingX} ${spacing.sectionPaddingY} flex justify-center`} 
      style={{
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-[1400px] lg:max-w-[1600px] xl:max-w-[1800px] 2xl:max-w-[2100px] mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Heading - Character by character */}
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
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.span 
            className={typography.whySubscribe.dividerLine} 
            style={{ backgroundColor: dark ? "#ffffff" : "#e5e7eb" }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          />
          <motion.div 
            className={typography.howToPractice.lotusDivider}
          >
            <Image
              src={IMAGES.Energy}
              alt="Lotus divider"
              width={40}
              height={40}
              className="w-full h-full object-contain"
              style={{
                filter: dark ? "brightness(0.8) invert(1)" : "none",
              }}
            />
          </motion.div>
          <motion.span 
            className={typography.whySubscribe.dividerLine} 
            style={{ backgroundColor: dark ? "#ffffff" : "#e5e7eb" }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          />
        </motion.div>

        {/* Grid */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {finalBenefits.map((item, i) => {
            const isLast = i === finalBenefits.length - 1;
            const shouldCenter = isOdd && isLast;
            
            return (
              <div 
                key={i} 
                className={shouldCenter ? "col-span-2 sm:col-span-1 max-w-[calc(50%-0.5rem)] sm:max-w-full justify-self-center w-full sm:w-auto" : "w-full"}
              >
                <Card item={item} dark={dark} textColor={textColor} index={i} />
              </div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}