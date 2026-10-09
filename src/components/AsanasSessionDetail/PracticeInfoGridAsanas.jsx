"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";

// ─── Helper: normalize rich-text / string / array → string[] or string ─────
function normalizeText(value) {
  if (!value) return null;

  // Already an array of strings
  if (Array.isArray(value)) {
    // Handle Strapi rich text block array: [{ children: [{ text: "..." }] }]
    const flattened = value
      .map((item) => {
        if (typeof item === "string") return item;
        if (item?.children && Array.isArray(item.children)) {
          return item.children.map((c) => c?.text || "").join("");
        }
        if (item?.text) return item.text;
        return "";
      })
      .filter(Boolean);

    return flattened.length === 1 ? flattened[0] : flattened;
  }

  // Rich text block array wrapper
  if (value?.children && Array.isArray(value.children)) {
    return value.children.map((c) => c?.text || "").join("");
  }

  if (typeof value === "string") return value;

  return null;
}

export default function PracticeInfoGridAsanas({
  // Accept either an asana or mudra object
  asana = null,
  mudra = null,
  // Optional overrides
  bestTime: propBestTime = null,
  precautions: propPrecautions = null,
  duration: propDuration = null,
  whoCanPractice: propWho = null,
}) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.1,
    margin: "-50px",
  });

  // Prefer asana, fall back to mudra, unwrap nested data
  const rawData = asana || mudra || null;
  const data = rawData?.data || rawData;

  // ─── Resolve advice object from multiple possible locations ───────────────

  const advice =
    data?.web?.AdviceAndMethod ||
    data?.WebDetailsPage?.AdviceAndMethod ||
    data?.WebDetailsPage?.AdviceAndMethodWeb ||
    data?.adviceAndMethod ||
    null;

  // ─── Best Time ─────────────────────────────────────────────────────────────

  const bestTime =
    propBestTime ||
    normalizeText(advice?.BestPracticeTime) ||
    normalizeText(advice?.bestPracticeTime) ||
    normalizeText(advice?.bestTime) ||
    "Timing details will be updated soon.";

  // ─── Precautions ───────────────────────────────────────────────────────────

  const rawPrecautions =
    propPrecautions ||
    advice?.Precautions ||
    advice?.precautions ||
    null;

  const normalizedPrecautions = normalizeText(rawPrecautions);

  const precautions = normalizedPrecautions || [];

  // ─── Ideal Duration ────────────────────────────────────────────────────────

  const duration =
    propDuration ||
    normalizeText(advice?.IdealDuration) ||
    normalizeText(advice?.idealDuration) ||
    normalizeText(advice?.duration) ||
    "Duration details will be shared soon.";

  // ─── Who Can Practice ──────────────────────────────────────────────────────

  const who =
    propWho ||
    normalizeText(advice?.WhoCanPractice) ||
    normalizeText(advice?.whoCanPractice) ||
    normalizeText(advice?.whoCanDo) ||
    "Details for suitable participants will be added soon.";

  // ─── Layout items ──────────────────────────────────────────────────────────

  const leftItems = [
    {
      icon: IMAGES.User,
      title: "Best Time to Practice",
      desc: bestTime,
    },
    ...(precautions.length > 0
      ? [{
          icon: IMAGES.ShieldTick,
          title: "Precautions",
          desc: precautions,
        }]
      : []),
  ];

  const rightItems = [
    {
      icon: IMAGES.HourGlass,
      title: "Ideal Duration",
      desc: duration,
    },
    {
      icon: IMAGES.ReduceStress,
      title: "Who Can Practice",
      desc: who,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-10 sm:py-12 md:py-16 px-6 sm:px-10 lg:px-16 flex justify-center"
    >
      <motion.div
        className="w-full max-w-7xl bg-[#EDE9FE] rounded-2xl p-6 sm:p-8 lg:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-px bg-gray-200/80 -translate-x-1/2" />

        <div className="flex flex-col gap-8">
          {leftItems.map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-2xs">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={22}
                  height={22}
                  className="object-contain"
                />
              </div>

              <div>
                <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1">
                  {item.title}
                </h3>

                {Array.isArray(item.desc) ? (
                  <ul className="text-xs sm:text-sm text-gray-600 leading-relaxed list-disc pl-4 space-y-1">
                    {item.desc.map((line, idx) => (
                      <li key={idx}>{line}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-8">
          {rightItems.map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-2xs">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={22}
                  height={22}
                  className="object-contain"
                />
              </div>

              <div>
                <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1">
                  {item.title}
                </h3>

                {Array.isArray(item.desc) ? (
                  <ul className="text-xs sm:text-sm text-gray-600 leading-relaxed list-disc pl-4 space-y-1">
                    {item.desc.map((line, idx) => (
                      <li key={idx}>{line}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}