"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { typography, spacing, btn, card } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";

// ── Data ───────────────────────────────────────────────────────
const INITIAL_SAVED_MUDRAS = [
    {
        id: "gyan",
        name: "Gyan Mudra",
        subtitle: "Enhances focus and clarity",
        duration: "10 min",
        imgKey: "gyanMudra",
        bg: "bg-benefit-1",
    },
    {
        id: "anjali",
        name: "Anjali Mudra",
        subtitle: "Cultivates gratitude and calm",
        duration: "8 min",
        imgKey: "DhyanaMudra",
        bg: "bg-benefit-2",
    },
    {
        id: "prithvi",
        name: "Prithvi Mudra",
        subtitle: "Grounding and stability",
        duration: "15 min",
        imgKey: "EarthIcon",
        bg: "bg-benefit-3",
    },
    {
        id: "surya",
        name: "Surya Mudra",
        subtitle: "Boosts energy and warmth",
        duration: "12 min",
        imgKey: "suryaMudra",
        bg: "bg-benefit-5",
    },
];

const INITIAL_SAVED_NIDRAS = [
    {
        id: "deep-sleep",
        title: "Deep Sleep Yoga Nidra",
        category: "Yoga Nidra",
        duration: "35 min",
        desc: "A deeply relaxing practice to quiet the mind and prepare for restful sleep.",
        imgKey: "SleepDeep",
    },
    {
        id: "anxiety-release",
        title: "Anxiety Release Yoga Nidra",
        category: "Yoga Nidra",
        duration: "25 min",
        desc: "Release worry and calm your nervous system.",
        imgKey: "StressRelief",
    },
    {
        id: "healing-sleep",
        title: "Healing Sleep Yoga Nidra",
        category: "Yoga Nidra",
        duration: "45 min",
        desc: "Nourish your body and mind for deep restorative sleep.",
        imgKey: "HealingRecovery",
    },
    {
        id: "chakra-balancing",
        title: "Chakra Balancing Yoga Nidra",
        category: "Yoga Nidra",
        duration: "30 min",
        desc: "Balance your chakras and restore energetic harmony.",
        imgKey: "RestfulSleep",
    },
];

const INITIAL_SAVED_SESSIONS = [
    {
        id: "meditation-basics",
        title: "Meditation Basics",
        category: "Meditation",
        duration: "20 min",
        desc: "Learn the fundamentals of meditation for beginners.",
        imgKey: "DhyanaMudra",
    },
    {
        id: "breath-work",
        title: "Breath Work Practice",
        category: "Pranayama",
        duration: "15 min",
        desc: "Master breathing techniques for energy and calm.",
        imgKey: "Energy",
    },
];

// ── Small inline icons ───────────────────────────────────────
const BookmarkIcon = ({ filled, className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 20 20" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round">
        <path d="M5 3.5h10a1 1 0 0 1 1 1V17l-6-3.5L4 17V4.5a1 1 0 0 1 1-1Z" />
    </svg>
);

const MoreIcon = ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
        <circle cx="4" cy="10" r="1.4" />
        <circle cx="10" cy="10" r="1.4" />
        <circle cx="16" cy="10" r="1.4" />
    </svg>
);

// ── Tab pill ─────────────────────────────────────────────────
function TabPill({ label, iconKey, active, onClick, dark, textColor }) {
    return (
        <motion.button
            onClick={onClick}
            whileTap={{ scale: 0.97 }}
            className="flex-1 flex items-center justify-center gap-2 rounded-full py-2.5 text-[13px] font-semibold transition-colors"
            style={{
                backgroundColor: active ? textColor : "transparent",
                color: active ? (dark ? "#111827" : "#ffffff") : dark ? "var(--gray-400)" : "var(--gray-500)",
                border: active ? "none" : `1px solid ${dark ? "var(--gray-700)" : "var(--gray-300)"}`,
            }}
        >
            <span className="w-4 h-4 relative shrink-0" style={{ filter: active ? (dark ? "none" : "brightness(0) invert(1)") : "none" }}>
                <Image src={IMAGES[iconKey]} alt="" fill className="object-contain" />
            </span>
            {label}
        </motion.button>
    );
}

