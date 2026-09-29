"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { spacing, typography, card } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";

const defaultTips = [
    {
        icon: IMAGES.BreathAwareness,
        text: "Practice deep breathing daily.",
    },
    {
        icon: IMAGES.Tree,
        text: "Spend time in nature.",
    },
    {
        icon: IMAGES.Diet,
        text: "Eat a balanced, sattvic diet.",
    },
    {
        icon: IMAGES.WaterIcon,
        text: "Stay hydrated and rest well.",
    },
    {
        icon: IMAGES.Phone,
        text: "Limit screen time and overthinking.",
    },
];

export default function LifestyleTips({ tips = [], whenToSeekHelp = null }) {
    const { dark, textColor } = useTheme();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { 
        once: true, 
        amount: 0.1,
        margin: "-50px"
    });

    const finalTips = tips.length > 0
        ? tips.map((t, idx) => ({
            icon: [IMAGES.BreathAwareness, IMAGES.Tree, IMAGES.Diet, IMAGES.WaterIcon, IMAGES.Phone][idx % 5],
            text: t.Text || t.text || ""
          }))
        : defaultTips;

    const finalWhenToSeekHelp = whenToSeekHelp || "If stress or anxiety feels overwhelming or affects your daily life, consider talking to a healthcare professional.";

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
        hidden: { opacity: 0, x: -30 },
        visible: { 
            opacity: 1, 
            x: 0, 
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
        }
    };

    const slideInRight = {
        hidden: { opacity: 0, x: 30 },
        visible: { 
            opacity: 1, 
            x: 0, 
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
        }
    };

    // Staggered tip variants
    const tipVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.06 + 0.3,
                duration: 0.4,
                ease: "easeOut",
            },
        }),
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

    const headingText = "Lifestyle Tips";
    const headingChars = headingText.split("");

    const helpHeadingText = "When to Seek Help";
    const helpHeadingChars = helpHeadingText.split("");

    return (
        <motion.section
            id="lifestyle"
            ref={sectionRef}
            className={`w-full ${spacing.sectionPaddingX} ${spacing.sectionPaddingY} flex justify-center`} 
            style={{
                backgroundColor: dark ? "#111827" : "#ffffff",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <motion.div 
                className={`flex flex-col gap-3 w-full ${spacing.maxW.sectionBody}`}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* ── Lifestyle Tips Card ───────────────────────────── */}
                <motion.div 
                    className={`bg-holistic-bg ${card.radius} p-4 sm:p-5 lg:p-6 flex flex-row items-center gap-4 sm:gap-5 lg:gap-6`}
                    variants={slideInLeft}
                    whileHover={{
                        boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
                        transition: { duration: 0.3 }
                    }}
                >
                    {/* Big circle icon */}
                    <motion.div 
                        className={`rounded-full ${spacing.cardIconBox} flex items-center justify-center shrink-0`} 
                        style={{
                            backgroundColor: "#ffffff",
                        }}
                        whileHover={{
                            scale: 1.1,
                            rotate: 5,
                            transition: { duration: 0.2 }
                        }}
                    >
                        <Image
                            src={IMAGES.VectorImage || IMAGES.BreathAwareness}
                            alt="Lifestyle"
                            width={32}
                            height={32}
                            className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                        />
                    </motion.div>

                    {/* Right content */}
                    <div className="flex-1 min-w-0">
                        {/* Heading - Character by character */}
                        <motion.p 
                            className={`${typography.cardTitle} font-bold mb-3`} 
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
                        </motion.p>

                        {/* Horizontal scroll row */}
                        <motion.div 
                            className="flex flex-row items-start gap-0 overflow-x-auto scrollbar-hide"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        >
                            {finalTips.map((tip, i) => (
                                <motion.div
                                    key={i}
                                    className="flex flex-row items-start gap-1.5 sm:gap-2 flex-1 min-w-0 px-2 sm:px-3 lg:px-4 first:pl-0 last:pr-0 relative"
                                    custom={i}
                                    variants={tipVariants}
                                    initial="hidden"
                                    animate={isInView ? "visible" : "hidden"}
                                    whileHover={{
                                        scale: 1.02,
                                        transition: { duration: 0.2 }
                                    }}
                                >
                                    {/* Divider */}
                                    {i !== 0 && (
                                        <motion.div 
                                            className="absolute left-0 top-1/2 -translate-y-1/2 h-8 sm:h-10 w-px" 
                                            style={{
                                                backgroundColor: dark ? "#000000" : "#d1d5db",
                                            }}
                                            initial={{ opacity: 0, scaleY: 0 }}
                                            animate={isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
                                            transition={{ duration: 0.4, delay: i * 0.06 + 0.3 }}
                                        />
                                    )}

                                    {/* Icon */}
                                    <motion.div 
                                        className="shrink-0 mt-0.5"
                                        whileHover={{
                                            scale: 1.2,
                                            rotate: 5,
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        <Image
                                            src={tip.icon}
                                            alt="tip"
                                            width={18}
                                            height={18}
                                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 object-contain"
                                        />
                                    </motion.div>

                                    {/* Text */}
                                    <motion.p 
                                        className={`${typography.cardBody} leading-snug`} 
                                        style={{ color: dark ? "#000000" : "#374151" }}
                                        whileHover={{
                                            scale: 1.02,
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        {tip.text}
                                    </motion.p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>

                {/* ── When to Seek Help Card ────────────────────────── */}
                <motion.div 
                    className={`bg-gray-100 ${card.radius} p-4 sm:p-5 lg:p-6 flex flex-row items-center gap-4`}
                    variants={slideInRight}
                    whileHover={{
                        boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
                        transition: { duration: 0.3 }
                    }}
                >
                    <motion.div 
                        className={`bg-white rounded-full ${spacing.cardIconBox} flex items-center justify-center shrink-0`}
                        whileHover={{
                            scale: 1.1,
                            rotate: 5,
                            transition: { duration: 0.2 }
                        }}
                    >
                        <Image
                            src={IMAGES.ShieldTick}
                            alt="Help"
                            width={20}
                            height={20}
                            className="w-6 h-6 sm:w-10 sm:h-10 md:w-6 md:h-6 2xl:w-10 2xl:h-10 object-contain"
                        />
                    </motion.div>

                    <div className="flex-1 min-w-0">
                        {/* Heading - Character by character */}
                        <motion.p 
                            className={`${typography.cardTitle} font-bold mb-1`} 
                            style={{ color: textColor }}
                        >
                            {helpHeadingChars.map((char, i) => (
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
                        <motion.p 
                            className={`${typography.cardBody} leading-relaxed`} 
                            style={{ color: dark ? "#000000" : "#4b5563" }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        >
                            {finalWhenToSeekHelp}
                        </motion.p>
                    </div>
                </motion.div>

            </motion.div>
        </motion.section>
    );
}