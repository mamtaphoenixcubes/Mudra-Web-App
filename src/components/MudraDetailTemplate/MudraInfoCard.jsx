"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";

export default function GyanMudraCard({ mudra }) {
  const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://192.168.1.14:1337";

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.1,
    margin: "-50px"
  });

  const headingText = mudra?.name ? `What is ${mudra.name}?` : "What is Gyan Mudra?";
  const descriptionText = mudra?.web?.IntroCardWeb?.Description || mudra?.description || "Gyan Mudra, also known as Chin Mudra, is one of the most popular and powerful mudras in yoga and meditation practices. It is believed to stimulate the root of knowledge within and connect individual consciousness to universal consciousness.";

  const introImageUrl = mudra?.web?.IntroCardWeb?.IntrocardImage?.url 
    ? `${IMAGE_BASE_URL}${mudra.web.IntroCardWeb.IntrocardImage.url}` 
    : null;

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-white py-8 sm:py-10 px-6 sm:px-10 lg:px-16 flex justify-center" 
    >
      <motion.div 
        className="w-full max-w-7xl bg-[#EDE9FE] rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        {/* Icon Circle with Image */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
          {introImageUrl ? (
            <img
              src={introImageUrl}
              alt={headingText}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <Image
              src={IMAGES.KayaMudras}
              alt={headingText}
              width={60}
              height={60}
              className="w-10 h-10 object-contain"
            />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 text-center sm:text-left">
          <h3 className="font-bold text-xl sm:text-2xl text-gray-900 mb-2">
            {headingText}
          </h3>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {descriptionText}
          </p>
        </div>

      </motion.div>
    </section>
  );
}