"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { typography, btn, verifyEmail } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

export default function ResetPassword() {
    const router = useRouter();
    const { dark, textColor } = useTheme();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const filled = password.length >= 8 && confirmPassword.length >= 8;

    const handleReset = async () => {
        if (!filled) return;
        setIsLoading(true);
        // Simulate password reset
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        router.push("/ResetPasswordSuccess");
    };

    const LockIcon = () => (
        <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" style={{ color: dark ? "#ffffff" : "#9ca3af" }} fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
    );

    const EyeOff = () => (
        <svg viewBox="0 0 24 24" className="w-4 h-4" style={{ color: dark ? "#ffffff" : "#9ca3af" }} fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
            <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
            <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
    );

    const EyeOn = () => (
        <svg viewBox="0 0 24 24" className="w-4 h-4" style={{ color: dark ? "#ffffff" : "#9ca3af" }} fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );

    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.1,
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

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { 
                duration: 0.7,
                ease: "easeOut",
                delay: 0.1
            }
        }
    };

    const inputVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: "easeOut" }
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
                }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Image */}
                <motion.div 
                    className="w-full flex justify-center"
                    variants={imageVariants}
                >
                    <motion.div 
                        className={verifyEmail.imageWrapper} 
                        style={{
                            backgroundColor: dark ? "#374151" : "#f3f4f6",
                        }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Image src={IMAGES.LockImage} alt="Reset Password" fill className={verifyEmail.image} priority />
                    </motion.div>
                </motion.div>

                {/* Title */}
                <motion.div 
                    className="text-center"
                    variants={itemVariants}
                >
                    <motion.h1 
                        className={typography.benefitTitle} 
                        style={{ color: textColor }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        Reset Password
                    </motion.h1>
                    <motion.p 
                        className={typography.subtitleWidth} 
                        style={{ color: dark ? "#ffffff" : "#9ca3af" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        Create a new password for your account<br />to continue your healing journey
                    </motion.p>
                </motion.div>

                {/* Password */}
                <motion.div 
                    className="w-full flex flex-col gap-1"
                    variants={inputVariants}
                >
                    <motion.div 
                        className="flex items-center gap-2 rounded-xl px-3 py-3.5" 
                        style={{
                            backgroundColor: dark ? "#374151" : "#f3f4f6",
                        }}
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                    >
                        <LockIcon />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="flex-1 text-sm outline-none bg-transparent"
                            style={{
                                color: dark ? "#ffffff" : "#1f2937",
                            }}
                        />
                        <motion.button 
                            onClick={() => setShowPassword(!showPassword)} 
                            className="cursor-pointer" 
                            style={{ color: dark ? "#ffffff" : "#9ca3af" }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                        >
                            {showPassword ? <EyeOn /> : <EyeOff />}
                        </motion.button>
                    </motion.div>
                    <AnimatePresence>
                        {password.length > 0 && password.length < 8 && (
                            <motion.p 
                                className="text-xs leading-relaxed mt-1" 
                                style={{ color: "#ef4444" }}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                Password must be at least 8 characters long
                            </motion.p>
                        )}
                        {password.length >= 8 && (
                            <motion.p 
                                className="text-xs leading-relaxed mt-1" 
                                style={{ color: "#22c55e" }}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                ✓ Password strength: Good
                            </motion.p>
                        )}
                        {password.length === 0 && (
                            <motion.p 
                                className="text-xs leading-relaxed mt-1" 
                                style={{ color: dark ? "#6b7280" : "#9ca3af" }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                Password must be at least 8 characters long and include a mix of letters, numbers and symbols.
                            </motion.p>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Confirm Password */}
                <motion.div 
                    className="w-full"
                    variants={inputVariants}
                    transition={{ delay: 0.1 }}
                >
                    <motion.div 
                        className="flex items-center gap-2 rounded-xl px-3 py-3.5" 
                        style={{
                            backgroundColor: dark ? "#374151" : "#f3f4f6",
                        }}
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                    >
                        <LockIcon />
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="flex-1 text-sm outline-none bg-transparent"
                            style={{
                                color: dark ? "#ffffff" : "#1f2937",
                            }}
                        />
                        <motion.button 
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                            className="cursor-pointer" 
                            style={{ color: dark ? "#ffffff" : "#9ca3af" }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                        >
                            {showConfirmPassword ? <EyeOn /> : <EyeOff />}
                        </motion.button>
                    </motion.div>
                    <AnimatePresence>
                        {confirmPassword.length > 0 && password !== confirmPassword && (
                            <motion.p 
                                className="text-xs leading-relaxed mt-1" 
                                style={{ color: "#ef4444" }}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                Passwords do not match
                            </motion.p>
                        )}
                        {confirmPassword.length > 0 && password === confirmPassword && password.length >= 8 && (
                            <motion.p 
                                className="text-xs leading-relaxed mt-1" 
                                style={{ color: "#22c55e" }}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                ✓ Passwords match
                            </motion.p>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Reset button */}
                <motion.button 
                    className={filled ? btn.verifyEmail : btn.verifyEmailDisabled} 
                    disabled={!filled || isLoading} 
                    onClick={handleReset}
                    style={{
                        backgroundColor: filled ? textColor : (dark ? "#374151" : "#e5e7eb"),
                        color: filled ? "#ffffff" : (dark ? "#6b7280" : "#9ca3af"),
                        cursor: (filled && !isLoading) ? "pointer" : "not-allowed",
                    }}
                    variants={itemVariants}
                    whileHover={filled && !isLoading ? { 
                        scale: 1.02,
                        opacity: 0.85,
                        transition: { duration: 0.2 }
                    } : {}}
                    whileTap={filled && !isLoading ? { scale: 0.98 } : {}}
                >
                    {isLoading ? (
                        <motion.span
                            className="flex items-center justify-center gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Resetting...
                        </motion.span>
                    ) : 'Reset Password'}
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

                {/* Back to Login */}
                <motion.button 
                    onClick={() => router.push("/Login")} 
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
                        transition={{ delay: 0.5 }}
                    >
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="M2 7l10 7 10-7" />
                    </motion.svg>
                    Back to Log In
                </motion.button>

            </motion.div>
        </motion.div>
    );
}