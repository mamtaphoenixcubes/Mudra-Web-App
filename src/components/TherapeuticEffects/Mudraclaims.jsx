"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

const claims = [
  { label: "Anxiety & Stress",       bg: "bg-benefit-1" },
  { label: "Sleep Disorders",        bg: "bg-benefit-2" },
  { label: "Headaches",              bg: "bg-benefit-3" },
  { label: "Digestive Issues",       bg: "bg-benefit-4" },
  { label: "Hormonal Imbalances",    bg: "bg-benefit-5" },
  { label: "Low Energy",             bg: "bg-benefit-3" },
  { label: "Emotional Ups & Downs",  bg: "bg-benefit-2" },
  { label: "Blood Pressure",         bg: "bg-benefit-5" },
  { label: "Respiratory Health",     bg: "bg-problem-3" },
  { label: "Focus & Productivity",   bg: "bg-benefit-1" },
];

function Tag({ item, mobile = false, dark, index }) {
  const tagVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      className={`
        ${item.bg}
        flex items-center justify-center text-center
        rounded-xl sm:rounded-2xl
        transition-all duration-300 hover:scale-105 hover:shadow-md
        ${mobile
          ? "px-3 py-4 min-h-[56px]"
          : "px-3 py-3 sm:py-4 md:py-5 lg:py-6 xl:py-7 2xl:py-8 min-h-[48px] sm:min-h-[56px] md:min-h-[64px] lg:min-h-[72px] xl:min-h-[80px] 2xl:min-h-[100px]"
        }
        w-full
      `}
      variants={tagVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
        transition: { duration: 0.2 },
      }}
    >
      <span
        className={`
          font-semibold leading-snug
          ${mobile
            ? "text-[13px]"
            : "text-[10px] sm:text-[12px] md:text-[13px] lg:text-[15px] xl:text-[17px] 2xl:text-[22px]"
          }
        `}
        style={{ color: dark ? "#000000" : "#1f2937" }}
      >
        {item.label}
      </span>
    </motion.div>
  );
}

export default function MudraClaims() {
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

  // Container variants for stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
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
      <div className={`${spacing.container}`}>

        {/* ── Heading ── */}
        <motion.div 
          className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-14 2xl:mb-16"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p className={`${typography.benefitsSectionLabel}`} style={{ color: dark ? "#ffffff" : "#9ca3af" }}>
            MUDRA CLAIMS
          </p>
          <h2
            className={`
              ${typography.benefitsSectionHeading}
              mt-1 sm:mt-2
            `}
            style={{ color: textColor }}
          >
            What Mudras May Help With
          </h2>
          <p
            className={`
              ${typography.sectionMbBody}
              mt-2 sm:mt-3
              max-w-[260px] sm:max-w-none mx-auto
            `}
            style={{ color: dark ? "#ffffff" : "#6b7280" }}
          >
            Mudras can be supportive for a wide range of conditions and imbalances.
          </p>
        </motion.div>

        {/* ── MOBILE (< sm): 2-col grid ── */}
        <motion.div 
          className="sm:hidden grid grid-cols-2 gap-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {claims.map((c, i) => (
            <Tag key={i} item={c} mobile dark={dark} index={i} />
          ))}
        </motion.div>

        {/* ── TABLET / DESKTOP (sm+): 5-col × 2 rows ── */}
        <motion.div 
          className="hidden sm:grid sm:grid-cols-5 gap-3 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {claims.map((c, i) => (
            <Tag key={i} item={c} dark={dark} index={i} />
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
}