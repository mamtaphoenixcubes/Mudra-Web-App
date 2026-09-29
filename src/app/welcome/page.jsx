"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { typography } from "../../theme/typography";
import { spacing } from "../../theme/spacing";
import { useTheme } from "../../context/ThemeContext";

const SLIDES = [
    {
        id: 0,
        image: IMAGES.MeditationBeach,
        title: "Welcome to Mudras",
        body: "Mudras are sacred hand gestures that channel energy, balance the elements, and harmonize mind, body, and spirit.",
        features: [
            { icon: IMAGES.HastaMudras, label: "Ancient\nPractice" },
            { icon: IMAGES.HolisticWellbeing, label: "Holistic\nHealing" },
            { icon: IMAGES.BodyBalance, label: "Mind-Body\nBalance" },
            { icon: IMAGES.YogaNidra, label: "Inner Peace &\nWellbeing" },
        ],
        cta: "Begin Your Journey",
        secondaryLabel: "I'll explore later",
        secondaryAction: "skip",
        iconBg: ["#F3F0FF", "#F0F8FF", "#E8F4FF", "#FFF0F6"],
    },
    {
        id: 1,
        image: IMAGES.Discover,
        title: "Discover the Power\nof Mudras",
        body: "Mudras are simple hand gestures that activate energy flow, restore balance, and support your physical, mental, and emotional well-being.",
        features: [
            { icon: IMAGES.Increases, label: "Boost Energy\nNaturally" },
            { icon: IMAGES.HolisticWellbeing, label: "Restore Balance\n& Harmony" },
            { icon: IMAGES.Mind, label: "Calm Your Mind &\nReduce Stress" },
        ],
        cta: "Next",
        secondaryLabel: null,
        iconBg: ["#F3F0FF", "#E8F4FF", "#FFF0F6"],
    },
    {
        id: 2,
        image: IMAGES.MudraDetailTemplate,
        title: "Ancient Wisdom,\nModern Benefits",
        body: "Rooted in ancient traditions and backed by modern science, Mudras help you lead a healthier, more balanced life every day.",
        features: [
            { icon: IMAGES.IconPractice, label: "Ancient Practice\nTimeless Wisdom" },
            { icon: IMAGES.EmergingResearch, label: "Backed by\nModern Science" },
            { icon: IMAGES.LeafOutline, label: "Natural & Holistic\nWellness" },
        ],
        cta: "Next",
        secondaryLabel: "Back",
        secondaryAction: "back",
        iconBg: ["#F3F0FF", "#E8F4FF", "#FFF0F6"],
    },
    {
        id: 3,
        image: IMAGES.Practice,
        title: "Small Gestures,\nPowerful Results",
        body: "Just a few minutes of Mudras each day can bring lasting positive changes to your body, mind, and soul.",
        features: [
            { icon: IMAGES.Clock, label: "Take Just\nMinutes a Day" },
            { icon: IMAGES.LineChartUp, label: "See Real, Lasting\nBenefits" },
            { icon: IMAGES.Star, label: "Simple, Natural &\nEffective" },
        ],
        cta: "Next",
        secondaryLabel: "Back",
        secondaryAction: "back",
        iconBg: ["#F3F0FF", "#E8F4FF", "#FFF0F6"],
    },
    {
        id: 4,
        image: IMAGES.pranaMudra,
        title: "Your Journey\nStarts Now",
        body: "Embrace the ancient wisdom of Mudras and unlock a healthier, happier, and more balanced you.",
        features: [
            { icon: IMAGES.HealingJourney, label: "Begin Your\nHealing Journey" },
            { icon: IMAGES.Energy, label: "Connect with\nAncient Wisdom" },
            { icon: IMAGES.BestSelf, label: "Become Your\nBest Self" },
        ],
        cta: "Let's Begin",
        secondaryLabel: "Back",
        secondaryAction: "back",
        iconBg: ["#F3F0FF", "#E8F4FF", "#FFF0F6"],
    },
];

function LotusDivider({ dark }) {
    return (
        <motion.div 
            className="flex items-center justify-center gap-3 my-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <div className="h-px w-16" style={{ backgroundColor: dark ? "#374151" : "#d1d5db" }} />
            <motion.div 
                className="relative w-7 h-7 shrink-0"
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.4 }}
            >
                <Image 
                    src={IMAGES.HolisticWellbeing} 
                    alt="" 
                    fill 
                    sizes="28px" 
                    className="object-contain"
                    style={{
                        filter: dark ? "brightness(0.8) invert(1)" : "none",
                    }}
                />
            </motion.div>
            <div className="h-px w-16" style={{ backgroundColor: dark ? "#374151" : "#d1d5db" }} />
        </motion.div>
    );
}

