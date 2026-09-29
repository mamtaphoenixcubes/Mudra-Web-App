"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  X,
  ChevronRight,
  Calendar,
  Clock,
  SlidersHorizontal,
} from "lucide-react";
import { IMAGES } from "../../assets/assets";
import { spacing, typography } from "../../theme";
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

// ── Article Card ──────────────────────────────────────────────────
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

    // Determine custom text color for titles based on the background color class to match mockup
    const getTitleColor = () => {
        if (bgClass.includes("benefit-1")) return dark ? "#a78bfa" : "#7c3aed"; // Purple
        if (bgClass.includes("benefit-2")) return dark ? "#86efac" : "#15803d"; // Green
        if (bgClass.includes("problem-3")) return dark ? "#fdba74" : "#c2410c"; // Orange
        if (bgClass.includes("benefit-4")) return dark ? "#93c5fd" : "#1d4ed8"; // Blue
        return textColor;
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                delay: index * 0.04,
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
                <div className="flex flex-col flex-1 p-4 md:p-5">
                    <motion.h3 
                        className="font-bold text-[15px] md:text-[16px] leading-snug mb-2 line-clamp-2" 
                        style={{ color: getTitleColor() }}
                        whileHover={{
                            scale: 1.01,
                            transition: { duration: 0.2 }
                        }}
                    >
                        {titleText}
                    </motion.h3>
                    <p className="text-xs md:text-sm leading-relaxed flex-1 mb-4 line-clamp-3" style={{ color: dark ? "#d1d5db" : "#4b5563" }}>
                        {descriptionText}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs mt-auto pt-2 border-t border-black/5" style={{ color: dark ? "#9ca3af" : "#6b7280" }}>
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 shrink-0 opacity-70" />
                            <span>{dateText}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 shrink-0 opacity-70" />
                            <span>{readTimeText}</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}

