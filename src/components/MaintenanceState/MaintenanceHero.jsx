"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

export default function MaintenanceHero() {
    const { dark, textColor } = useTheme();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { 
        once: true, 
        amount: 0.1,
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

    const slideInLeft = {
        hidden: { opacity: 0, x: -40 },
        visible: { 
            opacity: 1, 
            x: 0, 
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
        }
    };

    const slideInRight = {
        hidden: { opacity: 0, x: 40 },
        visible: { 
            opacity: 1, 
            x: 0, 
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
        }
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

    // Word animation for body text
    const wordVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.04,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    };

    // Split text
    const heading1Text = "We're Improving Your Experience";
    const heading1Chars = heading1Text.split("");
    
    const body1Text = "Our website is currently under maintenance to bring you a better, faster, and more inspiring experience.";
    const body1Words = body1Text.split(" ");
    
    const heading2Text = "We'll be back soon!";
    const heading2Chars = heading2Text.split("");
    
    const body2Text = "Thank you for your patience and understanding.";
    const body2Words = body2Text.split(" ");

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
            <div className="flex flex-col items-center text-center">

                {/* Heading - Character by character */}
                <motion.h1 
                    className={`${typography.aboutHeading} mb-3 sm:mb-4`} 
                    style={{ color: textColor }}
                >
                    {heading1Chars.map((char, i) => (
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
                </motion.h1>

                {/* Body - Word by word */}
                <motion.p 
                    className={`${typography.heroBody} leading-relaxed max-w-sm sm:max-w-md md:max-w-lg`} 
                    style={{ color: dark ? "#ffffff" : "#4b5563" }}
                >
                    {body1Words.map((word, i) => (
                        <motion.span
                            key={i}
                            custom={i}
                            variants={wordVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            style={{ display: "inline-block", marginRight: "0.25em" }}
                            transition={{ delay: i * 0.04 + 0.2 }}
                        >
                            {word}
                        </motion.span>
                    ))}
                </motion.p>

                {/* Divider */}
                <motion.div 
                    className={typography.divider.wrapper}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <motion.span 
                        className={typography.divider.line} 
                        style={{
                            backgroundColor: dark ? "#ffffff" : "#e5e7eb",
                        }}
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    />
                    <motion.div 
                        className={typography.divider.icon}>
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
                        className={typography.divider.line} 
                        style={{
                            backgroundColor: dark ? "#ffffff" : "#e5e7eb",
                        }}
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    />
                </motion.div>

                {/* We'll be back soon - Character by character */}
                <motion.h2 
                    className={`${typography.sectionMbHeading} mb-2 sm:mb-3`} 
                    style={{ color: textColor }}
                >
                    {heading2Chars.map((char, i) => (
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

                {/* Body 2 - Word by word */}
                <motion.p 
                    className={`${typography.heroBody} mb-10 sm:mb-12 md:mb-14`} 
                    style={{ color: dark ? "#ffffff" : "#4b5563" }}
                >
                    {body2Words.map((word, i) => (
                        <motion.span
                            key={i}
                            custom={i}
                            variants={wordVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            style={{ display: "inline-block", marginRight: "0.25em" }}
                            transition={{ delay: i * 0.04 + 0.4 }}
                        >
                            {word}
                        </motion.span>
                    ))}
                </motion.p>

                {/* While You Wait card */}
                <motion.div 
                    className={spacing.maintenanceHero.card} 
                    style={{
                        backgroundColor: dark ? "#1f2937" : "#f9fafb",
                        borderColor: dark ? "#374151" : "#e5e7eb",
                    }}
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{ delay: 0.3 }}
                    whileHover={{
                        boxShadow: dark 
                            ? "0 8px 30px rgba(0,0,0,0.3)"
                            : "0 8px 30px rgba(0,0,0,0.06)",
                        transition: { duration: 0.3 }
                    }}
                >
                    {/* Col 1: Image */}
                    <motion.div 
                        className={spacing.maintenanceHero.imageCol} 
                        style={{
                            backgroundColor: dark ? "#374151" : "#f3f4f6",
                        }}
                        variants={slideInLeft}
                    >
                        <motion.div
                            className="w-full h-full"
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <Image
                                src={IMAGES.MeditationBeach}
                                alt="Person meditating at sunset on the beach"
                                width={250}
                                height={220}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Col 2: Center content */}
                    <motion.div 
                        className={spacing.maintenanceHero.contentCol}
                        variants={slideInRight}
                    >
                        <motion.div 
                            className={spacing.maintenanceHero.iconContainer} 
                            style={{
                                backgroundColor: dark ? "#374151" : "#f3f4f6",
                            }}
                            whileHover={{
                                scale: 1.1,
                                rotate: 5,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <Image
                                src={IMAGES.VectorImage}
                                alt="Lotus icon"
                                width={24}
                                height={24}
                                className={spacing.maintenanceHero.iconImage}
                                style={{
                                    filter: dark ? "brightness(0.8) invert(1)" : "none",
                                }}
                            />
                        </motion.div>

                        <motion.h3 
                            className={typography.maintenanceHero.heading} 
                            style={{ color: textColor }}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.2 }
                            }}
                        >
                            While You Wait...
                        </motion.h3>

                        <motion.p 
                            className={typography.maintenanceHero.body} 
                            style={{ color: dark ? "#ffffff" : "#4b5563" }}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.2 }
                            }}
                        >
                            Take a deep breath and explore the power of mudras, yoga nidra, and mindful living.
                        </motion.p>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href="/mudras"
                                className={spacing.maintenanceHero.button}
                                style={{
                                    backgroundColor: textColor,
                                    color: "#ffffff",
                                    transition: "all 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.opacity = "0.85";
                                    e.currentTarget.style.transform = "scale(1.02)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.opacity = "1";
                                    e.currentTarget.style.transform = "scale(1)";
                                }}
                            >
                                Explore Mudras
                            </Link>
                        </motion.div>
                    </motion.div>

                </motion.div>

            </div>
        </motion.section>
    );
}