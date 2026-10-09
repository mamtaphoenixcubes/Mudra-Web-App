"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import HowToPracticeMeditation from "./HowToPracticeMeditation";
import MeditationInfoCard from "./MeditationInfoCard";
import MeditationPracticePlayer from "./MeditationPracticePlayer";
import MeditationSessionBenefits from "./MeditationSessionBenefits";
import MeditationSessionHero from "./MeditationSessionHero";
import PracticeInfoGridMeditation from "./PracticeInfoGridMeditation";
import RelatedMeditation from "./RelatedMeditation";

function MeditationPlaySessionInner() {
    const searchParams = useSearchParams();

    const meditationId = searchParams.get("id");
    const duration = searchParams.get("duration");

    return (
        <main className="w-full bg-white">
            <MeditationSessionHero
                meditationId={meditationId}
                duration={duration ? Number(duration) : null}
            />

            <hr className="w-full border-t border-gray-200" />

            <MeditationInfoCard
                meditationId={meditationId}
                duration={duration ? Number(duration) : null}
            />
            {/* 
      <MeditationPracticePlayer
        meditationId={meditationId}
        duration={duration ? Number(duration) : null}
      /> */}

            <HowToPracticeMeditation
                meditationId={meditationId}
                duration={duration ? Number(duration) : null}
            />

            <MeditationSessionBenefits
                meditationId={meditationId}
                duration={duration ? Number(duration) : null}
            />

            <PracticeInfoGridMeditation
                meditationId={meditationId}
                duration={duration ? Number(duration) : null}
            />

            <RelatedMeditation
                meditationId={meditationId}
                duration={duration ? Number(duration) : null}
            />
        </main>
    );
}

export default function MeditationPlaySession() {
    return (
        <Suspense fallback={<div className="p-10 text-center text-gray-500">Loading…</div>}>
            <MeditationPlaySessionInner />
        </Suspense>
    );
}