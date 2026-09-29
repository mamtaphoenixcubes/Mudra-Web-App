"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { spacing, typography, btn, form, card, verifyEmail } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

export default function VerifyEmail() {
    const router = useRouter();
    const { dark, textColor } = useTheme();
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const inputs = useRef([]);

    useEffect(() => {
        if (timer === 0) { setCanResend(true); return; }
        const t = setTimeout(() => setTimer(timer - 1), 1000);
        return () => clearTimeout(t);
    }, [timer]);

    const handleChange = (i, val) => {
        if (!/^\d?$/.test(val)) return;
        const next = [...code];
        next[i] = val;
        setCode(next);
        if (val && i < 5) inputs.current[i + 1]?.focus();
    };

    const handleKeyDown = (i, e) => {
        if (e.key === "Backspace" && !code[i] && i > 0) {
            inputs.current[i - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        const next = [...code];
        pasted.split("").forEach((c, i) => { next[i] = c; });
        setCode(next);
        inputs.current[Math.min(pasted.length, 5)]?.focus();
    };

    const handleResend = () => {
        if (!canResend) return;
        setTimer(30);
        setCanResend(false);
        setCode(["", "", "", "", "", ""]);
        inputs.current[0]?.focus();
    };

    const handleVerify = async () => {
        if (!filled) return;
        setIsVerifying(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsVerifying(false);
        router.push("/ResetPassword");
    };

    const filled = code.every((c) => c !== "");

    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { duration: 0.4, ease: "easeOut" }
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
            transition={{ duration: 0.5 }}
        >
            <motion.div 
                className={verifyEmail.card} 
                style={{
                    backgroundColor: dark ? "#1f2937" : "#ffffff",
                    borderColor: dark ? "#374151" : "#e5e7eb",
                }}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
            >
                {/* Image */}
                <motion.div 
                    className="w-full flex justify-center"
                    variants={fadeIn}
                >
                    <div className={verifyEmail.imageWrapper} style={{
                        backgroundColor: dark ? "#374151" : "#f3f4f6",
                    }}>
                        <Image
                            src={IMAGES.MessageMail}
                            alt="Verify Email"
                            fill
                            className={verifyEmail.image}
                            priority
                        />
                    </div>
                </motion.div>

                {/* Title */}
                <motion.div 
                    className="text-center"
                    variants={fadeIn}
                >
                    <h1 className={typography.benefitTitle} style={{ color: textColor }}>
                        Verify Your Email
                    </h1>
                    <p className={typography.subtitleWidth} style={{ color: dark ? "#ffffff" : "#9ca3af" }}>
                        We've sent a 6-digit verification<br />code to your email address
                    </p>
                    <p className={typography.subtitleWidth + " font-medium mt-1"} style={{ color: dark ? "#ffffff" : "#1f2937" }}>
                        youremail@gmail.com
                    </p>
                </motion.div>

                {/* Code input */}
                <motion.div 
                    className="w-full"
                    variants={fadeIn}
                >
                    <p className={typography.sectionMb + " font-medium mb-3"} style={{ color: dark ? "#ffffff" : "#1f2937" }}>
                        Enter 6-digit code
                    </p>
                    <div className={verifyEmail.codeContainer}>
                        {code.map((val, i) => (
                            <motion.input
                                key={i}
                                ref={(el) => (inputs.current[i] = el)}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={val}
                                onChange={(e) => handleChange(i, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(i, e)}
                                onPaste={handlePaste}
                                className={verifyEmail.codeInput}
                                style={{
                                    backgroundColor: dark ? "#374151" : "#ffffff",
                                    borderColor: dark ? "#4b5563" : "#e5e7eb",
                                    color: dark ? "#ffffff" : "#1f2937",
                                }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05, duration: 0.3 }}
                                whileFocus={{ scale: 1.05 }}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = textColor;
                                    e.currentTarget.style.boxShadow = `0 0 0 3px ${textColor}30`;
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = dark ? "#4b5563" : "#e5e7eb";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Resend */}
                <motion.p 
                    className={verifyEmail.resendText} 
                    style={{ color: dark ? "#ffffff" : "#9ca3af" }}
                    variants={fadeIn}
                >
                    Didn't receive the code?{" "}
                    <button
                        onClick={handleResend}
                        className={canResend ? verifyEmail.resendButton : verifyEmail.resendButtonDisabled}
                        style={{
                            color: canResend ? textColor : (dark ? "#6b7280" : "#9ca3af"),
                            cursor: canResend ? "pointer" : "default",
                        }}
                        onMouseEnter={(e) => {
                            if (canResend) {
                                e.currentTarget.style.opacity = "0.7";
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (canResend) {
                                e.currentTarget.style.opacity = "1";
                            }
                        }}
                    >
                        Resend Code {!canResend && ("(00:" + String(timer).padStart(2, "0") + ")")}
                    </button>
                </motion.p>

                {/* Verify button */}
                <motion.button
                    onClick={handleVerify}
                    disabled={!filled || isVerifying}
                    className={filled ? btn.verifyEmail : btn.verifyEmailDisabled}
                    style={{
                        backgroundColor: filled ? textColor : (dark ? "#374151" : "#e5e7eb"),
                        color: filled ? "#ffffff" : (dark ? "#6b7280" : "#9ca3af"),
                        cursor: (filled && !isVerifying) ? "pointer" : "not-allowed",
                    }}
                    variants={fadeIn}
                    whileHover={filled && !isVerifying ? { 
                        scale: 1.02,
                        opacity: 0.85,
                    } : {}}
                    whileTap={filled && !isVerifying ? { scale: 0.98 } : {}}
                >
                    {isVerifying ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Verifying...
                        </span>
                    ) : 'Verify Email'}
                </motion.button>

                {/* Divider */}
                <motion.div 
                    className={verifyEmail.divider}
                    variants={fadeIn}
                >
                    <div className={verifyEmail.dividerLine} style={{ backgroundColor: dark ? "#374151" : "#e5e7eb" }} />
                    <span className={verifyEmail.dividerText} style={{ color: dark ? "#ffffff" : "#9ca3af" }}>or</span>
                    <div className={verifyEmail.dividerLine} style={{ backgroundColor: dark ? "#374151" : "#e5e7eb" }} />
                </motion.div>

                {/* Change email */}
                <motion.button
                    onClick={() => router.push("/ForgotPassword")}
                    className={verifyEmail.changeEmailButton}
                    style={{
                        color: textColor,
                    }}
                    variants={fadeIn}
                    whileHover={{ 
                        scale: 1.02,
                        opacity: 0.7,
                    }}
                    whileTap={{ scale: 0.98 }}
                >
                    <svg viewBox="0 0 24 24" className={verifyEmail.svgIcon} fill="none" stroke="currentColor" strokeWidth="1.8" style={{ color: textColor }}>
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="M2 7l10 7 10-7" />
                    </svg>
                    Change Email Address
                </motion.button>

            </motion.div>
        </motion.div>
    );
}