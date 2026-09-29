"use client";

import Image from "next/image";
import { Clock, Play, MoreVertical, Pause, AlertCircle } from "lucide-react";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import { IMAGES } from "../../assets/assets";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";

// ─── Data ─────────────────────────────────────────────────────
const SCHEDULE_DATA = {
    today: [
        {
            id: "anjali-mudra",
            title: "Anjali Mudra Meditation",
            badge: "Mudra Meditation",
            description: "For gratitude & inner peace",
            duration: "10 min",
            time: "7:30 AM",
            image: IMAGES.HapplyMudra,
            bg: { light: "var(--benefit-3)", dark: "#1B2E44" },
        },
        {
            id: "deep-rest",
            title: "Deep Rest & Relaxation",
            badge: "Yoga Nidra",
            description: "Evening deep relaxation",
            duration: "28 min",
            time: "9:15 PM",
            image: IMAGES.BetterSleep,
            bg: { light: "var(--benefit-5)", dark: "#1D3A28" },
        },
        {
            id: "water-element",
            title: "Water Element Balance",
            badge: "Element Tracker",
            description: "Balanced",
            descriptionIcon: "💧",
            duration: "5 min",
            time: "7:30 AM",
            image: IMAGES.WaterElement,
            bg: { light: "var(--benefit-4)", dark: "#3A2130" },
        },
    ],
    yesterday: [
        {
            id: "morning-meditation",
            title: "Morning Mindfulness",
            badge: "Meditation",
            description: "Start your day with clarity",
            duration: "15 min",
            time: "6:45 AM",
            image: IMAGES.Meditation,
            bg: { light: "var(--benefit-2)", dark: "#2A1B3A" },
        },
        {
            id: "evening-wind-down",
            title: "Evening Wind Down",
            badge: "Yoga Nidra",
            description: "Gentle relaxation for better sleep",
            duration: "20 min",
            time: "10:00 PM",
            image: IMAGES.Relaxation,
            bg: { light: "var(--benefit-1)", dark: "#1A2A3A" },
        },
    ],
    earlierThisWeek: [
        {
            id: "monday-mudra",
            title: "Monday Mudra Practice",
            badge: "Mudra Meditation",
            description: "Chin Mudra for grounding",
            duration: "12 min",
            time: "8:00 AM",
            image: IMAGES.gyanMudra,
            bg: { light: "var(--benefit-1)", dark: "#2A1A2A" },
        },
        {
            id: "wednesday-yoga",
            title: "Midweek Yoga Nidra",
            badge: "Yoga Nidra",
            description: "Deep rest for midweek renewal",
            duration: "30 min",
            time: "7:30 PM",
            image: IMAGES.YogaNidraImage,
            bg: { light: "var(--benefit-4)", dark: "#1A2A2A" },
        },
        {
            id: "friday-element",
            title: "Fire Element Balance",
            badge: "Element Tracker",
            description: "Ignite your inner fire",
            duration: "8 min",
            time: "7:00 AM",
            image: IMAGES.FireElement,
            bg: { light: "var(--benefit-3)", dark: "#3A1A1A" },
        },
    ],
};

// ─── Menu Icons Mapping ─────────────────────────────────────
const MENU_ITEMS = [
    { key: "View Details", icon: IMAGES.Info },
    { key: "Schedule", icon: IMAGES.calendar },
    { key: "Add to Playlist", icon: IMAGES.HeadPhone },
    { key: "Share", icon: IMAGES.InstagramIcon },
    { key: "Download", icon: IMAGES.Battery },
];

