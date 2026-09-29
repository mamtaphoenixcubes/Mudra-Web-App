"use client";

import { useState } from "react";
import { Volume2, Vibrate, Moon, Calendar, Info, ChevronRight, X, Check } from "lucide-react";
import { spacing, typography, card, btn } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

// ─── Toggle switch (same styling as ReminderTypes) ───────────
function Toggle({ checked, onChange, label }) {
    return (
        <motion.button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label}
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors duration-200 cursor-pointer
        ${checked ? "bg-[#7B5EA7]" : "bg-gray-300"}`}
            whileTap={{ scale: 0.95 }}
        >
            <motion.span
                className="inline-block h-5 w-5 transform rounded-full bg-white shadow-md"
                animate={{ x: checked ? 22 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
        </motion.button>
    );
}

// ─── Sound Picker Modal ──────────────────────────────────────
function SoundPickerModal({ isOpen, onClose, currentSound, onSave, dark }) {
    const soundOptions = ["None (Silence)", "Rain", "Ocean Waves", "Forest", "Soft Piano"];
    const [selected, setSelected] = useState(currentSound);

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
                                        Notification Sound
                                    </h3>
                                    <p className="text-xs sm:text-sm mt-0.5" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
                                        Choose your reminder sound
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-1.5 sm:p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                                >
                                    <X size={18} style={{ color: dark ? "#9ca3af" : "#6b7280" }} />
                                </button>
                            </div>

                            {/* Sound Options */}
                            <div className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-6">
                                {soundOptions.map((sound) => (
                                    <motion.button
                                        key={sound}
                                        onClick={() => setSelected(sound)}
                                        className={`w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl transition-all duration-200 ${selected === sound
                                                ? "bg-[#7B5EA7]/10 border-2 border-[#7B5EA7]"
                                                : dark
                                                    ? "hover:bg-gray-700 border-2 border-transparent"
                                                    : "hover:bg-gray-50 border-2 border-transparent"
                                            }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Volume2 size={18} style={{ color: "#7B5EA7" }} />
                                            <span className={`text-sm sm:text-base font-medium ${typography.sectionMb}`} style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>
                                                {sound}
                                            </span>
                                        </div>
                                        {selected === sound && (
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
                                    className={`flex-1 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-200 ${btn.outline}`}
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
                                    className={`flex-1 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base text-white transition-all duration-200 ${btn.primary}`}
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

// ─── DND Picker Modal ──────────────────────────────────────
function DNDPickerModal({ isOpen, onClose, currentDND, onSave, dark }) {
    const dndOptions = ["11:00 PM–6:00 AM", "10:00 PM–7:00 AM", "12:00 AM–8:00 AM", "1:00 AM–9:00 AM", "Off"];
    const [selected, setSelected] = useState(currentDND);

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
                                        Do Not Disturb
                                    </h3>
                                    <p className="text-xs sm:text-sm mt-0.5" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
                                        Set quiet hours for reminders
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-1.5 sm:p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                                >
                                    <X size={18} style={{ color: dark ? "#9ca3af" : "#6b7280" }} />
                                </button>
                            </div>

                            {/* DND Options */}
                            <div className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-6">
                                {dndOptions.map((option) => (
                                    <motion.button
                                        key={option}
                                        onClick={() => setSelected(option)}
                                        className={`w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl transition-all duration-200 ${selected === option
                                                ? "bg-[#7B5EA7]/10 border-2 border-[#7B5EA7]"
                                                : dark
                                                    ? "hover:bg-gray-700 border-2 border-transparent"
                                                    : "hover:bg-gray-50 border-2 border-transparent"
                                            }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Moon size={18} style={{ color: "#7B5EA7" }} />
                                            <span className={`text-sm sm:text-base font-medium ${typography.sectionMb}`} style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>
                                                {option}
                                            </span>
                                        </div>
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
                                    className={`flex-1 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-200 ${btn.outline}`}
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
                                    className={`flex-1 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base text-white transition-all duration-200 ${btn.primary}`}
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

// ─── Pause Reminders Picker Modal ──────────────────────────
function PausePickerModal({ isOpen, onClose, currentPause, onSave, dark }) {
    const pauseOptions = ["Off","On"];
    const [selected, setSelected] = useState(currentPause);

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
                                        Pause Reminders
                                    </h3>
                                    <p className="text-xs sm:text-sm mt-0.5" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
                                        Temporarily pause all reminders
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-1.5 sm:p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                                >
                                    <X size={18} style={{ color: dark ? "#9ca3af" : "#6b7280" }} />
                                </button>
                            </div>

                            {/* Pause Options */}
                            <div className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-6">
                                {pauseOptions.map((option) => (
                                    <motion.button
                                        key={option}
                                        onClick={() => setSelected(option)}
                                        className={`w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl transition-all duration-200 ${selected === option
                                                ? "bg-[#7B5EA7]/10 border-2 border-[#7B5EA7]"
                                                : dark
                                                    ? "hover:bg-gray-700 border-2 border-transparent"
                                                    : "hover:bg-gray-50 border-2 border-transparent"
                                            }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Calendar size={18} style={{ color: "#7B5EA7" }} />
                                            <span className={`text-sm sm:text-base font-medium ${typography.sectionMb}`} style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>
                                                {option}
                                            </span>
                                        </div>
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
                                    className={`flex-1 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-200 ${btn.outline}`}
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
                                    className={`flex-1 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base text-white transition-all duration-200 ${btn.primary}`}
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

// ─── Settings row (same visual language as ReminderTypes' DetailRow) ──
function SettingsRow({ icon: Icon, label, value, description, right, onClick, isLast, dark }) {
    const clickable = Boolean(onClick);
    const hasToggle = Boolean(right);

    // If it has a toggle, use div to prevent nested buttons
    if (hasToggle) {
        return (
            <div
                className={`w-full flex items-center justify-between py-5 px-5 sm:px-6 text-left
            group transition-all duration-300
            ${!isLast ? "border-b" : ""}`}
                style={{
                    borderColor: dark ? "#374151" : "#f3f0ea",
                    backgroundColor: "transparent",
                    borderBottom: isLast ? "none" : `1px solid ${dark ? "#374151" : "#f3f0ea"}`,
                }}
            >
                {/* Left side - Icon & Label */}
                <div className="flex items-center gap-4 min-w-0">
                    <div
                        className={`p-2.5 rounded-xl transition-all duration-300 group-hover:scale-105 shrink-0 ${card.iconBox}`}
                        style={{
                            backgroundColor: dark ? "rgba(123, 94, 167, 0.12)" : "rgba(123, 94, 167, 0.06)",
                        }}
                    >
                        <Icon size={19} strokeWidth={2} style={{ color: "#7B5EA7" }} />
                    </div>
                    <div className="flex flex-col items-start min-w-0">
                        <span
                            className={`text-[14px] sm:text-[15px] font-medium ${typography.sectionMb}`}
                            style={{ color: dark ? "#e5e7eb" : "#1f2937" }}
                        >
                            {label}
                        </span>
                        {description && (
                            <span
                                className={`text-[11px] sm:text-[12px] opacity-70 truncate max-w-[220px] sm:max-w-none ${typography.sectionMb}`}
                                style={{ color: dark ? "#9ca3af" : "#6b7280" }}
                            >
                                {description}
                            </span>
                        )}
                    </div>
                </div>

                {/* Right side - Value / control & Chevron */}
                <div className="flex items-center gap-3 shrink-0">
                    {value && (
                        <div
                            className="relative px-4 py-2 rounded-xl border transition-all duration-300 group-hover:border-[#7B5EA7] group-hover:shadow-sm"
                            style={{
                                backgroundColor: dark ? "rgba(55, 65, 81, 0.5)" : "rgba(255, 255, 255, 0.8)",
                                borderColor: dark ? "#4b5563" : "#e5e7eb",
                            }}
                        >
                            <span
                                className={`text-[13px] sm:text-[14px] font-medium ${typography.sectionMb}`}
                                style={{ color: dark ? "#e5e7eb" : "#1f2937" }}
                            >
                                {value}
                            </span>
                        </div>
                    )}

                    {right}
                </div>
            </div>
        );
    }

    // For clickable rows without toggle, use motion.button
    return (
        <motion.button
            type="button"
            onClick={onClick}
            className={`w-full flex items-center justify-between py-5 px-5 sm:px-6 text-left
        group transition-all duration-300 cursor-pointer
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
            <div className="flex items-center gap-4 min-w-0">
                <div
                    className={`p-2.5 rounded-xl transition-all duration-300 group-hover:scale-105 shrink-0 ${card.iconBox}`}
                    style={{
                        backgroundColor: dark ? "rgba(123, 94, 167, 0.12)" : "rgba(123, 94, 167, 0.06)",
                    }}
                >
                    <Icon size={19} strokeWidth={2} style={{ color: "#7B5EA7" }} />
                </div>
                <div className="flex flex-col items-start min-w-0">
                    <span
                        className={`text-[14px] sm:text-[15px] font-medium ${typography.sectionMb}`}
                        style={{ color: dark ? "#e5e7eb" : "#1f2937" }}
                    >
                        {label}
                    </span>
                    {description && (
                        <span
                            className={`text-[11px] sm:text-[12px] opacity-70 truncate max-w-[220px] sm:max-w-none ${typography.sectionMb}`}
                            style={{ color: dark ? "#9ca3af" : "#6b7280" }}
                        >
                            {description}
                        </span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                {value && (
                    <div
                        className="relative px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border transition-all duration-300 group-hover:border-[#7B5EA7] group-hover:shadow-sm"
                        style={{
                            backgroundColor: dark ? "rgba(55, 65, 81, 0.5)" : "rgba(255, 255, 255, 0.8)",
                            borderColor: dark ? "#4b5563" : "#e5e7eb",
                        }}
                    >
                        <span
                            className={`text-[11px] sm:text-[14px] font-medium ${typography.sectionMb}`}
                            style={{ color: dark ? "#e5e7eb" : "#1f2937" }}
                        >
                            {value}
                        </span>
                    </div>
                )}

                <motion.div
                    className={`p-1 sm:p-1.5 rounded-full transition-all duration-300 group-hover:bg-[#7B5EA7]/10 ${card.iconBox}`}
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

// ─── Grouped settings card (matches ReminderTypes' card container) ───
function SettingsGroup({ children, dark, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay }}
            className={`rounded-2xl border overflow-hidden shadow-sm ${card.default}`}
            style={{
                backgroundColor: dark ? "#1f2937" : "#ffffff",
                borderColor: dark ? "#374151" : "#E9E3D6",
            }}
        >
            {children}
        </motion.div>
    );
}

// ─── Main component ────────────────────────────────────────────
export default function ReminderPreferences() {
    const { dark, textColor } = useTheme();

    const [vibration, setVibration] = useState(true);
    const [notificationSound, setNotificationSound] = useState("None (Silence)");
    const [dnd, setDnd] = useState("11:00 PM–6:00 AM");
    const [pauseReminders, setPauseReminders] = useState("Off");

    // Modal states
    const [showSoundPicker, setShowSoundPicker] = useState(false);
    const [showDNDPicker, setShowDNDPicker] = useState(false);
    const [showPausePicker, setShowPausePicker] = useState(false);

    const handleNotificationSound = (newSound) => {
        setNotificationSound(newSound);
    };

    const handleDoNotDisturb = (newDND) => {
        setDnd(newDND);
    };

    const handlePauseReminders = (newPause) => {
        setPauseReminders(newPause);
    };

    const handleReminderTips = () => {
        alert("💡 Reminder Tips:\n\n• Set consistent times for your practice\n• Start with gentle reminders\n• Use vibrations for discreet alerts\n• Schedule reminders around your routine\n• Take breaks when needed");
    };

    return (
        <div
            className={`w-full ${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`}
            style={{ backgroundColor: dark ? "#020202" : "#ffffff" }}
        >
            {/* Reminder Preferences */}
            <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${typography.playerHeading} mb-5 sm:mb-6`}
                style={{ color: textColor }}
            >
                Reminder Preferences
            </motion.h2>

            <SettingsGroup dark={dark}>
                <SettingsRow
                    icon={Volume2}
                    label="Notification Sound"
                    value={notificationSound}
                    onClick={() => setShowSoundPicker(true)}
                    dark={dark}
                />
                <SettingsRow
                    icon={Vibrate}
                    label="Vibration"
                    right={
                        <Toggle
                            checked={vibration}
                            onChange={setVibration}
                            label="Toggle Vibration"
                        />
                    }
                    dark={dark}
                />
                <SettingsRow
                    icon={Moon}
                    label="Do Not Disturb"
                    value={dnd}
                    onClick={() => setShowDNDPicker(true)}
                    isLast
                    dark={dark}
                />
            </SettingsGroup>

            {/* Additional Settings */}
            <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`${typography.playerHeading} mt-10 mb-5 sm:mb-6`}
                style={{ color: textColor }}
            >
                Additional Settings
            </motion.h2>

            <SettingsGroup dark={dark} delay={0.1}>
                <SettingsRow
                    icon={Calendar}
                    label="Pause Reminders"
                    value={pauseReminders}
                    onClick={() => setShowPausePicker(true)}
                    dark={dark}
                />
                <SettingsRow
                    icon={Info}
                    label="Reminder Tips"
                    description="Learn how reminders help you stay consistent."
                    onClick={handleReminderTips}
                    isLast
                    dark={dark}
                />
            </SettingsGroup>

            {/* Modals */}
            <SoundPickerModal
                isOpen={showSoundPicker}
                onClose={() => setShowSoundPicker(false)}
                currentSound={notificationSound}
                onSave={handleNotificationSound}
                dark={dark}
            />
            <DNDPickerModal
                isOpen={showDNDPicker}
                onClose={() => setShowDNDPicker(false)}
                currentDND={dnd}
                onSave={handleDoNotDisturb}
                dark={dark}
            />
            <PausePickerModal
                isOpen={showPausePicker}
                onClose={() => setShowPausePicker(false)}
                currentPause={pauseReminders}
                onSave={handlePauseReminders}
                dark={dark}
            />
        </div>
    );
}