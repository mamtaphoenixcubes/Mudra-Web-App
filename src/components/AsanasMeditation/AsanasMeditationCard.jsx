"use client";

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
    sanskrit: "ज्ञान मुद्रा",
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
    sanskrit: "प्राण मुद्रा",
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
    sanskrit: "शूनी मुद्रा",
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

// ─── Mudra Meditation Card (presentational only) ───────────────────────────
export default function AsanasMeditationCard() {
  const { dark, textColor } = useTheme();
  const mudra = MUDRAS[0]; // static — first mudra shown

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
            Asanas Meditation Card
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
                  src={mudra.image}
                  alt={mudra.name}
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
                {mudra.name}
              </h3>

              {/* Tag pills */}
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {mudra.tags.map((tag, idx) => (
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
                {mudra.description}
              </p>

              {/* Meta row */}
              <div className="flex items-center gap-3 md:gap-4 lg:gap-6 pt-1 md:pt-2">
                <MetaItem
                  icon={<Leaf size={16} />}
                  label="Element"
                  value={mudra.element}
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
                  value={mudra.level}
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
                  value={mudra.type}
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