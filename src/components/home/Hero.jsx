"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
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
          className="flex flex-col items-start"
        >
          {/* Main Title */}
          <h1
            className="text-4xl sm:text-5xl lg:text-[64px] font-medium tracking-normal mb-4 leading-[120%]"
            style={{
              color: "#9A85FE",
              fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
            }}
          >
            Balance Within.
            <br />
            Transform Life.
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-gray-900 font-semibold mb-8 max-w-md leading-relaxed">
            Ancient wisdom. Modern life.
            <br />
            Mudras, Yoga Nidra & Elements for
            <br />
            deep balance and lasting well-being
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <button
              onClick={() => router.push("/SignUp")}
              className="px-6 py-3 rounded-md font-semibold text-xs sm:text-sm text-white shadow-xs hover:bg-[#8B74F6] transition-all cursor-pointer"
              style={{ backgroundColor: "#9A85FE" }}
            >
              Start Your Journey
            </button>
            <button
              onClick={() => router.push("/WhatareMudras")}
              className="px-6 py-3 rounded-md font-semibold text-xs sm:text-sm text-gray-800 border border-gray-400 bg-white hover:bg-gray-50 transition-all cursor-pointer"
            >
              Explore How It Works
            </button>
          </div>

          {/* Trust Checklist Row (Exact Checkmark Cards) */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
            {/* Box 1 */}
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-xs border border-gray-400 flex items-center justify-center text-gray-700 text-xs font-bold shrink-0">
                ✓
              </div>
              <div className="text-left">
                <p className="text-[11px] text-gray-600 font-medium leading-none mb-0.5">
                  Trusted by
                </p>
                <p className="text-xs font-bold text-gray-900 leading-none">
                  10K+ users
                </p>
              </div>
            </div>

            {/* Box 2 */}
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-xs border border-gray-400 flex items-center justify-center text-gray-700 text-xs font-bold shrink-0">
                ✓
              </div>
              <div className="text-left">
                <p className="text-[11px] text-gray-600 font-medium leading-none mb-0.5">
                  Ancient wisdom
                </p>
                <p className="text-xs font-bold text-gray-900 leading-none">
                  Modern science
                </p>
              </div>
            </div>

            {/* Box 3 */}
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-xs border border-gray-400 flex items-center justify-center text-gray-700 text-xs font-bold shrink-0">
                ✓
              </div>
              <div className="text-left">
                <p className="text-[11px] text-gray-600 font-medium leading-none mb-0.5">
                  Simple, Practical,
                </p>
                <p className="text-xs font-bold text-gray-900 leading-none">
                  Powerful.
                </p>
              </div>
            </div>
          </div>

        </motion.div>

        {/* RIGHT COLUMN — Hero lotus vector illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center md:justify-end items-center"
        >
          <div className="relative w-full max-w-[460px] lg:max-w-[520px]">
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