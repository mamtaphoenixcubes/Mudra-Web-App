"use client";

import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { meditationService } from "../../../services/apiService";
import MeditationCardHero from "./MeditationCardHero";
import MeditationPracticeSteps from "./MeditationPracticeSteps";
import MeditationCardSection from "./MeditationCardSection";
import MeditationCardBar from "./MeditationCardBar";

function MeditationCardInner() {
  const searchParams = useSearchParams();
  const params = useParams();
  const [meditation, setMeditation] = useState(null);
  const [duration, setDuration] = useState(10);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const meditationId =
    searchParams.get("id") ||
    params?.id ||
    params?.meditationId ||
    params?.slug ||
    null;

  useEffect(() => {
    if (!meditationId) return;

    let isMounted = true;

    const fetchMeditationById = async () => {
      try {
        const response = await meditationService.getMeditationById(meditationId);
        const payload = response?.data?.data || response?.data || response || null;

        if (isMounted) {
          setMeditation(payload);
          if (payload?.durationPickerCard?.defaultDuration) {
            setDuration(Number(payload.durationPickerCard.defaultDuration));
          }
        }
      } catch (error) {
        console.error("Failed to fetch meditation by id:", error);
        if (isMounted) setMeditation(null);
      }
    };

    fetchMeditationById();

    return () => {
      isMounted = false;
    };
  }, [meditationId]);

  return (
    <main className="w-full bg-white">
      <MeditationCardHero meditation={meditation} />

      <hr className="w-full border-t border-gray-200" />

      <MeditationPracticeSteps meditation={meditation} />

      <hr className="w-full border-t border-gray-200" />

      <MeditationCardSection
        meditation={meditation}
        duration={duration}
        setDuration={setDuration}
      />

      <hr className="w-full border-t border-gray-200" />

      <MeditationCardBar
        meditation={meditation}
        session={{ duration }}
        onOpenSettings={() => setSettingsOpen(true)}
      />
    </main>
  );
}

export default function MeditationCard() {
  return (
    <Suspense
      fallback={<div className="p-10 text-center text-gray-500">Loading…</div>}
    >
      <MeditationCardInner />
    </Suspense>
  );
}