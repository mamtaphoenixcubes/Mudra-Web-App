"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";

export default function PracticeInfoGrid({ mudra }) {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { 
        once: true, 
        amount: 0.1,
        margin: "-50px"
    });

    const bestTime = mudra?.web?.AdviceAndMethod?.BestPracticeTime || "Early morning (Brahma Muhurta) or during meditation sessions.";
    const precautions = mudra?.web?.AdviceAndMethod?.Precautions || [
        "Practice on an empty stomach.",
        "Keep your back straight while practicing.",
        "If you have any medical condition, consult your doctor.",
    ];
    const duration = mudra?.web?.AdviceAndMethod?.IdealDuration || "15-30 minutes daily for best results.";
    const who = mudra?.web?.AdviceAndMethod?.WhoCanPractice || "Anyone can practice Gyan Mudra. It is especially beneficial for students, professionals, and anyone seeking mental clarity.";

    const leftItems = [
        {
            icon: IMAGES.User,
            title: "Best Time to Practice",
            desc: bestTime,
        },
        {
            icon: IMAGES.ShieldTick,
            title: "Precautions",
            desc: precautions,
        },
    ];

    const rightItems = [
        {
            icon: IMAGES.HourGlass,
            title: "Ideal Duration",
            desc: duration,
        },
        {
            icon: IMAGES.ReduceStress,
            title: "Who Can Practice",
            desc: who,
        },
    ];

    return (
        <section 
            ref={sectionRef}
            className="w-full bg-white py-10 sm:py-12 md:py-16 px-6 sm:px-10 lg:px-16 flex justify-center" 
        >
            <div className="w-full max-w-7xl bg-[#EDE9FE] rounded-2xl p-6 sm:p-8 lg:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative">
                
                {/* Thin vertical line divider on desktop matching Figma */}
                <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-px bg-gray-200/80 -translate-x-1/2" />

                {/* Left Column */}
                <div className="flex flex-col gap-8">
                    {leftItems.map((item, i) => (
                        <div key={i} className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-2xs">
                                <Image
                                    src={item.icon}
                                    alt={item.title}
                                    width={22}
                                    height={22}
                                    className="object-contain"
                                />
                            </div>
                            <div>
                                <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1">
                                    {item.title}
                                </h3>
                                {Array.isArray(item.desc) ? (
                                    <ul className="text-xs sm:text-sm text-gray-600 leading-relaxed list-disc pl-4 space-y-1">
                                        {item.desc.map((line, idx) => (
                                            <li key={idx}>
                                                {line}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                        {item.desc}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-8">
                    {rightItems.map((item, i) => (
                        <div key={i} className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-2xs">
                                <Image
                                    src={item.icon}
                                    alt={item.title}
                                    width={22}
                                    height={22}
                                    className="object-contain"
                                />
                            </div>
                            <div>
                                <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1">
                                    {item.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}