"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { typography, btn, spacing } from "../../theme";
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

// ── SVG Icons ──────────────────────────────────────────────────
function InfoIcon({ color }) {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="8.5" strokeWidth="2.5" />
            <line x1="12" y1="12" x2="12" y2="16" />
        </svg>
    );
}

function HelpIcon({ color }) {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2.5" />
        </svg>
    );
}

function ShieldIcon({ color }) {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 12 11 14 15 10" />
        </svg>
    );
}

function DocumentIcon({ color }) {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="8" y1="13" x2="16" y2="13" />
            <line x1="8" y1="17" x2="13" y2="17" />
        </svg>
    );
}

function ChevronRightIcon({ color }) {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color }}>
            <path d="M9 18l6-6-6-6" />
        </svg>
    );
}

function LogOutIcon({ color }) {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: color || "#ffffff" }}>
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
    );
}

// ── Detail Modal ───────────────────────────────────────────────
function DetailModal({ isOpen, onClose, title, content, icon, dark, textColor }) {
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
                <div className="flex items-center justify-between px-6 py-4 border-b shrink-0" style={{
                    borderColor: dark ? "#374151" : "#e5e7eb",
                }}>
                    <motion.div 
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                    >
                        <motion.div 
                            className="w-10 h-10 rounded-full flex items-center justify-center" 
                            style={{
                                backgroundColor: textColor + "20",
                            }}
                            whileHover={{
                                scale: 1.1,
                                rotate: 5,
                                transition: { duration: 0.2 }
                            }}
                        >
                            {icon}
                        </motion.div>
                        <h3 className="text-lg font-semibold" style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>{title}</h3>
                    </motion.div>
                    <motion.button 
                        onClick={onClose} 
                        className="p-1 rounded-full transition-colors"
                        style={{
                            hover: { backgroundColor: dark ? "#374151" : "#f3f4f6" },
                        }}
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
                </div>

                {/* Content */}
                <motion.div 
                    className="flex-1 overflow-y-auto p-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.3 }}
                >
                    <div className="prose prose-sm max-w-none" style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>
                        {content}
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.div 
                    className="px-6 py-4 border-t shrink-0 flex justify-end" 
                    style={{
                        borderColor: dark ? "#374151" : "#e5e7eb",
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                >
                    <motion.button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        style={{
                            backgroundColor: textColor,
                            color: "#ffffff",
                        }}
                        whileHover={{
                            scale: 1.05,
                            opacity: 0.85,
                            boxShadow: `0 4px 20px ${textColor}40`,
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

// ── Menu items ─────────────────────────────────────────────────
const MORE_ITEMS = [
    { 
        id: "about", 
        icon: "info", 
        label: "About Mudras",
        title: "About Mudras",
        content: (dark, textColor) => (
            <div className="space-y-4">
                <div className="w-full h-40 relative rounded-lg overflow-hidden" style={{
                    backgroundColor: dark ? "#374151" : "#f3f4f6",
                }}>
                    <Image 
                        src={IMAGES.MudrasAbout || IMAGES.MudrasImage} 
                        alt="About Mudras" 
                        fill 
                        className="object-cover"
                    />
                </div>
                <p className="leading-relaxed" style={{ color: dark ? "#9ca3af" : "#4b5563" }}>
                    Mudras are ancient hand gestures used in yoga and meditation to channel energy and promote healing. 
                    Each mudra has a specific meaning and benefit, connecting mind, body, and spirit.
                </p>
                <div className="rounded-lg p-4" style={{
                    backgroundColor: dark ? "#374151" : "#f3f4f6",
                }}>
                    <h4 className="font-semibold mb-2" style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>Key Benefits:</h4>
                    <ul className="space-y-2 text-sm" style={{ color: dark ? "#9ca3af" : "#4b5563" }}>
                        <li>• Balance the body's energy flow</li>
                        <li>• Enhance meditation and focus</li>
                        <li>• Promote physical and mental healing</li>
                        <li>• Connect with ancient wisdom traditions</li>
                    </ul>
                </div>
            </div>
        )
    },
    { 
        id: "help", 
        icon: "help", 
        label: "Help & Support",
        title: "Help & Support",
        content: (dark, textColor) => (
            <div className="space-y-4">
                <div className="rounded-lg p-4 space-y-3" style={{
                    backgroundColor: dark ? "#374151" : "#f3f4f6",
                }}>
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{
                            backgroundColor: textColor + "20",
                        }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: textColor }}>
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0 1 22 16.92z"/>
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-semibold" style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>Contact Support</h4>
                            <p className="text-sm" style={{ color: dark ? "#9ca3af" : "#4b5563" }}>support@mudras.com</p>
                            <p className="text-sm" style={{ color: dark ? "#9ca3af" : "#4b5563" }}>+1 (555) 123-4567</p>
                        </div>
                    </div>
                    <div className="h-px" style={{ backgroundColor: dark ? "#4b5563" : "#e5e7eb" }} />
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{
                            backgroundColor: textColor + "20",
                        }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: textColor }}>
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-semibold" style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>FAQs</h4>
                            <p className="text-sm" style={{ color: dark ? "#9ca3af" : "#4b5563" }}>Visit our FAQ page for quick answers</p>
                        </div>
                    </div>
                    <div className="h-px" style={{ backgroundColor: dark ? "#4b5563" : "#e5e7eb" }} />
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{
                            backgroundColor: textColor + "20",
                        }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: textColor }}>
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="12" y1="8" x2="12" y2="12"/>
                                <line x1="12" y1="16" x2="12.01" y2="16"/>
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-semibold" style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>Live Chat</h4>
                            <p className="text-sm" style={{ color: dark ? "#9ca3af" : "#4b5563" }}>Available 24/7 for immediate assistance</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    { 
        id: "privacy", 
        icon: "shield", 
        label: "Privacy Policy",
        title: "Privacy Policy",
        content: (dark, textColor) => (
            <div className="space-y-4">
                <div className="w-full h-32 relative rounded-lg overflow-hidden" style={{
                    backgroundColor: dark ? "#374151" : "#f3f4f6",
                }}>
                    <Image 
                        src={IMAGES.PrivacyPolicy || IMAGES.Shield} 
                        alt="Privacy Policy" 
                        fill 
                        className="object-cover"
                    />
                </div>
                <h4 className="font-semibold" style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>Your Privacy Matters</h4>
                <p className="text-sm leading-relaxed" style={{ color: dark ? "#9ca3af" : "#4b5563" }}>
                    We take your privacy seriously. This policy describes how we collect, use, and protect your personal information.
                </p>
                <div className="rounded-lg p-4 space-y-2 text-sm" style={{
                    backgroundColor: dark ? "#374151" : "#f3f4f6",
                }}>
                    <div className="flex items-center gap-2" style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>
                        <span style={{ color: textColor }}>✓</span>
                        <span>We never share your data with third parties</span>
                    </div>
                    <div className="flex items-center gap-2" style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>
                        <span style={{ color: textColor }}>✓</span>
                        <span>You can delete your data at any time</span>
                    </div>
                    <div className="flex items-center gap-2" style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>
                        <span style={{ color: textColor }}>✓</span>
                        <span>All data is encrypted and secure</span>
                    </div>
                    <div className="flex items-center gap-2" style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>
                        <span style={{ color: textColor }}>✓</span>
                        <span>We comply with GDPR and CCPA regulations</span>
                    </div>
                </div>
                <p className="text-sm" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>Last updated: January 2024</p>
            </div>
        )
    },
    { 
        id: "terms", 
        icon: "document", 
        label: "Terms of Use",
        title: "Terms of Use",
        content: (dark, textColor) => (
            <div className="space-y-4">
                <div className="w-full h-32 relative rounded-lg overflow-hidden" style={{
                    backgroundColor: dark ? "#374151" : "#f3f4f6",
                }}>
                    <Image 
                        src={IMAGES.TermsConditions || IMAGES.DocumentIcon} 
                        alt="Terms of Use" 
                        fill 
                        className="object-cover"
                    />
                </div>
                <h4 className="font-semibold" style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>Terms & Conditions</h4>
                <p className="text-sm leading-relaxed" style={{ color: dark ? "#9ca3af" : "#4b5563" }}>
                    By using Mudras, you agree to these terms. Please read them carefully before using our services.
                </p>
                <div className="rounded-lg p-4 space-y-2 text-sm" style={{
                    backgroundColor: dark ? "#374151" : "#f3f4f6",
                }}>
                    <div className="flex items-center gap-2" style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>
                        <span style={{ color: textColor }}>•</span>
                        <span>You must be 13 years or older to use this app</span>
                    </div>
                    <div className="flex items-center gap-2" style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>
                        <span style={{ color: textColor }}>•</span>
                        <span>All content is for educational and wellness purposes</span>
                    </div>
                    <div className="flex items-center gap-2" style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>
                        <span style={{ color: textColor }}>•</span>
                        <span>We reserve the right to update these terms</span>
                    </div>
                    <div className="flex items-center gap-2" style={{ color: dark ? "#e5e7eb" : "#1f2937" }}>
                        <span style={{ color: textColor }}>•</span>
                        <span>Your account is personal and non-transferable</span>
                    </div>
                </div>
                <p className="text-sm" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>Last updated: January 2024</p>
            </div>
        )
    },
];

// ── Main Component ─────────────────────────────────────────────
export default function MoreCard({ onNavPress, onLogOut }) {
    const { dark, textColor } = useTheme();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { 
        once: true, 
        amount: 0.1,
        margin: "-50px"
    });

    const [modalState, setModalState] = useState({
        isOpen: false,
        title: "",
        content: null,
        icon: null,
    });

    const iconColor = dark ? "#9ca3af" : "#6b7280";

    const ICON_MAP = {
        info: <InfoIcon color={iconColor} />,
        help: <HelpIcon color={iconColor} />,
        shield: <ShieldIcon color={iconColor} />,
        document: <DocumentIcon color={iconColor} />,
    };

    const openModal = (item) => {
        setModalState({
            isOpen: true,
            title: item.title,
            content: item.content(dark, textColor),
            icon: ICON_MAP[item.icon],
        });
    };

    const closeModal = () => {
        setModalState({
            isOpen: false,
            title: "",
            content: null,
            icon: null,
        });
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

    // Staggered menu items
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

    const headingText = "More";
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
                    {/* ── Section label ── */}
                    <motion.h2
                        className={`${typography.founderStory.subheading} font-bold !mb-3`}
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

                    {/* ── Nav card ── */}
                    <motion.div 
                        className="w-full border rounded-2xl overflow-hidden mb-4" 
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
                        {MORE_ITEMS.map((item, idx) => (
                            <motion.div 
                                key={item.id}
                                custom={idx}
                                variants={itemVariants}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                            >
                                <motion.button
                                    onClick={() => {
                                        openModal(item);
                                        onNavPress?.(item.id);
                                    }}
                                    className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4 transition-colors cursor-pointer text-left"
                                    style={{
                                        hover: { backgroundColor: dark ? "#374151" : "#f9fafb" },
                                    }}
                                    whileHover={{
                                        scale: 1.01,
                                        backgroundColor: dark ? "#374151" : "#f9fafb",
                                        transition: { duration: 0.2 }
                                    }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    {/* Icon circle */}
                                    <motion.div 
                                        className="w-11 h-11 rounded-full border flex items-center justify-center shrink-0" 
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
                                        {ICON_MAP[item.icon]}
                                    </motion.div>

                                    {/* Label */}
                                    <motion.span
                                        className={`${typography.sessionCardTitle} font-semibold flex-1`}
                                        style={{ color: dark ? "#e5e7eb" : "#1f2937" }}
                                        whileHover={{
                                            scale: 1.02,
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        {item.label}
                                    </motion.span>

                                    {/* Chevron */}
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

                                {/* Divider — skip after last */}
                                {idx < MORE_ITEMS.length - 1 && (
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

                    {/* ── Log Out button ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <motion.button
                            onClick={onLogOut}
                            className="w-full flex items-center justify-center gap-2.5 rounded-2xl py-4 sm:py-5 text-sm sm:text-base font-semibold transition-colors cursor-pointer"
                            style={{
                                backgroundColor: textColor,
                                color: "#ffffff",
                            }}
                            whileHover={{
                                scale: 1.02,
                                opacity: 0.85,
                                boxShadow: `0 8px 30px ${textColor}40`,
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <LogOutIcon color="#ffffff" />
                            Log Out
                        </motion.button>
                    </motion.div>
                </motion.div>
            </motion.section>

            {/* ── Detail Modal ── */}
            <DetailModal
                isOpen={modalState.isOpen}
                onClose={closeModal}
                title={modalState.title}
                content={modalState.content}
                icon={modalState.icon}
                dark={dark}
                textColor={textColor}
            />
        </>
    );
}