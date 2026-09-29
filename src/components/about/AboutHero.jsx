"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";

export default function AboutHero() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const scrollToPhilosophy = () => {
    const el = document.getElementById("our-philosophy");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

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
          {/* Section Label */}
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
            THE PROBLEM
          </p>

          {/* Main Title (Guaranteed 3 lines matching Figma exact layout) */}
          <h1
            className="text-3xl sm:text-4xl lg:text-[48px] xl:text-[54px] 2xl:text-[58px] font-medium tracking-normal mb-4 leading-[1.2]"
            style={{
              color: "#9A85FE",
              fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
            }}
          >
            <span className="block md:whitespace-nowrap">The smallest gesture</span>
            <span className="block md:whitespace-nowrap">becomes a doorway</span>
            <span className="block md:whitespace-nowrap">to deep transformation.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-gray-900 font-semibold mb-8 max-w-lg leading-relaxed">
            At Mudras, we blend ancient wisdom with modern science to help you restore balance, reduce stress, and live with clarity and purpose.
          </p>

          {/* Action Button */}
          <button
            onClick={scrollToPhilosophy}
            className="px-6 py-3 rounded-lg font-semibold text-xs sm:text-sm text-white shadow-xs hover:bg-[#8B74F6] transition-all cursor-pointer"
            style={{ backgroundColor: "#9A85FE" }}
          >
            Our Philosophy
          </button>
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