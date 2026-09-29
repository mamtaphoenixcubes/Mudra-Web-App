"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { maxW, spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

const steps = [
    {
        number: "1.",
        title: "Preparation",
        description: "Get comfortable set your intention and relax.",
        icon: IMAGES.KayaMudras,
        bg: "bg-[#EFE3A8]",
    },
    {
        number: "2.",
        title: "Sankalpa",
        description: "Set a positive intention or solve.",
        icon: IMAGES.ImproveFocus,
        bg: "bg-[#DCC2F2]",
    },
    {
        number: "3.",
        title: "Body Scan",
        description: "Rotate awareness through different parts of the body.",
        icon: IMAGES.Mudras,
        bg: "bg-[#BFDDF2]",
    },
    {
        number: "4.",
        title: "Breath Awareness",
        description: "Observe the natural breath and allow the mind to settle.",
        icon: IMAGES.BreathAwareness,
        bg: "bg-[#EECAD9]",
    },
    {
        number: "5.",
        title: "Visualization",
        description: "Experience guided imagery to create healing shifts.",
        icon: IMAGES.EmotionalBalance,
        bg: "bg-[#D8EBC6]",
    },
    {
        number: "6.",
        title: "Sankalpa Reinforcement",
        description: "Reinforce your Intention at a deeper level.",
        icon: IMAGES.HolisticWellbeing,
        bg: "bg-[#EFE3A8]",
    },
    {
        number: "7.",
        title: "Return",
        description: "Gradually bring awareness hack to the present.",
        icon: IMAGES.Return,
        bg: "bg-[#DCC2F2]",
    },
];

