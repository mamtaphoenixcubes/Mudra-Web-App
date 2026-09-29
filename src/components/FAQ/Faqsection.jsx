"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { spacing } from "../../theme/spacing";
import { typography } from "../../theme/typography";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";

// ── FAQ Data ──────────────────────────────────────────────────
const faqData = {
    "Getting Started": [
        {
            q: "What is Mudras?",
            a: "Mudras are symbolic hand gestures used in yoga and meditation practice. Each mudra channels energy flow through the body, helping balance the five elements — earth, water, fire, air, and space — to promote physical and mental well-being.",
        },
        {
            q: "How do Mudras work?",
            a: "Mudras work by creating specific energy circuits in the body. When you hold a mudra, you stimulate certain nerve endings and meridian points in your hands, influencing the flow of prana (life force) throughout your system.",
        },
        {
            q: "Do I need any prior experience to practice Mudras?",
            a: "No prior experience is needed. Mudras are accessible to everyone, regardless of age, fitness level, or yoga background. Our app guides you step by step from the very beginning.",
        },
        {
            q: "What is Yoga Nidra?",
            a: "Yoga Nidra, often called 'yogic sleep', is a powerful guided meditation technique that brings you to the threshold between waking and sleeping states. It is one of the deepest forms of conscious relaxation available.",
        },
        {
            q: "How is Yoga Nidra different from regular meditation?",
            a: "Unlike conventional meditation where you sit with eyes closed and focus attention, Yoga Nidra is practiced lying down and takes you through multiple layers of consciousness — from physical relaxation to deep mental stillness.",
        },
        {
            q: "How often should I practice?",
            a: "Even 10–15 minutes of daily practice can produce noticeable benefits. Consistency matters more than duration — a short daily session outperforms an infrequent long one.",
        },
    ],
    "Mudras": [
        {
            q: "How many mudras are in the app?",
            a: "The app includes over 100 mudras spanning classical Hatha yoga traditions, Buddhist tantric practice, and Ayurvedic healing systems.",
        },
        {
            q: "Can mudras replace medical treatment?",
            a: "Mudras are a complementary wellness practice and are not a substitute for medical diagnosis or treatment. Always consult a qualified healthcare professional for any health concerns.",
        },
        {
            q: "How long should I hold a mudra?",
            a: "Most mudras are most effective when held for 5–15 minutes. Some traditions recommend holding them for up to 45 minutes for deeper therapeutic benefit.",
        },
    ],
    "Yoga Nidra": [
        {
            q: "How long is a Yoga Nidra session?",
            a: "Sessions range from 10 minutes to 60 minutes. A single 30-minute Yoga Nidra session is said to provide the equivalent rest of 2–4 hours of normal sleep.",
        },
        {
            q: "Can I fall asleep during Yoga Nidra?",
            a: "Falling asleep occasionally is normal, especially when starting out. The goal is to remain at the edge of sleep — aware but deeply relaxed. With practice, you will learn to sustain this threshold state.",
        },
    ],
    "Practice & Benefits": [
        {
            q: "What are the benefits of regular mudra practice?",
            a: "Regular practice supports stress reduction, improved focus, better sleep, emotional balance, and enhanced vitality. Many practitioners also report relief from specific conditions such as anxiety, headaches, and digestive issues.",
        },
        {
            q: "Are there mudras for specific health conditions?",
            a: "Yes. The app organises mudras by benefit category — energy, sleep, immunity, digestion, focus, and more — so you can find practices tailored to your needs.",
        },
    ],
    "App & Features": [
        {
            q: "Is the Mudras app free?",
            a: "The app offers a generous free tier with access to foundational mudras and introductory Yoga Nidra sessions. A premium subscription unlocks the full library, personalised programs, and offline access.",
        },
        {
            q: "Can I use the app offline?",
            a: "Yes. Premium subscribers can download sessions for offline use — perfect for travel, retreats, or areas with limited connectivity.",
        },
        {
            q: "Is the app available on both iOS and Android?",
            a: "Yes, the app is available on both the App Store and Google Play. Your progress syncs across devices when you are signed in.",
        },
    ],
    "Account & Access": [
        {
            q: "How do I reset my password?",
            a: "Tap 'Forgot password' on the login screen and enter your registered email address. You will receive a reset link within a few minutes.",
        },
        {
            q: "Can I use one account on multiple devices?",
            a: "Yes. Your account supports simultaneous use on up to three devices. All your bookmarks, progress, and preferences sync automatically.",
        },
    ],
    "General": [
        {
            q: "Are Mudras safe for everyone?",
            a: "Mudras are gentle and safe for most people. A small number of mudras involve mild breath retention or intense stimulation and are not recommended during pregnancy. The app clearly marks any such restrictions.",
        },
        {
            q: "Where can I learn more?",
            a: "Our blog, inside the app and on our website, publishes in-depth articles on mudra philosophy, Ayurvedic theory, and Yoga Nidra science. You can also join our community forum to connect with fellow practitioners.",
        },
    ],
};

