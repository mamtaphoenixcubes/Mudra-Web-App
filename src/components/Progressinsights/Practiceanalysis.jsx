"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import { IMAGES } from "../../assets/assets";

// ─── Config ─────────────────────────────────────────────────────────────────
const PRACTICE_DATA = [
  {
    id: "mudra",
    label: "Mudra Meditation",
    duration: "1h 20m",
    percent: 40,
    color: "#8A6FF0",
  },
  {
    id: "yogaNidra",
    label: "Yoga Nidra",
    duration: "1h 10m",
    percent: 35,
    color: "#B7A6FA",
  },
  {
    id: "elementBalance",
    label: "Element Balance",
    duration: "55m",
    percent: 25,
    color: "#E4DDFD",
  },
];

const INSIGHT_TEXT = "You practice Mudra Meditation the most.";

// ─── Animation Variants ─────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const chartVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const legendItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  hover: {
    x: 5,
    transition: { duration: 0.2 },
  },
};

const iconVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { delay: 0.3, duration: 0.5, type: "spring", stiffness: 200 },
  },
};

// ─── Donut Chart (pure SVG) ───────────────────────────────────────────────
function DonutChart({ data, isInView }) {
  const size = 180;
  const strokeWidth = 36;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;

  return (
    <svg viewBox={"0 0 " + size + " " + size} className="w-full h-full -rotate-90">
      {data.map((slice, index) => {
        const dash = (slice.percent / 100) * circumference;
        const gap = circumference - dash;
        const offset = (cumulativePercent / 100) * circumference;
        cumulativePercent += slice.percent;

        return (
          <motion.circle
            key={slice.id}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={slice.color}
            strokeWidth={strokeWidth}
            strokeDasharray={dash + " " + gap}
            strokeDashoffset={-offset}
            strokeLinecap="butt"
            initial={{ opacity: 0, strokeDashoffset: 0 }}
            animate={isInView ? {
              opacity: 1,
              strokeDashoffset: -offset,
              transition: {
                duration: 1.2,
                delay: index * 0.3,
                ease: "easeOut"
              }
            } : {
              opacity: 0,
              strokeDashoffset: 0
            }}
          />
        );
      })}
    </svg>
  );
}

// ─── Percent Labels (positioned outside the ring) ─────────────────────────
function ChartLabels({ data, dark, isInView }) {
  const size = 200;
  const radius = 112;
  const center = size / 2;
  let cumulativePercent = 0;

  return (
    <svg
      viewBox={"0 0 " + size + " " + size}
      className="absolute inset-0 w-full h-full overflow-visible"
    >
      {data.map((slice, index) => {
        const startPercent = cumulativePercent;
        cumulativePercent += slice.percent;
        const midPercent = startPercent + slice.percent / 2;
        const angle = (midPercent / 100) * 360 - 98;
        const rad = (angle * Math.PI) / 180;
        const x = center + radius * Math.cos(rad);
        const y = center + radius * Math.sin(rad);

        return (
          <motion.text
            key={slice.id}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-[12px] font-medium"
            fill={dark ? "#d1d5db" : "#6b7280"}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? {
              opacity: 1,
              scale: 1,
              transition: {
                delay: 0.5 + index * 0.2,
                duration: 0.4,
                type: "spring",
                stiffness: 150
              }
            } : {
              opacity: 0,
              scale: 0.5
            }}
          >
            {slice.percent}%
          </motion.text>
        );
      })}
    </svg>
  );
}

// ─── Legend Item ────────────────────────────────────────────────────────────
function LegendItem({ item, dark, textColor, index, isInView }) {
  return (
    <motion.div
      variants={legendItemVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      custom={index}
      className="flex items-center gap-3 w-full pl-20"
    >
      {/* LEFT: Color Dot */}
      <motion.span
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: 0.3 + index * 0.1, duration: 0.3, type: "spring" }}
        className="w-3 h-3 rounded-full flex-shrink-0"
        style={{ backgroundColor: item.color }}
      />

      {/* CENTER: Label and Duration */}
      <div className="flex-1 min-w-0">
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
          className="text-sm font-medium truncate"
          style={{ color: textColor }}
        >
          {item.label}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
          className="text-xs"
          style={{ color: dark ? "#ffffff" : "#8A8577" }}
        >
          {item.duration}
        </motion.p>
      </div>

      {/* RIGHT: Percentage */}
      <motion.span
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{
          delay: 0.4 + index * 0.1,
          duration: 0.3,
          type: "spring",
          stiffness: 200
        }}
        className="text-sm font-medium flex-shrink-0"
        style={{ color: dark ? "#ffffff" : "#6b7280" }}
      >
        {item.percent}%
      </motion.span>
    </motion.div>
  );
}

