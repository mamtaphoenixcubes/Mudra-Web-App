"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { typography, btn, verifyEmail } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

export default function ResetPasswordSuccess() {
    const router = useRouter();
    const { dark, textColor } = useTheme();

    // Fixed positions to avoid hydration mismatches
    const confettiPositions = [
        { left: 15, top: 25 },
        { left: 75, top: 35 },
        { left: 45, top: 15 },
        { left: 25, top: 65 },
        { left: 85, top: 55 },
        { left: 55, top: 75 },
        { left: 35, top: 45 },
        { left: 65, top: 85 },
    ];

    const sparklePositions = [
        { left: 20, top: 30 },
        { left: 80, top: 25 },
        { left: 50, top: 20 },
        { left: 30, top: 55 },
        { left: 70, top: 50 },
        { left: 40, top: 70 },
        { left: 90, top: 40 },
        { left: 10, top: 60 },
        { left: 60, top: 15 },
        { left: 45, top: 85 },
        { left: 85, top: 70 },
        { left: 15, top: 45 },
    ];

    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.15,
                delayChildren: 0.2,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const iconVariants = {
        hidden: { opacity: 0, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.3,
            }
        }
    };

    const checkmarkVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { duration: 0.8, ease: "easeInOut", delay: 0.5 },
                opacity: { duration: 0.3, delay: 0.5 }
            }
        }
    };

    const pulseVariants = {
        pulse: {
            scale: [1, 1.05, 1],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <motion.div 
            className={verifyEmail.container} 
            style={{
                backgroundColor: dark ? "#111827" : "#F7F7FA",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <motion.div 
                className={verifyEmail.card} 
                style={{
                    backgroundColor: dark ? "#1f2937" : "#ffffff",
                    borderColor: dark ? "#374151" : "#e5e7eb",
                    position: "relative",
                    overflow: "hidden",
                }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Success Icon */}
                <motion.div 
                    className="w-full flex justify-center"
                    variants={iconVariants}
                >
                    <motion.div 
                        className="w-24 h-24 rounded-full flex items-center justify-center relative"
                        style={{
                            backgroundColor: textColor,
                        }}
                        variants={pulseVariants}
                        animate="pulse"
                    >
                        <motion.svg 
                            viewBox="0 0 24 24" 
                            className="w-12 h-12 text-white" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        >
                            <motion.polyline 
                                points="20 6 9 17 4 12"
                                variants={checkmarkVariants}
                                initial="hidden"
                                animate="visible"
                            />
                        </motion.svg>

                        {/* Ripple Effect */}
                        <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{ backgroundColor: textColor }}
                            initial={{ scale: 1, opacity: 0.3 }}
                            animate={{ 
                                scale: [1, 1.5, 1.8],
                                opacity: [0.3, 0.1, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeOut",
                                delay: 0.5
                            }}
                        />
                        <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{ backgroundColor: textColor }}
                            initial={{ scale: 1, opacity: 0.2 }}
                            animate={{ 
                                scale: [1, 1.3, 1.6],
                                opacity: [0.2, 0.05, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeOut",
                                delay: 0.8
                            }}
                        />
                    </motion.div>
                </motion.div>

                {/* Text */}
                <motion.div 
                    className="text-center flex flex-col gap-3"
                    variants={itemVariants}
                >
                    <motion.h1 
                        className={typography.benefitTitle} 
                        style={{ color: textColor }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        Success! 🎉
                    </motion.h1>
                    <motion.p 
                        className={typography.subtitleWidth} 
                        style={{ color: dark ? "#ffffff" : "#4b5563" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        Your password has been reset successfully.
                    </motion.p>
                    <motion.p 
                        className={typography.subtitleWidth} 
                        style={{ color: dark ? "#ffffff" : "#4b5563" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        You can now log in to continue your healing journey
                    </motion.p>
                </motion.div>

                {/* Go to Log In button */}
                <motion.button
                    onClick={() => router.push("/Login")}
                    className={btn.verifyEmail}
                    style={{
                        backgroundColor: textColor,
                        color: "#ffffff",
                    }}
                    variants={itemVariants}
                    whileHover={{ 
                        scale: 1.02,
                        opacity: 0.85,
                        transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                >
                    Go to Log In
                </motion.button>

                {/* Divider */}
                <motion.div 
                    className={verifyEmail.divider}
                    variants={itemVariants}
                >
                    <div className={verifyEmail.dividerLine} style={{ backgroundColor: dark ? "#374151" : "#e5e7eb" }} />
                    <span className={verifyEmail.dividerText} style={{ color: dark ? "#ffffff" : "#9ca3af" }}>or</span>
                    <div className={verifyEmail.dividerLine} style={{ backgroundColor: dark ? "#374151" : "#e5e7eb" }} />
                </motion.div>

                {/* Back to Home */}
                <motion.button
                    onClick={() => router.push("/Home")}
                    className={verifyEmail.changeEmailButton}
                    style={{
                        color: textColor,
                    }}
                    variants={itemVariants}
                    whileHover={{ 
                        scale: 1.02,
                        opacity: 0.7,
                        transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                >
                    <motion.svg 
                        viewBox="0 0 24 24" 
                        className={verifyEmail.svgIcon} 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1.8" 
                        style={{ color: textColor }}
                        initial={{ x: -5, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="M2 7l10 7 10-7" />
                    </motion.svg>
                    Back to Home
                </motion.button>

                {/* Confetti/Sparkle Particles - Using fixed positions */}
                <motion.div
                    className="absolute inset-0 pointer-events-none overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {confettiPositions.map((pos, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full"
                            style={{
                                backgroundColor: textColor,
                                left: `${pos.left}%`,
                                top: `${pos.top}%`,
                            }}
                            initial={{ 
                                scale: 0,
                                opacity: 0,
                            }}
                            animate={{
                                scale: [0, 1, 0],
                                opacity: [0, 0.6, 0],
                                x: [0, (i % 2 === 0 ? 1 : -1) * (60 + i * 10)],
                                y: [0, (i % 3 === 0 ? 1 : -1) * (60 + i * 10)],
                            }}
                            transition={{
                                duration: 2 + (i % 3) * 0.5,
                                delay: 0.5 + i * 0.05,
                                repeat: Infinity,
                                ease: "easeOut",
                            }}
                        />
                    ))}
                </motion.div>

                {/* Floating Sparkles - Using fixed positions */}
                {sparklePositions.map((pos, i) => (
                    <motion.div
                        key={`sparkle-${i}`}
                        className="absolute w-1 h-1 rounded-full"
                        style={{
                            backgroundColor: textColor,
                            left: `${pos.left}%`,
                            top: `${pos.top}%`,
                            opacity: 0.3,
                        }}
                        animate={{
                            y: [0, -30 - (i % 5) * 8, 0],
                            x: [0, (i % 2 === 0 ? 1 : -1) * (10 + (i % 3) * 5), 0],
                            opacity: [0.3, 0.7, 0.3],
                        }}
                        transition={{
                            duration: 3 + (i % 3) * 0.5,
                            delay: i * 0.1,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </motion.div>
        </motion.div>
    );
}