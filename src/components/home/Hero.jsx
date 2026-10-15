
"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";

import { IMAGES } from "../../assets/assets";
import { typography, spacing, btn } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

import Section from "../../common/Section";
import SiteContainer from "../../common/SiteContainer";

export default function Hero() {
  const router = useRouter();
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.3,
  });

  const { dark, textColor } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.2,
      },
    },
  };

  const checklistItemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const checklistItems = [
    ["Trusted by", "10K+ users", IMAGES.ShieldTick],
    ["Ancient wisdom", "Modern science", IMAGES.Ancient],
    ["Simple, Practical", "Powerful.", IMAGES.Simple],
  ];

  return (
    <Section
      className="hero-section"
      sx={{
        backgroundColor: dark ? "#111827" : "#ffffff",
        overflow: "hidden",
      }}
    >
      <motion.section
        ref={sectionRef}
        className={`relative ${spacing.sectionPaddingY} ${spacing.heroGap} ${spacing.heroSectionMinH}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <SiteContainer className="grid grid-cols-1 md:grid-cols-2 items-center">
          {/* LEFT COLUMN */}
          <motion.div
            className={`flex flex-col md:block ${spacing.heroLeftColWb} ${spacing.heroLeftColOffset} relative z-10`}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className={spacing.contentColumn}>
              {/* Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                style={{
                  backgroundColor: dark ? "#374151" : "#f3f4f6",
                  border: `1px solid ${dark ? "#4b5563" : "#e5e7eb"}`,
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: textColor }}
                />

                <span
                  className="text-[10px] font-medium"
                  style={{ color: textColor }}
                >
                  ✨ New: Mudra Library v2.0
                </span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                className={typography.heroHeading}
                style={{
                  color: textColor,
                  fontFamily:
                    '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
                }}
                variants={itemVariants}
              >
                Balance Within.
                <br />
                Transform Life.
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="mt-2 mb-2 sm:mt-6"
                style={{
                  width: "100%",
                  maxWidth: "380px",
                  fontFamily:
                    '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
                  fontWeight: 500,
                  fontSize: "24px",
                  lineHeight: "140%",
                  letterSpacing: "1%",
                  color: dark ? "#9ca3af" : "#0F0F0F",
                }}
                variants={itemVariants}
              >
                Ancient wisdom. Modern life.
                <br />
                Mudras, Yoga Nidra &amp; Elements for
                <br />
                deep balance and lasting well-being
              </motion.p>

              {/* ACTION BUTTONS */}
              <motion.div
                className="flex flex-wrap items-center gap-4 mb-10"
                variants={itemVariants}
              >
                {/* Start Your Journey */}
                <motion.button
                  type="button"
                  onClick={() => router.push("/SignUp")}
                  className={`${btn.primary} relative overflow-hidden group`}
                  style={{
                    width: "220px",
                    height: "46px",
                    backgroundColor: "#9A85FE",
                    borderRadius: "6px",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                    boxSizing: "border-box",
                  }}
                  variants={buttonVariants}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 8px 40px #9A85FE50",
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative flex items-center gap-2">
                    Start Your Journey

                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.button>

                {/* Explore How It Works */}
                <motion.button
                  type="button"
                  onClick={() => router.push("/WhatareMudras")}
                  className={`${btn.outline} relative group`}
                  style={{
                    width: "220px",
                    height: "46px",
                    border: "1px solid #0F0F0F",
                    borderRadius: "6px",
                    backgroundColor: "#FFFFFF",
                    color: "#0F0F0F",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                    boxSizing: "border-box",
                  }}
                  variants={buttonVariants}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#FFFFFF",
                    color: "#0F0F0F",
                    borderColor: "#0F0F0F",
                    boxShadow: "0 8px 40px rgba(15, 15, 15, 0.12)",
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative flex items-center justify-center">
                    Explore How It Works
                  </span>
                </motion.button>
              </motion.div>

              {/* CHECKLIST */}
              <motion.div
                className={`flex flex-row flex-wrap sm:flex-nowrap ${spacing.checklistGap} ${spacing.checklistMt}`}
                variants={containerVariants}
              >
                {checklistItems.map((item, index) => (
                  <motion.div
                    key={item[0]}
                    className={`flex items-center ${spacing.checklistItemGap}`}
                    variants={checklistItemVariants}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }}
                  >
                    {/* Checklist Icon Container */}
                    <motion.div
                      className="flex items-center justify-center rounded-sm overflow-hidden relative shrink-0"
                      style={{
                        width: "56px",
                        height: "56px",
                        backgroundColor: dark ? "#374151" : "#f3f4f6",
                      }}
                      whileHover={{
                        scale: 1.1,
                        rotate: 5,
                        transition: { duration: 0.2 },
                      }}
                    >
                      {/* Checklist Image */}
                      <motion.div
                        className="relative"
                        style={{
                          width: "40px",
                          height: "40px",
                        }}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.3,
                        }}
                      >
                        {item[2] ? (
                          <Image
                            src={item[2]}
                            alt={`${item[0]} icon`}
                            fill
                            sizes="40px"
                            className="object-contain"
                            style={{
                              filter: dark ? "brightness(0) invert(1)" : "none",
                              opacity: 0.9,
                            }}
                          />
                        ) : null}
                      </motion.div>
                    </motion.div>

                    {/* Checklist Text */}
                    <div className="min-w-0">
                      <motion.p
                        className={typography.checklistLabel}
                        style={{
                          color: dark ? "#9ca3af" : "#0F0F0FCC",
                        }}
                      >
                        {item[0]}
                      </motion.p>

                      <motion.p
                        className={typography.checklistSub}
                        style={{
                          color: dark ? "#e5e7eb" : "#0F0F0FCC",
                        }}
                      >
                        {item[1]}
                      </motion.p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN — HERO IMAGE */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="flex justify-center md:justify-end items-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.95 }
              }
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex justify-center md:justify-end items-center w-full"
            >
              <div className="relative w-full max-w-[440px] lg:max-w-[700px]">
                {IMAGES.hero ? (
                  <Image
                    src={IMAGES.hero}
                    alt="Mudra Lotus Hand"
                    priority
                    width={700}
                    height={700}
                    sizes="(max-width: 768px) 100vw, 700px"
                    className="w-full h-auto object-contain"
                  />
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        </SiteContainer>
      </motion.section>
    </Section>
  );
}
