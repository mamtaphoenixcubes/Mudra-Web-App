"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { meditationService } from "../../../services/apiService";
import HowToPracticeMeditation from "./HowToPracticeMeditation";
import MeditationInfoCard from "./MeditationInfoCard";
import MeditationSessionBenefits from "./MeditationSessionBenefits";
import MeditationSessionHero from "./MeditationSessionHero";
import PracticeInfoGridMeditation from "./PracticeInfoGridMeditation";
import RelatedMeditation from "./RelatedMeditation";

export default function MeditationPlaySessionInner() {
    const searchParams = useSearchParams();
    const [meditation, setMeditation] = useState(null);

    const meditationId = searchParams.get("id");
    const duration = searchParams.get("duration");

    useEffect(() => {
        if (!meditationId) return;

        const fetchMeditationById = async () => {
            try {
                const response = await meditationService.getMeditationById(meditationId);
                const payload = response?.data?.data || response?.data || response || null;

                console.log("meditationService.getMeditationById", payload);
                setMeditation(payload);
            } catch (error) {
                console.error("Failed to fetch meditation by id:", error);
                setMeditation(null);
            }
        };

        fetchMeditationById();
    }, [meditationId]);

    const resolvedDuration =
        duration ? Number(duration) : meditation?.duration || null;

    return (
        <main className="w-full bg-white">
            <MeditationSessionHero
                meditation={meditation}
                duration={resolvedDuration}
            />

            <hr className="w-full border-t border-gray-200" />

            <MeditationInfoCard
                meditation={meditation}
                duration={resolvedDuration}
            />

            <HowToPracticeMeditation
                meditation={meditation}
                duration={resolvedDuration}
            />

            <MeditationSessionBenefits
                meditation={meditation}
                duration={resolvedDuration}
            />

            <PracticeInfoGridMeditation
                meditation={meditation}
                duration={resolvedDuration}
            />

            <RelatedMeditation
                meditation={meditation}
                duration={resolvedDuration}
            />
        </main>
    );
}