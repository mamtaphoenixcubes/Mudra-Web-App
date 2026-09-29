"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Hand, Moon, Waves, BarChart3, LineChart as LineChartIcon, Flame, Target, Sun, TrendingUp, TrendingDown, PlayCircle, X, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

// ─── Config ─────────────────────────────────────────────────────────────────
const RANGE_TABS = ["Daily", "Weekly", "Monthly", "Yearly"];

const DATA_BY_RANGE = {
  Daily: {
    totalTime: "1h 45m",
    sessions: 3,
    chart: [
      { label: "Morning", value: 35 },
      { label: "Afternoon", value: 20 },
      { label: "Evening", value: 50 },
      { label: "Night", value: 8 },
    ],
    unit: "min",
    breakdown: [
      { id: "mudra", label: "Mudra Meditation", duration: "42m", percent: 40, trend: "+8%", trendUp: true, color: "#8A6FF0", icon: Hand },
      { id: "yogaNidra", label: "Yoga Nidra", duration: "37m", percent: 35, trend: "+3%", trendUp: true, color: "#B7A6FA", icon: Moon },
      { id: "elementBalance", label: "Element Balance", duration: "26m", percent: 25, trend: "-4%", trendUp: false, color: "#E4DDFD", icon: Waves },
    ],
    stats: {
      mostActiveDay: { label: "Today", value: "50 min" },
      mostRelaxingDay: { label: "Yoga Nidra", value: "37 min" },
      goalAchieved: { percent: 62, label: "1h 45m of 3h" },
      longestStreak: { days: 5 },
    },
    videosCompleted: 4,
    last7Days: [
      { day: "Mon", minutes: 30, sessions: 1, icon: Hand },
      { day: "Tue", minutes: 45, sessions: 2, icon: Moon },
      { day: "Wed", minutes: 20, sessions: 1, icon: Waves },
      { day: "Thu", minutes: 50, sessions: 2, icon: Hand },
      { day: "Fri", minutes: 35, sessions: 1, icon: Moon },
      { day: "Sat", minutes: 60, sessions: 3, icon: Hand },
      { day: "Sun", minutes: 15, sessions: 1, icon: Waves },
    ],
  },
  Weekly: {
    totalTime: "3h 25m",
    sessions: 7,
    chart: [
      { label: "Mon", value: 30 },
      { label: "Tue", value: 45 },
      { label: "Wed", value: 20 },
      { label: "Thu", value: 50 },
      { label: "Fri", value: 35 },
      { label: "Sat", value: 60 },
      { label: "Sun", value: 15 },
    ],
    unit: "min",
    breakdown: [
      { id: "mudra", label: "Mudra Meditation", duration: "1h 20m", percent: 40, trend: "+12%", trendUp: true, color: "#8A6FF0", icon: Hand },
      { id: "yogaNidra", label: "Yoga Nidra", duration: "1h 10m", percent: 35, trend: "+6%", trendUp: true, color: "#B7A6FA", icon: Moon },
      { id: "elementBalance", label: "Element Balance", duration: "55m", percent: 25, trend: "-9%", trendUp: false, color: "#E4DDFD", icon: Waves },
    ],
    stats: {
      mostActiveDay: { label: "Saturday", value: "60 min" },
      mostRelaxingDay: { label: "Sunday", value: "Yoga Nidra" },
      goalAchieved: { percent: 85, label: "5 of 7 days" },
      longestStreak: { days: 12 },
    },
    videosCompleted: 18,
    last7Days: [
      { day: "Mon", minutes: 30, sessions: 1, icon: Hand },
      { day: "Tue", minutes: 45, sessions: 2, icon: Moon },
      { day: "Wed", minutes: 20, sessions: 1, icon: Waves },
      { day: "Thu", minutes: 50, sessions: 2, icon: Hand },
      { day: "Fri", minutes: 35, sessions: 1, icon: Moon },
      { day: "Sat", minutes: 60, sessions: 3, icon: Hand },
      { day: "Sun", minutes: 15, sessions: 1, icon: Waves },
    ],
  },
  Monthly: {
    totalTime: "14h 10m",
    sessions: 28,
    chart: [
      { label: "Wk 1", value: 180 },
      { label: "Wk 2", value: 220 },
      { label: "Wk 3", value: 150 },
      { label: "Wk 4", value: 200 },
    ],
    unit: "min",
    breakdown: [
      { id: "mudra", label: "Mudra Meditation", duration: "5h 40m", percent: 40, trend: "+15%", trendUp: true, color: "#8A6FF0", icon: Hand },
      { id: "yogaNidra", label: "Yoga Nidra", duration: "5h 0m", percent: 35, trend: "+2%", trendUp: true, color: "#B7A6FA", icon: Moon },
      { id: "elementBalance", label: "Element Balance", duration: "3h 30m", percent: 25, trend: "-6%", trendUp: false, color: "#E4DDFD", icon: Waves },
    ],
    stats: {
      mostActiveDay: { label: "Week 2", value: "3h 40m" },
      mostRelaxingDay: { label: "Sundays", value: "Yoga Nidra" },
      goalAchieved: { percent: 78, label: "22 of 28 days" },
      longestStreak: { days: 19 },
    },
    videosCompleted: 64,
    last7Days: [
      { day: "Mon", minutes: 40, sessions: 2, icon: Hand },
      { day: "Tue", minutes: 55, sessions: 2, icon: Moon },
      { day: "Wed", minutes: 25, sessions: 1, icon: Waves },
      { day: "Thu", minutes: 60, sessions: 3, icon: Hand },
      { day: "Fri", minutes: 45, sessions: 2, icon: Moon },
      { day: "Sat", minutes: 70, sessions: 3, icon: Hand },
      { day: "Sun", minutes: 20, sessions: 1, icon: Waves },
    ],
  },
  Yearly: {
    totalTime: "168h",
    sessions: 340,
    chart: [
      { label: "Jan", value: 12 },
      { label: "Feb", value: 14 },
      { label: "Mar", value: 10 },
      { label: "Apr", value: 16 },
      { label: "May", value: 13 },
      { label: "Jun", value: 18 },
      { label: "Jul", value: 15 },
      { label: "Aug", value: 11 },
      { label: "Sep", value: 14 },
      { label: "Oct", value: 17 },
      { label: "Nov", value: 13 },
      { label: "Dec", value: 15 },
    ],
    unit: "h",
    breakdown: [
      { id: "mudra", label: "Mudra Meditation", duration: "67h", percent: 40, trend: "+18%", trendUp: true, color: "#8A6FF0", icon: Hand },
      { id: "yogaNidra", label: "Yoga Nidra", duration: "59h", percent: 35, trend: "+9%", trendUp: true, color: "#B7A6FA", icon: Moon },
      { id: "elementBalance", label: "Element Balance", duration: "42h", percent: 25, trend: "-3%", trendUp: false, color: "#E4DDFD", icon: Waves },
    ],
    stats: {
      mostActiveDay: { label: "June", value: "18h" },
      mostRelaxingDay: { label: "December", value: "Yoga Nidra" },
      goalAchieved: { percent: 91, label: "310 of 340 days" },
      longestStreak: { days: 47 },
    },
    videosCompleted: 512,
    last7Days: [
      { day: "Mon", minutes: 50, sessions: 2, icon: Hand },
      { day: "Tue", minutes: 65, sessions: 3, icon: Moon },
      { day: "Wed", minutes: 30, sessions: 1, icon: Waves },
      { day: "Thu", minutes: 70, sessions: 3, icon: Hand },
      { day: "Fri", minutes: 55, sessions: 2, icon: Moon },
      { day: "Sat", minutes: 80, sessions: 4, icon: Hand },
      { day: "Sun", minutes: 25, sessions: 1, icon: Waves },
    ],
  },
};

