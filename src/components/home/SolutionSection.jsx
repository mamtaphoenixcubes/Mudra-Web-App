"use client";

import Image from "next/image";
import { IMAGES } from "../../assets/assets";

const solutions = [
  {
    title: "Mudras",
    description: "Simple hand gestures to activate energy, restore balance and enhance well-being.",
    iconBg: "bg-[#DCFCE7]",
    icon: IMAGES.Mudras,
  },
  {
    title: "Yoga Nidra",
    description: "Guided deep relaxation for stress relief, healing and restful sleep.",
    iconBg: "bg-[#FCE7F3]",
    icon: IMAGES.YogaNidra,
  },
  {
    title: "Elements",
    description: "Balance the five elements within to bring harmony to your life.",
    iconBg: "bg-[#E0F2FE]",
    icon: IMAGES.Elements,
  },
];

export default function SolutionSection() {
  return (
    <section className="w-full py-16 md:py-20 bg-white px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
            THE SOLUTION
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3" style={{ color: "#9A85FE" }}>
            Ancient Practices. Holistic Balance.
          </h2>
          <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto font-medium leading-relaxed">
            Mudras + Yoga Nidra + Elements work together to restore
            <br className="hidden sm:inline" />
            balance to your body, mind and energy.
          </p>
        </div>

        {/* 3 Items Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative items-center">
          {solutions.map((item, i) => (
            <div key={i} className="relative flex items-center gap-4 px-4">
              {/* Icon Circle */}
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shrink-0 ${item.iconBg}`}>
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={36}
                  height={36}
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Vertical line divider for desktop */}
              {i < solutions.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-gray-200" />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}