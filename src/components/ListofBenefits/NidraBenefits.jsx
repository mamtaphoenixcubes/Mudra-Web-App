"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { typography, spacing } from "../../theme";
import { IMAGES } from "../../assets/assets";
import { useTheme } from "../../context/ThemeContext";

// ── Mudra data ─────────────────────────────────────────────────
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

const CATEGORIES = ["All Categories", "Mind", "Energy", "Detox", "Healing", "Emotional"];
const BENEFITS = ["All Benefits", "Focus", "Vitality", "Cleansing", "Digestion", "Calm", "Immunity", "Skin", "Heart", "Hearing", "Metabolism"];
const ELEMENTS = ["All Elements", "Space", "Earth", "Air", "Fire", "Water"];
const SORT_OPTIONS = ["Sort By", "A–Z", "Z–A"];

// ── Icons ──────────────────────────────────────────────────────
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

// ── Filter select ──────────────────────────────────────────────
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

// ── Mudra card ─────────────────────────────────────────────────
function MudraCard({ mudra, dark, textColor, index }) {
  const router = useRouter();
  const mudraImage = IMAGES[mudra.imgKey];

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

// ── Shared benefits section ──────────────────────────────────
function BenefitsSection({ heading, subheading, data, dark, textColor }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.05, margin: "-50px" });

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [benefit, setBenefit] = useState("All Benefits");
  const [element, setElement] = useState("All Elements");
  const [sortBy, setSortBy] = useState("Sort By");

  const filtered = data
    .filter((m) => {
      const q = search.toLowerCase();
      if (q && !m.name.toLowerCase().includes(q) && !m.desc.toLowerCase().includes(q)) return false;
      if (category !== "All Categories" && m.category !== category) return false;
      if (benefit !== "All Benefits" && m.benefit !== benefit) return false;
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

        {/* ── Filter Bar ── */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-2 sm:gap-3 mb-5 sm:mb-6">
          {/* Search */}
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

          {/* Filters */}
          <FilterSelect 
            options={CATEGORIES} 
            value={category} 
            onChange={setCategory} 
            className="w-full sm:w-[130px] md:w-[150px]" 
            dark={dark} 
          />
          <FilterSelect 
            options={BENEFITS} 
            value={benefit} 
            onChange={setBenefit} 
            className="w-full sm:w-[130px] md:w-[150px]" 
            dark={dark} 
          />
          <FilterSelect 
            options={ELEMENTS} 
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

        {filtered.length === 0 ? (
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

// ── Combined page ────────────────────────────────────────────
export default function NidraBenefits() {
  const { dark, textColor } = useTheme();

  return (
    <>
      <BenefitsSection
        heading="Popular Mudras"
        subheading="Browse a selection of commonly used and effective mudras."
        data={MUDRAS}
        dark={dark}
        textColor={textColor}
      />
      <BenefitsSection
        heading="Popular Nidra"
        subheading="Browse a selection of commonly used and effective mudras."
        data={MUDRAS}
        dark={dark}
        textColor={textColor}
      />
    </>
  );
}