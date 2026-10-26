"use client";


import FullPowerofPranayam from "../../components/Pranayam/FullPowerofPranayam";
import PopularPranayam from "../../components/Pranayam/PopularPranayam";
import PranayamHome from "../../components/Pranayam/PranayamHome";
import { Suspense, useEffect, useState } from "react";
import { pranayamService } from "../../services/apiService";

export default function Pranayam() {
    const [pranayams, setPranayams] = useState([]);

    useEffect(() => {
        const fetchPranayams = async () => {
            try {
                const response = await pranayamService.getAllPranayams();
                const list = response?.data?.data || response?.data || response || [];
                setPranayams(list);
                console.log("pranayamService", response);
            } catch (error) {
                console.error("Failed to fetch pranayams:", error);
            }
        };

        fetchPranayams();
    }, []);

    return (
        <main className="w-full bg-white">
            <PranayamHome />
            <hr className="w-full border-t border-gray-200" />
            <Suspense fallback={<div className="text-center py-20 text-gray-500">Loading mudras...</div>}>
                <PopularPranayam pranayams={pranayams} />
            </Suspense>
            <hr className="w-full border-t border-gray-200" />
            <FullPowerofPranayam />
        </main>
    );
}