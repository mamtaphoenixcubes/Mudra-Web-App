"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import { IMAGES } from "../../assets/assets";

// ─── Stat column with images ─────────────────────────────────
function StatColumn({ image, label, value, sublabel, isLast, dark, textColor }) {
    return (
        <div
            className="flex flex-col items-center text-center flex-1 px-3"
            style={{
                borderRight: isLast ? "none" : `1px solid ${dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)"}`,
            }}
        >
            <div className="w-11 h-11 sm:w-15 sm:h-15 rounded-full bg-white flex items-center justify-center shadow-sm mb-2.5">
                <div className="relative w-6 h-6 sm:w-9 sm:h-9">
                    <Image
                        src={image}
                        alt={label}
                        fill
                        sizes="28px"
                        className="object-contain"
                    />
                </div>
            </div>
            <p
                className="text-[10px] md:text-[11px] lg:text-[14px] mb-1 font-medium"
                style={{ color: dark ? "#c7c2f0" : "#4b5563" }}
            >
                {label}
            </p>
            <p
                className="text-[14px] md:text-[16px] lg:text-[22px] font-bold leading-snug"
                style={{ color: textColor }}
            >
                {value}
            </p>
            {sublabel && (
                <p
                    className="text-[9px] md:text-[10px] lg:text-[12px] mt-0.5"
                    style={{ color: dark ? "#9ca3af" : "#6b7280" }}
                >
                    {sublabel}
                </p>
            )}
        </div>
    );
}

// ─── Main component ────────────────────────────────────────────
export default function TimeDailyStreak({
    totalTime = "4h 32m",
    totalSessions = "14",
    currentStreak = "7 Days",
    bestStreak = "Best Streak",
    weekLabel = "This Week",
}) {
    const { dark, textColor } = useTheme();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`w-full ${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`}
            style={{ backgroundColor: dark ? "#020202" : "#ffffff" }}
        >
            <div className={spacing.maxW.sectionBody}>
                <div className="flex flex-col items-center text-center">
                    {/* Stats card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="w-full rounded-2xl px-4 sm:px-5 py-5 sm:py-6 flex items-start"
                        style={{ backgroundColor: dark ? "#2a2440" : "var(--holistic-bg)" }}
                    >
                        <StatColumn
                            image={IMAGES.Clock}
                            label="Total Time"
                            value={totalTime}
                            sublabel={weekLabel}
                            dark={dark}
                            textColor={textColor}
                        />
                        <StatColumn
                            image={IMAGES.Energy}
                            label="Session"
                            value={totalSessions}
                            sublabel={weekLabel}
                            dark={dark}
                            textColor={textColor}
                        />
                        <StatColumn
                            image={IMAGES.FireIcon}
                            label="Current Streak"
                            value={currentStreak}
                            sublabel={bestStreak}
                            isLast
                            dark={dark}
                            textColor={textColor}
                        />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}