"use client";

import Image from "next/image";
import { IMAGES } from "../../assets/assets";

const BENEFITS = [
  { title: "Reduce Stress",       description: "Clam your mind and release daily stress and tension.", image: IMAGES.ReduceStress,      bgColor: "bg-[#FEF9C3]" },
  { title: "Sleep Better",        description: "Experience deep, restorative sleep naturally.",         image: IMAGES.SleepBetter,       bgColor: "bg-[#F3E8FF]" },
  { title: "Improve Focus",       description: "Enhance clarity, focus and mental performance.",        image: IMAGES.ImproveFocus,      bgColor: "bg-[#E0F2FE]" },
  { title: "Emotional Balance",   description: "Manage emotions and cultivate inner peace.",            image: IMAGES.EmotionalBalance,  bgColor: "bg-[#FCE7F3]" },
  { title: "Holistic Well-being", description: "Balance body, mind and energy for lasting well-being.",  image: IMAGES.HolisticWellbeing, bgColor: "bg-[#DCFCE7]" },
];

export default function BenefitsSection() {
  return (
    <section className="w-full py-16 md:py-20 bg-white px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
            BENEFITS
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ color: "#9A85FE" }}>
            Transform Your Life. Naturally.
          </h2>
        </div>

        {/* 5 Items Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {BENEFITS.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              {/* Circle Icon */}
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-4 shrink-0 ${item.bgColor}`}>
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={36}
                    height={36}
                    className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                  />
                )}
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 leading-tight">
                {item.title}
              </h3>

              {/* Text */}
              <p className="text-xs text-gray-600 font-medium leading-relaxed max-w-[200px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}