// ─── Schedule item ──────────────────────────────────────────────
function ScheduleItem({ item, dark, isPlaying, onPlayToggle, onMenuAction, hasAudio }) {
    const [showMenu, setShowMenu] = useState(false);
    const [showError, setShowError] = useState(false);
    const menuRef = useRef(null);

    const handleMenuToggle = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    const handleMenuAction = (action) => {
        onMenuAction(action, item);
        setShowMenu(false);
    };

    const handlePlayClick = () => {
        if (!hasAudio) {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return;
        }
        onPlayToggle(item.id);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4"
            style={{ backgroundColor: dark ? item.bg.dark : item.bg.light }}
        >
            {/* Thumbnail */}
            <div className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="80px"
                    className="object-cover"
                />
                {isPlaying && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-3 h-3 flex gap-0.5">
                            <motion.div
                                animate={{ height: [8, 16, 8] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="w-1 bg-white rounded-full"
                            />
                            <motion.div
                                animate={{ height: [12, 20, 12] }}
                                transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                                className="w-1 bg-white rounded-full"
                            />
                            <motion.div
                                animate={{ height: [6, 14, 6] }}
                                transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                                className="w-1 bg-white rounded-full"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap mb-0.5 sm:mb-1">
                    <h3
                        className="text-[13px] sm:text-base font-semibold truncate"
                        style={{ color: dark ? "#f3f4f6" : "#111827" }}
                    >
                        {item.title}
                    </h3>
                    <span
                        className="text-[9px] sm:text-[11px] font-medium px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border shrink-0"
                        style={{
                            backgroundColor: dark ? "rgba(255,255,255,0.08)" : "#ffffff",
                            borderColor: dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)",
                            color: dark ? "#e5e7eb" : "#374151",
                        }}
                    >
                        {item.badge}
                    </span>
                </div>

                <p
                    className="text-[11px] sm:text-sm mb-1 flex items-center gap-1"
                    style={{ color: dark ? "#d1d5db" : "#4b5563" }}
                >
                    {item.description}
                    {item.descriptionIcon && <span>{item.descriptionIcon}</span>}
                </p>

                <div
                    className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[13px]"
                    style={{ color: dark ? "#9ca3af" : "#6b7280" }}
                >
                    <Clock size={11} className="sm:w-[13px] sm:h-[13px]" />
                    <span>{item.duration}</span>
                    <span className="opacity-60">&bull;</span>
                    <span>{item.time}</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                <div className="relative">
                    <motion.button
                        type="button"
                        aria-label={isPlaying ? `Pause ${item.title}` : `Play ${item.title}`}
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-transform hover:scale-105 cursor-pointer ${
                            !hasAudio ? 'opacity-50' : ''
                        }`}
                        style={{ backgroundColor: dark ? "rgba(0,0,0,0.55)" : "rgba(55,65,81,0.85)" }}
                        whileHover={{ scale: hasAudio ? 1.05 : 1 }}
                        whileTap={{ scale: hasAudio ? 0.95 : 1 }}
                        onClick={handlePlayClick}
                        disabled={!hasAudio}
                    >
                        {isPlaying ? (
                            <Pause size={13} className="sm:w-[15px] sm:h-[15px] text-white" />
                        ) : (
                            <Play size={13} className="sm:w-[15px] sm:h-[15px] text-white fill-white ml-0.5" />
                        )}
                    </motion.button>

                    {/* Error Toast */}
                    <AnimatePresence>
                        {showError && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium"
                                style={{
                                    backgroundColor: dark ? "#ef4444" : "#dc2626",
                                    color: "#ffffff",
                                }}
                            >
                                <span className="flex items-center gap-1.5">
                                    <AlertCircle size={12} />
                                    Audio not available
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="relative">
                    <motion.button
                        type="button"
                        aria-label={`More options for ${item.title}`}
                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleMenuToggle}
                    >
                        <MoreVertical size={16} className="sm:w-[18px] sm:h-[18px]" style={{ color: dark ? "#9ca3af" : "#374151" }} />
                    </motion.button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                        {showMenu && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 top-full mt-2 w-56 rounded-xl shadow-lg z-50 overflow-hidden"
                                    style={{
                                        backgroundColor: dark ? "#1f2937" : "#ffffff",
                                        border: dark ? "1px solid #374151" : "1px solid #e5e7eb",
                                    }}
                                    ref={menuRef}
                                >
                                    <div className="py-1">
                                        {MENU_ITEMS.map((menuItem) => (
                                            <button
                                                key={menuItem.key}
                                                className="w-full px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-black/5 transition-colors text-left"
                                                style={{ color: dark ? "#e5e7eb" : "#374151" }}
                                                onClick={() => handleMenuAction(menuItem.key)}
                                            >
                                                <div className="relative w-5 h-5 shrink-0">
                                                    <Image
                                                        src={menuItem.icon}
                                                        alt={menuItem.key}
                                                        fill
                                                        sizes="20px"
                                                        className="object-contain"
                                                        style={{
                                                            filter: dark ? 'brightness(0) invert(1)' : 'none'
                                                        }}
                                                    />
                                                </div>
                                                <span>{menuItem.key}</span>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Backdrop */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 z-40"
                                    onClick={() => setShowMenu(false)}
                                />
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}

// ─── Section Component ──────────────────────────────────────
function ScheduleSection({ title, items, dark, playingId, onPlayToggle, onMenuAction, hasAudioFile }) {
    if (!items || items.length === 0) return null;

    return (
        <div className="mb-6 sm:mb-8 last:mb-0">
            <motion.h3
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-base sm:text-lg font-semibold mb-3 sm:mb-4"
                style={{ color: dark ? "#e5e7eb" : "#1f2937" }}
            >
                {title}
            </motion.h3>
            <div className="flex flex-col gap-3 sm:gap-4">
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <ScheduleItem
                            item={item}
                            dark={dark}
                            isPlaying={playingId === item.id}
                            onPlayToggle={onPlayToggle}
                            onMenuAction={onMenuAction}
                            hasAudio={hasAudioFile(item)}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// ─── Main component ────────────────────────────────────────────
export default function TodaySchedule() {
    const { dark, textColor } = useTheme();
    const [playingId, setPlayingId] = useState(null);
    const [audioElement, setAudioElement] = useState(null);

    const hasAudioFile = (item) => {
        return item.audioUrl !== undefined && item.audioUrl !== null;
    };

    const handlePlayToggle = (id) => {
        const item = [...SCHEDULE_DATA.today, ...SCHEDULE_DATA.yesterday, ...SCHEDULE_DATA.earlierThisWeek]
            .find(s => s.id === id);
        
        if (!item?.audioUrl) {
            console.warn('No audio URL for this item');
            return;
        }

        if (playingId === id) {
            if (audioElement) {
                audioElement.pause();
                audioElement.currentTime = 0;
            }
            setPlayingId(null);
            setAudioElement(null);
            return;
        }

        if (audioElement) {
            audioElement.pause();
            audioElement.currentTime = 0;
        }

        try {
            const audio = new Audio(item.audioUrl);
            
            audio.onended = () => {
                setPlayingId(null);
                setAudioElement(null);
            };

            audio.onerror = (e) => {
                console.error('Audio loading error:', e);
                setPlayingId(null);
                setAudioElement(null);
            };

            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        setAudioElement(audio);
                        setPlayingId(id);
                    })
                    .catch(error => {
                        console.error('Error playing audio:', error);
                        if (error.name === 'NotAllowedError') {
                            alert('Please interact with the page first to play audio.');
                        } else if (error.name === 'NotSupportedError') {
                            alert('Audio format not supported by your browser.');
                        } else {
                            alert(`Unable to play audio: ${error.message}`);
                        }
                        setPlayingId(null);
                        setAudioElement(null);
                    });
            }
        } catch (error) {
            console.error('Error creating audio:', error);
            alert('Unable to play audio. Please try again later.');
            setPlayingId(null);
            setAudioElement(null);
        }
    };

    const handleMenuAction = (action, item) => {
        console.log(`Action: ${action} on ${item.title}`);
        switch (action) {
            case "View Details":
                break;
            case "Schedule":
                break;
            case "Add to Playlist":
                break;
            case "Share":
                if (navigator.share) {
                    navigator.share({
                        title: item.title,
                        text: `Check out ${item.title} - ${item.description}`,
                    }).catch(console.error);
                } else {
                    navigator.clipboard?.writeText(`${item.title}: ${item.description}`)
                        .then(() => alert('Copied to clipboard!'))
                        .catch(console.error);
                }
                break;
            case "Download":
                if (item.audioUrl) {
                    try {
                        const link = document.createElement('a');
                        link.href = item.audioUrl;
                        link.download = `${item.title}.mp3`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    } catch (error) {
                        console.error('Error downloading:', error);
                        alert('Unable to download audio.');
                    }
                } else {
                    alert('No audio available for download.');
                }
                break;
            default:
                break;
        }
    };

    const allItems = [...SCHEDULE_DATA.today, ...SCHEDULE_DATA.yesterday, ...SCHEDULE_DATA.earlierThisWeek];
    const hasAnyAudio = allItems.some(item => hasAudioFile(item));

    return (
        <div
            className={`w-full ${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`}
            style={{ backgroundColor: dark ? "#020202" : "#ffffff" }}
        >
            <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${typography.sectionSbHeading} mb-4 sm:mb-6`}
                style={{ color: textColor }}
            >
                Your Schedule
            </motion.h2>

            <div className="flex flex-col">
                <ScheduleSection
                    title="Today"
                    items={SCHEDULE_DATA.today}
                    dark={dark}
                    playingId={playingId}
                    onPlayToggle={handlePlayToggle}
                    onMenuAction={handleMenuAction}
                    hasAudioFile={hasAudioFile}
                />

                <ScheduleSection
                    title="Yesterday"
                    items={SCHEDULE_DATA.yesterday}
                    dark={dark}
                    playingId={playingId}
                    onPlayToggle={handlePlayToggle}
                    onMenuAction={handleMenuAction}
                    hasAudioFile={hasAudioFile}
                />

                <ScheduleSection
                    title="Earlier This Week"
                    items={SCHEDULE_DATA.earlierThisWeek}
                    dark={dark}
                    playingId={playingId}
                    onPlayToggle={handlePlayToggle}
                    onMenuAction={handleMenuAction}
                    hasAudioFile={hasAudioFile}
                />
            </div>
        </div>
    );
}