// ─── Practice Analysis ──────────────────────────────────────────────────────
export default function PracticeAnalysis() {
  const { dark, textColor } = useTheme();
  const router = useRouter();
  
  // Create ref for the component
  const practiceRef = useRef(null);
  const headerRef = useRef(null);
  const cardRef = useRef(null);
  const chartRef = useRef(null);
  const legendRef = useRef(null);
  const footerRef = useRef(null);
  
  // Check if sections are in view
  const practiceInView = useInView(practiceRef, { once: true, margin: "-50px" });
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" });
  const cardInView = useInView(cardRef, { once: true, margin: "-50px" });
  const chartInView = useInView(chartRef, { once: true, margin: "-50px" });
  const legendInView = useInView(legendRef, { once: true, margin: "-50px" });
  const footerInView = useInView(footerRef, { once: true, margin: "-50px" });

  // Navigation handler
  const handleViewAllClick = () => {
    router.push('/Practiceanalysisdetail');
  };

  return (
    <motion.div
      ref={practiceRef}
      initial={{ opacity: 0 }}
      animate={practiceInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      className={`w-full ${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`}
      style={{
        backgroundColor: dark ? "#000000" : "#ffffff",
        borderColor: dark ? "#ffffff" : "#EDEAE1",
      }}
    >
      {/* Header */}
      <motion.div
        ref={headerRef}
        variants={fadeUp}
        initial="hidden"
        animate={headerInView ? "visible" : "hidden"}
        className="flex items-center justify-between mb-6"
      >
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={headerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="text-lg font-semibold"
          style={{ color: textColor }}
        >
          1. Practice Analysis (by Type)
        </motion.h3>
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={headerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleViewAllClick}
          className="text-sm font-medium flex items-center gap-1 hover:opacity-80 transition-opacity"
          style={{ color: "#9A85FE" }}
        >
          View All
          <ChevronRight size={16} />
        </motion.button>
      </motion.div>

      {/* Card */}
      <motion.div
        ref={cardRef}
        variants={cardVariants}
        initial="hidden"
        animate={cardInView ? "visible" : "hidden"}
        className="rounded-2xl border overflow-hidden"
        style={{
          backgroundColor: dark ? "#353535" : "#f5f5f5",
          borderColor: dark ? "#ffffff" : "#EDEAE1",
        }}
      >
        {/* Inner content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={cardInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="py-4 sm:py-6 md:py-8 lg:py-10 px-4 sm:px-6 md:px-8 lg:px-10"
        >
          {/* Main layout: Donut (left) | Legend (center) | Percentage (right) */}
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            {/* LEFT: Donut Chart */}
            <motion.div
              ref={chartRef}
              variants={chartVariants}
              initial="hidden"
              animate={chartInView ? "visible" : "hidden"}
              className="relative flex-shrink-0 w-48 h-48 sm:w-52 sm:h-52 md:w-56 md:h-56"
            >
              <DonutChart data={PRACTICE_DATA} isInView={chartInView} />
              <ChartLabels data={PRACTICE_DATA} dark={dark} isInView={chartInView} />
              <motion.div
                variants={iconVariants}
                initial="hidden"
                animate={chartInView ? "visible" : "hidden"}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                  className="w-25 h-25 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm"
                >
                  {IMAGES.HolisticWellbeing ? (
                    <Image
                      src={IMAGES.HolisticWellbeing}
                      alt="Holistic Wellbeing"
                      width={55}
                      height={55}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-xs text-gray-500">No icon</span>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>

            {/* RIGHT: Legend Items */}
            <motion.div
              ref={legendRef}
              variants={staggerContainer}
              initial="hidden"
              animate={legendInView ? "visible" : "hidden"}
              className="flex-1 w-full space-y-3 sm:space-y-4"
            >
              {PRACTICE_DATA.map((item, index) => (
                <LegendItem
                  key={item.id}
                  item={item}
                  dark={dark}
                  textColor={textColor}
                  index={index}
                  isInView={legendInView}
                />
              ))}
            </motion.div>
          </div>

          {/* Insight footer */}
          <motion.p
            ref={footerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={footerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="text-sm mt-6 pt-4 border-t"
            style={{
              color: dark ? "#ffffff" : "#6b7280",
              borderColor: dark ? "#fdfdfd" : "#EDEAE1"
            }}
          >
            {INSIGHT_TEXT}
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}