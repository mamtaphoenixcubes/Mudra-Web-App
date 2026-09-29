"use client";

import { useState } from "react";
import Image from "next/image";
import { Leaf, BarChart2, Hand } from "lucide-react";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import { IMAGES } from "../../assets/assets";

// ─── Config ─────────────────────────────────────────────────────────────────
const MUDRAS = [
  {
    id: 1,
    name: "Jnana Mudra",
    tags: ["Mind", "Clarity", "Awareness"],
    description:
      "Enhances focus, memory and inner wisdom. Calms the mind and reduces stress.",
    image: IMAGES.JnanaMudra,
    element: "Air",
    level: "Beginner",
    type: "Hand Mudra",
  },
  {
    id: 2,
    name: "Prana Mudra",
    tags: ["Energy", "Vitality", "Healing"],
    description:
      "Activates the root chakra and boosts vitality. Improves eyesight and reduces fatigue.",
    image: IMAGES.BuddhistMudras,
    element: "Earth",
    level: "Beginner",
    type: "Hand Mudra",
  },
  {
    id: 3,
    name: "Shuni Mudra",
    tags: ["Patience", "Discipline", "Grounding"],
    description:
      "Cultivates patience and inner discipline. Supports emotional balance and focus.",
    image: IMAGES.ElementTracker,
    element: "Space",
    level: "Intermediate",
    type: "Hand Mudra",
  },
];

// ─── Meta Item ──────────────────────────────────────────────────────────────
function MetaItem({ icon, label, value, dark, textColor }) {
  return (
    <div className="flex items-center gap-2">
      <span style={{ color: dark ? "#9ca3af" : "#8A8577" }}>{icon}</span>
      <div className="leading-tight">
        <p className="text-[10px] md:text-[11px] lg:text-xs" style={{ color: dark ? "#9ca3af" : "#8A8577" }}>
          {label}
        </p>
        <p className="text-[12px] md:text-[13px] lg:text-sm font-medium" style={{ color: textColor }}>
          {value}
        </p>
      </div>
    </div>
  );
}

// ─── Carousel Dots ──────────────────────────────────────────────────────────
function CarouselDots({ count, activeIndex, onSelect, dark }) {
  const { textColor } = useTheme();
  
  return (
    <div className="flex items-center justify-center gap-1.5 mt-3">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Go to mudra ${i + 1}`}
          className="rounded-full transition-all duration-200"
          style={{
            width: i === activeIndex ? "16px" : "6px",
            height: "6px",
            backgroundColor:
              i === activeIndex ? textColor : dark ? "#4b5563" : "#D9D4C8",
          }}
        />
      ))}
    </div>
  );
}

// ─── Mudra Meditation Card ──────────────────────────────────────────────────
export default function MudraMeditationCard({ mudra = null }) {
  const { dark, textColor } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const getImgBaseUrl = () => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      if (hostname && hostname !== "localhost" && hostname !== "127.0.0.1") {
        return `http://${hostname}:1337`;
      }
    }
    return "http://192.168.1.14:1337";
  };
  const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || getImgBaseUrl();

  const isDynamic = !!mudra;
  const activeMudra = isDynamic ? mudra : MUDRAS[activeIndex];

  // Resolve intentions/tags
  const tags = isDynamic 
    ? (activeMudra.intentions?.map(x => x.Name) || []) 
    : (activeMudra.tags || []);

  // Resolve image
  const resolvedImage = isDynamic 
    ? (activeMudra.thumbnail?.url 
        ? (activeMudra.thumbnail.url.startsWith("http") ? activeMudra.thumbnail.url : `${IMAGE_BASE_URL}${activeMudra.thumbnail.url}`)
        : null)
    : activeMudra.image;

  return (
    <div
      className={`w-full ${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`}
      style={{ backgroundColor: dark ? "#111827" : "#ffffff" }}
    >
      <div
        className="mx-auto rounded-[24px] overflow-hidden"
      >
        {/* Header */}
        <div className="text-center pt-5 pb-4 md:pt-6 md:pb-5 lg:pt-8 lg:pb-6">
          <h2 
            className={`${typography.sectionHeading}`} 
            style={{ color: textColor }}
          >
            Mudra Meditation
          </h2>
        </div>

        {/* Body */}
        <div className="px-4 pb-5 md:px-6 md:pb-6 lg:px-8 lg:pb-8">
          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] lg:grid-cols-[350px_1fr] gap-4 md:gap-6 lg:gap-8 items-start">
            {/* ── Image + carousel ── */}
            <div>
              <div
                className="relative rounded-[18px] overflow-hidden aspect-[4/3] md:aspect-[3/3] lg:aspect-[4/4]"
                style={{ backgroundColor: dark ? "#374151" : "#EDE7FE" }}
              >
                {resolvedImage && !imageError ? (
                  <Image
                    src={resolvedImage}
                    alt={activeMudra.name}
                    fill
                    className="object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Hand size={32} className="text-[#9A85FE]/50" />
                  </div>
                )}
              </div>
              {!isDynamic && (
                <CarouselDots
                  count={MUDRAS.length}
                  activeIndex={activeIndex}
                  onSelect={(i) => {
                    setActiveIndex(i);
                    setImageError(false);
                  }}
                  dark={dark}
                />
              )}
            </div>

            {/* ── Details ── */}
            <div className="space-y-3 md:space-y-4 lg:space-y-5">
              <h3
                className={`${typography.playerHeading}`}
                style={{ color: textColor }}
              >
                {activeMudra.name}
              </h3>

              {/* Tag pills */}
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {tags.map((tag, idx) => (
                  <span
                    key={`${tag}-${idx}`}
                    className="text-[10px] md:text-[11px] lg:text-md px-2.5 py-0.5 md:px-3 md:py-1 rounded-full border"
                    style={{
                      borderColor: dark ? "#4b5563" : "#E4DECE",
                      color: dark ? "#d1d5db" : "#5C574C",
                      backgroundColor: dark ? "#111827" : "#FBF9F5",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p
                className="text-[13px] md:text-[14px] lg:text-[19px] leading-relaxed"
                style={{ color: dark ? "#9ca3af" : "#8A8577" }}
              >
                {activeMudra.description}
              </p>

              {/* Meta row */}
              <div className="flex items-center gap-3 md:gap-4 lg:gap-6 pt-1 md:pt-2">
                <MetaItem
                  icon={<Leaf size={16} />}
                  label="Element"
                  value={activeMudra.element}
                  dark={dark}
                  textColor={textColor}
                />
                <div
                  className="w-px h-7 md:h-9"
                  style={{ backgroundColor: dark ? "#374151" : "#E9E3D6" }}
                />
                <MetaItem
                  icon={<BarChart2 size={16} />}
                  label="Level"
                  value={activeMudra.level}
                  dark={dark}
                  textColor={textColor}
                />
                <div
                  className="w-px h-7 md:h-8"
                  style={{ backgroundColor: dark ? "#374151" : "#E9E3D6" }}
                />
                <MetaItem
                  icon={<Hand size={16} />}
                  label="Type"
                  value={activeMudra.type}
                  dark={dark}
                  textColor={textColor}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
