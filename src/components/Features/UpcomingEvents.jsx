"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronDown, ChevronRight, ChevronLeft, MapPin, Users, Calendar, X } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { spacing, typography } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";

const defaultEvents = [
    {
        id: "e1",
        image: IMAGES.StressRelief,
        title: "Live Group Meditation: Stress Release",
        month: "MAR",
        day: "15",
        weekday: "Saturday",
        time: "7:00 PM",
        type: "Live Session",
        accent: "#9A85FE",
        tint: "#F1EEFF",
        description: "A guided group session focused on releasing built-up tension through breathwork and gentle mudra practice. Open to all levels.",
        location: "Online via app",
        spots: "12 spots left",
    },
    {
        id: "e2",
        image: IMAGES.HealingRecovery,
        title: "Yoga Nidra Workshop for Deep Healing",
        month: "MAR",
        day: "18",
        weekday: "Tuesday",
        time: "6:30 PM",
        type: "Workshop",
        accent: "#E4789A",
        tint: "#FCE4EC",
        description: "A 90-minute deep-dive into Yoga Nidra as a healing practice, with a longer guided rest and a short Q&A on building a home practice.",
        location: "Online via app",
        spots: "8 spots left",
    },
    {
        id: "e3",
        image: IMAGES.SleepDeep,
        title: "Understanding the Five Elements",
        month: "MAR",
        day: "22",
        weekday: "Saturday",
        time: "8:00 PM",
        type: "Webinar",
        accent: "#4CAF82",
        tint: "#E8F5E9",
        description: "An introductory talk on Earth, Water, Fire, Air, and Space, and how balancing them shows up in daily mudra and breath practice.",
        location: "Online via app",
        spots: "Unlimited",
    },
    {
        id: "e4",
        image: IMAGES.YogaNidraFeature,
        title: "Building Calm Daily Habits: Live Q&A",
        month: "MAR",
        day: "27",
        weekday: "Thursday",
        time: "7:30 PM",
        type: "Live Session",
        accent: "#5BA3D0",
        tint: "#E3F2FD",
        description: "Bring your questions on habit-building, consistency, and working practice into a busy schedule. Hosted live, open floor.",
        location: "Online via app",
        spots: "20 spots left",
    },
];