// ── Saved mudra card ─────────────────────────────────────────
function SavedMudraCard({ mudra, dark, textColor, onUnsave, index }) {
    return (
        <motion.div
            className={`${mudra.bg} relative shrink-0 w-[132px] rounded-2xl p-3 flex flex-col items-center text-center`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
        >
            <button
                onClick={() => onUnsave(mudra.id)}
                aria-label={`Remove ${mudra.name} from saved`}
                className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(255,255,255,0.7)", color: "#111827" }}
            >
                <BookmarkIcon filled className="w-3.5 h-3.5" />
            </button>

            <div className="w-14 h-14 rounded-full overflow-hidden mb-2 shadow-sm" style={{ backgroundColor: "#ffffff" }}>
                <Image
                    src={IMAGES[mudra.imgKey]}
                    alt={mudra.name}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                />
            </div>

            <h3 className="text-[12px] font-semibold leading-tight" style={{ color: "var(--gray-900)" }}>
                {mudra.name}
            </h3>
            <p className="text-[10px] leading-snug mt-0.5" style={{ color: "var(--gray-600)" }}>
                {mudra.subtitle}
            </p>
            <span
                className="mt-2 text-[10px] font-medium px-2 py-0.5 rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.6)", color: "var(--gray-700)" }}
            >
                {mudra.duration}
            </span>
        </motion.div>
    );
}

// ── Saved Nidra card ─────────────────────────────────────────
function SavedNidraCard({ nidra, dark, textColor, onUnsave, index }) {
    return (
        <motion.div
            className="relative bg-benefit-2 rounded-2xl p-4 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
        >
            <button
                onClick={() => onUnsave(nidra.id)}
                aria-label={`Remove ${nidra.title} from saved`}
                className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(255,255,255,0.7)", color: "#111827" }}
            >
                <BookmarkIcon filled className="w-3.5 h-3.5" />
            </button>

            <div className="w-14 h-14 rounded-full overflow-hidden mb-2 shadow-sm" style={{ backgroundColor: "#ffffff" }}>
                <Image
                    src={IMAGES[nidra.imgKey]}
                    alt={nidra.title}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                />
            </div>

            <h3 className="text-[12px] font-semibold leading-tight" style={{ color: "var(--gray-900)" }}>
                {nidra.title}
            </h3>
            <p className="text-[10px] leading-snug mt-0.5" style={{ color: "var(--gray-600)" }}>
                {nidra.duration} • {nidra.category}
            </p>
            <p className="text-[9px] leading-snug mt-1" style={{ color: "var(--gray-500)" }}>
                {nidra.desc}
            </p>
        </motion.div>
    );
}

