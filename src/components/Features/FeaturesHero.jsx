"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { heroImage, maxW, spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

// Suggested additions to theme/index.js — a small accent palette for
// this hero's "prana ring" signature. Swap the hex values for your
// own token names once added there (e.g. colors.accentGold).
const ACCENT_GOLD = "#C89B3C";

export default function FeaturesHero() {
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
                delay: i * 0.08,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    };

    // Breathing prana ring — expands and fades on a 4s cycle, three
    // rings staggered a third of a cycle apart so one is always mid-pulse
    const ringVariants = {
        animate: (delay) => ({
            scale: [1, 2.4],
            opacity: [0.6, 0],
            transition: {
                duration: 4,
                delay,
                repeat: Infinity,
                ease: "easeOut",
            },
        }),
    };

    // Split text
    const headingText = "Features";
    const headingChars = headingText.split("");

    const bodyText = "Explore powerful hand gestures. Simple to learn. Profound in effect.";
    const bodyWords = bodyText.split(" ");

    return (
        <motion.section
            ref={sectionRef}
            className={`
                grid grid-cols-2 md:grid-cols-2
                items-center
                ${spacing.sectionPaddingX}
                ${spacing.sectionPaddingY}
                ${spacing.heroGap}
                ${spacing.heroSectionMinH}
            `}
            style={{
                backgroundColor: dark ? "#2B1B34" : "#ffffff",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            {/* LEFT */}
            <motion.div
                className={`flex flex-col md:block ${spacing.heroLeftColWb} ${spacing.heroLeftColOffset}`}
                variants={fadeInLeft}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <div className={spacing.contentColumn}>

                    {/* Heading - Character by character */}
                    <motion.h1
                        className={`${typography.MainHeading}`}
                        style={{ color: textColor, fontFamily: "'Cormorant Garamond', Georgia, serif" }}
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
                        className="w-8 sm:w-10 lg:w-14 h-[2px] sm:h-[3px] mt-1 sm:mt-2 mb-2 sm:mb-4"
                        style={{ backgroundColor: ACCENT_GOLD }}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: "3.5rem" } : { width: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    />

                    {/* Body - Word by word */}
                    <motion.p
                        className={`
                            ${typography.heroBody}
                            ${maxW.heroMbBody}
                        `}
                        style={{ color: dark ? "#D9CFE0" : "#4b5563", fontFamily: "'Cormorant Garamond', Georgia, serif"  }}
                    >
                        {bodyWords.map((word, i) => (
                            <motion.span
                                key={i}
                                custom={i}
                                variants={wordVariants}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                style={{ display: "inline-block", marginRight: "0.25em" }}
                                transition={{ delay: i * 0.08 + 0.2 }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </motion.p>

                    {/* Info card */}
                    <motion.div
                        className={`
                            rounded-lg sm:rounded-xl
                            ${spacing.buttonGroupMt}
                            px-2 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-4
                            flex flex-row items-center gap-2 sm:gap-3 lg:gap-4
                            ${maxW.yogaNidraCardW}
                        `}
                        style={{
                            backgroundColor: dark ? "rgba(200,155,60,0.12)" : ACCENT_GOLD + "12",
                        }}
                        variants={fadeUp}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        transition={{ delay: 0.4 }}
                        whileHover={{
                            scale: 1.02,
                            transition: { duration: 0.2 }
                        }}
                    >
                        {/* Icon */}
                        <motion.div
                            className="shrink-0"
                            whileHover={{
                                scale: 1.1,
                                rotate: 5,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <Image
                                src={IMAGES.Energy}
                                alt="Yoga Nidra icon"
                                width={28}
                                height={28}
                                className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 object-contain opacity-70"
                                style={{
                                    filter: dark ? "brightness(0.8) invert(1)" : "none",
                                }}
                            />
                        </motion.div>

                        {/* Text lines */}
                        <div className="flex flex-col gap-0 sm:gap-0.5">
                            <motion.p
                                className={`${typography.yogaNidraCard}`}
                                style={{ color: textColor }}
                                initial={{ opacity: 0, x: -10 }}
                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                                transition={{ duration: 0.4, delay: 0.5 }}
                            >
                                This is a simplified library.
                            </motion.p>
                            <motion.p
                                className={`${typography.yogaNidraCard}`}
                                style={{ color: textColor }}
                                initial={{ opacity: 0, x: -10 }}
                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                                transition={{ duration: 0.4, delay: 0.6 }}
                            >
                                For complete details, guided practices
                            </motion.p>
                            <motion.p
                                className={`${typography.yogaNidraCard}`}
                                style={{ color: textColor }}
                                initial={{ opacity: 0, x: -10 }}
                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                                transition={{ duration: 0.4, delay: 0.7 }}
                            >
                                and personalization, try the Mudras App.
                            </motion.p>
                        </div>
                    </motion.div>

                </div>
            </motion.div>

            {/* RIGHT — hero image with breathing prana rings */}
            <motion.div
                className={`${heroImage.wrapper} ${spacing.heroRightColW}`}
                variants={fadeInRight}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <motion.div
                    style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}
                    whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.3 }
                    }}
                >
                    

                    <Image
                        src={IMAGES.hero}
                        alt="Mudra Hand"
                        priority
                        className={`
                            ${heroImage.width}
                            h-auto
                            object-contain
                            max-w-full md:max-w-none
                        `}
                        style={{ position: "relative", zIndex: 1 }}
                    />
                </motion.div>
            </motion.div>
        </motion.section>
    );
}