export default function Blogfilterpage() {
  const { dark, textColor } = useTheme();
  const sectionRef = useRef(null);

  // Dynamic filter choices from API
  const [filterOptions, setFilterOptions] = useState({ category: [], blogTypes: [], levels: [], sort: [] });
  
  // Selected Filters State
  const [selectedTypes, setSelectedTypes] = useState(["Yoga Nidra"]); // Default selected to match filter applied state mockup
  const [selectedCategories, setSelectedCategories] = useState([]);   // Topics (Category documentIds)
  const [selectedLevels, setSelectedLevels] = useState(["Beginner"]);  // Default level selected to match mockup
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // API response data
  const [blogs, setBlogs] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 9, pageCount: 1, total: 0 });
  const [loading, setLoading] = useState(true);

  // Accordion Expand States
  const [categoryExpanded, setCategoryExpanded] = useState(true);
  const [topicExpanded, setTopicExpanded] = useState(true);
  const [levelExpanded, setLevelExpanded] = useState(true);

  // Sort Selector Dropdown State
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const sortDropdownRef = useRef(null);

  // Fetch filter options on mount
  useEffect(() => {
    async function loadFilters() {
      try {
        const res = await blogService.getBlogFilters();
        if (res) {
          setFilterOptions(res);
          // Set default selected category to Deep Sleep if found in categories list
          const sleepTopic = res.category?.find(c => c.Name === "Deep Sleep" || c.Name === "Sleep");
          if (sleepTopic) {
            setSelectedCategories([sleepTopic.documentId]);
          }
        }
      } catch (err) {
        console.warn("Failed to load blog filters:", err);
      }
    }
    loadFilters();
  }, []);

  // Fetch filtered blogs list from API
  useEffect(() => {
    let isMounted = true;
    async function fetchBlogs() {
      setLoading(true);
      try {
        const params = {
          page,
          pageSize: 9,
          search: searchQuery,
          type: selectedTypes.join(","),
          category: selectedCategories.join(","),
          level: selectedLevels.join(","),
          sort: sortBy
        };

        const res = await blogService.getAllBlogs(params);

        let list = [];
        let pag = { page: 1, pageSize: 9, pageCount: 1, total: 0 };

        if (res && res.success) {
          if (res.data && res.data.data && Array.isArray(res.data.data)) {
            list = res.data.data;
            pag = res.data.meta?.pagination || pag;
          } else if (Array.isArray(res.data)) {
            list = res.data;
            pag = res.pagination || pag;
          }
        } else if (res && res.data && Array.isArray(res.data)) {
          list = res.data;
          pag = res.pagination || pag;
        } else if (Array.isArray(res)) {
          list = res;
        }

        if (!isMounted) return;
        setBlogs(list);
        setPagination(pag);
      } catch (err) {
        console.warn("Failed to load blogs:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    fetchBlogs();
    return () => {
      isMounted = false;
    };
  }, [page, selectedTypes, selectedCategories, selectedLevels, searchQuery, sortBy]);

  // Click outside sort dropdown handler
  useEffect(() => {
    function handleClickOutside(event) {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setSortDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle checklist selections
  const toggleBlogType = (val) => {
    setPage(1);
    if (selectedTypes.includes(val)) {
      setSelectedTypes(prev => prev.filter(x => x !== val));
    } else {
      setSelectedTypes(prev => [...prev, val]);
    }
  };

  const toggleCategory = (val) => {
    setPage(1);
    if (selectedCategories.includes(val)) {
      setSelectedCategories(prev => prev.filter(x => x !== val));
    } else {
      setSelectedCategories(prev => [...prev, val]);
    }
  };

  const toggleLevel = (val) => {
    setPage(1);
    if (selectedLevels.includes(val)) {
      setSelectedLevels(prev => prev.filter(x => x !== val));
    } else {
      setSelectedLevels(prev => [...prev, val]);
    }
  };

  const clearAllFilters = () => {
    setPage(1);
    setSelectedTypes([]);
    setSelectedCategories([]);
    setSelectedLevels([]);
    setSortBy("newest");
    setSearchQuery("");
  };

  // UI Label Mappers
  const getBlogTypeLabel = (val) => {
    if (val === "Elements") return "Five Elements";
    if (val === "Well-being") return "Benefits";
    if (val === "History & Philosophy" || val === "Practice & Guides") return "Library";
    return val;
  };

  const getTopicLabel = (documentId) => {
    const cat = filterOptions.category?.find(c => c.documentId === documentId);
    if (cat) {
      if (cat.Name === "Deep Sleep") return "Sleep";
      if (cat.Name === "Stress & Anxiety") return "Stress Relief";
      return cat.Name;
    }
    return documentId;
  };

  const getLevelLabel = (val) => {
    if (val === "Experianced") return "Intermediate";
    if (val === "Advance") return "Advanced";
    return val;
  };

  const getSortLabel = (val) => {
    if (val === "newest") return "Newest First";
    if (val === "oldest") return "Oldest First";
    if (val === "title_asc") return "Title (A-Z)";
    if (val === "title_desc") return "Title (Z-A)";
    return "Newest First";
  };

  // Build active filters list for chip display
  const activeChips = [];
  selectedTypes.forEach(val => {
    activeChips.push({ type: "type", value: val, label: `Category: ${getBlogTypeLabel(val)}` });
  });
  selectedCategories.forEach(val => {
    activeChips.push({ type: "category", value: val, label: `Topic: ${getTopicLabel(val)}` });
  });
  selectedLevels.forEach(val => {
    activeChips.push({ type: "level", value: val, label: `Difficulty: ${getLevelLabel(val)}` });
  });

  const removeFilterChip = (item) => {
    setPage(1);
    if (item.type === "type") {
      setSelectedTypes(prev => prev.filter(x => x !== item.value));
    } else if (item.type === "category") {
      setSelectedCategories(prev => prev.filter(x => x !== item.value));
    } else if (item.type === "level") {
      setSelectedLevels(prev => prev.filter(x => x !== item.value));
    }
  };

  // Fallback structures if filter API is loading/empty
  const blogTypesList = filterOptions.blogTypes?.length > 0 ? filterOptions.blogTypes : [
    { label: "Mudras", value: "Mudras" },
    { label: "Yoga Nidra", value: "Yoga Nidra" },
    { label: "Elements", value: "Elements" },
    { label: "Well-being", value: "Well-being" },
    { label: "History & Philosophy", value: "History & Philosophy" }
  ];

  const categoryList = filterOptions.category || [];

  const levelsList = filterOptions.levels?.length > 0 ? filterOptions.levels : [
    { label: "Beginner", value: "Beginner" },
    { label: "Experianced", value: "Experianced" },
    { label: "Advance", value: "Advance" }
  ];

  const sortOptionsList = filterOptions.sort?.length > 0 ? filterOptions.sort : [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "Title (A-Z)", value: "title_asc" },
    { label: "Title (Z-A)", value: "title_desc" }
  ];

  const surface = dark ? "bg-gray-900" : "bg-white";

  // Heading character variants
  const charVariants = {
    hidden: { opacity: 0, y: 20, rotateX: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.03,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const headingText = "Blog";
  const headingChars = headingText.split("");

  return (
    <motion.div 
      ref={sectionRef}
      className={`w-full ${surface}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className={spacing.blogFilter.container}>
        
        {/* Breadcrumb */}
        <motion.div 
          className={spacing.blogFilter.breadcrumb}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span 
            className={typography.blogFilter.breadcrumbHome} 
            style={{ color: dark ? "#ffffff" : "#6b7280" }}
          >
            Home
          </span>
          <ChevronRight className="w-3.5 h-3.5" style={{ color: dark ? "#6b7280" : "#d1d5db" }} />
          <span 
            className={typography.blogFilter.breadcrumbCurrent} 
            style={{ color: textColor }}
          >
            Blog
          </span>
        </motion.div>

        {/* Page heading + results note */}
        <motion.div 
          className={spacing.blogFilter.headingRow}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.h1 
            className={typography.blogFilter.heading} 
            style={{ color: textColor }}
          >
            {headingChars.map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={charVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{ display: "inline-block" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p 
            className={typography.blogFilter.resultsNote} 
            style={{ color: dark ? "#ffffff" : "#6b7280" }}
          >
            Showing results based on your filters.
          </motion.p>
        </motion.div>

        {/* Active filters row */}
        <motion.div 
          className={spacing.blogFilter.activeFiltersRow}
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className={spacing.blogFilter.activeFiltersChips}>
            <span className={spacing.blogFilter.activeFiltersLabel} style={{ color: dark ? "#ffffff" : "#6b7280" }}>
              Active Filters:
            </span>
            {activeChips.map((f, i) => (
              <motion.span 
                key={i} 
                className={spacing.blogFilter.chip} 
                style={{
                  backgroundColor: dark ? "#374151" : "#f3f4f6",
                  color: dark ? "#e5e7eb" : "#374151",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 + 0.3, duration: 0.3 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                {f.label}
                <button onClick={() => removeFilterChip(f)} className="focus:outline-none">
                  <X className={spacing.blogFilter.chipIcon} style={{ color: dark ? "#6b7280" : "#9ca3af" }} />
                </button>
              </motion.span>
            ))}
            {activeChips.length > 0 && (
              <button 
                onClick={clearAllFilters}
                className={spacing.blogFilter.clearAllInline} 
                style={{ color: textColor }}
              >
                Clear All
              </button>
            )}
          </div>

          <div className={spacing.blogFilter.spacer} />

          {/* Results Count & Sort Dropdown */}
          <div className={spacing.blogFilter.resultsSortGroup} ref={sortDropdownRef}>
            <span 
              className={spacing.blogFilter.resultsCountDesktop} 
              style={{ color: dark ? "#ffffff" : "#6b7280" }}
            >
              {pagination.total} results found
            </span>
            <button 
              onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
              className={spacing.blogFilter.sortButtonDesktop} 
              style={{ color: dark ? "#ffffff" : "#374151" }}
            >
              <span className="hidden sm:inline">{getSortLabel(sortBy)}</span>
              <span className="sm:hidden">{getSortLabel(sortBy)}</span>
              <ChevronDown className="w-3.5 h-3.5 shrink-0" style={{ color: dark ? "#ffffff" : "#9ca3af" }} />
            </button>
            <AnimatePresence>
              {sortDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className={`absolute right-0 mt-12 w-48 border rounded-xl shadow-lg z-50 overflow-hidden ${
                    dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                  }`}
                >
                  {sortOptionsList.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setSortBy(opt.value);
                        setPage(1);
                        setSortDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${
                        sortBy === opt.value
                          ? "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {getSortLabel(opt.value)}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Search bar inside header row if needed */}
        <div className="mb-6 max-w-md relative">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search blogs..."
            className="w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            style={{
              backgroundColor: dark ? "#1f2937" : "#ffffff",
              borderColor: dark ? "#374151" : "#e5e7eb",
              color: dark ? "#ffffff" : "#374151"
            }}
          />
          <svg className="absolute right-3.5 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Body Layout: Sidebar + Grid */}
        <div className={spacing.blogFilter.body}>
          
          {/* LEFT SIDEBAR FILTERS (DESKTOP) */}
          <aside className={spacing.blogFilter.sidebarDesktop}>
            <div className={spacing.blogFilter.sidebarHeaderRow}>
              <span className={typography.blogFilter.sidebarTitle} style={{ color: textColor }}>
                Filters
              </span>
              <button 
                onClick={clearAllFilters}
                className={typography.blogFilter.sidebarClearAll} 
                style={{ color: textColor }}
              >
                Clear All
              </button>
            </div>

            {/* Category accordion */}
            <div className="mb-6">
              <button 
                onClick={() => setCategoryExpanded(!categoryExpanded)}
                className="flex items-center justify-between w-full font-semibold text-sm mb-3"
                style={{ color: dark ? "#ffffff" : "#374151" }}
              >
                <span>Category</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${categoryExpanded ? "rotate-180" : ""}`} />
              </button>
              {categoryExpanded && (
                <div className="flex flex-col gap-2.5">
                  <label className="flex items-center gap-2.5 cursor-pointer text-sm" style={{ color: dark ? "#d1d5db" : "#374151" }}>
                    <input 
                      type="checkbox"
                      checked={selectedTypes.length === 0}
                      onChange={() => setSelectedTypes([])}
                      className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 border-gray-300"
                    />
                    All Categories
                  </label>
                  {blogTypesList.map(item => (
                    <label key={item.value} className="flex items-center gap-2.5 cursor-pointer text-sm" style={{ color: dark ? "#d1d5db" : "#374151" }}>
                      <input 
                        type="checkbox"
                        checked={selectedTypes.includes(item.value)}
                        onChange={() => toggleBlogType(item.value)}
                        className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 border-gray-300"
                      />
                      {getBlogTypeLabel(item.value)}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Topic accordion */}
            <div className="mb-6 border-t border-gray-100 dark:border-gray-800 pt-4">
              <button 
                onClick={() => setTopicExpanded(!topicExpanded)}
                className="flex items-center justify-between w-full font-semibold text-sm mb-3"
                style={{ color: dark ? "#ffffff" : "#374151" }}
              >
                <span>Topic</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${topicExpanded ? "rotate-180" : ""}`} />
              </button>
              {topicExpanded && (
                <div className="flex flex-col gap-2.5">
                  <label className="flex items-center gap-2.5 cursor-pointer text-sm" style={{ color: dark ? "#d1d5db" : "#374151" }}>
                    <input 
                      type="checkbox"
                      checked={selectedCategories.length === 0}
                      onChange={() => setSelectedCategories([])}
                      className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 border-gray-300"
                    />
                    All Topics
                  </label>
                  {categoryList.map(cat => (
                    <label key={cat.documentId} className="flex items-center gap-2.5 cursor-pointer text-sm" style={{ color: dark ? "#d1d5db" : "#374151" }}>
                      <input 
                        type="checkbox"
                        checked={selectedCategories.includes(cat.documentId)}
                        onChange={() => toggleCategory(cat.documentId)}
                        className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 border-gray-300"
                      />
                      {getTopicLabel(cat.documentId)}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Difficulty Level accordion */}
            <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
              <button 
                onClick={() => setLevelExpanded(!levelExpanded)}
                className="flex items-center justify-between w-full font-semibold text-sm mb-3"
                style={{ color: dark ? "#ffffff" : "#374151" }}
              >
                <span>Difficulty Level</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${levelExpanded ? "rotate-180" : ""}`} />
              </button>
              {levelExpanded && (
                <div className="flex flex-col gap-2.5">
                  <label className="flex items-center gap-2.5 cursor-pointer text-sm" style={{ color: dark ? "#d1d5db" : "#374151" }}>
                    <input 
                      type="checkbox"
                      checked={selectedLevels.length === 0}
                      onChange={() => setSelectedLevels([])}
                      className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 border-gray-300"
                    />
                    All Levels
                  </label>
                  {levelsList.map(lvl => (
                    <label key={lvl.value} className="flex items-center gap-2.5 cursor-pointer text-sm" style={{ color: dark ? "#d1d5db" : "#374151" }}>
                      <input 
                        type="checkbox"
                        checked={selectedLevels.includes(lvl.value)}
                        onChange={() => toggleLevel(lvl.value)}
                        className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 border-gray-300"
                      />
                      {getLevelLabel(lvl.value)}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </aside>

          {/* RIGHT SIDE ARTICLE CARDS GRID */}
          <div className="flex-1 w-full">
            {loading ? (
              <div className="text-center py-24" style={{ color: dark ? "#6b7280" : "#9ca3af" }}>
                <div className="inline-block w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-sm">Loading articles...</p>
              </div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-24 border border-dashed border-gray-250 dark:border-gray-800 rounded-2xl">
                <p className="text-gray-400 text-sm">No articles match your selected filters.</p>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogs.map((post, i) => (
                    <ArticleCard key={post.id} article={post} dark={dark} textColor={textColor} index={i} />
                  ))}
                </div>

                {/* Numbered Page Pagination */}
                {pagination.pageCount > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12 pt-6 border-t border-gray-150 dark:border-gray-800">
                    <button
                      disabled={page === 1}
                      onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                      className={`flex items-center gap-1 px-3.5 py-2 rounded-xl text-sm font-semibold border transition-all ${
                        page === 1
                          ? "opacity-40 cursor-not-allowed border-gray-200 dark:border-gray-800 text-gray-400"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-300 dark:border-gray-700 cursor-pointer"
                      }`}
                      style={{ color: dark ? "#fff" : "#374151" }}
                    >
                      <ChevronRight className="w-4 h-4 rotate-180" />
                      <span>Previous</span>
                    </button>
                    
                    {Array.from({ length: pagination.pageCount }).map((_, idx) => {
                      const pageNum = idx + 1;
                      const isActive = pageNum === page;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`w-10 h-10 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
                            isActive
                              ? "bg-purple-600 border-purple-600 text-white shadow-md shadow-purple-500/20"
                              : dark
                                ? "bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300"
                                : "bg-white border-gray-300 hover:bg-gray-50 text-gray-700"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      disabled={page === pagination.pageCount}
                      onClick={() => setPage(prev => Math.min(prev + 1, pagination.pageCount))}
                      className={`flex items-center gap-1 px-3.5 py-2 rounded-xl text-sm font-semibold border transition-all ${
                        page === pagination.pageCount
                          ? "opacity-40 cursor-not-allowed border-gray-200 dark:border-gray-800 text-gray-400"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-300 dark:border-gray-700 cursor-pointer"
                      }`}
                      style={{ color: dark ? "#fff" : "#374151" }}
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
        </div>
      </div>
    </motion.div>
  );
}