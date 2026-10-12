"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";

export default function PracticeInfoGrid({ mudra }) {
    const { dark } = useTheme();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { 
        once: true, 
        amount: 0.1,
        margin: "-50px"
    });

    const bestTime = mudra?.web?.AdviceAndMethod?.BestPracticeTime || "Early morning (Brahma Muhurta) or during meditation sessions.";
    const precautions = mudra?.web?.AdviceAndMethod?.Precautions || [
        "Practice on an empty stomach.",
        "Keep your back straight while practicing.",
        "If you have any medical condition, consult your doctor.",
    ];
    const duration = mudra?.web?.AdviceAndMethod?.IdealDuration || "15-30 minutes daily for best results.";
    const who = mudra?.web?.AdviceAndMethod?.WhoCanPractice || "Anyone can practice Gyan Mudra. It is especially beneficial for students, professionals, and anyone seeking mental clarity.";

    const leftItems = [
        {
            icon: IMAGES.User,
            title: "Best Time to Practice",
            desc: bestTime,
        },
        {
            icon: IMAGES.ShieldTick,
            title: "Precautions",
            desc: precautions,
        },
    ];

    const rightItems = [
        {
            icon: IMAGES.HourGlass,
            title: "Ideal Duration",
            desc: duration,
        },
        {
            icon: IMAGES.ReduceStress,
            title: "Who Can Practice",
            desc: who,
        },
    ];

    // Stagger animation for each info item
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.12,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    };

    return (
        <section 
            ref={sectionRef}
            className="w-full py-10 sm:py-12 md:py-16 px-6 sm:px-10 lg:px-16 flex justify-center"
            style={{ backgroundColor: dark ? "#111827" : "#ffffff" }}
        >
            <motion.div
                className="w-full max-w-7xl rounded-2xl p-6 sm:p-8 lg:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative"
                style={{ backgroundColor: dark ? "#2e1065" : "#EDE9FE" }}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.97 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{
                    boxShadow: dark
                        ? "0 8px 30px rgba(0,0,0,0.35)"
                        : "0 8px 30px rgba(0,0,0,0.08)",
                    transition: { duration: 0.3 },
                }}
            >
                
                {/* Thin vertical line divider on desktop */}
                <motion.div
                    className="hidden md:block absolute left-1/2 top-8 bottom-8 w-px -translate-x-1/2"
                    style={{ backgroundColor: dark ? "#4c1d95" : "#e5e7eb" }}
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                />

                {/* Left Column */}
                <div className="flex flex-col gap-8">
                    {leftItems.map((item, i) => (
                        <motion.div
                            key={i}
                            className="flex items-start gap-4"
                            custom={i}
                            variants={itemVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            whileHover={{ x: 5, transition: { duration: 0.2 } }}
                        >
                            <motion.div
                                className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-2xs"
                                style={{ backgroundColor: dark ? "#1f2937" : "#ffffff" }}
                                whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.2 } }}
                            >
                                <Image
                                    src={item.icon}
                                    alt={item.title}
                                    width={22}
                                    height={22}
                                    className="object-contain"
                                    style={{
                                        filter: dark ? "brightness(0) invert(1)" : "none",
                                    }}
                                />
                            </motion.div>
                            <div>
                                <h3
                                    className="font-bold text-base sm:text-lg mb-1"
                                    style={{ color: dark ? "#f3f4f6" : "#111827" }}
                                >
                                    {item.title}
                                </h3>
                                {Array.isArray(item.desc) ? (
                                    <ul
                                        className="text-xs sm:text-sm leading-relaxed list-disc pl-4 space-y-1"
                                        style={{ color: dark ? "#d1d5db" : "#4b5563" }}
                                    >
                                        {item.desc.map((line, idx) => (
                                            <li key={idx}>
                                                {line}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p
                                        className="text-xs sm:text-sm leading-relaxed"
                                        style={{ color: dark ? "#d1d5db" : "#4b5563" }}
                                    >
                                        {item.desc}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-8">
                    {rightItems.map((item, i) => (
                        <motion.div
                            key={i}
                            className="flex items-start gap-4"
                            custom={i + 2}
                            variants={itemVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            whileHover={{ x: 5, transition: { duration: 0.2 } }}
                        >
                            <motion.div
                                className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-2xs"
                                style={{ backgroundColor: dark ? "#1f2937" : "#ffffff" }}
                                whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.2 } }}
                            >
                                <Image
                                    src={item.icon}
                                    alt={item.title}
                                    width={22}
                                    height={22}
                                    className="object-contain"
                                    style={{
                                        filter: dark ? "brightness(0) invert(1)" : "none",
                                    }}
                                />
                            </motion.div>
                            <div>
                                <h3
                                    className="font-bold text-base sm:text-lg mb-1"
                                    style={{ color: dark ? "#f3f4f6" : "#111827" }}
                                >
                                    {item.title}
                                </h3>
                                <p
                                    className="text-xs sm:text-sm leading-relaxed"
                                    style={{ color: dark ? "#d1d5db" : "#4b5563" }}
                                >
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </motion.div>
        </section>
    );
}