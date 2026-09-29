"use client";

import Image from "next/image";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { IMAGES } from "../../assets/assets";

const features = [
  {
    icon: IMAGES.HeadPhone,
    title: "100+ Guided Sessions",
    desc: "For every mood, need and life stage.",
  },
  {
    icon: IMAGES.Personalized,
    title: "Personalized for You",
    desc: "Recommendations based on your goals and preferences.",
  },
  {
    icon: IMAGES.OfflineAccess,
    title: "Offline Access",
    desc: "Download and practice anytime anywhere.",
  },
  {
    icon: IMAGES.SleepBetter,
    title: "Integrated Experience",
    desc: "Yoga Nidra Mudras for deeper results.",
  },
];

export default function UnlockYogaNidra() {
  const router = useRouter();
  const sectionRef = useRef(null);

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-white py-12 md:py-16 px-6 sm:px-10 lg:px-16" 
    >
      <div className="max-w-7xl mx-auto bg-[#F3E8FF] rounded-3xl p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
        
        {/* Col 1: Photo thumbnail */}
        <div className="lg:col-span-3 w-full aspect-square rounded-2xl overflow-hidden shadow-xs shrink-0">
          {IMAGES.UnlockYogaNidra ? (
            <Image
              src={IMAGES.UnlockYogaNidra}
              alt="Yoga Nidra practice"
              width={350}
              height={350}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-200 to-pink-200" />
          )}
        </div>

        {/* Col 2: Title, body, and action buttons */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2.5 leading-tight">
            Unlock the Full Yoga Nidra Experience
          </h2>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
            Access the complete library with 100 guided sessions, personalized recommendations, duration choices, downloads and more.
          </p>

          <div className="flex flex-row items-center gap-3 flex-wrap">
            <button 
              onClick={() => router.push("/AppDownload")}
              className="bg-black text-white px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm hover:bg-gray-900 transition-colors shadow-xs cursor-pointer"
            >
              Open in Mudras App
            </button>
            
            <button 
              className="bg-white text-gray-900 border border-gray-200 px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm hover:bg-gray-50 transition-colors shadow-2xs cursor-pointer"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Thin vertical line divider on desktop matching Figma */}
        <div className="hidden lg:block absolute left-[64%] top-8 bottom-8 w-px bg-purple-200/80" />

        {/* Col 3: 4 Feature items matching Figma */}
        <div className="lg:col-span-4 flex flex-col justify-center gap-5 lg:pl-6">
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-3.5">
              {/* White Circle Icon */}
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                {f.icon ? (
                  <Image
                    src={f.icon}
                    alt={f.title}
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain"
                  />
                ) : (
                  <span className="w-4 h-4 bg-gray-400 rounded-full" />
                )}
              </div>

              {/* Text */}
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-0.5">
                  {f.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-600 leading-snug">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}