"use client";

import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { pranayamService } from "../../../services/apiService";
import PranaymCardHero from "./PranaymCardHero";
import PranaymPracticeSteps from "./PranaymPracticeSteps";
import PranaymCardSection from "./PranaymCardSection";
import PranaymCardBar from "./PranaymCardBar";

function PranaymCardInner() {
  const searchParams = useSearchParams();
  const params = useParams();
  const [pranayama, setPranayama] = useState(null);
  const [duration, setDuration] = useState(10);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const pranayamId =
    searchParams.get("id") ||
    params?.id ||
    params?.pranayamId ||
    params?.slug ||
    null;

  useEffect(() => {
    if (!pranayamId) return;

    let isMounted = true;

    const fetchPranayamaById = async () => {
      try {
        const response = await pranayamService.getPranayamById(pranayamId);
        const payload = response?.data?.data || response?.data || response || null;
console.log("pranayamService.getPranayamById", payload);

        if (isMounted) {
          setPranayama(payload);
          if (payload?.durationPickerCard?.defaultDuration) {
            setDuration(Number(payload.durationPickerCard.defaultDuration));
          }
        }
      } catch (error) {
        console.error("Failed to fetch pranayam by id:", error);
        if (isMounted) setPranayama(null);
      }
    };

    fetchPranayamaById();

    return () => {
      isMounted = false;
    };
  }, [pranayamId]);

  return (
    <main className="w-full bg-white">
      <PranaymCardHero meditation={pranayama} />

      <hr className="w-full border-t border-gray-200" />

      <PranaymPracticeSteps meditation={pranayama} />

      <hr className="w-full border-t border-gray-200" />

      <PranaymCardSection
        meditation={pranayama}
        duration={duration}
        setDuration={setDuration}
      />

      <hr className="w-full border-t border-gray-200" />

      <PranaymCardBar
        meditation={pranayama}
        pranayama={pranayama}
        session={{ duration }}
        onOpenSettings={() => setSettingsOpen(true)}
      />
    </main>
  );
}

export default function PranaymCard() {
  return (
    <Suspense
      fallback={<div className="p-10 text-center text-gray-500">Loading…</div>}
    >
      <PranaymCardInner />
    </Suspense>
  );
}