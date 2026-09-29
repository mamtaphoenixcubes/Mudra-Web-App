"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { IMAGES } from "../../assets/assets";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

const features = [
  {
    title: "Guided Practices",
    description: "Step-by-step mudra and Yoga Nidra sessions to support your well-being.",
    icon: IMAGES.Energy || IMAGES.Energy,
  },
  {
    title: "Ancient Wisdom",
    description: "Explore the meaning, benefits, and history behind each practice.",
    icon: IMAGES.IconPractice || IMAGES.IconPractice,
  },
  {
    title: "Track & Grow",
    description: "Track your progress and build mindful habits every day.",
    icon: IMAGES.EmotionalBalance || IMAGES.EmotionalBalance,
  },
  {
    title: "Daily Reminders",
    description: "Stay consistent with gentle reminders and motivation",
    icon: IMAGES.Bell || IMAGES.BellIcon,
  },
];

function AppStoreBadge({ dark }) {
  return (
    <motion.a 
      href="#" 
      className={spacing.downloadModal.appStoreBadge} 
      style={{
        backgroundColor: dark ? "#374151" : "#000000",
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="text-[8px]" style={{ color: dark ? "#9ca3af" : "#9ca3af" }}>Download on the</span>
        <span className="text-[12px] font-medium" style={{ color: dark ? "#e5e7eb" : "#ffffff" }}>App Store</span>
      </div>
    </motion.a>
  );
}

function GooglePlayBadge({ dark }) {
  return (
    <motion.a 
      href="#" 
      className={spacing.downloadModal.googlePlayBadge} 
      style={{
        backgroundColor: dark ? "#374151" : "#000000",
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
        <path d="M3.18 23.5c.3.17.64.26.99.24l11.4-11.4-2.83-2.84L3.18 23.5z" fill="#EA4335" />
        <path d="M20.5 10.72l-2.78-1.6-3.17 3.17 3.17 3.16 2.81-1.62a1.6 1.6 0 0 0 0-3.1z" fill="#FBBC04" />
        <path d="M3.18.5C2.82.72 2.57 1.1 2.57 1.6v20.8c0 .5.25.88.61 1.1l11.56-11.57L3.18.5z" fill="#4285F4" />
        <path d="M4.17.24l10.36 10.36-2.82 2.83L3.18.5c.3-.17.66-.26.99-.26z" fill="#34A853" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="text-[8px]" style={{ color: dark ? "#9ca3af" : "#9ca3af" }}>GET IT ON</span>
        <span className="text-[12px] font-medium" style={{ color: dark ? "#e5e7eb" : "#ffffff" }}>Google Play</span>
      </div>
    </motion.a>
  );
}

export default function DownloadAppModal() {
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.1,
    margin: "-50px"
  });

  const surface = dark ? "bg-gray-900" : "bg-white";
  const border = dark ? "border-gray-700" : "border-gray-200";

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

  const headingText = "Take Mudras With You, Everywhere";
  const headingChars = headingText.split("");

  return (
    <motion.div 
      ref={sectionRef}
      className={spacing.downloadModal.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className={`${spacing.downloadModal.modalContainer} `} 
        style={{
          backgroundColor: dark ? "#1f2937" : "#f3f4f6",
        }}
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        whileHover={{
          boxShadow: dark 
            ? "0 20px 60px rgba(0,0,0,0.5)"
            : "0 20px 60px rgba(0,0,0,0.15)",
          transition: { duration: 0.3 }
        }}
      >
        {/* Close button */}
        <motion.button 
          className={spacing.downloadModal.closeButton}
          whileHover={{
            scale: 1.1,
            rotate: 90,
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.9 }}
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </motion.button>

        <div className="flex flex-col md:flex-row">

          {/* Image — top on mobile, right on tablet/desktop */}
          <motion.div 
            className={spacing.downloadModal.imageContainer}
            variants={slideInLeft}
          >
            <motion.div 
              className={spacing.downloadModal.imageWrapper} 
              style={{
                backgroundColor: dark ? "#ffffff" : "#f3f4f6",
              }}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
            >
              {IMAGES.Downloadapp ? (
                <Image
                  src={IMAGES.Downloadapp}
                  alt="App preview showing Mudras app interface"
                  width={400}
                  height={500}
                  className={spacing.downloadModal.image}
                  priority
                />
              ) : (
                <div className={spacing.downloadModal.imagePlaceholder}>
                  <div className="text-center p-4">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: textColor }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span className="text-sm font-medium" style={{ color: textColor }}>App Preview Image</span>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Content — bottom on mobile, left on tablet/desktop */}
          <motion.div 
            className={spacing.downloadModal.contentContainer}
            variants={slideInRight}
          >
            <div>
              {/* Heading - Character by character */}
              <motion.h2 
                className={typography.downloadModal.heading} 
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
                className={typography.downloadModal.description} 
                style={{ color: dark ? "#ffffff" : "#4b5563" }}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Download the Mudras app and access ancient wisdom, guided practices, and wellness tools anytime, anywhere.
              </motion.p>
            </div>

            <div className={spacing.downloadModal.featuresList}>
              {features.map((f, i) => (
                <motion.div 
                  key={f.title} 
                  className={spacing.downloadModal.featureItem}
                  custom={i}
                  variants={featureVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover={{
                    x: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.div 
                    className={spacing.downloadModal.featureIcon} 
                    style={{
                      backgroundColor: dark ? "#ffffff" : "#f3f4f6",
                    }}
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <Image
                      src={f.icon}
                      alt={f.title}
                      width={32}
                      height={32}
                      className="w-6 h-6 md:w-7 md:h-7 object-contain"
                    />
                  </motion.div>
                  <div>
                    <motion.h3 
                      className={typography.downloadModal.featureTitle} 
                      style={{ color: textColor }}
                      whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {f.title}
                    </motion.h3>
                    <p className={typography.downloadModal.featureDescription} style={{ color: dark ? "#ffffff" : "#4b5563" }}>
                      {f.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className={spacing.downloadModal.dividerContainer}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div 
                className={spacing.downloadModal.dividerLine} 
                style={{
                  backgroundColor: dark ? "#374151" : "#e5e7eb",
                }}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />
              <motion.span 
                className={spacing.downloadModal.dividerText} 
                style={{ color: dark ? "#9ca3af" : "#6b7280" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                Download the App
              </motion.span>
              <motion.div 
                className={spacing.downloadModal.dividerLine} 
                style={{
                  backgroundColor: dark ? "#374151" : "#e5e7eb",
                }}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />
            </motion.div>

            <motion.div 
              className={spacing.downloadModal.badgesContainer}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <AppStoreBadge dark={dark} />
              <GooglePlayBadge dark={dark} />
            </motion.div>

          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}