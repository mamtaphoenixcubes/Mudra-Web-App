"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { typography, spacing, btn } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";
import { blogService } from "../../services/apiService";

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

// ── Article data ───────────────────────────────────────────────
const ARTICLES = [
    {
        id: 1,
        title: "What Are Mudras? A Complete Beginner's Guide",
        desc: "Understand the meaning, science and benefit of mudras and how they enhance your life.",
        date: "May 10, 2024",
        readTime: "6 min read",
        bg: "bg-benefit-1",
        imgKey: "MudrasImage",
        category: "Mudras",
    },
    {
        id: 2,
        title: "What is Yoga Nidra? Benefits, Steps & Science?",
        desc: "Explore the transformative power of Yogic sleep and how it supports deep rest and healing.",
        date: "May 7, 2024",
        readTime: "7 min read",
        bg: "bg-benefit-2",
        imgKey: "YogaNidraImage",
        category: "Yoga Nidra",
    },
    {
        id: 3,
        title: "The Five Elements in Yoga and How They Heal",
        desc: "Learn how earth, water, fire, air and space influence your body, mind and emotions.",
        date: "May 3, 2024",
        readTime: "6 min read",
        bg: "bg-problem-3",
        imgKey: "EarthElement",
        category: "Elements",
    },
    {
        id: 4,
        title: "Best Mudras for Stress and Anxiety",
        desc: "Simple hand gestures to calm your mind, reduce stress and bring emotional balance.",
        date: "Apr 28, 2024",
        readTime: "5 min read",
        bg: "bg-benefit-4",
        imgKey: "gyanMudra",
        category: "Mudras",
    },
    {
        id: 5,
        title: "How to Practice Mudras Correctly: A Step-by-Step Guide",
        desc: "Posture, hand position, breath and duration—everything you need to know.",
        date: "Apr 24, 2024",
        readTime: "8 min read",
        bg: "bg-benefit-5",
        imgKey: "pranaMudra",
        category: "Mudras",
    },
    {
        id: 6,
        title: "The Origins and History of Mudras",
        desc: "From ancient scriptures to modern science-trace the journey of mudras through time.",
        date: "Apr 20, 2024",
        readTime: "9 min read",
        bg: "bg-benefit-1",
        imgKey: "BuddhistMudras",
        category: "History & Philosophy",
    },
    {
        id: 7,
        title: "Yoga Nidra for Better Sleep: A Complete Guide",
        desc: "How Yoga Nidra helps with insomnia sleep quality and deep relaxation.",
        date: "Apr 16, 2024",
        readTime: "6 min read",
        bg: "bg-problem-3",
        imgKey: "Satyananda",
        category: "Yoga Nidra",
    },
    {
        id: 8,
        title: "Fire Element: Signs of Imbalance and Healing Mudras",
        desc: "Understand the meaning, science and benefit of mudras and how they enhance your life.",
        date: "Apr 12, 2024",
        readTime: "7 min read",
        bg: "bg-benefit-2",
        imgKey: "FireElement",
        category: "Elements",
    },
];

// ── Tabs config with custom colors ────────────────────────────────
const TABS = [
    { label: "All Articles",         value: "All Articles",         iconBg: "#FEF3C7", iconColor: "#B45309", imgKey: "AllArticles"      },
    { label: "Mudras",               value: "Mudras",               iconBg: "#F3E8FF", iconColor: "#7C3AED", imgKey: "IconMudras"       },
    { label: "Yoga Nidra",           value: "Yoga Nidra",           iconBg: "#DBEAFE", iconColor: "#1D4ED8", imgKey: "IconYogaNidra"    },
    { label: "Elements",             value: "Elements",             iconBg: "#FCE7F3", iconColor: "#BE185D", imgKey: "IconElements"     },
    { label: "Well-being",           value: "Well-being",           iconBg: "#DCFCE7", iconColor: "#16A34A", imgKey: "EmotionalBalance" },
    { label: "History & Philosophy", value: "History & Philosophy", iconBg: "#E0E7FF", iconColor: "#4338CA", imgKey: "IconHistory"      },
    { label: "Practice & Guides",    value: "Practice & Guides",    iconBg: "#FEF3C7", iconColor: "#D97706", imgKey: "IconPractice"     },
];

// ── Tab icon circle with custom colors ────────────────────────
function TabIconCircle({ tab, size, imgSize, dark, textColor, index }) {
    const img = IMAGES[tab.imgKey];
    
    const iconVariants = {
        hidden: { opacity: 0, scale: 0.5, rotate: -180 },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: index * 0.05 + 0.1,
            },
        },
    };

    return (
        <motion.div 
            className={`rounded-full flex items-center justify-center shrink-0 ${size}`} 
            style={{
                backgroundColor: dark ? tab.iconBg : tab.iconBg,
            }}
            variants={iconVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{
                scale: 1.15,
                rotate: 8,
                transition: { duration: 0.2 }
            }}
        >
            {img ? (
                <Image
                    src={img}
                    alt={tab.label}
                    width={imgSize}
                    height={imgSize}
                    className="object-contain"
                />
            ) : (
                <span className="text-gray-400 text-xs">?</span>
            )}
        </motion.div>
    );
}

