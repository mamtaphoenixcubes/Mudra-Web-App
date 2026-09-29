"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import { useRouter } from "next/navigation";

export default function CTASection() {
  const { dark, textColor } = useTheme();
  const router = useRouter();
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

  const slideInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  // Character animation for heading
  const charVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.04,
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
        delay: i * 0.06,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const headingText = "Explore. Learn. Integrate.";
  const headingChars = headingText.split("");
  const bodyText = "Honor energy path, Embrace the unity. Let every gesture guide you inward.";
  const bodyWords = bodyText.split(" ");

  return (
    <motion.section 
      ref={sectionRef}
      className={`w-full ${spacing.sectionPadding}`} 
      style={{
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-7xl sm:max-w-[90%] md:max-w-[1000px] lg:max-w-[1100px] xl:max-w-[1200px] 2xl:max-w-[2100px] mx-auto">

        {/* Card - Keeping bg-cta-card */}
        <motion.div 
          className={`bg-cta-card ${spacing.ctaCardRadius} ${spacing.ctaCardPad} flex flex-col sm:flex-row items-center ${spacing.ctaCardGap}`}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          whileHover={{
            boxShadow: dark 
              ? "0 20px 60px rgba(0,0,0,0.3)"
              : "0 20px 60px rgba(0,0,0,0.1)",
            transition: { duration: 0.3 }
          }}
        >
          {/* Image with zoom on hover */}
          <motion.div 
            className={`${spacing.ctaImgWidth} aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shrink-0`} 
            style={{
              backgroundColor: dark ? "#374151" : "#e5e7eb",
            }}
            variants={slideInLeft}
          >
            <motion.div
              className="w-full h-full"
              whileHover={{
                scale: 1.08,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
            >
              {IMAGES.Honorenergy && (
                <Image
                  src={IMAGES.Honorenergy}
                  alt="Honorenergy"
                  width={600}
                  height={450}
                  className="w-full h-full object-cover"
                />
              )}
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div 
            className="flex flex-col items-start w-full sm:flex-1"
            variants={slideInRight}
          >
            {/* Heading - Character by character */}
            <motion.h2 
              className={`${typography.ctaHeading} ${spacing.ctaTitleMb}`} 
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

            {/* Body - Word by word */}
            <motion.p 
              className={`${typography.ctaBody} ${spacing.ctaBodyMb}`} 
              style={{ color: dark ? "#4b5563" : "#4b5563" }}
            >
              {bodyWords.map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  style={{ display: "inline-block", marginRight: "0.25em" }}
                  transition={{ delay: i * 0.06 + 0.2 }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>

            {/* CTA button */}
            <motion.button 
              className={`
                ${typography.ctaBtnText} ${spacing.ctaBtnPad} ${spacing.ctaBtnMb}
                rounded-lg sm:rounded-xl
                transition-all duration-200 cursor-pointer
                shadow-[7.19px_8.13px_2.65px_0px_rgba(0,0,0,0.06)]
                relative overflow-hidden
              `}
              style={{
                backgroundColor: textColor,
                color: "#ffffff",
              }}
              whileHover={{
                scale: 1.05,
                opacity: 0.85,
                boxShadow: `0 8px 40px ${textColor}40`,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/MudraLibrary")}
            >
              {/* Shine effect */}
              <motion.span
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative">
                Explore Mudras
              </span>
            </motion.button>
          </motion.div>

        </motion.div>
      </div>
    </motion.section>
  );
}