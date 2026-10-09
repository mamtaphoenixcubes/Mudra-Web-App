"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { IMAGES } from "../../assets/assets";
import { asanaService } from "../../services/apiService";

function Card({ item }) {
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
          href={item.href || "#"}
          className="text-xs sm:text-sm font-semibold text-gray-800 hover:text-[#9A85FE] transition-colors inline-flex items-center gap-1"
        >
          View Asana &rarr;
        </Link>
      </div>
    </div>
  );
}

export default function RelatedAsanas({ asana = null }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.05,
    margin: "-50px",
  });

  const [related, setRelated] = useState([]);
  const currentId = asana?.documentId || asana?.id;

  useEffect(() => {
    if (!currentId) {
      return;
    }

    async function fetchRelated() {
      try {
        const response = await asanaService.getAllAsanas();
        const rawList = Array.isArray(response)
          ? response
          : response?.data && Array.isArray(response.data)
            ? response.data
            : response?.data?.data && Array.isArray(response.data.data)
              ? response.data.data
              : [];

        const items = rawList
          .filter((item) => (item?.documentId || item?.id) !== currentId)
          .slice(0, 4)
          .map((item, index) => {
            const imageUrl =
              item?.web?.IntroCardWeb?.IntrocardImage?.url ||
              item?.thumbnail?.url ||
              item?.ThumbnailImage?.[0]?.url ||
              null;

            return {
              title: item?.name || item?.title || item?.Name || "Asana",
              description:
                item?.web?.IntroCardWeb?.Description ||
                item?.description ||
                item?.aboutSession ||
                "A guided practice to support balance and wellbeing.",
              bg: ["bg-[#FEF9C3]", "bg-[#F3E8FF]", "bg-[#BFDDF2]", "bg-[#FCE7F3]"][index % 4],
              image: imageUrl
                ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://192.168.1.14:1337"}${imageUrl}`
                : IMAGES.Mind,
              isRemote: !!imageUrl,
              href: `/AsanasSessionDetail?id=${item?.documentId || item?.id}`,
            };
          });

        setRelated(items);
      } catch (error) {
        console.warn("Failed to fetch related asanas:", error);
        setRelated([]);
      }
    }

    fetchRelated();
  }, [currentId]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-12 md:py-16 px-6 sm:px-10 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-[#9A85FE] mb-2">
          Related Asanas
        </h2>

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

        {related.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {related.map((item, i) => (
              <motion.div
                key={item.href || i}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                  delay: i * 0.07,
                }}
              >
                <Card item={item} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center text-sm text-gray-500">
            Related asanas will appear here when available.
          </div>
        )}
      </div>
    </section>
  );
}