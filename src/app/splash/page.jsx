"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";

export default function SplashScreen({ duration = 3000 }) {
    const [visible, setVisible] = useState(true);
    const router = useRouter();
    const { dark, textColor } = useTheme();

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            router.push("/welcome");
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, router]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className={`
                        fixed inset-0 z-[100]
                        flex flex-col items-center justify-center
                    `}
                    style={{
                        backgroundColor: dark ? "#111827" : "#F7F7FA",
                    }}
                >
                    {/* ── Logo block ── */}
                    <motion.div 
                        className="flex flex-col items-center gap-5 mb-8"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ 
                            duration: 0.8, 
                            delay: 0.2,
                            ease: [0.22, 1, 0.36, 1]
                        }}
                    >
                        <motion.div 
                            className="relative w-150 h-100 sm:w-48 sm:h-48 md:w-258 md:h-128 lg:w-258 lg:h-128"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                            <Image
                                src={IMAGES.hero}
                                alt="Mudras logo"
                                fill
                                sizes="(max-width: 640px) 150px, (max-width: 768px) 192px, 258px"
                                className="object-contain"
                                priority
                            />
                        </motion.div>

                        <motion.span 
                            className="font-medium text-4xl sm:text-8xl tracking-[0.45em] uppercase"
                            style={{ color: textColor }}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ 
                                duration: 0.6, 
                                delay: 0.4,
                                ease: "easeOut"
                            }}
                        >
                            MUDRAS
                        </motion.span>
                    </motion.div>

                    {/* ── Decorative wave ── */}
                    <motion.div 
                        className="absolute bottom-0 left-0 w-full pointer-events-none select-none h-24 sm:h-28 md:h-32 lg:h-36 2xl:h-40"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ 
                            duration: 1, 
                            delay: 0.6,
                            ease: "easeOut"
                        }}
                    >
                        <WaveSVG dark={dark} textColor={textColor} />
                    </motion.div>

                    {/* ── Dashed circle loader ── */}
                    <motion.div 
                        className="absolute bottom-14 sm:bottom-16 md:bottom-18 lg:bottom-20 2xl:bottom-24 flex items-center justify-center z-10"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ 
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                            delay: 0.8
                        }}
                    >
                        <DashedCircleLoader textColor={textColor} />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function DashedCircleLoader({ textColor }) {
    return (
        <motion.svg 
            width="46" 
            height="46" 
            viewBox="0 0 36 36" 
            fill="none" 
            animate={{ rotate: 360 }}
            transition={{ 
                duration: 1.8,
                repeat: Infinity,
                ease: "linear"
            }}
        >
            <circle 
                cx="18" 
                cy="18" 
                r="15" 
                stroke={textColor} 
                strokeWidth="1.8" 
                strokeDasharray="4 4" 
                strokeLinecap="round" 
                opacity="0.6"
            />
        </motion.svg>
    );
}

function WaveSVG({ dark, textColor }) {
    const waveColor = dark ? "#374151" : "#C4B8FF";
    const waveColorLight = dark ? "#2d3748" : "#D8D0FF";
    
    return (
        <svg viewBox="0 0 390 160" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path 
                d="M-10 100 C60 60, 130 140, 200 95 C270 50, 340 130, 400 85 L400 160 L-10 160 Z" 
                fill="none" 
                stroke={waveColorLight} 
                strokeWidth="1.2" 
                opacity="0.5" 
            />
            <path 
                d="M-10 120 C70 80, 140 155, 210 110 C280 65, 340 145, 410 105 L410 160 L-10 160 Z" 
                fill="none" 
                stroke={waveColor} 
                strokeWidth="1.4" 
                opacity="0.7" 
            />
        </svg>
    );
}