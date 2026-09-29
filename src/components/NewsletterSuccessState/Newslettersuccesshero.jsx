"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { IMAGES } from "../../assets/assets";
import { spacing, typography, heroImage, maxW } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

export default function SearchResultsHero() {
    const { dark, textColor } = useTheme();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, {
        once: true,
        amount: 0.2,
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

    const fadeInLeft = {
        hidden: { opacity: 0, x: -40 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const fadeInRight = {
        hidden: { opacity: 0, x: 40 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
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

    // Word animation for body text
    const wordVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    };

    // Split text
    const headingText = "Stay Inspired with Mudras";
    const headingChars = headingText.split("");

    const bodyText = "Subscribe to our newsletter and receive the latest updates, wellness tips, and exclusive content straight to your inbox.";
    const bodyWords = bodyText.split(" ");

    return (
        <motion.section
            ref={sectionRef}
            className={`w-full ${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`}
            style={{
                backgroundColor: dark ? "#111827" : "#ffffff",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <motion.div
                className={`${spacing.container} grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-center`}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* ── LEFT: Text content ── */}
                <motion.div
                    className="flex flex-col order-1 md:order-1"
                    variants={fadeInLeft}
                >
                    {/* Heading - Character by character */}
                    <motion.h1
                        className={`${typography.aboutHeading} leading-tight mb-2 sm:mb-3`}
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
                    </motion.h1>

                    {/* Underline */}
                    <motion.div
                        className="w-8 sm:w-10 lg:w-14 h-[2px] sm:h-[3px] rounded-full mt-1 sm:mt-2 mb-3 sm:mb-5"
                        style={{ backgroundColor: textColor }}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: "3.5rem" } : { width: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    />

                    {/* Body - Word by word */}
                    <motion.p
                        className={`${typography.heroBody} leading-relaxed mb-6 sm:mb-8 max-w-sm sm:max-w-md`}
                        style={{ color: dark ? "#f5f5f5" : "#4b5563" }}
                    >
                        {bodyWords.map((word, i) => (
                            <motion.span
                                key={i}
                                custom={i}
                                variants={wordVariants}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                style={{ display: "inline-block", marginRight: "0.25em" }}
                                transition={{ delay: i * 0.05 + 0.2 }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </motion.p>

                </motion.div>

                {/* ── RIGHT: App mockup image ── */}
                <motion.div
                    className="flex justify-center md:justify-end items-center w-full order-2 md:order-2"
                    variants={fadeInRight}
                >
                    <motion.div
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.3 }
                        }}
                        className="w-full max-w-[420px] sm:max-w-[500px] md:max-w-full mx-auto md:mx-0"
                    >
                        {IMAGES.SearchResults ? (
                            <Image
                                src={IMAGES.NewsletterSubscribe}
                                alt="Mudras App Preview"
                                width={800}
                                height={600}
                                className="w-full h-auto object-contain rounded-2xl border-2"
                                style={{
                                    borderColor: dark ? "#666464" : "#e5e7eb",
                                }}
                                priority
                            />
                        ) : (
                            <div className="w-full aspect-[4/3] rounded-2xl flex items-center justify-center border-2" style={{
                                backgroundColor: dark ? "#374151" : "#f3f4f6",
                                borderColor: dark ? "#374151" : "#e5e7eb",
                            }}>
                                <span className="text-sm" style={{ color: dark ? "#bbbbbb" : "#9ca3af" }}>App Preview</span>
                            </div>
                        )}
                    </motion.div>
                </motion.div>

            </motion.div>
        </motion.section>
    );
}