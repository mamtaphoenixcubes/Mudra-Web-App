
import AsanasLibraryHero from "../../components/Asanas/AsanasLibraryHero";
import PopularAsanas from "../../components/Asanas/PopularAsanas";
import FullPowerofMudras from "../../components/MudraLibrary/FullPowerofMudras";
import { Suspense } from "react";


export default function Asanas() {
    return (
        <main className="w-full bg-white">
            <AsanasLibraryHero />
            <hr className="w-full border-t border-gray-200" />
            <Suspense fallback={<div className="text-center py-20 text-gray-500">Loading mudras...</div>}>
                <PopularAsanas />
            </Suspense>
            <hr className="w-full border-t border-gray-200" />
            <FullPowerofMudras />
        </main>
    );
}