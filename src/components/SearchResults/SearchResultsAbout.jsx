"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { typography, spacing, maxW } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";

// ── Mock data ──────────────────────────────────────────────────
const CATEGORIES = ["All", "Mudras", "Yoga Nidra", "Blog", "Library", "Pages"];

const RESULTS = {
    Mudras: {
        icon: IMAGES.HastaMudras || IMAGES.HastaMudras || null,
        iconBg: "var(--journey-card)",
        total: 6,
        items: [
            {
                title: "Dhyana Mudra",
                desc: "Enhances focus and deepens meditation. Helps calm the mind and improves concentration.",
                href: "#",
                linkLabel: "View Mudra",
            },
            {
                title: "Anjali Mudra",
                desc: "A gesture of prayer and meditation. Brings balance, gratitude, and inner peace.",
                href: "#",
                linkLabel: "View Mudra",
            },
            {
                title: "Chin Mudra",
                desc: "Boosts mental clarity and supports a deeper meditative state.",
                href: "#",
                linkLabel: "View Mudra",
            },
        ],
        viewAllLabel: "View all Mudras results",
    },
    "Yoga Nidra": {
        icon: IMAGES.HastaMudras || IMAGES.HastaMudras || null,
        iconBg: "var(--about-card)",
        total: 5,
        items: [
            {
                title: "Yoga Nidra for Meditation & Relaxation",
                desc: "A guided practice to calm the mind and enter a state of deep relaxation.",
                href: "#",
                linkLabel: "View Practice",
            },
            {
                title: "7 Mudras to Improve Focus During Meditation",
                desc: "Simple yet powerful mudras to help you stay focused and present.",
                href: "#",
                linkLabel: "View Practice",
            },
            {
                title: "The Connection Between Mudras and Meditation",
                desc: "Explore the ancient connection and its benefits for mind and body.",
                href: "#",
                linkLabel: "View Practice",
            },
        ],
        viewAllLabel: "View all Yoga Nidra results",
    },
    Blog: {
        icon: IMAGES.Blog || IMAGES.Blog || null,
        iconBg: "var(--balance-the-elements-card)",
        total: 4,
        items: [
            {
                title: "The Science Behind Mudras",
                desc: "Research-backed insights into how hand gestures influence the nervous system.",
                href: "#",
                linkLabel: "Read Article",
            },
            {
                title: "Morning Mudra Routine for Beginners",
                desc: "Start your day with five simple mudras that take less than ten minutes.",
                href: "#",
                linkLabel: "Read Article",
            },
        ],
        viewAllLabel: "View all Blog results",
    },
    Library: {
        icon: IMAGES.IconPractice || IMAGES.IconPractice || null,
        iconBg: "var(--holistic-bg)",
        total: 5,
        items: [
            {
                title: "Pranayama Fundamentals",
                desc: "A deep reference guide to breath work and its elemental correspondences.",
                href: "#",
                linkLabel: "View Resource",
            },
            {
                title: "Elemental Yoga Nidra Scripts",
                desc: "Guided scripts aligned to earth, water, fire, air, and ether elements.",
                href: "#",
                linkLabel: "View Resource",
            },
        ],
        viewAllLabel: "View all Library results",
    },
    Pages: {
        icon: IMAGES.OngoingStudies || IMAGES.OngoingStudies || null,
        iconBg: "var(--problem-3)",
        total: 3,
        items: [
            {
                title: "About Mudras",
                desc: "Learn about the history, philosophy, and practice of hand mudras.",
                href: "#",
                linkLabel: "View Page",
            },
            {
                title: "Finger Mapping",
                desc: "Understand which elements and organs each finger connects to.",
                href: "#",
                linkLabel: "View Page",
            },
        ],
        viewAllLabel: "View all Pages results",
    },
};

const TOTAL = Object.values(RESULTS).reduce((sum, c) => sum + c.total, 0);

