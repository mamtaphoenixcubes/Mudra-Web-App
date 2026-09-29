"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { typography } from "../../theme/typography";
import { spacing } from "../../theme/spacing";
import { btn } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import { useAuthStore } from "../../store/useAuthStore";
import GoogleLoginButton from "../../components/GoogleLoginButton";
function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") || "/Home";
    
    const { dark, textColor } = useTheme();
    const { login, error: authError, loading: isLoading } = useAuthStore();
    const [form, setForm] = useState({
        email: "",
        password: "",
        remember: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [localError, setLocalError] = useState("");

    const displayError = localError || authError;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        if (localError) setLocalError("");
    };

    const handleSubmit = async () => {
        if (!form.email || !form.password) {
            setLocalError("Email and password are required.");
            return;
        }

        setLocalError("");
        const success = await login(form.email, form.password, form.remember);
        if (success) {
            router.push(redirectTo);
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
                            src={IMAGES.Welcomeback}
                            alt="Mudra"
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
                        Log In
                    </motion.h1>
                    
                    <motion.p 
                        className={`${typography.solutionBody} text-center md:text-left mb-5`} 
                        style={{ color: dark ? "#ffffff" : "#9ca3af" }}
                        variants={itemVariants}
                    >
                        Welcome back! Log in to continue your healing journey
                    </motion.p>

                    {/* Error message */}
                    {displayError && (
                        <motion.div 
                            className="bg-red-50 text-red-500 text-xs px-4 py-2.5 rounded-xl border border-red-200 mb-2"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {displayError}
                        </motion.div>
                    )}

                    {/* Form */}
                    <motion.div 
                        className="flex flex-col gap-2.5"
                        variants={containerVariants}
                    >
                        {/* Email */}
                        <motion.div 
                            className="flex items-center gap-3 border rounded-xl px-4 py-3" 
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
                                name="email"
                                placeholder="Email Address"
                                value={form.email}
                                onChange={handleChange}
                                className="flex-1 text-sm bg-transparent outline-none"
                                style={{
                                    color: dark ? "#ffffff" : "#374151",
                                }}
                            />
                        </motion.div>

                        {/* Password */}
                        <motion.div 
                            className="flex items-center gap-3 border rounded-xl px-4 py-3" 
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
                                transition={{ delay: 0.4 }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                            </motion.svg>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={handleChange}
                                className="flex-1 text-sm bg-transparent outline-none"
                                style={{
                                    color: dark ? "#ffffff" : "#374151",
                                }}
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

                        {/* Remember me + Forgot Password */}
                        <motion.div 
                            className="flex items-center justify-between mt-0.5"
                            variants={itemVariants}
                        >
                            <motion.label 
                                className="flex items-center gap-2 cursor-pointer"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <motion.input
                                    type="checkbox"
                                    name="remember"
                                    checked={form.remember}
                                    onChange={handleChange}
                                    className="w-4 h-4 rounded cursor-pointer"
                                    style={{ accentColor: textColor }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                />
                                <span className="text-xs" style={{ color: dark ? "#ffffff" : "#9ca3af" }}>Remember me</span>
                            </motion.label>
                            <motion.button
                                onClick={() => router.push("/ForgotPassword")}
                                className="text-xs underline hover:opacity-80 cursor-pointer bg-transparent border-none p-0 font-inherit"
                                style={{ color: textColor }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                Forgot Password?
                            </motion.button>
                        </motion.div>

                        {/* Log In button */}
                        <motion.button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className={`w-full ${btn.primary} text-center mt-0.5 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
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
                                    Logging in...
                                </motion.span>
                            ) : 'Log In'}
                        </motion.button>

                        {/* Divider */}
                        <motion.div 
                            className="flex items-center gap-3 my-0.5"
                            variants={itemVariants}
                        >
                            <div className="flex-1 h-px" style={{ backgroundColor: dark ? "#374151" : "#e5e7eb" }} />
                            <span className="text-xs" style={{ color: dark ? "#ffffff" : "#9ca3af" }}>or continue with</span>
                            <div className="flex-1 h-px" style={{ backgroundColor: dark ? "#374151" : "#e5e7eb" }} />
                        </motion.div>

                        {/* Google */}

<GoogleLoginButton
    clientId={process.env.NEXT_PUBLIC_GOOGLE_WEB_CLIENT_ID}
    className="w-full"
    onSuccess={(response) => {
        console.log("GOOGLE LOGIN SUCCESS");

        if (response.success && response.data) {
            // Store the COMPLETE user object from API
            const userObj = response.data.user;

            // Tokens
            const token = response.data.accessToken;
            const refreshToken = response.data.refreshToken;
            const firebaseToken = response.data.firebaseToken;

            // Always use localStorage for Google login
            localStorage.setItem(
                "isLoggedIn",
                "true"
            );

            // Store COMPLETE user object
            localStorage.setItem(
                "user",
                JSON.stringify(userObj)
            );

            // Store access token
            localStorage.setItem(
                "token",
                token
            );

            // Store refresh token
            localStorage.setItem(
                "refreshToken",
                refreshToken
            );

            // Store Firebase token
            if (firebaseToken) {
                localStorage.setItem(
                    "firebaseToken",
                    firebaseToken
                );
            }

            // Clear sessionStorage so there is no stale auth data
            sessionStorage.removeItem("isLoggedIn");
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("refreshToken");
            sessionStorage.removeItem("firebaseToken");

            // Update Zustand
            useAuthStore.setState({
                user: userObj,
                token: token,
                refreshToken: refreshToken,
                firebaseToken: firebaseToken || null,
                isLoggedIn: true,
                loading: false,
                error: null,
            });

            // Notify other components
            window.dispatchEvent(
                new Event("storage")
            );

            // Redirect
            router.push(redirectTo);
        } else {
            setLocalError(
                response.message ||
                "Google login failed"
            );
        }
    }}
    onError={(error) => {
        console.error(
            "GOOGLE LOGIN FAILED:",
            error
        );

        setLocalError(
            error?.message ||
            "Google login failed"
        );
    }}
/>



                        {/* Apple */}
                        <motion.button 
                            className="flex items-center justify-center gap-3 w-full border rounded-xl px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer" 
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
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                            </svg>
                            Continue with Apple
                        </motion.button>

                        {/* Sign Up link */}
                        <motion.p 
                            className="text-center text-sm mt-1.5" 
                            style={{ color: dark ? "#ffffff" : "#9ca3af" }}
                            variants={itemVariants}
                        >
                            Don't have an account?{" "}
                            <motion.button
                                onClick={() => router.push("/SignUp")}
                                className="font-medium underline hover:opacity-80 cursor-pointer bg-transparent border-none p-0 font-inherit"
                                style={{ color: textColor }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                Sign Up
                            </motion.button>
                        </motion.p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}

export default function LogIn() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
                <span className="text-gray-500">Loading Login Form...</span>
            </div>
        }>
            <LoginForm />
        </Suspense>
    );
}