// ── Article Card with custom colors ───────────────────────────────
function ArticleCard({ article, dark, textColor, index }) {
    const thumbUrl = article.Thumbnail?.url || article.thumbnail?.url;
    const resolvedImgUrl = thumbUrl
      ? (thumbUrl.startsWith("http") ? thumbUrl : `${IMAGE_BASE_URL}${thumbUrl}`)
      : IMAGES[article.imgKey];

    const titleText = article.Title || article.title || "";
    const descriptionText = article.Description || article.desc || article.Intro || article.intro || "";
    const readTimeText = article.ReadTime || article.readTime || "5 min read";
    const bgClass = article.BgColorClass || article.bg || "bg-benefit-1";

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
    const dateText = formatDate(article.PublishDate) || article.date || "";

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return (
        <Link href={`/BlogDetailPage?id=${article.documentId || article.id}`}>
            <motion.div 
                className={`${bgClass} rounded-2xl overflow-hidden flex flex-col h-full transition-transform duration-200 hover:scale-[1.02] hover:shadow-md cursor-pointer`}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{
                    y: -4,
                    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                    transition: { duration: 0.2 }
                }}
            >
                <motion.div 
                    className="w-full aspect-[4/3] overflow-hidden shrink-0 relative" 
                    style={{
                        backgroundColor: dark ? "#1f2937" : "rgba(255,255,255,0.4)",
                    }}
                    whileHover={{
                        scale: 1.03,
                        transition: { duration: 0.3 }
                    }}
                >
                    {resolvedImgUrl ? (
                        <Image
                            src={resolvedImgUrl}
                            alt={titleText}
                            fill
                            className="w-full h-full object-cover"
                            style={{ objectPosition: "center" }}
                        />
                    ) : (
                        <div className="w-full h-full" style={{ backgroundColor: dark ? "#374151" : "rgba(255,255,255,0.3)" }} />
                    )}
                </motion.div>
                <div className="flex flex-col flex-1 p-3 md:p-4">
                    <motion.h3 
                        className="font-semibold text-sm md:text-[12px] lg:text-[15px] leading-snug mb-2 line-clamp-2" 
                        style={{ color: textColor }}
                        whileHover={{
                            scale: 1.02,
                            transition: { duration: 0.2 }
                        }}
                    >
                        {titleText}
                    </motion.h3>
                    <p className="text-xs md:text-[10px] lg:text-sm leading-relaxed flex-1 mb-3 line-clamp-3" style={{ color: dark ? "#000000" : "#4b5563" }}>
                        {descriptionText}
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] md:text-[9px] lg:text-xs mt-auto" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>
                        <span>{dateText}</span>
                        <span>•</span>
                        <span>{readTimeText}</span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}

