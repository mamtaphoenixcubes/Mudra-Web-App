"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { typography, spacing } from "../../theme";
import { IMAGES } from "../../assets/assets";

const DEFAULT_REMINDERS = [
    {
        id: 1,
        icon: "alarm",
        title: "Daily Practice Reminder",
        schedule: "Every day at 7:00 AM",
        enabled: true,
    },
    {
        id: 2,
        icon: "moon",
        title: "Evening Wind Down",
        schedule: "Every day at 9:00 PM",
        enabled: true,
    },
    {
        id: 3,
        icon: "calendar",
        title: "Weekly Reflection",
        schedule: "Every Sunday at 8:00 PM",
        enabled: false,
    },
];

// ── Icon Renderer with Images ──────────────────────────────────
function ReminderIcon({ iconKey }) {
    const iconMap = {
        alarm: IMAGES.ClockStopwatch || IMAGES.Bell || IMAGES.Bell,
        moon: IMAGES.SleepBetter || IMAGES.YogaNidra,
        calendar: IMAGES.calendar || IMAGES.Clock || IMAGES.ClockStopwatch,
        bell: IMAGES.BellIcon,
        clock: IMAGES.Clock,
        notification: IMAGES.BellIcon,
        reminder: IMAGES.BellIcon,
    };

    const src = iconMap[iconKey] || IMAGES.ClockStopwatch;

    return (
        <motion.div 
            className="w-11 h-11 rounded-full border border-gray-200 bg-white flex items-center justify-center shrink-0 overflow-hidden"
            whileHover={{
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.2 }
            }}
        >
            <div className="w-5 h-5 relative">
                <Image
                    src={src}
                    alt="Reminder icon"
                    fill
                    className="object-contain"
                />
            </div>
        </motion.div>
    );
}

// ── Plus Icon ──────────────────────────────────────────────────
function PlusIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
        </svg>
    );
}

// ── Close Icon ──────────────────────────────────────────────────
function CloseIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}

// ── Chevron Icon ──────────────────────────────────────────────
function ChevronRightIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
        </svg>
    );
}

