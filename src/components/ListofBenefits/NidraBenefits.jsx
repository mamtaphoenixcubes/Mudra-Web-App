"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { typography, spacing } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";
import { asanaService, meditationService, mudraService, pranayamService, yogaNidraService } from "../../services/apiService";

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://192.168.1.14:1331";

const MUDRAS = [
  { id: 1, name: "Gyan Mudra", elements: "Mind • Space", desc: "Enhances focus, memory and inner peace.", bg: "bg-benefit-1", imgKey: "gyanMudra", category: "Mind", benefit: "Focus", element: "Space" },
  { id: 2, name: "Prana Mudra", elements: "Energy • Earth", desc: "Boosts vitality and strengthens the body.", bg: "bg-benefit-2", imgKey: "pranaMudra", category: "Energy", benefit: "Vitality", element: "Earth" },
  { id: 3, name: "Apan Mudra", elements: "Detox • Earth", desc: "Supports elimination and cleanses the body.", bg: "bg-benefit-3", imgKey: "apanMudra", category: "Detox", benefit: "Cleansing", element: "Earth" },
  { id: 4, name: "Vayu Mudra", elements: "Air • Air", desc: "Helps relieve gas, bloating and air-related discomfort.", bg: "bg-benefit-4", imgKey: "vayuMudra", category: "Healing", benefit: "Digestion", element: "Air" },
  { id: 5, name: "Surya Mudra", elements: "Fire • Fire", desc: "Increases inner heat and boosts metabolism.", bg: "bg-benefit-5", imgKey: "suryaMudra", category: "Energy", benefit: "Metabolism", element: "Fire" },
  { id: 6, name: "Chin Mudra", elements: "Mind • Space", desc: "Promotes calm, clarity and meditation.", bg: "bg-benefit-1", imgKey: "chinMudra", category: "Mind", benefit: "Calm", element: "Space" },
  { id: 7, name: "Shunya Mudra", elements: "Hearing • Space", desc: "Helps with ear problems and improves balance.", bg: "bg-benefit-2", imgKey: "DhyanaMudra", category: "Healing", benefit: "Hearing", element: "Space" },
  { id: 8, name: "Varun Mudra", elements: "Water • Water", desc: "Improves skin health and fluid balance.", bg: "bg-benefit-3", imgKey: "varunMudra", category: "Healing", benefit: "Skin", element: "Water" },
  { id: 9, name: "Hridaya Mudra", elements: "Heart • Air", desc: "Opens the heart and promotes compassion.", bg: "bg-benefit-4", imgKey: "hridayaMudra", category: "Emotional", benefit: "Heart", element: "Air" },
  { id: 10, name: "Linga Mudra", elements: "Warmth • Fire", desc: "Generates heat and supports immunity.", bg: "bg-benefit-5", imgKey: "lingaMudra", category: "Healing", benefit: "Immunity", element: "Fire" },
];

const CARD_COLORS = ["bg-benefit-1", "bg-benefit-2", "bg-benefit-3", "bg-benefit-4", "bg-benefit-5"];
const SORT_OPTIONS = ["Sort By", "A–Z", "Z–A"];

const normalizeImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.includes("/uploads/")) {
    return `${IMAGE_BASE_URL}${url.substring(url.indexOf("/uploads/"))}`;
  }
  if (url.startsWith("/")) {
    return `${IMAGE_BASE_URL}${url}`;
  }
  return `${IMAGE_BASE_URL}/${url}`;
};

const getMudraCardData = (item, index) => {
  const firstCategory = Array.isArray(item.categories) ? item.categories[0] : null;
  const categoryName = firstCategory?.Name || item.category || "Healing";
  const elementName = item.element || "Earth";
  const benefits = Array.isArray(item.web?.Benefits)
    ? item.web.Benefits.map((benefit) => benefit.title).filter(Boolean)
    : [];

  const imageUrl =
    item.web?.IntroCardWeb?.IntrocardImage?.url ||
    item.thumbnail?.url ||
    item.image?.url ||
    (Array.isArray(item.image) ? item.image[0]?.url : null) ||
    item.icon?.url ||
    item.web?.thumbnail?.url ||
    "";

  return {
    id: item.documentId || item.id,
    name: item.name || "Mudra",
    elements: `${categoryName} • ${elementName}`,
    desc:
      item.web?.IntroCardWeb?.Description ||
      item.description ||
      item.shortDescription ||
      "A grounding mudra practice for balance and well-being.",
    bg: CARD_COLORS[index % CARD_COLORS.length],
    imgKey: item.imgKey || null,
    category: categoryName,
    benefit: benefits[0] || item.benefit || "General",
    benefits,
    element: elementName,
    iconUrl: normalizeImageUrl(imageUrl),
  };
};

const normalizeNidraImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.includes("/uploads/")) {
    return `${IMAGE_BASE_URL}${url.substring(url.indexOf("/uploads/"))}`;
  }
  if (url.startsWith("/")) {
    return `${IMAGE_BASE_URL}${url}`;
  }
  return `${IMAGE_BASE_URL}/${url}`;
};

const getNidraCardData = (item, index) => {
  const intro = item.NidraIntroCard || {};
  const categoryName =
    item.NidraCategories?.[0]?.Name ||
    intro.Category?.Name ||
    item.Category?.Name ||
    "Stress & Anxiety";
  const elementName = item.Elements || "Earth";
  const categoryTags = Array.isArray(item.NidraCategories)
    ? item.NidraCategories.map((entry) => entry.Name || entry.name).filter(Boolean)
    : [];
  const benefitTags = Array.isArray(item.YogaNidraBenefits)
    ? item.YogaNidraBenefits.map((entry) => entry.Name || entry.name).filter(Boolean)
    : [];
  const intentions = Array.isArray(item.Intentions)
    ? item.Intentions.map((entry) => entry.name || entry.Name).filter(Boolean)
    : [];
  const imageUrl =
    intro.ThumbnailImage?.[0]?.formats?.thumbnail?.url ||
    intro.ThumbnailImage?.[0]?.url ||
    item.ThumbnailImage?.[0]?.url ||
    item.thumbnail?.url ||
    "";

  const searchableBenefits = [...categoryTags, ...benefitTags, ...intentions];

  return {
    id: item.documentId || item.id,
    name: item.Name || intro.Name || "Yoga Nidra",
    elements: `${categoryName} • ${elementName}`,
    desc:
      intro.ShortDescription ||
      item.ShortDescription ||
      "A guided practice for deep restorative awareness.",
    bg: CARD_COLORS[index % CARD_COLORS.length],
    imgKey: null,
    category: categoryName,
    benefit: searchableBenefits[0] || item.BackgroundMusic || "Awareness",
    benefits: searchableBenefits.length ? searchableBenefits : [item.BackgroundMusic || "Awareness"],
    element: elementName,
    iconUrl: normalizeNidraImageUrl(imageUrl),
  };
};

const getAsanaCardData = (item, index) => {
  const categoryName = item.categories?.[0]?.Name || item.category || "Wellbeing";
  const elementName = item.element || "Earth";
  const categoryTags = Array.isArray(item.categories)
    ? item.categories.map((entry) => entry.Name || entry.name).filter(Boolean)
    : [];
  const intentionTags = Array.isArray(item.intentions)
    ? item.intentions.map((entry) => entry.name || entry.Name).filter(Boolean)
    : [];
  const therapeuticTags = Array.isArray(item.therapeuticNotes)
    ? item.therapeuticNotes.filter((entry) => typeof entry === "string" && entry.trim())
    : [];
  const imageUrl =
    item.introCard?.introCardImage?.url ||
    item.thumbnail?.url ||
    item.bannerImage?.url ||
    item.image?.[0]?.url ||
    "";
  const searchableBenefits = [...categoryTags, ...intentionTags, ...therapeuticTags];

  return {
    id: item.documentId || item.id,
    name: item.name || "Asana",
    elements: `${categoryName} • ${elementName}`,
    desc:
      item.introCard?.introCardText ||
      item.description ||
      "A grounded, mindful movement practice for balance and wellbeing.",
    bg: CARD_COLORS[index % CARD_COLORS.length],
    imgKey: null,
    category: categoryName,
    benefit: searchableBenefits[0] || item.type || "Balance",
    benefits: searchableBenefits.length ? searchableBenefits : [item.type || "Balance"],
    element: elementName,
    iconUrl: normalizeImageUrl(imageUrl),
  };
};

