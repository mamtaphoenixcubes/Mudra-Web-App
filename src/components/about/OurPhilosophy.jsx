"use client";

import Image from "next/image";
import { IMAGES } from "../../assets/assets";

const pillars = [
  {
    title: "Rooted in Tradition",
    description: "Practices from ancient India, passed down for thousands of years.",
    image: IMAGES.RootedInTradition,
  },
  {
    title: "Backed by Science",
    description: "Supported by modern research and holistic understanding.",
    image: IMAGES.BackedByScience,
  },
  {
    title: "Designed for Today",
    description: "Simple, practical tools that fit into your modern lifestyle.",
    image: IMAGES.DesignedForToday,
  },
  {
    title: "For Everyone",
    description: "No matter where you are on your journey, balance is within your reach.",
    image: IMAGES.ForEveryone,
  },
];

export default function OurPhilosophy() {
  return (
    <section id="our-philosophy" className="w-full py-16 md:py-20 bg-[#EDE9FE] px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
            OUR PHILOSOPHY
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ color: "#9A85FE" }}>
            Ancient Wisdom. Modern Life. Real Transformation.
          </h2>
          <p className="text-sm sm:text-base text-gray-800 font-bold max-w-2xl mx-auto leading-relaxed">
            We believe true well-being comes from aligning body, mind, and
            <br className="hidden sm:inline" />
            energy. Mudras, Yoga Nidra and the five elements work together to
            <br className="hidden sm:inline" />
            help you live a balanced, mindful and fulfilling life
          </p>
        </div>

        {/* 4 Pillars Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative">
          {pillars.map((item, i) => (
            <div key={i} className="relative flex flex-col items-center text-center px-4">
              
              {/* Circular Photo */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-4 shrink-0 bg-white shadow-xs border border-purple-100">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug">
                {item.title}
              </h3>

              {/* Text */}
              <p className="text-xs text-gray-600 font-medium leading-relaxed max-w-[200px]">
                {item.description}
              </p>

              {/* Vertical divider */}
              {i < pillars.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-32 bg-purple-300/50" />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}