"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IMAGES } from "../../assets/assets";
import { yogaNidraService } from "../../services/apiService";
import useAuthStore from "../../store/useAuthStore";

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://192.168.1.14:1337";

const pastelPalette = ["bg-[#FEF9C3]", "bg-[#F3E8FF]", "bg-[#BFDDF2]", "bg-[#FCE7F3]", "bg-[#DCFCE7]", "bg-[#FEF9C3]"];

function FilterSelect({ options = [], value, onChange }) {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none border border-gray-200 rounded-lg bg-white font-medium pl-3 pr-8 py-2.5 text-xs sm:text-sm text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#9A85FE]/30 shadow-2xs truncate"
      >
        {options.map((o) => {
          const isObj = typeof o === "object" && o !== null;
          const val = isObj ? o.value : o;
          const lbl = isObj ? o.label : o;
          return (
            <option key={val} value={val}>{lbl}</option>
          );
        })}
      </select>
      <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400">
        ▾
      </span>
    </div>
  );
}

function SessionCard({ session }) {
  const router = useRouter();
 const { isLoggedIn } = useAuthStore();
   const handleCardClick = () => {
    if (!isLoggedIn) {
      router.push("/Login");
      return;
    }

    router.push(`/YogaNidraSessionDetail?id=${session.id}`);
  };

  const isHex = session.bg?.startsWith("#");

  return (
    <div
      onClick={handleCardClick}
      className={`
        ${isHex ? "" : session.bg} rounded-2xl p-4 flex flex-row gap-4
        cursor-pointer shadow-2xs transition-transform hover:-translate-y-1 w-full h-full
      `}
      style={{
        backgroundColor: isHex ? session.bg : undefined,
      }}
    >
      {/* Left: Square thumbnail with centered play + duration badge */}
      <div className="relative shrink-0 w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-gray-100">
        {session.isRemote ? (
          <img
            src={session.imgSrc}
            alt={session.imgAlt}
            className="w-full h-full object-cover"
            onError={(e) => { 
              e.target.src = IMAGES.YogaNidraImage.src || IMAGES.YogaNidraImage;
            }}
          />
        ) : (
          <img
            src={session.imgSrc.src || session.imgSrc}
            alt={session.imgAlt}
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Play Icon Centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-xs text-white flex items-center justify-center shadow-xs">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Duration Badge Bottom Left */}
        <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-md font-medium leading-none">
          {session.duration}
        </span>
      </div>

      {/* Right Content */}
      <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
        <div>
          <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-0.5 truncate">
            {session.title}
          </h3>
          <p className="text-xs text-gray-500 font-medium mb-1.5">
            {session.duration} • {session.level}
          </p>
          <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
            {session.description}
          </p>
        </div>
        
        {/* Tag Pill */}
        <span className="mt-3 self-start inline-block bg-white text-gray-700 text-xs font-medium px-3 py-1 rounded-full shadow-2xs">
          {session.tag}
        </span>
      </div>
    </div>
  );
}

export default function SessionPreviewsSection() {
  const [sessionsList, setSessionsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter options from backend
  const [durationsList, setDurationsList] = useState([{ label: "All Durations", value: "all" }]);
  const [themesList, setThemesList] = useState([{ label: "All Themes", value: "all" }]);
  const [benefitsList, setBenefitsList] = useState([{ label: "All Benefits", value: "all" }]);
  const [levelsList, setLevelsList] = useState(["All Levels"]);
  const [sortList, setSortList] = useState([{ label: "Sort By", value: "all" }]);

  // Active filter states
  const [search, setSearch] = useState("");
  const [duration, setDuration] = useState("all");
  const [theme, setTheme] = useState("all");
  const [benefit, setBenefit] = useState("all");
  const [level, setLevel] = useState("All Levels");
  const [sortBy, setSortBy] = useState("all");

  useEffect(() => {
    async function loadMetadataFilters() {
      try {
        const filters = await yogaNidraService.getYogaNidraFilters();
        if (filters) {
          if (filters.durations) {
            setDurationsList([{ label: "All Durations", value: "all" }, ...filters.durations]);
          }
          if (filters.themes) {
            const mappedThemes = filters.themes.map(t => ({ label: t.Name, value: t.documentId }));
            setThemesList([{ label: "All Themes", value: "all" }, ...mappedThemes]);
          }
          if (filters.benefits) {
            const mappedBenefits = filters.benefits.map(b => ({ label: b.Name, value: b.documentId }));
            setBenefitsList([{ label: "All Benefits", value: "all" }, ...mappedBenefits]);
          }
          if (filters.levels) {
            setLevelsList(["All Levels", ...filters.levels]);
          }
          if (filters.sort) {
            setSortList([{ label: "Sort By", value: "all" }, ...filters.sort]);
          }
        }
      } catch (err) {
        console.warn("Failed fetching filter options from API:", err);
      }
    }
    loadMetadataFilters();
  }, []);

 useEffect(() => {
  async function fetchFilteredSessions() {
    try {
      setIsLoading(true);

      const queryParams = {
        page: 1,
        pageSize: 12,
      };

      if (search) queryParams.search = search;
      if (duration !== "all") queryParams.duration = parseInt(duration);
      if (theme !== "all") queryParams.theme = theme;
      if (benefit !== "all") queryParams.benefit = benefit;
      if (level !== "All Levels") queryParams.level = level;
      if (sortBy !== "all") queryParams.sort = sortBy;

      const json = await yogaNidraService.getAllYogaNidras(queryParams);

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

      if (rawList.length > 0) {
        const mapped = rawList.map((item, index) => {
          const intro = item.NidraIntroCard;

          const categoryName =
            item.Category?.Name ||
            intro?.Category?.Name ||
            "Meditation";

          const thumbnail =
            intro?.ThumbnailImage?.[0]?.url ||
            item.ThumbnailImage?.[0]?.url;

          const imgUrl = thumbnail
            ? `${IMAGE_BASE_URL}${thumbnail}`
            : null;

          return {
            id: item.documentId || item.id,
            title:
              item.Name ||
              intro?.Name ||
              item.Chakra ||
              "Guided Nidra",

            duration: item.Duration
              ? `${item.Duration} min`
              : "20 min",

            level:
              item.Level ||
              intro?.Level ||
              "All Levels",

            description:
              intro?.ShortDescription ||
              "A guided practice for restorative peace.",

            tag: categoryName,

            bg: pastelPalette[index % pastelPalette.length],

            imgAlt:
              item.Name ||
              "Yoga Nidra Session",

            imgSrc:
              imgUrl ||
              IMAGES.YogaNidraImage,

            isRemote: !!imgUrl,
          };
        });

        setSessionsList(mapped);
      } else {
        setSessionsList([]);
      }
    } catch (err) {
      console.warn(
        "Failed fetching filtered yoga nidras from API:",
        err
      );

      setSessionsList([]);
    } finally {
      setIsLoading(false);
    }
  }

  fetchFilteredSessions();
}, [
  search,
  duration,
  theme,
  benefit,
  level,
  sortBy,
]);

  return (
    <section className="w-full bg-white py-12 md:py-16 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Filter Bar Grid (6-column grid matching Figma screenshot 100%) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-10 w-full items-center">
          
          {/* Search Input */}
          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search sessions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-200 rounded-lg bg-white pl-9 pr-3 py-2.5 text-xs sm:text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#9A85FE]/30 shadow-2xs"
            />
          </div>

          <FilterSelect options={durationsList} value={duration} onChange={setDuration} />
          <FilterSelect options={themesList} value={theme} onChange={setTheme} />
          <FilterSelect options={benefitsList} value={benefit} onChange={setBenefit} />
          <FilterSelect options={levelsList} value={level} onChange={setLevel} />
          <FilterSelect options={sortList} value={sortBy} onChange={setSortBy} />
        </div>

        {/* Section Heading matching Figma */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#9A85FE] mb-2">
            Session Previews
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Short previews to help you find the right session for you.
          </p>
        </div>

        {/* 3-Column Card Grid matching Figma */}
     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
  {isLoading ? (
    Array.from({ length: 6 }).map((_, index) => (
      <div
        key={index}
        className="rounded-2xl p-4 flex flex-row gap-4 w-full h-full bg-gray-100 animate-pulse"
      >
        {/* Image skeleton */}
        <div className="shrink-0 w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-gray-200" />

        {/* Content skeleton */}
        <div className="flex flex-col justify-between flex-1 py-1">
          <div>
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />

            <div className="h-3 bg-gray-200 rounded w-1/2 mb-3" />

            <div className="h-3 bg-gray-200 rounded w-full mb-2" />

            <div className="h-3 bg-gray-200 rounded w-4/5" />
          </div>

          <div className="h-6 bg-gray-200 rounded-full w-24 mt-3" />
        </div>
      </div>
    ))
  ) : sessionsList.length > 0 ? (
    sessionsList.map((s) => (
      <SessionCard key={s.id} session={s} />
    ))
  ) : (
    <div className="col-span-full flex justify-center items-center py-16">
      <p className="text-gray-500 text-sm">
        No Yoga Nidra sessions found.
      </p>
    </div>
  )}
</div>

        {/* View More Button matching Figma */}
        <div className="flex justify-center">
          <button className="bg-[#9A85FE] text-white font-semibold text-sm px-8 py-3 rounded-xl hover:opacity-90 transition-opacity shadow-xs cursor-pointer">
            View More Previews
          </button>
        </div>

      </div>
    </section>
  );
}