// ─── Event row ──────────────────────────────────────────────────────────────
function EventRow({ event, dark, textColor, isLast, isOpen, onToggle, onRegister }) {
    return (
        <div style={{ borderBottom: isLast ? "none" : `1px solid ${dark ? "#333333" : "#e5e5e5"}` }}>
            <button
                type="button"
                onClick={() => onToggle(event.id)}
                className="w-full flex items-center gap-3.5 sm:gap-4 py-4 px-4 sm:px-5 text-left cursor-pointer transition-colors hover:bg-black/[0.02]"
            >
                {/* Date tile */}
                <div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex flex-col items-center justify-center shrink-0"
                    style={{ backgroundColor: event.tint }}
                >
                    <span
                        className="text-[9px] sm:text-[9.5px] font-semibold uppercase tracking-wide leading-none"
                        style={{ color: event.accent }}
                    >
                        {event.month}
                    </span>
                    <span
                        className="text-[15px] sm:text-[17px] font-bold leading-none mt-0.5"
                        style={{ color: event.accent }}
                    >
                        {event.day}
                    </span>
                </div>

                {/* Thumbnail */}
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-lg overflow-hidden shrink-0 hidden sm:block">
                    <Image src={event.image} alt={event.title} fill sizes="48px" className="object-cover" />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                    <h3
                        className="text-[14px] sm:text-[15px] font-medium truncate mb-0.5"
                        style={{ color: dark ? "#f3f4f6" : "#111827" }}
                    >
                        {event.title}
                    </h3>
                    <p
                        className="text-[12px] sm:text-[12.5px] truncate"
                        style={{ color: dark ? "#9ca3af" : "#6b7280" }}
                    >
                        {event.type} &bull; {event.weekday}, {event.time}
                    </p>
                </div>

                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0"
                >
                    <ChevronDown size={18} style={{ color: dark ? "#6b7280" : "#9ca3af" }} />
                </motion.div>
            </button>

            {/* Expanded details */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 sm:px-5 pb-5 pl-4 sm:pl-[4.75rem]">
                            <p
                                className="text-[13px] sm:text-[13.5px] leading-relaxed mb-3"
                                style={{ color: dark ? "#d1d5db" : "#4b5563" }}
                            >
                                {event.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-4">
                                <span
                                    className="flex items-center gap-1.5 text-[12.5px]"
                                    style={{ color: dark ? "#9ca3af" : "#6b7280" }}
                                >
                                    <MapPin size={13} />
                                    {event.location}
                                </span>
                                <span
                                    className="flex items-center gap-1.5 text-[12.5px]"
                                    style={{ color: dark ? "#9ca3af" : "#6b7280" }}
                                >
                                    <Users size={13} />
                                    {event.spots}
                                </span>
                            </div>

                            <motion.button
                                type="button"
                                onClick={() => onRegister?.(event)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                className="text-[13.5px] font-semibold px-5 py-2.5 rounded-full text-white cursor-pointer"
                                style={{ backgroundColor: event.accent }}
                            >
                                Register
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── Mini Calendar Dropdown ─────────────────────────────────────────────────
const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];
const WEEKDAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_ABBR_TO_INDEX = {
    JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5,
    JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11,
};

function MiniCalendarDropdown({ events, dark, textColor, onClose, onSelectDate, selectedDate }) {
    // Default to the month of the first event, otherwise the current month
    const initial = events?.[0]
        ? { month: MONTH_ABBR_TO_INDEX[events[0].month] ?? new Date().getMonth(), year: new Date().getFullYear() }
        : { month: new Date().getMonth(), year: new Date().getFullYear() };

    const [viewMonth, setViewMonth] = useState(initial.month);
    const [viewYear, setViewYear] = useState(initial.year);

    const eventDaysInView = new Map();
    events?.forEach((e) => {
        if (MONTH_ABBR_TO_INDEX[e.month] === viewMonth) {
            eventDaysInView.set(Number(e.day), e.accent);
        }
    });

    const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells = [
        ...Array(firstDayOfMonth).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];

    const changeMonth = (delta) => {
        let m = viewMonth + delta;
        let y = viewYear;
        if (m < 0) { m = 11; y -= 1; }
        if (m > 11) { m = 0; y += 1; }
        setViewMonth(m);
        setViewYear(y);
    };

    return (
        <>
            {/* Backdrop to close on outside click */}
            <div className="fixed inset-0 z-40" onClick={onClose} />

            <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 top-full mt-2 w-[280px] rounded-2xl border shadow-lg z-50 p-4"
                style={{
                    backgroundColor: dark ? "#1c1c1e" : "#ffffff",
                    borderColor: dark ? "#333333" : "#e5e5e5",
                }}
            >
                {/* Month nav */}
                <div className="flex items-center justify-between mb-3">
                    <button
                        type="button"
                        onClick={() => changeMonth(-1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer"
                    >
                        <ChevronLeft size={15} style={{ color: dark ? "#9ca3af" : "#374151" }} />
                    </button>
                    <span className="text-[13.5px] font-semibold" style={{ color: textColor }}>
                        {MONTH_NAMES[viewMonth]} {viewYear}
                    </span>
                    <button
                        type="button"
                        onClick={() => changeMonth(1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer"
                    >
                        <ChevronRight size={15} style={{ color: dark ? "#9ca3af" : "#374151" }} />
                    </button>
                </div>

                {/* Weekday labels */}
                <div className="grid grid-cols-7 mb-1">
                    {WEEKDAY_LABELS.map((d, i) => (
                        <span
                            key={i}
                            className="text-[10.5px] font-medium text-center py-1"
                            style={{ color: dark ? "#6b7280" : "#9ca3af" }}
                        >
                            {d}
                        </span>
                    ))}
                </div>

                {/* Day grid */}
                <div className="grid grid-cols-7 gap-y-1">
                    {cells.map((day, i) => {
                        const accent = day ? eventDaysInView.get(day) : null;
                        const isSelected =
                            day &&
                            selectedDate &&
                            selectedDate.day === day &&
                            selectedDate.month === viewMonth &&
                            selectedDate.year === viewYear;
                        return (
                            <button
                                key={i}
                                type="button"
                                disabled={!day}
                                onClick={() => day && onSelectDate?.({ day, month: viewMonth, year: viewYear })}
                                className="relative w-full aspect-square flex flex-col items-center justify-center text-[12px] rounded-full transition-colors"
                                style={{
                                    color: day ? (isSelected ? "#ffffff" : textColor) : "transparent",
                                    cursor: day ? "pointer" : "default",
                                    backgroundColor: isSelected ? "#9A85FE" : "transparent",
                                    fontWeight: isSelected ? 600 : 400,
                                }}
                                onMouseEnter={(e) => {
                                    if (day && !isSelected) {
                                        e.currentTarget.style.backgroundColor = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isSelected) e.currentTarget.style.backgroundColor = "transparent";
                                }}
                            >
                                {day}
                                {accent && !isSelected && (
                                    <span
                                        className="absolute bottom-0.5 w-1 h-1 rounded-full"
                                        style={{ backgroundColor: accent }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            </motion.div>
        </>
    );
}


export default function UpcomingEvents({ events = defaultEvents, onRegister, onViewCalendar }) {
    const { dark, textColor } = useTheme();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.05, margin: "-50px" });
    const [openId, setOpenId] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null); // { day, month, year }

    const handleToggle = (id) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    const visibleEvents = selectedDate
        ? events.filter(
              (e) => MONTH_ABBR_TO_INDEX[e.month] === selectedDate.month && Number(e.day) === selectedDate.day
          )
        : events;

    return (
        <motion.section
            ref={sectionRef}
            className={`w-full ${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`}
            style={{ backgroundColor: dark ? "#020202" : "#ffffff" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className="mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="relative flex items-end justify-between mb-4 sm:mb-5"
                >
                    <h2 className={typography.sectionSbHeading} style={{ color: textColor }}>
                        Upcoming Events
                    </h2>

                    <div className="relative shrink-0">
                        <button
                            type="button"
                            onClick={() => setShowCalendar((v) => !v)}
                            className="flex items-center gap-1.5 text-[13px] sm:text-[13.5px] font-medium hover:opacity-80 transition-opacity cursor-pointer"
                            style={{ color: "#9A85FE" }}
                        >
                            <Calendar size={14} />
                            View Calendar
                        </button>

                        <AnimatePresence>
                            {showCalendar && (
                                <MiniCalendarDropdown
                                    events={events}
                                    dark={dark}
                                    textColor={textColor}
                                    onClose={() => setShowCalendar(false)}
                                    onSelectDate={(date) => {
                                        setSelectedDate(date);
                                        onViewCalendar?.(date);
                                        setShowCalendar(false);
                                    }}
                                    selectedDate={selectedDate}
                                />
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Active date filter chip */}
                <AnimatePresence>
                    {selectedDate && (
                        <motion.div
                            initial={{ opacity: 0, y: -6, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: "auto" }}
                            exit={{ opacity: 0, y: -6, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mb-3 sm:mb-4 overflow-hidden"
                        >
                            <div
                                className="inline-flex items-center gap-2 rounded-full pl-3.5 pr-2 py-1.5"
                                style={{ backgroundColor: dark ? "#1c1c1e" : "#f3f3f4" }}
                            >
                                <span className="text-[12.5px] font-medium" style={{ color: textColor }}>
                                    {MONTH_NAMES[selectedDate.month]} {selectedDate.day}, {selectedDate.year}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setSelectedDate(null)}
                                    aria-label="Clear date filter"
                                    className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors cursor-pointer"
                                >
                                    <X size={12} style={{ color: dark ? "#9ca3af" : "#6b7280" }} />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Grouped list card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="rounded-2xl overflow-hidden"
                    style={{ backgroundColor: dark ? "#1c1c1e" : "#f3f3f4" }}
                >
                    {visibleEvents.length > 0 ? (
                        visibleEvents.map((event, i) => (
                            <EventRow
                                key={event.id}
                                event={event}
                                dark={dark}
                                textColor={textColor}
                                isLast={i === visibleEvents.length - 1}
                                isOpen={openId === event.id}
                                onToggle={handleToggle}
                                onRegister={onRegister}
                            />
                        ))
                    ) : (
                        <div className="py-8 px-5 text-center">
                            <p className="text-[13.5px]" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
                                No events on this date.
                            </p>
                        </div>
                    )}
                </motion.div>
            </div>
        </motion.section>
    );
}