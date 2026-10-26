"use client";

import Image from "next/image";
import { spacing, typography } from "../../../theme";
import { useTheme } from "../../../context/ThemeContext";
import { IMAGES } from "../../../assets/assets";

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://192.168.1.14:1331";

function resolveMediaUrl(media) {
  if (!media) return null;

  let value = null;

  if (typeof media === "string") {
    value = media;
  } else if (media.url) {
    value = media.url;
  } else {
    const formats = media.formats || {};
    value = formats.large?.url || formats.medium?.url || formats.small?.url || formats.thumbnail?.url || null;
  }

  if (!value) return null;
  if (value.startsWith("http")) return value;

  const normalizedBase = IMAGE_BASE_URL.replace(/\/+$/, "");
  const normalizedValue = value.startsWith("/") ? value : `/${value}`;
  return `${normalizedBase}${normalizedValue}`;
}

function StepRow({ step, isLast, dark, textColor }) {
  const { imageSrc, title, bg } = step;

  return (
    <div>
      <div className={`flex gap-4 sm:gap-5 md:gap-6 ${spacing.stepsItemPx}`}>
        <div className="flex flex-col items-center flex-shrink-0">
          <span
            className={spacing.stepsIconBox + " rounded-full flex items-center justify-center flex-shrink-0"}
            style={{ backgroundColor: bg }}
          >
            {imageSrc ? (
              <Image src={imageSrc} alt={title} width={32} height={32} className="w-8 h-8 object-contain" unoptimized priority={false} />
            ) : (
              <Image src={IMAGES.Energy} alt={title} width={32} height={32} className={spacing.stepsIconInner + " object-contain"} priority={false} />
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

        <div className="min-w-0 pt-1.5 sm:pt-2 pb-4 sm:pb-5 flex-1">
          <h3 className={typography.stepsTitle + " mb-1 sm:mb-1.5"} style={{ color: textColor }}>
            {title}
          </h3>
          {step.lines.filter(Boolean).map((line, i) => (
            <p key={i} className={typography.stepsBody} style={{ color: dark ? "#9ca3af" : "#8A8577" }}>
              {line}
            </p>
          ))}
        </div>
      </div>

      {!isLast && (
        <div
          className={`ml-[64px] sm:ml-[76px] md:ml-[98px] mb-4 sm:mb-5`}
          style={{ borderBottom: `1px solid ${dark ? "#374151" : "#EDEBE4"}` }}
        />
      )}
    </div>
  );
}

export default function PranaymPracticeSteps({ meditation = null }) {
  const { dark, textColor } = useTheme();
  const palette = ["#FBE3B8", "#DCEFC7", "#C7E7EF", "#E4D3F5", "#FDD7E4"];

  const steps = Array.isArray(meditation?.practiceSteps) && meditation.practiceSteps.length > 0
    ? meditation.practiceSteps.map((step, index) => ({
        id: step.id || index + 1,
        title: `${index + 1}. ${step.nameOfTheSteps || `Step ${index + 1}`}`,
        lines: [step.describeTheStep || step.description || "No data available."].filter(Boolean),
        imageSrc: resolveMediaUrl(step.stepIcon) || IMAGES.Energy,
        bg: palette[index % palette.length],
      }))
    : [{
        id: 1,
        title: "1. No data available",
        lines: ["No practice steps available."],
        imageSrc: IMAGES.Energy,
        bg: "#F3F4F6",
      }];

  return (
    <div className={`w-full ${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`} style={{ backgroundColor: dark ? "#111827" : "#ffffff" }}>
      <div className={`mx-auto rounded-[20px] sm:rounded-[24px] ${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`} style={{ backgroundColor: dark ? "#1f2937" : "#ffffff", borderColor: dark ? "#374151" : "#E9E3D6", borderWidth: "1px" }}>
        <h2 className={typography.playerHeading + " mb-4 sm:mb-5 md:mb-6"} style={{ color: textColor }}>
          Pranayama — Practice Steps
        </h2>

        <div className="flex flex-col">
          {steps.map((step, i) => (
            <StepRow key={step.id} step={step} isLast={i === steps.length - 1} dark={dark} textColor={textColor} />
          ))}
        </div>
      </div>
    </div>
  );
}