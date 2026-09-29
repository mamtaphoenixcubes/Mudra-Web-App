"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { typography, spacing } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";

// ── Close Icon ──────────────────────────────────────────────────
function CloseIcon({ dark }) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}

// ── Check Icon ──────────────────────────────────────────────────
function CheckIcon({ color }) {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}

// ── Icon Renderer ──────────────────────────────────────────────
function PreferenceIcon({ iconKey, dark }) {
    const iconMap = {
        moon: IMAGES.SleepBetter,
        sound: IMAGES.Volume,
        globe: IMAGES.GLOBE,
        clock: IMAGES.Clock,
        play: IMAGES.PlayCircle || IMAGES.BellIcon,
        download: IMAGES.OfflineAccess || IMAGES.BellIcon,
        theme: IMAGES.BellIcon,
        language: IMAGES.GLOBE,
        reminders: IMAGES.Clock,
        wifi: IMAGES.Battery,
    };

    const src = iconMap[iconKey] || IMAGES.BellIcon;

    return (
        <motion.div 
            className="w-11 h-11 rounded-full border flex items-center justify-center shrink-0 overflow-hidden" 
            style={{
                borderColor: dark ? "#374151" : "#e5e7eb",
                backgroundColor: dark ? "#374151" : "#ffffff",
            }}
            whileHover={{
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.2 }
            }}
        >
            <div className="w-5 h-5 relative">
                <Image
                    src={src}
                    alt="Icon"
                    fill
                    className="object-contain"
                    style={{
                        filter: dark ? "brightness(0.8) invert(1)" : "none",
                    }}
                />
            </div>
        </motion.div>
    );
}

// ── Chevron Icon ──────────────────────────────────────────────
function ChevronRightIcon({ color }) {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
            <path d="M9 18l6-6-6-6" />
        </svg>
    );
}

