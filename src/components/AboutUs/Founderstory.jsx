"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

export default function FounderStory() {
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
                delay: i * 0.04,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    };

    // Character animation for label
    const labelVariants = {
        hidden: { opacity: 0, y: 10 },
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

    // Word animation for quote
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

    const labelText = "THE FOUNDER'S STORY";
    const labelChars = labelText.split("");
    
    const headingText = "Meet Amitabha Bhatia";
    const headingChars = headingText.split("");
    
    const subheadingText = "Founder, Yoga Mudra Nidra";
    const subheadingChars = subheadingText.split("");
    
    const quoteText = "The ultimate technology isn't the one we hold in our hands. It is the one already wired into our palms, our breath, and our consciousness.";
    const quoteWords = quoteText.split(" ");

    return (
        <motion.section
            ref={sectionRef}
            className={`
                grid grid-cols-2 md:grid-cols-2
                items-center
                ${spacing.sectionPaddingX}
                ${spacing.sectionPaddingY}
                ${spacing.heroGap}
            `}
            style={{
                backgroundColor: dark ? "#111827" : "#f9fafb",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            {/* LEFT — image with dot pattern */}
            <motion.div 
                className={spacing.founderStory.imageCol}
                variants={slideInLeft}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <div className={spacing.founderStory.dotPattern}>
                    {Array.from({ length: 30 }).map((_, i) => (
                        <motion.span 
                            key={i} 
                            className={spacing.founderStory.dot} 
                            style={{
                                backgroundColor: dark ? "#374151" : "#e5e7eb",
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                            transition={{ delay: i * 0.02 + 0.2, duration: 0.3 }}
                        />
                    ))}
                </div>
                <motion.div 
                    className={spacing.founderStory.imageWrapper} 
                    style={{
                        backgroundColor: dark ? "#374151" : "#f3f4f6",
                    }}
                    whileHover={{
                        scale: 1.03,
                        transition: { duration: 0.3 }
                    }}
                >
                    <Image
                        src={IMAGES.AmitabhaBhatia}
                        alt="Amitabha Bhatia"
                        width={460}
                        height={460}
                        className={spacing.founderStory.image}
                    />
                </motion.div>
            </motion.div>

            {/* RIGHT — content */}
            <motion.div 
                className={spacing.founderStory.contentCol}
                variants={slideInRight}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* Label - Character by character */}
                <motion.p 
                    className={typography.founderStory.label} 
                    style={{ color: dark ? "#6b7280" : "#9ca3af" }}
                >
                    {labelChars.map((char, i) => (
                        <motion.span
                            key={i}
                            custom={i}
                            variants={labelVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            style={{ display: "inline-block" }}
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </motion.p>
                
                {/* Underline */}
                <motion.span 
                    className={typography.founderStory.labelUnderline} 
                    style={{ backgroundColor: textColor }}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "2.5rem" } : { width: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                />

                {/* Heading - Character by character */}
                <motion.h2 
                    className={typography.founderStory.heading} 
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

                {/* Subheading - Character by character */}
                <motion.p 
                    className={typography.founderStory.subheading} 
                    style={{ color: dark ? "#9ca3af" : "#4b5563" }}
                >
                    {subheadingChars.map((char, i) => (
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
                </motion.p>
                
                {/* Subheading Underline */}
                <motion.span 
                    className={typography.founderStory.subheadingUnderline} 
                    style={{ backgroundColor: textColor }}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "2.5rem" } : { width: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                />

                {/* Quote Card */}
                <motion.div 
                    className={spacing.founderStory.quoteCard} 
                    style={{
                        backgroundColor: dark ? "#1f2937" : "#f9fafb",
                        borderColor: dark ? "#374151" : "#e5e7eb",
                    }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{
                        boxShadow: dark 
                            ? "0 8px 30px rgba(0,0,0,0.3)"
                            : "0 8px 30px rgba(0,0,0,0.06)",
                        transition: { duration: 0.3 }
                    }}
                >
                    <motion.span 
                        className={typography.founderStory.quoteMarkOpen} 
                        style={{ color: textColor }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                    >
                        &ldquo;
                    </motion.span>
                    
                    {/* Quote - Word by word */}
                    <motion.p 
                        className={typography.founderStory.quoteText} 
                        style={{ color: dark ? "#e5e7eb" : "#1f2937" }}
                    >
                        {quoteWords.map((word, i) => (
                            <motion.span
                                key={i}
                                custom={i}
                                variants={wordVariants}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                style={{ display: "inline-block", marginRight: "0.25em" }}
                                transition={{ delay: i * 0.04 + 0.5 }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </motion.p>
                    
                    <motion.span 
                        className={typography.founderStory.quoteMarkClose} 
                        style={{ color: textColor }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                    >
                        &rdquo;
                    </motion.span>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}