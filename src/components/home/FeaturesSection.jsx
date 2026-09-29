"use client";

import Image from "next/image";
import { IMAGES } from "../../assets/assets";

const features = [
  {
    title: "Mudra Library",
    description: "Learn and practice powerful mudras for every need.",
    image: IMAGES.MudraLibrary
  },
  {
    title: "Yoga Nidra",
    description: "Guided sessions for sleep, healing, stress relief and more.",
    image: IMAGES.YogaNidraFeature
  },
  {
    title: "Element Tracker",
    description: "Tracker and balance the five elements within you.",
    image: IMAGES.ElementTracker
  },
  {
    title: "Personalized plans",
    description: "Customized routines based on your goals and needs.",
    image: IMAGES.PersonalizedPlans
  },
  {
    title: "Daily Guidance",
    description: "Mudra of the day and reminders to stay consistent.",
    image: IMAGES.DailyGuidance
  },
  {
    title: "Track Progress",
    description: "Monitor your journey and transformation over time.",
    image: IMAGES.TrackProgress
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full py-16 md:py-20 bg-[#EDE9FE] px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
            KEY FEATURES
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ color: "#9A85FE" }}>
            Everything You Need For Inner Balance
          </h2>
        </div>

        {/* 6 Features Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6 relative">
          {features.map((item, i) => (
            <div key={i} className="relative flex flex-col items-center text-center px-2">
              {/* Thumbnail */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden mb-3 bg-white/70 shadow-xs border border-purple-100 shrink-0">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Title */}
              <h3 className="text-sm font-bold text-gray-900 mb-1 leading-snug">
                {item.title}
              </h3>

              {/* Text */}
              <p className="text-[11px] text-gray-600 font-medium leading-relaxed">
                {item.description}
              </p>

              {/* Vertical divider */}
              {i < features.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-28 bg-purple-300/50" />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}