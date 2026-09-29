"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { spacing, typography } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";

const defaultSessions = [
    {
        image: IMAGES.StressRelief,
        title: "Prithvi Mudra: Benefits and How to Practice",
        date: "May 12, 2025",
        Mini: "6 min read",
        bg: "bg-green-100",
    },
    {
        image: IMAGES.HealingRecovery,
        title: "Yoga Nidra for Deep Relaxation and Healing",
        date: "May 15, 2025",
        Mini: "7 min read",
        bg: "bg-pink-100",
    },
    {
        image: IMAGES.SleepDeep,
        title: "The Five Elements and Their Healing Power",
        date: "May 18, 2025",
        Mini: "5 min read",
        bg: "bg-yellow-100",
    },
    {
        image: IMAGES.YogaNidraFeature,
        title: "Daily Habits for a Calm and Balanced Mind",
        date: "May 22, 2025",
        Mini: "6 min read",
        bg: "bg-purple-100",
    },
];

function SessionCard({ id, documentId, image, title, Title, description, Description, desc, Intro, intro, duration, ReadTime, Mini, bg, BgColorClass, Thumbnail, thumbnail, date, PublishDate, dark, textColor, index }) {
    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    const getImgBaseUrl = () => {
      if (typeof window !== "undefined") {
        const hostname = window.location.hostname;
        if (hostname && hostname !== "localhost" && hostname !== "127.0.0.1") {
          return `http://${hostname}:1337`;
        }
      }
      return "http://192.168.1.14:1337";
    };
    const IMAGE_BASE_URL = getImgBaseUrl();

    // Map attributes
    const finalId = documentId || id;
    const finalTitle = Title || title || "";
    const finalDesc = Description || description || desc || Intro || intro || "";
    const finalDuration = ReadTime || duration || "";
    const finalMini = Mini || "5 min read";
    const finalBg = BgColorClass || bg || "bg-benefit-1";

    const thumbUrl = Thumbnail?.url || thumbnail?.url;
    const resolvedImgUrl = thumbUrl
        ? (thumbUrl.startsWith("http") ? thumbUrl : `${IMAGE_BASE_URL}${thumbUrl}`)
        : image;

    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      try {
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return dateStr;
        return d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      } catch {
        return dateStr;
      }
    };
    const finalDate = formatDate(PublishDate || date) || date || "";

    const content = (
        <motion.div 
            className="flex flex-col rounded-2xl overflow-hidden h-full cursor-pointer"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{
                y: -6,
                boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                transition: { duration: 0.2 }
            }}
        >
            <motion.div 
                className="relative w-full aspect-[4/3] overflow-hidden shrink-0" 
                style={{
                    backgroundColor: dark ? "#374151" : "#f3f4f6",
                }}
                whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.3 }
                }}
            >
                {resolvedImgUrl ? (
                    <Image
                        src={resolvedImgUrl}
                        alt={finalTitle}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-400 text-xs">Image</span>
                    </div>
                )}
            </motion.div>

            <motion.div 
                className={`${finalBg} flex flex-col gap-2 px-5 py-5 flex-1`} 
                style={{
                    backgroundColor: dark ? undefined : undefined,
                }}
                whileHover={{
                    backgroundColor: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
                    transition: { duration: 0.2 }
                }}
            >
                <motion.h3 
                    className="text-sm md:text-xs lg:text-base font-semibold line-clamp-2" 
                    style={{ color: textColor }}
                    whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2 }
                    }}
                >
                    {finalTitle}
                </motion.h3>
                <p className="text-xs md:text-[10px] lg:text-sm line-clamp-3" style={{ color: dark ? "#9ca3af" : "#4b5563" }}>
                    {finalDesc}
                </p>
                <p className="text-xs md:text-[10px] lg:text-sm mt-auto pt-3 font-medium" style={{ color: dark ? "#000000" : "#6b7280" }}>
                    {finalDate || finalDuration} {(finalDate || finalDuration) && finalMini && <span className="mx-1">•</span>} {finalMini}
                </p>
            </motion.div>
        </motion.div>
    );

    if (finalId) {
        return <Link href={`/BlogDetailPage?id=${finalId}`}>{content}</Link>;
    }
    return content;
}

export default function YouMayAlsoLike({ blogs = [], sessions = defaultSessions }) {
    const { dark, textColor } = useTheme();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { 
        once: true, 
        amount: 0.05,
        margin: "-50px"
    });

    // Character animation for heading
    const charVariants = {
        hidden: { opacity: 0, y: 20, rotateX: -10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                delay: i * 0.06,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    };

    const headingText = "You May Also Like";
    const headingChars = headingText.split("");

    // Container variants for stagger
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    return (
        <motion.section 
            ref={sectionRef}
            className={`w-full ${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`} 
            style={{
                backgroundColor: dark ? "#111827" : "#ffffff",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className={spacing.container}>
                
                {/* Heading - Character by character */}
                <motion.h2 
                    className={typography.howToPractice.heading} 
                    style={{ color: textColor }}
                >
                    {headingChars.map((char, i) => (
                        <motion.span
                            key={i}
                            custom={i}
                            variants={charVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            style={{ display: "inline-block" }}
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </motion.h2>

                {/* Divider */}
                <motion.div 
                    className={typography.howToPractice.dividerWrapper}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <motion.span 
                        className={typography.whySubscribe.dividerLine} 
                        style={{
                            backgroundColor: dark ? "#d4d4d4" : "#e5e7eb",
                        }}
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    />
                    <motion.div 
                        className={typography.howToPractice.lotusDivider}
                    >
                        <Image
                            src={IMAGES.Energy}
                            alt="Lotus divider"
                            width={40}
                            height={40}
                            className="w-full h-full object-contain"
                            style={{
                                filter: dark ? "brightness(0.8) invert(1)" : "none",
                            }}
                        />
                    </motion.div>
                    <motion.span 
                        className={typography.whySubscribe.dividerLine} 
                        style={{
                            backgroundColor: dark ? "#d4d4d4" : "#e5e7eb",
                        }}
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    />
                </motion.div>

                {/* Grid */}
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {(blogs && blogs.length > 0 ? blogs : sessions).map((item, i) => (
                        <SessionCard 
                            key={item.documentId || item.id || i} 
                            {...item} 
                            dark={dark} 
                            textColor={textColor} 
                            index={i}
                        />
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
}