function FeatureTile({ icon, label, bg, hasDivider, dark, textColor, index }) {
    if (!icon) return null;
    return (
        <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
        >
            <div className="flex flex-col items-center gap-2 px-3 flex-1">
                <motion.div 
                    className="w-12 h-12 rounded-full flex items-center justify-center" 
                    style={{ backgroundColor: dark ? bg : bg }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                    <div className="relative w-6 h-6">
                        <Image 
                            src={icon} 
                            alt="" 
                            fill 
                            sizes="24px" 
                            className="object-contain"
                        />
                    </div>
                </motion.div>
                <span className="text-[11px] text-center leading-tight whitespace-pre-line" style={{ color: dark ? "#ffffff" : "#374151" }}>
                    {label}
                </span>
            </div>
            {hasDivider && <div className="w-px h-12 shrink-0" style={{ backgroundColor: dark ? "#ffffff" : "#e5e7eb" }} />}
        </motion.div>
    );
}

export default function Welcome() {
    const router = useRouter();
    const { dark, textColor } = useTheme();
    const [current, setCurrent] = useState(0);
    const slide = SLIDES[current];

    const handleNext = () => {
        if (current === SLIDES.length - 1) {
            router.push('/SignUp');
        } else {
            setCurrent((c) => c + 1);
        }
    };

    const handleBack = () => {
        if (current > 0) setCurrent((c) => c - 1);
    };

    const handleSkip = () => {
        router.push('/SignUp');
    };

    const handleSecondary = () => {
        if (slide.secondaryAction === "back") {
            handleBack();
        } else {
            handleSkip();
        }
    };

    const fadeVariants = {
        enter: { opacity: 0, y: 30 },
        center: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -30 }
    };

    const imageVariants = {
        enter: { opacity: 0, scale: 0.95 },
        center: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 }
    };

    return (
        <section className={`
            grid grid-cols-2 md:grid-cols-2
            items-end md:items-center
            min-h-screen
            ${spacing.sectionPaddingX}
            ${spacing.sectionPaddingY}
            ${spacing.heroGap}
            ${spacing.heroSectionMinH}
        `} style={{
            backgroundColor: dark ? "#111827" : "#ffffff",
        }}>
            {/* Left Column: Image */}
            <motion.div 
                className="relative h-[40vh] sm:h-[45vh] md:h-[40vh] lg:h-[50vh] xl:h-[55vh] 2xl:h-[60vh] w-full overflow-hidden order-1 md:order-1 rounded-2xl"
                style={{
                    backgroundColor: dark ? "#374151" : "#f3f4f6",
                }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        variants={imageVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={slide.image}
                            alt=""
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover object-center"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>

                {current > 0 && (
                    <motion.button 
                        onClick={handleSkip} 
                        className="absolute top-4 right-4 z-10 text-sm font-medium px-4 py-2 rounded-full cursor-pointer transition-colors"
                        style={{
                            color: "#ffffff",
                            backgroundColor: "rgba(0,0,0,0.3)",
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Skip
                    </motion.button>
                )}

                <motion.div 
                    className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 md:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {SLIDES.map((_, i) => (
                        <button 
                            key={i} 
                            onClick={() => setCurrent(i)} 
                            className={`rounded-full transition-all duration-200 cursor-pointer ${i === current ? "w-3 h-3 bg-white" : "w-2 h-2 bg-white/50"}`} 
                        />
                    ))}
                </motion.div>
            </motion.div>

            {/* Right Column: Content */}
            <motion.div 
                className="flex flex-col justify-end md:justify-center px-6 py-4 md:py-8 md:px-8 lg:px-12 order-2 md:order-2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        variants={fadeVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                    >
                        <motion.h1 
                            className={`text-2xl md:text-3xl lg:text-4xl font-bold text-center leading-snug whitespace-pre-line ${typography.heading}`} 
                            style={{ color: textColor }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            {slide.title}
                        </motion.h1>

                        <LotusDivider dark={dark} />

                        <motion.p 
                            className={`text-sm md:text-base text-center leading-relaxed px-2 ${typography.body}`} 
                            style={{ color: dark ? "#fafcff" : "#4b5563" }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {slide.body}
                        </motion.p>
                    </motion.div>
                </AnimatePresence>

                <motion.div 
                    className="flex items-stretch justify-center mt-6 border rounded-xl overflow-hidden p-5"
                    style={{
                        borderColor: dark ? "#f7f7f7" : "#f3f4f6",
                        backgroundColor: dark ? "#1f2937" : "#ffffff",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {slide.features.map((f, i) => (
                        <FeatureTile 
                            key={i} 
                            icon={f.icon} 
                            label={f.label} 
                            bg={slide.iconBg[i % slide.iconBg.length]} 
                            hasDivider={i < slide.features.length - 1}
                            dark={dark}
                            textColor={textColor}
                            index={i}
                        />
                    ))}
                </motion.div>

                <motion.div 
                    className="hidden md:flex items-center justify-center gap-2 mb-5 mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {SLIDES.map((_, i) => (
                        <motion.button 
                            key={i} 
                            onClick={() => setCurrent(i)} 
                            className={`rounded-full transition-all duration-200 cursor-pointer ${i === current ? "w-3 h-3" : "w-2 h-2"}`}
                            style={{
                                backgroundColor: i === current ? textColor : (dark ? "#374151" : "#d1d5db"),
                            }}
                            whileHover={{ 
                                scale: i !== current ? 1.3 : 1,
                            }}
                            whileTap={{ scale: 0.9 }}
                            animate={i === current ? {
                                scale: [1, 1.2, 1],
                            } : {}}
                            transition={{
                                scale: {
                                    duration: 1.5,
                                    repeat: i === current ? Infinity : 0,
                                    ease: "easeInOut",
                                }
                            }}
                        />
                    ))}
                </motion.div>

                {/* Main CTA Button */}
                <motion.button 
                    onClick={handleNext} 
                    className="w-full text-white font-semibold text-base py-3.5 rounded-2xl transition-colors cursor-pointer relative overflow-hidden"
                    style={{
                        backgroundColor: textColor,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ 
                        scale: 1.02,
                        transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                >
                    <motion.span
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                    />
                    <span className="relative">{slide.cta}</span>
                </motion.button>

                {slide.secondaryLabel && (
                    <motion.button 
                        onClick={handleSecondary} 
                        className="mt-3 text-sm text-center underline cursor-pointer self-center transition-colors"
                        style={{ color: dark ? "#ffffff" : "#9ca3af" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        whileHover={{ 
                            scale: 1.05,
                            color: dark ? "#e5e7eb" : "#4b5563"
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {slide.secondaryLabel}
                    </motion.button>
                )}
            </motion.div>
        </section>
    );
}