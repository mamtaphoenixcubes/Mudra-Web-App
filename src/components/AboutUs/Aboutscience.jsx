"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { maxW, spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

export default function AboutScience() {
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
    margin: "-50px"
  });

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  // Character animation for heading
  const charVariants = {
    hidden: { opacity: 0, y: 20, rotateX: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.03,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Word animation for body text
  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.03,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Split text
  const headingText = "The Science of Stillness. The Architecture of Energy.";
  const headingChars = headingText.split("");

  const bodyText1 = "We live in an era of unprecedented noise. Our minds are perpetually accelerated, our nervous systems are overstimulated, and our vital energy is leaked through a thousand digital distractions.";
  const bodyText1Words = bodyText1.split(" ");

  const bodyText2 = "Yoga Mudra Nidra was founded to hand you back the controls.";
  const bodyText2Words = bodyText2.split(" ");

  const bodyText3 = "We do not view yoga as a series of athletic contortions. We view it as a precise, internal technology. By combining the ancient science of Mudras (gestural seals that route your body's electromagnetic currents) with the restorative depth of Yoga Nidra (psychic sleep that systematically rewires your brainwaves), we create a direct path to physical healing and mental sovereignty.";
  const bodyText3Words = bodyText3.split(" ");

  return (
    <motion.section
      ref={sectionRef}
      className={`
        grid grid-cols-1 md:grid-cols-2
        items-center
        ${spacing.sectionPaddingX}
        ${spacing.sectionPaddingY}
        ${spacing.heroGap}
        ${spacing.heroSectionMinH}
      `}
      style={{
        backgroundColor: dark ? "#111827" : "#f9fafb",
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* LEFT */}
      <motion.div
        className={`flex flex-col md:block ${spacing.heroLeftColWb} order-1 md:order-1`}
        variants={fadeInLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="flex flex-col md:block">
          <div className={spacing.contentColumn}>

            {/* Label */}
            <motion.p
              className={`${typography.heroBody} ${maxW.heroBody} mt-2 sm:mt-6`}
              style={{ color: dark ? "#ffffff" : "#9ca3af" }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              ABOUT US
            </motion.p>

            {/* Heading - Character by character */}
            <h1 className={`${typography.aboutHeading} text-primary`} style={{ color: textColor }}>
              The Science of <br />
              Stillness. The <br />
              Architecture of Energy.<br />
            </h1>
            {/* Body 1 - Word by word */}
            <motion.p
              className={`${typography.heroBody} ${maxW.heroMbBody} mt-2 sm:mt-6`}
              style={{ color: dark ? "#f2f7ff" : "#4b5563" }}
            >
              {bodyText1Words.map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  style={{ display: "inline-block", marginRight: "0.25em" }}
                  transition={{ delay: i * 0.03 + 0.2 }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>

            {/* Body 2 - Word by word */}
            <motion.p
              className={`${typography.heroBody} ${maxW.heroMbBody} mt-2 sm:mt-6 font-semibold`}
              style={{ color: textColor }}
            >
              {bodyText2Words.map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  style={{ display: "inline-block", marginRight: "0.25em" }}
                  transition={{ delay: i * 0.03 + 0.4 }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>

            {/* Body 3 - Word by word */}
            <motion.p
              className={`${typography.heroBody} ${maxW.heroMbBody} mt-2 sm:mt-6`}
              style={{ color: dark ? "#ffffff" : "#4b5563" }}
            >
              {bodyText3Words.map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  style={{ display: "inline-block", marginRight: "0.25em" }}
                  transition={{ delay: i * 0.03 + 0.6 }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>

          </div>
        </div>
      </motion.div>

      {/* RIGHT — image */}
      <motion.div
        className={`flex justify-center md:justify-start items-center w-full md:pl-1 lg:pl-2 xl:pl-3 ${spacing.heroRightColW} order-2 md:order-2`}
        variants={fadeInRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          whileHover={{
            scale: 1.03,
            transition: { duration: 0.3 }
          }}
          className="w-full max-w-[420px] sm:max-w-[500px] md:max-w-full mx-auto md:mx-0"
        >
          <Image
            src={IMAGES.Untitled}
            alt="Person meditating in sunlight"
            priority
            width={790}
            height={780}
            className={`
              w-full h-auto object-contain rounded-2xl
            `}
          />
        </motion.div>
      </motion.div>

    </motion.section>
  );
}