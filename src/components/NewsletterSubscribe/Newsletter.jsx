"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { typography, spacing } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import { newsletterService } from "../../services/apiService";
import { toast } from "react-toastify";

function MailIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.5}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  );
}

export default function NewsletterSection() {
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.1,
    margin: "-50px"
  });

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await newsletterService.subscribe(email);
      toast.success(res?.message || "Successfully subscribed to our newsletter.");
      setEmail("");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to subscribe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
        delay: i * 0.03,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Word animation for subtitle
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

  const headingText = "Subscribe to Our Newsletter";
  const headingChars = headingText.split("");
  
  const subtitleText = "Join our community and get curated insights on mudras, yoga nidra, wellness practices, and special offers.";
  const subtitleWords = subtitleText.split(" ");

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
      <motion.div 
        className={`${spacing.newsletter.maxWidth} mx-auto flex flex-col items-center text-center ${spacing.newsletter.gap}`}
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Heading - Character by character */}
        <motion.h2 
          className={typography.newsletter.heading} 
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

        {/* Subtitle - Word by word */}
        <motion.p 
          className={`${typography.newsletter.subtitle} max-w-md sm:max-w-lg`} 
          style={{ color: dark ? "#ffffff" : "#4b5563" }}
        >
          {subtitleWords.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={wordVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              style={{ display: "inline-block", marginRight: "0.25em" }}
              transition={{ delay: i * 0.04 + 0.2 }}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>

        {/* Input + Button joined row */}
        <motion.div 
          className={`w-full ${spacing.newsletter.containerWidth} ${spacing.newsletter.marginTop}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div 
            className={`flex items-stretch border rounded-lg overflow-hidden ${spacing.newsletter.inputHeight}`} 
            style={{
              borderColor: dark ? "#ffffff" : "#ffffff",
            }}
            whileHover={{
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              transition: { duration: 0.2 }
            }}
          >
            {/* Mail icon */}
            <motion.div 
              className={`flex items-center ${spacing.newsletter.iconPaddingLeft} shrink-0`} 
              style={{
                backgroundColor: dark ? "#1f2937" : "#ffffff",
                color: dark ? "#ffffff" : "#171718",
              }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
            >
              <MailIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.div>

            {/* Email input */}
            <motion.input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className={`flex-1 min-w-0 ${spacing.newsletter.inputPaddingX} ${typography.newsletter.inputText} outline-none h-full`}
              style={{
                backgroundColor: dark ? "#1f2937" : "#ffffff",
                color: dark ? "#e5e7eb" : "#374151",
              }}
              whileFocus={{
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            />

            {/* Subscribe button */}
            <motion.button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`shrink-0 text-white ${spacing.newsletter.buttonPaddingX} ${typography.newsletter.buttonText} transition-colors cursor-pointer whitespace-nowrap h-full ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              style={{
                backgroundColor: dark ? textColor : textColor,
                opacity: dark ? 0.85 : 0.85,
              }}
              whileHover={!isLoading ? {
                scale: 1.05,
                opacity: 1,
                boxShadow: `0 4px 20px ${textColor}40`,
                transition: { duration: 0.2 }
              } : {}}
              whileTap={!isLoading ? { scale: 0.95 } : {}}
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </motion.button>

          </motion.div>
        </motion.div>

        {/* Privacy note */}
        <motion.p 
          className={typography.newsletter.privacyNote} 
          style={{ color: dark ? "#fcfcfc" : "#2c2d30" }}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          We respect your privacy. Unsubscribe at any time.
        </motion.p>

      </motion.div>
    </motion.section>
  );
}