"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { IMAGES } from "../../assets/assets";
import { mudraService } from "../../services/apiService";
import { useAuthStore } from "../../store/useAuthStore";

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://192.168.1.14:1337";

// ── 10 Default Mudras matching Figma screenshot ─────────────────


const CATEGORIES  = ["All Categories", "Mind", "Energy", "Detox", "Healing", "Emotional"];
const BENEFITS    = ["All Benefits", "Focus", "Vitality", "Cleansing", "Digestion", "Calm", "Immunity", "Skin", "Heart", "Hearing", "Metabolism"];
const ELEMENTS    = ["All Elements", "Space", "Earth", "Air", "Fire", "Water"];
const SORT_OPTIONS = ["Sort By", "Newest", "Oldest", "A–Z", "Z–A"];

// ── Icons ──────────────────────────────────────────────────────
const ChevronDown = () => (
  <svg className="w-4 h-4 text-gray-400 pointer-events-none" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 7.5l5 5 5-5" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const ArrowRight = () => (
  <svg className="w-3.5 h-3.5 ml-1" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

export default function PopularAsanas() {
  const searchParams = useSearchParams();
  const elementParam = searchParams.get("element");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 });

  const router = useRouter();
  const { isLoggedIn } = useAuthStore();

  const [mudrasList, setMudrasList] = useState([]);
const [isLoading, setIsLoading] = useState(true);
  const [categoriesList, setCategoriesList] = useState(CATEGORIES);
  const [benefitsList, setBenefitsList] = useState(BENEFITS);
  const [elementsList, setElementsList] = useState(ELEMENTS);

  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState("All Categories");
  const [benefit,  setBenefit]  = useState("All Benefits");
  const [element,  setElement]  = useState("All Elements");
  const [sortBy,   setSortBy]   = useState("Sort By");