const getMeditationCardData = (item, index) => {
  const categoryName = item.categories?.[0]?.Name || item.category || "Wellbeing";
  const elementName = item.element || "Earth";
  const categoryTags = Array.isArray(item.categories)
    ? item.categories.map((entry) => entry.Name || entry.name).filter(Boolean)
    : [];
  const intentionTags = Array.isArray(item.intentions)
    ? item.intentions.map((entry) => entry.name || entry.Name).filter(Boolean)
    : [];
  const therapeuticTags = Array.isArray(item.therapeuticNotes)
    ? item.therapeuticNotes.filter((entry) => typeof entry === "string" && entry.trim())
    : [];
  const imageUrl =
    item.introCard?.introCardImage?.url ||
    item.thumbnail?.url ||
    item.bannerImage?.url ||
    item.image?.[0]?.url ||
    "";
  const searchableBenefits = [...categoryTags, ...intentionTags, ...therapeuticTags];

  return {
    id: item.documentId || item.id,
    name: item.name || "Meditation",
    elements: `${categoryName} • ${elementName}`,
    desc:
      item.introCard?.introCardText ||
      item.description ||
      "A gentle, restorative practice for inner calm and awareness.",
    bg: CARD_COLORS[index % CARD_COLORS.length],
    imgKey: null,
    category: categoryName,
    benefit: searchableBenefits[0] || item.type || "Calm",
    benefits: searchableBenefits.length ? searchableBenefits : [item.type || "Calm"],
    element: elementName,
    iconUrl: normalizeImageUrl(imageUrl),
  };
};

const getPranayamCardData = (item, index) => {
  const categoryName = item.categories?.[0]?.Name || item.category || "Breathwork";
  const elementName = item.element || "Air";
  const categoryTags = Array.isArray(item.categories)
    ? item.categories.map((entry) => entry.Name || entry.name).filter(Boolean)
    : [];
  const intentionTags = Array.isArray(item.intentions)
    ? item.intentions.map((entry) => entry.name || entry.Name).filter(Boolean)
    : [];
  const therapeuticTags = Array.isArray(item.therapeuticNotes)
    ? item.therapeuticNotes.filter((entry) => typeof entry === "string" && entry.trim())
    : [];
  const imageUrl =
    item.introCard?.introCardImage?.url ||
    item.thumbnail?.url ||
    item.bannerImage?.url ||
    item.image?.[0]?.url ||
    "";
  const searchableBenefits = [...categoryTags, ...intentionTags, ...therapeuticTags];

  return {
    id: item.documentId || item.id,
    name: item.name || "Pranayam",
    elements: `${categoryName} • ${elementName}`,
    desc:
      item.introCard?.introCardText ||
      item.description ||
      "A conscious breath practice to support focus, steadiness, and emotional balance.",
    bg: CARD_COLORS[index % CARD_COLORS.length],
    imgKey: null,
    category: categoryName,
    benefit: searchableBenefits[0] || item.type || "Breath Awareness",
    benefits: searchableBenefits.length ? searchableBenefits : [item.type || "Breath Awareness"],
    element: elementName,
    iconUrl: normalizeImageUrl(imageUrl),
  };
};

const ChevronDown = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 7.5l5 5 5-5" />
  </svg>
);

