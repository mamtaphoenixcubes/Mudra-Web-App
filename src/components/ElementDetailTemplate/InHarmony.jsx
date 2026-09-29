"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { spacing, typography } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";

const defaultBalanced = {
    icon: IMAGES.EarthBrings,
    title: "Balanced Earth brings",
    points: [
        "Strong physical health and vitality",
        "Emotional stability and patience",
        "A sense of security and belonging",
        "The ability to manifest and create with ease",
    ],
};

function IconCircle({ src, alt, dark }) {
    const iconVariants = {
        hidden: { opacity: 0, scale: 0.5, rotate: -180 },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2,
            },
        },
    };

    return (
        <motion.div 
            className="rounded-full w-26 h-26 flex items-center justify-center shrink-0 shadow-sm" 
            style={{
                backgroundColor: dark ? "#ffffff" : "#ffffff",
            }}
            variants={iconVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.2 }
            }}
        >
            {src ? (
                <Image src={src} alt={alt} width={48} height={48} className="object-contain"  />
            ) : (
                <div className="w-7 h-7 rounded-full" style={{ backgroundColor: dark ? "#ffffff" : "#e5e7eb" }} />
            )}
        </motion.div>
    );
}

function BalancedColumn({ icon, title, points, dark, textColor }) {
    // Character animation for title
    const charVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.04 + 0.2,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    };

    // Staggered point variants
    const pointVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.08 + 0.3,
                duration: 0.4,
                ease: "easeOut",
            },
        }),
    };

    const titleChars = title.split("");

    return (
        <motion.div 
            className="flex items-start gap-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
        >
            <IconCircle src={icon} alt={title} dark={dark} />
            <div>
                <motion.h3 
                    className="text-sm md:text-md lg:text-2xl font-semibold mb-2" 
                    style={{ color: textColor }}
                >
                    {titleChars.map((char, i) => (
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
                <ul className="flex flex-col gap-1.5">
                    {points.map((point, i) => (
                        <motion.li
                            key={i}
                            className="text-xs md:text-[10px] lg:text-xl flex items-start gap-2"
                            style={{ color: dark ? "#ffffff" : "#4b5563" }}
                            custom={i}
                            variants={pointVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            whileHover={{
                                x: 3,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <motion.span 
                                className="mt-0.5" 
                                style={{ color: dark ? "#ffffff" : "#9ca3af" }}
                                whileHover={{
                                    scale: 1.5,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                •
                            </motion.span>
                            <span>{point}</span>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
}

export default function InHarmony({
    heading = "In Harmony",
    balanced = defaultBalanced,
}) {
    const { dark, textColor } = useTheme();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { 
        once: true, 
        amount: 0.05,
        margin: "-50px"
    });

    // Character animation for heading
    const charVariants = {
        hidden: { opacity: 0, y: 20, rotateX: -10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                delay: i * 0.06,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    };

    const headingText = heading;
    const headingChars = headingText.split("");

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
            <div className={spacing.container}>
                
                {/* Heading - Character by character */}
                <motion.h2 
                    className={typography.howToPractice.heading} 
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

                {/* Divider */}
                <motion.div 
                    className={typography.howToPractice.dividerWrapper}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <motion.span 
                        className={typography.whySubscribe.dividerLine} 
                        style={{ backgroundColor: dark ? "#ffffff" : "#e5e7eb" }}
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    />
                    <motion.div 
                        className={typography.howToPractice.lotusDivider}
                    >
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
                        className={typography.whySubscribe.dividerLine} 
                        style={{ backgroundColor: dark ? "#ffffff" : "#e5e7eb" }}
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    />
                </motion.div>

                {/* Card */}
                <motion.div 
                    className="rounded-3xl p-8 md:p-10" 
                    style={{
                        backgroundColor: dark ? "#374151" : "#F5F0E8",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    whileHover={{
                        boxShadow: dark 
                            ? "0 8px 30px rgba(0,0,0,0.3)"
                            : "0 8px 30px rgba(0,0,0,0.06)",
                        transition: { duration: 0.3 }
                    }}
                >
                    <div className="flex justify-center">
                        <BalancedColumn {...balanced} dark={dark} textColor={textColor} />
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}