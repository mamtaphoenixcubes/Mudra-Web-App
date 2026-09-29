"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { mudraService } from "../../services/apiService";

const staticRelated = [
  {
    title: "Chin Mudra",
    description: "Enhances mental clarity and concentration.",
    bg: "bg-[#FEF9C3]",
    image: IMAGES.Mind,
    isRemote: false,
    href: "/MudraDetailTemplate?id=1",
  },
  {
    title: "Dhyana Mudra",
    description: "Promotes meditation and inner peace.",
    bg: "bg-[#F3E8FF]",
    image: IMAGES.ManaMudras,
    isRemote: false,
    href: "/MudraDetailTemplate?id=2",
  },
  {
    title: "Prana Mudra",
    description: "Boosts vitality and immunity.",
    bg: "bg-[#BFDDF2]",
    image: IMAGES.HolisticWellbeing,
    isRemote: false,
    href: "/MudraDetailTemplate?id=3",
  },
  {
    title: "Vayu Mudra",
    description: "Helps balance the air element.",
    bg: "bg-[#FCE7F3]",
    image: IMAGES.KayaMudras,
    isRemote: false,
    href: "/MudraDetailTemplate?id=4",
  },
];

function Card({ item, index }) {
  const isHex = item.bg?.startsWith("#");

  return (
    <div
      className={`
        ${isHex ? "" : item.bg} rounded-2xl p-6
        min-h-[220px] flex flex-col items-center text-center
        w-full h-full shadow-2xs transition-transform hover:-translate-y-1
      `}
      style={{
        backgroundColor: isHex ? item.bg : undefined,
      }}
    >
      <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 mb-4 shadow-2xs overflow-hidden">
        {item.isRemote ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-7 h-7 object-contain"
          />
        ) : (
          <Image
            src={item.image}
            alt={item.title}
            width={28}
            height={28}
            className="w-7 h-7 object-contain"
          />
        )}
      </div>

      <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1.5">
        {item.title}
      </h3>
      
      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
        {item.description}
      </p>

      <div className="mt-auto">
        <Link
          href={item.href}
          className="text-xs sm:text-sm font-semibold text-gray-800 hover:text-[#9A85FE] transition-colors inline-flex items-center gap-1"
        >
          View Mudra &rarr;
        </Link>
      </div>
    </div>
  );
}

export default function RelatedMudras({ currentId }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.05,
    margin: "-50px"
  });

  const [related, setRelated] = useState([]);

  useEffect(() => {
    async function fetchRelated() {
      const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://192.168.1.14:1337";
      try {
        const json = await mudraService.getAllMudras();
        let rawList = [];
        if (json && Array.isArray(json)) {
          rawList = json;
        } else if (json && json.success && Array.isArray(json.data)) {
          rawList = json.data;
        } else if (json && json.success && json.data && Array.isArray(json.data.data)) {
          rawList = json.data.data;
        }

        const filtered = rawList
          .filter(item => item.id !== currentId && item.documentId !== currentId)
          .slice(0, 4)
          .map((item, index) => {
            let iconUrl = null;
            if (item.web?.IntroCardWeb?.IntrocardImage?.url) {
              iconUrl = `${IMAGE_BASE_URL}${item.web.IntroCardWeb.IntrocardImage.url}`;
            } else if (item.thumbnail?.url) {
              iconUrl = `${IMAGE_BASE_URL}${item.thumbnail.url}`;
            }

            return {
              title: item.name,
              description: item.web?.IntroCardWeb?.Description || item.description || "Enhances mental clarity and concentration.",
              bg: ["bg-[#FEF9C3]", "bg-[#F3E8FF]", "bg-[#BFDDF2]", "bg-[#FCE7F3]"][index % 4],
              image: iconUrl || IMAGES.Mind,
              isRemote: !!iconUrl,
              href: `/MudraDetailTemplate?id=${item.documentId || item.id}`,
            };
          });

        if (filtered.length > 0) {
          setRelated(filtered);
        }
      } catch (err) {
        console.warn("Failed to fetch related mudras:", err);
      }
    }
    fetchRelated();
  }, [currentId]);

  const items = related.length > 0 ? related : staticRelated;

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-white py-12 md:py-16 px-6 sm:px-10 lg:px-16" 
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading matching Figma */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-[#9A85FE] mb-2">
          Related Mudras
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

        {/* 4-Column Grid matching Figma */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {items.map((item, i) => (
            <Card key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}