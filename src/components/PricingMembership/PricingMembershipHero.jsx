"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { btn, heroImage, maxW, spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

export default function Hero() {
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
        delay: i * 0.05,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Staggered feature variants
  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  
  const bodyText = "Unlock the full power of mudras and Yoga Nidra with guided practices, personalized insights and expert content.";
  const bodyWords = bodyText.split(" ");

  return (
    <motion.section
      ref={sectionRef}
      className={`
        grid grid-cols-2 md:grid-cols-2
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
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* LEFT */}
      <motion.div 
        className={`flex flex-col md:block ${spacing.heroLeftColWb} ${spacing.heroLeftColOffset}`}
        variants={fadeInLeft}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className={spacing.contentColumn}>

         <h1 className={`${typography.MainHeading}`} style={{ color: textColor }}>
            Choose the Plan That <br /> Supports Your Practice
          </h1>

          {/* Underline */}
          <motion.div 
            className="w-10 h-[3px] mt-2 mb-4" 
            style={{ backgroundColor: textColor }}
            initial={{ width: 0 }}
            animate={isInView ? { width: "2.5rem" } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />

          {/* Body - Word by word */}
          <motion.p 
            className={`${typography.heroBody} ${maxW.heroMbBody}`} 
            style={{ color: dark ? "#ffffff" : "#4b5563" }}
          >
            {bodyWords.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{ display: "inline-block", marginRight: "0.25em" }}
                transition={{ delay: i * 0.05 + 0.2 }}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          {/* FEATURES LIST */}
          <div className="mt-6 space-y-4">

            {/* 7-Day Free Trial */}
            <div className="mt-6 space-y-5 md:space-y-5">
              <motion.div 
                className="flex items-start gap-4 md:gap-4"
                custom={0}
                variants={featureVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover={{
                  x: 5,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div 
                  className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple-200"
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <Image
                    src={IMAGES.Lock}
                    alt="Free Trial"
                    width={20}
                    height={20}
                    className="object-contain md:w-5 md:h-5"
                  />
                </motion.div>

                <div>
                  <motion.p 
                    className="font-semibold text-sm md:text-base" 
                    style={{ color: dark ? "#f9fafb" : "#111827" }}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    7-Day Free Trial
                  </motion.p>
                  <p className="text-xs md:text-sm mt-0.5 md:mt-1" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
                    Try all premium features. Cancel anytime.
                  </p>
                </div>
              </motion.div>

              {/* Cancel Anytime */}
              <motion.div 
                className="flex items-start gap-4 md:gap-4"
                custom={1}
                variants={featureVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover={{
                  x: 5,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div 
                  className="flex items-center justify-center w-20 h-10 md:w-12 md:h-12 rounded-full bg-blue-200"
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <Image
                    src={IMAGES.CancelAnytime}
                    alt="Cancel Anytime"
                    width={20}
                    height={20}
                    className="object-contain md:w-5 md:h-5"
                  />
                </motion.div>

                <div>
                  <motion.p 
                    className="font-semibold text-sm md:text-base" 
                    style={{ color: dark ? "#f9fafb" : "#111827" }}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    Cancel Anytime
                  </motion.p>
                  <p className="text-xs md:text-sm mt-0.5 md:mt-1" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
                    No commitments. Pause or cancel anytime.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </motion.div>

      {/* RIGHT — hero image */}
      <motion.div 
        className={`${heroImage.wrapper} ${spacing.heroRightColW}`}
        variants={fadeInRight}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3 }
          }}
        >
          <Image
            src={IMAGES.hero}
            alt="Mudra Hand"
            priority
            className={`
              ${heroImage.width}
              h-auto
              object-contain
              max-w-full md:max-w-none
            `}
          />
        </motion.div>
      </motion.div>

    </motion.section>
  );
}