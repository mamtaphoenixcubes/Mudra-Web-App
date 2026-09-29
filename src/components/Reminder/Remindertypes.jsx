"use client";

import { useState } from "react";
import { Clock, Repeat, ChevronRight, X, Check, Plus } from "lucide-react";
import Image from "next/image";
import { spacing, typography, btn, form, card } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import { IMAGES } from "../../assets/assets";
import { motion, AnimatePresence } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────
const INITIAL_REMINDERS = [
    {
        id: "practice",
        title: "Practice Reminder",
        description: "Reminds you to practice Mudras, Yoga Nidra and other sessions.",
        icon: IMAGES.Energy,
        enabled: true,
        time: "7:00 AM",
        repeat: "Daily",
    },
    {
        id: "bedtime",
        title: "Bedtime Reminder",
        description: "Reminds you to wind down and prepare for better sleep.",
        icon: IMAGES.SleepBetter,
        enabled: true,
        time: "10:00 PM",
        repeat: "Daily",
    },
    {
        id: "hydration",
        title: "Hydration Reminder",
        description: "Reminds you to stay hydrated throughout the day.",
        icon: IMAGES.Water,
        enabled: true,
        time: "12:00 PM",
        repeat: "Daily",
    },
];

// ─── Icon component using Next.js Image ─────────────────────
function ReminderIcon({ src, alt }) {
    return (
        <Image
            src={src}
            alt={alt}
            width={20}
            height={20}
            className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
            style={{
                filter: "brightness(0) saturate(100%) invert(47%) sepia(76%) saturate(1236%) hue-rotate(222deg) brightness(96%) contrast(92%)"
            }}
        />
    );
}

