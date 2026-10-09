"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import PranayamPlaySessionHero from "./PranayamPlaySessionHero";
import UpNextWithMiniPranayamPlay from "./UpNextWithMiniPranayamPlay";

function PranayamPlaySession() {
    const searchParams = useSearchParams();

    const meditationId = searchParams.get("id");
    const duration = searchParams.get("duration");

    return (
        <main className="w-full bg-white">
            {/* Hero section - main asana player */}
            <PranayamPlaySessionHero 
                meditationId={meditationId}
                duration={duration}
            />

            {/* Up next section with mini player */}
            <UpNextWithMiniPranayamPlay 
                meditationId={meditationId}
                duration={duration}
            />
        </main>
    );
}

export default function MeditationPlaylist() {
    return (
        <Suspense fallback={<div className="p-10 text-center text-gray-500">Loading…</div>}>
            <PranayamPlaySession />
        </Suspense>
    );
}