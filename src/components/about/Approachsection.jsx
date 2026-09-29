"use client";

import Image from "next/image";
import { IMAGES } from "../../assets/assets";

const approaches = [
  {
    id: "mudras",
    title: "Mudras",
    description:
      "Sacred hand gestures that channel energy, balance the elements, and activate your body's natural healing abilities",
    bullets: [
      "Sacred hand gestures that channel energy.",
      "Sacred hand gestures that channel energy.",
      "Sacred hand gestures that channel energy.",
    ],
    image: IMAGES.MudrasAbout || IMAGES.Mudras,
    imageAlt: "Mudras",
  },
  {
    id: "yoga-nidra",
    title: "Yoga Nidra",
    description:
      "A guided state of conscious relaxation that calms the mind, heals the body, and restores inner harmony.",
    bullets: [
      "A guided state of conscious relaxation.",
      "A guided state of conscious relaxation.",
      "A guided state of conscious relaxation.",
    ],
    image: IMAGES.YogaNidraAbout || IMAGES.YogaNidra,
    imageAlt: "Yoga Nidra",
  },
];

export default function ApproachSection() {
  return (
    <section className="w-full py-16 md:py-20 bg-white px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
            OUR APPROACH
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3" style={{ color: "#9A85FE" }}>
            Intro to Mudras & Yoga Nidra
          </h2>
          <p className="text-sm sm:text-base text-gray-800 font-bold leading-relaxed">
            Ancient practices. Holistic healing. Everyday transformation.
          </p>
        </div>

        {/* 2 Columns Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative items-center">
          {approaches.map((item, index) => (
            <div key={item.id} className="relative flex items-start gap-5 px-4">
              
              {/* Circular Photo */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shrink-0 bg-gray-100 border border-gray-200">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 font-medium mb-3 leading-relaxed">
                  {item.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-1.5">
                  {item.bullets.map((b, i) => (
                    <li key={i} className="text-xs text-gray-500 font-medium flex items-start gap-2 leading-tight">
                      <span className="text-gray-400 font-bold">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Vertical line divider for desktop */}
              {index === 0 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-36 bg-gray-200" />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}