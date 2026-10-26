"use client";

import Image from "next/image";
import { Leaf, BarChart2, Hand } from "lucide-react";
import { spacing, typography } from "../../../theme";
import { useTheme } from "../../../context/ThemeContext";

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

function MetaItem({ icon, label, value, dark, textColor }) {
  return (
    <div className="flex items-center gap-2">
      <span style={{ color: dark ? "#9ca3af" : "#8A8577" }}>{icon}</span>
      <div className="leading-tight">
        <p className="text-[10px] md:text-[11px] lg:text-xs" style={{ color: dark ? "#9ca3af" : "#8A8577" }}>
          {label}
        </p>
        <p className="text-[12px] md:text-[13px] lg:text-sm font-medium" style={{ color: textColor }}>
          {value || "No data available"}
        </p>
      </div>
    </div>
  );
}

export default function PranaymCardHero({ meditation = null }) {
  const { dark, textColor } = useTheme();
  const item = meditation || {};
  const imageUrl = resolveMediaUrl(item.bannerImage || item.thumbnail || item.image?.[0] || item.introCard?.introCardImage || null);
  const tags = Array.from(
    new Set(
      [
        ...((item.categories || []).map((cat) => cat?.Name || cat?.name).filter(Boolean)),
        ...((item.intentions || []).map((intention) => intention?.name).filter(Boolean)),
      ]
    )
  ).slice(0, 4);

  return (
    <div
      className={`w-full ${spacing.sectionPaddingX} ${spacing.sectionPaddingY}`}
      style={{ backgroundColor: dark ? "#111827" : "#ffffff" }}
    >
      <div className="mx-auto rounded-[24px] overflow-hidden">
        <div className="text-center pt-5 pb-4 md:pt-6 md:pb-5 lg:pt-8 lg:pb-15">
          <h2 className={`${typography.sectionHeading}`} style={{ color: textColor }}>
            Pranayama
          </h2>
        </div>

        <div className="px-4 pb-5 md:px-6 md:pb-6 lg:px-8 lg:pb-8">
          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] lg:grid-cols-[350px_1fr] gap-4 md:gap-6 lg:gap-8 items-start">
            <div>
              <div
                className="relative rounded-[18px] overflow-hidden aspect-[4/3] md:aspect-[3/3] lg:aspect-[4/4]"
                style={{ backgroundColor: dark ? "#374151" : "#EDE7FE" }}
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={item.name || "Pranayama"}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
                    No image available
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3 md:space-y-4 lg:space-y-5">
              <h3 className={`${typography.playerHeading}`} style={{ color: textColor }}>
                {item.name || "No data available"}
              </h3>

              <p className="text-[12px] md:text-[13px] lg:text-[15px] -mt-2" style={{ color: dark ? "#9ca3af" : "#B7B0A0" }}>
                {item.chakra || item.type || "Breathing practice"}
              </p>

              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {tags.length > 0 ? (
                  tags.map((tag, idx) => (
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
                  ))
                ) : (
                  <span
                    className="text-[10px] md:text-[11px] lg:text-md px-2.5 py-0.5 md:px-3 md:py-1 rounded-full border"
                    style={{
                      borderColor: dark ? "#4b5563" : "#E4DECE",
                      color: dark ? "#d1d5db" : "#5C574C",
                      backgroundColor: dark ? "#111827" : "#FBF9F5",
                    }}
                  >
                    No tags available
                  </span>
                )}
              </div>

              <p className="text-[13px] md:text-[14px] lg:text-[19px] leading-relaxed" style={{ color: dark ? "#9ca3af" : "#8A8577" }}>
                {item.description || "No data available."}
              </p>

              <div className="flex items-center gap-3 md:gap-4 lg:gap-6 pt-1 md:pt-2">
                <MetaItem icon={<Leaf size={16} />} label="Element" value={item.element} dark={dark} textColor={textColor} />
                <div className="w-px h-7 md:h-9" style={{ backgroundColor: dark ? "#374151" : "#E9E3D6" }} />
                <MetaItem icon={<BarChart2 size={16} />} label="Level" value={item.level} dark={dark} textColor={textColor} />
                <div className="w-px h-7 md:h-8" style={{ backgroundColor: dark ? "#374151" : "#E9E3D6" }} />
                <MetaItem icon={<Hand size={16} />} label="Type" value={item.type} dark={dark} textColor={textColor} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}