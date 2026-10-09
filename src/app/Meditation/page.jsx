
import MeditationHero from "../../components/Meditation/MeditationHero";
import { Suspense } from "react";
import PopularMeditation from "../../components/Meditation/PopularMeditation";
import FullPowerofMeditation from "../../components/Meditation/FullPowerofMeditation";


export default function Meditation() {
    return (
        <main className="w-full bg-white">
            <MeditationHero />
            <hr className="w-full border-t border-gray-200" />
            <Suspense fallback={<div className="text-center py-20 text-gray-500">Loading mudras...</div>}>
                <PopularMeditation />
            </Suspense>
            <hr className="w-full border-t border-gray-200" />
            <FullPowerofMeditation />
        </main>
    );
}