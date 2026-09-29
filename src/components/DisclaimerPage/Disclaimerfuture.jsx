"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { typography, spacing, card, maxW } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";

const sections = [
    {
        number: "1.",
        title: "General Information",
        icon: IMAGES.Info || IMAGES.Info,
        iconBg: "var(--benefit-1)",
        body: "The information provided on Mudras, including text, graphics, images, and other content, is for general informational purposes only.",
    },
    {
        number: "2.",
        title: "Not Medical Advice",
        icon: IMAGES.ActivityHeart || IMAGES.ActivityHeart,
        iconBg: "var(--benefit-2)",
        body: "The content on Mudras is not intended as medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional before starting any new wellness practice.",
    },
    {
        number: "3.",
        title: "Individual Results May Vary",
        icon: IMAGES.ReduceStress,
        iconBg: "var(--about-card)",
        body: "The effectiveness of mudras, yoga nidra, and other practices may vary from person to person. We do not guarantee specific results.",
    },
    {
        number: "4.",
        title: "No Guarantees",
        icon: IMAGES.privacy,
        iconBg: "var(--benefit-5)",
        body: "Mudras and its team do not guarantee the accuracy, completeness, or reliability of any information provided on our website or app.",
    },
    {
        number: "5.",
        title: "External Links",
        icon: IMAGES.Like,
        iconBg: "var(--problem-3)",
        body: "Our website and app may contain links to third-party websites or services. We are not responsible for the content or practices of these external sites.",
    },
    {
        number: "6.",
        title: "Not a Substitute",
        icon: IMAGES.Block,
        iconBg: "var(--problem-1)",
        body: "Mudras is not a substitute for professional medical care, therapy, or treatment. Do not ignore or delay seeking medical advice because of something you read or learn on our platform.",
    },
    {
        number: "7.",
        title: "Use at Your Own Risk",
        icon: IMAGES.Info,
        iconBg: "var(--problem-2)",
        body: "By using our website or app, you agree that any reliance on the information provided is at your own risk. We are not liable for any direct or indirect damages arising from your use of our content or services.",
    },
    {
        number: "8.",
        title: "Intellectual Property",
        icon: IMAGES.More,
        iconBg: "var(--problem-4)",
        body: "All content on Mudras, including text, graphics, logos, images, and videos, is the property of Mudras and protected by copyright and intellectual property laws.",
    },
    {
        number: "9.",
        title: "Changes to This Disclaimer",
        icon: IMAGES.pencil,
        iconBg: "var(--balance-the-elements-card)",
        body: "We may update this Disclaimer from time to time. Any changes will be posted on this page with an updated effective date.",
    },
    {
        number: "10.",
        title: "Contact Us",
        icon: IMAGES.Mail,
        iconBg: "var(--holistic-bg)",
        body: "If you have any questions about this Disclaimer, please contact us.",
        contact: true,
    },
];

function MailIcon({ className = "w-4 h-4" }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.5}>
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M2 7l10 7 10-7" />
        </svg>
    );
}

function GlobeIcon({ className = "w-4 h-4" }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.5}>
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    );
}

