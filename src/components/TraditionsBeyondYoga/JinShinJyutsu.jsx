"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { typography, spacing, card } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";

const mudras = [
    {
        id: 1,
        name: "Energy Harmonization",
        desc: "Mudras help release tension and support the body's natural healing ability.",
        circleBg: "bg-benefit-1",
        imgSrc: IMAGES.Energy,
    },
    {
        id: 2,
        name: "Safety Energy Locks",
        desc: "Specific hand positions are used to calm, balance and strengthen the energy system.",
        circleBg: "bg-benefit-2",
        imgSrc: IMAGES.BreathAwareness,
    },
    {
        id: 3,
        name: "Mind-Body Connection",
        desc: "Encourages deep relaxation, emotional release and overall well-being.",
        circleBg: "bg-benefit-3",
        imgSrc: IMAGES.EmotionalBalance,
    },
    {
        id: 4,
        name: "Self-Help Practice",
        desc: "Simple, easy-to-learn mudras for daily balance and lasting vitality.",
        circleBg: "bg-benefit-4",
        imgSrc: IMAGES.ReduceStress,
    },
];

export default function JinShinJyutsu() {
    const { dark, textColor } = useTheme();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { 
        once: true, 
        amount: 0.1,
        margin: "-50px"
    });

    // Fade up variants for header
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

    // Card variants
    const cardVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
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

    // Image variants
    const imageVariants = {
        hidden: { opacity: 0, scale: 0.9, x: -30 },
        visible: {
            opacity: 1,
            scale: 1,
            x: 0,
            transition: {
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2,
            },
        },
    };

    return (
        <motion.section 
            ref={sectionRef}
            className={`${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`} 
            style={{
                backgroundColor: dark ? "#111827" : "#ffffff",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className={spacing.container}>

                {/* ── Heading block ── */}
                <motion.div 
                    className="text-center mb-5 sm:mb-6 md:mb-8 lg:mb-10"
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <p className={`${typography.sectionLabel} mb-1 sm:mb-2`} style={{ color: dark ? "#ffffff" : "#6b7280" }}>
                        JIN SHIN JYUTSU
                    </p>
                    <h2 className={`${typography.sectionMbHeading} mb-2 sm:mb-3`} style={{ color: textColor }}>
                        The Art of Harmonizing Life Energy
                    </h2>
                    <p
                        className={`${typography.sectionMbBody} max-w-[260px] sm:max-w-[420px] md:max-w-[500px] lg:max-w-[580px] mx-auto`}
                        style={{ color: dark ? "#ffffff" : "#6b7280" }}
                    >
                        Jin Shin Jyutsu is a gentle healing art from Japan using hand positions to restore balance in the body's energy flow.
                    </p>
                </motion.div>

                {/* MOBILE LAYOUT — hidden on md+ */}
                <motion.div 
                    className="block md:hidden"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {/* Hero image for mobile */}
                    <motion.div 
                        className="mb-4"
                        variants={imageVariants}
                    >
                        <motion.div 
                            className={`relative overflow-hidden ${card.radius} w-full aspect-[4/3]`} 
                            style={{
                                backgroundColor: dark ? "#374151" : "#f3f4f6",
                            }}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <Image
                                src={IMAGES.JinShinJyutsu}
                                alt="Jin Shin Jyutsu healing art"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    </motion.div>

                    {/* 2×2 mudra grid for mobile */}
                    <motion.div 
                        className="grid grid-cols-2 gap-3 mb-4"
                        variants={containerVariants}
                    >
                        {mudras.map((mudra) => (
                            <motion.div
                                key={mudra.id}
                                className={`flex flex-col items-center text-center ${card.radius} p-3`}
                                style={{
                                    backgroundColor: dark ? "#1f2937" : "#f9fafb",
                                }}
                                variants={cardVariants}
                                whileHover={{
                                    y: -4,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                {/* Circle image - matching KeyBenefits icon size */}
                                <motion.div
                                    className={`
                                        ${mudra.circleBg}
                                        rounded-full flex items-center justify-center shrink-0
                                        ${card.benefitsIconBox} ${spacing.benefitsIconBoxMb}
                                    `}
                                    style={{
                                        backgroundColor: dark ? "#374151" : undefined,
                                    }}
                                    whileHover={{
                                        scale: 1.1,
                                        rotate: 5,
                                        transition: { duration: 0.2 }
                                    }}
                                >
                                    <Image
                                        src={mudra.imgSrc}
                                        alt={mudra.name}
                                        width={40}
                                        height={40}
                                        className={`${card.benefitsIconInner} object-contain`}
                                    />
                                </motion.div>
                                {/* Name */}
                                <motion.p 
                                    className={`${typography.benefitsCardTitle} ${spacing.cardTitleMb}`} 
                                    style={{ color: textColor }}
                                    whileHover={{
                                        scale: 1.05,
                                        transition: { duration: 0.2 }
                                    }}
                                >
                                    {mudra.name}
                                </motion.p>
                                {/* Description */}
                                <p className={`${typography.benefitsCardBody}`} style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
                                    {mudra.desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Note banner — mobile */}
                    <motion.div
                        className={`${card.radius} flex items-start gap-3 px-4 py-3`}
                        style={{
                            backgroundColor: dark ? "#374151" : "var(--features-bg)",
                        }}
                        variants={fadeUp}
                        transition={{ delay: 0.4 }}
                        whileHover={{
                            scale: 1.01,
                            transition: { duration: 0.2 }
                        }}
                    >
                        <motion.div 
                            className="shrink-0 opacity-60 mt-0.5"
                            whileHover={{
                                scale: 1.1,
                                rotate: 10,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <Image
                                src={IMAGES.HolisticWellbeing}
                                alt="Holistic Wellbeing"
                                width={20}
                                height={20}
                                className="w-5 h-5 object-contain"
                                style={{
                                    filter: dark ? "brightness(0.8) invert(1)" : "none",
                                }}
                            />
                        </motion.div>
                        <p className={`${typography.disclaimerBody}`} style={{ color: dark ? "#ffffff" : "#374151" }}>
                            Jin Shin Jyutsu helps harmonize life energy, reduce stress, and support the body's natural healing abilities.
                        </p>
                    </motion.div>
                </motion.div>

                {/* DESKTOP LAYOUT — hidden on mobile */}
                <motion.div 
                    className="hidden md:flex md:flex-row items-start gap-5 lg:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {/* Left: hero image */}
                    <motion.div 
                        className="shrink-0 w-[200px] lg:w-[240px] xl:w-[280px] 2xl:w-[320px]"
                        variants={imageVariants}
                    >
                        <motion.div 
                            className={`relative overflow-hidden ${card.radius} w-full aspect-[4/3]`} 
                            style={{
                                backgroundColor: dark ? "#374151" : "#f3f4f6",
                            }}
                            whileHover={{
                                scale: 1.03,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <Image
                                src={IMAGES.JinShinJyutsu}
                                alt="Jin Shin Jyutsu healing art"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Right: 4-col row + note */}
                    <div className="flex-1 min-w-0">
                        <motion.div 
                            className="flex flex-row gap-0 divide-x" 
                            style={{
                                borderColor: dark ? "#374151" : "#e5e7eb",
                            }}
                            variants={containerVariants}
                        >
                            {mudras.map((mudra) => (
                                <motion.div
                                    key={mudra.id}
                                    className="flex-1 flex flex-col items-center text-center px-3 lg:px-4 xl:px-5"
                                    variants={cardVariants}
                                    whileHover={{
                                        y: -4,
                                        transition: { duration: 0.2 }
                                    }}
                                >
                                    <motion.div
                                        className={`
                                            ${mudra.circleBg}
                                            rounded-full flex items-center justify-center shrink-0
                                            ${card.benefitsIconBox} ${spacing.benefitsIconBoxMb}
                                        `}
                                        whileHover={{
                                            scale: 1.1,
                                            rotate: 5,
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        <Image
                                            src={mudra.imgSrc}
                                            alt={mudra.name}
                                            width={40}
                                            height={40}
                                            className={`${card.benefitsIconInner} object-contain`}
                                        />
                                    </motion.div>
                                    <motion.p 
                                        className={`${typography.benefitsCardTitle} ${spacing.cardTitleMb}`} 
                                        style={{ color: textColor }}
                                        whileHover={{
                                            scale: 1.05,
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        {mudra.name}
                                    </motion.p>
                                    <p className={`${typography.benefitsCardBody} ${spacing.benefitDescMaxW}`} style={{ color: dark ? "#ffffff" : "#6b7280" }}>
                                        {mudra.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Note banner — desktop */}
                        <motion.div
                            className={`
                                mt-4 md:mt-5 lg:mt-6
                                ${card.radius}
                                flex items-center gap-3 md:gap-4
                                px-4 py-3 md:px-5 md:py-4 lg:px-6
                            `}
                            style={{
                                backgroundColor: dark ? "var(--features-bg)" : "var(--features-bg)",
                            }}
                            variants={fadeUp}
                            transition={{ delay: 0.4 }}
                            whileHover={{
                                scale: 1.01,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <motion.div 
                                className="shrink-0 opacity-60"
                                whileHover={{
                                    scale: 1.1,
                                    rotate: 10,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <Image
                                    src={IMAGES.HolisticWellbeing}
                                    alt="Holistic Wellbeing"
                                    width={28}
                                    height={28}
                                    className="w-6 h-6 md:w-7 md:h-7 object-contain"
                                    style={{
                                        filter: dark ? "none" : "none",
                                    }}
                                />
                            </motion.div>
                            <p className={`${typography.disclaimerBody}`} style={{ color: dark ? "#030303" : "#374151" }}>
                                Jin Shin Jyutsu helps harmonize life energy, reduce stress, and support the body's natural healing abilities.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

            </div>
        </motion.section>
    );
}