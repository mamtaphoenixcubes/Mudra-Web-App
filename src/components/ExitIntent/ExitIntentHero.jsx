"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { spacing, typography, btn, form } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

export default function DownloadAppModal() {
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

    // Word animation for subtitle
    const wordVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.04,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    };

    const headingText = "Before You Go...";
    const headingChars = headingText.split("");
    
    const subtitleText = "Unlock 10% Off Your First App Subscription!";
    const subtitleWords = subtitleText.split(" ");

    return (
        <motion.div 
            ref={sectionRef}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <motion.div 
                className={`w-full max-w-4xl rounded-2xl shadow-xl relative overflow-hidden flex flex-col md:flex-row min-h-[500px] md:min-h-[600px]`} 
                style={{
                    backgroundColor: dark ? "#1f2937" : "#ffffff",
                }}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover={{
                    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
                    transition: { duration: 0.3 }
                }}
            >
                {/* CLOSE BUTTON */}
                <motion.button
                    className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full border flex items-center justify-center transition-colors"
                    style={{
                        backgroundColor: dark ? "#374151" : "#ffffff",
                        borderColor: dark ? "#4b5563" : "#e5e7eb",
                        color: dark ? "#9ca3af" : "#6b7280",
                    }}
                    whileHover={{
                        scale: 1.1,
                        rotate: 90,
                        backgroundColor: dark ? "#4b5563" : "#f3f4f6",
                        transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close modal"
                >
                    ✕
                </motion.button>

                {/* LEFT CONTENT */}
                <motion.div 
                    className="flex-1 p-6 md:p-10 lg:p-12 flex flex-col justify-center py-8 md:py-12 lg:py-16"
                    variants={slideInLeft}
                >
                    {/* Heading - Character by character */}
                    <motion.h2 
                        className={typography.downloadModal.heading} 
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

                    {/* Subtitle - Word by word */}
                    <motion.p 
                        className="text-base md:text-lg font-medium mb-1" 
                        style={{ color: dark ? "#e5e7eb" : "#1f2937" }}
                    >
                        {subtitleWords.map((word, i) => (
                            <motion.span
                                key={i}
                                custom={i}
                                variants={wordVariants}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                style={{ display: "inline-block", marginRight: "0.25em" }}
                                transition={{ delay: i * 0.04 + 0.2 }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </motion.p>

                    {/* Description */}
                    <motion.p 
                        className={typography.downloadModal.description} 
                        style={{ color: dark ? "#d9dadb" : "#4b5563" }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        Join our community and get exclusive access to guided practices,
                        wellness tips, and more
                    </motion.p>

                    {/* EMAIL INPUT WITH ICON */}
                    <motion.div 
                        className="relative mb-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <motion.input
                            type="email"
                            placeholder="Enter your email"
                            className={`${form.field} ${form.input} pl-10`}
                            style={{
                                backgroundColor: dark ? "#374151" : "#ffffff",
                                borderColor: dark ? "#4b5563" : "#e5e7eb",
                                color: dark ? "#e5e7eb" : "#111827",
                            }}
                            whileFocus={{
                                scale: 1.02,
                                boxShadow: `0 0 0 3px ${textColor}30`,
                                transition: { duration: 0.2 }
                            }}
                        />
                        <motion.svg
                            className="absolute left-3 top-1/3 -translate-y-1/2 w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            style={{ color: dark ? "#6b7280" : "#9ca3af" }}
                            animate={{
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </motion.svg>
                    </motion.div>

                    {/* CTA BUTTON */}
                    <motion.button 
                        className={btn.primary}
                        style={{
                            backgroundColor: textColor,
                            transition: "all 0.3s ease",
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        whileHover={{
                            scale: 1.05,
                            opacity: 0.85,
                            boxShadow: `0 8px 30px ${textColor}40`,
                            transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Get My 10% Off
                    </motion.button>

                    {/* NO THANKS */}
                    <motion.button 
                        className="text-sm transition-colors mt-4"
                        style={{ color: dark ? "#ffffff" : "#9ca3af" }}
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                        whileHover={{
                            scale: 1.05,
                            color: dark ? "#e5e7eb" : "#4b5563",
                            transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        No, thanks. I'll miss out.
                    </motion.button>

                    {/* PRIVACY TEXT WITH LOCK ICON */}
                    <motion.p 
                        className="text-xs mt-4 flex items-center justify-center md:justify-start gap-1.5" 
                        style={{ color: dark ? "#fefeff" : "#9ca3af" }}
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.4, delay: 0.7 }}
                    >
                        <motion.svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            style={{ color: dark ? "#ffffff" : "#9ca3af" }}
                            animate={{
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                                delay: 0.5,
                            }}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </motion.svg>
                        We respect your privacy. Unsubscribe anytime.
                    </motion.p>
                </motion.div>

                {/* RIGHT IMAGE */}
                <motion.div 
                    className="hidden md:block md:w-[45%] relative min-h-[400px] md:min-h-[500px]" 
                    style={{
                        background: dark ? "#374151" : "linear-gradient(to bottom right, #f5f3ff, #eef2ff)",
                    }}
                    variants={slideInRight}
                >
                    <motion.div
                        className="w-full h-full"
                        whileHover={{
                            scale: 1.03,
                            transition: { duration: 0.3 }
                        }}
                    >
                        {IMAGES.Downloadapp && (
                            <Image
                                src={IMAGES.Downloadapp}
                                alt="App preview"
                                fill
                                className="object-cover"
                                priority
                            />
                        )}
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}