const categories = [
    { label: "Getting Started", icon: IMAGES.Elements || IMAGES.Elements },
    { label: "Mudras", icon: IMAGES.HastaMudras || IMAGES.HastaMudras },
    { label: "Yoga Nidra", icon: IMAGES.SleepBetter || IMAGES.SleepBetter },
    { label: "Practice & Benefits", icon: IMAGES.EmotionalBalance || IMAGES.EmotionalBalance },
    { label: "App & Features", icon: IMAGES.Phone || IMAGES.Phone },
    { label: "Account & Access", icon: IMAGES.ReduceStress || IMAGES.ReduceStress },
    { label: "General", icon: IMAGES.ShGeneralield || IMAGES.General },
];

// ── Accordion item ────────────────────────────────────────────
function AccordionItem({ question, answer, isOpen, onToggle, textColor, index }) {
    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: index * 0.06 + 0.2,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return (
        <motion.div 
            className="border rounded-xl overflow-hidden" 
            style={{
                borderColor: textColor + "30",
                backgroundColor: "#ffffff",
            }}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover={{
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                transition: { duration: 0.2 }
            }}
        >
            <motion.button
                onClick={onToggle}
                className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left cursor-pointer hover:bg-gray-50 transition-colors"
                aria-expanded={isOpen}
                whileHover={{
                    scale: 1.01,
                    transition: { duration: 0.2 }
                }}
            >
                <motion.span 
                    className="text-[12px] sm:text-sm md:text-sm lg:text-[15px] font-medium flex-1 leading-snug" 
                    style={{ color: textColor }}
                    whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2 }
                    }}
                >
                    {question}
                </motion.span>
                <motion.span 
                    className={
                        "shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-200 " +
                        (isOpen ? "rotate-180" : "")
                    } 
                    style={{
                        backgroundColor: isOpen ? textColor : "#f3f4f6",
                    }}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <svg
                        viewBox="0 0 24 24"
                        className={"w-3 h-3 " + (isOpen ? "text-white" : "text-gray-500")}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </motion.span>
            </motion.button>

            <motion.div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                animate={{
                    maxHeight: isOpen ? 300 : 0,
                    opacity: isOpen ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                <div className="px-4 pb-4 pt-1">
                    <div className="w-full h-px mb-3" style={{ backgroundColor: textColor + "20" }} />
                    <p className="text-[11px] sm:text-xs md:text-[13px] lg:text-sm leading-relaxed" style={{ color: "#4b5563" }}>
                        {answer}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ── Main Component ────────────────────────────────────────────
export default function FaqSection() {
    const { dark, textColor } = useTheme();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { 
        once: true, 
        amount: 0.05,
        margin: "-50px"
    });

    const [activeCategory, setActiveCategory] = useState("Getting Started");
    const [openIndex, setOpenIndex] = useState(null);
    const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);

    const currentFaqs = faqData[activeCategory] || [];

    const handleCategoryChange = (label) => {
        setActiveCategory(label);
        setOpenIndex(null);
        setMobileCategoryOpen(false);
    };

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

    // Staggered category variants for sidebar
    const categoryVariants = {
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

    // Character animation for heading
    const charVariants = {
        hidden: { opacity: 0, y: 20, rotateX: -10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                delay: i * 0.03,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    };

    const headingText = "Frequently Asked Questions";
    const headingChars = headingText.split("");

    return (
        <motion.section 
            ref={sectionRef}
            className={"w-full " + spacing.sectionPaddingX + " py-10 sm:py-12 md:py-14 lg:py-16"} 
            style={{
                backgroundColor: dark ? "#111827" : "#ffffff",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className={spacing.container}>

                {/* Section heading */}
                <motion.div 
                    className="text-center mb-8 sm:mb-10 md:mb-12"
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <motion.p 
                        className={
                            "text-[11px] sm:text-xs md:text-sm lg:text-base " +
                            "font-semibold uppercase tracking-widest mb-2"
                        } 
                        style={{ color: textColor }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ duration: 0.4 }}
                    >
                        Support
                    </motion.p>
                    <motion.h2 
                        className={
                            "text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl " +
                            "font-semibold leading-tight"
                        } 
                        style={{ color: dark ? "#f9fafb" : "#111827" }}
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
                    <motion.p 
                        className="text-xs sm:text-sm md:text-base mt-2 max-w-xl mx-auto" 
                        style={{ color: dark ? "#9ca3af" : "#6b7280" }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Everything you need to know about mudras, Yoga Nidra, and the app.
                    </motion.p>
                </motion.div>

                {/* Mobile: category dropdown trigger */}
                <motion.div 
                    className="md:hidden mb-4"
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{ delay: 0.1 }}
                >
                    <motion.button
                        onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium"
                        style={{
                            backgroundColor: textColor,
                            color: "#ffffff",
                        }}
                        whileHover={{
                            scale: 1.02,
                            transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="flex items-center gap-2">
                            {(() => {
                                const cat = categories.find(c => c.label === activeCategory);
                                return cat && cat.icon ? (
                                    <Image 
                                        src={cat.icon} 
                                        alt={activeCategory} 
                                        width={16} 
                                        height={16} 
                                        className="w-4 h-4 object-contain"
                                        style={{
                                            filter: "brightness(0) invert(1)",
                                        }}
                                    />
                                ) : null;
                            })()}
                            {activeCategory}
                        </span>
                        <motion.svg
                            viewBox="0 0 24 24"
                            className={"w-4 h-4 transition-transform " + (mobileCategoryOpen ? "rotate-180" : "")}
                            fill="none" stroke="currentColor" strokeWidth="2"
                            animate={{ rotate: mobileCategoryOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <polyline points="6 9 12 15 18 9" />
                        </motion.svg>
                    </motion.button>

                    {/* Mobile dropdown */}
                    {mobileCategoryOpen && (
                        <motion.div 
                            className="mt-1 border rounded-xl overflow-hidden shadow-lg z-10" 
                            style={{
                                backgroundColor: dark ? "#1f2937" : "#ffffff",
                                borderColor: dark ? "#374151" : "#e5e7eb",
                            }}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {categories.map(({ label, icon }) => (
                                <motion.button
                                    key={label}
                                    onClick={() => handleCategoryChange(label)}
                                    className={
                                        "w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors " +
                                        (activeCategory === label
                                            ? "font-medium"
                                            : "")
                                    }
                                    style={{
                                        backgroundColor: activeCategory === label ? textColor : "transparent",
                                        color: activeCategory === label ? "#ffffff" : (dark ? "#e5e7eb" : "#374151"),
                                    }}
                                    whileHover={{
                                        scale: 1.02,
                                        transition: { duration: 0.2 }
                                    }}
                                >
                                    {icon && (
                                        <Image 
                                            src={icon} 
                                            alt={label} 
                                            width={16} 
                                            height={16} 
                                            className="w-4 h-4 object-contain"
                                            style={{
                                                filter: activeCategory === label ? "brightness(0) invert(1)" : "none",
                                            }}
                                        />
                                    )}
                                    {label}
                                </motion.button>
                            ))}
                        </motion.div>
                    )}
                </motion.div>

                {/* Desktop layout: sidebar + accordion */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 items-start">

                    {/* Sidebar — desktop only */}
                    <motion.aside 
                        className="hidden md:flex flex-col w-[200px] lg:w-[220px] xl:w-[240px] shrink-0 border rounded-2xl overflow-hidden shadow-sm" 
                        style={{
                            backgroundColor: dark ? "#1f2937" : "#ffffff",
                            borderColor: dark ? "#ffffff" : "#e5e7eb",
                        }}
                        variants={slideInLeft}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        {categories.map(({ label, icon }, i) => {
                            const isActive = activeCategory === label;
                            return (
                                <motion.button
                                    key={label}
                                    onClick={() => handleCategoryChange(label)}
                                    className={
                                        "flex items-center gap-3 px-4 py-3 text-left transition-colors text-sm font-medium "
                                    }
                                    style={{
                                        backgroundColor: isActive ? textColor : "transparent",
                                        color: isActive ? "#ffffff" : (dark ? "#ffffff" : "#4b5563"),
                                    }}
                                    custom={i}
                                    variants={categoryVariants}
                                    initial="hidden"
                                    animate={isInView ? "visible" : "hidden"}
                                    whileHover={{
                                        scale: 1.02,
                                        x: 2,
                                        transition: { duration: 0.2 }
                                    }}
                                >
                                    {icon && (
                                        <Image 
                                            src={icon} 
                                            alt={label} 
                                            width={16} 
                                            height={16} 
                                            className="w-4 h-4 object-contain"
                                            style={{
                                                filter: isActive ? "brightness(0) invert(1)" : "none",
                                            }}
                                        />
                                    )}
                                    <span className="leading-tight">{label}</span>
                                </motion.button>
                            );
                        })}
                    </motion.aside>

                    {/* Accordion panel */}
                    <motion.div 
                        className="flex-1 w-full rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6" 
                        style={{
                            backgroundColor: dark ? "#374151" : "#E3DDFF",
                        }}
                        variants={slideInRight}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        whileHover={{
                            boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
                            transition: { duration: 0.3 }
                        }}
                    >
                        <div className="flex flex-col gap-2">
                            {currentFaqs.map((item, i) => (
                                <AccordionItem
                                    key={i}
                                    question={item.q}
                                    answer={item.a}
                                    isOpen={openIndex === i}
                                    onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                                    textColor={textColor}
                                    index={i}
                                />
                            ))}
                        </div>
                    </motion.div>

                </div>

            </div>
        </motion.section>
    );
}