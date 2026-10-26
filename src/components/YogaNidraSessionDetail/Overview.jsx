"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { typography } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";
import SiteContainer from "../../common/SiteContainer";

export default function Overview({
  descriptionText = "Deep Relaxation Yoga Nidra is a guided practice that leads you into a state of conscious relaxation between wakefulness and sleep. It helps release tension, quieten the mind, and promote deep rest and rejuvenation.",
}) {
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.1,
    margin: "-50px",
  });

  /* ---------- animation variants ---------- */
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  const slideInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };
  const slideInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };
  const charVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
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

  const headingChars = "Overview".split("");
  const descriptionWords = (descriptionText || "").split(" ");

  return (
    <motion.section
      ref={sectionRef}
      style={{ backgroundColor: dark ? "#111827" : "#ffffff" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* ✅ SiteContainer handles responsive max-width + px + py */}
      <SiteContainer>
        <div className="flex justify-center">
          <motion.div
            className={`${typography.gyanMudraCard.container} w-full`}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{
              boxShadow: dark
                ? "0 8px 30px rgba(0,0,0,0.3)"
                : "0 8px 30px rgba(0,0,0,0.06)",
              transition: { duration: 0.3 },
            }}
          >
            {/* Icon Circle */}
            <motion.div
              className={typography.gyanMudraCard.iconWrapper}
              style={{ backgroundColor: dark ? "#ffffff" : "#f3f4f6" }}
              variants={slideInLeft}
              whileHover={{
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.2 },
              }}
            >
              <Image
                src={IMAGES.KayaMudras}
                alt="Gyan Mudra"
                width={80}
                height={80}
                className={typography.gyanMudraCard.iconImage}
              />
            </motion.div>

            {/* Content */}
            <motion.div
              className={typography.gyanMudraCard.contentWrapper}
              variants={slideInRight}
            >
              {/* Heading — character by character */}
              <motion.h3
                className={typography.gyanMudraCard.title}
                style={{ color: "#0F0F0FCC" }}
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
              </motion.h3>

              {/* Description — word by word */}
              <motion.p
                className={typography.gyanMudraCard.description}
                style={{ color: dark ? "#000000" : "#0F0F0FCC" }}
              >
                {descriptionWords.map((word, i) => (
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
            </motion.div>
          </motion.div>
        </div>
      </SiteContainer>
    </motion.section>
  );
}