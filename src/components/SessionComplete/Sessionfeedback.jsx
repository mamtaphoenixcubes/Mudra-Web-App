"use client";

import { useState } from "react";
import { Laugh, Smile, Meh, Frown, Angry, Clock, Heart, Activity } from "lucide-react";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import axios from "axios";
// ─── Data ─────────────────────────────────────────────────────
const MOODS = [
    { id: "amazing", label: "Amazing", icon: Laugh },
    { id: "good", label: "Good", icon: Smile },
    { id: "okay", label: "Okay", icon: Meh },
    { id: "not-good", label: "Not Good", icon: Frown },
    { id: "bad", label: "Bad", icon: Angry },
];

const MOOD_TO_RATING = {
    amazing: "AMAZING",
    good: "GOOD",
    okay: "OKAY",
    "not-good": "NOT_GOOD",
    bad: "BAD",
};

const INSIGHTS = [
    { id: "time", icon: Clock, label: "Time Spent", value: "20:00" },
    { id: "heart", icon: Heart, label: "Average Heart Rate", value: "72 bpm" },
    { id: "breathing", icon: Activity, label: "Breathing Rate", value: "12 breaths/min" },
];

// ─── Mood button ────────────────────────────────────────────────
function MoodButton({ mood, selected, onSelect, dark, submitting }) {
    const Icon = mood.icon;
    const isSelected = selected === mood.id;

    return (
        <motion.button
            type="button"
            onClick={() => onSelect(mood.id)}
            disabled={submitting}
            className="flex flex-col items-center gap-1.5 cursor-pointer group flex-1"
            whileHover={!submitting ? { scale: 1.05 } : {}}
            whileTap={!submitting ? { scale: 0.95 } : {}}
        >
            <div
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all duration-200"
                style={{
                    borderColor: isSelected
                        ? "var(--primary)"
                        : dark
                            ? "#4b5563"
                            : "#d1d5db",

                    borderWidth: isSelected ? "2px" : "1px",

                    backgroundColor: isSelected
                        ? dark
                            ? "rgba(154,133,254,0.15)"
                            : "var(--balanced-card)"
                        : "transparent",

                    opacity: submitting ? 0.6 : 1,
                }}
            >
                <Icon
                    size={20}
                    strokeWidth={1.6}
                    style={{
                        color: isSelected
                            ? "var(--primary)"
                            : dark
                                ? "#9ca3af"
                                : "#374151",
                    }}
                />
            </div>

            <span
                className="text-[10px] sm:text-[11px] font-medium"
                style={{
                    color: isSelected
                        ? "var(--primary)"
                        : dark
                            ? "#9ca3af"
                            : "#4b5563",
                }}
            >
                {mood.label}
            </span>
        </motion.button>
    );
}

// ─── Insight row ────────────────────────────────────────────────
function InsightRow({ insight, isLast, dark }) {
    const Icon = insight.icon;

    return (
        <div
            className="flex items-center justify-between py-4 px-5 sm:px-6"
            style={{
                borderBottom: isLast ? "none" : `1px solid ${dark ? "#374151" : "#e5e7eb"}`,
            }}
        >
            <div className="flex items-center gap-3">
                <Icon size={18} strokeWidth={1.6} style={{ color: dark ? "#d1d5db" : "#374151" }} />
                <span
                    className="text-[14px] sm:text-[15px]"
                    style={{ color: dark ? "#e5e7eb" : "#1f2937" }}
                >
                    {insight.label}
                </span>
            </div>
            <span
                className="text-[14px] sm:text-[15px] font-semibold"
                style={{ color: dark ? "#f3f4f6" : "#111827" }}
            >
                {insight.value}
            </span>
        </div>
    );
}

