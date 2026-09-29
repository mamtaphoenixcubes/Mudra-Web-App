"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

export default function FounderJourney() {
    const { dark, textColor } = useTheme();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { 
        once: true, 
        amount: 0.05,
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

    // Character animation for headings
    const charVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.03,
                duration: 0.4,
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
                delay: i * 0.02,
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    };

    // Staggered image variants
    const imageVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2,
            },
        },
    };

    // Split text for section 1
    const heading1 = "The Intersection of Two Worlds";
    const heading1Chars = heading1.split("");
    const body1Text1 = "Amitabha Bhatia's journey belongs to two distinct worlds: the high-velocity landscape of modern business and consultancy, and the timeless, disciplined realms of traditional wellness. Amitabha spent decades navigating the demands of corporate structures, strategic branding, and technological ecosystems.";
    const body1Text1Words = body1Text1.split(" ");
    const body1Text2 = "But while the world saw an analytical entrepreneur, Amitabha's internal compass was fixed on a deeper study of the mathematical, energetic, and philosophical foundations of ancient science.";
    const body1Text2Words = body1Text2.split(" ");
    const body1Text3 = "With years of immersive study in classical yoga philosophy, energetic anatomy, and traditional environmental principles, Amitabha recognized a critical flaw in the modern wellness industry: it was ignoring the subtle mechanics of human chemistry.";
    const body1Text3Words = body1Text3.split(" ");

    // Split text for section 2
    const heading2 = "The Catalyst: The Burnout of a Connected World";
    const heading2Chars = heading2.split("");
    const body2Text1 = "The inspiration for Yoga Mudra Nidra did not come from a place of quiet isolation; it came from observing the profound exhaustion of the modern professional.";
    const body2Text1Words = body2Text1.split(" ");
    const body2Text2 = "Amitabha watched as brilliant minds burned out, trapped in a state of perpetual physiological stress. They were trying to solve their exhaustion with high-intensity workouts or generic mindfulness apps that only scratched the surface.";
    const body2Text2Words = body2Text2.split(" ");
    const body2Text3 = "He realized the missing link: the ancient sages didn't rely on exhausting physical postures to alter their state of consciousness or heal their bodies. They used Mudras to close the body's circuit boards and Yoga Nidra to access the deep, restorative state of dreamless sleep while remaining fully aware. They were hacking their biology thousands of years before the word 'bio-hacking' existed.";
    const body2Text3Words = body2Text3.split(" ");

    // Split text for section 3
    const heading3 = "The Vision for Yoga Mudra Nidra";
    const heading3Chars = heading3.split("");
    const body3Text1 = "Amitabha created Yoga Mudra Nidra to serve as a bridge. He wanted to strip away the gatekeeping around these advanced practices and build a rigorous, uncompromised, and beautifully designed digital encyclopedia.";
    const body3Text1Words = body3Text1.split(" ");
    const body3Text2 = "By cataloging not just Vedic gestures but also parallel traditions like Buddhist mudras and the Japanese art of Jin Shin Jyutsu, Amitabha has built a global sanctuary for energetic healing.";
    const body3Text2Words = body3Text2.split(" ");
    const body3Text3 = "Under his vision, Yoga Mudra Nidra is more than an app or a website. It is a roadmap to help you reclaim your focus, master your internal elements, and experience the profound, life-altering power of conscious rest.";
    const body3Text3Words = body3Text3.split(" ");

    // Split text for section 4
    const heading4 = "Expanding the Horizon";
    const heading4Chars = heading4.split("");
    const body4Text1 = "Amitabha's work spans across holistic wellness, strategic consulting, and personal transformation systems.";
    const body4Text1Words = body4Text1.split(" ");
    const body4Text2 = "To explore the full ecosystem of his work, philosophies, and other professional ventures, visit";
    const body4Text2Words = body4Text2.split(" ");

    return (
        <motion.section 
            ref={sectionRef}
            style={{
                backgroundColor: dark ? "#111827" : "#ffffff",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            {/* 01 — The Intersection of Two Worlds - Text Left, Image Right */}
            <motion.div 
                className={spacing.journeySection.blockWrapper}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 max-w-7xl mx-auto px-4 md:px-6">
                    
                    {/* Text Column - on left (desktop), below image (mobile) */}
                    <motion.div 
                        className="flex-1 order-2 md:order-1"
                        variants={slideInLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <div className={spacing.journeySection.badgeHeadingRow}>
                            <div className={spacing.journeySection.badgeWrapper}>
                                <span className={typography.journeySection.badge} style={{ color: textColor }}>01</span>
                                <span className={spacing.journeySection.badgeUnderline} style={{ backgroundColor: textColor }} />
                            </div>
                            <motion.h1 
                                className={typography.journeySection.heading} 
                                style={{ color: textColor }}
                            >
                                {heading1Chars.map((char, i) => (
                                    <motion.span
                                        key={i}
                                        custom={i}
                                        variants={charVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        style={{ display: "inline-block" }}
                                    >
                                        {char === " " ? "\u00A0" : char}
                                    </motion.span>
                                ))}
                            </motion.h1>
                        </div>
                        <motion.p className={typography.journeySection.body} style={{ color: dark ? "#f3f3f3" : "#4b5563" }}>
                            {body1Text1Words.map((word, i) => (
                                <motion.span
                                    key={i}
                                    custom={i}
                                    variants={wordVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    style={{ display: "inline-block", marginRight: "0.25em" }}
                                    transition={{ delay: i * 0.02 + 0.2 }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </motion.p>
                        <motion.p className={typography.journeySection.body} style={{ color: dark ? "#ffffff" : "#4b5563" }}>
                            {body1Text2Words.map((word, i) => (
                                <motion.span
                                    key={i}
                                    custom={i}
                                    variants={wordVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    style={{ display: "inline-block", marginRight: "0.25em" }}
                                    transition={{ delay: i * 0.02 + 0.4 }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </motion.p>
                        <motion.p className={typography.journeySection.body} style={{ color: dark ? "#ffffff" : "#4b5563" }}>
                            {body1Text3Words.map((word, i) => (
                                <motion.span
                                    key={i}
                                    custom={i}
                                    variants={wordVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    style={{ display: "inline-block", marginRight: "0.25em" }}
                                    transition={{ delay: i * 0.02 + 0.6 }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </motion.p>
                    </motion.div>

                    {/* Image Column - on right (desktop), above text (mobile) */}
                    <motion.div 
                        className="flex-1 order-1 md:order-2"
                        variants={imageVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <div className={spacing.journeySection.imagePairWrapper}>
                            <motion.div 
                                className={spacing.journeySection.imagePairItemWrapper} 
                                style={{
                                    backgroundColor: dark ? "#374151" : "#f3f4f6",
                                }}
                                whileHover={{
                                    scale: 1.03,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <Image
                                    src={IMAGES.ITlife}
                                    alt="Looking out at the city skyline"
                                    width={300}
                                    height={400}
                                    className={spacing.journeySection.imagePairItem}
                                />
                            </motion.div>
                            <motion.div 
                                className={spacing.journeySection.imagePairItemWrapper} 
                                style={{
                                    backgroundColor: dark ? "#374151" : "#f3f4f6",
                                }}
                                whileHover={{
                                    scale: 1.03,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <Image
                                    src={IMAGES.Peacefull}
                                    alt="Looking out at the mountains"
                                    width={300}
                                    height={400}
                                    className={spacing.journeySection.imagePairItem}
                                />
                            </motion.div>
                        </div>
                    </motion.div>

                </div>
            </motion.div>

            {/* Horizontal Line Divider */}
            <motion.div 
                className="max-w-10xl mx-auto px-4"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <hr className={`border-t ${dark ? 'border-gray-700' : 'border-gray-200'}`} />
            </motion.div>

            {/* 02 — The Catalyst: Image Left, Text Right */}
            <motion.div 
                className={spacing.journeySection.blockWrapperAlt}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
            >
                <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-12 max-w-7xl mx-auto px-4 md:px-6">
                    
                    {/* Image Column - on left (desktop), above text (mobile) */}
                    <motion.div 
                        className="flex-1 order-1 md:order-2"
                        variants={imageVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.div 
                            className={spacing.journeySection.imageWrapper} 
                            style={{
                                backgroundColor: dark ? "#374151" : "#f3f4f6",
                            }}
                            whileHover={{
                                scale: 1.03,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <Image
                                src={IMAGES.journeySunset}
                                alt="Person standing in silhouette at sunset"
                                width={400}
                                height={500}
                                className={spacing.journeySection.image}
                            />
                        </motion.div>
                    </motion.div>

                    {/* Text Column - on right (desktop), below image (mobile) */}
                    <motion.div 
                        className="flex-1 order-2 md:order-1"
                        variants={slideInRight}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <div className={spacing.journeySection.badgeHeadingRow}>
                            <div className={spacing.journeySection.badgeWrapper}>
                                <span className={typography.journeySection.badgeAlt} style={{ color: textColor }}>02</span>
                                <span className={spacing.journeySection.badgeUnderline} style={{ backgroundColor: textColor }} />
                            </div>
                            <motion.h3 
                                className={typography.journeySection.heading} 
                                style={{ color: textColor }}
                            >
                                {heading2Chars.map((char, i) => (
                                    <motion.span
                                        key={i}
                                        custom={i}
                                        variants={charVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        style={{ display: "inline-block" }}
                                    >
                                        {char === " " ? "\u00A0" : char}
                                    </motion.span>
                                ))}
                            </motion.h3>
                        </div>
                        <motion.p className={typography.journeySection.body} style={{ color: dark ? "#000000" : "#4b5563" }}>
                            {body2Text1Words.map((word, i) => (
                                <motion.span
                                    key={i}
                                    custom={i}
                                    variants={wordVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    style={{ display: "inline-block", marginRight: "0.25em" }}
                                    transition={{ delay: i * 0.02 + 0.2 }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </motion.p>
                        <motion.p className={typography.journeySection.body} style={{ color: dark ? "#000000" : "#4b5563" }}>
                            {body2Text2Words.map((word, i) => (
                                <motion.span
                                    key={i}
                                    custom={i}
                                    variants={wordVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    style={{ display: "inline-block", marginRight: "0.25em" }}
                                    transition={{ delay: i * 0.02 + 0.4 }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </motion.p>
                        <motion.p className={typography.journeySection.body} style={{ color: dark ? "#000000" : "#4b5563" }}>
                            {body2Text3Words.map((word, i) => (
                                <motion.span
                                    key={i}
                                    custom={i}
                                    variants={wordVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    style={{ display: "inline-block", marginRight: "0.25em" }}
                                    transition={{ delay: i * 0.02 + 0.6 }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </motion.p>
                    </motion.div>

                </div>
            </motion.div>

            {/* Horizontal Line Divider */}
            <motion.div 
                className="max-w-10xl mx-auto px-4"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <hr className={`border-t ${dark ? 'border-gray-700' : 'border-gray-200'}`} />
            </motion.div>

            {/* 03 — The Vision for Yoga Mudra Nidra - Text Left, Image Right */}
            <motion.div 
                className={spacing.journeySection.blockWrapper}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
            >
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 max-w-7xl mx-auto px-4 md:px-6">

                    {/* Text Column - on left (desktop), below image (mobile) */}
                    <motion.div 
                        className="flex-1 order-2 md:order-1"
                        variants={slideInLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <div className={spacing.journeySection.badgeHeadingRow}>
                            <div className={spacing.journeySection.badgeWrapper}>
                                <span className={typography.journeySection.badge} style={{ color: textColor }}>03</span>
                                <span className={spacing.journeySection.badgeUnderline} style={{ backgroundColor: textColor }} />
                            </div>
                            <motion.h3 
                                className={typography.journeySection.heading} 
                                style={{ color: textColor }}
                            >
                                {heading3Chars.map((char, i) => (
                                    <motion.span
                                        key={i}
                                        custom={i}
                                        variants={charVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        style={{ display: "inline-block" }}
                                    >
                                        {char === " " ? "\u00A0" : char}
                                    </motion.span>
                                ))}
                            </motion.h3>
                        </div>
                        <motion.p className={typography.journeySection.body} style={{ color: dark ? "#ffffff" : "#4b5563" }}>
                            {body3Text1Words.map((word, i) => (
                                <motion.span
                                    key={i}
                                    custom={i}
                                    variants={wordVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    style={{ display: "inline-block", marginRight: "0.25em" }}
                                    transition={{ delay: i * 0.02 + 0.2 }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </motion.p>
                        <motion.p className={typography.journeySection.body} style={{ color: dark ? "#ffffff" : "#4b5563" }}>
                            {body3Text2Words.map((word, i) => (
                                <motion.span
                                    key={i}
                                    custom={i}
                                    variants={wordVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    style={{ display: "inline-block", marginRight: "0.25em" }}
                                    transition={{ delay: i * 0.02 + 0.4 }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </motion.p>
                        <motion.p className={typography.journeySection.body} style={{ color: dark ? "#ffffff" : "#4b5563" }}>
                            {body3Text3Words.map((word, i) => (
                                <motion.span
                                    key={i}
                                    custom={i}
                                    variants={wordVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    style={{ display: "inline-block", marginRight: "0.25em" }}
                                    transition={{ delay: i * 0.02 + 0.6 }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </motion.p>
                    </motion.div>

                    {/* Image Column - on right (desktop), above text (mobile) */}
                    <motion.div 
                        className="flex-1 order-1 md:order-2"
                        variants={imageVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.div 
                            className={spacing.journeySection.imageWrapper} 
                            style={{
                                backgroundColor: dark ? "#374151" : "#f3f4f6",
                            }}
                            whileHover={{
                                scale: 1.03,
                                transition: { duration: 0.3 }
                            }}
                        >
                            <Image
                                src={IMAGES.journeyReflection}
                                alt="Person practicing yoga reflected in water"
                                width={400}
                                height={500}
                                className={spacing.journeySection.image}
                            />
                        </motion.div>
                    </motion.div>

                </div>
            </motion.div>

            {/* Horizontal Line Divider */}
            <motion.div 
                className="max-w-10xl mx-auto px-4"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
            >
                <hr className={`border-t ${dark ? 'border-gray-700' : 'border-gray-200'}`} />
            </motion.div>

            {/* 04 — Expanding the Horizon */}
            <motion.div 
                className={spacing.journeySection.blockWrapper}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
            >
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <motion.div 
                        className={spacing.journeySection.expandCard} 
                        style={{
                            backgroundColor: dark ? "#1f2937" : "#f9fafb",
                            borderColor: dark ? "#374151" : "#e5e7eb",
                        }}
                        whileHover={{
                            boxShadow: dark 
                                ? "0 8px 30px rgba(0,0,0,0.3)"
                                : "0 8px 30px rgba(0,0,0,0.06)",
                            transition: { duration: 0.3 }
                        }}
                    >
                        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
                            <motion.div 
                                className="w-full md:w-1/3 order-1 md:order-1"
                                variants={imageVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <motion.div 
                                    className={spacing.journeySection.expandImageWrapper} 
                                    style={{
                                        backgroundColor: dark ? "#374151" : "#f3f4f6",
                                    }}
                                    whileHover={{
                                        scale: 1.05,
                                        transition: { duration: 0.3 }
                                    }}
                                >
                                    <Image
                                        src={IMAGES.journeyHorizon}
                                        alt="Sunrise over green fields"
                                        width={300}
                                        height={200}
                                        className={spacing.journeySection.expandImage}
                                    />
                                </motion.div>
                            </motion.div>

                            <div className="w-full md:w-2/3 order-2 md:order-2">
                                <div className={spacing.journeySection.badgeHeadingRow}>
                                    <div className={spacing.journeySection.badgeWrapper}>
                                        <span className={typography.journeySection.badge} style={{ color: textColor }}>04</span>
                                        <span className={spacing.journeySection.badgeUnderline} style={{ backgroundColor: textColor }} />
                                    </div>
                                    <motion.h2 
                                        className={typography.journeySection.heading} 
                                        style={{ color: textColor }}
                                    >
                                        {heading4Chars.map((char, i) => (
                                            <motion.span
                                                key={i}
                                                custom={i}
                                                variants={charVariants}
                                                initial="hidden"
                                                whileInView="visible"
                                                viewport={{ once: true }}
                                                style={{ display: "inline-block" }}
                                            >
                                                {char === " " ? "\u00A0" : char}
                                            </motion.span>
                                        ))}
                                    </motion.h2>
                                </div>
                                <motion.p className={typography.journeySection.body} style={{ color: dark ? "#ffffff" : "#4b5563" }}>
                                    {body4Text1Words.map((word, i) => (
                                        <motion.span
                                            key={i}
                                            custom={i}
                                            variants={wordVariants}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true }}
                                            style={{ display: "inline-block", marginRight: "0.25em" }}
                                            transition={{ delay: i * 0.02 + 0.2 }}
                                        >
                                            {word}
                                        </motion.span>
                                    ))}
                                </motion.p>
                                <motion.p className={typography.journeySection.body} style={{ color: dark ? "#ffffff" : "#4b5563" }}>
                                    {body4Text2Words.map((word, i) => (
                                        <motion.span
                                            key={i}
                                            custom={i}
                                            variants={wordVariants}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true }}
                                            style={{ display: "inline-block", marginRight: "0.25em" }}
                                            transition={{ delay: i * 0.02 + 0.3 }}
                                        >
                                            {word}
                                        </motion.span>
                                    ))}{" "}
                                    <motion.a 
                                        href="https://theamitabha.com" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="font-semibold underline"
                                        style={{ color: textColor }}
                                        whileHover={{
                                            scale: 1.05,
                                            opacity: 0.7,
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        theamitabha.com
                                    </motion.a>
                                </motion.p>
                            </div>

                            <motion.div 
                                className="order-3 md:order-3"
                                whileHover={{
                                    scale: 1.1,
                                    rotate: 5,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <Image
                                    src={IMAGES.HolisticWellbeing}
                                    alt="Lotus icon"
                                    width={58}
                                    height={52}
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

        </motion.section>
    );
}