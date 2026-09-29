"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { typography, spacing, btn } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";

// ── Article data ───────────────────────────────────────────────
const ARTICLES = [
    {
        id: 1,
        title: "Prithvi Mudra: Benefits and How to Practice",
        date: "May 10, 2024",
        readTime: "6 min read",
        bg: "bg-benefit-1",
        imgKey: "MudrasImage",
        category: "Mudras",
    },
    {
        id: 2,
        title: "Yoga Nidra for Deep Relaxation and Healing",
        date: "May 7, 2024",
        readTime: "7 min read",
        bg: "bg-benefit-2",
        imgKey: "YogaNidraImage",
        category: "Yoga Nidra",
    },
    {
        id: 3,
        title: "The Five Elements and Their Healing Power",
        date: "May 3, 2024",
        readTime: "6 min read",
        bg: "bg-problem-3",
        imgKey: "EarthElement",
        category: "Elements",
    },
    {
        id: 4,
        title: "Daily Habits for a Calm and Balanced Mind",
        date: "Apr 28, 2024",
        readTime: "5 min read",
        bg: "bg-benefit-4",
        imgKey: "gyanMudra",
        category: "Mudras",
    },
];

// ── Tab icon circle — image from IMAGES ────────────────────────
function TabIconCircle({ tab, size, imgSize }) {
    const img = IMAGES[tab.imgKey];
    return (
        <div className={`rounded-full flex items-center justify-center shrink-0 ${size} ${tab.iconBg}`}>
            {img ? (
                <Image
                    src={img}
                    alt={tab.label}
                    width={imgSize}
                    height={imgSize}
                    className="object-contain"
                />
            ) : (
                <span className="text-gray-400 text-xs">?</span>
            )}
        </div>
    );
}

// ── Article Card ───────────────────────────────────────────────
function ArticleCard({ article, dark, textColor, index }) {
    const articleImage = IMAGES[article.imgKey];
    
    const cardVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
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
            className={`${article.bg} rounded-2xl overflow-hidden flex flex-col transition-transform duration-200 hover:scale-[1.02] hover:shadow-md`} 
            style={{
                backgroundColor: dark ? undefined : undefined,
            }}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{
                y: -6,
                boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                transition: { duration: 0.2 }
            }}
        >
            <motion.div 
                className="w-full aspect-[4/3] overflow-hidden bg-white/40 shrink-0" 
                style={{
                    backgroundColor: dark ? "#1f2937" : "#f3f4f6",
                }}
                whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.3 }
                }}
            >
                {articleImage ? (
                    <Image
                        src={articleImage}
                        alt={article.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: "center" }}
                    />
                ) : (
                    <div className="w-full h-full bg-white/30" />
                )}
            </motion.div>
            <div className="flex flex-col flex-1 p-3 md:p-4">
                <motion.h3 
                    className="font-semibold text-sm md:text-[10px] lg:text-[12px] xl:text-[20px] leading-snug mb-2" 
                    style={{ color: textColor }}
                    whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2 }
                    }}
                >
                    {article.title}
                </motion.h3>
                <p className="text-xs md:text-[10px] lg:text-sm leading-relaxed flex-1 mb-3" style={{ color: dark ? "#9ca3af" : "#4b5563" }}>
                    {article.desc}
                </p>
                <div className="flex items-center gap-1.5 text-[10px] md:text-[9px] lg:text-xs mt-auto" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                </div>
            </div>
        </motion.div>
    );
}

// ── Main component ─────────────────────────────────────────────
export default function ContinueExploring() {
    const { dark, textColor } = useTheme();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { 
        once: true, 
        amount: 0.05,
        margin: "-50px"
    });

    const [activeTab, setActiveTab] = useState("All Articles");

    const filtered =
        activeTab === "All Articles"
            ? ARTICLES
            : ARTICLES.filter((a) => a.category === activeTab);

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

    const headingText = "Continue Exploring";
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
            className={`${spacing.sectionPaddingX} py-8 md:py-10 lg:py-14`} 
            style={{
                backgroundColor: dark ? "#111827" : "#ffffff",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className={spacing.container}>

                {/* ── Heading ── */}
                <div className="w-full max-w-[1400px] lg:max-w-[1600px] xl:max-w-[1800px] 2xl:max-w-[2100px] mx-auto px-4 sm:px-6 md:px-8">
                    
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
                            style={{
                                backgroundColor: dark ? "#ffffff" : "#e5e7eb",
                            }}
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
                            style={{
                                backgroundColor: dark ? "#ffffff" : "#e5e7eb",
                            }}
                            initial={{ scaleX: 0 }}
                            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        />
                    </motion.div>
                </div>

                {/* ── Grid ── */}
                {filtered.length === 0 ? (
                    <motion.div 
                        className={`${typography.sectionBody} text-center py-20`} 
                        style={{ color: dark ? "#6b7280" : "#9ca3af" }}
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        No articles in this category.
                    </motion.div>
                ) : (
                    <motion.div 
                        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-5"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        {filtered.map((a, index) => (
                            <ArticleCard key={a.id} article={a} dark={dark} textColor={textColor} index={index} />
                        ))}
                    </motion.div>
                )}

            </div>
        </motion.section>
    );
}