const ArrowRight = () => (
  <svg className="w-3 h-3 ml-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

function FilterSelect({ options, value, onChange, className = "", dark }) {
  return (
    <div className={`relative ${className}`}>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
        className="appearance-none w-full border rounded-lg text-[11px] sm:text-xs md:text-sm font-medium pl-3 pr-7 py-2 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer" 
        style={{ 
          backgroundColor: dark ? "#1f2937" : "#ffffff", 
          borderColor: dark ? "#374151" : "#e5e7eb", 
          color: dark ? "#e5e7eb" : "#374151" 
        }}
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" style={{ color: dark ? "#ffffff" : "#9ca3af" }}>
        <ChevronDown className="w-3.5 h-3.5" />
      </div>
    </div>
  );
}

function MudraCard({ mudra, dark, textColor, index }) {
  const router = useRouter();
  const mudraImage = mudra.iconUrl || IMAGES[mudra.imgKey] || null;

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { 
        duration: 0.5, 
        delay: index * 0.06, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    },
  };

  const handleLearnMore = () => {
    router.push(`/BenefitsDetail?type=mudra&id=${mudra.id}&name=${encodeURIComponent(mudra.name)}`);
  };

  return (
    <motion.div 
      className={`${mudra.bg} rounded-2xl p-3 sm:p-4 lg:p-5 flex flex-col items-center text-center transition-transform duration-200 hover:scale-[1.02] hover:shadow-md`} 
      variants={cardVariants} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, amount: 0.1 }} 
      whileHover={{ 
        y: -6, 
        boxShadow: "0 8px 30px rgba(0,0,0,0.1)", 
        transition: { duration: 0.2 } 
      }}
    >
      <motion.div 
        className="w-16 h-16 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full shadow-sm mb-3 shrink-0 overflow-hidden flex items-center justify-center" 
        style={{ backgroundColor: "#ffffff" }} 
        whileHover={{ 
          scale: 1.12, 
          rotate: 5, 
          transition: { duration: 0.2 } 
        }}
      >
        {mudraImage ? (
          <Image 
            src={mudraImage} 
            alt={mudra.name} 
            width={80} 
            height={80} 
            className="w-full h-full object-cover rounded-full" 
          />
        ) : (
          <div className="w-full h-full rounded-full" style={{ backgroundColor: dark ? "#374151" : "#f3f4f6" }} />
        )}
      </motion.div>

      <motion.h3 
        className="text-[13px] sm:text-sm md:text-[13px] lg:text-sm xl:text-base font-semibold mb-0.5 leading-tight" 
        style={{ color: textColor }} 
        whileHover={{ 
          scale: 1.05, 
          transition: { duration: 0.2 } 
        }}
      >
        {mudra.name}
      </motion.h3>

      <p className="text-[10px] sm:text-[10px] md:text-[10px] lg:text-xs mb-2 leading-tight" style={{ color: dark ? "#000000" : "#6b7280" }}>
        {mudra.elements}
      </p>

      <p className="text-[10px] sm:text-[10px] md:text-[10px] lg:text-xs leading-relaxed mb-3 flex-1" style={{ color: dark ? "#000000" : "#4b5563" }}>
        {mudra.desc}
      </p>

      <motion.button 
        className="flex items-center gap-0.5 text-[10px] sm:text-xs md:text-[11px] lg:text-xs font-medium hover:underline mt-auto" 
        style={{ color: textColor }} 
        whileHover={{ 
          x: 5, 
          transition: { duration: 0.2 } 
        }}
        onClick={handleLearnMore}
      >
        Learn More <ArrowRight />
      </motion.button>
    </motion.div>
  );
}

