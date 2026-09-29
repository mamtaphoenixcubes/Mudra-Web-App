"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { heroImage, maxW, spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

export default function FiveHero() {
    const { dark, textColor } = useTheme();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, {
        once: true,
        amount: 0.3,
        margin: "-50px"
    });

    // Character animation for heading
    const charVariants = {
        hidden: { opacity: 0, y: 20, rotateX: -10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                delay: i * 0.04,
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

    // Line animation for info card
    const lineVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.15 + 0.5,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    };

    // Right side fade-in
    const fadeInRight = {
        hidden: { opacity: 0, x: 40 },
        visible: { 
            opacity: 1, 
            x: 0, 
            transition: { 
                duration: 0.7, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2
            } 
        }
    };

    // Icon animation
    const iconVariants = {
        hidden: { opacity: 0, scale: 0, rotate: -180 },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.6,
            },
        },
    };

    // Split text
    const headingText = "The Five Elements";
    const headingChars = headingText.split("");

    const bodyText = "Everything in the universe is composed of five elements. In our body and mind, these elements must stay in balance for health, happiness and harmony.";
    const bodyWords = bodyText.split(" ");

    const cardLines = [
        "When an element is imbalanced,",
        "it shows up as physical, emotional and mental challenges."
    ];

    return (
        <motion.section
            ref={sectionRef}
            className={`
                grid grid-cols-2
                items-center
                ${spacing.sectionPaddingX}
                ${spacing.sectionPaddingY}
                ${spacing.heroGap}
                ${spacing.heroSectionMinH}
                relative overflow-hidden
            `}
            style={{
                backgroundColor: dark ? "#111827" : "#f9fafb",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            {/* Background decorative elements */}
            <motion.div
                className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-5"
                style={{ backgroundColor: textColor }}
                animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.05, 0.08, 0.05],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-5"
                style={{ backgroundColor: textColor }}
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.05, 0.08, 0.05],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
            />

            {/* LEFT */}
            <div className={`flex flex-col ${spacing.heroLeftColWb} ${spacing.heroLeftColOffset} relative z-10`}>
                <div className={spacing.contentColumn}>

                    {/* Heading - Character by character */}
                    <motion.h1
                        className={`${typography.aboutHeading}`}
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
                    {/* Underline - Animated */}
                    <motion.div
                        className="w-6 sm:w-8 lg:w-10 h-[2px] sm:h-[3px] mt-1 sm:mt-2 mb-2 sm:mb-4"
                        style={{ backgroundColor: textColor }}
                        initial={{ width: 0, opacity: 0 }}
                        animate={isInView ? { width: "5rem", opacity: 1 } : { width: 0, opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />

                    {/* Body - Word by word */}
                    <motion.p
                        className={`
                            ${typography.heroBody}
                            ${maxW.heroMbBody}
                        `}
                        style={{ color: dark ? "#ffffff" : "#4b5563" }}
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

                    {/* Info card */}
                    <motion.div
                        className={`
                            rounded-lg sm:rounded-xl
                            ${spacing.buttonGroupMt}
                            px-2 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-4
                            flex flex-row items-center gap-2 sm:gap-3 lg:gap-4
                            ${maxW.yogaNidraCardW}
                            relative overflow-hidden
                        `}
                        style={{
                            backgroundColor: dark ? "#374151" : textColor + "10",
                        }}
                        whileHover={{
                            scale: 1.02,
                            boxShadow: `0 8px 30px ${textColor}20`,
                            transition: { duration: 0.3 }
                        }}
                    >
                        {/* Animated border glow */}
                        <motion.div
                            className="absolute inset-0"
                            style={{
                                background: `linear-gradient(90deg, ${textColor}10, ${textColor}30, ${textColor}10)`,
                            }}
                            initial={{ x: "-100%" }}
                            animate={isInView ? { x: "100%" } : { x: "-100%" }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                                delay: 1,
                            }}
                        />

                        {/* Icon */}
                        <motion.div
                            className="shrink-0"
                            variants={iconVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
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
                        <motion.div className="flex flex-col gap-0 sm:gap-0.5 relative z-10">
                            {cardLines.map((line, i) => (
                                <motion.p
                                    key={i}
                                    className={`${typography.yogaNidraCard}`}
                                    style={{ color: textColor }}
                                    custom={i}
                                    variants={lineVariants}
                                    initial="hidden"
                                    animate={isInView ? "visible" : "hidden"}
                                    transition={{ delay: i * 0.15 + 0.5 }}
                                >
                                    {line}
                                </motion.p>
                            ))}
                        </motion.div>
                    </motion.div>

                </div>
            </div>

            {/* RIGHT — hero image with ONLY zoom */}
            <motion.div 
                className={`${heroImage.wrapper} ${spacing.heroRightColW} relative z-10`}
                variants={fadeInRight}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <motion.div
                    className="relative cursor-pointer overflow-hidden"
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
                    />
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
                animate={{
                    y: [0, 10, 0],
                    opacity: [0.5, 1, 0.5],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{ color: textColor }}
            >
                <span className="text-xs uppercase tracking-widest opacity-50">Scroll</span>
                <motion.div
                    className="w-0.5 h-8 rounded-full"
                    style={{ backgroundColor: textColor }}
                    animate={{
                        height: [8, 16, 8],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </motion.div>
        </motion.section>
    );
}