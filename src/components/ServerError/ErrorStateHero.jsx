"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import SiteContainer from "../../common/SiteContainer";

export default function ErrorStateHero({
  code = "500",
  title = "Something Went Wrong",
  description = "We're experiencing some technical difficulties on our end.\nOur team has been notified and is working to fix it.",
  onGoBackHome,
  onTryAgain,
}) {
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.1,
    margin: "-50px",
  });

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.2,
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

  // Word animation for description
  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.04,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const headingText = title;
  const headingChars = headingText.split("");

  // Split into lines, then into words per line
  const descriptionLines = description.split("\n").map((line) => line.split(" "));

  return (
    <motion.section
      ref={sectionRef}
      className="w-full"
      style={{
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <SiteContainer>
        <div className="flex flex-col items-center text-center">
          {/* Code - Scale in */}
          <motion.h1
            className={typography.errorState.code}
            style={{ color: textColor }}
            variants={scaleIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {code}
          </motion.h1>

          {/* Title - Character by character */}
          <motion.h2
            className={typography.errorState.title}
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

          {/* Description - Word by word, per line */}
          <motion.p
            className={typography.errorState.description}
            style={{ color: dark ? "#ffffff" : "#0F0F0F" }}
          >
            {descriptionLines.map((lineWords, lineIndex) => (
              <span key={lineIndex}>
                {lineWords.map((word, wordIndex) => (
                  <motion.span
                    key={`${lineIndex}-${wordIndex}`}
                    custom={lineIndex * 10 + wordIndex}
                    variants={wordVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    style={{ display: "inline-block", marginRight: "0.25em" }}
                  >
                    {word}
                  </motion.span>
                ))}
                {lineIndex < descriptionLines.length - 1 && <br />}
              </span>
            ))}
          </motion.p>

          {/* Actions */}
          <motion.div
            className={typography.errorState.actionsContainer}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={onGoBackHome}
                className={typography.errorState.primaryButton}
                style={{
                  backgroundColor: textColor,
                  color: "#ffffff",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.85";
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Go Back Home
              </button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={onTryAgain}
                className={typography.errorState.secondaryButton}
                style={{
                  borderColor: dark ? "#ffffff" : "#e5e7eb",
                  color: dark ? "#e5e7eb" : "#374151",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = dark ? "#374151" : "#f9fafb";
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Try Again
              </button>
            </motion.div>
          </motion.div>
        </div>
      </SiteContainer>
    </motion.section>
  );
}