"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";

export default function PranayamHome() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, {
        once: true,
        amount: 0.1,
        margin: "-50px"
    });

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
    };

    const underlineVariants = {
        hidden: { width: 0 },
        visible: {
            width: "3rem",
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.97 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.35 },
        },
    };

    const imageVariants = {
        hidden: { opacity: 0, x: 40, scale: 0.95 },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
        },
    };

    const iconVariants = {
        hidden: { opacity: 0, scale: 0.6, rotate: -15 },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.55 },
        },
    };

    return (
        <section
            ref={sectionRef}
            className="w-full bg-white py-12 md:py-16 px-6 sm:px-10 lg:px-16 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

                {/* LEFT CONTENT */}
                <motion.div
                    className="flex flex-col items-start"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >

                    {/* Heading */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#9A85FE] tracking-tight mb-2"
                    >
                        Pranayama Library
                    </motion.h1>

                    {/* Underline */}
                    <motion.div
                        variants={underlineVariants}
                        className="h-[3px] bg-[#9A85FE] mb-4"
                    />

                    {/* Subtitle — Pranayama related */}
                    <motion.p
                        variants={itemVariants}
                        className="text-sm sm:text-base lg:text-lg text-gray-700 font-medium leading-relaxed mb-6 max-w-xl"
                    >
                        Breathe with intention. Expand your life force. Explore a curated library of pranayama techniques for calm, clarity, energy, and deep inner balance.
                    </motion.p>

                    {/* Info Card Banner */}
                    <motion.div
                        variants={cardVariants}
                        className="bg-[#EDE9FE] rounded-2xl p-4 sm:p-5 flex items-start sm:items-center gap-4 max-w-lg w-full"
                    >
                        {/* Icon container */}
                        <motion.div
                            variants={iconVariants}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-2xs"
                        >
                            <Image
                                src={IMAGES.Energy}
                                alt="Pranayama Library icon"
                                width={24}
                                height={24}
                                className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                            />
                        </motion.div>

                        {/* Text content — Pranayama related */}
                        <div className="flex flex-col gap-0.5">
                            <p className="font-bold text-xs sm:text-sm text-gray-900">
                                This is a preview library
                            </p>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                For the full experience with complete pranayama guides, step-by-step breathing cues, and personalized breathwork sequences, try the Mudras App
                            </p>
                        </div>
                    </motion.div>

                </motion.div>

                {/* RIGHT GRAPHIC: Pranayama illustration */}
                <motion.div
                    className="w-full flex justify-center md:justify-end"
                    variants={imageVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <motion.div
                        className="w-full max-w-[480px] aspect-[4/3] relative flex items-center justify-center"
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <Image
                            src={IMAGES.hero}
                            alt="Pranayama Breathing Illustration"
                            priority
                            width={500}
                            height={400}
                            className="w-full h-full object-contain"
                        />
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}