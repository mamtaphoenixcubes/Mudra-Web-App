"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";
import SiteContainer from "../../common/SiteContainer";

export default function AsanasLibraryHero() {
    const { dark, textColor } = useTheme();
    const sectionRef = useRef(null);

    const isInView = useInView(sectionRef, {
        once: true,
        amount: 0.1,
        margin: "-50px",
    });

    /* ---------- animation variants ---------- */
    const fadeUp = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };
    const fadeInRight = {
        hidden: { opacity: 0, x: 30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
    };

    return (
        <motion.section
            ref={sectionRef}
            style={{ backgroundColor: dark ? "#111827" : "#ffffff" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            {/* ✅ SiteContainer replaces max-w-7xl mx-auto px-* and supplies py */}
            <SiteContainer>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* ── LEFT CONTENT ── */}
                    <motion.div
                        className="flex flex-col items-start"
                        variants={fadeUp}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        {/* Heading — theme-aware */}
                        <h1
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-2"
                            style={{ color: textColor }}
                        >
                            Yoga Asanas Library
                        </h1>

                        {/* Underline — theme-aware */}
                        <div
                            className="w-12 h-[3px] mb-4"
                            style={{ backgroundColor: textColor }}
                        />

                        {/* Subtitle */}
                        <p
                            className="text-sm sm:text-base lg:text-lg font-medium leading-relaxed mb-6 max-w-xl"
                            style={{ color: dark ? "#e5e7eb" : "#374151" }}
                        >
                            Move with intention. Align with awareness. Explore a curated
                            library of yoga asanas for every posture, purpose, and level of
                            practice.
                        </p>

                        {/* Info Banner — dark-mode aware */}
                        <motion.div
                            className="rounded-2xl p-4 sm:p-5 flex items-start sm:items-center gap-4 max-w-lg w-full"
                            style={{
                                backgroundColor: dark ? "#1f2937" : "#EDE9FE",
                                border: dark ? "1px solid #374151" : "none",
                            }}
                            whileHover={{
                                scale: 1.01,
                                transition: { duration: 0.2 },
                            }}
                        >
                            {/* Icon container */}
                            <div
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm"
                                style={{ backgroundColor: "#ffffff" }}
                            >
                                <Image
                                    src={IMAGES.Energy}
                                    alt="Asanas Library icon"
                                    width={24}
                                    height={24}
                                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                                />
                            </div>

                            {/* Text content */}
                            <div className="flex flex-col gap-0.5">
                                <p
                                    className="font-bold text-xs sm:text-sm"
                                    style={{ color: dark ? "#ffffff" : "#111827" }}
                                >
                                    This is a preview library
                                </p>
                                <p
                                    className="text-xs leading-relaxed"
                                    style={{ color: dark ? "#d1d5db" : "#4b5563" }}
                                >
                                    For the full experience with complete asana guides,
                                    step-by-step alignment cues, and personalized sequences, try
                                    the Mudras App
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* RIGHT COLUMN — HERO IMAGE */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6 }}
                        className="flex justify-center md:justify-end items-center"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={
                                isInView
                                    ? { opacity: 1, scale: 1 }
                                    : { opacity: 0, scale: 0.95 }
                            }
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="flex justify-center md:justify-end items-center w-full"
                        >
                            <div className="relative w-full max-w-[440px] lg:max-w-[700px]">
                                {IMAGES.hero ? (
                                    <Image
                                        src={IMAGES.hero}
                                        alt="Mudra Lotus Hand"
                                        priority
                                        width={700}
                                        height={700}
                                        sizes="(max-width: 768px) 100vw, 700px"
                                        className="w-full h-auto object-contain"
                                    />
                                ) : null}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </SiteContainer>
        </motion.section>
    );
}