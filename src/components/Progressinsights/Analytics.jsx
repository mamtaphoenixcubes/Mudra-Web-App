"use client";

import { useState, useRef, useMemo } from "react";
import { Sparkles, ChevronDown } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import { IMAGES } from "../../assets/assets";

// ─── Config ─────────────────────────────────────────────────────────────────
const TIME_RANGES = ["This Week", "This Month", "This Year", "All Time"];

const formatDurationLabel = (seconds = 0) => {
    const totalSeconds = Number(seconds) || 0;
    if (totalSeconds <= 0) return "0m";

    const totalMinutes = Math.round(totalSeconds / 60);
    if (totalMinutes < 60) return `${totalMinutes}m`;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (minutes === 0) return `${hours}h`;
    return `${hours}h ${minutes}m`;
};

const formatPercent = (value = 0) => {
    const numericValue = Number(value) || 0;
    return `${Math.abs(numericValue)}%`;
};

const buildAnalyticsStats = (analysis = {}, timeRange = "This Week") => {
    const analyticsData = analysis?.data ?? analysis ?? {};
    const averageSessionDuration = analyticsData.averageSessionDuration ?? {};
    const weeklyComparison = analyticsData.weeklyComparison ?? {};
    const goalCompletion = analyticsData.goalCompletion ?? {};

    const avgSessionSeconds = Number(averageSessionDuration.seconds ?? 0);
    const comparisonPercentage = Number(weeklyComparison.percentage ?? 0);
    const goalCurrent = Number(goalCompletion.current ?? 0);
    const goalTarget = Number(goalCompletion.target ?? 0);
    const isPositiveTrend = (weeklyComparison.trend ?? "UP") === "UP";

    return [
        {
            id: "avgSession",
            icon: "clock",
            value: formatDurationLabel(avgSessionSeconds),
            label: "Average Session Duration",
            imageIcon: IMAGES.Clock,
        },
        {
            id: "increase",
            icon: "image",
            value: formatPercent(comparisonPercentage),
            label: isPositiveTrend ? `Increase vs Last ${timeRange === "This Week" ? "Week" : timeRange}` : `Decrease vs Last ${timeRange === "This Week" ? "Week" : timeRange}`,
            imageIcon: IMAGES.ImprovedOutcomes,
        },
        {
            id: "goals",
            icon: "target",
            value: goalTarget > 0 ? `${goalCurrent} / ${goalTarget}` : "0 / 0",
            label: "Goals Completed",
            imageIcon: IMAGES.ImproveFocus,
        },
    ];
};

const DEFAULT_INSIGHT_TEXT = "Great progress! You're building a beautiful habit of self-care.";

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

const iconVariants = {
    hidden: { scale: 0, rotate: -30 },
    visible: {
        scale: 1,
        rotate: 0,
        transition: { duration: 0.5, type: "spring", stiffness: 200 },
    },
};

const bannerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { delay: 0.4, duration: 0.5 },
    },
};