function ShieldIcon({ className = "w-5 h-5" }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.5}>
            <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z" />
            <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function Disclaimerfuture() {
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

    // Container variants for stagger
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.2,
            },
        },
    };

    // Section variants
    const sectionVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.97 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    // Character animation for section titles
    const charVariants = {
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

    return (
        <motion.main 
            ref={sectionRef}
            className={`min-h-screen ${spacing.sectionPaddingX}`} 
            style={{
                backgroundColor: dark ? "#111827" : "#ffffff",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <motion.div 
                className={maxW.sectionBody}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {sections.map((section, idx) => (
                    <motion.div 
                        key={idx}
                        variants={sectionVariants}
                        whileHover={{
                            y: -2,
                            transition: { duration: 0.2 }
                        }}
                    >
                        <div className={`flex gap-4 sm:gap-8 ${spacing.sectionPaddingY}`}>
                            {/* Icon with card radius */}
                            <motion.div
                                className={`shrink-0 ${spacing.cardIconBox} rounded-full flex items-center justify-center mt-1`}
                                style={{ backgroundColor: dark ? section.iconBg : section.iconBg }}
                                whileHover={{
                                    scale: 1.1,
                                    rotate: 5,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                {section.icon ? (
                                    <Image
                                        src={section.icon}
                                        alt={section.title}
                                        width={40}
                                        height={40}
                                        className={`${spacing.cardIconInner} object-contain`}
                                    />
                                ) : (
                                    <MailIcon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" style={{ color: dark ? "#9ca3af" : "#4b5563" }} />
                                )}
                            </motion.div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                {/* Title with character animation */}
                                <motion.h2 
                                    className={`${typography.sectionSbHeading} ${spacing.cardIconBoxMb}`} 
                                    style={{ color: textColor }}
                                >
                                    {section.number} {section.title.split("").map((char, i) => (
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
                                
                                <motion.p 
                                    className={`${typography.sectionMb} mb-4 sm:mb-5 leading-relaxed`} 
                                    style={{ color: dark ? "#ffffff" : "#4b5563" }}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.1 }}
                                >
                                    {section.body}
                                </motion.p>

                                {/* Bullet list */}
                                {section.bullets && (
                                    <ul className={`space-y-2 ${spacing.checklistGap}`}>
                                        {section.bullets.map((bullet, bIdx) => (
                                            <motion.li
                                                key={bIdx}
                                                className={`${typography.sectionMb} flex items-start gap-2 sm:gap-3 leading-relaxed`}
                                                style={{ color: dark ? "#ffffff" : "#4b5563" }}
                                                custom={bIdx}
                                                variants={bulletVariants}
                                                initial="hidden"
                                                whileInView="visible"
                                                viewport={{ once: true }}
                                                whileHover={{
                                                    x: 3,
                                                    transition: { duration: 0.2 }
                                                }}
                                            >
                                                <motion.span 
                                                    className={`mt-1.5 sm:mt-2 ${spacing.checkIconBoxMb} rounded-full shrink-0`} 
                                                    style={{ backgroundColor: dark ? "#6b7280" : "#9ca3af" }}
                                                    whileHover={{
                                                        scale: 1.5,
                                                        transition: { duration: 0.2 }
                                                    }}
                                                />
                                                {bullet}
                                            </motion.li>
                                        ))}
                                    </ul>
                                )}

                                {/* Contact pill row — only for "Contact Us" */}
                                {section.contact && (
                                    <motion.div 
                                        className="inline-flex flex-col sm:flex-row items-start sm:items-center border rounded-lg overflow-hidden mt-2" 
                                        style={{
                                            borderColor: dark ? "#ffffff" : "#e5e7eb",
                                        }}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                    >
                                        <motion.a
                                            href="mailto:support@mudra.app"
                                            className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 ${typography.cardBody} transition-colors`}
                                            style={{ color: dark ? "#ffffff" : "#4b5563" }}
                                            whileHover={{
                                                scale: 1.03,
                                                backgroundColor: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                                                transition: { duration: 0.2 }
                                            }}
                                        >
                                            <MailIcon className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: dark ? "#6b7280" : "#9ca3af" }} />
                                            Email: support@mudra.app
                                        </motion.a>
                                        <div className="hidden sm:block w-px self-stretch" style={{ backgroundColor: dark ? "#374151" : "#e5e7eb" }} />
                                        <div className="block sm:hidden h-px" style={{ backgroundColor: dark ? "#374151" : "#e5e7eb" }} />
                                        <motion.a
                                            href="https://www.mudra.app"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 ${typography.cardBody} transition-colors`}
                                            style={{ color: dark ? "#ffffff" : "#4b5563" }}
                                            whileHover={{
                                                scale: 1.03,
                                                backgroundColor: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                                                transition: { duration: 0.2 }
                                            }}
                                        >
                                            <GlobeIcon className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: dark ? "#6b7280" : "#9ca3af" }} />
                                            Website: www.mudra.app
                                        </motion.a>
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        {/* Divider between sections */}
                        {idx < sections.length - 1 && (
                            <motion.div 
                                className="border-t" 
                                style={{ borderColor: dark ? "#ffffff" : "#f3f4f6" }}
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.05 + 0.2 }}
                            />
                        )}
                    </motion.div>
                ))}
            </motion.div>

            {/* Footer consent card */}
            <motion.div 
                className={`${maxW.sectionBody} ${spacing.sectionPaddingY}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <motion.div 
                    className={`${card.radius} px-4 sm:px-6 py-4 sm:py-5 flex items-center gap-3 sm:gap-4`} 
                    style={{
                        backgroundColor: dark ? "var(--holistic-bg)" : "var(--holistic-bg)",
                    }}
                    whileHover={{
                        boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
                        transition: { duration: 0.3 }
                    }}
                >
                    <motion.div 
                        className={`shrink-0 ${spacing.cardIconBox} rounded-full flex items-center justify-center`} 
                        style={{
                            backgroundColor: dark ? "#f0f0f0" : "#ffffff",
                            color: dark ? "var(--primary)" : "var(--primary)",
                        }}
                        whileHover={{
                            scale: 1.1,
                            rotate: 5,
                            transition: { duration: 0.2 }
                        }}
                    >
                        <ShieldIcon className={`${spacing.cardIconInner}`} />
                    </motion.div>
                    <p className={`${typography.sectionBody} leading-relaxed`} style={{ color: dark ? "#000000" : "#374151" }}>
                        By using our website or app, you acknowledge that you have read, understood, and agree to this Disclaimer.
                    </p>
                </motion.div>
            </motion.div>
        </motion.main>
    );
}