const CARD_COLORS = [
  "bg-[#FEF9C3]",
  "bg-[#F3E8FF]",
  "bg-[#BFDDF2]",
  "bg-[#FCE7F3]",
  "bg-[#DCFCE7]",
];
  useEffect(() => {
    if (elementParam) {
      const formatted = elementParam.charAt(0).toUpperCase() + elementParam.slice(1).toLowerCase();
      setElement(formatted);
    }
  }, [elementParam]);

 useEffect(() => {
  async function fetchMudras() {
    setIsLoading(true);

    try {
      const elementFilter =
        element !== "All Elements" ? element : null;

      const sortQuery =
        sortBy === "Newest"
          ? "createdAt:desc"
          : sortBy === "Oldest"
          ? "createdAt:asc"
          : sortBy === "A–Z"
          ? "name:asc"
          : sortBy === "Z–A"
          ? "name:desc"
          : null;

      const json = await mudraService.getAllMudras(
        elementFilter,
        sortQuery ? { sort: sortQuery } : {}
      );

      let rawList = [];

      if (json && Array.isArray(json)) {
        rawList = json;
      } else if (json && json.success && Array.isArray(json.data)) {
        rawList = json.data;
      } else if (
        json &&
        json.success &&
        json.data &&
        Array.isArray(json.data.data)
      ) {
        rawList = json.data.data;
      } else if (json && Array.isArray(json.data)) {
        rawList = json.data;
      }

      const mapped = rawList.map((item, idx) => {
        const firstCategory = item.categories?.[0];

        const categoryName =
          firstCategory?.Name || "Healing";

        const benefitName =
          item.intentions?.[0]?.name ||
          firstCategory?.Name ||
          "Wellbeing";

        const elementVal = item.element || "Earth";

        let iconUrl = null;

        if (item.web?.IntroCardWeb?.IntrocardImage?.url) {
          iconUrl =
            `${IMAGE_BASE_URL}${item.web.IntroCardWeb.IntrocardImage.url}`;
        } else if (item.thumbnail?.url) {
          iconUrl = `${IMAGE_BASE_URL}${item.thumbnail.url}`;
        } else if (item.image?.url) {
          iconUrl = `${IMAGE_BASE_URL}${item.image.url}`;
        } else if (
          Array.isArray(item.image) &&
          item.image[0]?.url
        ) {
          iconUrl = `${IMAGE_BASE_URL}${item.image[0].url}`;
        }

        const imgKey = item.name
          ? item.name
              .toLowerCase()
              .replace(/\s+mudra/g, "Mudra")
              .replace(/\s+/g, "")
          : "";

        return {
          id: item.documentId || item.id,
          name: item.name,
          elements: `${categoryName} • ${elementVal}`,
          desc:
            item.web?.IntroCardWeb?.Description ||
            item.description ||
            "",
        bg: CARD_COLORS[idx % CARD_COLORS.length],// or your preferred dynamic background
          imgKey,
          category: categoryName,
          benefit: benefitName,
          element: elementVal,
          createdAt:
            item.createdAt ||
            item.publishedAt ||
            item.created_at ||
            item.id,
          iconUrl,
          isRemote: !!iconUrl,
        };
      });

      // API data only
      setMudrasList(mapped);

      const uniqueCategories = [
        "All Categories",
        ...new Set(
          mapped.map((m) => m.category).filter(Boolean)
        ),
      ];

      const uniqueBenefits = [
        "All Benefits",
        ...new Set(
          mapped.map((m) => m.benefit).filter(Boolean)
        ),
      ];

      setCategoriesList(uniqueCategories);
      setBenefitsList(uniqueBenefits);
      setElementsList(ELEMENTS);

    } catch (err) {
      console.warn("Error fetching mudras:", err);

      // Don't use fallback data
      setMudrasList([]);
    } finally {
      setIsLoading(false);
    }
  }

  fetchMudras();
}, [element, sortBy]);

  const filtered = mudrasList
    .filter((m) => {
      const q = search.toLowerCase();
      if (q && !m.name.toLowerCase().includes(q) && !m.desc.toLowerCase().includes(q)) return false;
      if (category !== "All Categories" && m.category !== category) return false;
      if (benefit  !== "All Benefits"   && m.benefit  !== benefit)  return false;
      if (element  !== "All Elements"   && m.element  !== element)  return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "A–Z") return a.name.localeCompare(b.name);
      if (sortBy === "Z–A") return b.name.localeCompare(a.name);
      if (sortBy === "Newest") {
        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : (typeof a.id === 'number' ? a.id : 0);
        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : (typeof b.id === 'number' ? b.id : 0);
        return timeB - timeA;
      }
      if (sortBy === "Oldest") {
        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : (typeof a.id === 'number' ? a.id : 0);
        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : (typeof b.id === 'number' ? b.id : 0);
        return timeA - timeB;
      }
      return 0;
    });