export default function StepsOfPractice() {
    const { dark, textColor } = useTheme();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { 
        once: true, 
        amount: 0.15,
        margin: "-50px"
    });

    // Letter animation for label
    const letterVariants = {
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

    // Character animation for heading
    const charVariants = {
        hidden: { opacity: 0, y: 15, scale: 0.9 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                delay: i * 0.025,
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

    // Step card animation
    const stepVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { 
                duration: 0.5, 
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    // Title character animation
    const titleCharVariants = {
        hidden: { opacity: 0, y: 10, scale: 0.8 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                delay: i * 0.03,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    };

    // Description word animation
    const descWordVariants = {
        hidden: { opacity: 0, y: 8 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.04,
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    };

    // Connector animation
    const connectorVariants = {
        hidden: { scaleX: 0, opacity: 0 },
        visible: {
            scaleX: 1,
            opacity: 1,
            transition: {
                duration: 0.6,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
            }
        }
    };

    // Split text
    const labelText = "STEPS OF PRACTICE";
    const labelChars = labelText.split("");
    
    const headingText = "A Simple Yet Powerful Practice";
    const headingChars = headingText.split("");
    
    const subtitleText = "Yoga Nidra follows a systematic process to guide you into deep conscious relaxation,";
    const subtitleWords = subtitleText.split(" ");

    return (
        <motion.section 
            ref={sectionRef}
            className={`w-full ${spacing.sectionPadding} relative overflow-hidden`} 
            style={{
                backgroundColor: dark ? "#111827" : "#ffffff",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            {/* Background decorative elements */}
            <motion.div
                className="absolute -top-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-5"
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
                className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-5"
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

            <div className={spacing.container}>

                {/* Heading block */}
                <div className={`text-center ${spacing.headingBlockMb}`}>
                    {/* Label - Character by character */}
                    <motion.p 
                        className={`${typography.sectionLabel}`} 
                        style={{ color: dark ? "#ffffff" : "#9ca3af" }}
                    >
                        {labelChars.map((char, i) => (
                            <motion.span
                                key={i}
                                custom={i}
                                variants={letterVariants}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                style={{ display: "inline-block" }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </motion.p>
                    
                    {/* Heading - Character by character */}
                    <motion.h2 
                        className={`${typography.sectionMbHeading} ${spacing.labelMt}`} 
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
                                transition={{ delay: i * 0.025 + 0.2 }}
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                    </motion.h2>
                    
                    {/* Subtitle - Word by word */}
                    <motion.p 
                        className={`${typography.sectionMbBody} ${maxW.sectionBody} ${spacing.bodyMt}`} 
                        style={{ color: dark ? "#ffffff" : "#4b5563" }}
                    >
                        {subtitleWords.map((word, i) => (
                            <motion.span
                                key={i}
                                custom={i}
                                variants={wordVariants}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                style={{ display: "inline-block", marginRight: "0.25em" }}
                                transition={{ delay: i * 0.04 + 0.4 }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </motion.p>
                </div>

                {/* ── Steps row — scrollable on mobile, full on md+ ── */}
                <div className={spacing.stepsScrollWrapper}>
                    <div className={spacing.stepsInnerRow}>
                        {steps.map((step, i) => {
                            const titleParts = step.title.split(" ");
                            const descWords = step.description.split(" ");
                            
                            return (
                                <motion.div 
                                    key={i} 
                                    className="flex flex-row items-start flex-1"
                                    variants={stepVariants}
                                    initial="hidden"
                                    animate={isInView ? "visible" : "hidden"}
                                    transition={{ delay: i * 0.08 }}
                                    whileHover={{ 
                                        y: -5,
                                        transition: { duration: 0.3 }
                                    }}
                                >
                                    {/* Step card */}
                                    <div className={`flex flex-col items-center text-center flex-1 ${spacing.stepsItemPx}`}>

                                        {/* Circle icon */}
                                        <motion.div 
                                            className={`
                                                ${step.bg} rounded-full shrink-0
                                                ${spacing.stepsIconBox}
                                                ${spacing.stepsIconBoxMb}
                                                flex items-center justify-center relative
                                            `}
                                            whileHover={{ 
                                                scale: 1.15,
                                                rotate: 5,
                                                boxShadow: `0 8px 30px ${step.color}40`,
                                                transition: { duration: 0.3 }
                                            }}
                                        >
                                            <Image
                                                src={step.icon}
                                                alt={step.title}
                                                width={24}
                                                height={24}
                                                className={`${spacing.stepsIconInner} object-contain relative z-10`}
                                            />
                                            
                                            {/* Pulsing ring */}
                                            <motion.div
                                                className="absolute inset-0 rounded-full"
                                                style={{ border: `2px solid ${step.color}30` }}
                                                animate={{
                                                    scale: [1, 1.3, 1],
                                                    opacity: [0.3, 0, 0.3],
                                                }}
                                                transition={{
                                                    duration: 2.5,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                    delay: i * 0.15,
                                                }}
                                            />
                                        </motion.div>

                                        {/* Title - Character by character */}
                                        <motion.p 
                                            className={`${typography.stepsTitle} mb-1`} 
                                            style={{ color: textColor }}
                                            whileHover={{ 
                                                color: step.color,
                                                scale: 1.02,
                                                transition: { duration: 0.2 }
                                            }}
                                        >
                                            {step.number}{" "}
                                            {titleParts.map((word, idx) => (
                                                <motion.span
                                                    key={idx}
                                                    custom={idx}
                                                    variants={titleCharVariants}
                                                    initial="hidden"
                                                    animate={isInView ? "visible" : "hidden"}
                                                    style={{ display: "inline-block", marginRight: "0.15em" }}
                                                    transition={{ delay: idx * 0.03 + i * 0.08 + 0.3 }}
                                                >
                                                    {word}
                                                </motion.span>
                                            ))}
                                        </motion.p>

                                        {/* Description - Word by word */}
                                        <motion.p 
                                            className={`${typography.stepsBody}`} 
                                            style={{ color: dark ? "#ffffff" : "#6b7280" }}
                                        >
                                            {descWords.map((word, idx) => (
                                                <motion.span
                                                    key={idx}
                                                    custom={idx}
                                                    variants={descWordVariants}
                                                    initial="hidden"
                                                    animate={isInView ? "visible" : "hidden"}
                                                    style={{ display: "inline-block", marginRight: "0.25em" }}
                                                    transition={{ delay: idx * 0.04 + i * 0.08 + 0.4 }}
                                                >
                                                    {word}
                                                </motion.span>
                                            ))}
                                        </motion.p>

                                        
                                    </div>

                                    {/* Dashed connector — not after last item */}
                                    {i < steps.length - 1 && (
                                        <motion.div 
                                            className={`
                                                flex items-start ${spacing.stepsConnectorPt}
                                                shrink-0 ${spacing.stepsConnectorW}
                                            `}
                                            variants={connectorVariants}
                                            initial="hidden"
                                            animate={isInView ? "visible" : "hidden"}
                                            transition={{ delay: i * 0.08 + 0.3 }}
                                        >
                                            <div className="w-full border-t-2 border-dashed" style={{
                                                borderColor: dark ? "#374151" : "#ffffff",
                                            }} />
                                        </motion.div>
                                    )}

                                </motion.div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </motion.section>
    );
}