"use client";

import Image from "next/image";
import { Leaf, BarChart2, Hand } from "lucide-react";
import { spacing, typography } from "../../../theme";
import { useTheme } from "../../../context/ThemeContext";
import { IMAGES } from "../../../assets/assets";

// ─── Config ─────────────────────────────────────────────────────────────────
const MEDITATIONS = [
  {
    id: 1,
    name: "Mindful Breathing",
    sanskrit: "आनापान सति",
    tags: ["Breath", "Calm", "Awareness"],
    description:
      "Anchors attention on the breath to calm the nervous system and cultivate present-moment awareness.",
    image: IMAGES.JnanaMudra,
    element: "Air",
    level: "Beginner",
    type: "Breathwork",
  },
  {
    id: 2,
    name: "Body Scan Relaxation",
    sanskrit: "काय स्कैन",
    tags: ["Relaxation", "Release", "Grounding"],
    description:
      "Guides awareness through the body to release tension from head to toe and deepen relaxation.",
    image: IMAGES.BuddhistMudras,
    element: "Earth",
    level: "Beginner",
    type: "Relaxation",
  },
  {
    id: 3,
    name: "Loving-Kindness",
    sanskrit: "मैत्री भावना",
    tags: ["Compassion", "Heart", "Connection"],
    description:
      "Opens the heart and cultivates compassion for yourself and others, fostering inner warmth.",
    image: IMAGES.ElementTracker,
    element: "Space",
    level: "Intermediate",
    type: "Compassion",
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

// ─── Meditation Card Hero (presentational only) ─────────────────────────────
export default function MeditationCardHero({
  // Accept a meditation object (not required for rendering)
  meditation = null,
}) {
  const { dark, textColor } = useTheme();
  const item = MEDITATIONS[0]; // static — first meditation shown

  return (
    <div
      className={`w-full ${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`}
      style={{ backgroundColor: dark ? "#111827" : "#ffffff" }}
    >
      <div className="mx-auto rounded-[24px] overflow-hidden">
        {/* Header */}
        <div className="text-center pt-5 pb-4 md:pt-6 md:pb-5 lg:pt-8 lg:pb-15">
          <h2
            className={`${typography.sectionHeading}`}
            style={{ color: textColor }}
          >
            Meditation Card
          </h2>
        </div>

        {/* Body */}
        <div className="px-4 pb-5 md:px-6 md:pb-6 lg:px-8 lg:pb-8">
          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] lg:grid-cols-[350px_1fr] gap-4 md:gap-6 lg:gap-8 items-start">
            {/* ── Image ── */}
            <div>
              <div
                className="relative rounded-[18px] overflow-hidden aspect-[4/3] md:aspect-[3/3] lg:aspect-[4/4]"
                style={{ backgroundColor: dark ? "#374151" : "#EDE7FE" }}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* ── Details ── */}
            <div className="space-y-3 md:space-y-4 lg:space-y-5">
              <h3
                className={`${typography.playerHeading}`}
                style={{ color: textColor }}
              >
                {item.name}
              </h3>

              {/* Tag pills */}
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {item.tags.map((tag, idx) => (
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
                {item.description}
              </p>

              {/* Meta row */}
              <div className="flex items-center gap-3 md:gap-4 lg:gap-6 pt-1 md:pt-2">
                <MetaItem
                  icon={<Leaf size={16} />}
                  label="Element"
                  value={item.element}
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
                  value={item.level}
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
                  value={item.type}
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