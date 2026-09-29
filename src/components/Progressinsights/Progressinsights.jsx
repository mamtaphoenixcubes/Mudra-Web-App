"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import { IMAGES } from "../../assets/assets";

// ─── Config ─────────────────────────────────────────────────────────────────
const TABS = [
  { id: "all", label: "All" },
  { id: "reminders", label: "Reminders" },
  { id: "updates", label: "Updates" },
];

const TIME_RANGES = ["This Week", "This Month", "This Year", "All Time"];

const STATS = [
  {
    id: "practiceTime",
    icon: IMAGES.Clock,
    value: "3h 25m",
    label: "Total Practice Time",
  },
  {
    id: "sessions",
    icon: IMAGES.HolisticWellbeing,
    value: "12",
    label: "Sessions Completed",
  },
  {
    id: "streak",
    icon: IMAGES.FireIcon,
    value: "5",
    label: "Day Streak Keep it up!",
  },
  {
    id: "weeklyGoal",
    icon: IMAGES.Star,
    value: "85%",
    label: "Weekly Goal Achieved",
  },
];

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
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const statItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },
};

// ─── Stat Item ──────────────────────────────────────────────────────────────
function StatItem({ stat, isLast, dark, textColor }) {
  return (
    <motion.div
      variants={statItemVariants}
      whileHover="hover"
      className="flex flex-col items-center text-center flex-1 px-2 py-3 sm:py-0"
      style={{
        borderRight: isLast ? "none" : `1px solid ${dark ? "#cccccc" : "#3a3a3a"}`,
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <Image
          src={stat.icon}
          alt={stat.label}
          width={28}
          height={28}
          className="mb-2"
          style={{ filter: "brightness(0) saturate(100%) invert(47%) sepia(76%) saturate(1236%) hue-rotate(222deg) brightness(96%) contrast(92%)" }}
        />
      </motion.div>
      <motion.p
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4, type: "spring", stiffness: 200 }}
        className="text-[17px] sm:text-[19px] font-bold leading-none"
        style={{ color: textColor }}
      >
        {stat.value}
      </motion.p>
      <p
        className="text-[10.5px] sm:text-[11px] leading-tight mt-1.5 max-w-[90px]"
        style={{ color: dark ? "#9ca3af" : "#8A8577" }}
      >
        {stat.label}
      </p>
    </motion.div>
  );
}

// ─── Segmented Tabs ─────────────────────────────────────────────────────────
function SegmentedTabs({ activeTab, setActiveTab, dark }) {
  const activeIndex = TABS.findIndex((t) => t.id === activeTab);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.4 }}
      className="relative grid grid-cols-3 p-1 rounded-full border"
      style={{
        borderColor: dark ? "#374151" : "#E9E3D6",
        backgroundColor: dark ? "#1f2937" : "#f5f5f5",
      }}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute top-1 bottom-1 rounded-full"
        style={{
          width: "calc(33.333% - 4px)",
          left: `calc(${activeIndex * 33.333}% + 4px)`,
          backgroundColor: "#9A85FE",
        }}
      />
      {TABS.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative z-10 py-2.5 rounded-full text-[13px] font-medium transition-colors"
            style={{
              color: isActive ? "#ffffff" : dark ? "#9ca3af" : "#6b7280",
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </motion.div>
  );
}

// ─── Time Range Dropdown ────────────────────────────────────────────────────
function TimeRangeDropdown({ range, setRange, dark, textColor }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 text-[12px] sm:text-[13px] font-medium"
        style={{ color: dark ? "#9ca3af" : "#8A8577" }}
      >
        {range}
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={14} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-36 rounded-xl border shadow-lg overflow-hidden z-50"
              style={{
                backgroundColor: dark ? "#1f2937" : "#ffffff",
                borderColor: dark ? "#374151" : "#E9E3D6",
              }}
            >
              {TIME_RANGES.map((r) => (
                <motion.button
                  key={r}
                  whileHover={{ backgroundColor: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}
                  onClick={() => {
                    setRange(r);
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-[13px] transition-colors"
                  style={{
                    color: r === range ? "#9A85FE" : textColor,
                    fontWeight: r === range ? 600 : 400,
                  }}
                >
                  {r}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Progress Insights ──────────────────────────────────────────────────────
export default function ProgressInsights() {
  const { dark, textColor } = useTheme();
  const [activeTab, setActiveTab] = useState("all");
  const [timeRange, setTimeRange] = useState("This Week");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`w-full ${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`}
      style={{ backgroundColor: dark ? "#020202" : "#ffffff" }}
    >
      <div className="mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-5 sm:mb-6"
        >
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className={typography.playerHeading}
            style={{ color: textColor }}
          >
            Progress Insights
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-[12.5px] sm:text-[13.5px] mt-1"
            style={{ color: "#9A85FE" }}
          >
            Track your journey. Celebrate your growth.
          </motion.p>
        </motion.div>

        {/* Segmented tabs */}
        <SegmentedTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          dark={dark}
        />

        {/* Stats card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="mt-5 sm:mt-6 rounded-[20px] border px-4 sm:px-6 py-5 sm:py-6"
          style={{
            backgroundColor: dark ? "#353535" : "#9A85FE33",
            borderColor: dark ? "#374151" : "#E9E3D6",
          }}
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-between mb-4 sm:mb-5"
          >
            <h3
              className="text-[13px] sm:text-[14px] font-semibold"
              style={{ color: textColor }}
            >
              Your Overall Progress
            </h3>
            <TimeRangeDropdown
              range={timeRange}
              setRange={setTimeRange}
              dark={dark}
              textColor={textColor}
            />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row divide-y sm:divide-y-0 divide-solid"
          >
            {STATS.map((stat, i) => (
              <StatItem
                key={stat.id}
                stat={stat}
                isLast={i === STATS.length - 1}
                dark={dark}
                textColor={textColor}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}