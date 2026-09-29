"use client";

import Image from "next/image";
import { useState } from "react";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import { IMAGES } from "../../assets/assets";

// ─── Config ─────────────────────────────────────────────────────────────────
const STEPS = [
  {
    id: 1,
    title: "1. Sit",
    lines: [
      "Sit comfortably with your spine tall.",
      "Close your eyes and relax your shoulders.",
    ],
    imageSrc: IMAGES.BodyBalance,
    bg: "#FBE3B8",
  },
  {
    id: 2,
    title: "2. Hand Placement",
    lines: [
      "Touch the tip of your index finger to the tip of your thumb.",
      "Keep the other three fingers extended gently",
    ],
    imageSrc: IMAGES.HastaMudras,
    bg: "#E4D3F5",
  },
  {
    id: 3,
    title: "3. Breathing",
    lines: [
      "Breathe naturally through your nose.",
      "Inhale deeply, exhale slowly",
    ],
    imageSrc: IMAGES.AirIcon,
    bg: "#DCEFC7",
  },
  {
    id: 4,
    title: "4. Meditation Cue",
    lines: [
      "Bring your awareness to the breath.",
      "Observe your thoughts without judgment",
    ],
    imageSrc: IMAGES.Energy,
    bg: "#C7E7EF",
  },
];

// ─── Step Row ───────────────────────────────────────────────────────────────
function StepRow({ step, isLast, dark, textColor }) {
  const { imageSrc, title, bg } = step;
  const [imageError, setImageError] = useState(false);

  return (
    <div>
      <div className={`flex gap-4 sm:gap-5 md:gap-6 ${spacing.stepsItemPx}`}>
        {/* Image + connector column */}
        <div className="flex flex-col items-center flex-shrink-0">
          <span
            className={spacing.stepsIconBox + " rounded-full flex items-center justify-center flex-shrink-0"}
            style={{ backgroundColor: bg }}
          >
            {imageSrc && !imageError ? (
              <Image
                src={imageSrc}
                alt={title}
                width={32}
                height={32}
                className={spacing.stepsIconInner + " object-contain"}
                onError={() => setImageError(true)}
                priority={false}
              />
            ) : (
              <div className={spacing.stepsIconInner + " bg-gray-200 rounded-full"} />
            )}
          </span>
          {!isLast && (
            <span
              className={spacing.stepsConnectorPt + " w-px"}
              style={{
                minHeight: "30px",
                backgroundImage: `linear-gradient(to bottom, ${dark ? "#4b5563" : "#C9C4B6"} 50%, transparent 50%)`,
                backgroundSize: "2px 12px",
                backgroundRepeat: "repeat-y",
              }}
            />
          )}
        </div>

        {/* Text content */}
        <div className="min-w-0 pt-1.5 sm:pt-2 pb-4 sm:pb-5 flex-1">
          <h3
            className={typography.stepsTitle + " mb-1 sm:mb-1.5"}
            style={{ color: textColor }}
          >
            {title}
          </h3>
          {step.lines.map((line, i) => (
            <p
              key={i}
              className={typography.stepsBody}
              style={{ color: dark ? "#9ca3af" : "#8A8577" }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* Horizontal divider */}
      {!isLast && (
        <div
          className={`ml-[64px] sm:ml-[76px] md:ml-[98px] mb-4 sm:mb-5`}
          style={{
            borderBottom: `1px solid ${dark ? "#374151" : "#EDEBE4"}`,
          }}
        />
      )}
    </div>
  );
}

// ─── Practice Steps ─────────────────────────────────────────────────────────
export default function PracticeSteps({ steps = STEPS }) {
  const { dark, textColor } = useTheme();

  return (
    <div
      className={`w-full ${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`}
      style={{ backgroundColor: dark ? "#111827" : "#ffffff" }}
    >
      <div
        className={`mx-auto rounded-[20px] sm:rounded-[24px] ${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`}
        style={{
          backgroundColor: dark ? "#1f2937" : "#ffffff",
          borderColor: dark ? "#374151" : "#E9E3D6",
          borderWidth: "1px",
        }}
      >
        <h2
          className={typography.playerHeading + " mb-4 sm:mb-5 md:mb-6"}
          style={{ color: textColor }}
        >
          Practice Steps
        </h2>

        <div className="flex flex-col">
          {steps.map((step, i) => (
            <StepRow
              key={step.id}
              step={step}
              isLast={i === steps.length - 1}
              dark={dark}
              textColor={textColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}