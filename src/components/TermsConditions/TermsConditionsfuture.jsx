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
        title: "Acceptance of Terms",
        icon: IMAGES.OngoingStudies || IMAGES.OngoingStudies,
        iconBg: "var(--benefit-1)",
        body: "By accessing or using the Mudras website or app, you agree to these Terms and Conditions and our Privacy Policy. If you do not agree with any part of these terms, please do not use our services.",
    },
    {
        number: "2.",
        title: "Use of Our Services",
        icon: IMAGES.ReduceStress || IMAGES.ReduceStress,
        iconBg: "var(--benefit-2)",
        body: "Mudras provides information about Mudras, Yoga Nidra, and related wellness practices for educational and informational purposes only. You agree to use our services only for lawful purposes and in accordance with these terms.",
    },
    {
        number: "3.",
        title: "User Accounts",
        icon: IMAGES.PEOPLE || IMAGES.PEOPLE,
        iconBg: "var(--about-card)",
        body: "To access certain features, you may need to create an account. You agree to provide accurate information and keep your account credentials secure. You are responsible for all activities under your account.",
    },
    {
        number: "4.",
        title: "Subscriptions and Payments",
        icon: IMAGES.Message || IMAGES.Message,
        iconBg: "var(--benefit-5)",
        body: "Some features require a paid subscription. All payments are processed securely through our trusted payment partners. Subscriptions automatically renew unless canceled before the end of the billing cycle.",
    },
    {
        number: "5.",
        title: "Refund Policy",
        icon: IMAGES.Refund || IMAGES.Refund,
        iconBg: "var(--problem-3)",
        body: "We offer a 7-day refund for eligible purchases if you are not satisfied with our services. Refunds are processed to the original payment method. Please refer to our Refund Policy for more details.",
    },
    {
        number: "6.",
        title: "Intellectual Property",
        icon: IMAGES.More || IMAGES.More,
        iconBg: "var(--problem-1)",
        body: "All content on Mudras, including text, graphics, logos, images, and videos, is the property of Mudras and protected by copyright and intellectual property laws. You may not copy, reproduce, or distribute our content without permission.",
    },
    {
        number: "7.",
        title: "Prohibited Conduct",
        icon: IMAGES.Block || IMAGES.Block,
        iconBg: "var(--problem-2)",
        body: "You agree not to misuse our services, including hacking, spamming, uploading harmful content, or attempting to gain unauthorized access to our systems.",
    },
    {
        number: "8.",
        title: "Disclaimer",
        icon: IMAGES.privacy || IMAGES.privacy,
        iconBg: "var(--problem-4)",
        body: "The information on Mudras is for general informational purposes only and is not intended as medical advice. Always consult a qualified healthcare professional before starting any new wellness practice.",
    },
    {
        number: "9.",
        title: "Limitation of Liability",
        icon: IMAGES.Like || IMAGES.Like,
        iconBg: "var(--balance-the-elements-card)",
        body: "Mudras and its team are not liable for any direct, indirect, incidental, or consequential damages arising from the use of our website or app.",
    },
    {
        number: "10.",
        title: "Changes to Terms",
        icon: IMAGES.pencil || IMAGES.pencil,
        iconBg: "var(--holistic-bg)",
        body: "We may update these Terms and Conditions from time to time. Any changes will be posted on this page with an updated effective date.",
        contact: true,
    },
    {
        number: "11.",
        title: "Contact Us",
        icon: IMAGES.Mail || IMAGES.Mail,
        iconBg: "var(--problem-1)",
        body: "If you have any questions about these Terms and Conditions, please contact us.",
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

export default function TermsConditionsfuture() {
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

    // Bullet variants
    const bulletVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.04 + 0.2,
                duration: 0.3,
                ease: "easeOut",
            },
        }),
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
                                            borderColor: dark ? "#ffffff" : "#0c0c0c",
                                        }}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                    >
                                        <motion.a
                                            href="mailto:support@mudra.app"
                                            className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 ${typography.cardBody} transition-colors`}
                                            style={{ color: dark ? "#ffffff" : "#020202" }}
                                            whileHover={{
                                                scale: 1.03,
                                                backgroundColor: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                                                transition: { duration: 0.2 }
                                            }}
                                        >
                                            <MailIcon className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: dark ? "#ffffff" : "#000000" }} />
                                            Email: support@mudra.app
                                        </motion.a>
                                        <div className="hidden sm:block w-px self-stretch" style={{ backgroundColor: dark ? "#ffffff" : "#000000" }} />
                                        <div className="block sm:hidden h-px" style={{ backgroundColor: dark ? "#ebebeb" : "#161616" }} />
                                        <motion.a
                                            href="https://www.mudra.app"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 ${typography.cardBody} transition-colors`}
                                            style={{ color: dark ? "#ffffff" : "#111111" }}
                                            whileHover={{
                                                scale: 1.03,
                                                backgroundColor: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                                                transition: { duration: 0.2 }
                                            }}
                                        >
                                            <GlobeIcon className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: dark ? "#ffffff" : "#0d0d0e" }} />
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
                                style={{ borderColor: dark ? "#374151" : "#f3f4f6" }}
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
                            backgroundColor: dark ? "#fcfcfc" : "#ffffff",
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
                    <p className={`${typography.sectionBody} leading-relaxed`} style={{ color: dark ? "#070707" : "#374151" }}>
                        By using our website or app, you agree to the terms of this Terms and Conditions.
                    </p>
                </motion.div>
            </motion.div>
        </motion.main>
    );
}