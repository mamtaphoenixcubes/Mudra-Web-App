"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { typography, spacing, btn } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";
import { blogService } from "../../services/apiService";
import SiteContainer from "../../common/SiteContainer";
import Card from "../../common/Card";

const getImgBaseUrl = () => {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname && hostname !== "localhost" && hostname !== "127.0.0.1") {
      return `http://${hostname}:1337`;
    }
  }
  return "http://192.168.1.3:1337";
};

const IMAGE_BASE_URL = getImgBaseUrl();

// ── Tabs config ────────────────────────────────────────────────
const TABS = [
  { label: "All Articles",         value: "All Articles",         iconBg: "#FEF3C7", iconColor: "#B45309", imgKey: "AllArticles"      },
  { label: "Mudras",               value: "Mudras",               iconBg: "#F3E8FF", iconColor: "#7C3AED", imgKey: "IconMudras"       },
  { label: "Yoga Nidra",           value: "Yoga Nidra",           iconBg: "#DBEAFE", iconColor: "#1D4ED8", imgKey: "IconYogaNidra"    },
  { label: "Elements",             value: "Elements",             iconBg: "#FCE7F3", iconColor: "#BE185D", imgKey: "IconElements"     },
  { label: "Well-being",           value: "Well-being",           iconBg: "#DCFCE7", iconColor: "#16A34A", imgKey: "EmotionalBalance" },
  { label: "History & Philosophy", value: "History & Philosophy", iconBg: "#E0E7FF", iconColor: "#4338CA", imgKey: "IconHistory"      },
  { label: "Practice & Guides",    value: "Practice & Guides",    iconBg: "#FEF3C7", iconColor: "#D97706", imgKey: "IconPractice"     },
];

// ── Tab icon circle ────────────────────────────────────────────
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
      style={{ backgroundColor: tab.iconBg }}
      variants={iconVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ scale: 1.15, rotate: 8, transition: { duration: 0.2 } }}
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