const handleCardClick = (id) => {
  if (!isLoggedIn) {
    router.push(`/Login?redirectTo=/MudraDetailTemplate?id=${id}`);
  } else {
    router.push(`/MudraDetailTemplate?id=${id}`);
  }
};

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-white py-12 md:py-16 px-6 sm:px-10 lg:px-16" 
    >
      <div className="max-w-7xl mx-auto">

        {/* ── 1. FILTER BAR (5-column grid matching Figma screenshot 100%) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5 mb-12 items-center">
          
          {/* Item 1: Search Box (Column 1) */}
          <div className="relative w-full">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search mudras..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-xs sm:text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9A85FE]/30 shadow-2xs"
            />
          </div>

          {/* Item 2: Category Dropdown (Column 2) */}
          <div className="relative w-full">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="appearance-none w-full bg-white border border-gray-200 rounded-lg pl-4 pr-10 py-2.5 text-xs sm:text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#9A85FE]/30 cursor-pointer shadow-2xs"
            >
              {categoriesList.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <ChevronDown />
            </div>
          </div>

          {/* Item 3: Benefit Dropdown (Column 3) */}
          <div className="relative w-full">
            <select
              value={benefit}
              onChange={(e) => setBenefit(e.target.value)}
              className="appearance-none w-full bg-white border border-gray-200 rounded-lg pl-4 pr-10 py-2.5 text-xs sm:text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#9A85FE]/30 cursor-pointer shadow-2xs"
            >
              {benefitsList.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <ChevronDown />
            </div>
          </div>

          {/* Item 4: Element Dropdown (Column 4) */}
          <div className="relative w-full">
            <select
              value={element}
              onChange={(e) => setElement(e.target.value)}
              className="appearance-none w-full bg-white border border-gray-200 rounded-lg pl-4 pr-10 py-2.5 text-xs sm:text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#9A85FE]/30 cursor-pointer shadow-2xs"
            >
              {elementsList.map((el) => (
                <option key={el} value={el}>{el}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <ChevronDown />
            </div>
          </div>

          {/* Item 5: Sort Dropdown (Column 5) */}
          <div className="relative w-full">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none w-full bg-white border border-gray-200 rounded-lg pl-4 pr-10 py-2.5 text-xs sm:text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#9A85FE]/30 cursor-pointer shadow-2xs"
            >
              {SORT_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <ChevronDown />
            </div>
          </div>

        </div>

        {/* ── 2. SECTION HEADING ── */}
        <div className="text-center mb-10">
          <h2
            className="text-3xl sm:text-4xl lg:text-[44px] font-medium mb-2"
            style={{
              color: "#9A85FE",
              fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
            }}
          >
            Popular Mudras
          </h2>
          <p className="text-sm sm:text-base text-gray-700 font-semibold max-w-lg mx-auto leading-relaxed">
            Browse a selection of commonly used and effective mudras.
          </p>
        </div>

{/* ── 3. CARDS GRID ── */}
{isLoading ? (
  <div className="flex items-center justify-center py-20">
    <div className="w-10 h-10 border-4 border-gray-200 border-t-[#9A85FE] rounded-full animate-spin" />
  </div>
) : filtered.length === 0 ? (
  <div className="text-center py-20">
    <p className="text-gray-500 text-sm">
      No mudras found.
    </p>
  </div>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
    {filtered.map((item, index) => {
      const mudraImage = IMAGES[item.imgKey];

      return (
        <motion.div
          key={item.id}
          onClick={() => handleCardClick(item.id)}
          initial={{ opacity: 0, y: 20 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 20 }
          }
          transition={{
            duration: 0.4,
            delay: index * 0.04,
          }}
          whileHover={{
            y: -4,
            scale: 1.02,
          }}
          className={`${item.bg} rounded-2xl p-5 flex flex-col items-center text-center transition-all duration-200 hover:shadow-md cursor-pointer`}
        >
          {/* Avatar Image */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-white shadow-xs mb-3 border border-white/60 flex items-center justify-center shrink-0">
            {item.isRemote && item.iconUrl ? (
              <img
                src={item.iconUrl}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            ) : mudraImage ? (
              <Image
                src={mudraImage}
                alt={item.name}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100" />
            )}
          </div>

          {/* Name */}
          <h3 className="text-base font-bold text-gray-900 mb-0.5 leading-snug">
            {item.name}
          </h3>

          {/* Elements */}
          <p className="text-xs font-semibold text-gray-500 mb-2 leading-tight">
            {item.elements}
          </p>

          {/* Description */}
          <p className="text-xs text-gray-600 leading-relaxed mb-4 flex-1">
            {item.desc}
          </p>

          {/* Learn More */}
          <div className="mt-auto flex items-center justify-center text-xs font-bold text-gray-800 hover:text-gray-900">
            <span>Learn More</span>
            <ArrowRight />
          </div>
        </motion.div>
      );
    })}
  </div>
)}
     </div>
</section>
  );
}