function BenefitsSection({ heading, subheading, data = [], dark, textColor, isLoading = false }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.05, margin: "-50px" });

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [benefit, setBenefit] = useState("All Benefits");
  const [element, setElement] = useState("All Elements");
  const [sortBy, setSortBy] = useState("Sort By");

  const categoryOptions = ["All Categories", ...new Set(data.map((m) => m.category).filter(Boolean))];
  const benefitOptions = [
    "All Benefits",
    ...new Set(
      data
        .flatMap((m) => (Array.isArray(m.benefits) ? m.benefits : [m.benefit]).filter(Boolean))
        .filter(Boolean)
    ),
  ];
  const elementOptions = ["All Elements", ...new Set(data.map((m) => m.element).filter(Boolean))];

  const filtered = data
    .filter((m) => {
      const q = search.toLowerCase();
      if (q && !m.name.toLowerCase().includes(q) && !m.desc.toLowerCase().includes(q)) return false;
      if (category !== "All Categories" && m.category !== category) return false;
      if (benefit !== "All Benefits") {
        const matchesBenefit = Array.isArray(m.benefits)
          ? m.benefits.includes(benefit)
          : m.benefit === benefit;
        if (!matchesBenefit) return false;
      }
      if (element !== "All Elements" && m.element !== element) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "A–Z") return a.name.localeCompare(b.name);
      if (sortBy === "Z–A") return b.name.localeCompare(a.name);
      return 0;
    });

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.06, 
        delayChildren: 0.2 
      } 
    },
  };

  return (
    <motion.section 
      ref={sectionRef} 
      className={`${spacing.sectionPaddingX} py-8 md:py-10 lg:py-14`} 
      style={{ backgroundColor: dark ? "#111827" : "#ffffff" }} 
      initial={{ opacity: 0 }} 
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={spacing.container}>
        <motion.div 
          className="text-center mb-6 md:mb-8 lg:mb-10" 
          variants={fadeUp} 
          initial="hidden" 
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className={`${typography.fingerHeading} mb-2`} style={{ color: textColor }}>
            {heading}
          </h2>
          <p className={`${typography.benefitTitle} max-w-[800px] mx-auto`} style={{ color: dark ? "#ffffff" : "#6b7280" }}>
            {subheading}
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-2 sm:gap-3 mb-5 sm:mb-6">
          <div className="relative flex-1 min-w-[140px] sm:min-w-[180px] w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search practices..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-lg text-[11px] sm:text-xs md:text-sm pl-3 pr-8 py-2 md:py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/30"
              style={{
                backgroundColor: dark ? "#1f2937" : "#ffffff",
                borderColor: dark ? "#374151" : "#e5e7eb",
                color: dark ? "#e5e7eb" : "#374151",
              }}
            />
          </div>

          <FilterSelect 
            options={categoryOptions} 
            value={category} 
            onChange={setCategory} 
            className="w-full sm:w-[130px] md:w-[150px]" 
            dark={dark} 
          />
          <FilterSelect 
            options={benefitOptions} 
            value={benefit} 
            onChange={setBenefit} 
            className="w-full sm:w-[130px] md:w-[150px]" 
            dark={dark} 
          />
          <FilterSelect 
            options={elementOptions} 
            value={element} 
            onChange={setElement} 
            className="w-full sm:w-[130px] md:w-[150px]" 
            dark={dark} 
          />
          <FilterSelect 
            options={SORT_OPTIONS} 
            value={sortBy} 
            onChange={setSortBy} 
            className="w-full sm:w-[120px] md:w-[140px]" 
            dark={dark} 
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-4 xl:gap-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={`loader-${heading}-${index}`}
                className="rounded-2xl p-3 sm:p-4 lg:p-5 animate-pulse"
                style={{ backgroundColor: dark ? "#1f2937" : "#f3f4f6" }}
              >
                <div className="w-16 h-16 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full mx-auto mb-3" style={{ backgroundColor: dark ? "#374151" : "#e5e7eb" }} />
                <div className="h-3 rounded mb-2 mx-auto" style={{ backgroundColor: dark ? "#374151" : "#e5e7eb", width: "70%" }} />
                <div className="h-2.5 rounded mb-3 mx-auto" style={{ backgroundColor: dark ? "#374151" : "#e5e7eb", width: "55%" }} />
                <div className="h-2 rounded mb-2" style={{ backgroundColor: dark ? "#374151" : "#e5e7eb", width: "100%" }} />
                <div className="h-2 rounded mb-2" style={{ backgroundColor: dark ? "#374151" : "#e5e7eb", width: "85%" }} />
                <div className="h-2 rounded" style={{ backgroundColor: dark ? "#374151" : "#e5e7eb", width: "60%" }} />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div 
            className="text-center py-20 text-sm" 
            style={{ color: dark ? "#6b7280" : "#9ca3af" }} 
            initial={{ opacity: 0 }} 
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            No mudras match your filters.
          </motion.div>
        ) : (
          <>
            <motion.div 
              className="hidden md:grid md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-4 xl:gap-5" 
              variants={containerVariants} 
              initial="hidden" 
              animate={isInView ? "visible" : "hidden"}
            >
              {filtered.map((m, i) => (
                <MudraCard 
                  key={m.id} 
                  mudra={m} 
                  dark={dark} 
                  textColor={textColor} 
                  index={i} 
                />
              ))}
            </motion.div>
            <motion.div 
              className="md:hidden grid grid-cols-2 gap-3" 
              variants={containerVariants} 
              initial="hidden" 
              animate={isInView ? "visible" : "hidden"}
            >
              {filtered.map((m, i) => (
                <MudraCard 
                  key={m.id} 
                  mudra={m} 
                  dark={dark} 
                  textColor={textColor} 
                  index={i} 
                />
              ))}
            </motion.div>
          </>
        )}
      </div>
    </motion.section>
  );
}