// ── Main component ─────────────────────────────────────────────
export default function LatestArticles() {
    const { dark, textColor } = useTheme();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { 
        once: true, 
        amount: 0.05,
        margin: "-50px"
    });

    const [activeTab, setActiveTab] = useState("All Articles");
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadBlogs() {
            try {
                const json = await blogService.getAllBlogs();
                let list = [];
                if (json && json.success && Array.isArray(json.data)) {
                    list = json.data;
                } else if (json && Array.isArray(json.data)) {
                    list = json.data;
                } else if (Array.isArray(json)) {
                    list = json;
                }
                setBlogs(list);
            } catch (err) {
                console.warn("Failed to load blogs:", err);
            } finally {
                setLoading(false);
            }
        }
        loadBlogs();
    }, []);

    const filtered =
        activeTab === "All Articles"
            ? blogs
            : blogs.filter((a) => (a.TypeOfBlog || a.category) === activeTab);

    // Fade up variants
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
                staggerChildren: 0.06,
                delayChildren: 0.2,
            },
        },
    };

    // Tab bar variants
    const tabBarVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    // Character animation for heading
    const charVariants = {
        hidden: { opacity: 0, y: 20, rotateX: -10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                delay: i * 0.04,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    };

    const headingText = "Latest Articles";
    const headingChars = headingText.split("");

    return (
        <motion.section 
            ref={sectionRef}
            className={`${spacing.sectionPaddingX} py-8 md:py-10 lg:py-14`} 
            style={{
                backgroundColor: dark ? "#111827" : "#ffffff",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className={spacing.container}>

                {/* ── Tab bar ── */}
                <motion.div 
                    className="border rounded-2xl px-4 py-3 mb-8 overflow-x-auto" 
                    style={{
                        borderColor: dark ? "#f0f0f0" : "#e5e7eb",
                    }}
                    variants={tabBarVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {/* ── Mobile ── */}
                    <div className="flex md:hidden items-center min-w-max">
                        {TABS.map((tab, i) => (
                            <div key={tab.value} className="flex items-center">
                                <motion.button
                                    onClick={() => setActiveTab(tab.value)}
                                    className="flex items-center gap-1.5 px-2 py-1 cursor-pointer group"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <TabIconCircle tab={tab} size="w-8 h-8" imgSize={20} dark={dark} textColor={textColor} index={i} />
                                    <motion.span 
                                        className={`text-xs font-medium whitespace-nowrap transition-colors ${
                                            activeTab === tab.value
                                                ? "border-b-2 pb-0.5"
                                                : ""
                                        }`} 
                                        style={{
                                            color: activeTab === tab.value ? textColor : (dark ? "#ffffff" : "#6b7280"),
                                            borderColor: activeTab === tab.value ? textColor : "transparent",
                                        }}
                                        whileHover={{
                                            scale: 1.02,
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        {tab.label}
                                    </motion.span>
                                </motion.button>
                                {i < TABS.length - 1 && (
                                    <motion.div 
                                        className="w-px h-5 shrink-0" 
                                        style={{ backgroundColor: dark ? "#a8aaad" : "#e5e7eb" }}
                                        initial={{ opacity: 0, scaleY: 0 }}
                                        animate={isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
                                        transition={{ delay: i * 0.05 + 0.2 }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* ── Desktop ── */}
                    <div className="hidden md:flex items-center justify-between w-full">
                        {TABS.map((tab, i) => (
                            <div key={tab.value} className="flex items-center flex-1">
                                <motion.button
                                    onClick={() => setActiveTab(tab.value)}
                                    className="flex items-center gap-2.5 px-2 py-1.5 w-full cursor-pointer group"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <TabIconCircle tab={tab} size="w-12 h-12" imgSize={28} dark={dark} textColor={textColor} index={i} />
                                    <motion.span 
                                        className={`text-sm font-medium leading-tight transition-colors ${
                                            activeTab === tab.value
                                                ? "border-b-2 pb-0.5"
                                                : ""
                                        }`} 
                                        style={{
                                            color: activeTab === tab.value ? textColor : (dark ? "#ffffff" : "#6b7280"),
                                            borderColor: activeTab === tab.value ? textColor : "transparent",
                                        }}
                                        whileHover={{
                                            scale: 1.02,
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        {tab.label}
                                    </motion.span>
                                </motion.button>
                                {i < TABS.length - 1 && (
                                    <motion.div 
                                        className="w-px h-6 shrink-0" 
                                        style={{ backgroundColor: dark ? "#374151" : "#e5e7eb" }}
                                        initial={{ opacity: 0, scaleY: 0 }}
                                        animate={isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
                                        transition={{ delay: i * 0.05 + 0.2 }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* ── Heading ── */}
                <motion.div 
                    className={spacing.headingBlockMb}
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <motion.h2 
                        className="font-semibold text-2xl md:text-3xl mb-1" 
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
                    <motion.p 
                        className={`${typography.sectionMbBody}`} 
                        style={{ color: dark ? "#ffffff" : "#6b7280" }}
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        Practical knowledge. Ancient wisdom, Modern living.
                    </motion.p>
                </motion.div>

                {/* ── Grid ── */}
                {loading ? (
                    <motion.div 
                        className={`${typography.sectionBody} text-center py-20`} 
                        style={{ color: dark ? "#6b7280" : "#9ca3af" }}
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Loading articles...
                    </motion.div>
                ) : filtered.length === 0 ? (
                    <motion.div 
                        className={`${typography.sectionBody} text-center py-20`} 
                        style={{ color: dark ? "#6b7280" : "#9ca3af" }}
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        No articles in this category.
                    </motion.div>
                ) : (
                    <motion.div 
                        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-5"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        {filtered.map((a, index) => (
                            <ArticleCard key={a.id} article={a} dark={dark} textColor={textColor} index={index} />
                        ))}
                    </motion.div>
                )}

                {/* ── Load More ── */}
                <motion.div 
                    className="mt-10 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <motion.button 
                        className={btn.primary} 
                        style={{
                            backgroundColor: textColor,
                        }}
                        whileHover={{
                            scale: 1.05,
                            opacity: 0.85,
                            boxShadow: `0 8px 30px ${textColor}40`,
                            transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Load More Articles
                    </motion.button>
                </motion.div>

            </div>
        </motion.section>
    );
}