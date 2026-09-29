"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { typography, spacing } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

const SUGGESTED = ["Prithvi Mudra", "Yoga Nidra for Sleep", "Stress Relief", "Five Elements", "Anxiety"];

export default function NoResultsStateHero({ searchTerm = "your search term" }) {
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.1,
    margin: "-50px"
  });

  const [query, setQuery] = useState("");

  const SearchIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );

  const surface = dark ? "bg-gray-900" : "bg-white";

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

  // Word animation for description
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

  // Staggered suggested buttons
  const suggestedVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.08 + 0.3,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const headingText = "No results found";
  const headingChars = headingText.split("");
  
  const descriptionText = `We couldn't find anything matching "${searchTerm}". Try different keywords or explore our content.`;
  const descriptionWords = descriptionText.split(" ");

  return (
    <motion.div 
      ref={sectionRef}
      className={`${spacing.noResults.container} ${spacing.sectionPaddingY} ${surface}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Title - Character by character */}
      <motion.h1 
        className={`${typography.sectionSbHeading} ${typography.noResults.title}`} 
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
      </motion.h1>

      {/* Description - Word by word */}
      <motion.p 
        className={typography.noResults.description} 
        style={{ color: dark ? "#9ca3af" : "#4b5563" }}
      >
        {descriptionWords.map((word, i) => (
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

      {/* Search Input */}
      <motion.div 
        className={typography.noResults.inputWrapper}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <motion.input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Try another search..."
          className={typography.noResults.input}
          style={{
            backgroundColor: dark ? "#1f2937" : "#ffffff",
            borderColor: dark ? "#374151" : "#e5e7eb",
            color: dark ? "#e5e7eb" : "#111827",
          }}
          whileFocus={{
            scale: 1.02,
            boxShadow: `0 0 0 3px ${textColor}30`,
            transition: { duration: 0.2 }
          }}
        />
        <motion.button 
          className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors cursor-pointer"
          style={{ color: dark ? "#6b7280" : "#9ca3af" }}
          whileHover={{
            scale: 1.2,
            color: textColor,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.9 }}
        >
          <SearchIcon />
        </motion.button>
      </motion.div>

      {/* Suggested Searches */}
      <motion.p 
        className={typography.noResults.suggestedLabel} 
        style={{ color: dark ? "#9ca3af" : "#4b5563" }}
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        Popular searches:
      </motion.p>
      
      <motion.div 
        className={typography.noResults.suggestedContainer}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        {SUGGESTED.map((s, i) => (
          <motion.button
            key={s}
            className={typography.noResults.suggestedButton}
            style={{
              backgroundColor: dark ? "#374151" : "#E1DBFF",
              color: dark ? "#e5e7eb" : "#1f2937",
              transition: "all 0.3s ease",
            }}
            custom={i}
            variants={suggestedVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{
              scale: 1.08,
              backgroundColor: textColor,
              color: "#ffffff",
              boxShadow: `0 4px 20px ${textColor}40`,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            {s}
          </motion.button>
        ))}
      </motion.div>

    </motion.div>
  );
}