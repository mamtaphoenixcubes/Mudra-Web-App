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
        title: "Information We Collect",
        icon: IMAGES.ReduceStress || IMAGES.ReduceStress,
        iconBg: "var(--benefit-1)",
        body: "We may collect personal information that you voluntarily provide to us, such as your name, email address, and any information you choose to share when contacting us or creating an account.",
        bullets: [
            "Personal information (name, email, etc.)",
            "Account information",
            "Information you share with us (messages, feedback, etc.)",
            "Usage data and device information",
        ],
    },
    {
        number: "2.",
        title: "How We Use Your Information",
        icon: IMAGES.settings || IMAGES.settings,
        iconBg: "var(--benefit-2)",
        body: "We use the information we collect to provide, maintain, and improve our services, personalize your experience, communicate with you, and ensure the security of our platform.",
        bullets: [
            "Provide and maintain our services",
            "Personalize your experience",
            "Communicate with you (updates, support, newsletters)",
            "Improve our website and app",
            "Ensure security and prevent fraud",
        ],
    },
    {
        number: "3.",
        title: "Information Sharing",
        icon: IMAGES.PEOPLE || IMAGES.Holistic,
        iconBg: "var(--about-card)",
        body: "We do not sell or rent your personal information. We may share your information with trusted third-party service providers who assist us in operating our website and app, under strict confidentiality agreements.",
        bullets: [
            "Service providers (hosting, analytics, email, etc.)",
            "Legal requirements or to protect our rights",
            "Business transfers (in case of merger, acquisition, etc.)",
        ],
    },
    {
        number: "4.",
        title: "Data Security",
        icon: IMAGES.ShieldTick || IMAGES.ShieldTick,
        iconBg: "var(--benefit-5)",
        body: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
        bullets: [
            "Secure servers and encrypted connections",
            "Regular security assessments",
            "Access limited to authorized personnel only",
        ],
    },
    {
        number: "5.",
        title: "Your Choices",
        icon: IMAGES.Personalized || IMAGES.Personalized,
        iconBg: "var(--problem-3)",
        body: "You have the right to access, update, or delete your information. You can also opt out of certain communications from us.",
        bullets: [
            "Update or correct your information",
            "Opt out of marketing communications",
            "Delete your account and data",
        ],
    },
    {
        number: "6.",
        title: "Cookies & Tracking",
        icon: IMAGES.Cookies || IMAGES.Cookies,
        iconBg: "var(--problem-1)",
        body: "We use cookies and similar technologies to enhance your experience, analyze usage, and improve our services. You can manage your cookie preferences through your browser settings.",
        bullets: [
            "Essential cookies for site functionality",
            "Analytics cookies to understand usage",
            "You can disable cookies in your browser",
        ],
    },
    {
        number: "7.",
        title: "Third-Party Services",
        icon: IMAGES.Puzzle || IMAGES.Puzzle,
        iconBg: "var(--problem-2)",
        body: "Our website and app may contain links to third-party websites or services. We are not responsible for their privacy practices. Please review their policies before sharing any information.",
    },
    {
        number: "8.",
        title: "Children's Privacy",
        icon: IMAGES.User || IMAGES.User,
        iconBg: "var(--problem-4)",
        body: "Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children.",
    },
    {
        number: "9.",
        title: "Changes to This Policy",
        icon: IMAGES.pencil || IMAGES.pencil,
        iconBg: "var(--balance-the-elements-card)",
        body: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.",
    },
    {
        number: "10.",
        title: "Contact Us",
        icon: IMAGES.Mail || IMAGES.Mail,
        iconBg: "var(--holistic-bg)",
        body: "If you have any questions or concerns about this Privacy Policy or our practices, please contact us.",
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

export default function PrivacyPolicyPage() {
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
                                className={`shrink-0 ${spacing.cardIconBox} ${card.radius} flex items-center justify-center mt-1`}
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
                                    <MailIcon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" style={{ color: dark ? "#ffffff" : "#4b5563" }} />
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
                                                    style={{ backgroundColor: dark ? "#ffffff" : "#9ca3af" }}
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
                                        <div className="hidden sm:block w-px self-stretch" style={{ backgroundColor: dark ? "#ffffff" : "#e5e7eb" }} />
                                        <div className="block sm:hidden h-px" style={{ backgroundColor: dark ? "#ffffff" : "#e5e7eb" }} />
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
                                            <GlobeIcon className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: dark ? "#ffffff" : "#9ca3af" }} />
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
                className={`${maxW.sectionBody} mt-4 mb-16 pb-8 sm:pb-10 md:pb-12 lg:pb-16`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <motion.div 
                    className={`bg-holistic-bg ${card.radius} px-4 sm:px-6 py-4 sm:py-5 flex items-center gap-3 sm:gap-4`}
                    whileHover={{
                        boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
                        transition: { duration: 0.3 }
                    }}
                >
                    <motion.div 
                        className={`shrink-0 ${spacing.cardIconBox} rounded-full flex items-center justify-center`} 
                        style={{
                            backgroundColor: dark ? "#1f2937" : "#ffffff",
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
                        By using our website or app, you agree to the terms of this Privacy Policy.
                    </p>
                </motion.div>
            </motion.div>
        </motion.main>
    );
}