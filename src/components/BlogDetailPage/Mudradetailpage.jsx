"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { spacing } from "../../theme/spacing";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";
import { blogService } from "../../services/apiService";

const MUDRA = {
    intro:
        "In the fast pace of modern life, our minds are often crowded with thoughts, distractions, and stress. Gyan Mudra, also known as Chin Mudra, is a simple yet powerful gesture that helps calm the mind, improve focus, and connect us with inner wisdom.",
    name: "Gyan Mudra",
    whatItIs:
        "Gyan Mudra is a hand gesture where the tip of the index finger touches the tip of the thumb, while the other three fingers remain extended.",
    symbolism:
        "It symbolizes the union of individual consciousness (index finger) with universal consciousness (thumb).",
    quote: "When the individual mind connects with universal energy, wisdom arises.",
    benefits: [
        { icon: IMAGES.Mind, label: "Improves Concentration", desc: "Enhances focus, and mental clarity." },
        { icon: IMAGES.Energy, label: "Calms the Mind", desc: "Reduces stress, anxiety, and mental noise." },
        { icon: IMAGES.IconPractice, label: "Enhances Learning", desc: "Supports memory, understanding, and retention." },
        { icon: IMAGES.KayaMudras, label: "Promotes Inner Peace", desc: "Brings balance, harmony, and emotional stability." },
        { icon: IMAGES.Increases, label: "Boosts Energy", desc: "Helps remove emotional fatigue and rejuvenates." },
    ],
    steps: [
        { title: "Sit Comfortably", desc: "Sit in a relaxed position with your spine straight." },
        { title: "Hand Position", desc: "Touch the tip of your index finger to the tip of your thumb." },
        { title: "Other Fingers", desc: "Keep the remaining three fingers gently extended." },
        { title: "Focus", desc: "Close your eyes, take deep breaths, and focus on your breath or a positive intention." },
        { title: "Duration", desc: "Practice for 5–15 minutes daily for best results." },
    ],
    tipIcon: IMAGES.IconYogaNidra,
    tip: "Consistency is the key.",
    tipSub: "Even a few minutes daily can create a powerful shift in your mind and energy.",
    conclusion:
        "Gyan Mudra is a small gesture with a big impact. Whether you are a student, professional, or anyone seeking mental clarity and peace, this mudra can be your daily companion on the path to inner wisdom and balance.",
};

const AUTHOR = {
    avatar: IMAGES.Energy,
    name: "Mudras Team",
    bio: "A team of yoga enthusiasts and wellness researchers sharing ancient wisdom for modern living.",
};

const RELATED = [
    { title: "What is a Mudra? Meaning, Types & Benefits", date: "May 10, 2025", img: IMAGES.MudraDetailTemplate },
    { title: "Top 5 Mudras for Stress Relief", date: "May 15, 2025", img: IMAGES.StressRelief },
    { title: "How Mudras Improve Focus and Memory", date: "May 18, 2025", img: IMAGES.EnhancesFocus },
    { title: "Mudras for Beginners: Easy Practices to Start Your Journey", date: "May 22, 2025", img: IMAGES.Practice },
];

const SOCIALS = [
    { label: "Facebook", icon: IMAGES.Facebook },
    { label: "Instagram", icon: IMAGES.InstagramIcon },
    { label: "YouTube", icon: IMAGES.Youtube },
    { label: "LinkedIn", icon: IMAGES.LinkedIn },
];

const BENEFIT_COLORS = [
    "bg-yellow-100",
    "bg-purple-100",
    "bg-blue-100",
    "bg-pink-100",
    "bg-green-100",
];

