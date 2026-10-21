"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { spacing, typography } from "../../theme";
import { IMAGES } from "../../assets/assets";
import Image from "next/image";
import { useTheme } from "../../context/ThemeContext";
import SiteContainer from "../../common/SiteContainer";

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
    margin: "-50px",
  });

  // Main section animation
  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Container variants for staggered animations
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Individual item animation
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
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
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -10,
    },
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
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.6,
      }}
    >
      <SiteContainer
        sx={{
          width: "100%",
          maxWidth: {
            xs: "100%",
            sm: "100%",
            md: "1200px",
            lg: "1360px",
            xl: "1600px",
          },
          mx: "auto",
          px: {
            xs: 2,
            sm: 3,
            md: 3,
            lg: 3,
            xl: 3,
          },
          py: 0,
          boxSizing: "border-box",
        }}
      >
        {/* Main card */}
        <motion.div
          className="w-full min-w-0 box-border bg-primary/20 border border-primary rounded-2xl p-5 sm:p-6 md:p-8 lg:p-10"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          whileHover={{
            boxShadow: dark
              ? "0 8px 30px rgba(0,0,0,0.3)"
              : "0 8px 30px rgba(0,0,0,0.06)",
            transition: {
              duration: 0.3,
            },
          }}
        >
          {/* Heading */}
          <motion.h2
            className={`${typography.sectionMbHeading} text-center mb-6 sm:mb-8 md:mb-10`}
            style={{
              color: textColor,
            }}
          >
            {headingChars.map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={charVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                style={{
                  display: "inline-block",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h2>

          {/* Contact options */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x-0 md:divide-x"
            style={{
              borderColor: dark ? "#374151" : `${textColor}20`,
            }}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {items.map((item, i) => (
              <motion.div
                key={i}
                className="flex min-w-0 flex-col items-center text-center px-4 py-6 sm:py-7 md:py-2 md:px-4 lg:px-6 gap-3 md:gap-4"
                variants={itemVariants}
                whileHover={{
                  y: -4,
                  transition: {
                    duration: 0.2,
                  },
                }}
              >
                {/* Icon */}
                <motion.div
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-sm shrink-0"
                  style={{
                    backgroundColor: "#ffffff",
                  }}
                  whileHover={{
                    scale: 1.12,
                    rotate: 5,
                    transition: {
                      duration: 0.2,
                    },
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

                {/* Title */}
                <motion.p
                  className="text-sm sm:text-[15px] md:text-base font-bold"
                  style={{
                    color: textColor,
                  }}
                  whileHover={{
                    scale: 1.05,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                >
                  {item.title}
                </motion.p>

                {/* Description */}
                <div className="flex min-w-0 flex-col gap-0.5">
                  <p
                    className="text-[11px] sm:text-xs md:text-sm break-words"
                    style={{
                      color: dark ? "#ffffff" : "#6b7280",
                    }}
                  >
                    {item.line1}
                  </p>

                  <p
                    className="text-[11px] sm:text-xs md:text-sm break-words"
                    style={{
                      color: dark ? "#ffffff" : "#6b7280",
                    }}
                  >
                    {item.line2}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </SiteContainer>
    </motion.section>
  );
}
