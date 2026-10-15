
"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import { IMAGES } from "../../assets/assets";
import { typography, spacing, btn } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import SiteContainer from "../../common/SiteContainer";

export default function AboutHero() {
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.3,
  });

  const { dark, textColor } = useTheme();

  const scrollToPhilosophy = () => {
    const el = document.getElementById("our-philosophy");

    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

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

  return (
    <motion.section
      ref={sectionRef}
      className={`relative ${spacing.sectionPaddingY} ${spacing.heroGap}`}
      style={{
        backgroundColor: dark ? "#111827" : "#ffffff",
        overflow: "hidden",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <SiteContainer
        className="grid grid-cols-1 md:grid-cols-2 items-center"
        sx={{
          columnGap: {
            xs: 4,
            md: 6,
            lg: 8,
          },
        }}
      >
        {/* LEFT COLUMN */}
        <motion.div
          className={`flex flex-col md:block ${spacing.heroLeftColWb} ${spacing.heroLeftColOffset} relative z-10 min-w-0`}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className={spacing.contentColumn}>
            {/* Section Label */}
            <motion.p
              className={`${typography.sectionLabel} mb-2`}
              style={{
                color: dark ? "#9ca3af" : "#0F0F0F99",
              }}
              variants={itemVariants}
            >
              THE PROBLEM
            </motion.p>

            {/* Main Title */}
            <motion.h1
              className={typography.MainHeading}
              style={{
                color: textColor,
                fontFamily:
                  '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
              }}
              variants={itemVariants}
            >
              The smallest gesture
              <br />
              becomes a doorway
              <br />
              to deep transformation.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className={`${typography.heroBody} ${spacing.maxWHeroBody} mt-2 sm:mt-6 mb-2`}
              style={{
                color: dark ? "#9ca3af" : "#0F0F0F",
              }}
              variants={itemVariants}
            >
              At Mudras, we blend ancient wisdom with modern science to help
              you restore balance,
              <br className="hidden lg:block" />
              reduce stress, and live with clarity and purpose.
            </motion.p>

            {/* Action Button */}
            <motion.button
              type="button"
              onClick={scrollToPhilosophy}
              className={`${btn.primary} relative overflow-hidden group`}
              style={{
                backgroundColor: textColor,
              }}
              variants={buttonVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: `0 8px 40px ${textColor}50`,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative flex items-center gap-2">
                Our Philosophy

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
          </div>
        </motion.div>

        {/* RIGHT COLUMN — HERO IMAGE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex justify-center md:justify-end items-center min-w-0 w-full"
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
            <div className="relative w-full max-w-[440px] lg:max-w-[800px]">
              <Image
                src={IMAGES.hero}
                alt="Mudra Lotus Hand"
                priority
                width={800}
                height={800}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                className="w-full h-auto object-contain"
              />
            </div>
          </motion.div>
        </motion.div>
      </SiteContainer>
    </motion.section>
  );
}
