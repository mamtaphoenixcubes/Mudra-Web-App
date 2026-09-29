"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, User, Calendar, Play, Bookmark } from "lucide-react";
import { IMAGES } from "../../assets/assets";
import { spacing, typography, heroImage } from "../../theme";
import { useTheme } from "../../context/ThemeContext";

export default function BlogDetailHero({
    blog,
    category: defaultCategory = "Blog",
    title: defaultTitle = "The Power of Gyan Mudra: Benefits, Practice & Meaning",
    tags: defaultTags = ["MUDRAS"],
    description: defaultDescription = "Discover how Gyan Mudra can enhance concentration, sharpen memory, and bring clarity of thought. Learn how this simple hand gesture can transform your mind and daily life.",
    duration: defaultDuration = "30 min",
    level: defaultLevel = "Beginner Friendly",
    audioGuided: defaultAudioGuided = true,
}) {
    const { dark, textColor } = useTheme();

    const title = blog?.Title || blog?.title || defaultTitle;
    const category = blog?.TypeOfBlog || blog?.category || defaultCategory;
    const tags = blog?.TypeOfBlog ? [blog.TypeOfBlog.toUpperCase()] : (blog?.tags || defaultTags);
    const description = blog?.Description || blog?.desc || blog?.Intro || blog?.intro || defaultDescription;
    const duration = blog?.ReadTime || blog?.readTime || defaultDuration;
    const level = blog?.Level || blog?.level || defaultLevel;
    const audioGuided = blog?.AudioGuided !== undefined ? blog.AudioGuided : defaultAudioGuided;

    const thumbUrl = blog?.Thumbnail?.url || blog?.thumbnail?.url;
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
    const resolvedImgUrl = thumbUrl
      ? (thumbUrl.startsWith("http") ? thumbUrl : `${IMAGE_BASE_URL}${thumbUrl}`)
      : IMAGES.BlogDetail;

    const formatDate = (dateStr) => {
      if (!dateStr) return "May 20, 2025";
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
    const formattedDate = formatDate(blog?.PublishDate) || "May 20, 2025";
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, {
        once: true,
        amount: 0.2,
        margin: "-50px"
    });

    // Animation variants
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const fadeInLeft = {
        hidden: { opacity: 0, x: -40 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const fadeInRight = {
        hidden: { opacity: 0, x: 40 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
        }
    };

    // Character animation for heading
    const charVariants = {
        hidden: { opacity: 0, y: 20, rotateX: -10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                delay: i * 0.02,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    };

    // Word animation for description
    const wordVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.04,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    };

    // Breadcrumb animation
    const breadcrumbVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1,
            },
        },
    };

    // Tag animation
    const tagVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2,
            },
        },
    };

    // Metadata items animation
    const metaVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.08 + 0.3,
                duration: 0.4,
                ease: "easeOut",
            },
        }),
    };

    const headingChars = title.split("");
    const descriptionWords = description.split(" ");

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
            <motion.div
                className={`${spacing.container} grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-center`}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {/* ── LEFT: Text content ── */}
                <motion.div
                    className="flex flex-col items-start order-1 md:order-1"
                    variants={fadeInLeft}
                >
                    {/* Breadcrumb */}
                    <motion.nav
                        className="flex items-center gap-2 text-xs md:text-[10px] lg:text-sm mb-4"
                        style={{ color: dark ? "#9ca3af" : "#6b7280" }}
                        variants={breadcrumbVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        <motion.div whileHover={{ x: 2, transition: { duration: 0.2 } }}>
                            <Link href="/Home" className="hover:text-primary transition-colors cursor-pointer" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
                                Home
                            </Link>
                        </motion.div>
                        <span>›</span>
                        <motion.div whileHover={{ x: 2, transition: { duration: 0.2 } }}>
                            <Link href="/BlogLearning" className="hover:text-primary transition-colors" style={{ color: dark ? "#c5c7ca" : "#6b7280" }}>
                                Blog
                            </Link>
                        </motion.div>
                        <span>›</span>
                        <motion.span
                            style={{ color: dark ? "#e5e7eb" : "#374151" }}
                            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                        >
                            {title}
                        </motion.span>
                    </motion.nav>

                    {/* Tag pill */}
                    <motion.div
                        className="text-xs md:text-[10px] lg:text-sm font-medium rounded-full px-4 py-1.5 mb-5"
                        style={{
                            backgroundColor: dark ? textColor + "20" : textColor + "20",
                            color: textColor,
                        }}
                        variants={tagVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.2 }
                        }}
                    >
                        {tags.join(" • ")}
                    </motion.div>

                    {/* Heading - Character by character */}
                    <motion.h1
                        className={`${typography.MainHeading} mb-3`}
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
                    </motion.h1>

                    {/* Description - Word by word */}
                    <motion.p
                        className="text-xs md:text-[10px] lg:text-base leading-relaxed mb-6 max-w-xl"
                        style={{ color: dark ? "#ffffff" : "#4b5563" }}
                    >
                        {descriptionWords.map((word, i) => (
                            <motion.span
                                key={i}
                                custom={i}
                                variants={wordVariants}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                style={{ display: "inline-block", marginRight: "0.25em" }}
                                transition={{ delay: i * 0.04 + 0.2 }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </motion.p>

                    {/* Metadata row */}
                    <div className="flex items-center gap-5 text-xs md:text-[10px] lg:text-sm mb-8" style={{ color: dark ? "#ffffff" : "#6b7280" }}>
                        {[
                            { icon: User, label: `By ${blog?.AuthorName || blog?.authorName || "Mudras Team"}` },
                            { icon: Calendar, label: formattedDate },
                            { icon: Clock, label: duration },
                        ].map((item, i) => (
                            <motion.span
                                key={i}
                                className="flex items-center gap-1.5"
                                custom={i}
                                variants={metaVariants}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <item.icon size={16} style={{ color: dark ? "#ffffff" : "#9ca3af" }} />
                                {item.label}
                            </motion.span>
                        ))}
                    </div>

                </motion.div>

                {/* ── RIGHT: Cover image ── */}
                <motion.div
                    className="flex justify-center md:justify-end items-center w-full order-2 md:order-2"
                    variants={fadeInRight}
                >
                     <div className="flex justify-center md:justify-end items-center w-full relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
                    {resolvedImgUrl ? (
                        <Image
                            src={resolvedImgUrl}
                            alt={title}
                            fill
                            className="w-full h-full object-cover"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-400 text-sm">App Preview</span>
                        </div>
                    )}
                </div>
                </motion.div>

            </motion.div>
        </motion.section>
    );
}