// ── Toggle Switch ──────────────────────────────────────────────
function Toggle({ enabled, onChange }) {
    return (
        <motion.button
            role="switch"
            aria-checked={enabled}
            onClick={onChange}
            className={`
                relative inline-flex items-center
                w-11 h-6 rounded-full
                transition-colors duration-200 cursor-pointer shrink-0
                ${enabled ? "bg-gray-800" : "bg-gray-300"}
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <motion.span
                className={`
                    inline-block w-5 h-5 bg-white rounded-full shadow
                    transform transition-transform duration-200
                    ${enabled ? "translate-x-5" : "translate-x-0.5"}
                `}
                animate={{ x: enabled ? 20 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
        </motion.button>
    );
}

// ── Add Reminder Modal ─────────────────────────────────────────
function AddReminderModal({ isOpen, onClose, onAdd }) {
    const [title, setTitle] = useState("");
    const [schedule, setSchedule] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("alarm");

    const iconOptions = [
        { id: "alarm", label: "Alarm", image: IMAGES.BellIcon },
        { id: "moon", label: "Moon", image: IMAGES.MoonIcon || IMAGES.BellIcon },
        { id: "calendar", label: "Calendar", image: IMAGES.CalendarIcon || IMAGES.Clock },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !schedule.trim()) return;

        const newReminder = {
            id: Date.now(),
            icon: selectedIcon,
            title: title.trim(),
            schedule: schedule.trim(),
            enabled: true,
        };

        onAdd(newReminder);
        setTitle("");
        setSchedule("");
        setSelectedIcon("alarm");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <motion.div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
        >
            <motion.div 
                className="bg-white rounded-2xl w-full max-w-md shadow-xl" 
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    duration: 0.4
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <motion.div 
                    className="flex items-center justify-between px-6 py-4 border-b border-gray-100"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                >
                    <h3 className="text-lg font-semibold text-gray-900">
                        Add New Reminder
                    </h3>
                    <motion.button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        whileHover={{
                            scale: 1.1,
                            rotate: 90,
                            transition: { duration: 0.3 }
                        }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <CloseIcon />
                    </motion.button>
                </motion.div>

                {/* Form */}
                <motion.form 
                    onSubmit={handleSubmit} 
                    className="p-6 space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.3 }}
                >
                    {/* Reminder Title */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1.5">
                            Reminder Title
                        </label>
                        <motion.input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Morning Meditation"
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition text-sm"
                            whileFocus={{
                                scale: 1.02,
                                borderColor: "#9A85FE",
                                boxShadow: "0 0 0 3px rgba(154, 133, 254, 0.3)",
                                transition: { duration: 0.2 }
                            }}
                            autoFocus
                        />
                    </div>

                    {/* Schedule */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1.5">
                            Schedule
                        </label>
                        <motion.input
                            type="text"
                            value={schedule}
                            onChange={(e) => setSchedule(e.target.value)}
                            placeholder="e.g., Every day at 7:00 AM"
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition text-sm"
                            whileFocus={{
                                scale: 1.02,
                                borderColor: "#9A85FE",
                                boxShadow: "0 0 0 3px rgba(154, 133, 254, 0.3)",
                                transition: { duration: 0.2 }
                            }}
                        />
                    </div>

                    {/* Icon Selection with Images */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1.5">
                            Icon
                        </label>
                        <div className="flex gap-2">
                            {iconOptions.map((icon, idx) => (
                                <motion.button
                                    key={icon.id}
                                    type="button"
                                    onClick={() => setSelectedIcon(icon.id)}
                                    className={`
                                        flex items-center gap-2 px-3 py-2 rounded-lg border-2 text-sm transition-all
                                        ${selectedIcon === icon.id 
                                            ? "border-primary bg-primary/5 text-primary" 
                                            : "border-gray-200 hover:border-gray-300"
                                        }
                                    `}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 + 0.2, duration: 0.3 }}
                                    whileHover={{
                                        scale: 1.05,
                                        transition: { duration: 0.2 }
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className="w-5 h-5 relative">
                                        <Image
                                            src={icon.image}
                                            alt={icon.label}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <span>{icon.label}</span>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <motion.div 
                        className="flex gap-3 pt-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                    >
                        <motion.button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
                            whileHover={{
                                scale: 1.03,
                                backgroundColor: "#f9fafb",
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.97 }}
                        >
                            Cancel
                        </motion.button>
                        <motion.button
                            type="submit"
                            className="flex-1 px-4 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors text-sm"
                            whileHover={{
                                scale: 1.03,
                                boxShadow: "0 4px 20px rgba(154, 133, 254, 0.4)",
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.97 }}
                        >
                            Add Reminder
                        </motion.button>
                    </motion.div>
                </motion.form>
            </motion.div>
        </motion.div>
    );
}

// ── Main Component ─────────────────────────────────────────────
export default function RemindersCard({ onManageAll, onAddReminder }) {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { 
        once: true, 
        amount: 0.1,
        margin: "-50px"
    });

    const [reminders, setReminders] = useState(DEFAULT_REMINDERS);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleReminder = (id) => {
        setReminders((prev) =>
            prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
        );
    };

    const handleAddReminder = (newReminder) => {
        setReminders((prev) => [...prev, newReminder]);
        if (onAddReminder) {
            onAddReminder(newReminder);
        }
    };

    // Character animation for heading
    const charVariants = {
        hidden: { opacity: 0, y: 20, rotateX: -10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                delay: i * 0.06,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    };

    // Staggered reminder item variants
    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.05 + 0.2,
                duration: 0.4,
                ease: "easeOut",
            },
        }),
    };

    const headingText = "Reminders";
    const headingChars = headingText.split("");

    return (
        <>
            <motion.section
                ref={sectionRef}
                className={`
                    flex justify-center
                    ${spacing.sectionPaddingX}
                    ${spacing.sectionPaddingY}
                `}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <motion.div 
                    className="w-full max-w-5xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* ── Header ── */}
                    <motion.div 
                        className="flex items-start justify-between mb-3"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                    >
                        <div>
                            <motion.h2 
                                className={`${typography.founderStory.subheading} font-bold text-gray-900 !mb-0`}
                            >
                                {headingChars.map((char, i) => (
                                    <motion.span
                                        key={i}
                                        custom={i}
                                        variants={charVariants}
                                        initial="hidden"
                                        animate={isInView ? "visible" : "hidden"}
                                        style={{ display: "inline-block" }}
                                    >
                                        {char === " " ? "\u00A0" : char}
                                    </motion.span>
                                ))}
                            </motion.h2>
                            <motion.p 
                                className={`${typography.sessionCardMeta} text-gray-500 mt-0.5`}
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                            >
                                Stay consistent with gentle nudges.
                            </motion.p>
                        </div>
                        <motion.button
                            onClick={onManageAll}
                            className="flex items-center gap-0.5 text-xs sm:text-sm text-gray-700 font-medium hover:text-gray-900 transition-colors cursor-pointer whitespace-nowrap mt-0.5"
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Manage All
                            <ChevronRightIcon />
                        </motion.button>
                    </motion.div>

                    {/* ── Card ── */}
                    <motion.div 
                        className="w-full bg-white border border-gray-200 rounded-2xl overflow-hidden"
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        whileHover={{
                            boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
                            transition: { duration: 0.3 }
                        }}
                    >
                        {/* Reminder rows */}
                        {reminders.map((reminder, idx) => (
                            <motion.div 
                                key={reminder.id}
                                custom={idx}
                                variants={itemVariants}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                            >
                                <motion.div 
                                    className="flex items-center gap-3 sm:gap-4 px-4 py-4 sm:px-5"
                                    whileHover={{
                                        backgroundColor: "#f9fafb",
                                        transition: { duration: 0.2 }
                                    }}
                                >
                                    <ReminderIcon iconKey={reminder.icon} />
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <motion.span 
                                            className={`${typography.sessionCardTitle} text-gray-900 font-semibold`}
                                            whileHover={{
                                                scale: 1.02,
                                                transition: { duration: 0.2 }
                                            }}
                                        >
                                            {reminder.title}
                                        </motion.span>
                                        <span className={`${typography.sessionCardMeta} text-gray-500 mt-0.5`}>
                                            {reminder.schedule}
                                        </span>
                                    </div>
                                    <Toggle
                                        enabled={reminder.enabled}
                                        onChange={() => toggleReminder(reminder.id)}
                                    />
                                </motion.div>
                                {idx < reminders.length - 1 && (
                                    <motion.div 
                                        className="h-px bg-gray-100 mx-0"
                                        initial={{ scaleX: 0 }}
                                        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                                        transition={{ duration: 0.4, delay: idx * 0.05 + 0.3 }}
                                    />
                                )}
                            </motion.div>
                        ))}

                        {/* Divider before Add row */}
                        <motion.div 
                            className="h-px bg-gray-100"
                            initial={{ scaleX: 0 }}
                            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                        />

                        {/* ── Add New Reminder ── */}
                        <motion.button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full flex items-center justify-between px-4 sm:px-5 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                            whileHover={{
                                backgroundColor: "#f9fafb",
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.99 }}
                        >
                            <motion.span 
                                className={`${typography.sessionCardTitle} text-gray-900 font-medium`}
                                whileHover={{
                                    scale: 1.02,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                Add New Reminder
                            </motion.span>
                            <motion.span 
                                className="text-gray-700"
                                whileHover={{
                                    rotate: 90,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <PlusIcon />
                            </motion.span>
                        </motion.button>
                    </motion.div>
                </motion.div>
            </motion.section>

            {/* ── Add Reminder Modal ── */}
            <AddReminderModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddReminder}
            />
        </>
    );
}