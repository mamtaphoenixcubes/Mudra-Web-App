"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import Section from "../../common/Section";
import SiteContainer from "../../common/SiteContainer";

export default function FAQHero() {
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
    margin: "-50px",
  });

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

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

  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05 + 0.2,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const headingText = "Frequently Asked Questions";
  const headingChars = headingText.split("");

  const bodyText =
    "Find answers to the most common questions about Mudras, Yoga Nidra, and how to begin your journey.";
  const bodyWords = bodyText.split(" ");

  return (
    <Section
      className={`${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`}
      sx={{
        backgroundColor: dark ? "#111827" : "#ffffff",
        py: { xs: 5, sm: 6, md: 8 },
      }}
    >
      <SiteContainer
        sx={{
          py: 0,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "minmax(0, 1fr) minmax(0, 1fr)",
          },
          gap: { xs: 4, md: 5, lg: 8 },
          alignItems: "center",
        }}
      >
        <motion.div
          ref={sectionRef}
          className="contents"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* LEFT: Text content */}
          <motion.div
            className="flex min-w-0 flex-col"
            variants={fadeInLeft}
          >
            <motion.h1
              className={`${typography.aboutHeading} text-primary leading-tight mb-2 sm:mb-3`}
              style={{ color: textColor }}
            >
              {headingChars.map((char, i) => (
                <motion.span
                  key={`${char}-${i}`}
                  custom={i}
                  variants={charVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  style={{ display: "inline-block" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>

            {/* Underline */}
            <motion.div
              className="w-8 sm:w-10 lg:w-14 h-[2px] sm:h-[3px] bg-primary rounded-full mt-1 sm:mt-2 mb-3 sm:mb-5"
              style={{ backgroundColor: textColor }}
              initial={{ width: 0 }}
              animate={isInView ? { width: "3.5rem" } : { width: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />

            {/* Description */}
            <motion.p
              className={`${typography.heroBody} leading-relaxed mb-6 sm:mb-8 max-w-sm sm:max-w-md`}
              style={{ color: dark ? "#ffffff" : "#4b5563" }}
            >
              {bodyWords.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  style={{
                    display: "inline-block",
                    marginRight: "0.25em",
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          {/* RIGHT: App preview image */}
          <motion.div
            className="flex w-full min-w-0 items-center justify-center md:justify-end"
            variants={fadeInRight}
          >
            <motion.div
              className="w-full max-w-[340px] sm:max-w-[420px] md:max-w-full"
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
            >
              {IMAGES.faq ? (
                <Image
                  src={IMAGES.faq}
                  alt="Mudras App Preview"
                  width={600}
                  height={420}
                  priority
                  sizes="(max-width: 600px) 340px, (max-width: 900px) 420px, 50vw"
                  className="h-auto w-full rounded-2xl border-2 border-gray-200 object-contain"
                />
              ) : (
                <div className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl border-2 border-gray-200 bg-gray-100">
                  <span className="text-sm text-gray-400">
                    App Preview
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </SiteContainer>
    </Section>
  );
}
