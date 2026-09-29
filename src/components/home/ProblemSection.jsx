"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "../../assets/assets";
import { mudraService } from "../../services/apiService";

const FIGMA_CARDS = [
  {
    key: "stress",
    title: "Stress & Anxiety",
    description: "Constant stress drains your energy and peace of mind.",
    bg: "bg-[#FEF9C3]",
    image: IMAGES.StressRelief || IMAGES.StressAnxiety,
  },
  {
    key: "mental",
    title: "Mental Overload",
    description: "Too much thinking, too little clarity and focus.",
    bg: "bg-[#F3E8FF]",
    image: IMAGES.HealingRecovery || IMAGES.Meditation,
  },
  {
    key: "sleep",
    title: "Poor Sleep",
    description: "Restless nights lead to tired mornings and low energy.",
    bg: "bg-[#E0F2FE]",
    image: IMAGES.SleepDeep || IMAGES.RestfulSleep,
  },
  {
    key: "emotional",
    title: "Emotional Imbalance",
    description: "Unmanaged emotions affect your well-being and relationships.",
    bg: "bg-[#FCE7F3]",
    image: IMAGES.EmotionalBalance || IMAGES.Relaxation,
  },
  {
    key: "disconnected",
    title: "Disconnected Self",
    description: "You feel out of balance and far from your true self.",
    bg: "bg-[#DCFCE7]",
    image: IMAGES.PeacefulSleep || IMAGES.MeditationBeach,
  },
];

export default function ProblemSection() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        setLoading(true);
        const response = await mudraService.getCategories();
        let list = [];
        if (response && response.success && response.data) {
          if (Array.isArray(response.data)) {
            list = response.data;
          } else if (Array.isArray(response.data.data)) {
            list = response.data.data;
          }
        }

        if (list.length > 0) {
          const mapped = list.map((item, index) => {
            const defaultCard = FIGMA_CARDS[index % FIGMA_CARDS.length];
            let img = defaultCard.image;
            if (item.icon?.url) {
              const url = item.icon.url;
              const assetBase = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://192.168.1.14:1337";
              if (url.includes("/uploads/")) {
                img = `${assetBase}${url.substring(url.indexOf("/uploads/"))}`;
              } else if (url.startsWith("http")) {
                img = url;
              } else {
                img = `${assetBase}${url}`;
              }
            }

            return {
              id: item.id,
              documentId: item.documentId,
              title: item.Name || defaultCard.title,
              description: item.cardText || item.shortDescription || defaultCard.description,
              bg: defaultCard.bg,
              image: img,
            };
          });
          setCards(mapped);
        } else {
          setCards(FIGMA_CARDS);
        }
      } catch (err) {
        console.warn("Using fallback cards due to API error:", err);
        setCards(FIGMA_CARDS);
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, []);

  return (
    <section className="w-full py-14 md:py-18 bg-white px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
            THE PROBLEM
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3" style={{ color: "#9A85FE" }}>
            Life Feels Overwhelming
          </h2>
          <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto font-medium leading-relaxed">
            Stress, anxiety, poor sleep, emotional imbalance and constant
            <br className="hidden sm:inline" />
            overload keep you away from your best self.
          </p>
        </div>

        {/* Shimmer / Skeleton Loader or Cards Row */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
            {[1, 2, 3, 4, 5].map((idx) => (
              <div
                key={idx}
                className="rounded-2xl p-5 sm:p-6 text-center flex flex-col items-center justify-start h-full bg-gray-100/90 animate-pulse border border-gray-200/50 min-h-[270px]"
              >
                {/* Shimmer Thumbnail */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gray-200 animate-pulse mb-4 shrink-0" />

                {/* Shimmer Title */}
                <div className="h-4.5 w-28 bg-gray-200 rounded-md animate-pulse mb-2.5" />

                {/* Shimmer Description */}
                <div className="h-3 w-full bg-gray-200 rounded-xs animate-pulse mb-1.5" />
                <div className="h-3 w-4/5 bg-gray-200 rounded-xs animate-pulse" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
            {cards.map((card, i) => (
              <Card key={card.documentId || card.key || i} card={card} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

function Card({ card }) {
  const content = (
    <div
      className={`rounded-2xl p-5 sm:p-6 text-center flex flex-col items-center justify-start h-full min-h-[270px] ${card.bg} text-gray-900 transition-transform duration-200 hover:-translate-y-1`}
    >
      {/* Thumbnail */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden mb-4 shrink-0 bg-white/40 shadow-xs">
        {typeof card.image === "string" ? (
          <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
        ) : (
          <Image src={card.image} alt={card.title} className="w-full h-full object-cover" />
        )}
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug">
        {card.title}
      </h3>

      {/* Description */}
      <p className="text-xs text-gray-600/90 font-medium leading-relaxed max-w-[200px]">
        {card.description}
      </p>
    </div>
  );

  if (card.documentId) {
    return (
      <Link href={`/AilmentDetailTemplate?id=${card.documentId}`} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}