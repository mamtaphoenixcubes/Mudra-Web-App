"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

const benefits = [
  { title: "Relax Body & Mind", description: "Release physical and mental tension.", image: IMAGES.Mind, bgColor: "bg-benefit-1" },
  { title: "Guided Awareness", description: "Move through body awareness and breath.", image: IMAGES.Books, bgColor: "bg-benefit-2" },
  { title: "Deep Rest", description: "Experience deep relaxation and rest.", image: IMAGES.YogaNidra, bgColor: "bg-benefit-3" },
  { title: "Inner Calm", description: "Cultivate peace, clarity. and balance.", image: IMAGES.HolisticWellbeing, bgColor: "bg-benefit-4" },
  { title: "Rejuvenation", description: "Feel refreshed and energetic.", image: IMAGES.EmotionalBalance, bgColor: "bg-benefit-5" },
];

export default function WhattoExpect({ expectations = [] }) {
  const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://192.168.1.14:1337";
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.1,
    margin: "-50px"
  });

  const displayBenefits = expectations && expectations.length > 0 ? expectations.map((item, idx) => {
    const iconUrl = item.Icon?.url ? `${IMAGE_BASE_URL}${item.Icon.url}` : null;
    return {
      title: item.Name,
      description: item.Name === "Deep Relaxation" ? "Release physical and mental tension." : "Experience peace, clarity, and balance.",
      image: iconUrl || IMAGES.Mind,
      bgColor: `bg-benefit-${(idx % 5) + 1}`,
      isRemote: !!iconUrl
    };
  }) : benefits;

  // Animation variants
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

  const headingText = "What to Expect";
  const headingChars = headingText.split("");

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
      <div className="w-full max-w-7xl sm:max-w-[90%] md:max-w-[1100px] lg:max-w-[1200px] xl:max-w-[1300px] 2xl:max-w-[2100px] mx-auto">

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

        {/* Divider with lotus image */}
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

        {/* Items */}
        <motion.div 
          className="grid grid-cols-2 sm:flex sm:flex-row sm:items-start relative gap-x-4 gap-y-8 sm:gap-0"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {displayBenefits.map((item, i) => {
            const isLastOdd = displayBenefits.length % 2 !== 0 && i === displayBenefits.length - 1;
            return (
              <motion.div
                key={i}
                className={`relative flex-1 ${isLastOdd ? "col-span-2 sm:col-span-1" : ""}`}
                variants={itemVariants}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.2 }
                }}
              >
                <div className={`flex flex-col items-center text-center ${spacing.benefitItemGap} w-full ${spacing.benefitItemPad}`}>

                  {/* Circle image */}
                  <motion.div 
                    className={`${spacing.benefitCircle} rounded-full flex items-center justify-center ${item.bgColor}`} 
                    style={{
                      backgroundColor: dark ? undefined : undefined,
                    }}
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {item.image && (
                      item.isRemote ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className={`${spacing.benefitImgInner} object-contain w-8 h-8`}
                        />
                      ) : (
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={64}
                          height={64}
                          className={`${spacing.benefitImgInner} object-contain`}
                        />
                      )
                    )}
                  </motion.div>

                  <motion.h3 
                    className={`${typography.benefitTitle}`} 
                    style={{ color: textColor }}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {item.title}
                  </motion.h3>
                  <p className={`${typography.benefitBody} ${spacing.benefitDescMaxW}`} style={{ color: dark ? "#ffffff" : "#6b7280" }}>
                    {item.description}
                  </p>
                </div>

                {/* Vertical divider */}
                {i < displayBenefits.length - 1 && (
                  <motion.div 
                    className={`hidden sm:block absolute top-1/2 -translate-y-1/2 right-0 w-px ${spacing.featureDividerH}`} 
                    style={{
                      backgroundColor: dark ? "#374151" : "var(--features-divider-vertical)",
                    }}
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08 + 0.3 }}
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </motion.section>
  );
}