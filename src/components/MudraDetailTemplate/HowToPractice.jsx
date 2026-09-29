"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";

export default function HowToPractice({ mudra }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.1,
    margin: "-50px"
  });

  const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://192.168.1.14:1337";

  const staticSteps = [
    {
      number: 1,
      bg: "bg-[#FEF9C3]",
      title: "Hand Position",
      desc: "Sit in a comfortable position with your spine straight. Rest your hands on your knees.",
    },
    {
      number: 2,
      bg: "bg-[#F3E8FF]",
      title: "Finger Placement",
      desc: "Touch the tip of your index finger with the tip of your thumb.",
    },
    {
      number: 4,
      bg: "bg-[#BFDDF2]",
      title: "Other Fingers",
      desc: "Keep the remaining three fingers extended but relaxed.",
    },
    {
      number: 5,
      bg: "bg-[#FCE7F3]",
      title: "Focus",
      desc: "Close your eyes, take deep breaths, and focus on your breath or a positive affirmation.",
    },
  ];

  const apiSteps = mudra?.web?.WebPracticeSteps?.PracticeSteps?.map((step, index) => ({
    number: index === 0 ? 1 : index === 1 ? 2 : index === 2 ? 4 : 5,
    bg: ["bg-[#FEF9C3]", "bg-[#F3E8FF]", "bg-[#BFDDF2]", "bg-[#FCE7F3]"][index % 4],
    title: step.nameOfTheSteps,
    desc: step.describeTheStep,
  })) || [];

  const steps = apiSteps.length > 0 ? apiSteps : staticSteps;

  const practiceImageUrl = mudra?.web?.WebPracticeSteps?.StepImages?.[0]?.url
    ? `${IMAGE_BASE_URL}${mudra.web.WebPracticeSteps.StepImages[0].url}`
    : null;

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-white py-12 md:py-16 px-6 sm:px-10 lg:px-16" 
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading matching Figma */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-[#9A85FE] mb-2">
          How to Practice
        </h2>

        {/* Lotus Icon Graphic Divider */}
        <div className="flex items-center justify-center gap-4 max-w-xs mx-auto mb-10">
          <div className="flex-1 h-[1px] bg-gray-200" />
          <Image
            src={IMAGES.Energy}
            alt="Lotus vector"
            width={24}
            height={24}
            className="w-6 h-6 object-contain opacity-75"
          />
          <div className="flex-1 h-[1px] bg-gray-200" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left: Steps List matching Figma */}
          <div className="flex flex-col gap-6">
            {steps.map((step) => (
              <div key={step.number} className="flex items-start gap-4">
                {/* Step Circle Badge */}
                <div className={`w-9 h-9 rounded-full ${step.bg} text-gray-900 font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs`}>
                  {step.number}
                </div>

                {/* Step Text */}
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-0.5">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Practice Photo matching Figma */}
          <div className="w-full flex justify-center md:justify-end">
            <div className="w-full max-w-[540px] aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-gray-100 relative bg-gray-50">
              {practiceImageUrl ? (
                <img
                  src={practiceImageUrl}
                  alt="Practicing Mudra"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={IMAGES.Practice}
                  alt="Practicing Gyan Mudra"
                  width={600}
                  height={450}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}