// ── Saved session row ────────────────────────────────────────
function SavedSessionRow({ session, dark, textColor, onUnsave, index }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <motion.div
            className="relative flex items-center gap-3 py-3 border-b last:border-0"
            style={{ borderColor: dark ? "var(--gray-700)" : "var(--gray-100)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.3, delay: index * 0.04 }}
        >
            <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0" style={{ backgroundColor: dark ? "var(--gray-700)" : "var(--gray-100)" }}>
                <Image
                    src={IMAGES[session.imgKey]}
                    alt={session.title}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="min-w-0 flex-1">
                <h4 className="text-[13px] font-semibold truncate" style={{ color: textColor }}>
                    {session.title}
                </h4>
                <p className="text-[11px] mt-0.5" style={{ color: dark ? "var(--gray-500)" : "var(--gray-400)" }}>
                    {session.duration} • {session.category}
                </p>
                <p className="text-[11px] mt-1 leading-snug" style={{ color: dark ? "var(--gray-400)" : "var(--gray-600)" }}>
                    {session.desc}
                </p>
            </div>

            <div className="flex flex-col items-center gap-2 shrink-0 self-start pt-1">
                <button
                    onClick={() => onUnsave(session.id)}
                    aria-label={`Remove ${session.title} from saved`}
                    style={{ color: textColor }}
                >
                    <BookmarkIcon filled className="w-4 h-4" />
                </button>
                <div className="relative">
                    <button onClick={() => setMenuOpen((v) => !v)} style={{ color: dark ? "var(--gray-500)" : "var(--gray-400)" }}>
                        <MoreIcon />
                    </button>
                    <AnimatePresence>
                        {menuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -4, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -4, scale: 0.96 }}
                                transition={{ duration: 0.15 }}
                                className="absolute right-0 top-6 z-10 w-32 rounded-xl shadow-lg py-1 text-[12px]"
                                style={{ backgroundColor: dark ? "var(--gray-700)" : "#ffffff", border: `1px solid ${dark ? "var(--gray-700)" : "var(--gray-300)"}` }}
                            >
                                <button
                                    className="w-full text-left px-3 py-2 hover:bg-black/5"
                                    style={{ color: textColor }}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Play session
                                </button>
                                <button
                                    className="w-full text-left px-3 py-2 hover:bg-black/5"
                                    style={{ color: textColor }}
                                    onClick={() => {
                                        onUnsave(session.id);
                                        setMenuOpen(false);
                                    }}
                                >
                                    Remove
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}

// ── Main component ───────────────────────────────────────────
export default function SavedFavourites() {
    const { dark, textColor } = useTheme();
    const [activeTab, setActiveTab] = useState("mudras");
    const [savedMudras, setSavedMudras] = useState(INITIAL_SAVED_MUDRAS);
    const [savedNidras, setSavedNidras] = useState(INITIAL_SAVED_NIDRAS);
    const [savedSessions, setSavedSessions] = useState(INITIAL_SAVED_SESSIONS);
    const [activeDot, setActiveDot] = useState(0);
    const [needsScroll, setNeedsScroll] = useState(false);
    const scrollRef = useRef(null);
    const containerRef = useRef(null);

    // Check if cards need scrolling
    useEffect(() => {
        const checkOverflow = () => {
            if (containerRef.current) {
                const container = containerRef.current;
                const totalWidth = savedMudras.length * (132 + 12);
                const containerWidth = container.offsetWidth;
                setNeedsScroll(totalWidth > containerWidth);
            }
        };
        checkOverflow();
        window.addEventListener('resize', checkOverflow);
        return () => window.removeEventListener('resize', checkOverflow);
    }, [savedMudras.length]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        const cardWidth = 132 + 12;
        const dot = Math.round(el.scrollLeft / cardWidth);
        setActiveDot(Math.min(dot, savedMudras.length - 1));
    };

    return (
        <section
            className={`${spacing.sectionPaddingX} py-6 md:py-10`}
            style={{ backgroundColor: dark ? "#0b0f1a" : "var(--gray-100)" }}
        >
            <div className="mx-auto max-w-4xl">
                {/* ── Header ── */}
                <h1 className="text-[20px] md:text-[24px] lg:text-[28px] font-semibold text-center mb-4" style={{ color: textColor }}>
                    Saved / Favourites
                </h1>

                {/* ── Tabs ── */}
                <div className="flex gap-2 justify-center mx-auto max-w-sm">
                    <TabPill
                        label="Mudras"
                        iconKey="ActivityHeart"
                        active={activeTab === "mudras"}
                        onClick={() => handleTabClick("mudras")}
                        dark={dark}
                        textColor={textColor}
                    />
                    <TabPill
                        label="Nidras"
                        iconKey="PlayCircle"
                        active={activeTab === "nidras"}
                        onClick={() => handleTabClick("nidras")}
                        dark={dark}
                        textColor={textColor}
                    />
                </div>

                <p className="text-[12px] text-center leading-relaxed mt-4 mb-6" style={{ color: dark ? "var(--gray-400)" : "var(--gray-500)" }}>
                    All your favourite mudras, nidras and sessions in one place for easy access.
                </p>

                {/* ── Saved Mudras Section ── */}
                <AnimatePresence mode="wait">
                    {activeTab === "mudras" && (
                        <motion.div
                            key="mudras"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-[15px] font-semibold" style={{ color: textColor }}>
                                    Saved Mudras
                                </h2>
                                <button 
                                    className="text-[12px] font-medium transition-opacity hover:opacity-70" 
                                    style={{ color: dark ? "var(--gray-400)" : "var(--gray-500)" }}
                                >
                                    View All
                                </button>
                            </div>

                            {savedMudras.length === 0 ? (
                                <p className="text-[12px] py-6 text-center" style={{ color: dark ? "var(--gray-500)" : "var(--gray-400)" }}>
                                    No saved mudras yet.
                                </p>
                            ) : (
                                <>
                                    <div ref={containerRef} className="relative">
                                        <div
                                            ref={scrollRef}
                                            onScroll={handleScroll}
                                            className={`
                                                flex gap-3 pb-1 -mx-1 px-1 scrollbar-hide
                                                ${needsScroll ? 'overflow-x-auto' : 'overflow-x-visible flex-wrap justify-center'}
                                            `}
                                            style={{ 
                                                scrollSnapType: needsScroll ? "x mandatory" : "none",
                                            }}
                                        >
                                            {savedMudras.map((m, i) => (
                                                <div 
                                                    key={m.id} 
                                                    style={{ 
                                                        scrollSnapAlign: needsScroll ? "start" : "none",
                                                        flexShrink: needsScroll ? 0 : 1,
                                                    }}
                                                >
                                                    <SavedMudraCard
                                                        mudra={m}
                                                        dark={dark}
                                                        textColor={textColor}
                                                        index={i}
                                                        onUnsave={(id) => setSavedMudras((prev) => prev.filter((x) => x.id !== id))}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {needsScroll && (
                                        <div className="flex justify-center gap-1.5 mt-3">
                                            {savedMudras.map((_, i) => (
                                                <span
                                                    key={i}
                                                    className="h-1.5 rounded-full transition-all"
                                                    style={{
                                                        width: i === activeDot ? 14 : 6,
                                                        backgroundColor: i === activeDot ? textColor : dark ? "var(--gray-700)" : "var(--gray-300)",
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Saved Nidras Section ── */}
                <AnimatePresence mode="wait">
                    {activeTab === "nidras" && (
                        <motion.div
                            key="nidras"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="mt-6"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-[15px] font-semibold" style={{ color: textColor }}>
                                    Saved Nidras
                                </h2>
                                <button 
                                    className="text-[12px] font-medium transition-opacity hover:opacity-70" 
                                    style={{ color: dark ? "var(--gray-400)" : "var(--gray-500)" }}
                                >
                                    View All
                                </button>
                            </div>

                            {savedNidras.length === 0 ? (
                                <p className="text-[12px] py-6 text-center" style={{ color: dark ? "var(--gray-500)" : "var(--gray-400)" }}>
                                    No saved nidras yet.
                                </p>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                    {savedNidras.map((n, i) => (
                                        <SavedNidraCard
                                            key={n.id}
                                            nidra={n}
                                            dark={dark}
                                            textColor={textColor}
                                            index={i}
                                            onUnsave={(id) => setSavedNidras((prev) => prev.filter((x) => x.id !== id))}
                                        />
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Sessions Section (shown with both tabs) ── */}
                <div className="mt-9">
                    <div className="flex items-center justify-between mb-1">
                        <h2 className="text-[15px] font-semibold" style={{ color: textColor }}>
                            Saved Sessions
                        </h2>
                        <button 
                            className="text-[12px] font-medium transition-opacity hover:opacity-70" 
                            style={{ color: dark ? "var(--gray-400)" : "var(--gray-500)" }}
                        >
                            View All
                        </button>
                    </div>

                    {savedSessions.length === 0 ? (
                        <p className="text-[12px] py-6 text-center" style={{ color: dark ? "var(--gray-500)" : "var(--gray-400)" }}>
                            No saved sessions yet.
                        </p>
                    ) : (
                        <div>
                            {savedSessions.map((s, i) => (
                                <SavedSessionRow
                                    key={s.id}
                                    session={s}
                                    dark={dark}
                                    textColor={textColor}
                                    index={i}
                                    onUnsave={(id) => setSavedSessions((prev) => prev.filter((x) => x.id !== id))}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* ── Tip banner ── */}
                <div
                    className="flex items-center gap-3 mt-8 p-4 rounded-2xl"
                    style={{ backgroundColor: dark ? "rgba(139,92,246,0.12)" : "var(--holistic-bg)" }}
                >
                    <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: dark ? "rgba(139,92,246,0.2)" : "#e9dcff" }}>
                        <BookmarkIcon filled={false} className="w-4 h-4" />
                    </span>
                    <p className="text-[11px] leading-relaxed" style={{ color: dark ? "var(--gray-300)" : "var(--gray-600)" }}>
                        <span className="font-semibold" style={{ color: textColor }}>Tip:</span> Save your favourite mudras, nidras and sessions to build your personal wellness library.
                    </p>
                </div>
            </div>
        </section>
    );
}