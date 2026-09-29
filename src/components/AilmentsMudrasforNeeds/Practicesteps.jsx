// src/components/AilmentsMudrasforNeeds/Practicesteps.jsx
"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { spacing, maxW } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

const steps = [
  {
    icon: IMAGES.Body,
    label: "Sit comfortably with\na straight spine.",
    bg: "#FFF4C2",
  },
  {
    icon: IMAGES.HastaMudras,
    label: "Form the mudra with\nboth hands.",
    bg: "#EDE8FF",
  },
  {
    icon: IMAGES.Breath,
    label: "Breath naturally and\ndeeply.",
    bg: "#D6F0F5",
  },
  {
    icon: IMAGES.Return,
    label: "Hold for 10–20\nminutes daily.",
    bg: "#FFF4C2",
  },
  {
    icon: IMAGES.EmotionalBalance,
    label: "Be consistent and\npatient.",
    bg: "#FFE4E4",
  },
];

export default function StepsAndTips({ tips: customTips = [], title = "" }) {
  const { dark, textColor } = useTheme();
  
  const finalTips = customTips.length > 0 
    ? customTips.map(t => typeof t === 'string' ? t : t.Text)
    : [
        "Practice deep breathing and meditation daily.",
        "Maintain a healthy sleep routine.",
        "Eat fresh, sattvic and balanced meals.",
        "Spend time in nature and stay hydrated.",
        "Limit screen time and digital overload."
      ];

  const headingText = title ? `Lifestyle Tips for ${title}` : "Lifestyle Tips to Reduce Stress";
  const headingChars = headingText.split("");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.1,
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
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  // Staggered step variants
  const stepVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.08,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Staggered tip variants
  const tipVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.06 + 0.3,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  // Arrow animation
  const arrowVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.2,
        duration: 0.4,
        ease: "easeOut",
      },
    },
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

  return (
    <motion.section 
      ref={sectionRef}
      className={`w-full ${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`}
      style={{
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 lg:gap-8 xl:gap-10">
        {/* ================= STEPS ================= */}
        <motion.div 
          className="w-full md:flex-1"
          variants={slideInLeft}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="flex flex-row items-start justify-between w-full">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center flex-1">
                {/* Step */}
                <motion.div 
                  className="flex flex-col items-center text-center w-full gap-1 sm:gap-2"
                  custom={i}
                  variants={stepVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover={{
                    y: -4,
                    transition: { duration: 0.2 }
                  }}
                >
                  {/* Icon */}
                  <motion.div
                    className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: step.bg }}
                    whileHover={{
                      scale: 1.12,
                      rotate: 5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <Image
                      src={step.icon}
                      alt={step.label}
                      width={22}
                      height={22}
                      className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 object-contain"
                    />
                  </motion.div>

                  {/* Label */}
                  <motion.p 
                    className="text-[7px] sm:text-[10px] md:text-[8px] lg:text-[10px] xl:text-xs 2xl:text-base whitespace-pre-line leading-snug" 
                    style={{ color: dark ? "#ffffff" : "#4b5563" }}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {step.label}
                  </motion.p>
                </motion.div>

                {/* Arrow */}
                {i < steps.length - 1 && (
                  <motion.div 
                    className="flex items-start justify-center shrink-0 pt-3 sm:pt-4 md:pt-4 lg:pt-5 xl:pt-6 px-0.5 sm:px-1"
                    variants={arrowVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                  >
                    <motion.span 
                      className="text-[10px] sm:text-sm md:text-base lg:text-lg xl:text-xl" 
                      style={{ color: dark ? "#ffffff" : "#d1d5db" }}
                      animate={{
                        x: [0, 5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.2,
                      }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ================= TIPS CARD ================= */}
        <motion.div
          className={`${maxW.tipsCardClass} relative flex items-start p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 rounded-xl`}
          style={{ backgroundColor: "#EDE8FF" }}
          variants={slideInRight}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          whileHover={{
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
            transition: { duration: 0.3 }
          }}
        >
          {/* TEXT */}
          <div className="flex-1 min-w-0 pr-12 sm:pr-16 md:pr-20 lg:pr-24 xl:pr-28 2xl:pr-42">
            {/* Heading - Character by character */}
            <motion.h3 
              className="text-sm sm:text-base md:text-sm lg:text-base xl:text-lg font-semibold mb-2 sm:mb-3" 
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
            </motion.h3>

            <ul className="space-y-1 sm:space-y-1.5 md:space-y-1.5 lg:space-y-2">
              {finalTips.map((tip, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-2 text-[10px] sm:text-[9px] md:text-[7px] lg:text-[10px] xl:text-xs leading-snug"
                  style={{ color: dark ? "#000000" : "#374151" }}
                  custom={i}
                  variants={tipVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover={{
                    x: 3,
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.span 
                    className="mt-1 shrink-0" 
                    style={{ color: textColor }}
                    whileHover={{
                      scale: 1.5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    •
                  </motion.span>
                  {tip}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* LOTUS - Fixed hydration issue with single-line className */}
          <motion.div 
            className="absolute right-2 sm:right-3 md:right-4 lg:right-6 xl:right-2 2xl:right-0 bottom-9 sm:bottom-9 md:bottom-12 lg:bottom-15 xl:bottom-15 opacity-30"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src={IMAGES.Vector}
              alt="lotus"
              width={100}
              height={100}
              className="w-32 sm:w-14 md:w-20 lg:w-30 xl:w-34 2xl:w-38 object-contain"
              style={{
                filter: dark ? "brightness(0.8) invert(1)" : "none",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}