"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";

export default function WorksHero() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-12 md:py-16 lg:py-20 px-6 sm:px-10 lg:px-16"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10 lg:gap-16">

        {/* LEFT COLUMN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start w-full max-w-[644px] min-h-[444px] justify-center rounded-[6px]"
        >
          {/* Main Title */}
          <h1
            className="text-4xl sm:text-5xl lg:text-[64px] font-medium tracking-normal mb-4 leading-[120%]"
            style={{
              color: "#9A85FE",
              fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
            }}
          >
            What Are Mudras?
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-gray-900 font-semibold mb-6 max-w-md leading-relaxed">
            Mudras are sacred gestures, postures and locks that channel the body's energy to bring harmony to body, mind and spirit.
          </p>

          {/* Quote Card */}
          <div className="bg-[#EDE9FE] border-l-4 border-[#9A85FE] rounded-r-xl p-4 sm:p-5 max-w-md text-gray-800 font-medium text-xs sm:text-sm leading-relaxed shadow-xs">
            <p className="italic text-gray-700 mb-1">
              "A mudra may be small in form, but its impact is vast.
            </p>
            <p className="italic text-gray-700">
              It is the language of energy. It transforms within."
            </p>
          </div>
        </motion.div>

        {/* RIGHT COLUMN — Lotus illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center md:justify-end items-center"
        >
          <div className="relative w-full max-w-[460px] lg:max-w-[520px]">
            <Image
              src={IMAGES.hero}
              alt="Mudra Hand"
              priority
              className="w-full h-auto object-contain"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}