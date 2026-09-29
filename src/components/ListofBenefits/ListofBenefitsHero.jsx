"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { heroImage, maxW, spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

export default function ListofBenefitsHero() {
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

    // Split text - Main heading
    const headingText = "Reduces Stress";
    const headingChars = headingText.split("");
    
    // Split text - Subheading
    const subheadingText = "Ancient wisdom for modern life.";
    const subheadingChars = subheadingText.split("");
    
    // Split text - Body description
    const bodyText = "Calm the nervous system and promotes relaxation through the power of Mudras and Yoga Nidra.";
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
            `}
            style={{
                backgroundColor: dark ? "#111827" : "#f9fafb",
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

                    {/* Subheading - Character by character */}
                    <motion.p 
                        className={`${typography.sectionLabel} mb-2`}
                        style={{ color: dark ? "#9ca3af" : "#6b7280" }}
                    >
                        {subheadingChars.map((char, i) => (
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
                    </motion.p>

                    {/* Main Heading - Character by character */}
                    <motion.h1 
                        className={`${typography.heroHeading}`} 
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
                        className="w-8 sm:w-10 lg:w-14 h-[2px] sm:h-[3px] mt-1 sm:mt-2 mb-2 sm:mb-4" 
                        style={{ backgroundColor: textColor }}
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
                        style={{ color: dark ? "#d1d5db" : "#4b5563" }}
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

                    {/* Optional: Additional info with bullet points */}
                    <motion.div
                        className="mt-4 space-y-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: textColor }} />
                            <span className="text-sm" style={{ color: dark ? "#d1d5db" : "#4b5563" }}>
                                Reduces cortisol levels naturally
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: textColor }} />
                            <span className="text-sm" style={{ color: dark ? "#d1d5db" : "#4b5563" }}>
                                Promotes deep relaxation response
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: textColor }} />
                            <span className="text-sm" style={{ color: dark ? "#d1d5db" : "#4b5563" }}>
                                Supports mental clarity and focus
                            </span>
                        </div>
                    </motion.div>

                </div>
            </motion.div>

            {/* RIGHT — hero image */}
            <motion.div 
                className={`${heroImage.wrapper} ${spacing.heroRightColW}`}
                variants={fadeInRight}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <motion.div
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
        </motion.section>
    );
}