function BenefitCard({ icon, label, desc, index, dark }) {
    const cardVariants = {
        hidden: { opacity: 0, y: 15, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                delay: index * 0.08 + 0.2,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return (
        <motion.div 
            className="flex flex-col items-center text-center gap-1 md:gap-1.5 lg:gap-2 px-1 md:px-2 lg:px-3 border-r border-gray-200 last:border-r-0" 
            style={{
                borderColor: dark ? "#374151" : "#e5e7eb",
            }}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{
                y: -4,
                transition: { duration: 0.2 }
            }}
        >
            <motion.div 
                className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full ${BENEFIT_COLORS[index] ?? "bg-holistic-bg"} flex items-center justify-center shrink-0`} 
                style={{
                    backgroundColor: dark ? undefined : undefined,
                }}
                whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.2 }
                }}
            >
                <Image src={icon} alt={label} width={24} height={24} className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 object-contain" />
            </motion.div>
            <motion.p 
                className="text-[9px] md:text-[10px] lg:text-[12px] font-semibold leading-tight" 
                style={{ color: dark ? "#e5e7eb" : "#111827" }}
                whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 }
                }}
            >
                {label}
            </motion.p>
            <p className="text-[8px] md:text-[9px] lg:text-[11px] leading-snug" style={{ color: dark ? "#ffffff" : "#6b7280" }}>
                {desc}
            </p>
        </motion.div>
    );
}

function StepItem({ index, title, desc, dark, textColor }) {
    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                delay: index * 0.05 + 0.2,
                duration: 0.4,
                ease: "easeOut",
            },
        },
    };

    return (
        <motion.li 
            className="flex items-start gap-2 sm:gap-2.5"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{
                x: 3,
                transition: { duration: 0.2 }
            }}
        >
            <motion.span 
                className="shrink-0 w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full flex items-center justify-center text-[9px] md:text-[9px] lg:text-xs font-semibold mt-0.5" 
                style={{
                    backgroundColor: dark ? "#374151" : "#f3f4f6",
                    color: dark ? "#ffffff" : "#374151",
                }}
                whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.2 }
                }}
            >
                {index}
            </motion.span>
            <p className="text-[11px] md:text-[11px] lg:text-sm xl:text-base leading-relaxed" style={{ color: dark ? "#9ca3af" : "#4b5563" }}>
                <span className="font-semibold" style={{ color: dark ? "#e5e7eb" : "#111827" }}>{title}:</span> {desc}
            </p>
        </motion.li>
    );
}

function RelatedArticle({ id, title, date, img, dark, textColor, index }) {
    const articleVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                delay: index * 0.06 + 0.2,
                duration: 0.4,
                ease: "easeOut",
            },
        },
    };

    const content = (
        <motion.div 
            className="flex items-start gap-2 md:gap-2.5 py-2 border-b border-gray-100 last:border-0 cursor-pointer group" 
            style={{
                borderColor: dark ? "#ffffff" : "#f3f4f6",
            }}
            variants={articleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{
                x: 3,
                transition: { duration: 0.2 }
            }}
        >
            <motion.div 
                className="w-12 h-12 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg shrink-0 overflow-hidden relative" 
                style={{
                    backgroundColor: dark ? "var(--holistic-bg)" : "var(--holistic-bg)",
                }}
                whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 }
                }}
            >
                <Image src={img} alt={title} fill className="object-cover" />
            </motion.div>
            <div className="flex-1 min-w-0">
                <motion.p 
                    className="text-[10px] md:text-[10px] lg:text-xs xl:text-sm font-medium leading-snug group-hover:text-primary transition-colors line-clamp-2" 
                    style={{ color: textColor }}
                    whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2 }
                    }}
                >
                    {title}
                </motion.p>
                <p className="text-[9px] md:text-[9px] lg:text-[10px] mt-0.5" style={{ color: dark ? "#dadada" : "#9ca3af" }}>{date}</p>
            </div>
        </motion.div>
    );

    if (id) {
        return <Link href={`/BlogDetailPage?id=${id}`}>{content}</Link>;
    }
    return content;
}

function Sidebar({ email, setEmail, dark, textColor, authorName, authorBio, authorAvatar, relatedBlogs = [] }) {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { 
        once: true, 
        amount: 0.05,
        margin: "-50px"
    });

    const sidebarVariants = {
        hidden: { opacity: 0, x: 30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2,
            },
        },
    };

    return (
        <motion.aside 
            ref={sectionRef}
            className="flex flex-col gap-3 md:gap-4"
            variants={sidebarVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            {/* About the Author */}
            <motion.div 
                className="bg-[#f9fafb] rounded-xl md:rounded-2xl p-4 md:p-5 flex flex-col items-center text-center gap-3 border border-gray-100" 
                whileHover={{
                    boxShadow: "0 4px 25px rgba(0,0,0,0.04)",
                    transition: { duration: 0.3 }
                }}
            >
                <motion.p 
                    className="text-xs md:text-xs lg:text-sm font-semibold self-start text-gray-800" 
                    initial={{ opacity: 0, y: -10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                >
                    About the Author
                </motion.p>
                <motion.div 
                    className="w-16 h-16 rounded-full border border-gray-200 bg-white overflow-hidden relative shrink-0 flex items-center justify-center shadow-sm"
                    whileHover={{
                        scale: 1.1,
                        rotate: 5,
                        transition: { duration: 0.2 }
                    }}
                >
                    <Image src={authorAvatar} alt={authorName} fill className="object-contain p-3.5"/>
                </motion.div>
                <div>
                    <motion.p 
                        className="text-xs md:text-xs lg:text-sm font-bold text-gray-800" 
                        whileHover={{
                            scale: 1.02,
                            transition: { duration: 0.2 }
                        }}
                    >
                        {authorName}
                    </motion.p>
                    <p className="text-[10px] md:text-[10px] lg:text-[11px] mt-1.5 leading-relaxed text-gray-500">{authorBio}</p>
                </div>
            </motion.div>

            {/* Related Articles */}
            <motion.div 
                className="flex flex-col gap-3 py-2 px-1" 
            >
                <motion.p 
                    className="text-xs md:text-xs lg:text-sm font-semibold text-gray-800" 
                    initial={{ opacity: 0, y: -10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                >
                    Related Articles
                </motion.p>
                <div className="flex flex-col">
                    {relatedBlogs && relatedBlogs.length > 0
                        ? relatedBlogs.map((r, i) => {
                            const relatedThumb = r.Thumbnail?.url || r.thumbnail?.url;
                            const relatedImgUrl = relatedThumb
                                ? (relatedThumb.startsWith("http") ? relatedThumb : `http://192.168.1.14:1337${relatedThumb}`)
                                : IMAGES.MudraDetailTemplate;
                            const relatedDate = r.PublishDate
                                ? new Date(r.PublishDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                                : r.date;
                            return (
                                <RelatedArticle 
                                    key={r.documentId || r.id || i}
                                    id={r.documentId || r.id}
                                    title={r.Title || r.title}
                                    date={relatedDate}
                                    img={relatedImgUrl}
                                    dark={dark}
                                    textColor={textColor}
                                    index={i}
                                />
                            );
                        })
                        : RELATED.map((r, i) => <RelatedArticle key={i} {...r} dark={dark} textColor={textColor} index={i} />)
                    }
                </div>
            </motion.div>

            {/* Stay Inspired */}
            <motion.div 
                className="bg-[#f9fafb] rounded-xl md:rounded-2xl p-4 md:p-5 flex flex-col gap-3 border border-gray-100" 
                whileHover={{
                    boxShadow: "0 4px 25px rgba(0,0,0,0.04)",
                    transition: { duration: 0.3 }
                }}
            >
                <motion.p 
                    className="text-xs md:text-xs lg:text-sm font-semibold text-gray-800" 
                    initial={{ opacity: 0, y: -10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                >
                    Stay Inspired
                </motion.p>
                <motion.p 
                    className="text-[10px] md:text-[10px] lg:text-[11px] leading-relaxed text-gray-500" 
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                >
                    Get weekly wellness tips, mudra practices, and exclusive content.
                </motion.p>
                <motion.input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs lg:text-sm outline-none bg-white focus:ring-2 focus:ring-primary/20 transition text-gray-800 placeholder-gray-400" 
                    whileFocus={{
                        scale: 1.02,
                        transition: { duration: 0.2 }
                    }}
                />
                <motion.button 
                    className="w-full text-white text-xs lg:text-sm font-semibold py-2 rounded-lg transition-colors cursor-pointer" 
                    style={{
                        backgroundColor: textColor,
                    }}
                    whileHover={{
                        scale: 1.02,
                        opacity: 0.9,
                        boxShadow: `0 4px 15px ${textColor}30`,
                        transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                >
                    Subscribe
                </motion.button>
                <p className="text-[9px] md:text-[9px] lg:text-[10px] text-center text-gray-400">No spam. Unsubscribe anytime.</p>
            </motion.div>

        </motion.aside>
    );
}

export default function MudraDetailPage({ blog }) {
    const { dark, textColor } = useTheme();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { 
        once: true, 
        amount: 0.05,
        margin: "-50px"
    });

    const [email, setEmail] = useState("");
    const [relatedBlogs, setRelatedBlogs] = useState([]);

    // Fetch related blogs dynamically
    useEffect(() => {
        async function loadRelated() {
            try {
                const response = await blogService.getAllBlogs();
                let list = [];
                if (response && response.success && Array.isArray(response.data)) {
                    list = response.data;
                } else if (response && Array.isArray(response.data)) {
                    list = response.data;
                } else if (Array.isArray(response)) {
                    list = response;
                }
                // Exclude current blog
                const filtered = list.filter(b => (b.documentId || b.id) !== (blog?.documentId || blog?.id));
                setRelatedBlogs(filtered.slice(0, 3));
            } catch (err) {
                console.warn("Failed to load related blogs for sidebar:", err);
            }
        }
        loadRelated();
    }, [blog?.documentId, blog?.id]);

    // Dynamically assign fields
    const name = blog?.Title || blog?.title || MUDRA.name;
    const intro = blog?.Intro || blog?.intro || blog?.Description || blog?.desc || MUDRA.intro;
    const whatItIs = blog?.WhatItIs || blog?.whatItIs || MUDRA.whatItIs;
    const symbolism = blog?.Symbolism || blog?.symbolism || MUDRA.symbolism;
    const quote = blog?.Quote || blog?.quote || MUDRA.quote;
    const tip = blog?.Tip || blog?.tip || MUDRA.tip;
    const tipSub = blog?.TipSub || blog?.tipSub || MUDRA.tipSub;
    const conclusion = blog?.Conclusion || blog?.conclusion || MUDRA.conclusion;

    // Author details
    const authorName = blog?.AuthorName || blog?.authorName || AUTHOR.name;
    const authorBio = blog?.AuthorBio || blog?.authorBio || AUTHOR.bio;
    
    // Resolve Author Avatar
    const authorAvatarUrl = blog?.AuthorAvatar?.url || blog?.authorAvatar?.url;
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
    const resolvedAvatarImg = authorAvatarUrl
      ? (authorAvatarUrl.startsWith("http") ? authorAvatarUrl : `${IMAGE_BASE_URL}${authorAvatarUrl}`)
      : AUTHOR.avatar;

    // Animation variants for main content
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.6, ease: "easeOut" } 
        }
    };

    const slideInLeft = {
        hidden: { opacity: 0, x: -30 },
        visible: { 
            opacity: 1, 
            x: 0, 
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
        }
    };

    // Character animation for headings
    const charVariants = {
        hidden: { opacity: 0, y: 15 },
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

    // Word animation for paragraphs
    const wordVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.03,
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    };

    // Split text for sections
    const introWords = intro.split(" ");
    const whatItIsWords = whatItIs.split(" ");
    const symbolismWords = symbolism.split(" ");
    const conclusionWords = conclusion.split(" ");

    return (
        <motion.div 
            ref={sectionRef}
            className={`${spacing.sectionPaddingX} py-6 sm:py-8 lg:py-10 w-full`} 
            style={{
                backgroundColor: dark ? "#111827" : "#ffffff",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className="max-w-[1400px] lg:max-w-[1600px] xl:max-w-[1800px] 2xl:max-w-[1600px] mx-auto">
                <div className="flex flex-col md:flex-row gap-8 md:gap-25 lg:gap-50 xl:gap-28 2xl:gap-80 items-start">

                    {/* ── LEFT: Main Content ─────────────────────────── */}
                    <motion.article 
                        className="flex-1 min-w-0 flex flex-col gap-5 md:gap-6 lg:gap-8"
                        variants={slideInLeft}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        {/* Intro - Word by word */}
                        <motion.p 
                            className="text-[11px] md:text-xs lg:text-sm xl:text-base leading-relaxed" 
                            style={{ color: dark ? "#9ca3af" : "#4b5563" }}
                        >
                            {introWords.map((word, i) => (
                                <motion.span
                                    key={i}
                                    custom={i}
                                    variants={wordVariants}
                                    initial="hidden"
                                    animate={isInView ? "visible" : "hidden"}
                                    style={{ display: "inline-block", marginRight: "0.25em" }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </motion.p>

                        {/* What is */}
                        <section className="flex flex-col gap-2 md:gap-2.5 lg:gap-3">
                            <motion.h2 
                                className="text-sm md:text-sm lg:text-xl xl:text-2xl font-bold" 
                                style={{ color: dark ? "#ffffff" : "#111827" }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                            >
                                What is {name}?
                            </motion.h2>
                            <motion.p 
                                className="text-[11px] md:text-xs lg:text-sm xl:text-base leading-relaxed" 
                                style={{ color: dark ? "#9ca3af" : "#4b5563" }}
                            >
                                {whatItIsWords.map((word, i) => (
                                    <motion.span
                                        key={i}
                                        custom={i}
                                        variants={wordVariants}
                                        initial="hidden"
                                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                        style={{ display: "inline-block", marginRight: "0.25em" }}
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </motion.p>
                            <motion.p 
                                className="text-[11px] md:text-xs lg:text-sm xl:text-base leading-relaxed" 
                                style={{ color: dark ? "#9ca3af" : "#4b5563" }}
                            >
                                {symbolismWords.map((word, i) => (
                                    <motion.span
                                        key={i}
                                        custom={i}
                                        variants={wordVariants}
                                        initial="hidden"
                                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                        style={{ display: "inline-block", marginRight: "0.25em" }}
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </motion.p>
                            {quote && (
                                <motion.blockquote 
                                    className="mt-1 rounded-xl px-3 py-2.5 md:px-4 md:py-3 flex items-start gap-2" 
                                    style={{
                                        backgroundColor: dark ? "var(--holistic-bg)" : "var(--holistic-bg)",
                                    }}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    whileHover={{
                                        scale: 1.02,
                                        transition: { duration: 0.2 }
                                    }}
                                >
                                    <span className="text-lg md:text-xl font-serif leading-none shrink-0 mt-0.5" style={{ color: textColor }}>"</span>
                                    <p className="text-[11px] md:text-xs lg:text-sm xl:text-base italic leading-relaxed" style={{ color: dark ? "#000000" : "#374151" }}>
                                        {quote}
                                    </p>
                                    <span className="text-lg md:text-xl font-serif leading-none shrink-0 mt-0.5" style={{ color: textColor }}>"</span>
                                </motion.blockquote>
                            )}
                        </section>

                        {/* Benefits */}
                        <section className="flex flex-col gap-2 md:gap-2.5 lg:gap-3">
                            <motion.h2 
                                className="text-[14px] md:text-[16px] lg:text-[20px] font-bold" 
                                style={{ color: dark ? "#ffffff" : "#111827" }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                            >
                                Benefits of {name}
                            </motion.h2>
                            <motion.p 
                                className="text-[10px] md:text-[11px] lg:text-[12px] leading-relaxed" 
                                style={{ color: dark ? "#ffffff" : "#6b7280" }}
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ duration: 0.4, delay: 0.3 }}
                            >
                                Practicing {name} regularly can bring numerous physical, mental, and spiritual benefits.
                            </motion.p>
                            <div className="grid grid-cols-5 gap-0 mt-1">
                                {MUDRA.benefits.map((b, i) => (
                                    <BenefitCard key={i} index={i} {...b} dark={dark} />
                                ))}
                            </div>
                        </section>

                        {/* How to Practice */}
                        <section className="flex flex-col gap-2.5 md:gap-3 lg:gap-4">
                            <motion.h2 
                                className="text-sm md:text-sm lg:text-xl xl:text-2xl font-bold" 
                                style={{ color: dark ? "#ffffff" : "#111827" }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                transition={{ duration: 0.4, delay: 0.3 }}
                            >
                                How to Practice {name}
                            </motion.h2>
                            <ol className="flex flex-col gap-2 md:gap-2.5 lg:gap-3">
                                {MUDRA.steps.map((s, i) => (
                                    <StepItem key={i} index={i + 1} title={s.title} desc={s.desc} dark={dark} textColor={textColor} />
                                ))}
                            </ol>
                            {(tip || tipSub) && (
                                <motion.div 
                                    className="mt-1 rounded-xl px-3 py-2.5 md:px-4 md:py-3 flex items-start gap-2.5" 
                                    style={{
                                        backgroundColor: dark ? "var(--holistic-bg)" : "var(--holistic-bg)",
                                    }}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                    transition={{ duration: 0.4, delay: 0.4 }}
                                    whileHover={{
                                        scale: 1.02,
                                        transition: { duration: 0.2 }
                                    }}
                                >
                                    <motion.div 
                                        className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5" 
                                        style={{
                                            backgroundColor: dark ? "#ffffff" : "#ffffff",
                                        }}
                                        whileHover={{
                                            scale: 1.1,
                                            rotate: 5,
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        <Image src={MUDRA.tipIcon} alt="tip" width={16} height={16} className="w-3.5 h-3.5 object-contain"/>
                                    </motion.div>
                                    <div>
                                        <p className="text-[11px] md:text-[11px] lg:text-sm font-semibold" style={{ color: dark ? "#ffffff" : "#111827" }}>{tip}</p>
                                        <p className="text-[10px] md:text-[10px] lg:text-xs leading-relaxed mt-0.5" style={{ color: dark ? "#0c0c0c" : "#6b7280" }}>{tipSub}</p>
                                    </div>
                                </motion.div>
                            )}
                        </section>

                        {/* Conclusion */}
                        <section className="flex flex-col gap-2 md:gap-2.5 lg:gap-3">
                            <motion.h2 
                                className="text-sm md:text-sm lg:text-xl xl:text-2xl font-bold" 
                                style={{ color: dark ? "#ffffff" : "#111827" }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                transition={{ duration: 0.4, delay: 0.4 }}
                            >
                                Conclusion
                            </motion.h2>
                            <motion.p 
                                className="text-[11px] md:text-xs lg:text-sm xl:text-base leading-relaxed" 
                                style={{ color: dark ? "#ffffff" : "#4b5563" }}
                            >
                                {conclusionWords.map((word, i) => (
                                    <motion.span
                                        key={i}
                                        custom={i}
                                        variants={wordVariants}
                                        initial="hidden"
                                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                        style={{ display: "inline-block", marginRight: "0.25em" }}
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </motion.p>
                        </section>

                        {/* Share */}
                        <motion.div 
                            className="flex items-center gap-2 md:gap-3 pt-1 border-t" 
                            style={{
                                borderColor: dark ? "#374151" : "#f3f4f6",
                            }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                            transition={{ duration: 0.4, delay: 0.5 }}
                        >
                            <span className="text-[11px] md:text-xs lg:text-sm font-medium" style={{ color: dark ? "#ffffff" : "#6b7280" }}>Share this article:</span>
                            {SOCIALS.map((s) => (
                                <motion.button 
                                    key={s.label} 
                                    aria-label={s.label} 
                                    className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full transition-colors flex items-center justify-center cursor-pointer" 
                                    style={{
                                        backgroundColor: dark ? "#374151" : "#f3f4f6",
                                    }}
                                    whileHover={{
                                        scale: 1.1,
                                        backgroundColor: dark ? "#4b5563" : "var(--holistic-bg)",
                                        transition: { duration: 0.2 }
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Image src={s.icon} alt={s.label} width={12} height={12} className="w-3 h-3 md:w-3.5 md:h-3.5 object-contain" />
                                </motion.button>
                            ))}
                        </motion.div>

                    </motion.article>

                    {/* ── RIGHT: Sidebar ─────────────────────────────── */}
                    <div className="w-full md:w-[190px] lg:w-[240px] xl:w-[280px] 2xl:w-[300px] shrink-0 md:sticky md:top-6">
                        <Sidebar 
                            email={email} 
                            setEmail={setEmail} 
                            dark={dark} 
                            textColor={textColor} 
                            authorName={authorName}
                            authorBio={authorBio}
                            authorAvatar={resolvedAvatarImg}
                            relatedBlogs={relatedBlogs}
                        />
                    </div>

                </div>
            </div>
        </motion.div>
    );
}