// ── Toggle ─────────────────────────────────────────────────────
function Toggle({ enabled, onChange, dark }) {
    return (
        <motion.button
            role="switch"
            aria-checked={enabled}
            onClick={onChange}
            className={`
                relative inline-flex items-center
                w-11 h-6 rounded-full shrink-0
                transition-colors duration-200 cursor-pointer
            `}
            style={{
                backgroundColor: enabled ? "#374151" : (dark ? "#4b5563" : "#d1d5db"),
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <motion.span
                className={`
                    inline-block w-5 h-5 rounded-full shadow
                    transform transition-transform duration-200
                    ${enabled ? "translate-x-5" : "translate-x-0.5"}
                `}
                style={{
                    backgroundColor: enabled ? (dark ? "#e5e7eb" : "#ffffff") : "#ffffff",
                }}
                animate={{ x: enabled ? 20 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
        </motion.button>
    );
}

// ── Advanced Modal Component ──────────────────────────────────
function AdvancedModal({ 
    isOpen, 
    onClose, 
    title, 
    options, 
    selectedValue, 
    onSelect,
    description,
    icon,
    dark,
    textColor
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const modalRef = useRef(null);

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen && modalRef.current) {
            const focusable = modalRef.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusable.length) focusable[0].focus();
        }
    }, [isOpen]);

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
                ref={modalRef}
                className="rounded-2xl w-full max-w-md shadow-xl max-h-[90vh] flex flex-col"
                style={{
                    backgroundColor: dark ? "#1f2937" : "#ffffff",
                }}
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
                    className="flex items-center justify-between px-6 py-4 border-b shrink-0" 
                    style={{
                        borderColor: dark ? "#374151" : "#e5e7eb",
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                >
                    <div className="flex items-center gap-3">
                        {icon && (
                            <motion.div 
                                className="w-8 h-8 relative"
                                whileHover={{
                                    scale: 1.1,
                                    rotate: 5,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <Image src={icon} alt={title} fill className="object-contain" style={{
                                    filter: dark ? "brightness(0.8) invert(1)" : "none",
                                }} />
                            </motion.div>
                        )}
                        <div>
                            <h3 className="text-lg font-semibold" style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>{title}</h3>
                            {description && (
                                <p className="text-xs mt-0.5" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>{description}</p>
                            )}
                        </div>
                    </div>
                    <motion.button 
                        onClick={onClose} 
                        className="p-1 rounded-full transition-colors"
                        whileHover={{
                            scale: 1.1,
                            rotate: 90,
                            backgroundColor: dark ? "#374151" : "#f3f4f6",
                            transition: { duration: 0.3 }
                        }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Close"
                    >
                        <CloseIcon dark={dark} />
                    </motion.button>
                </motion.div>

                {/* Search */}
                {options.length > 6 && (
                    <motion.div 
                        className="px-6 py-3 border-b shrink-0" 
                        style={{
                            borderColor: dark ? "#374151" : "#e5e7eb",
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15, duration: 0.3 }}
                    >
                        <motion.input
                            type="text"
                            placeholder="Search options..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 transition"
                            style={{
                                backgroundColor: dark ? "#374151" : "#ffffff",
                                borderColor: dark ? "#4b5563" : "#e5e7eb",
                                color: dark ? "#e5e7eb" : "#1f2937",
                            }}
                            whileFocus={{
                                scale: 1.02,
                                borderColor: textColor,
                                boxShadow: `0 0 0 3px ${textColor}30`,
                                transition: { duration: 0.2 }
                            }}
                            autoFocus
                        />
                    </motion.div>
                )}

                {/* Options */}
                <motion.div 
                    className="flex-1 overflow-y-auto p-6 space-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                >
                    {filteredOptions.length === 0 ? (
                        <div className="text-center py-8 text-sm" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>
                            No options found
                        </div>
                    ) : (
                        filteredOptions.map((option, index) => (
                            <motion.button
                                key={option.id}
                                onClick={() => {
                                    onSelect(option.id);
                                    onClose();
                                }}
                                className={`
                                    w-full flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-all group
                                `}
                                style={{
                                    borderColor: selectedValue === option.id ? textColor : (dark ? "#374151" : "#e5e7eb"),
                                    backgroundColor: selectedValue === option.id ? textColor + "10" : "transparent",
                                }}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.04 + 0.25, duration: 0.3 }}
                                whileHover={{
                                    scale: 1.02,
                                    borderColor: dark ? "#4b5563" : "#d1d5db",
                                    backgroundColor: dark ? "#374151" : "#f9fafb",
                                    transition: { duration: 0.2 }
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {option.icon && (
                                    <span className="text-2xl">{option.icon}</span>
                                )}
                                {option.image && (
                                    <div className="w-6 h-6 relative">
                                        <Image src={option.image} alt={option.label} fill className="object-contain" />
                                    </div>
                                )}
                                <span className={`text-sm font-medium flex-1 text-left ${
                                    selectedValue === option.id ? "text-primary" : (dark ? "text-gray-300" : "text-gray-900")
                                }`}>
                                    {option.label}
                                </span>
                                {option.badge && (
                                    <span className="px-2 py-0.5 text-xs font-medium rounded-full" style={{
                                        backgroundColor: textColor + "20",
                                        color: textColor,
                                    }}>
                                        {option.badge}
                                    </span>
                                )}
                                {option.description && (
                                    <span className="text-xs" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>{option.description}</span>
                                )}
                                {selectedValue === option.id && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 20 }}
                                    >
                                        <CheckIcon color={textColor} />
                                    </motion.span>
                                )}
                            </motion.button>
                        ))
                    )}
                </motion.div>

                {/* Footer */}
                <motion.div 
                    className="px-6 py-4 border-t shrink-0 flex justify-end" 
                    style={{
                        borderColor: dark ? "#374151" : "#e5e7eb",
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                >
                    <motion.button
                        onClick={onClose}
                        className="px-4 py-2 text-sm transition-colors"
                        style={{ color: dark ? "#9ca3af" : "#6b7280" }}
                        whileHover={{
                            scale: 1.05,
                            color: dark ? "#e5e7eb" : "#1f2937",
                            transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Close
                    </motion.button>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

// ── Row types ──────────────────────────────────────────────────
const PREFERENCE_ITEMS = [
    {
        id: "theme",
        icon: "moon",
        title: "Theme",
        subtitle: "Light",
        type: "nav",
        modal: "theme",
    },
    {
        id: "sound",
        icon: "sound",
        title: "Sound & Music",
        subtitle: "Ambient sound on",
        type: "nav",
        modal: "sound",
    },
    {
        id: "language",
        icon: "globe",
        title: "Language",
        subtitle: "English",
        type: "nav",
        modal: "language",
    },
    {
        id: "sessionReminders",
        icon: "clock",
        title: "Session Reminders",
        subtitle: "Remind me to take session",
        type: "toggle",
        defaultEnabled: true,
    },
    {
        id: "autoNext",
        icon: "play",
        title: "Auto Next Session",
        subtitle: "Automatically play next session",
        type: "toggle",
        defaultEnabled: false,
    },
    {
        id: "wifiOnly",
        icon: "download",
        title: "Download over Wi-Fi only",
        subtitle: "Save mobile data",
        type: "toggle",
        defaultEnabled: true,
    },
];

// ── Modal Configurations ──────────────────────────────────────
const MODAL_CONFIGS = {
    theme: {
        title: "Select Theme",
        description: "Choose your preferred theme",
        icon: IMAGES.SleepBetter,
        options: [
            { id: "light", label: "Light", icon: "☀️", description: "Bright and clean" },
            { id: "dark", label: "Dark", icon: "🌙", description: "Easy on the eyes" },
            { id: "system", label: "System", icon: "💻", description: "Follow system settings", badge: "Auto" },
        ],
        valueMap: {
            light: "Light",
            dark: "Dark", 
            system: "System",
        }
    },
    sound: {
        title: "Sound & Music",
        description: "Customize your audio experience",
        icon: IMAGES.Volume,
        options: [
            { id: "on", label: "Sound On", icon: "🔊", description: "All sounds enabled" },
            { id: "off", label: "Sound Off", icon: "🔇", description: "Mute all sounds" },
            { id: "ambient", label: "Ambient Only", icon: "🎵", description: "Background ambience only", badge: "Popular" },
        ],
        valueMap: {
            on: "Sound On",
            off: "Sound Off",
            ambient: "Ambient Only",
        }
    },
    language: {
        title: "Select Language",
        description: "Choose your preferred language",
        icon: IMAGES.GLOBE,
        options: [
            { id: "en", label: "English", icon: "🇬🇧", description: "English (US)" },
            { id: "es", label: "Spanish", icon: "🇪🇸", description: "Español" },
            { id: "fr", label: "French", icon: "🇫🇷", description: "Français" },
            { id: "de", label: "German", icon: "🇩🇪", description: "Deutsch" },
            { id: "hi", label: "Hindi", icon: "🇮🇳", description: "हिन्दी" },
            { id: "zh", label: "Chinese", icon: "🇨🇳", description: "中文" },
            { id: "ja", label: "Japanese", icon: "🇯🇵", description: "日本語" },
            { id: "ko", label: "Korean", icon: "🇰🇷", description: "한국어" },
        ],
        valueMap: {
            en: "English",
            es: "Spanish",
            fr: "French",
            de: "German",
            hi: "Hindi",
            zh: "Chinese",
            ja: "Japanese",
            ko: "Korean"
        }
    }
};

// ── Main Component ─────────────────────────────────────────────
export default function PreferencesCard({ onNavPress }) {
    const { dark, textColor } = useTheme();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { 
        once: true, 
        amount: 0.1,
        margin: "-50px"
    });

    const [toggleStates, setToggleStates] = useState(() =>
        Object.fromEntries(
            PREFERENCE_ITEMS.filter((i) => i.type === "toggle").map((i) => [
                i.id,
                i.defaultEnabled,
            ])
        )
    );

    const [modalState, setModalState] = useState({
        theme: { isOpen: false, value: "Light" },
        sound: { isOpen: false, value: "Ambient sound on" },
        language: { isOpen: false, value: "English" },
    });

    const handleToggle = (id) => {
        setToggleStates((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const openModal = (modalType) => {
        setModalState((prev) => ({
            ...prev,
            [modalType]: { ...prev[modalType], isOpen: true },
        }));
    };

    const closeModal = (modalType) => {
        setModalState((prev) => ({
            ...prev,
            [modalType]: { ...prev[modalType], isOpen: false },
        }));
    };

    const handleModalSelect = (modalType, value) => {
        const config = MODAL_CONFIGS[modalType];
        const label = config.valueMap[value] || value;
        setModalState((prev) => ({
            ...prev,
            [modalType]: { ...prev[modalType], value: label },
        }));
        
        try {
            localStorage.setItem(`preference_${modalType}`, value);
        } catch (e) {}
    };

    useEffect(() => {
        const saved = {};
        Object.keys(MODAL_CONFIGS).forEach(key => {
            try {
                const value = localStorage.getItem(`preference_${key}`);
                if (value) {
                    const config = MODAL_CONFIGS[key];
                    saved[key] = config.valueMap[value] || value;
                }
            } catch (e) {}
        });
        if (Object.keys(saved).length > 0) {
            setModalState(prev => ({
                ...prev,
                ...Object.keys(saved).reduce((acc, key) => ({
                    ...acc,
                    [key]: { ...prev[key], value: saved[key] }
                }), {})
            }));
        }
    }, []);

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

    // Staggered item variants
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

    const headingText = "Preferences";
    const headingChars = headingText.split("");

    const getUpdatedItems = () => {
        return PREFERENCE_ITEMS.map((item) => {
            if (item.id === "theme") {
                return { ...item, subtitle: modalState.theme.value };
            }
            if (item.id === "sound") {
                return { ...item, subtitle: modalState.sound.value };
            }
            if (item.id === "language") {
                return { ...item, subtitle: modalState.language.value };
            }
            return item;
        });
    };

    const items = getUpdatedItems();

    return (
        <>
            <motion.section
                ref={sectionRef}
                className={`
                    flex justify-center
                    ${spacing.sectionPaddingX}
                    ${spacing.sectionPaddingY}
                `}
                style={{
                    backgroundColor: dark ? "#111827" : "#ffffff",
                }}
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
                    <motion.div 
                        className="mb-3"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                    >
                        <motion.h2 
                            className={`${typography.founderStory.subheading} font-bold !mb-0`} 
                            style={{ color: textColor }}
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
                            className={`${typography.sessionCardMeta} mt-0.5`} 
                            style={{ color: dark ? "#6b7280" : "#9ca3af" }}
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        >
                            Customize your experience.
                        </motion.p>
                    </motion.div>

                    <motion.div 
                        className="w-full border rounded-2xl overflow-hidden" 
                        style={{
                            backgroundColor: dark ? "#1f2937" : "#ffffff",
                            borderColor: dark ? "#374151" : "#e5e7eb",
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        whileHover={{
                            boxShadow: dark 
                                ? "0 8px 30px rgba(0,0,0,0.3)"
                                : "0 8px 30px rgba(0,0,0,0.06)",
                            transition: { duration: 0.3 }
                        }}
                    >
                        {items.map((item, idx) => (
                            <motion.div 
                                key={item.id}
                                custom={idx}
                                variants={itemVariants}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                            >
                                {item.type === "nav" ? (
                                    <motion.button
                                        onClick={() => {
                                            if (item.modal) {
                                                openModal(item.modal);
                                            }
                                            onNavPress?.(item.id);
                                        }}
                                        className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4 transition-colors cursor-pointer text-left"
                                        whileHover={{
                                            scale: 1.01,
                                            backgroundColor: dark ? "#374151" : "#f9fafb",
                                            transition: { duration: 0.2 }
                                        }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <PreferenceIcon iconKey={item.icon} dark={dark} />
                                        <div className="flex flex-col flex-1 min-w-0">
                                            <motion.span 
                                                className={`${typography.sessionCardTitle} font-semibold`} 
                                                style={{ color: dark ? "#e5e7eb" : "#1f2937" }}
                                                whileHover={{
                                                    scale: 1.02,
                                                    transition: { duration: 0.2 }
                                                }}
                                            >
                                                {item.title}
                                            </motion.span>
                                            <span className={`${typography.sessionCardMeta} mt-0.5`} style={{ color: dark ? "#6b7280" : "#9ca3af" }}>
                                                {item.subtitle}
                                            </span>
                                        </div>
                                        <motion.span 
                                            className="shrink-0"
                                            whileHover={{
                                                x: 3,
                                                transition: { duration: 0.2 }
                                            }}
                                        >
                                            <ChevronRightIcon color={dark ? "#6b7280" : "#9ca3af"} />
                                        </motion.span>
                                    </motion.button>
                                ) : (
                                    <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4">
                                        <PreferenceIcon iconKey={item.icon} dark={dark} />
                                        <div className="flex flex-col flex-1 min-w-0">
                                            <span className={`${typography.sessionCardTitle} font-semibold`} style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>
                                                {item.title}
                                            </span>
                                            <span className={`${typography.sessionCardMeta} mt-0.5`} style={{ color: dark ? "#6b7280" : "#9ca3af" }}>
                                                {item.subtitle}
                                            </span>
                                        </div>
                                        <Toggle
                                            enabled={toggleStates[item.id]}
                                            onChange={() => handleToggle(item.id)}
                                            dark={dark}
                                        />
                                    </div>
                                )}
                                {idx < items.length - 1 && (
                                    <motion.div 
                                        className="h-px" 
                                        style={{
                                            backgroundColor: dark ? "#374151" : "#f3f4f6",
                                        }}
                                        initial={{ scaleX: 0 }}
                                        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                                        transition={{ duration: 0.4, delay: idx * 0.05 + 0.3 }}
                                    />
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.section>

            {/* ── Modals ── */}
            {Object.keys(MODAL_CONFIGS).map((key) => (
                <AdvancedModal
                    key={key}
                    isOpen={modalState[key].isOpen}
                    onClose={() => closeModal(key)}
                    title={MODAL_CONFIGS[key].title}
                    description={MODAL_CONFIGS[key].description}
                    icon={MODAL_CONFIGS[key].icon}
                    options={MODAL_CONFIGS[key].options}
                    selectedValue={Object.keys(MODAL_CONFIGS[key].valueMap).find(
                        k => MODAL_CONFIGS[key].valueMap[k] === modalState[key].value
                    ) || MODAL_CONFIGS[key].options[0]?.id}
                    onSelect={(value) => handleModalSelect(key, value)}
                    dark={dark}
                    textColor={textColor}
                />
            ))}
        </>
    );
}