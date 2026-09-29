"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { heroImage, maxW, spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

export default function YogaNidraHero() {
    const { dark, textColor } = useTheme();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { 
        once: true, 
        amount: 0.2,
        margin: "-50px"
    });

    // Animation variants
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.6, ease: "easeOut" } 
        }
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

    return (
        <motion.section
            ref={sectionRef}
            className={`
                grid grid-cols-2 md:grid-cols-2
                items-center
                ${spacing.sectionPaddingX}
                ${spacing.sectionPaddingY}
                ${spacing.heroGap}
                ${spacing.heroSectionMinH}
            `}
            style={{
                backgroundColor: dark ? "#111827" : "#f9fafb",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            {/* LEFT */}
            <motion.div 
                className={`flex flex-col ${spacing.heroLeftColWb} ${spacing.heroLeftColOffset}`}
                variants={fadeInLeft}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <div className={spacing.contentColumn}>

                    {/* Heading */}
                    <motion.h1 
                        className={`${typography.MainHeading}`} 
                        style={{ color: textColor }}
                        variants={fadeUp}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        Rooted in Ancient Wisdom. Alive in Every Gesture.
                    </motion.h1>

                    {/* Underline */}
                    <motion.div 
                        className="w-8 sm:w-10 lg:w-14 h-[2px] sm:h-[3px] mt-1 sm:mt-2 mb-2 sm:mb-4" 
                        style={{ backgroundColor: textColor }}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: "3.5rem" } : { width: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    />

                    {/* Body */}
                    <motion.p
                        className={`
                            ${typography.heroBody}
                            ${maxW.heroMbBody}
                        `}
                        style={{ color: dark ? "#ffffff" : "#4b5563" }}
                        variants={fadeUp}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        transition={{ delay: 0.2 }}
                    >
                        Mudras have been part of spiritual, healing and transformative practices for thousands of years.
                        Their journey spans cultures, philosophies and traditions-evolving yet timeless.
                    </motion.p>

                    {/* Info card */}
                    <motion.div
                        className={`
                            rounded-lg sm:rounded-xl
                            ${spacing.buttonGroupMt}
                            px-2 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-4
                            flex flex-row items-center gap-2 sm:gap-3 lg:gap-4
                            ${maxW.yogaNidraCardW}
                        `}
                        style={{
                            backgroundColor: dark ? "#374151" : textColor + "10",
                        }}
                        variants={fadeUp}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        transition={{ delay: 0.4 }}
                        whileHover={{
                            scale: 1.02,
                            transition: { duration: 0.2 }
                        }}
                    >
                        {/* Icon */}
                        <motion.div 
                            className="shrink-0"
                            whileHover={{
                                scale: 1.1,
                                rotate: 5,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <Image
                                src={IMAGES.Energy}
                                alt="Yoga Nidra icon"
                                width={28}
                                height={28}
                                className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 object-contain opacity-70"
                                style={{
                                    filter: dark ? "brightness(0.8) invert(1)" : "none",
                                }}
                            />
                        </motion.div>

                        {/* Text lines */}
                        <div className="flex flex-col gap-0 sm:gap-0.5">
                            <p className={`${typography.yogaNidraCard}`} style={{ color: textColor }}>
                                From ancient caves to modern classrooms,
                            </p>
                            <p className={`${typography.yogaNidraCard}`} style={{ color: textColor }}>
                                mudras continue to guide us inward
                            </p>
                        </div>
                    </motion.div>

                </div>
            </motion.div>

            {/* RIGHT — hero image */}
            <motion.div 
                className={`${heroImage.wrapper} ${spacing.heroRightColW}`}
                variants={fadeInRight}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <motion.div
                    whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.3 }
                    }}
                >
                    <Image
                        src={IMAGES.hero}
                        alt="Mudra Hand"
                        priority
                        className={`
                            ${heroImage.width}
                            h-auto
                            object-contain
                            max-w-full md:max-w-none
                        `}
                    />
                </motion.div>
            </motion.div>
        </motion.section>
    );
}