// ─── Main component ────────────────────────────────────────────
export default function SessionFeedback({
    timeSpent = "20:00",
    avgHeartRate = "72 bpm",
    breathingRate = "12 breaths/min",
    onMoodSelect,
    sessionType: propSessionType,
}) {
    const { dark, textColor } = useTheme();

    const searchParams = useSearchParams();

    const sessionType =
        propSessionType ||
        searchParams.get("type") ||
        searchParams.get("sessionType") ||
        "yoga mudra";
    const activityId = searchParams.get("activityDocumentId");

    const [selectedMood, setSelectedMood] = useState(null);
    const [submittingFeedback, setSubmittingFeedback] = useState(false);
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

    const handleSelect = async (id) => {
        if (submittingFeedback || feedbackSubmitted) {
            return;
        }

        if (!activityId) {
            console.error("Activity ID is missing");
            return;
        }

        setSelectedMood(id);
        onMoodSelect?.(id);

        try {
            setSubmittingFeedback(true);

            const rating = MOOD_TO_RATING[id];
            const normalizedSessionType = String(sessionType || "").toLowerCase();
            const isYogaMudra = normalizedSessionType.includes("mudra") && !normalizedSessionType.includes("nidra");

            const feedbackUrl = isYogaMudra
                ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/user-mudra-activities/${activityId}/feedback`
                : `${process.env.NEXT_PUBLIC_API_BASE_URL}/user-yoga-nidra-activities/${activityId}/feedback`;

            await axios.post(feedbackUrl, {
                experienceRating: rating,
            });

            setFeedbackSubmitted(true);
        } catch (error) {
            console.error(
                "FEEDBACK_SUBMIT_ERROR",
                error.response?.data || error.message
            );
        } finally {
            setSubmittingFeedback(false);
        }
    };

    const insights = [
        { ...INSIGHTS[0], value: timeSpent },
        { ...INSIGHTS[1], value: avgHeartRate },
        { ...INSIGHTS[2], value: breathingRate },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`w-full ${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`}
            style={{ backgroundColor: dark ? "#020202" : "#ffffff" }}
        >
            <div className={spacing.maxW.sectionBody}>

                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-center mb-6 sm:mb-7"
                >
                    <h2
                        className={typography.sectionSbHeading}
                        style={{ color: textColor }}
                    >
                        How do you feel?
                    </h2>

                    <p
                        className="text-[14px] sm:text-[15px] mt-1"
                        style={{ color: dark ? "#9ca3af" : "#6b7280" }}
                    >
                        {feedbackSubmitted
                            ? "Thank you for sharing your thoughts"
                            : "Rate your experience"}
                    </p>
                </motion.div>

                {feedbackSubmitted ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-6 mb-8"
                    >
                        <div
                            className="w-14 h-14 rounded-full border-2 flex items-center justify-center mb-3"
                            style={{
                                borderColor: "var(--primary)",
                            }}
                        >
                            <span
                                className="text-2xl"
                                style={{ color: "var(--primary)" }}
                            >
                                ✓
                            </span>
                        </div>

                        <h3
                            className="text-base font-semibold"
                            style={{ color: "var(--primary)" }}
                        >
                            Feedback submitted
                        </h3>

                        <p
                            className="text-sm mt-1"
                            style={{
                                color: dark ? "#9ca3af" : "#6b7280",
                            }}
                        >
                            Thank you for sharing your thoughts
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className="flex items-start justify-between gap-1 sm:gap-1 mb-6 sm:mb-8"
                    >
                        {MOODS.map((mood) => (
                            <MoodButton
                                key={mood.id}
                                mood={mood}
                                selected={selectedMood}
                                onSelect={handleSelect}
                                dark={dark}
                                submitting={submittingFeedback}
                            />
                        ))}
                    </motion.div>
                )}

                {/* Session insights card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="rounded-2xl overflow-hidden"
                    style={{
                        backgroundColor: dark ? "#1c1c1e" : "#f3f4f6",
                    }}
                >
                    <h3
                        className="text-[15px] sm:text-base font-semibold px-5 sm:px-6 pt-5 pb-3"
                        style={{
                            color: dark ? "#f3f4f6" : "#111827",
                        }}
                    >
                        Your Session Insights
                    </h3>

                    {insights.map((insight, i) => (
                        <InsightRow
                            key={insight.id}
                            insight={insight}
                            isLast={i === insights.length - 1}
                            dark={dark}
                        />
                    ))}
                </motion.div>

            </div>
        </motion.div>
    );
}