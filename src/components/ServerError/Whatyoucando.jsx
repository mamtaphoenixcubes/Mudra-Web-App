"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { typography, spacing } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";

const CARDS = [
  {
    id: "home",
    title: "Go Back Home",
    description: "Return to our homepage and continue your journey.",
    bg: "bg-cta-card",
    href: "/",
  },
  {
    id: "articles",
    title: "Explore Articles",
    description: "Discover helpful guides and insights in our library.",
    bg: "bg-about-card",
    href: "/articles",
  },
  {
    id: "support",
    title: "Contact Support",
    description: "If the problem persists... we're here to help.",
    bg: "bg-balance-the-elements-card",
    href: "/contact",
  },
];

export default function WhatYouCanDo() {
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

  // Character animation for heading
  const charVariants = {
    hidden: { opacity: 0, y: 20, rotateX: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.06,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Staggered card variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const headingText = "What You Can Do";
  const headingChars = headingText.split("");

  return (
    <motion.section 
      ref={sectionRef}
      className={`w-full ${spacing.sectionPadding}`} 
      style={{
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className={`${spacing.whatYouCanDo.container} ${spacing.sectionPaddingY} ${spacing.sectionPaddingX}`} 
        style={{
          backgroundColor: dark ? "#111827" : "#ffffff",
        }}
      >
        {/* Title - Character by character */}
        <motion.h2 
          className={typography.whatYouCanDo.title} 
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

        {/* Divider with lotus icon */}
        <motion.div 
          className={typography.divider.wrapper}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.span 
            className={typography.divider.line} 
            style={{
              backgroundColor: dark ? "#ffffff" : "#e5e7eb",
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          />
          <motion.div 
            className={typography.divider.icon}>
            <Image
              src={IMAGES.Energy}
              alt="Lotus divider"
              width={40}
              height={40}
              className="w-full h-full object-contain"
              style={{
                filter: dark ? "brightness(0.8) invert(1)" : "none",
              }}
            />
          </motion.div>
          <motion.span 
            className={typography.divider.line} 
            style={{
              backgroundColor: dark ? "#ffffff" : "#e5e7eb",
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          />
        </motion.div>

        {/* Cards */}
        <motion.div 
          className={spacing.whatYouCanDo.cardsGrid}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {CARDS.map((card, index) => (
            <motion.a
              key={card.id}
              href={card.href}
              className={`${spacing.whatYouCanDo.card} ${card.bg}`}
              style={{
                backgroundColor: dark ? "#374151" : undefined,
                transition: "all 0.3s ease",
              }}
              variants={cardVariants}
              whileHover={{
                y: -6,
                boxShadow: dark 
                  ? "0 10px 30px rgba(0,0,0,0.3)"
                  : "0 10px 30px rgba(0,0,0,0.1)",
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={spacing.whatYouCanDo.cardHeader}>
                <motion.h3 
                  className={typography.whatYouCanDo.cardTitle} 
                  style={{ color: textColor }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  {card.title}
                </motion.h3>
                <motion.svg
                  className={spacing.whatYouCanDo.cardArrow}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: textColor }}
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 1,
                  }}
                >
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </motion.svg>
              </div>
              <motion.p 
                className={typography.whatYouCanDo.cardDescription} 
                style={{ color: dark ? "#ffffff" : "#4b5563" }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                {card.description}
              </motion.p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}