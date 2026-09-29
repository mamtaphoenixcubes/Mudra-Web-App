"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { heroImage, maxW, spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

export default function BlogLearninghero() {
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
                delay: i * 0.06,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    };

    // Split text
    const headingText = "Learn. Explore. Grow.";
    const headingChars = headingText.split("");
    
    const bodyText = "In-depth articles on mudras, Yoga Nidra, yogic wisdom and holistic well-being.";
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

                    {/* Heading - Character by character */}
                    <motion.h1 
                        className={`${typography.MainHeading}`} 
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
                            mb-4 sm:mb-6 md:mb-8
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
                                transition={{ delay: i * 0.06 + 0.2 }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </motion.p>

                    {/* Search Bar */}
                    <motion.div 
                        className="relative w-full max-w-md"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <motion.input
                            type="text"
                            placeholder="Search articles..."
                            className="w-full px-4 py-2 sm:py-3 pr-10 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-400"
                            style={{
                                backgroundColor: dark ? "#1f2937" : "#ffffff",
                                borderColor: dark ? "#ffffff" : "#d1d5db",
                                color: dark ? "#ffffff" : "#374151",
                            }}
                            whileFocus={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                        />
                        <motion.div 
                            className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                            animate={{
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                        >
                            <svg
                                className="w-4 h-4 sm:w-5 sm:h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                style={{ color: dark ? "#ffffff" : "#9ca3af" }}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </motion.div>
                    </motion.div>

                </div>
            </motion.div>

            {/* RIGHT — hero image with specific dimensions */}
            <motion.div 
                className={`${heroImage.wrapper} ${spacing.heroRightColW} pr-4 sm:pr-6 md:pr-8 lg:pr-10 xl:pr-12`}
                variants={fadeInRight}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <motion.div 
                    className="relative w-full flex justify-center md:justify-end"
                    whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.3 }
                    }}
                >
                    <Image
                        src={IMAGES.BlogLearning}
                        alt="Mudra Hand"
                        priority
                        width={800}
                        height={200}
                        className="rounded-[10px] object-contain"
                        style={{
                            borderRadius: '10px',
                        }}
                    />
                </motion.div>
            </motion.div>
        </motion.section>
    );
}