// ─── Animation Variants ─────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const cardGridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

// ─── Range Tabs (segmented control) ─────────────────────────────────────────
function RangeTabs({ active, onChange, dark }) {
  const activeIndex = RANGE_TABS.indexOf(active);

  return (
    <div
      className="relative grid p-1 rounded-full border"
      style={{
        gridTemplateColumns: `repeat(${RANGE_TABS.length}, 1fr)`,
        backgroundColor: dark ? "#1c1c1e" : "#f3f3f4",
        borderColor: dark ? "#333333" : "#e5e5e5",
      }}
    >
      <motion.div
        className="absolute top-1 bottom-1 rounded-full"
        style={{ backgroundColor: "#9A85FE", width: `calc(${100 / RANGE_TABS.length}% - 4px)` }}
        animate={{
          left: `calc(${(activeIndex * 100) / RANGE_TABS.length}% + 2px)`,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
      />
      {RANGE_TABS.map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onChange(tab)}
            className="relative z-10 py-2 sm:py-2.5 text-[12.5px] sm:text-[13.5px] font-medium rounded-full transition-colors cursor-pointer"
            style={{ color: isActive ? "#ffffff" : dark ? "#9ca3af" : "#6b7280" }}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}

// ─── Chart Type Toggle ──────────────────────────────────────────────────────
function ChartTypeToggle({ active, onChange, dark }) {
  const options = [
    { id: "bar", icon: BarChart3, label: "Bar" },
    { id: "line", icon: LineChartIcon, label: "Line" },
  ];

  return (
    <div
      className="flex items-center gap-1 p-1 rounded-full border"
      style={{
        backgroundColor: dark ? "#1c1c1e" : "#f3f3f4",
        borderColor: dark ? "#333333" : "#e5e5e5",
      }}
    >
      {options.map((opt) => {
        const Icon = opt.icon;
        const isActive = active === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            aria-label={`${opt.label} chart`}
            className="flex items-center justify-center w-8 h-8 rounded-full transition-colors cursor-pointer"
            style={{ backgroundColor: isActive ? "#9A85FE" : "transparent" }}
          >
            <Icon size={15} style={{ color: isActive ? "#ffffff" : dark ? "#9ca3af" : "#6b7280" }} />
          </button>
        );
      })}
    </div>
  );
}

// ─── Bar Chart ──────────────────────────────────────────────────────────────
function BarChart({ data, unit, dark }) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="flex items-end justify-between gap-1.5 sm:gap-2.5 h-40 sm:h-48 px-1">
      {data.map((d, i) => {
        const heightPercent = (d.value / maxValue) * 100;
        return (
          <div key={d.label} className="flex-1 flex flex-col items-center gap-2 h-full justify-end min-w-0">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.04 }}
              className="text-[9.5px] sm:text-[10.5px] font-medium whitespace-nowrap"
              style={{ color: dark ? "#9ca3af" : "#6b7280" }}
            >
              {d.value}
              {unit}
            </motion.span>
            <div className="w-full flex-1 flex items-end">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${heightPercent}%` }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
                className="w-full rounded-t-md"
                style={{
                  backgroundColor: "#9A85FE",
                  minHeight: 4,
                  opacity: 0.85,
                }}
              />
            </div>
            <span
              className="text-[9.5px] sm:text-[11px] font-medium whitespace-nowrap"
              style={{ color: dark ? "#9ca3af" : "#8A8577" }}
            >
              {d.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Line Chart ─────────────────────────────────────────────────────────────
function LineChartView({ data, unit, dark }) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const width = 100;
  const height = 100;
  const stepX = width / (data.length - 1 || 1);

  const points = data.map((d, i) => ({
    x: i * stepX,
    y: height - (d.value / maxValue) * height,
    value: d.value,
    label: d.label,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height} L 0 ${height} Z`;

  return (
    <div className="h-40 sm:h-48 px-1">
      <div className="relative w-full h-[calc(100%-22px)]">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9A85FE" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#9A85FE" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d={areaPath}
            fill="url(#lineFill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <motion.path
            d={linePath}
            fill="none"
            stroke="#9A85FE"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          {points.map((p, i) => (
            <motion.circle
              key={p.label}
              cx={p.x}
              cy={p.y}
              r="2.2"
              fill="#9A85FE"
              stroke={dark ? "#000000" : "#ffffff"}
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.05 }}
            />
          ))}
        </svg>
      </div>
      <div className="flex items-center justify-between mt-1.5 px-0.5">
        {data.map((d) => (
          <span
            key={d.label}
            className="text-[9.5px] sm:text-[11px] font-medium whitespace-nowrap"
            style={{ color: dark ? "#9ca3af" : "#8A8577" }}
          >
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Practice Type Breakdown Card ───────────────────────────────────────────
function BreakdownCard({ item, dark, textColor, index }) {
  const Icon = item.icon;
  const TrendIcon = item.trendUp ? TrendingUp : TrendingDown;
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (item.percent / 100) * circumference;

  return (
    <motion.div
      variants={cardItemVariants}
      className="rounded-2xl border p-4 sm:p-5 flex flex-col items-center text-center"
      style={{
        backgroundColor: dark ? "#1c1c1e" : "#fafafa",
        borderColor: dark ? "#2e2e2e" : "#EDEAE1",
      }}
    >
      <div className="relative w-[68px] h-[68px] sm:w-[76px] sm:h-[76px] mb-3">
        <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
          <circle cx="32" cy="32" r={radius} fill="none" stroke={dark ? "#333333" : "#EDEAE1"} strokeWidth="6" />
          <motion.circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            stroke={item.color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.8, delay: 0.15 + index * 0.08, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full"
            style={{ backgroundColor: `${item.color}26` }}
          >
            <Icon size={15} style={{ color: item.color }} />
          </div>
        </div>
      </div>

      <p className="text-[13px] sm:text-[13.5px] font-semibold mb-1 leading-tight" style={{ color: textColor }}>
        {item.label}
      </p>
      <p className="text-[16px] sm:text-[17px] font-bold mb-2" style={{ color: textColor }}>
        {item.duration}
      </p>

      <div className="flex items-center gap-1">
        <TrendIcon size={12} style={{ color: item.trendUp ? "#4CAF50" : "#F26161" }} />
        <span
          className="text-[11px] sm:text-[11.5px] font-semibold"
          style={{ color: item.trendUp ? "#4CAF50" : "#F26161" }}
        >
          {item.trend}
        </span>
        <span className="text-[11px] sm:text-[11.5px]" style={{ color: dark ? "#9ca3af" : "#8A8577" }}>
          vs last
        </span>
      </div>
    </motion.div>
  );
}

// ─── Day Session Detail Helpers ─────────────────────────────────────────────
const PRACTICE_TYPES = [
  { label: "Mudra Meditation", icon: Hand, color: "#8A6FF0" },
  { label: "Yoga Nidra", icon: Moon, color: "#B7A6FA" },
  { label: "Element Balance", icon: Waves, color: "#E4DDFD" },
];

const SESSION_TIMES = ["7:00 AM", "12:30 PM", "6:00 PM", "9:15 PM"];

function getDaySessions(day) {
  const count = Math.max(day.sessions, 1);
  const perSession = Math.floor(day.minutes / count);
  let remaining = day.minutes;
  const sessions = [];

  for (let i = 0; i < count; i++) {
    const type = PRACTICE_TYPES[i % PRACTICE_TYPES.length];
    const duration = i === count - 1 ? remaining : perSession;
    remaining -= duration;
    sessions.push({
      id: `${day.day}-${i}`,
      label: type.label,
      icon: type.icon,
      color: type.color,
      duration,
      time: SESSION_TIMES[i % SESSION_TIMES.length],
    });
  }
  return sessions;
}

// ─── Day Session Detail Modal ───────────────────────────────────────────────
function DaySessionModal({ day, onClose, dark, textColor }) {
  return (
    <AnimatePresence>
      {day && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative w-full sm:max-w-sm rounded-t-3xl sm:rounded-3xl border p-5 sm:p-6 max-h-[82vh] overflow-y-auto"
            style={{
              backgroundColor: dark ? "#1c1c1e" : "#ffffff",
              borderColor: dark ? "#2e2e2e" : "#EDEAE1",
            }}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-[12px] sm:text-[12.5px] mb-1" style={{ color: dark ? "#9ca3af" : "#8A8577" }}>
                  Session Details
                </p>
                <h3 className="text-[19px] sm:text-[21px] font-bold" style={{ color: textColor }}>
                  {day.day}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="w-9 h-9 rounded-full flex items-center justify-center border transition-colors hover:bg-black/5 cursor-pointer shrink-0"
                style={{ borderColor: dark ? "#333333" : "#EDEAE1" }}
              >
                <X size={16} style={{ color: textColor }} />
              </button>
            </div>

            {/* Summary strip */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="flex-1 rounded-xl border px-3.5 py-3"
                style={{ backgroundColor: dark ? "#2a2a2a" : "#fafafa", borderColor: dark ? "#333333" : "#EDEAE1" }}
              >
                <p className="text-[10.5px] sm:text-[11px] mb-1" style={{ color: dark ? "#9ca3af" : "#8A8577" }}>
                  Total Time
                </p>
                <p className="text-[15px] sm:text-[16px] font-bold leading-none" style={{ color: textColor }}>
                  {day.minutes}m
                </p>
              </div>
              <div
                className="flex-1 rounded-xl border px-3.5 py-3"
                style={{ backgroundColor: dark ? "#2a2a2a" : "#fafafa", borderColor: dark ? "#333333" : "#EDEAE1" }}
              >
                <p className="text-[10.5px] sm:text-[11px] mb-1" style={{ color: dark ? "#9ca3af" : "#8A8577" }}>
                  Sessions
                </p>
                <p className="text-[15px] sm:text-[16px] font-bold leading-none" style={{ color: textColor }}>
                  {day.sessions}
                </p>
              </div>
            </div>

            {/* Session list */}
            <div className="flex flex-col gap-2.5">
              {getDaySessions(day).map((s, i) => {
                const SessionIcon = s.icon;
                return (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.3 }}
                    className="flex items-center gap-3 rounded-xl border p-3.5"
                    style={{
                      backgroundColor: dark ? "#2a2a2a" : "#fafafa",
                      borderColor: dark ? "#333333" : "#EDEAE1",
                    }}
                  >
                    <div
                      className="flex items-center justify-center w-10 h-10 rounded-full shrink-0"
                      style={{ backgroundColor: `${s.color}26` }}
                    >
                      <SessionIcon size={17} style={{ color: s.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] sm:text-[13.5px] font-semibold truncate" style={{ color: textColor }}>
                        {s.label}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Clock size={11} style={{ color: dark ? "#9ca3af" : "#8A8577" }} />
                        <span className="text-[11px] sm:text-[11.5px]" style={{ color: dark ? "#9ca3af" : "#8A8577" }}>
                          {s.time}
                        </span>
                      </div>
                    </div>
                    <span className="text-[13px] sm:text-[13.5px] font-bold shrink-0" style={{ color: textColor }}>
                      {s.duration}m
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Day Card (individual card in horizontal scroll) ───────────────────────
function DayCard({ day, index, isBest, goalMinutes, dark, textColor, onClick }) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.min((day.minutes / goalMinutes) * 100, 100);
  const offset = circumference - (percent / 100) * circumference;
  const DayIcon = day.icon;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 14, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
      className="flex flex-col items-center shrink-0 rounded-2xl border px-3.5 sm:px-4 py-4 sm:py-4.5 w-[92px] sm:w-[104px] cursor-pointer"
      style={{
        backgroundColor: isBest ? "#9A85FE" : dark ? "#1c1c1e" : "#fafafa",
        borderColor: isBest ? "#9A85FE" : dark ? "#2e2e2e" : "#EDEAE1",
      }}
    >
      <span
        className="text-[11px] sm:text-[11.5px] font-semibold mb-3"
        style={{ color: isBest ? "#ffffff" : dark ? "#9ca3af" : "#8A8577" }}
      >
        {day.day}
      </span>

      <div className="relative w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] mb-3">
        <svg viewBox="0 0 52 52" className="w-full h-full -rotate-90">
          <circle
            cx="26"
            cy="26"
            r={radius}
            fill="none"
            stroke={isBest ? "rgba(255,255,255,0.25)" : dark ? "#333333" : "#EDEAE1"}
            strokeWidth="5"
          />
          <motion.circle
            cx="26"
            cy="26"
            r={radius}
            fill="none"
            stroke={isBest ? "#ffffff" : "#9A85FE"}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.7, delay: 0.15 + index * 0.06, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <DayIcon size={16} style={{ color: isBest ? "#ffffff" : "#9A85FE" }} />
        </div>
        {isBest && (
          <div className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-white">
            <Flame size={11} style={{ color: "#F26161" }} />
          </div>
        )}
      </div>

      <span
        className="text-[13.5px] sm:text-[14.5px] font-bold leading-none"
        style={{ color: isBest ? "#ffffff" : textColor }}
      >
        {day.minutes}m
      </span>
      <span
        className="text-[9.5px] sm:text-[10px] mt-1"
        style={{ color: isBest ? "rgba(255,255,255,0.75)" : dark ? "#6b7280" : "#B0AA9C" }}
      >
        {day.sessions} sess
      </span>
    </motion.button>
  );
}

// ─── Weekly Overview (Previous 7 Days) ──────────────────────────────────────
function WeeklyOverviewCard({ days, videosCompleted, dark, textColor, onDayClick }) {
  const totalMinutes = days.reduce((sum, d) => sum + d.minutes, 0);
  const avgMinutes = Math.round(totalMinutes / days.length);
  const bestDay = days.reduce((best, d) => (d.minutes > best.minutes ? d : best), days[0]);
  const goalMinutes = Math.max(...days.map((d) => d.minutes), 1);

  return (
    <div>
      {/* Highlight strip */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mb-4 sm:mb-5">
        <div
          className="rounded-xl border px-3.5 py-3 sm:py-3.5"
          style={{ backgroundColor: dark ? "#1c1c1e" : "#fafafa", borderColor: dark ? "#2e2e2e" : "#EDEAE1" }}
        >
          <p className="text-[10.5px] sm:text-[11px] mb-1" style={{ color: dark ? "#9ca3af" : "#8A8577" }}>
            Total
          </p>
          <p className="text-[15px] sm:text-[16.5px] font-bold leading-none" style={{ color: textColor }}>
            {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m
          </p>
        </div>
        <div
          className="rounded-xl border px-3.5 py-3 sm:py-3.5"
          style={{ backgroundColor: dark ? "#1c1c1e" : "#fafafa", borderColor: dark ? "#2e2e2e" : "#EDEAE1" }}
        >
          <p className="text-[10.5px] sm:text-[11px] mb-1" style={{ color: dark ? "#9ca3af" : "#8A8577" }}>
            Daily Avg
          </p>
          <p className="text-[15px] sm:text-[16.5px] font-bold leading-none" style={{ color: textColor }}>
            {avgMinutes}m
          </p>
        </div>
        <div
          className="rounded-xl border px-3.5 py-3 sm:py-3.5 flex flex-col justify-between"
          style={{ backgroundColor: "#8A6FF01A", borderColor: "#8A6FF033" }}
        >
          <div className="flex items-center gap-1.5">
            <PlayCircle size={12} style={{ color: "#8A6FF0" }} />
            <p className="text-[10.5px] sm:text-[11px]" style={{ color: "#8A6FF0" }}>
              Videos
            </p>
          </div>
          <p className="text-[15px] sm:text-[16.5px] font-bold leading-none" style={{ color: "#8A6FF0" }}>
            {videosCompleted}
          </p>
        </div>
      </div>

      {/* Horizontal scroll day cards */}
      <div className="flex justify-center flex-wrap gap-2.5 sm:gap-3 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
        {days.map((d, i) => (
          <DayCard
            key={d.day}
            day={d}
            index={i}
            isBest={d.day === bestDay.day}
            goalMinutes={goalMinutes}
            dark={dark}
            textColor={textColor}
            onClick={() => onDayClick(d)}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Stat Card ──────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, iconColor, label, value, sublabel, dark, textColor }) {
  return (
    <motion.div
      variants={cardItemVariants}
      className="rounded-xl border p-4 sm:p-4.5"
      style={{
        backgroundColor: dark ? "#1c1c1e" : "#fafafa",
        borderColor: dark ? "#2e2e2e" : "#EDEAE1",
      }}
    >
      <div
        className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full mb-3"
        style={{ backgroundColor: `${iconColor}26` }}
      >
        <Icon size={17} style={{ color: iconColor }} />
      </div>
      <p className="text-[11.5px] sm:text-[12px] mb-1" style={{ color: dark ? "#9ca3af" : "#8A8577" }}>
        {label}
      </p>
      <p className="text-[16px] sm:text-[18px] font-bold leading-tight" style={{ color: textColor }}>
        {value}
      </p>
      {sublabel && (
        <p className="text-[11px] sm:text-[11.5px] mt-1" style={{ color: dark ? "#9ca3af" : "#8A8577" }}>
          {sublabel}
        </p>
      )}
    </motion.div>
  );
}

// ─── Practice Analysis Detail Page ──────────────────────────────────────────
export default function PracticeAnalysisDetail() {
  const { dark, textColor } = useTheme();
  const router = useRouter();
  const [range, setRange] = useState("Weekly");
  const [chartType, setChartType] = useState("bar");
  const [selectedDay, setSelectedDay] = useState(null);

  const data = DATA_BY_RANGE[range];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`w-full ${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`}
      style={{ backgroundColor: dark ? "#000000" : "#ffffff" }}
    >
      {/* Header */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex items-center gap-3 mb-5 sm:mb-6"
      >
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-colors hover:bg-black/5 cursor-pointer shrink-0"
          style={{ borderColor: dark ? "#333333" : "#EDEAE1" }}
        >
          <ChevronLeft size={19} style={{ color: textColor }} />
        </button>

        <div>
          <h2 className={typography.sectionSbHeading} style={{ color: textColor }}>
            Practice Analysis
          </h2>
          <p
            className="text-[13px] sm:text-[13.5px] mt-0.5"
            style={{ color: dark ? "#9ca3af" : "#8A8577" }}
          >
            Complete breakdown by type
          </p>
        </div>
      </motion.div>

      {/* Range tabs */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.05 }}
        className="mb-5 sm:mb-6"
      >
        <RangeTabs active={range} onChange={setRange} dark={dark} />
      </motion.div>

      {/* Chart card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={range}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border p-5 sm:p-6 mb-5 sm:mb-6"
          style={{
            backgroundColor: dark ? "#353535" : "#f5f5f5",
            borderColor: dark ? "#ffffff" : "#EDEAE1",
          }}
        >
          {/* Total time + sessions row */}
          <div className="flex items-center justify-between mb-5 sm:mb-6">
            <div className="flex items-center gap-6 sm:gap-8">
              <div>
                <p
                  className="text-[12px] sm:text-[12.5px] mb-1"
                  style={{ color: dark ? "#9ca3af" : "#8A8577" }}
                >
                  Total Practice Time
                </p>
                <p className="text-[24px] sm:text-[28px] font-bold leading-none" style={{ color: textColor }}>
                  {data.totalTime}
                </p>
              </div>
              <div>
                <p
                  className="text-[12px] sm:text-[12.5px] mb-1"
                  style={{ color: dark ? "#9ca3af" : "#8A8577" }}
                >
                  Sessions
                </p>
                <p className="text-[24px] sm:text-[28px] font-bold leading-none" style={{ color: textColor }}>
                  {data.sessions}
                </p>
              </div>
            </div>
            <ChartTypeToggle active={chartType} onChange={setChartType} dark={dark} />
          </div>

          <AnimatePresence mode="wait">
            {chartType === "bar" ? (
              <motion.div
                key="bar"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <BarChart data={data.chart} unit={data.unit} dark={dark} />
              </motion.div>
            ) : (
              <motion.div
                key="line"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <LineChartView data={data.chart} unit={data.unit} dark={dark} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Stat cards: Most Active Day / Most Relaxing Day / Goal Achieved / Longest Streak */}
      <motion.div
        variants={cardGridVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-6"
      >
        <StatCard
          icon={Sun}
          iconColor="#F5A524"
          label="Most Active Day"
          value={data.stats.mostActiveDay.label}
          sublabel={data.stats.mostActiveDay.value}
          dark={dark}
          textColor={textColor}
        />
        <StatCard
          icon={Moon}
          iconColor="#8A6FF0"
          label="Most Relaxing Day"
          value={data.stats.mostRelaxingDay.label}
          sublabel={data.stats.mostRelaxingDay.value}
          dark={dark}
          textColor={textColor}
        />
        <StatCard
          icon={Target}
          iconColor="#4CAF50"
          label="Weekly Goal"
          value={`${data.stats.goalAchieved.percent}%`}
          sublabel={data.stats.goalAchieved.label}
          dark={dark}
          textColor={textColor}
        />
        <StatCard
          icon={Flame}
          iconColor="#F26161"
          label="Longest Streak"
          value={`${data.stats.longestStreak.days} days`}
          dark={dark}
          textColor={textColor}
        />
      </motion.div>

      {/* Practice type breakdown */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
        className="mb-5 sm:mb-6"
      >
        <h3 className="text-[15px] sm:text-[16px] font-semibold mb-3 sm:mb-4" style={{ color: textColor }}>
          Practice Type Breakdown
        </h3>
        <motion.div
          variants={cardGridVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
        >
          {data.breakdown.map((item, i) => (
            <BreakdownCard key={item.id} item={item} dark={dark} textColor={textColor} index={i} />
          ))}
        </motion.div>
      </motion.div>

      {/* Previous 7 days: trend + videos completed */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.15 }}
      >
        <h3 className="text-[15px] sm:text-[16px] font-semibold mb-3 sm:mb-4" style={{ color: textColor }}>
          Previous 7 Days
        </h3>
        <WeeklyOverviewCard
          days={data.last7Days}
          videosCompleted={data.videosCompleted}
          dark={dark}
          textColor={textColor}
          onDayClick={setSelectedDay}
        />
      </motion.div>

      <DaySessionModal
        day={selectedDay}
        onClose={() => setSelectedDay(null)}
        dark={dark}
        textColor={textColor}
      />
    </motion.div>
  );
}