// ─── Stat Item ──────────────────────────────────────────────────────────────
function StatItem({ stat, isLast, dark, textColor, index, isInView }) {
    return (
        <motion.div
            variants={statItemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover="hover"
            custom={index}
            className="flex flex-col items-center text-center flex-1 px-2 py-3"
            style={{
                borderRight: isLast ? "none" : `1px solid ${dark ? "#ffffff" : "#E9E3D6"}`,
            }}
        >
            <motion.span
                variants={iconVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="w-9 h-9 rounded-full flex items-center justify-center mb-2"
                style={{ backgroundColor: dark ? "#374151" : "#F0EEFB" }}
            >
                <Image
                    src={stat.imageIcon}
                    alt={stat.label}
                    width={20}
                    height={20}
                    style={{
                        filter: "brightness(0) saturate(100%) invert(47%) sepia(76%) saturate(1236%) hue-rotate(222deg) brightness(96%) contrast(92%)"
                    }}
                />
            </motion.span>
            <motion.p
                initial={{ scale: 0.5, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.4, type: "spring", stiffness: 200 }}
                className="text-[17px] sm:text-[19px] font-bold leading-none"
                style={{ color: textColor }}
            >
                {stat.value}
            </motion.p>
            <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                className="text-[10.5px] sm:text-[11px] leading-tight mt-1.5 max-w-[90px]"
                style={{ color: dark ? "#9ca3af" : "#8A8577" }}
            >
                {stat.label}
            </motion.p>
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
                className="text-[12px] sm:text-[13px] font-medium flex items-center gap-1"
                style={{ color: "#9A85FE" }}
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

// ─── Analytics ──────────────────────────────────────────────────────────────
export default function Analytics({ analysis, loading }) {
    const { dark, textColor } = useTheme();
    const [timeRange, setTimeRange] = useState("This Week");

    const stats = useMemo(() => buildAnalyticsStats(analysis, timeRange), [analysis, timeRange]);

    const insightText = useMemo(() => {
        const analyticsData = analysis?.data ?? analysis ?? {};
        const weeklyComparison = analyticsData.weeklyComparison ?? {};
        const trend = weeklyComparison.trend ?? "UP";
        const percentage = Number(weeklyComparison.percentage ?? 0);

        if (trend === "DOWN") {
            return `You are ${Math.abs(percentage)}% below last week. A few more sessions will bring you back on track.`;
        }

        if (trend === "UP") {
            return `Great progress! You are ${Math.abs(percentage)}% ahead of last week.`;
        }

        return DEFAULT_INSIGHT_TEXT;
    }, [analysis]);

    // Create ref for the component
    const analyticsRef = useRef(null);
    const statsCardRef = useRef(null);
    const bannerRef = useRef(null);

    // Check if sections are in view
    const analyticsInView = useInView(analyticsRef, { once: true, margin: "-50px" });
    const statsInView = useInView(statsCardRef, { once: true, margin: "-50px" });
    const bannerInView = useInView(bannerRef, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={analyticsRef}
            initial={{ opacity: 0 }}
            animate={analyticsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
            className={`${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`}
            style={{
                backgroundColor: dark ? "#000000" : "#ffffff",
                borderColor: dark ? "#0a0a0a" : "#EDEAE1",
            }}
        >
            {/* Header */}
            <motion.div
                variants={fadeUp}
                initial="hidden"
                animate={analyticsInView ? "visible" : "hidden"}
                className="flex items-center justify-between mb-4 sm:mb-5"
            >
                <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    animate={analyticsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="text-[14px] sm:text-[15px] font-semibold"
                    style={{ color: textColor }}
                >
                    3. Analytics
                </motion.h3>
                <TimeRangeDropdown
                    range={timeRange}
                    setRange={setTimeRange}
                    dark={dark}
                    textColor={textColor}
                />
            </motion.div>

            {/* Stats card */}
            <motion.div
                ref={statsCardRef}
                variants={cardVariants}
                initial="hidden"
                animate={statsInView ? "visible" : "hidden"}
                className="rounded-[20px] border px-4 sm:px-6 py-5 sm:py-6"
                style={{
                    backgroundColor: dark ? "#272626" : "#F7F6F3",
                    borderColor: dark ? "#374151" : "#EDEAE1",
                }}
            >
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate={statsInView ? "visible" : "hidden"}
                    className="flex flex-col sm:flex-row divide-y sm:divide-y-0 divide-solid"
                >
                    {(loading ? buildAnalyticsStats({}, timeRange) : stats).map((stat, i) => (
                        <StatItem
                            key={stat.id}
                            stat={stat}
                            isLast={i === stats.length - 1}
                            dark={dark}
                            textColor={textColor}
                            index={i}
                            isInView={statsInView}
                        />
                    ))}
                </motion.div>
            </motion.div>

            {/* Insight banner */}
            <motion.div
                ref={bannerRef}
                variants={bannerVariants}
                initial="hidden"
                animate={bannerInView ? "visible" : "hidden"}
                className="mt-4 sm:mt-5 rounded-[16px] px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
                style={{ backgroundColor: dark ? "rgba(154,133,254,0.15)" : "#E3DDFF" }}
            >
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={bannerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="flex items-center gap-3"
                >
                    <motion.span
                        initial={{ scale: 0, rotate: -30 }}
                        animate={bannerInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -30 }}
                        transition={{ delay: 0.6, duration: 0.5, type: "spring", stiffness: 200 }}
                        className="w-9 h-9 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: dark ? "rgba(154,133,254,0.2)" : "#fff" }}
                    >
                        <Sparkles size={18} style={{ color: "#9A85FE" }} strokeWidth={1.8} />
                    </motion.span>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={bannerInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.7, duration: 0.3 }}
                        className="text-[12px] sm:text-[13px] font-medium"
                        style={{ color: textColor }}
                    >
                        {loading ? "Loading your practice analytics..." : insightText}
                    </motion.p>
                </motion.div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={bannerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="shrink-0 bg-white rounded-full px-5 py-2.5 text-[12.5px] sm:text-[13.5px] font-medium shadow-sm hover:bg-white/90 transition-colors whitespace-nowrap cursor-pointer"
                    style={{ color: "#6b5bb0" }}
                >
                    Set New Goal
                </motion.button>
            </motion.div>
        </motion.div>
    );
}