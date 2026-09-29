// components/NewsletterSection.jsx
"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { IMAGES } from "../../assets/assets";
import { typography, spacing, btn, card } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import { newsletterService } from "../../services/apiService";
import { toast } from "react-toastify";

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

  const handleSubscribe = async () => {
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

  const headingText = "Stay Inspired";
  const headingChars = headingText.split("");

  return (
    <motion.section 
      ref={sectionRef}
      className={spacing.newsletterContainer} 
      style={{
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className={spacing.newsletterInner}
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >

        {/* ── MOBILE layout ── */}
        <div className={`flex flex-col ${spacing.newsletterMobileGap} sm:hidden`}>
          {/* Image */}
          <motion.div 
            className={spacing.newsletterMobileImage} 
            style={{
              backgroundColor: dark ? "#374151" : "#f3f4f6",
            }}
            variants={slideInLeft}
          >
            <motion.div
              className="w-full h-full"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <Image
                src={IMAGES.AilmentsHero}
                alt="Stay Inspired"
                width={400}
                height={300}
                className="object-cover w-full h-full"
              />
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            variants={slideInRight}
          >
            <motion.h2 
              className={typography.newsletterMobileHeading} 
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
            <motion.p 
              className={typography.newsletterMobileBody} 
              style={{ color: dark ? "#9ca3af" : "#4b5563" }}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Get weekly insights on mudras, Yoga Nidra wellness tips and new
              articles delivered to your inbox.
            </motion.p>
          </motion.div>

          {/* Email input */}
          <motion.div 
            className={`flex flex-col ${spacing.newsletterInputWrapper}`}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center gap-2">
              <motion.input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={spacing.newsletterMobileInput}
                style={{
                  backgroundColor: dark ? "#1f2937" : "#ffffff",
                  borderColor: dark ? "#374151" : "#e5e7eb",
                  color: dark ? "#e5e7eb" : "#374151",
                }}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
              <motion.button
                onClick={handleSubscribe}
                disabled={isLoading}
                className={`${btn.newsletter} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                style={{
                  backgroundColor: textColor,
                  color: "#ffffff",
                }}
                whileHover={!isLoading ? {
                  scale: 1.05,
                  opacity: 0.85,
                  boxShadow: `0 4px 20px ${textColor}40`,
                  transition: { duration: 0.2 }
                } : {}}
                whileTap={!isLoading ? { scale: 0.95 } : {}}
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </motion.button>
            </div>
            <motion.p 
              className={typography.newsletterDisclaimer} 
              style={{ color: dark ? "#6b7280" : "#9ca3af" }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              No spam, Unsubscribe anytime.
            </motion.p>
          </motion.div>
        </div>

        {/* ── TABLET / DESKTOP layout ── */}
        <div className={`hidden sm:flex items-center ${spacing.newsletterDesktopGap}`}>
          {/* Image */}
          <motion.div 
            className={spacing.newsletterImageWrapper} 
            style={{
              backgroundColor: dark ? "#374151" : "#f3f4f6",
            }}
            variants={slideInLeft}
          >
            <motion.div
              className="w-full h-full"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              {IMAGES.JourneyInward && (
                <Image
                  src={IMAGES.JourneyInward}
                  alt="Transform Your Life"
                  width={700}
                  height={550}
                  className="w-full h-full object-cover"
                />
              )}
            </motion.div>
          </motion.div>

          {/* Text with responsive font sizes */}
          <motion.div 
            className="flex-1 min-w-0"
            variants={slideInRight}
          >
            <motion.h2 
              className={typography.newsletterHeading} 
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
            <motion.p 
              className={`${typography.newsletterBody} max-w-sm`} 
              style={{ color: dark ? "#000000" : "#4b5563" }}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Get weekly insights on mudras, Yoga Nidra wellness tips and new
              articles delivered to your inbox.
            </motion.p>
          </motion.div>

          {/* Email input */}
          <motion.div 
            className="flex flex-col gap-1 flex-shrink-0"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center gap-2">
              <motion.input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={spacing.newsletterInput}
                style={{
                  backgroundColor: dark ? "#1f2937" : "#ffffff",
                  borderColor: dark ? "#374151" : "#e5e7eb",
                  color: dark ? "#e5e7eb" : "#374151",
                }}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
              <motion.button
                onClick={handleSubscribe}
                disabled={isLoading}
                className={`${btn.newsletter} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                style={{
                  backgroundColor: textColor,
                  color: "#ffffff",
                }}
                whileHover={!isLoading ? {
                  scale: 1.05,
                  opacity: 0.85,
                  boxShadow: `0 4px 20px ${textColor}40`,
                  transition: { duration: 0.2 }
                } : {}}
                whileTap={!isLoading ? { scale: 0.95 } : {}}
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </motion.button>
            </div>
            <motion.p 
              className={typography.newsletterDisclaimer} 
              style={{ color: dark ? "#6b7280" : "#9ca3af" }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              No spam, Unsubscribe anytime.
            </motion.p>
          </motion.div>
        </div>

      </motion.div>
    </motion.section>
  );
}