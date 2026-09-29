"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { card, spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

const exploreLinks = [
    {
        title: "Mudras",
        linkLabel: "Explore Mudras",
        href: "/MudraLibrary",
        bg: "bg-[#E3DDFF]",
        image: IMAGES.HastaMudras,
    },
    {
        title: "Yoga Nidra",
        linkLabel: "Explore Yoga Nidra",
        href: "/YogaNidraLibrary",
        bg: "bg-[#C8E8F5]",
        image: IMAGES.IconYogaNidra,
    },
    {
        title: "Benefits",
        linkLabel: "View Benefits",
        href: "/Home#benefits",
        bg: "bg-[#F8D4DC]",
        image: IMAGES.Energy,
    },
    {
        title: "Library",
        linkLabel: "View Library",
        href: "/BlogLearning",
        bg: "bg-[#D4F5D4]",
        image: IMAGES.IconPractice,
    },
];

function ExploreCard({ item, dark, textColor, index }) {
    const cardVariants = {
        hidden: { opacity: 0, x: -20, scale: 0.95 },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{
                y: -4,
                boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                transition: { duration: 0.2 }
            }}
        >
            <Link
                href={item.href}
                className={`
                    ${item.bg} ${card.radius} ${card.hover}
                    ${spacing.cardPadding}
                    flex items-center gap-3
                    w-full h-full
                `}
                style={{
                    backgroundColor: dark ? undefined : undefined,
                }}
            >
                <motion.div
                    className={`
                        bg-white rounded-full flex items-center justify-center shrink-0
                        ${card.benefitsIconBox}
                    `}
                    style={{
                        backgroundColor: dark ? "#ffffff" : "#ffffff",
                    }}
                    whileHover={{
                        scale: 1.1,
                        rotate: 5,
                        transition: { duration: 0.2 }
                    }}
                >
                    <Image
                        src={item.image}
                        alt={item.title}
                        width={24}
                        height={24}
                        className={`${card.benefitsIconInner} object-contain`}
                    />
                </motion.div>

                <div className="flex flex-col">
                    <motion.h3 
                        className="text-sm md:text-xs lg:text-base font-semibold" 
                        style={{ color: textColor }}
                        whileHover={{
                            scale: 1.02,
                            transition: { duration: 0.2 }
                        }}
                    >
                        {item.title}
                    </motion.h3>
                    <motion.span 
                        className="text-xs md:text-[10px] lg:text-sm" 
                        style={{ color: dark ? "#000000" : "#4b5563" }}
                        whileHover={{
                            x: 3,
                            transition: { duration: 0.2 }
                        }}
                    >
                        {item.linkLabel} →
                    </motion.span>
                </div>
            </Link>
        </motion.div>
    );
}

export default function ExploreMore() {
    const { dark, textColor } = useTheme();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { 
        once: true, 
        amount: 0.05,
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
                delay: i * 0.06,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    };

    const headingText = "Explore More";
    const headingChars = headingText.split("");

    // Container variants for stagger
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.2,
            },
        },
    };

    return (
        <motion.section 
            ref={sectionRef}
            className={`w-full ${spacing.sectionPaddingX} ${spacing.sectionPaddingY} flex justify-center`} 
            style={{
                backgroundColor: dark ? "#111827" : "#ffffff",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className={spacing.container}>
                
                {/* Heading - Character by character */}
                <motion.h2 
                    className={typography.howToPractice.heading} 
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

                {/* Divider */}
                <motion.div 
                    className={typography.howToPractice.dividerWrapper}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <motion.span 
                        className={typography.whySubscribe.dividerLine} 
                        style={{ backgroundColor: dark ? "#ffffff" : "#e5e7eb" }}
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    />
                    <motion.div 
                        className={typography.howToPractice.lotusDivider}
                    >
                        <Image
                            src={IMAGES.Energy}
                            alt="Lotus divider"
                            width={40}
                            height={40}
                            className="w-full h-full object-contain"
                            style={{
                                filter: dark ? "brightness(0.8) invert(1)" : "none",
                            }}
                        />
                    </motion.div>
                    <motion.span 
                        className={typography.whySubscribe.dividerLine} 
                        style={{ backgroundColor: dark ? "#ffffff" : "#e5e7eb" }}
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    />
                </motion.div>

                {/* Grid */}
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {exploreLinks.map((item, i) => (
                        <ExploreCard key={i} item={item} dark={dark} textColor={textColor} index={i} />
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
}