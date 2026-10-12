"use client";

import Image from "next/image";
import { spacing, typography } from "../../theme";
import { useTheme } from "../../context/ThemeContext";
import { IMAGES } from "../../assets/assets";

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://192.168.1.14:1337";
const FALLBACK_BG = ["#FBE3B8", "#E4D3F5", "#DCEFC7", "#C7E7EF"];

function getImageUrl(value) {
  if (!value) return null;

  if (typeof value === "string") {
    if (value.startsWith("http") || value.startsWith("data:")) {
      return value;
    }
    return `${IMAGE_BASE_URL}${value}`;
  }

  if (Array.isArray(value)) {
    return value[0]?.url ? getImageUrl(value[0].url) : null;
  }

  if (value?.url) {
    return getImageUrl(value.url);
  }

  return null;
}

function normalizeSteps(asana) {
  const source = asana?.data || asana || {};

  const rawSteps =
    source.web?.WebPracticeSteps?.PracticeSteps ||
    source.WebDetailsPage?.WebPracticeSteps?.PracticeSteps ||
    source.WebDetailsPage?.PracticeSteps ||
    source.practiceSteps ||
    source.web?.HowToPractice?.steps ||
    [];

  if (!Array.isArray(rawSteps) || rawSteps.length === 0) {
    return [];
  }

  return rawSteps.map((step, index) => {
    const title = step?.nameOfTheSteps || step?.name || step?.title || step?.Name || `Step ${index + 1}`;
    const description =
      step?.describeTheStep ||
      step?.description ||
      step?.desc ||
      step?.Description ||
      "A mindful and focused part of the practice.";

    return {
      id: step?.id || index + 1,
      title: `${index + 1}. ${title}`,
      lines: Array.isArray(step?.lines) && step.lines.length > 0 ? step.lines : [description],
      imageSrc: getImageUrl(step?.image || step?.icon || step?.imageUrl) || IMAGES.Energy,
      bg: FALLBACK_BG[index % FALLBACK_BG.length],
    };
  });
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
            <Image
              src={imageSrc}
              alt={title}
              width={32}
              height={32}
              className={spacing.stepsIconInner + " object-contain"}
              priority={false}
            />
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
          {step.lines.map((line, i) => (
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

export default function AsanasPracticeSteps({ asana = null, steps: propSteps = null }) {
  const { dark, textColor } = useTheme();
  const steps = propSteps && propSteps.length ? propSteps : normalizeSteps(asana);

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
        <h2 className={typography.playerHeading + " mb-4 sm:mb-5 md:mb-6"} style={{ color: textColor }}>
          Asanas & Meditation — Practice Steps
        </h2>

        {steps.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center text-sm text-gray-500">
            Practice steps will be available soon.
          </div>
        ) : (
          <div className="flex flex-col">
            {steps.map((step, i) => (
              <StepRow key={step.id} step={step} isLast={i === steps.length - 1} dark={dark} textColor={textColor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}