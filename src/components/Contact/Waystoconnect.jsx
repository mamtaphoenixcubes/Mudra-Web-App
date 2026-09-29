"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { spacing, typography } from "../../theme";
import { IMAGES } from "../../assets/assets";
import Image from "next/image";
import { useTheme } from "../../context/ThemeContext";

const items = [
  {
    title: "Email Us",
    line1: "hello@mudras.app",
    line2: "We're happy to help.",
    icon: IMAGES.Mail,
  },
  {
    title: "Support",
    line1: "support@mudras.app",
    line2: "For technical or account help.",
    icon: IMAGES.Support,
  },
  {
    title: "Instagram",
    line1: "@mudras.app",
    line2: "Follow us for inspiration.",
    icon: IMAGES.Instagram,
  },
  {
    title: "Learn & Explore",
    line1: "Visit our blog",
    line2: "Guides, articles & more.",
    icon: IMAGES.IconPractice,
  },
];

export default function WaysToConnect() {
  const { dark, textColor } = useTheme();
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

  // Container variants for stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Item variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
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

  const headingText = "Our Ways to Connect";
  const headingChars = headingText.split("");

  return (
    <motion.section 
      ref={sectionRef}
      className={`w-full ${spacing.sectionPaddingX} py-8 md:py-10 lg:py-14`} 
      style={{
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className={spacing.container}>
        <motion.div 
          className="bg-primary/20 border border-primary rounded-2xl p-5 sm:p-6 md:p-8 lg:p-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{
            boxShadow: dark 
              ? "0 8px 30px rgba(0,0,0,0.3)"
              : "0 8px 30px rgba(0,0,0,0.06)",
            transition: { duration: 0.3 }
          }}
        >
          {/* Heading - Character by character */}
          <motion.h2 
            className={`${typography.sectionMbHeading} text-center mb-6 sm:mb-8 md:mb-10`} 
            style={{ color: textColor }}
          >
            {headingChars.map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={charVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{ display: "inline-block" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h2>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 divide-x-0 md:divide-x divide-y md:divide-y-0" 
            style={{
              borderColor: dark ? "#374151" : textColor + "20",
            }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {items.map((item, i) => (
              <motion.div 
                key={i} 
                className="flex flex-col items-center text-center px-4 py-6 sm:py-7 md:py-2 md:px-6 lg:px-8 gap-3 md:gap-4"
                variants={itemVariants}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div 
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-sm" 
                  style={{
                    backgroundColor: dark ? "#ffffff" : "#ffffff",
                  }}
                  whileHover={{
                    scale: 1.12,
                    rotate: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <Image 
                    src={item.icon} 
                    alt={item.title}
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain"
                  />
                </motion.div>
                <motion.p 
                  className="text-sm sm:text-[15px] md:text-base font-bold" 
                  style={{ color: textColor }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  {item.title}
                </motion.p>
                <div className="flex flex-col gap-0.5">
                  <p className="text-[11px] sm:text-xs md:text-sm" style={{ color: dark ? "#ffffff" : "#6b7280" }}>
                    {item.line1}
                  </p>
                  <p className="text-[11px] sm:text-xs md:text-sm" style={{ color: dark ? "#ffffff" : "#6b7280" }}>
                    {item.line2}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </motion.section>
  );
}