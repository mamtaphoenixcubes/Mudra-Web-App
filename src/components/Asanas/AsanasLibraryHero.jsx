"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";

export default function AsanasLibraryHero() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-12 md:py-16 lg:py-20 px-6 sm:px-10 lg:px-16"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] items-center gap-8 lg:gap-12">

        {/* LEFT COLUMN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start w-full justify-center"
        >
          {/* Main Title */}
          <h1
            className="text-4xl sm:text-5xl lg:text-[64px] font-medium tracking-normal mb-2 leading-[1.2]"
            style={{
              color: "#9A85FE",
              fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
            }}
          >
            Mudra Library
          </h1>

          {/* Underline accent */}
          <div className="w-16 h-[3px] bg-[#9A85FE] mb-5 rounded-full" />

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-gray-900 font-semibold mb-6 max-w-lg leading-relaxed">
            Explore powerful hand gestures.
            <br />
            Simple to learn. Profound in effect.
          </p>

          {/* Info Card Banner */}
          <div className="rounded-xl p-4 sm:p-5 flex flex-row items-center gap-4 bg-[#EDE9FE] max-w-md">
            <div className="w-10 h-10 shrink-0 flex items-center justify-center text-[#9A85FE]">
              <Image
                src={IMAGES.MudraIcon || IMAGES.Energy}
                alt="Lotus icon"
                width={36}
                height={36}
                className="w-8 h-8 object-contain"
              />
            </div>
            <div className="text-xs sm:text-sm text-gray-900 font-medium leading-relaxed">
              <p>This is a simplified library.</p>
              <p>For complete details, guided practices</p>
              <p>and personalization, try the Mudras App.</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN — Lotus illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center md:justify-end items-center"
        >
          <div className="relative w-full max-w-[440px] lg:max-w-[500px]">
            <Image
              src={IMAGES.hero}
              alt="Mudra Lotus Hand"
              priority
              className="w-full h-auto object-contain"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}