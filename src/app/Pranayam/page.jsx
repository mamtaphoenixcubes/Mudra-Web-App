import FullPowerofPranayam from "../../components/Pranayam/FullPowerofPranayam";
import PopularPranayam from "../../components/Pranayam/PopularPranayam";
import PranayamHome from "../../components/Pranayam/PranayamHome";
import { Suspense } from "react";


export default function Pranayam() {
    return (
        <main className="w-full bg-white">
            <PranayamHome />
            <hr className="w-full border-t border-gray-200" />
            <Suspense fallback={<div className="text-center py-20 text-gray-500">Loading mudras...</div>}>
                <PopularPranayam />
            </Suspense>
            <hr className="w-full border-t border-gray-200" />
            <FullPowerofPranayam />
        </main>
    );
}