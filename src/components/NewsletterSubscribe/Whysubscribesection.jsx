"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { spacing, typography } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";

const BENEFITS = [
    {
        iconBg: "var(--journey-card)",
        title: "Expert Insights",
        desc: "Get expert insights on mudras, yoga nidra, and holistic wellness.",
        icon: IMAGES.IconPractice || IMAGES.IconPractice || "/images/expert-insights.svg",
        alt: "Expert Insights Icon",
    },
    {
        iconBg: "var(--benefit-2)",
        title: "Wellness Tips",
        desc: "Practical tips and guidance for a balanced lifestyle.",
        icon: IMAGES.pencil || IMAGES.pencil || "/images/wellness-tips.svg",
        alt: "Wellness Tips Icon",
    },
    {
        iconBg: "var(--problem-3)",
        title: "Exclusive Content",
        desc: "Access exclusive content, resources, and offers.",
        icon: IMAGES.Gift || IMAGES.Gift || "/images/exclusive-content.svg",
        alt: "Exclusive Content Icon",
    },
    {
        iconBg: "var(--about-card)",
        title: "Latest Updates",
        desc: "Stay updated with the latest news and events.",
        icon: IMAGES.Bell || IMAGES.Bell || "/images/latest-updates.svg",
        alt: "Latest Updates Icon",
    },
];

// LotusDivider with dark/light mode support
function LotusDivider({ dark }) {
    return (
        <motion.div 
            className="w-10 h-10 relative"
        >
            <Image
                src={IMAGES.Energy || "/images/lotus-divider.svg"}
                alt="Lotus divider"
                width={52}
                height={50}
                className="w-full h-full object-contain"
                style={{
                    filter: dark ? "brightness(0) invert(1)" : "brightness(0) saturate(100%) invert(0)",
                }}
            />
        </motion.div>
    );
}

function ShieldIcon() {
    return (
        <motion.div 
            className="bg-white w-10 h-10 rounded-full flex items-center justify-center"
            whileHover={{
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.2 }
            }}
        >
            <div className="w-8 h-8 relative shrink-0">
                <Image
                    src={IMAGES.privacy || "/images/shield-icon.svg"}
                    alt="Shield icon"
                    width={32}
                    height={32}
                    className="object-contain"
                />
            </div>
        </motion.div>
    );
}

export default function WhySubscribeSection() {
    const { dark, textColor } = useTheme();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { 
        once: true, 
        amount: 0.1,
        margin: "-50px"
    });

    // Calculate the primary color with opacity for inline style
    const primaryColor = "#9A85FE";
    const primaryWithOpacity = `${primaryColor}33`; // 20% opacity

    // Animation variants
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.6, ease: "easeOut" } 
        }
    };

    // Container variants for stagger
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    // Benefit item variants
    const benefitVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

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

    const headingText = "Why Subscribe?";
    const headingChars = headingText.split("");

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
                className="max-w-3xl mx-auto flex flex-col items-center gap-8 sm:gap-10"
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* Heading */}
                <div className="flex flex-col items-center gap-3">
                    {/* Heading - Character by character */}
                    <motion.h2 
                        className={typography.whySubscribe.heading} 
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
                    
                    {/* Divider with lotus image */}
                    <motion.div 
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <motion.div 
                            className={typography.whySubscribe.dividerLine} 
                            style={{ backgroundColor: dark ? "#374151" : "#e5e7eb" }}
                            initial={{ scaleX: 0 }}
                            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        />
                        <LotusDivider dark={dark} />
                        <motion.div 
                            className={typography.whySubscribe.dividerLine} 
                            style={{ backgroundColor: dark ? "#374151" : "#e5e7eb" }}
                            initial={{ scaleX: 0 }}
                            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        />
                    </motion.div>
                </div>

                {/* 4-column benefits with images - Centered */}
                <motion.div 
                    className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 sm:gap-8 w-full place-items-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {BENEFITS.map((item, idx) => (
                        <motion.div 
                            key={idx} 
                            className="flex flex-col items-center text-center max-w-[200px]"
                            variants={benefitVariants}
                            whileHover={{
                                y: -4,
                                transition: { duration: 0.2 }
                            }}
                        >
                            {/* Icon circle with image */}
                            <motion.div
                                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-3"
                                style={{ backgroundColor: dark ? item.iconBg : item.iconBg }}
                                whileHover={{
                                    scale: 1.1,
                                    rotate: 5,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <Image
                                    src={item.icon}
                                    alt={item.alt}
                                    width={36}
                                    height={36}
                                    className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
                                />
                            </motion.div>
                            {/* Title */}
                            <motion.p 
                                className="text-sm sm:text-base font-semibold mb-1" 
                                style={{ color: textColor }}
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                {item.title}
                            </motion.p>
                            {/* Desc */}
                            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: dark ? "#ffffff" : "#050505" }}>
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Privacy banner with shield image */}
                <motion.div 
                    className="flex items-center gap-3 px-4 py-3 rounded-full" 
                    style={{
                        backgroundColor: dark ? primaryWithOpacity : primaryWithOpacity,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2 }
                    }}
                >
                    <ShieldIcon />
                    <motion.p 
                        className="text-xs sm:text-sm" 
                        style={{ color: dark ? "#e5e7eb" : "#374151" }}
                        whileHover={{
                            scale: 1.02,
                            transition: { duration: 0.2 }
                        }}
                    >
                        We respect your privacy. Your information will never be shared.
                    </motion.p>
                </motion.div>

            </motion.div>
        </motion.section>
    );
}