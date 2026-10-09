"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import PranaymSessionHero from "./PranaymSessionHero";
import PranaymInfoCard from "./PranaymInfoCard";
import HowToPracticePranaym from "./PracticeInfoGridPranaym";
import PranaymSessionBenefits from "./PranaymSessionBenefits";
import PracticeInfoGridPranaym from "./PracticeInfoGridPranaym";
import RelatedPranaym from "./RelatedPranaym";

function PranaymSessionDetailInner() {
    const searchParams = useSearchParams();

    const meditationId = searchParams.get("id");
    const duration = searchParams.get("duration");

    return (
        <main className="w-full bg-white">
            <PranaymSessionHero
                meditationId={meditationId}
                duration={duration ? Number(duration) : null}
            />

            <hr className="w-full border-t border-gray-200" />

            <PranaymInfoCard
                meditationId={meditationId}
                duration={duration ? Number(duration) : null}
            />

            <PranaymSessionBenefits
                meditationId={meditationId}
                duration={duration ? Number(duration) : null}
            />

            <PracticeInfoGridPranaym
                meditationId={meditationId}
                duration={duration ? Number(duration) : null}
            />

            <RelatedPranaym
                meditationId={meditationId}
                duration={duration ? Number(duration) : null}
            />
        </main>
    );
}

// ✅ Renamed — no longer collides with the inner function
export default function PranaymSessionDetail() {
    return (
        <Suspense fallback={<div className="p-10 text-center text-gray-500">Loading…</div>}>
            <PranaymSessionDetailInner />
        </Suspense>
    );
}