"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { typography } from "../../theme/typography";
import { spacing } from "../../theme/spacing";
import { btn, form } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

export default function ForgotPassword() {
    const router = useRouter();
    const { dark, textColor } = useTheme();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSendLink = async () => {
        setIsLoading(true);
        // Simulate sending link
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        router.push("/Verifyemailpage");
    };

    const handlePhoneReset = () => {
        console.log("Reset via phone");
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
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
        hidden: { opacity: 0, scale: 0.9, x: -30 },
        visible: {
            opacity: 1,
            scale: 1,
            x: 0,
            transition: { duration: 0.7, ease: "easeOut" }
        }
    };

    const formVariants = {
        hidden: { opacity: 0, x: 30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, ease: "easeOut", delay: 0.1 }
        }
    };

    return (
        <motion.section 
            className="min-h-screen flex items-center justify-center px-4 py-6 w-full overflow-hidden"
            style={{
                backgroundColor: dark ? "#111827" : "#F7F7FA",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <motion.div 
                className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-12"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Left Column - Image */}
                <motion.div 
                    className="w-full md:w-1/2 flex justify-center md:justify-start md:-ml-1 lg:-ml-1 xl:-ml-16 2xl:-ml-20"
                    variants={imageVariants}
                >
                    <motion.div 
                        className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[450px] md:h-[450px] lg:w-[520px] lg:h-[520px] xl:w-[580px] xl:h-[580px] 2xl:w-[650px] 2xl:h-[650px] rounded-3xl overflow-hidden shadow-xl"
                        style={{
                            backgroundColor: dark ? "#374151" : "#f3f4f6",
                        }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Image
                            src={IMAGES.Rectangle}
                            alt="Forgot Password"
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 640px) 288px, (max-width: 768px) 320px, (max-width: 1024px) 450px, (max-width: 1280px) 520px, 580px"
                            priority
                        />
                        <motion.div 
                            className="absolute inset-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            style={{
                                background: `linear-gradient(to bottom, transparent 60%, ${dark ? 'rgba(17,24,39,0.3)' : 'rgba(255,255,255,0.1)'})`,
                            }}
                        />
                    </motion.div>
                </motion.div>

                {/* Right Column - Form */}
                <motion.div 
                    className="w-full md:w-1/2"
                    variants={formVariants}
                >
                    {/* Title */}
                    <motion.h1 
                        className={`${typography.sectionSbHeading} text-center md:text-left mb-1`} 
                        style={{ color: textColor }}
                        variants={itemVariants}
                    >
                        Forgot Password?
                    </motion.h1>
                    
                    <motion.p 
                        className={`${typography.solutionBody} text-center md:text-left mb-6 px-0`} 
                        style={{ color: dark ? "#ffffff" : "#9ca3af" }}
                        variants={itemVariants}
                    >
                        Don't worry, it happens. Enter your email and we'll send you a link to reset your password.
                    </motion.p>

                    {/* Form */}
                    <motion.div 
                        className={`${form.container} ${form.gap}`}
                        variants={containerVariants}
                    >
                        {/* Email */}
                        <motion.div 
                            className={`${form.card} flex items-center gap-3 px-4 py-3.5`} 
                            style={{
                                backgroundColor: dark ? "#1f2937" : "#ffffff",
                                borderColor: dark ? "#374151" : "#e5e7eb",
                            }}
                            variants={itemVariants}
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.2 }}
                        >
                            <motion.svg 
                                className="w-5 h-5 shrink-0" 
                                style={{ color: dark ? "#ffffff" : "#9ca3af" }} 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor" 
                                strokeWidth={1.5}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </motion.svg>
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`flex-1 ${form.input} bg-transparent outline-none`}
                                style={{
                                    color: dark ? "#ffffff" : "#1f2937",
                                }}
                            />
                        </motion.div>

                        {/* Send Reset Link button */}
                        <motion.button
                            onClick={handleSendLink}
                            disabled={isLoading}
                            className={`${btn.primary} text-center mt-1 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            style={{
                                backgroundColor: textColor,
                            }}
                            variants={itemVariants}
                            whileHover={!isLoading ? { 
                                scale: 1.02,
                                opacity: 0.85,
                                transition: { duration: 0.2 }
                            } : {}}
                            whileTap={!isLoading ? { scale: 0.98 } : {}}
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
                                    Sending...
                                </motion.span>
                            ) : 'Send Reset Link'}
                        </motion.button>

                        {/* Divider */}
                        <motion.div 
                            className="flex items-center gap-3 my-1"
                            variants={itemVariants}
                        >
                            <div className="flex-1 h-px" style={{ backgroundColor: dark ? "#374151" : "#e5e7eb" }} />
                            <span className="text-xs" style={{ color: dark ? "#ffffff" : "#9ca3af" }}>or</span>
                            <div className="flex-1 h-px" style={{ backgroundColor: dark ? "#374151" : "#e5e7eb" }} />
                        </motion.div>

                        {/* Reset via Phone Number */}
                        <motion.button
                            onClick={handlePhoneReset}
                            className="flex items-center justify-center gap-3 w-full border rounded-xl px-4 py-3 text-sm font-medium transition-colors cursor-pointer"
                            style={{
                                backgroundColor: dark ? "#1f2937" : "#ffffff",
                                borderColor: dark ? "#374151" : "#e5e7eb",
                                color: dark ? "#ffffff" : "#374151",
                            }}
                            variants={itemVariants}
                            whileHover={{ 
                                scale: 1.02,
                                backgroundColor: dark ? "#374151" : "#f9fafb",
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <motion.svg 
                                className="w-5 h-5 shrink-0" 
                                style={{ color: dark ? "#ffffff" : "#6b7280" }} 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor" 
                                strokeWidth={1.5}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                            </motion.svg>
                            Reset via Phone Number
                        </motion.button>

                        {/* Remember password link - FIXED: no div inside p */}
                        <motion.div 
                            className="text-center text-sm mt-2" 
                            style={{ color: dark ? "#ffffff" : "#9ca3af" }}
                            variants={itemVariants}
                        >
                            Remember your password?{" "}
                            <motion.span
                                className="inline-block"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link
                                    href="/Login"
                                    className="font-medium underline hover:opacity-80"
                                    style={{ color: textColor }}
                                >
                                    Log In
                                </Link>
                            </motion.span>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}