// ── Article Card (compact, uses common <Card>) ─────────────────
function ArticleCard({ article, dark, textColor, index }) {
  const thumbUrl = article.Thumbnail?.url || article.thumbnail?.url;
  const resolvedImgUrl = thumbUrl
    ? thumbUrl.startsWith("http")
      ? thumbUrl
      : `${IMAGE_BASE_URL}${thumbUrl}`
    : IMAGES[article.imgKey];

  const titleText = article.Title || article.title || "";
  const descriptionText =
    article.Description ||
    article.desc ||
    article.Intro ||
    article.intro ||
    "";
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
    hidden: { opacity: 0, y: 30, scale: 0.9 },
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

  // Resolve Tailwind bg-class → hex for Card sx
  // (Card uses MUI sx, so we can't pass Tailwind class strings directly)
  const bgHexMap = {
    "bg-benefit-1": "#FEF9C3",
    "bg-benefit-2": "#F3E8FF",
    "bg-benefit-3": "#BFDDF2",
    "bg-benefit-4": "#FCE7F3",
    "bg-benefit-5": "#DCFCE7",
    "bg-problem-3": "#BFDDF2",
  };
  const cardBg = bgHexMap[bgClass] || "#FEF9C3";

  return (
    <Link href={`/BlogDetailPage?id=${article.documentId || article.id}`}>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        whileHover={{
          y: -6,
          boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
          transition: { duration: 0.2 },
        }}
        style={{ height: "100%" }}
      >
        <Card
          sx={{
            backgroundColor: cardBg,
            borderRadius: "16px",
            // ── Compact card padding (matches SuggestedMudras) ──
            p: { xs: "12px", sm: "14px", md: "16px", lg: "20px" },
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            textAlign: "left",
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          {/* ── Thumbnail (compact aspect) ── */}
          <motion.div
            className="w-full aspect-[4/3] overflow-hidden rounded-xl mb-2 shrink-0 relative"
            style={{
              backgroundColor: dark ? "#1f2937" : "rgba(255,255,255,0.4)",
            }}
            whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
          >
            {resolvedImgUrl ? (
              <Image
                src={resolvedImgUrl}
                alt={titleText}
                fill
                className="object-cover"
                style={{ objectPosition: "center" }}
              />
            ) : (
              <div
                className="w-full h-full"
                style={{
                  backgroundColor: dark
                    ? "#374151"
                    : "rgba(255,255,255,0.3)",
                }}
              />
            )}
          </motion.div>

          {/* ── Title (compact) ── */}
          <motion.h3
            className="font-bold text-xs sm:text-sm leading-tight mb-1 line-clamp-2"
            style={{ color: textColor }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            {titleText}
          </motion.h3>

          {/* ── Description (compact) ── */}
          <p
            className="text-[10px] sm:text-[11px] leading-snug mb-2 flex-1 line-clamp-3"
            style={{ color: dark ? "#000000" : "#4b5563" }}
          >
            {descriptionText}
          </p>

          {/* ── Date + read time (compact) ── */}
          <div
            className="flex items-center gap-1.5 text-[9px] lg:text-[10px] mt-auto"
            style={{ color: dark ? "#6b7280" : "#9ca3af" }}
          >
            <span>{dateText}</span>
            <span>•</span>
            <span>{readTimeText}</span>
          </div>
        </Card>
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
    margin: "-50px 0px",
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

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.2 },
    },
  };

  const tabBarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

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
      className="w-full"
      style={{ backgroundColor: dark ? "#111827" : "#ffffff" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <SiteContainer>
        {/* ── Tab bar ── */}
        <motion.div
          className="border rounded-2xl px-4 py-3 mb-8 overflow-x-auto"
          style={{ borderColor: dark ? "#f0f0f0" : "#e5e7eb" }}
          variants={tabBarVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Mobile */}
          <div className="flex md:hidden items-center min-w-max">
            {TABS.map((tab, i) => (
              <div key={tab.value} className="flex items-center">
                <motion.button
                  onClick={() => setActiveTab(tab.value)}
                  className="flex items-center gap-1.5 px-2 py-1 cursor-pointer group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <TabIconCircle
                    tab={tab}
                    size="w-8 h-8"
                    imgSize={20}
                    dark={dark}
                    textColor={textColor}
                    index={i}
                  />
                  <motion.span
                    className={`text-xs font-medium whitespace-nowrap transition-colors ${
                      activeTab === tab.value ? "border-b-2 pb-0.5" : ""
                    }`}
                    style={{
                      color:
                        activeTab === tab.value
                          ? textColor
                          : dark
                          ? "#ffffff"
                          : "#00000066",
                      borderColor:
                        activeTab === tab.value ? textColor : "transparent",
                    }}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 },
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
                    animate={
                      isInView
                        ? { opacity: 1, scaleY: 1 }
                        : { opacity: 0, scaleY: 0 }
                    }
                    transition={{ delay: i * 0.05 + 0.2 }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center justify-between w-full">
            {TABS.map((tab, i) => (
              <div key={tab.value} className="flex items-center flex-1">
                <motion.button
                  onClick={() => setActiveTab(tab.value)}
                  className="flex items-center gap-2.5 px-2 py-1.5 w-full cursor-pointer group"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <TabIconCircle
                    tab={tab}
                    size="w-12 h-12"
                    imgSize={28}
                    dark={dark}
                    textColor={textColor}
                    index={i}
                  />
                  <motion.span
                    className={`text-sm font-medium leading-tight transition-colors ${
                      activeTab === tab.value ? "border-b-2 pb-0.5" : ""
                    }`}
                    style={{
                      color:
                        activeTab === tab.value
                          ? textColor
                          : dark
                          ? "#ffffff"
                          : "#00000066",
                      borderColor:
                        activeTab === tab.value ? textColor : "transparent",
                    }}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 },
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
                    animate={
                      isInView
                        ? { opacity: 1, scaleY: 1 }
                        : { opacity: 0, scaleY: 0 }
                    }
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
          <motion.h1
            className="font-semibold text-2xl md:text-5xl mb-1"
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
          <motion.p
            className={`${typography.sectionMbBody}`}
            style={{ color: dark ? "#ffffff" : "#0F0F0FCC" }}
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
            style={{ color: dark ? "#6b7280" : "#0F0F0FCC" }}
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
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-5"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {filtered.map((a, index) => (
              <ArticleCard
                key={a.id}
                article={a}
                dark={dark}
                textColor={textColor}
                index={index}
              />
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
            style={{ backgroundColor: textColor }}
            whileHover={{
              scale: 1.05,
              opacity: 0.85,
              boxShadow: `0 8px 30px ${textColor}40`,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            Load More Articles
          </motion.button>
        </motion.div>
      </SiteContainer>
    </motion.section>
  );
}