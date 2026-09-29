"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

const bullets = [
  "Mudras are a complementary wellness practice and not a substitute for medical treatment.",
  "Always consult a qualified healthcare professional for medical conditions.",
  "Discontinue practice if you experience discomfort.",
  "Individual results may vary.",
];

export default function DisclaimerSection() {
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.1,
    margin: "-50px"
  });

  // Fade up variants for header
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  // Slide in variants for card
  const slideInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  // Slide in right for bullets
  const slideInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  // Staggered bullet variants
  const bulletVariants = {
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
      <div className={spacing.container}>

        {/* Heading */}
        <motion.div 
          className={`text-center ${spacing.headingBlockMb}`}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p className={`${typography.benefitsSectionLabel}`} style={{ color: dark ? "#ffffff" : "#9ca3af" }}>
            DISCLAIMER
          </p>
          <h2 className={`${typography.benefitsSectionHeading} ${spacing.labelMt}`} style={{ color: textColor }}>
            Responsible &amp; Respectful
          </h2>
          <p className={`${typography.sectionMbBody} mt-2 sm:mt-3`} style={{ color: dark ? "#ffffff" : "#6b7280" }}>
            We value your health and trust.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div 
          className={`bg-primary/10 rounded-xl sm:rounded-2xl ${spacing.disclaimerCardPad} flex flex-col sm:flex-row items-start ${spacing.disclaimerGap} w-full`}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.2 }}
          whileHover={{
            boxShadow: dark 
              ? "0 8px 30px rgba(0,0,0,0.3)"
              : "0 8px 30px rgba(0,0,0,0.08)",
            transition: { duration: 0.3 }
          }}
        >
          {/* Shield icon */}
          <motion.div 
            className="shrink-0 flex justify-center sm:justify-start w-full sm:w-auto sm:pt-1"
            variants={slideInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.3 }}
          >
            <motion.div 
              className={`${spacing.disclaimerIconBox} flex items-center justify-center`}
              whileHover={{
                scale: 1.1,
                rotate: -5,
                transition: { duration: 0.3 }
              }}
            >
              <Image
                src={IMAGES.Shield}
                alt="Disclaimer shield"
                width={64}
                height={64}
                className="w-full h-full object-contain"
                style={{
                  opacity: dark ? 0.8 : 0.7,
                  filter: dark ? "brightness(0.8) invert(1)" : "none",
                }}
              />
            </motion.div>
          </motion.div>

          {/* Bullets */}
          <motion.ul 
            className={`flex flex-col ${spacing.disclaimerBulletGap} flex-1`}
            variants={slideInRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.3 }}
          >
            {bullets.map((b, i) => (
              <motion.li 
                key={i} 
                className="flex items-start gap-2 sm:gap-3"
                custom={i}
                variants={bulletVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover={{
                  x: 5,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.span 
                  className={`mt-[5px] shrink-0 ${spacing.disclaimerDot} rounded-full`} 
                  style={{
                    backgroundColor: textColor,
                  }}
                  whileHover={{
                    scale: 1.5,
                    transition: { duration: 0.2 }
                  }}
                />
                <span className={`${typography.disclaimerBody}`} style={{ color: dark ? "#e5e7eb" : "#374151" }}>
                  {b}
                </span>
              </motion.li>
            ))}
          </motion.ul>

        </motion.div>
      </div>
    </motion.section>
  );
}