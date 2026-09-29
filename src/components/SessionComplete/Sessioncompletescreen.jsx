"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import { IMAGES } from "../../assets/assets";

// ─── Stat column with images ─────────────────────────────────
function StatColumn({ image, label, value, isLast, dark, textColor }) {
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
                className="text-[12px] md:text-[13px] lg:text-[18px] mb-1"
                style={{ color: dark ? "#c7c2f0" : "#4b5563" }}
            >
                {label}
            </p>
            <p
                className="text-[10px] md:text-[12px] lg:text-[17px] font-bold leading-snug"
                style={{ color: textColor }}
            >
                {value}
            </p>
        </div>
    );
}

// ─── Main component ────────────────────────────────────────────
export default function SessionCompleteScreen({
    image = IMAGES.mindful,
    duration = "20:00",
    sessionName = "Chakra Healing Meditation",
    date = "May 15, 2024",
    time = "10:30 AM",
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
                    {/* Session image */}
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="relative w-44 h-44 sm:w-158 sm:h-98 rounded-2xl overflow-hidden shadow-sm mb-6"
                    >
                        <Image
                            src={image}
                            alt={sessionName}
                            fill
                            sizes="192px"
                            className="object-cover"
                        />
                    </motion.div>

                    {/* Heading */}
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className={typography.sectionHeading}
                        style={{ color: "#9A85FE" }}
                    >
                        Session Complete!
                    </motion.h2>

                    {/* Subtext */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="text-[14px] sm:text-[25px] leading-relaxed mb-6 max-w-lg"
                        style={{ color: dark ? "#d1d5db" : "#374151" }}
                    >
                        Great job! You have taken a mindful step towards your well-being.
                    </motion.p>

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
                            label="Duration"
                            value={duration}
                            dark={dark}
                            textColor={textColor}
                        />
                        <StatColumn
                            image={IMAGES.Flower}
                            label="Session"
                            value={sessionName}
                            dark={dark}
                            textColor={textColor}
                        />
                        <StatColumn
                            image={IMAGES.calendar}
                            label="Date"
                            value={
                                <>
                                    {date}
                                    <br />
                                    {time}
                                </>
                            }
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