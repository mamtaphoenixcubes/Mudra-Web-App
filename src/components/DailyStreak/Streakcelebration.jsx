"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import { IMAGES } from "../../assets/assets";

const WEEK_DAYS = [
    { id: "mon", label: "Mon", completed: true },
    { id: "tue", label: "Tue", completed: true },
    { id: "wed", label: "Wed", completed: true },
    { id: "thu", label: "Thu", completed: true },
    { id: "fri", label: "Fri", completed: true },
    { id: "sat", label: "Sat", completed: true },
    { id: "sun", label: "Sun", completed: true },
];

export default function StreakCelebration({
    image = IMAGES.Discover,
    streakDays = 7,
    totalSessions = 14,
    week = WEEK_DAYS,
}) {
    const { dark, textColor } = useTheme();

    return (
        <div
            className={`w-full max-w-7xl mx-auto ${spacing.sectionPaddingY} px-4 flex flex-col items-center text-center`}
            style={{ backgroundColor: dark ? "#020202" : "#ffffff" }}
        >
            {/* Image - Using arbitrary values for exact sizes */}
            <div className="relative w-[280px] h-40 sm:w-[620px] sm:h-74 rounded-2xl overflow-hidden mb-5">
                <Image
                    src={image}
                    alt="Streak celebration"
                    fill
                    sizes="(max-width: 640px) 280px, 620px"
                    className="object-cover"
                />
            </div>

            {/* Heading */}
            <h2
                className={`${typography.sectionSbHeading} mb-2`}
                style={{ color: "var(--primary)" }}
            >
                Amazing Streak!
            </h2>

            {/* Subtext */}
            <p
                className="text-[14px] sm:text-[25px] leading-relaxed mb-6"
                style={{ color: dark ? "#d1d5db" : "#374151" }}
            >
                You're building a beautiful habit.
                <br />
                Keep going!
            </p>

            {/* Stats card */}
            <div
                className="w-full rounded-2xl border"
                style={{
                    backgroundColor: dark ? "#1c1c1e" : "#f3f3f4",
                    borderColor: dark ? "#333333" : "#e5e5e5",
                }}
            >
                {/* Streak count */}
                <div className="px-5 sm:px-6 py-5 sm:py-6">
                    <p
                        className="text-[13.5px] sm:text-[14px] mb-2"
                        style={{ color: dark ? "#9ca3af" : "#4b5563" }}
                    >
                        You've maintained your streak for
                    </p>
                    <p
                        className="text-[40px] sm:text-[44px] font-bold leading-none mb-2"
                        style={{ color: dark ? "#f3f4f6" : "#111827" }}
                    >
                        {streakDays}
                    </p>
                    <p
                        className="text-[13.5px] sm:text-[14px]"
                        style={{ color: dark ? "#9ca3af" : "#4b5563" }}
                    >
                        Days in a row!
                    </p>
                </div>

                <div style={{ borderTop: `1px solid ${dark ? "#333333" : "#e5e5e5"}` }} />

                {/* Week row */}
                <div className="px-4 sm:px-6 py-5 sm:py-6 flex items-start justify-between">
                    {week.map((day) => (
                        <div key={day.id} className="flex flex-col items-center gap-2">
                            <span
                                className="text-[11.5px] sm:text-[12.5px] font-medium"
                                style={{ color: dark ? "#9ca3af" : "#4b5563" }}
                            >
                                {day.label}
                            </span>
                            <div
                                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center"
                                style={{
                                    borderColor: day.completed
                                        ? dark
                                            ? "#9ca3af"
                                            : "#374151"
                                        : dark
                                        ? "#4b5563"
                                        : "#d1d5db",
                                }}
                            >
                                {day.completed && (
                                    <Check
                                        size={13}
                                        strokeWidth={2.2}
                                        style={{ color: dark ? "#e5e7eb" : "#1f2937" }}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ borderTop: `1px solid ${dark ? "#333333" : "#e5e5e5"}` }} />

                {/* Total sessions */}
                <div className="px-5 sm:px-6 py-5 sm:py-6">
                    <p
                        className="text-[13.5px] sm:text-[14px] mb-2"
                        style={{ color: dark ? "#9ca3af" : "#4b5563" }}
                    >
                        Total Sessions Completed
                    </p>
                    <p
                        className="text-[40px] sm:text-[44px] font-bold leading-none mb-2"
                        style={{ color: dark ? "#f3f4f6" : "#111827" }}
                    >
                        {totalSessions}
                    </p>
                    <p
                        className="text-[13.5px] sm:text-[14px]"
                        style={{ color: dark ? "#9ca3af" : "#4b5563" }}
                    >
                        Sessions
                    </p>
                </div>
            </div>
        </div>
    );
}