const resolveActiveSection = (type = "", benefit = "") => {
  const typeValue = String(type || "").toLowerCase();
  const benefitValue = String(benefit || "").toLowerCase();
  const combined = `${typeValue} ${benefitValue}`;
  const normalizedType = typeValue.replace(/[^a-z]/g, "");

  const nidraKeywords = [
    "nidra",
    "sleep",
    "stress",
    "anxiety",
    "relax",
    "relaxation",
    "burnout",
    "fatigue",
    "mindfulness",
    "calm",
    "rest",
    "better",
  ];

  const mudraKeywords = [
    "mudra",
    "focus",
    "energy",
    "detox",
    "healing",
    "immunity",
    "mind",
    "heart",
    "skin",
    "vitality",
    "balance",
  ];

  const asanaKeywords = [
    "asana",
    "pose",
    "standing",
    "balance",
    "rooted",
    "movement",
    "posture",
  ];

  const meditationKeywords = [
    "meditation",
    "breath",
    "awareness",
    "mindfulness",
    "stillness",
    "relax",
    "calm",
    "focus",
  ];

  const pranayamKeywords = [
    "pranayam",
    "pranayama",
    "breathing",
    "breathwork",
    "alternate nostril",
    "breath awareness",
    "inhale",
    "exhale",
    "nasal",
  ];

  if (normalizedType === "mudra" || typeValue.includes("mudra")) {
    return "mudra";
  }

  if (normalizedType === "yoganidra" || normalizedType.includes("nidra") || typeValue.includes("nidra") || nidraKeywords.some((keyword) => combined.includes(keyword))) {
    return "nidra";
  }

  if (normalizedType === "asana" || typeValue.includes("asana") || asanaKeywords.some((keyword) => combined.includes(keyword))) {
    return "asana";
  }

  if (normalizedType === "meditation" || typeValue.includes("meditation") || meditationKeywords.some((keyword) => combined.includes(keyword))) {
    return "meditation";
  }

  if (normalizedType === "pranayam" || normalizedType === "pranayama" || typeValue.includes("pranayam") || typeValue.includes("pranayama") || pranayamKeywords.some((keyword) => combined.includes(keyword))) {
    return "pranayam";
  }

  if (mudraKeywords.some((keyword) => combined.includes(keyword))) {
    return "mudra";
  }

  return "both";
};