// ─── Toggle switch with animation ────────────────────────────
function Toggle({ checked, onChange, label }) {
    return (
        <motion.button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label}
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-6 w-11 sm:h-7 sm:w-12 shrink-0 items-center rounded-full transition-colors duration-200 cursor-pointer
        ${checked ? "bg-[#7B5EA7]" : "bg-gray-300"}`}
            whileTap={{ scale: 0.95 }}
        >
            <motion.span
                className={`inline-block h-4 w-4 sm:h-5 sm:w-5 transform rounded-full bg-white shadow-md`}
                animate={{
                    x: checked ? 18 : 3,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
        </motion.button>
    );
}

// ─── Time Picker Modal (Redesigned with better mobile padding) ──
function TimePickerModal({ isOpen, onClose, currentTime, onSave, dark }) {
    const [hours, setHours] = useState(currentTime.split(" ")[0].split(":")[0]);
    const [minutes, setMinutes] = useState(currentTime.split(" ")[0].split(":")[1]);
    const [period, setPeriod] = useState(currentTime.split(" ")[1] || "AM");

    const handleSave = () => {
        const formattedTime = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')} ${period}`;
        onSave(formattedTime);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 30 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 max-w-md w-full mx-auto flex items-end sm:items-center"
                    >
                        <div
                            className={`w-full rounded-t-3xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden ${card.default}`}
                            style={{
                                backgroundColor: dark ? "#1f2937" : "#ffffff",
                                border: dark ? "1px solid #374151" : "1px solid #f0ece6",
                            }}
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center mb-4 sm:mb-6">
                                <div>
                                    <h3 className={`text-lg sm:text-xl font-bold ${typography.sectionSbHeading}`} style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>
                                        Select Time
                                    </h3>
                                    <p className="text-xs sm:text-sm mt-0.5" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
                                        Choose your reminder time
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-1.5 sm:p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                                >
                                    <X size={18} style={{ color: dark ? "#9ca3af" : "#6b7280" }} />
                                </button>
                            </div>

                            {/* Time Display */}
                            <div className="flex justify-center items-center mb-4 sm:mb-6">
                                <div
                                    className="flex items-center gap-0.5 sm:gap-1 px-3 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-opacity-50 w-full max-w-[280px] sm:max-w-none justify-center"
                                    style={{
                                        backgroundColor: dark ? "rgba(55, 65, 81, 0.5)" : "rgba(249, 250, 251, 0.8)",
                                        border: dark ? "1px solid #374151" : "1px solid #f0ece6",
                                    }}
                                >
                                    <span className="text-2xl sm:text-4xl font-bold" style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>
                                        {hours}
                                    </span>
                                    <span className="text-2xl sm:text-4xl font-light mx-0.5 sm:mx-1" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>
                                        :
                                    </span>
                                    <span className="text-2xl sm:text-4xl font-bold" style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>
                                        {minutes}
                                    </span>
                                    <span className="text-base sm:text-xl font-medium ml-1.5 sm:ml-3" style={{ color: "#7B5EA7" }}>
                                        {period}
                                    </span>
                                </div>
                            </div>

                            {/* Picker Columns */}
                            <div className="flex justify-center items-start gap-1.5 sm:gap-3 mb-4 sm:mb-6">
                                {/* Hours */}
                                <div className="flex-1 min-w-0">
                                    <div className="text-center text-[10px] sm:text-xs font-medium uppercase tracking-wider mb-1.5 sm:mb-3" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
                                        Hour
                                    </div>
                                    <div className="h-32 sm:h-48 overflow-y-auto scrollbar-hide flex flex-col items-center gap-1 sm:gap-1.5">
                                        {["12", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"].map((h) => (
                                            <motion.button
                                                key={h}
                                                onClick={() => setHours(h)}
                                                className={`w-full max-w-[44px] sm:max-w-[60px] py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                                                    hours === h
                                                        ? "bg-[#7B5EA7] text-white shadow-lg shadow-[#7B5EA7]/30 scale-105"
                                                        : dark
                                                            ? "hover:bg-gray-700 text-gray-300"
                                                            : "hover:bg-gray-100 text-gray-700"
                                                }`}
                                                whileHover={{ scale: hours === h ? 1.05 : 1.03 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {h}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Minutes */}
                                <div className="flex-1 min-w-0">
                                    <div className="text-center text-[10px] sm:text-xs font-medium uppercase tracking-wider mb-1.5 sm:mb-3" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
                                        Minute
                                    </div>
                                    <div className="h-32 sm:h-48 overflow-y-auto scrollbar-hide flex flex-col items-center gap-1 sm:gap-1.5">
                                        {["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"].map((m) => (
                                            <motion.button
                                                key={m}
                                                onClick={() => setMinutes(m)}
                                                className={`w-full max-w-[44px] sm:max-w-[60px] py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                                                    minutes === m
                                                        ? "bg-[#7B5EA7] text-white shadow-lg shadow-[#7B5EA7]/30 scale-105"
                                                        : dark
                                                            ? "hover:bg-gray-700 text-gray-300"
                                                            : "hover:bg-gray-100 text-gray-700"
                                                }`}
                                                whileHover={{ scale: minutes === m ? 1.05 : 1.03 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {m}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Period */}
                                <div className="flex-1 min-w-0">
                                    <div className="text-center text-[10px] sm:text-xs font-medium uppercase tracking-wider mb-1.5 sm:mb-3" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
                                        Period
                                    </div>
                                    <div className="flex flex-col items-center gap-1 sm:gap-1.5">
                                        {["AM", "PM"].map((p) => (
                                            <motion.button
                                                key={p}
                                                onClick={() => setPeriod(p)}
                                                className={`w-full max-w-[44px] sm:max-w-[60px] py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                                                    period === p
                                                        ? "bg-[#7B5EA7] text-white shadow-lg shadow-[#7B5EA7]/30 scale-105"
                                                        : dark
                                                            ? "hover:bg-gray-700 text-gray-300"
                                                            : "hover:bg-gray-100 text-gray-700"
                                                }`}
                                                whileHover={{ scale: period === p ? 1.05 : 1.03 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {p}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 sm:gap-3 mt-1 sm:mt-2">
                                <motion.button
                                    onClick={onClose}
                                    className={`flex-1 py-2 sm:py-3.5 rounded-xl sm:rounded-2xl font-semibold text-xs sm:text-base transition-all duration-200 ${btn.outline}`}
                                    style={{
                                        backgroundColor: dark ? "#374151" : "#f3f4f6",
                                        color: dark ? "#e5e7eb" : "#1f2937",
                                    }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    onClick={handleSave}
                                    className={`flex-1 py-2 sm:py-3.5 rounded-xl sm:rounded-2xl font-semibold text-xs sm:text-base text-white transition-all duration-200 ${btn.primary}`}
                                    style={{
                                        backgroundColor: "#7B5EA7",
                                        boxShadow: "0 4px 14px rgba(123, 94, 167, 0.25)"
                                    }}
                                    whileHover={{ scale: 1.02, backgroundColor: "#6a4f96" }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Save
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// ─── Repeat Picker Modal (Redesigned with better mobile padding) ──
function RepeatPickerModal({ isOpen, onClose, currentRepeat, onSave, dark }) {
    const repeatOptions = ["Daily", "Weekly", "Biweekly", "Monthly", "Yearly"];
    const [selected, setSelected] = useState(currentRepeat);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 30 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 max-w-md w-full mx-auto flex items-end sm:items-center"
                    >
                        <div
                            className={`w-full rounded-t-3xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden ${card.default}`}
                            style={{
                                backgroundColor: dark ? "#1f2937" : "#ffffff",
                                border: dark ? "1px solid #374151" : "1px solid #f0ece6",
                            }}
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center mb-4 sm:mb-6">
                                <div>
                                    <h3 className={`text-lg sm:text-xl font-bold ${typography.sectionSbHeading}`} style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>
                                        Repeat Frequency
                                    </h3>
                                    <p className="text-xs sm:text-sm mt-0.5" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
                                        Choose how often to repeat
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-1.5 sm:p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                                >
                                    <X size={18} style={{ color: dark ? "#9ca3af" : "#6b7280" }} />
                                </button>
                            </div>

                            {/* Options */}
                            <div className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-6">
                                {repeatOptions.map((option) => (
                                    <motion.button
                                        key={option}
                                        onClick={() => setSelected(option)}
                                        className={`w-full flex items-center justify-between p-3 sm:p-4 rounded-xl transition-all duration-200 ${
                                            selected === option
                                                ? "bg-[#7B5EA7]/10 border-2 border-[#7B5EA7]"
                                                : dark
                                                    ? "hover:bg-gray-700 border-2 border-transparent"
                                                    : "hover:bg-gray-50 border-2 border-transparent"
                                        }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span className={`text-sm sm:text-base font-medium ${typography.sectionMb}`} style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>
                                            {option}
                                        </span>
                                        {selected === option && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#7B5EA7] flex items-center justify-center"
                                            >
                                                <Check size={12} className="text-white" />
                                            </motion.div>
                                        )}
                                    </motion.button>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 sm:gap-3">
                                <motion.button
                                    onClick={onClose}
                                    className={`flex-1 py-2 sm:py-3.5 rounded-xl sm:rounded-2xl font-semibold text-xs sm:text-base transition-all duration-200 ${btn.outline}`}
                                    style={{
                                        backgroundColor: dark ? "#374151" : "#f3f4f6",
                                        color: dark ? "#e5e7eb" : "#1f2937",
                                    }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    onClick={() => {
                                        onSave(selected);
                                        onClose();
                                    }}
                                    className={`flex-1 py-2 sm:py-3.5 rounded-xl sm:rounded-2xl font-semibold text-xs sm:text-base text-white transition-all duration-200 ${btn.primary}`}
                                    style={{
                                        backgroundColor: "#7B5EA7",
                                        boxShadow: "0 4px 14px rgba(123, 94, 167, 0.25)"
                                    }}
                                    whileHover={{ scale: 1.02, backgroundColor: "#6a4f96" }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Save
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// ─── Row: Reminder Time / Repeat ──────────────────────────────
function DetailRow({ icon: Icon, label, value, onClick, isLast, dark }) {
    return (
        <motion.button
            type="button"
            onClick={onClick}
            className={`w-full flex items-center justify-between py-3.5 sm:py-5 px-4 sm:px-6 text-left cursor-pointer
        group transition-all duration-300
        ${!isLast ? "border-b" : ""}`}
            style={{
                borderColor: dark ? "#374151" : "#f3f0ea",
                backgroundColor: "transparent",
                borderBottom: isLast ? "none" : `1px solid ${dark ? "#374151" : "#f3f0ea"}`,
            }}
            whileHover={{
                backgroundColor: dark ? "rgba(55, 65, 81, 0.3)" : "rgba(249, 250, 251, 0.6)",
                transition: { duration: 0.15 }
            }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Left side - Icon & Label */}
            <div className="flex items-center gap-3 sm:gap-4">
                <div
                    className="p-1.5 sm:p-2.5 rounded-xl transition-all duration-300 group-hover:scale-105"
                    style={{
                        backgroundColor: dark ? "rgba(123, 94, 167, 0.12)" : "rgba(123, 94, 167, 0.06)",
                    }}
                >
                    <Icon size={15} className="sm:w-[19px] sm:h-[19px]" strokeWidth={2} style={{ color: "#7B5EA7" }} />
                </div>
                <div className="flex flex-col items-start">
                    <span className={`text-[12px] sm:text-[15px] font-medium ${typography.sectionMb}`} style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>
                        {label}
                    </span>
                    <span className="text-[9px] sm:text-[12px] opacity-60" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
                        Tap to change
                    </span>
                </div>
            </div>

            {/* Right side - Value & Chevron */}
            <div className="flex items-center gap-2 sm:gap-3">
                <div
                    className="relative px-2.5 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl border transition-all duration-300 group-hover:border-[#7B5EA7] group-hover:shadow-sm"
                    style={{
                        backgroundColor: dark ? "rgba(55, 65, 81, 0.5)" : "rgba(255, 255, 255, 0.8)",
                        borderColor: dark ? "#4b5563" : "#e5e7eb",
                    }}
                >
                    <span
                        className={`text-[10px] sm:text-[14px] font-medium ${typography.sectionMb}`}
                        style={{ color: dark ? "#e5e7eb" : "#1f2937" }}
                    >
                        {value}
                    </span>
                </div>

                <motion.div
                    className="p-1 sm:p-1.5 rounded-full transition-all duration-300 group-hover:bg-[#7B5EA7]/10"
                    style={{
                        backgroundColor: dark ? "rgba(55, 65, 81, 0.4)" : "rgba(243, 244, 246, 0.6)",
                    }}
                    whileHover={{ x: 2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                    <ChevronRight
                        size={14}
                        className="sm:w-[16px] sm:h-[16px] transition-transform duration-300 group-hover:translate-x-0.5"
                        style={{ color: dark ? "#9ca3af" : "#6b7280" }}
                    />
                </motion.div>
            </div>
        </motion.button>
    );
}

// ─── Reminder card ─────────────────────────────────────────────
function ReminderCard({ reminder, onToggle, onEditTime, onEditRepeat, dark, textColor }) {
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [showRepeatPicker, setShowRepeatPicker] = useState(false);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`rounded-2xl border overflow-hidden shadow-sm ${card.default}`}
                style={{
                    backgroundColor: dark ? "#1f2937" : "#ffffff",
                    borderColor: dark ? "#374151" : "#E9E3D6",
                }}
            >
                {/* Header */}
                <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6">
                    <motion.div
                        className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl border flex items-center justify-center shrink-0 ${card.iconBox}`}
                        style={{
                            backgroundColor: dark ? "#374151" : "#F5F0FF",
                            borderColor: dark ? "#4b5563" : "#E8E0F0",
                        }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <ReminderIcon src={reminder.icon} alt={reminder.title} />
                    </motion.div>

                    <div className="flex-1 min-w-0">
                        <h3 className={`text-[13px] sm:text-base font-semibold mb-0.5 sm:mb-1 ${typography.cardTitle}`} style={{ color: textColor }}>
                            {reminder.title}
                        </h3>
                        <p className={`text-[10px] sm:text-sm leading-relaxed ${typography.solutionBody}`} style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
                            {reminder.description}
                        </p>
                    </div>

                    <Toggle
                        checked={reminder.enabled}
                        onChange={(val) => onToggle(reminder.id, val)}
                        label={`Toggle ${reminder.title}`}
                    />
                </div>

                {/* Detail rows — only shown while enabled */}
                <AnimatePresence>
                    {reminder.enabled && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border-t overflow-hidden"
                            style={{ borderColor: dark ? "#374151" : "#E9E3D6" }}
                        >
                            <DetailRow
                                icon={Clock}
                                label="Reminder Time"
                                value={reminder.time}
                                onClick={() => setShowTimePicker(true)}
                                dark={dark}
                            />
                            <DetailRow
                                icon={Repeat}
                                label="Repeat"
                                value={reminder.repeat}
                                onClick={() => setShowRepeatPicker(true)}
                                isLast
                                dark={dark}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Modals */}
            <TimePickerModal
                isOpen={showTimePicker}
                onClose={() => setShowTimePicker(false)}
                currentTime={reminder.time}
                onSave={(newTime) => onEditTime(reminder.id, newTime)}
                dark={dark}
            />
            <RepeatPickerModal
                isOpen={showRepeatPicker}
                onClose={() => setShowRepeatPicker(false)}
                currentRepeat={reminder.repeat}
                onSave={(newRepeat) => onEditRepeat(reminder.id, newRepeat)}
                dark={dark}
            />
        </>
    );
}

// ─── Add Reminder Modal ──────────────────────────────────────────
function AddReminderModal({ isOpen, onClose, onAdd, dark, textColor }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [time, setTime] = useState("8:00 AM");
    const [repeat, setRepeat] = useState("Daily");
    const [selectedIcon, setSelectedIcon] = useState(IMAGES.Energy);

    const iconOptions = [
        { id: "energy", src: IMAGES.Energy, label: "Energy" },
        { id: "sleep", src: IMAGES.SleepBetter, label: "Sleep" },
        { id: "water", src: IMAGES.Water, label: "Water" },
        { id: "meditation", src: IMAGES.Meditation, label: "Meditation" },
    ];

    const handleSubmit = () => {
        if (!title.trim() || !description.trim()) return;

        const newReminder = {
            id: Date.now().toString(),
            title: title.trim(),
            description: description.trim(),
            icon: selectedIcon,
            enabled: true,
            time: time,
            repeat: repeat,
        };

        onAdd(newReminder);
        onClose();
        // Reset form
        setTitle("");
        setDescription("");
        setTime("8:00 AM");
        setRepeat("Daily");
        setSelectedIcon(IMAGES.Energy);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 30 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 max-w-md w-full mx-auto flex items-end sm:items-center"
                    >
                        <div
                            className={`w-full rounded-t-3xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl overflow-y-auto max-h-[90vh] ${card.default}`}
                            style={{
                                backgroundColor: dark ? "#1f2937" : "#ffffff",
                                border: dark ? "1px solid #374151" : "1px solid #f0ece6",
                            }}
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center mb-4 sm:mb-6">
                                <div>
                                    <h3 className={`text-lg sm:text-xl font-bold ${typography.sectionSbHeading}`} style={{ color: textColor }}>
                                        Add New Reminder
                                    </h3>
                                    <p className="text-xs sm:text-sm mt-0.5" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
                                        Create a custom reminder
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-1.5 sm:p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                                >
                                    <X size={18} style={{ color: dark ? "#9ca3af" : "#6b7280" }} />
                                </button>
                            </div>

                            {/* Form */}
                            <div className="space-y-4 sm:space-y-5">
                                {/* Title */}
                                <div>
                                    <label className={`block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 ${typography.sectionMb}`} style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>
                                        Reminder Title
                                    </label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="e.g., Morning Meditation"
                                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#7B5EA7]/40 ${form.input}`}
                                        style={{
                                            backgroundColor: dark ? "#374151" : "#ffffff",
                                            borderColor: dark ? "#4b5563" : "#e5e7eb",
                                            color: dark ? "#e5e7eb" : "#1f2937",
                                        }}
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className={`block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 ${typography.sectionMb}`} style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>
                                        Description
                                    </label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="What does this reminder do?"
                                        rows={2}
                                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#7B5EA7]/40 resize-none ${form.input}`}
                                        style={{
                                            backgroundColor: dark ? "#374151" : "#ffffff",
                                            borderColor: dark ? "#4b5563" : "#e5e7eb",
                                            color: dark ? "#e5e7eb" : "#1f2937",
                                        }}
                                    />
                                </div>

                                {/* Icon Selection */}
                                <div>
                                    <label className={`block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 ${typography.sectionMb}`} style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>
                                        Choose Icon
                                    </label>
                                    <div className="grid grid-cols-4 gap-2 sm:gap-3">
                                        {iconOptions.map((icon) => (
                                            <motion.button
                                                key={icon.id}
                                                onClick={() => setSelectedIcon(icon.src)}
                                                className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-1.5 ${
                                                    selectedIcon === icon.src
                                                        ? "border-[#7B5EA7] bg-[#7B5EA7]/10"
                                                        : dark
                                                            ? "border-gray-600 hover:border-gray-500"
                                                            : "border-gray-200 hover:border-gray-300"
                                                }`}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <div className="w-6 h-6 sm:w-8 sm:h-8 relative">
                                                    <Image
                                                        src={icon.src}
                                                        alt={icon.label}
                                                        width={32}
                                                        height={32}
                                                        className="w-full h-full object-contain"
                                                        style={{
                                                            filter: "brightness(0) saturate(100%) invert(47%) sepia(76%) saturate(1236%) hue-rotate(222deg) brightness(96%) contrast(92%)"
                                                        }}
                                                    />
                                                </div>
                                                <span className="text-[8px] sm:text-[10px] font-medium" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
                                                    {icon.label}
                                                </span>
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Time & Repeat in row */}
                                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <label className={`block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 ${typography.sectionMb}`} style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>
                                            Time
                                        </label>
                                        <input
                                            type="text"
                                            value={time}
                                            onChange={(e) => setTime(e.target.value)}
                                            placeholder="9:00 AM"
                                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#7B5EA7]/40 ${form.input}`}
                                            style={{
                                                backgroundColor: dark ? "#374151" : "#ffffff",
                                                borderColor: dark ? "#4b5563" : "#e5e7eb",
                                                color: dark ? "#e5e7eb" : "#1f2937",
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label className={`block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 ${typography.sectionMb}`} style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>
                                            Repeat
                                        </label>
                                        <select
                                            value={repeat}
                                            onChange={(e) => setRepeat(e.target.value)}
                                            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#7B5EA7]/40 ${form.input}`}
                                            style={{
                                                backgroundColor: dark ? "#374151" : "#ffffff",
                                                borderColor: dark ? "#4b5563" : "#e5e7eb",
                                                color: dark ? "#e5e7eb" : "#1f2937",
                                            }}
                                        >
                                            <option value="Daily">Daily</option>
                                            <option value="Weekly">Weekly</option>
                                            <option value="Biweekly">Biweekly</option>
                                            <option value="Monthly">Monthly</option>
                                            <option value="Yearly">Yearly</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 sm:gap-3 mt-5 sm:mt-6">
                                <motion.button
                                    onClick={onClose}
                                    className={`flex-1 py-2 sm:py-3.5 rounded-xl sm:rounded-2xl font-semibold text-xs sm:text-base transition-all duration-200 ${btn.outline}`}
                                    style={{
                                        backgroundColor: dark ? "#374151" : "#f3f4f6",
                                        color: dark ? "#e5e7eb" : "#1f2937",
                                    }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    onClick={handleSubmit}
                                    className={`flex-1 py-2 sm:py-3.5 rounded-xl sm:rounded-2xl font-semibold text-xs sm:text-base text-white transition-all duration-200 ${btn.primary}`}
                                    style={{
                                        backgroundColor: "#7B5EA7",
                                        boxShadow: "0 4px 14px rgba(123, 94, 167, 0.25)"
                                    }}
                                    whileHover={{ scale: 1.02, backgroundColor: "#6a4f96" }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Add Reminder
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// ─── Main component ────────────────────────────────────────────
export default function ReminderTypes() {
    const { dark, textColor } = useTheme();
    const [reminders, setReminders] = useState(INITIAL_REMINDERS);
    const [showAddModal, setShowAddModal] = useState(false);

    const handleToggle = (id, enabled) => {
        setReminders((prev) =>
            prev.map((r) => (r.id === id ? { ...r, enabled } : r))
        );
    };

    const handleEditTime = (id, newTime) => {
        setReminders((prev) =>
            prev.map((r) => (r.id === id ? { ...r, time: newTime } : r))
        );
    };

    const handleEditRepeat = (id, newRepeat) => {
        setReminders((prev) =>
            prev.map((r) => (r.id === id ? { ...r, repeat: newRepeat } : r))
        );
    };

    const handleAddReminder = (newReminder) => {
        setReminders((prev) => [...prev, newReminder]);
    };

    return (
        <div className={`w-full ${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`}
            style={{ backgroundColor: dark ? "#020202" : "#ffffff" }}>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
                <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${typography.playerHeading}`}
                    style={{ color: textColor }}
                >
                    Reminder Types
                </motion.h2>
                
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAddModal(true)}
                    className="p-2 sm:p-3 rounded-full bg-[#7B5EA7] text-white shadow-lg shadow-[#7B5EA7]/30 hover:shadow-[#7B5EA7]/50 transition-all duration-200"
                >
                    <Plus size={20} className="sm:w-6 sm:h-6" />
                </motion.button>
            </div>

            <div className="flex flex-col gap-3 sm:gap-5">
                {reminders.map((reminder, index) => (
                    <motion.div
                        key={reminder.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <ReminderCard
                            reminder={reminder}
                            onToggle={handleToggle}
                            onEditTime={handleEditTime}
                            onEditRepeat={handleEditRepeat}
                            dark={dark}
                            textColor={textColor}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Add Reminder Modal */}
            <AddReminderModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onAdd={handleAddReminder}
                dark={dark}
                textColor={textColor}
            />
        </div>
    );
}