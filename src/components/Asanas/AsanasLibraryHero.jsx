"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";

export default function AsanasLibraryHero() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, {
        once: true,
        amount: 0.1,
        margin: "-50px"
    });

    return (
        <section
            ref={sectionRef}
            className="w-full bg-white py-12 md:py-16 px-6 sm:px-10 lg:px-16"
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

                {/* LEFT CONTENT */}
                <div className="flex flex-col items-start">

                    {/* Heading */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#9A85FE] tracking-tight mb-2">
                        Yoga Asanas Library
                    </h1>

                    {/* Underline */}
                    <div className="w-12 h-[3px] bg-[#9A85FE] mb-4" />

                    {/* ✅ UPDATED Subtitle — Asanas Library related */}
                    <p className="text-sm sm:text-base lg:text-lg text-gray-700 font-medium leading-relaxed mb-6 max-w-xl">
                        Move with intention. Align with awareness. Explore a curated library of yoga asanas for every posture, purpose, and level of practice.
                    </p>

                    {/* Info Card Banner */}
                    <div className="bg-[#EDE9FE] rounded-2xl p-4 sm:p-5 flex items-start sm:items-center gap-4 max-w-lg w-full">
                        {/* Icon container */}
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-2xs">
                            <Image
                                src={IMAGES.Energy}
                                alt="Asanas Library icon"
                                width={24}
                                height={24}
                                className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                            />
                        </div>

                        {/* ✅ UPDATED Text content — Asanas Library related */}
                        <div className="flex flex-col gap-0.5">
                            <p className="font-bold text-xs sm:text-sm text-gray-900">
                                This is a preview library
                            </p>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                For the full experience with complete asana guides, step-by-step alignment cues, and personalized sequences, try the Mudras App
                            </p>
                        </div>
                    </div>

                </div>

                {/* RIGHT GRAPHIC: Lotus hand illustration */}
                <div className="w-full flex justify-center md:justify-end">
                    <div className="w-full max-w-[480px] aspect-[4/3] relative flex items-center justify-center">
                        <Image
                            src={IMAGES.hero}
                            alt="Yoga Asanas Lotus Hand"
                            priority
                            width={500}
                            height={400}
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}