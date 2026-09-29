"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { IMAGES } from "../../assets/assets";
import { spacing } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

function AppStoreBadge({ dark }) {
    return (
        <motion.a 
            href="#" 
            className="flex items-center gap-2 rounded-xl px-3 py-1.5 border transition-colors shrink-0" 
            style={{
                backgroundColor: dark ? "#1f2937" : "#000000",
                borderColor: dark ? "#374151" : "#374151",
            }}
            whileHover={{
                scale: 1.05,
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
        >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div className="flex flex-col leading-none">
                <span className="text-[8px] text-gray-300">Download on the</span>
                <span className="text-[12px] font-medium text-white">App Store</span>
            </div>
        </motion.a>
    );
}

function GooglePlayBadge({ dark }) {
    return (
        <motion.a 
            href="#" 
            className="flex items-center gap-2 rounded-xl px-3 py-1.5 border transition-colors shrink-0" 
            style={{
                backgroundColor: dark ? "#1f2937" : "#000000",
                borderColor: dark ? "#374151" : "#374151",
            }}
            whileHover={{
                scale: 1.05,
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
        >
            <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
                <path d="M3.18 23.5c.3.17.64.26.99.24l11.4-11.4-2.83-2.84L3.18 23.5z" fill="#EA4335" />
                <path d="M20.5 10.72l-2.78-1.6-3.17 3.17 3.17 3.16 2.81-1.62a1.6 1.6 0 0 0 0-3.1z" fill="#FBBC04" />
                <path d="M3.18.5C2.82.72 2.57 1.1 2.57 1.6v20.8c0 .5.25.88.61 1.1l11.56-11.57L3.18.5z" fill="#4285F4" />
                <path d="M4.17.24l10.36 10.36-2.82 2.83L3.18.5c.3-.17.66-.26.99-.26z" fill="#34A853" />
            </svg>
            <div className="flex flex-col leading-none">
                <span className="text-[8px] text-gray-300">GET IT ON</span>
                <span className="text-[12px] font-medium text-white">Google Play</span>
            </div>
        </motion.a>
    );
}

const trustBadges = [
    {
        label: "Secure & Private",
        icon: (
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
    },
    {
        label: "Works Offline",
        icon: (
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
            </svg>
        ),
    },
    {
        label: "Expert Curated Content",
        icon: (
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4l3 3" />
            </svg>
        ),
    },
];

export default function DownloadAppBanner() {
    const { dark, textColor } = useTheme();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { 
        once: true, 
        amount: 0.1,
        margin: "-50px"
    });

    // Animation variants
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.6, ease: "easeOut" } 
        }
    };

    const slideInLeft = {
        hidden: { opacity: 0, x: -40 },
        visible: { 
            opacity: 1, 
            x: 0, 
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
        }
    };

    const slideInRight = {
        hidden: { opacity: 0, x: 40 },
        visible: { 
            opacity: 1, 
            x: 0, 
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
        }
    };

    // Character animation for heading
    const charVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.04,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    };

    const headingText = "Download the Mudras App";
    const headingChars = headingText.split("");

    // Staggered trust badges
    const badgeVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: (i) => ({
            opacity: 1,
            scale: 1,
            transition: {
                delay: i * 0.08 + 0.4,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    };

    return (
        <motion.section 
            ref={sectionRef}
            className={"w-full " + spacing.sectionPaddingX + " py-6 sm:py-8 md:py-10 lg:py-14"} 
            style={{
                backgroundColor: dark ? "#111827" : "#ffffff",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className={spacing.container}>
                <motion.div 
                    className="w-full max-w-7xl mx-auto rounded-2xl bg-[#FFD6E0] flex flex-col md:flex-row md:items-stretch px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6 gap-3 md:gap-3"
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    whileHover={{
                        boxShadow: dark 
                            ? "0 8px 30px rgba(0,0,0,0.3)"
                            : "0 8px 30px rgba(0,0,0,0.08)",
                        transition: { duration: 0.3 }
                    }}
                >
                    {/* Col 1: App mockup — top on mobile, left col on md+ */}
                    <motion.div 
                        className="flex w-full h-40 md:h-auto md:w-[170px] lg:w-[210px] xl:w-[250px] shrink-0 rounded-xl overflow-hidden items-center justify-center md:self-stretch" 
                        style={{
                            backgroundColor: dark ? "#374151" : "#ffffff",
                        }}
                        variants={slideInLeft}
                    >
                        <motion.div
                            className="w-full h-full"
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.3 }
                            }}
                        >
                            {IMAGES.Downloadapp ? (
                                <Image
                                    src={IMAGES.Downloadapp}
                                    alt="App preview"
                                    width={250}
                                    height={220}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center">
                                    <span className="text-xs text-indigo-400 font-medium text-center px-2">Store view</span>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>

                    {/* Col 2: Center content */}
                    <motion.div 
                        className="flex flex-col justify-center items-center text-center flex-1 px-2 sm:px-3 md:px-4 lg:px-8 gap-2 sm:gap-3"
                        variants={slideInRight}
                    >
                        <div>
                            {/* Heading - Character by character */}
                            <motion.h2 
                                className="text-base sm:text-lg md:text-xl lg:text-3xl font-medium leading-tight mb-1" 
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
                                className="text-[11px] sm:text-xs md:text-sm lg:text-base" 
                                style={{ color: dark ? "#000000" : "#4b5563" }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                Begin your journey of transformation today.
                            </motion.p>
                        </div>

                        <motion.div 
                            className="flex flex-row gap-2 flex-wrap justify-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <AppStoreBadge dark={dark} />
                            <GooglePlayBadge dark={dark} />
                        </motion.div>

                        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 md:gap-x-3">
                            {trustBadges.map((t, i) => (
                                <motion.div 
                                    key={t.label} 
                                    className="flex items-center gap-1 text-[9px] sm:text-[10px] md:text-[11px]" 
                                    style={{ color: dark ? "#000000" : "#6b7280" }}
                                    custom={i}
                                    variants={badgeVariants}
                                    initial="hidden"
                                    animate={isInView ? "visible" : "hidden"}
                                    whileHover={{
                                        scale: 1.05,
                                        transition: { duration: 0.2 }
                                    }}
                                >
                                    {i > 0 && <span className="mr-1" style={{ color: dark ? "#374151" : "#d1d5db" }}>|</span>}
                                    <span style={{ color: dark ? "#6b7280" : "#9ca3af" }}>{t.icon}</span>
                                    {t.label}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Vertical divider — md+ only */}
                    <motion.div 
                        className="hidden md:block w-px self-stretch mx-1" 
                        style={{
                            backgroundColor: dark ? "#374151" : "#f9c8d8",
                        }}
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    />

                    {/* Col 3: Testimonial — bottom on mobile, right col on md+ */}
                    <motion.div 
                        className="flex flex-col justify-between w-full md:w-[160px] lg:w-[210px] xl:w-[245px] shrink-0 rounded-xl p-3 md:p-3.5 lg:p-4 gap-2" 
                        style={{
                            backgroundColor: dark ? "#ffffff" : "#ffffff",
                        }}
                        variants={slideInRight}
                        whileHover={{
                            y: -4,
                            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                            transition: { duration: 0.2 }
                        }}
                    >
                        <motion.div 
                            className="flex items-start gap-1"
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <span className="text-2xl leading-none font-serif mt-0.5 select-none" style={{ color: dark ? "#f472b6" : "#f472b6" }}>❝</span>
                            <p className="text-[10px] md:text-[11px] lg:text-xs leading-snug pt-1" style={{ color: dark ? "#000000" : "#374151" }}>
                                Mudras has truly transformed my daily routine. I feel more balanced, calm, and focused.
                            </p>
                        </motion.div>

                        <motion.div 
                            className="w-full h-px" 
                            style={{ backgroundColor: dark ? "#4b5563" : "#36393f" }}
                            initial={{ scaleX: 0 }}
                            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        />

                        <motion.div 
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, x: -10 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                        >
                            <motion.div 
                                className="w-6 h-6 lg:w-7 lg:h-7 rounded-full bg-yellow-200 flex items-center justify-center text-[10px] lg:text-xs font-semibold text-yellow-800 shrink-0"
                                whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                P
                            </motion.div>
                            <div>
                                <p className="text-[10px] md:text-[11px] font-medium" style={{ color: dark ? "#292a2b" : "#1f2937" }}>- Priya S.</p>
                                <p className="text-[9px] md:text-[10px]" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>Verified User</p>
                            </div>
                        </motion.div>

                        <motion.div 
                            className="flex gap-1"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.4, delay: 0.8 }}
                        >
                            {[0, 1, 2, 3].map((i) => (
                                <motion.div 
                                    key={i} 
                                    className="w-1.5 h-1.5 rounded-full" 
                                    style={{
                                        backgroundColor: i === 0 ? (dark ? "#9ca3af" : "#f472b6") : (dark ? "#1f1d1d" : "#f9c8d8"),
                                    }}
                                    initial={{ scale: 0 }}
                                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                                    transition={{ delay: i * 0.05 + 0.9, duration: 0.3 }}
                                />
                            ))}
                        </motion.div>
                    </motion.div>

                </motion.div>
            </div>
        </motion.section>
    );
}