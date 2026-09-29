"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { card, spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

const researchCards = [
    {
        title: "Emerging Research",
        description: "Studies suggest mudras may influence the autonomic nervous system, brain waves and hormonal balance.",
        bg: "bg-problem-1",
        image: IMAGES.EmergingResearch,
    },
    {
        title: "Improved Outcomes",
        description: "Research indicates potential benefits in stress reduction, anxiety management, sleep quality and pain relief.",
        bg: "bg-problem-2",
        image: IMAGES.ImprovedOutcomes,
    },
    {
        title: "Ongoing Studies",
        description: "More high-quality clinical trials are needed to fully understand the scope and mechanisms.",
        bg: "bg-problem-3",
        image: IMAGES.OngoingStudies,
    },
    {
        title: "Holistic Impact",
        description: "Mudras work best when combined with breath, awareness and a balanced lifestyle.",
        bg: "bg-problem-4",
        image: IMAGES.ReduceStress,
    },
];

function ResearchCard({ item, dark, textColor, index }) {
    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return (
        <motion.div 
            className={`${item.bg} ${card.radius} ${card.hover} ${spacing.cardPadding} flex flex-col items-center text-center w-full h-full`}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{
                y: -6,
                transition: { duration: 0.2, ease: "easeOut" },
            }}
        >
            {/* Large white circle icon */}
            <motion.div 
                className={`${card.iconBox} mb-3 sm:mb-4 md:mb-5 lg:mb-6 ${spacing.cardIconBox}`}
                whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.2 },
                }}
            >
                <Image
                    src={item.image}
                    alt={item.title}
                    width={48}
                    height={48}
                    className={`${spacing.cardIconInner} object-contain`}
                />
            </motion.div>

            <motion.h3 
                className={`${typography.cardTitle} mb-1 sm:mb-1.5 md:mb-2 lg:mb-2.5`} 
                style={{ color: textColor }}
                whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                }}
            >
                {item.title}
            </motion.h3>
            <p className={`${typography.cardBody}`} style={{ color: dark ? "#020202" : "#4b5563" }}>
                {item.description}
            </p>
        </motion.div>
    );
}

export default function DoesResearch() {
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
            <div className={spacing.container}>

                {/* ── Heading ── */}
                <motion.div 
                    className={`text-center ${spacing.headingBlockMb}`}
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <p className={`${typography.benefitsSectionLabel}`} style={{ color: dark ? "#ffffff" : "#9ca3af" }}>
                        RESEARCH EXPLANATION
                    </p>
                    <h2 className={`${typography.benefitsSectionHeading} ${spacing.labelMt}`} style={{ color: textColor }}>
                        What Does Research Say?
                    </h2>
                    <p className={`${typography.sectionMbBody} mt-2 sm:mt-3`} style={{ color: dark ? "rgb(255, 255, 255)" : "#4b5563" }}>
                        Modern science is beginning to explore the effects of mudras.
                    </p>
                </motion.div>

                {/* ── Cards grid ── */}
                <motion.div 
                    className={`grid grid-cols-2 sm:grid-cols-4 ${spacing.cardGap}`}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {researchCards.map((item, i) => (
                        <ResearchCard key={i} item={item} dark={dark} textColor={textColor} index={i} />
                    ))}
                </motion.div>

            </div>
        </motion.section>
    );
}