const filterItemsByBenefit = (items = [], benefitParam = "") => {
  if (!benefitParam) return items;

  const normalized = benefitParam.toLowerCase().replace(/[_\s]+/g, "-");
  const benefitWords = normalized.split("-").filter(Boolean);

  return items.filter((item) => {
    const nameValue = item.name || item.Name || "";
    const categoryValue =
      item.category ||
      item.Category?.Name ||
      item.categories?.[0]?.Name ||
      item.categories?.[0]?.name ||
      item.NidraCategories?.[0]?.Name ||
      "";
    const elementValue = item.element || item.Elements || "";
    const benefitValue = item.benefit || item.Benefit || "";

    const categoryTags = Array.isArray(item.categories)
      ? item.categories.map((entry) => entry.Name || entry.name)
      : Array.isArray(item.NidraCategories)
        ? item.NidraCategories.map((entry) => entry.Name || entry.name)
        : [];
    const benefitTags = Array.isArray(item.YogaNidraBenefits)
      ? item.YogaNidraBenefits.map((entry) => entry.Name || entry.name)
      : [];
    const intentTags = Array.isArray(item.Intentions)
      ? item.Intentions.map((entry) => entry.name || entry.Name)
      : Array.isArray(item.intentions)
        ? item.intentions.map((entry) => entry.name || entry.Name)
        : [];
    const therapeuticTags = Array.isArray(item.therapeuticNotes)
      ? item.therapeuticNotes.map((entry) => String(entry))
      : [];

    const searchable = [
      nameValue,
      categoryValue,
      elementValue,
      benefitValue,
      ...(Array.isArray(item.benefits) ? item.benefits : []),
      ...categoryTags,
      ...benefitTags,
      ...intentTags,
      ...therapeuticTags,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const slugged = searchable.replace(/[^a-z0-9]+/g, "-");
    const matchesSlug = benefitWords.every((word) => slugged.includes(word));
    const matchesText = benefitWords.some((word) => searchable.includes(word));

    return matchesSlug || matchesText;
  });
};

export default function NidraBenefits() {
  const { dark, textColor } = useTheme();
  const searchParams = useSearchParams();
  const benefitParam = searchParams.get("benefit") || "";
  const typeParam = searchParams.get("type") || "";
  const activeSection = resolveActiveSection(typeParam, benefitParam);

  const [mudras, setMudras] = useState([]);
  const [nidras, setNidras] = useState([]);
  const [asanas, setAsanas] = useState([]);
  const [meditations, setMeditations] = useState([]);
  const [pranayams, setPranayams] = useState([]);
  const [loadingMudras, setLoadingMudras] = useState(true);
  const [loadingNidras, setLoadingNidras] = useState(true);
  const [loadingAsanas, setLoadingAsanas] = useState(true);
  const [loadingMeditations, setLoadingMeditations] = useState(true);
  const [loadingPranayams, setLoadingPranayams] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchMudras = async () => {
      try {
        setLoadingMudras(true);
        const response = await mudraService.getAllMudras();
        let rawList = [];

        if (Array.isArray(response)) {
          rawList = response;
        } else if (response && Array.isArray(response.data)) {
          rawList = response.data;
        } else if (response && response.success && Array.isArray(response.data)) {
          rawList = response.data;
        } else if (response && response.success && response.data && Array.isArray(response.data.data)) {
          rawList = response.data.data;
        }

        if (isMounted) {
          const mapped = rawList.map((item, index) => getMudraCardData(item, index));
          setMudras(mapped.length ? mapped : []);
        }
      } catch (error) {
        console.warn("Unable to fetch mudras from API, using fallback data.", error);
        if (isMounted) setMudras([]);
      } finally {
        if (isMounted) setLoadingMudras(false);
      }
    };

    const fetchNidras = async () => {
      try {
        setLoadingNidras(true);
        const response = await yogaNidraService.getAllYogaNidras();
        let rawList = [];

        if (Array.isArray(response)) {
          rawList = response;
        } else if (response && Array.isArray(response.data)) {
          rawList = response.data;
        } else if (response && response.success && Array.isArray(response.data)) {
          rawList = response.data;
        } else if (response && response.success && response.data && Array.isArray(response.data.data)) {
          rawList = response.data.data;
        }

        if (isMounted) {
          const mapped = rawList.map((item, index) => getNidraCardData(item, index));
          setNidras(mapped.length ? mapped : []);
        }
      } catch (error) {
        console.warn("Unable to fetch yoga nidras from API.", error);
        if (isMounted) setNidras([]);
      } finally {
        if (isMounted) setLoadingNidras(false);
      }
    };

    const fetchAsanas = async () => {
      try {
        setLoadingAsanas(true);
        const response = await asanaService.getAllAsanas();
        let rawList = [];

        if (Array.isArray(response)) {
          rawList = response;
        } else if (response && Array.isArray(response.data)) {
          rawList = response.data;
        } else if (response && response.success && Array.isArray(response.data)) {
          rawList = response.data;
        } else if (response && response.data && Array.isArray(response.data.data)) {
          rawList = response.data.data;
        }

        if (isMounted) {
          const mapped = rawList.map((item, index) => getAsanaCardData(item, index));
          setAsanas(mapped.length ? mapped : []);
        }
      } catch (error) {
        console.warn("Unable to fetch asanas from API.", error);
        if (isMounted) setAsanas([]);
      } finally {
        if (isMounted) setLoadingAsanas(false);
      }
    };

    const fetchMeditations = async () => {
      try {
        setLoadingMeditations(true);
        const response = await meditationService.getAllMeditations();
        let rawList = [];

        if (Array.isArray(response)) {
          rawList = response;
        } else if (response && Array.isArray(response.data)) {
          rawList = response.data;
        } else if (response && response.data && Array.isArray(response.data.data)) {
          rawList = response.data.data;
        }

        if (isMounted) {
          const mapped = rawList.map((item, index) => getMeditationCardData(item, index));
          setMeditations(mapped.length ? mapped : []);
        }
      } catch (error) {
        console.warn("Unable to fetch meditations from API.", error);
        if (isMounted) setMeditations([]);
      } finally {
        if (isMounted) setLoadingMeditations(false);
      }
    };

    const fetchPranayams = async () => {
      try {
        setLoadingPranayams(true);
        const response = await pranayamService.getAllPranayams();
        let rawList = [];

        if (Array.isArray(response)) {
          rawList = response;
        } else if (response && Array.isArray(response.data)) {
          rawList = response.data;
        } else if (response && response.data && Array.isArray(response.data.data)) {
          rawList = response.data.data;
        }

        if (isMounted) {
          const mapped = rawList.map((item, index) => getPranayamCardData(item, index));
          setPranayams(mapped.length ? mapped : []);
        }
      } catch (error) {
        console.warn("Unable to fetch pranayams from API.", error);
        if (isMounted) setPranayams([]);
      } finally {
        if (isMounted) setLoadingPranayams(false);
      }
    };

    fetchMudras();
    fetchNidras();
    fetchAsanas();
    fetchMeditations();
    fetchPranayams();

    return () => {
      isMounted = false;
    };
  }, []);

  const visibleMudras = filterItemsByBenefit(mudras, benefitParam);
  const visibleNidras = filterItemsByBenefit(nidras, benefitParam);
  const visibleAsanas = filterItemsByBenefit(asanas, benefitParam);
  const visibleMeditations = filterItemsByBenefit(meditations, benefitParam);
  const visiblePranayams = filterItemsByBenefit(pranayams, benefitParam);

  return (
    <>
      {(activeSection === "mudra" || activeSection === "both") && (
        <BenefitsSection
          heading="Popular Mudras"
          subheading="Browse a selection of commonly used and effective mudras."
          data={visibleMudras}
          dark={dark}
          textColor={textColor}
          isLoading={loadingMudras}
        />
      )}

      {(activeSection === "nidra" || activeSection === "both") && (
        <BenefitsSection
          heading="Popular Nidra"
          subheading="Browse a selection of guided sessions for deep rest and clarity."
          data={visibleNidras}
          dark={dark}
          textColor={textColor}
          isLoading={loadingNidras}
        />
      )}

      {(activeSection === "asana" || activeSection === "both") && (
        <BenefitsSection
          heading="Popular Asanas"
          subheading="Explore asanas selected for balance, strength, and grounded movement."
          data={visibleAsanas}
          dark={dark}
          textColor={textColor}
          isLoading={loadingAsanas}
        />
      )}

      {(activeSection === "meditation" || activeSection === "both") && (
        <BenefitsSection
          heading="Popular Meditations"
          subheading="Find calming guided meditations for focus, breath awareness, and inner ease."
          data={visibleMeditations}
          dark={dark}
          textColor={textColor}
          isLoading={loadingMeditations}
        />
      )}

      {(activeSection === "pranayam" || activeSection === "both") && (
        <BenefitsSection
          heading="Popular Pranayams"
          subheading="Explore breath-led practices designed for balance, clarity, and grounded energy."
          data={visiblePranayams}
          dark={dark}
          textColor={textColor}
          isLoading={loadingPranayams}
        />
      )}
    </>
  );
}