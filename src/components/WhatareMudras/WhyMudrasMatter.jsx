"use client";

import Image from "next/image";
import { IMAGES } from "../../assets/assets";

const items = [
  {
    title: "Body",
    icon: IMAGES.Body,
    description: "Regulate the nervous system, improve health and support the natural healing process.",
    iconBg: "bg-[#DCFCE7]",
  },
  {
    title: "Breath",
    icon: IMAGES.Breath,
    description: "Guide and deepen breath, increasing vitality and calm.",
    iconBg: "bg-[#FCE7F3]",
  },
  {
    title: "Mind",
    icon: IMAGES.Mind,
    description: "Calm thoughts, improve focus, and create mental clarity.",
    iconBg: "bg-[#E0F2FE]",
  },
  {
    title: "Energy",
    icon: IMAGES.Energy,
    description: "Balance the elements and chakras, awakening inner energy.",
    iconBg: "bg-[#F3E8FF]",
  },
];

export default function WhyMudrasMatter() {
  return (
    <section className="w-full py-16 md:py-20 bg-white px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
            WHY MUDRAS MATTER
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3" style={{ color: "#9A85FE" }}>
            Small Gestures. Profound Impact.
          </h2>
          <p className="text-sm sm:text-base text-gray-700 font-semibold max-w-2xl mx-auto leading-relaxed">
            Mudras are simple yet powerful tools to restore balance, enhance well-being and support transformation at every level.
          </p>
        </div>

        {/* 4 Items Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative">
          {items.map((item, i) => (
            <div key={i} className="relative flex flex-col items-center text-center px-4">
              
              {/* Circular Icon Container */}
              <div className={`w-16 h-16 rounded-full ${item.iconBg} flex items-center justify-center mb-4 shrink-0 shadow-xs`}>
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug">
                {item.title}
              </h3>

              {/* Text */}
              <p className="text-xs text-gray-600 font-medium leading-relaxed max-w-[220px]">
                {item.description}
              </p>

              {/* Vertical divider */}
              {i < items.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-28 bg-gray-200" />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}