"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { spacing, typography, btn, card } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import { IMAGES } from "../../assets/assets";
import { heroImage, maxW } from "../../theme";

// ─── Signature motif: the "touch ring" ───────────────────────────
function TouchRing({ size = 16, stroke = 2, color = "var(--primary)" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="shrink-0">
            <circle
                cx="12"
                cy="12"
                r="9"
                stroke={color}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray="2 4"
            />
        </svg>
    );
}

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const fadeInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
};

const fadeInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

// ─── Fallback data if item is not provided ─────────────────────
const DEFAULT_ITEM = {
    title: "Mudra Practice",
    tag: "Wellness",
    description: "Discover the transformative power of mudras for mind, body, and spirit.",
    duration: "15 min",
    level: "All Levels",
    image: "/images/placeholder.jpg",
    whatItIs: "A mudra is a symbolic hand gesture used in meditation and yoga to direct energy flow.",
    howItWorks: "By connecting specific fingers and points, mudras stimulate different parts of the brain.",
    benefits: [
        "Promotes relaxation and reduces stress",
        "Improves concentration and focus",
        "Enhances energy flow throughout the body",
        "Supports emotional balance",
        "Deepens meditation practice",
        "Strengthens mind-body connection",
    ],
};

export default function BenefitsdetailHero({ item, accent = "var(--primary)" }) {
    const router = useRouter();
    const { dark, textColor } = useTheme();

    // Use default item if none provided
    const data = item || DEFAULT_ITEM;

    const muted = dark ? "#B8AA95" : "var(--gray-600)";
    const ringColor = dark ? "#E8C784" : accent;

    // Navigation handler for Start Practice button
    const handleStartPractice = () => {
        router.push('/PlaySession');
    };

    return (
        <div
            className={`w-full flex flex-col ${spacing.sectionPaddingX}`}
            style={{ 
                backgroundColor: dark ? "#0d0b08" : "var(--background)"
            }}
        >
            {/* ─── MAIN CONTENT ─── */}
            <div className="flex-1">
                {/* Back nav */}
                <div className={`${spacing.container} pt-6`}>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-1.5 text-xs font-medium transition-opacity hover:opacity-70"
                        style={{ color: muted }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke={muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back
                    </button>
                </div>

                {/* ─── Hero ─── */}
                <motion.section
                    className={`${spacing.container} pt-8 pb-10 md:pt-12 md:pb-14`}
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    <div className={`flex flex-col md:flex-row md:items-center ${spacing.heroGap}`}>
                        {/* Title block */}
                        <div className="flex-1 text-center md:text-left">
                            <motion.div variants={fadeUp} className="flex items-center justify-center md:justify-start gap-2 mb-3">
                                <TouchRing size={14} color={ringColor} />
                                <span 
                                    className={typography.sectionLabel} 
                                    style={{ color: ringColor }}
                                >
                                    {data.tag || "Wellness"}
                                </span>
                            </motion.div>

                            <motion.h1
                                variants={fadeUp}
                                className={`${typography.sectionHeading} font-serif `}
                                style={{ color: textColor || "var(--foreground)" }}
                            >
                                {data.title || "Mudra Practice"}
                            </motion.h1>

                            <motion.p
                                variants={fadeUp}
                                className={`${typography.sectionBody} ${spacing.maxWSectionBody} mx-auto md:mx-0 ${spacing.bodyMt}`}
                                style={{ color: muted }}
                            >
                                {data.description || "Discover the transformative power of mudras."}
                            </motion.p>

                            <motion.div
                                variants={fadeUp}
                                className={`flex items-center justify-center md:justify-start gap-4 ${spacing.labelMt}`}
                                style={{ color: muted }}
                            >
                                <span className={typography.cardBody}>{data.duration || "15 min"}</span>
                                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: muted }} />
                                <span className={typography.cardBody}>{data.level || "All Levels"}</span>
                            </motion.div>

                            <motion.button
                                variants={fadeUp}
                                type="button"
                                className={btn.primary}
                                style={{ 
                                    backgroundColor: ringColor,
                                    color: "#ffffff"
                                }}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={handleStartPractice}
                            >
                                Start Practice
                            </motion.button>
                        </div>

                        {/* RIGHT — hero image with specific dimensions */}
                        <motion.div
                            className={`${heroImage.wrapper} ${spacing.heroRightColW} pr-4 sm:pr-6 md:pr-8 lg:pr-10 xl:pr-12`}
                            variants={fadeInRight}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div
                                className="relative w-full flex justify-center md:justify-end"
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <Image
                                    src={IMAGES.HealingRecovery}
                                    alt="Mudra Hand"
                                    priority
                                    width={800}
                                    height={200}
                                    className="rounded-[10px] object-contain"
                                    style={{
                                        borderRadius: '10px',
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.section>
            </div>
        </div>
    );
}