function ArrowRight({ className = "w-3.5 h-3.5", color }) {
    return (
        <motion.svg 
            viewBox="0 0 16 16" 
            fill="none" 
            className={className} 
            stroke={color || "currentColor"} 
            strokeWidth={2}
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
        >
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
    );
}

export default function SearchResultsPage() {
    const { dark, textColor } = useTheme();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { 
        once: true, 
        amount: 0.05,
        margin: "-50px"
    });

    const [activeTab, setActiveTab] = useState("All");

    const visibleCategories =
        activeTab === "All"
            ? Object.entries(RESULTS)
            : Object.entries(RESULTS).filter(([key]) => key === activeTab);

    // Animation variants
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.6, ease: "easeOut" } 
        }
    };

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

    const categoryVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.97 },
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

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.05 + 0.2,
                duration: 0.4,
                ease: "easeOut",
            },
        }),
    };

    const tabVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05 + 0.1,
                duration: 0.4,
                ease: "easeOut",
            },
        }),
    };

    return (
        <motion.main 
            ref={sectionRef}
            className={`min-h-screen ${spacing.sectionPaddingX} ${spacing.searchPage.mainPadding}`} 
            style={{
                backgroundColor: dark ? "#111827" : "#ffffff",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <motion.div 
                className={maxW.sectionBody}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {/* Top bar */}
                <motion.div 
                    className={`flex flex-col sm:flex-row items-center justify-between ${spacing.searchGaps.topBar} ${spacing.searchBorders.topBorder} ${spacing.searchPage.topBar}`} 
                    style={{
                        borderColor: dark ? "#374151" : "#e5e7eb",
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.p 
                        className={typography.searchPage.resultCount} 
                        style={{ color: dark ? "#ffffff" : "#6b7280" }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        About {TOTAL} results found
                    </motion.p>

                    {/* Tab bar */}
                    <div className={`flex items-center justify-start sm:justify-center ${spacing.searchGaps.tabBar} overflow-x-auto scrollbar-hide w-full sm:w-auto`}>
                        {CATEGORIES.map((cat, index) => (
                            <motion.button
                                key={cat}
                                onClick={() => setActiveTab(cat)}
                                className={`
                                    px-2.5 sm:px-3 py-1.5
                                    ${typography.searchPage.tabButton}
                                    ${spacing.searchBorders.tabBorder}
                                    ${activeTab === cat
                                        ? typography.searchPage.activeTab
                                        : typography.searchPage.inactiveTab
                                    }
                                `}
                                style={{
                                    color: activeTab === cat ? textColor : (dark ? "#fcfdfd" : "#6b7280"),
                                    borderColor: activeTab === cat ? textColor : "transparent",
                                }}
                                custom={index}
                                variants={tabVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.2 }
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {cat}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Category sections */}
                <motion.div 
                    className={maxW.content}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {visibleCategories.map(([catKey, cat], catIdx) => (
                        <motion.section 
                            key={catKey} 
                            className={spacing.searchPage.categorySection}
                            variants={categoryVariants}
                        >
                            {/* Two-column layout */}
                            <div className={`flex ${spacing.searchGaps.categoryIcon} items-start`}>

                                {/* LEFT: icon circle */}
                                <motion.div 
                                    className={spacing.searchWidths.categoryIconColumn}
                                    whileHover={{
                                        scale: 1.1,
                                        rotate: 5,
                                        transition: { duration: 0.2 }
                                    }}
                                >
                                    <div
                                        className={`${spacing.searchIcons.categoryIconContainer} rounded-full flex items-center justify-center`}
                                        style={{ backgroundColor: dark ? cat.iconBg : cat.iconBg }}
                                    >
                                        {cat.icon ? (
                                            <Image
                                                src={cat.icon}
                                                alt={catKey}
                                                width={29}
                                                height={29}
                                                className={`${spacing.searchIcons.categoryIconImage} object-contain`}
                                            />
                                        ) : (
                                            <span className={typography.searchPage.iconPlaceholder} style={{ color: dark ? "#ffffff" : "#6b7280" }}>
                                                {catKey[0]}
                                            </span>
                                        )}
                                    </div>
                                </motion.div>

                                {/* RIGHT: content */}
                                <div className={spacing.searchWidths.resultContent}>

                                    {/* Category heading */}
                                    <motion.h2 
                                        className={`${typography.searchPage.categoryHeading} ${spacing.searchPage.categoryHeading} text-left`} 
                                        style={{ color: textColor }}
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {catKey}{" "}
                                        <span className={typography.searchPage.categoryCount} style={{ color: dark ? "#f0f0f0" : "#6b7280" }}>({cat.total})</span>
                                    </motion.h2>

                                    {/* Result rows */}
                                    <div className="flex flex-col">
                                        {cat.items.map((item, itemIdx) => (
                                            <motion.div 
                                                key={itemIdx}
                                                custom={itemIdx}
                                                variants={itemVariants}
                                                initial="hidden"
                                                whileInView="visible"
                                                viewport={{ once: true }}
                                            >
                                                <motion.div 
                                                    className={`flex flex-col sm:flex-row sm:items-start ${spacing.searchGaps.resultRowInner} ${spacing.searchPage.resultRow} text-left`}
                                                    whileHover={{
                                                        x: 3,
                                                        transition: { duration: 0.2 }
                                                    }}
                                                >
                                                    {/* Title */}
                                                    <motion.p 
                                                        className={`${typography.searchPage.resultTitle} ${spacing.searchWidths.titleColumn} shrink-0`} 
                                                        style={{ color: textColor }}
                                                        whileHover={{
                                                            scale: 1.02,
                                                            transition: { duration: 0.2 }
                                                        }}
                                                    >
                                                        {item.title}
                                                    </motion.p>
                                                    {/* Desc + link */}
                                                    <div className={spacing.searchWidths.resultContent}>
                                                        <p className={typography.searchPage.resultDescription} style={{ color: dark ? "#ffffff" : "#4b5563" }}>
                                                            {item.desc}
                                                        </p>
                                                        <motion.a
                                                            href={item.href}
                                                            className={`inline-flex items-center ${spacing.searchGaps.viewAllLink} ${typography.searchPage.resultLink} justify-start`}
                                                            style={{ color: textColor }}
                                                            whileHover={{
                                                                x: 3,
                                                                transition: { duration: 0.2 }
                                                            }}
                                                        >
                                                            {item.linkLabel}
                                                            <ArrowRight className={spacing.searchIcons.arrowIcon} color={textColor} />
                                                        </motion.a>
                                                    </div>
                                                </motion.div>

                                                {/* Row divider */}
                                                {itemIdx < cat.items.length - 1 && (
                                                    <motion.div 
                                                        className={spacing.searchBorders.resultDivider} 
                                                        style={{
                                                            borderColor: dark ? "#868181" : "#f3f4f6",
                                                        }}
                                                        initial={{ scaleX: 0 }}
                                                        whileInView={{ scaleX: 1 }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 0.4, delay: itemIdx * 0.05 + 0.2 }}
                                                    />
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* View all link */}
                                    <motion.div 
                                        className={`${spacing.searchPage.viewAllLink} text-left`}
                                        whileHover={{ x: 3 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <a
                                            href="#"
                                            className={`inline-flex items-center ${spacing.searchGaps.viewAllLink} ${typography.searchPage.viewAllLink} justify-start`}
                                            style={{ color: textColor }}
                                        >
                                            {cat.viewAllLabel}
                                            <ArrowRight className={spacing.searchIcons.arrowIcon} color={textColor} />
                                        </a>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Section divider */}
                            {catIdx < visibleCategories.length - 1 && (
                                <motion.div 
                                    className={spacing.searchBorders.sectionDivider} 
                                    style={{
                                        borderColor: dark ? "#ffffff" : "#f3f4f6",
                                    }}
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: catIdx * 0.1 + 0.2 }}
                                />
                            )}
                        </motion.section>
                    ))}
                </motion.div>

            </motion.div>
        </motion.main>
    );
}