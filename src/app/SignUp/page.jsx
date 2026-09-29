"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { spacing, typography, btn, form, card } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import { authService } from "../../services/apiService";
import { toast } from "react-toastify";

export default function SignUp() {
    const router = useRouter();
    const { dark, textColor } = useTheme();
    const [formState, setFormState] = useState({
        username: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        agreed: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormState((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async () => {
        if (formState.password !== formState.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        if (!formState.agreed) {
            toast.error("Please agree to the Terms of Service and Privacy Policy");
            return;
        }

        setIsLoading(true);

        try {
            const signupPayload = {
                fullName: formState.username,
                username: formState.username,
                email: formState.email,
                phoneNumber: formState.phoneNumber,
                password: formState.password
            };

            const response = await authService.signup(signupPayload);
            
            // API returns user and token
            const user = response.data?.user || response.user;
            const tokens = response.data?.tokens || response.tokens;

            const userData = {
                id: user?.id,
                name: user?.fullName || formState.fullName,
                email: user?.email || formState.email,
                username: user?.username || formState.username,
                phone: user?.phone || formState.phoneNumber,
                avatar: user?.profileImage || null
            };
            
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("isLoggedIn", "true");
            if (tokens?.accessToken) {
                localStorage.setItem("token", tokens.accessToken);
            }
            if (tokens?.refreshToken) {
                localStorage.setItem("refreshToken", tokens.refreshToken);
            }
            
            toast.success("Account created successfully!");
            router.push("/Personaliseexperience");
        } catch (error) {
            console.error("Signup error:", error);
            toast.error(error.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
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
            className="min-h-screen flex items-center justify-center px-4 py-10 w-full overflow-hidden"
            style={{
                backgroundColor: dark ? "#111827" : "#F7F7FA",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <motion.div 
                className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16"
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
                        className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[500px] md:h-[500px] lg:w-[580px] lg:h-[580px] xl:w-[650px] xl:h-[650px] 2xl:w-[750px] 2xl:h-[750px] rounded-3xl overflow-hidden shadow-xl"
                        style={{
                            backgroundColor: dark ? "#374151" : "#f3f4f6",
                        }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Image
                            src={IMAGES.HapplyMudra}
                            alt="Mudra"
                            fill
                            className="object-cover object-center"
                            sizes="(max-width: 640px) 320px, (max-width: 768px) 384px, (max-width: 1024px) 500px, (max-width: 1280px) 580px, 650px"
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
                        Sign Up
                    </motion.h1>
                    
                    <motion.p 
                        className={`${typography.solutionBody} text-center md:text-left mb-6`} 
                        style={{ color: dark ? "#ffffff" : "#9ca3af" }}
                        variants={itemVariants}
                    >
                        Create your account to begin your healing journey
                    </motion.p>

                    {/* Form */}
                    <motion.div 
                        className={`${form.container} ${form.gap}`}
                        variants={containerVariants}
                    >
                        {/* Username */}
                        <motion.div 
                            className={`${form.card} flex items-center gap-3 px-4 py-3.5`} 
                            style={{
                                backgroundColor: dark ? "#1f2937" : "#ffffff",
                                borderColor: dark ? "#ffffff" : "#e5e7eb",
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
                                transition={{ delay: 0.35 }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </motion.svg>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formState.username}
                                onChange={handleChange}
                                className={`flex-1 ${form.input} bg-transparent outline-none`}
                                style={{ color: dark ? "#ffffff" : "#1f2937" }}
                                required
                            />
                        </motion.div>

                        {/* Email */}
                        <motion.div 
                            className={`${form.card} flex items-center gap-3 px-4 py-3.5`} 
                            style={{
                                backgroundColor: dark ? "#1f2937" : "#ffffff",
                                borderColor: dark ? "#ffffff" : "#e5e7eb",
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
                                transition={{ delay: 0.4 }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </motion.svg>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formState.email}
                                onChange={handleChange}
                                className={`flex-1 ${form.input} bg-transparent outline-none`}
                                style={{ color: dark ? "#e5e7eb" : "#1f2937" }}
                            />
                        </motion.div>

                        {/* Phone Number */}
                        <motion.div 
                            className={`${form.card} flex items-center gap-3 px-4 py-3.5`} 
                            style={{
                                backgroundColor: dark ? "#1f2937" : "#ffffff",
                                borderColor: dark ? "#ffffff" : "#e5e7eb",
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
                                transition={{ delay: 0.45 }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.302a12.01 12.01 0 01-4.3-4.3c-.242-.44-.076-.927.301-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                            </motion.svg>
                            <input
                                type="tel"
                                name="phoneNumber"
                                placeholder="Phone Number"
                                value={formState.phoneNumber}
                                onChange={handleChange}
                                className={`flex-1 ${form.input} bg-transparent outline-none`}
                                style={{ color: dark ? "#e5e7eb" : "#1f2937" }}
                                required
                            />
                        </motion.div>

                        {/* Password */}
                        <motion.div 
                            className={`${form.card} flex items-center gap-3 px-4 py-3.5`} 
                            style={{
                                backgroundColor: dark ? "#1f2937" : "#ffffff",
                                borderColor: dark ? "#ffffff" : "#e5e7eb",
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
                                transition={{ delay: 0.5 }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                            </motion.svg>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formState.password}
                                onChange={handleChange}
                                className={`flex-1 ${form.input} bg-transparent outline-none`}
                                style={{ color: dark ? "#e5e7eb" : "#1f2937" }}
                            />
                            <motion.button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                className="cursor-pointer"
                                style={{ color: dark ? "#ffffff" : "#9ca3af" }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = dark ? "#e5e7eb" : "#4b5563";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = dark ? "#ffffff" : "#9ca3af";
                                }}
                            >
                                {showPassword ? (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                )}
                            </motion.button>
                        </motion.div>

                        {/* Confirm Password */}
                        <motion.div 
                            className={`${form.card} flex items-center gap-3 px-4 py-3.5`} 
                            style={{
                                backgroundColor: dark ? "#1f2937" : "#ffffff",
                                borderColor: dark ? "#ffffff" : "#e5e7eb",
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
                                transition={{ delay: 0.6 }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                            </motion.svg>
                            <input
                                type={showConfirm ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formState.confirmPassword}
                                onChange={handleChange}
                                className={`flex-1 ${form.input} bg-transparent outline-none`}
                                style={{ color: dark ? "#e5e7eb" : "#1f2937" }}
                            />
                            <motion.button
                                type="button"
                                onClick={() => setShowConfirm((v) => !v)}
                                className="cursor-pointer"
                                style={{ color: dark ? "#ffffff" : "#9ca3af" }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = dark ? "#e5e7eb" : "#4b5563";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = dark ? "#ffffff" : "#9ca3af";
                                }}
                            >
                                {showConfirm ? (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                )}
                            </motion.button>
                        </motion.div>

                        {/* Terms checkbox */}
                        <motion.label 
                            className="flex items-center gap-2 cursor-pointer mt-1"
                            variants={itemVariants}
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.2 }}
                        >
                            <motion.input
                                type="checkbox"
                                name="agreed"
                                checked={formState.agreed}
                                onChange={handleChange}
                                className="w-4 h-4 rounded cursor-pointer"
                                style={{ accentColor: textColor }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            />
                            <span className="text-xs" style={{ color: dark ? "#ffffff" : "#9ca3af" }}>
                                I agree to the{" "}
                                <Link href="/terms" className="underline hover:opacity-80" style={{ color: textColor }}>
                                    Terms of Service
                                </Link>
                                {" "}and{" "}
                                <Link href="/privacy" className="underline hover:opacity-80" style={{ color: textColor }}>
                                    Privacy Policy
                                </Link>
                            </span>
                        </motion.label>

                        {/* Sign Up button */}
                        <motion.button
                            onClick={handleSubmit}
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
                                    Creating Account...
                                </motion.span>
                            ) : 'Sign Up'}
                        </motion.button>

                        {/* Divider */}
                        <motion.div 
                            className="flex items-center gap-3 my-1"
                            variants={itemVariants}
                        >
                            <div className="flex-1 h-px" style={{ backgroundColor: dark ? "#374151" : "#e5e7eb" }} />
                            <span className="text-xs" style={{ color: dark ? "#ffffff" : "#9ca3af" }}>or continue with</span>
                            <div className="flex-1 h-px" style={{ backgroundColor: dark ? "#374151" : "#e5e7eb" }} />
                        </motion.div>

                        {/* Google */}
                        <motion.button 
                            className="flex items-center justify-center gap-3 w-full border rounded-xl px-4 py-3 text-sm font-medium transition-colors cursor-pointer" 
                            style={{
                                backgroundColor: dark ? "#1f2937" : "#ffffff",
                                borderColor: dark ? "#374151" : "#e5e7eb",
                                color: dark ? "#e5e7eb" : "#374151",
                            }}
                            variants={itemVariants}
                            whileHover={{ 
                                scale: 1.02,
                                backgroundColor: dark ? "#374151" : "#f9fafb",
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </motion.button>

                        {/* Apple */}
                        <motion.button 
                            className="flex items-center justify-center gap-3 w-full border rounded-xl px-4 py-3 text-sm font-medium transition-colors cursor-pointer" 
                            style={{
                                backgroundColor: dark ? "#1f2937" : "#ffffff",
                                borderColor: dark ? "#374151" : "#e5e7eb",
                                color: dark ? "#e5e7eb" : "#374151",
                            }}
                            variants={itemVariants}
                            whileHover={{ 
                                scale: 1.02,
                                backgroundColor: dark ? "#374151" : "#f9fafb",
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                            </svg>
                            Continue with Apple
                        </motion.button>

                        {/* Login link */}
                        <motion.p 
                            className="text-center text-sm mt-2" 
                            style={{ color: dark ? "#ffffff" : "#9ca3af" }}
                            variants={itemVariants}
                        >
                            Already have an account?{" "}
                            <Link
                                href="/Login"
                                className="font-medium underline hover:opacity-80"
                                style={{ color: textColor }}
                            >
                                Log In
                            </Link>
                        </motion.p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}