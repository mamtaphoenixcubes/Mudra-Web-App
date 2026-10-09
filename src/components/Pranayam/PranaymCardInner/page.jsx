"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import PranaymCardHero from "./PranaymCardHero";
import PranaymPracticeSteps from "./PranaymPracticeSteps";
import PranaymCardSection from "./PranaymCardSection";
import PranaymCardBar from "./PranaymCardBar";

function PranaymCardInner() {
  const searchParams = useSearchParams();
  const meditationId = searchParams.get("id");

  // ── Replace this stub with your real data fetch / store lookup ──
  // e.g. const meditation = useMeditationStore(s => s.byId[meditationId]);
  //      or a useEffect that fetches from your API by meditationId.
  const meditation =
    meditationId != null
      ? { documentId: meditationId, id: meditationId }
      : null;

  const [duration, setDuration] = useState(10);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <main className="w-full bg-white">
      <PranaymCardHero meditation={meditation} />

      <hr className="w-full border-t border-gray-200" />

      <PranaymPracticeSteps meditation={meditation} />

      <hr className="w-full border-t border-gray-200" />

      <PranaymCardSection
        meditation={meditation}
        duration={duration}
        setDuration={setDuration}
      />

      <hr className="w-full border-t border-gray-200" />

      <PranaymCardBar
        meditation={meditation}
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