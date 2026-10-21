"use client";

import MeditationHero from "../../components/Meditation/MeditationHero";
import { Suspense, useEffect, useState } from "react";
import PopularMeditation from "../../components/Meditation/PopularMeditation";
import FullPowerofMeditation from "../../components/Meditation/FullPowerofMeditation";
import { meditationService } from "../../services/apiService";

export default function Meditation() {
    const [meditations, setMeditations] = useState([]);

    useEffect(() => {
        const fetchMeditations = async () => {
            try {
                const response = await meditationService.getAllMeditations();
                const list = response?.data?.data || response?.data || response || [];
                setMeditations(list);
                console.log("meditationService", response);
            } catch (error) {
                console.error("Failed to fetch meditations:", error);
            }
        };

        fetchMeditations();
    }, []);

    return (
        <main className="w-full bg-white">
            <MeditationHero />
            <hr className="w-full border-t border-gray-200" />
            <Suspense fallback={<div className="text-center py-20 text-gray-500">Loading mudras...</div>}>
                <PopularMeditation meditations={meditations} />
            </Suspense>
            <hr className="w-full border-t border-gray-200" />
            <FullPowerofMeditation />
        </main>
    );
}