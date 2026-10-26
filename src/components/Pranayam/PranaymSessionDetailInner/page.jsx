"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { pranayamService } from "../../../services/apiService";
import PranaymSessionHero from "./PranaymSessionHero";
import PranaymInfoCard from "./PranaymInfoCard";
import PranaymSessionBenefits from "./PranaymSessionBenefits";
import PracticeInfoGridPranaym from "./PracticeInfoGridPranaym";
import RelatedPranaym from "./RelatedPranaym";
import { useAuthStore } from "../../../store/useAuthStore";

export default function PranaymSessionDetailInner() {
    const searchParams = useSearchParams();
      const { user } = useAuthStore();
    const pranayamId = searchParams.get("id");
    const [pranayama, setPranayama] = useState(null);
    const [loading, setLoading] = useState(Boolean(pranayamId));
const [isLiked, setIsLiked] = useState(false);
const [likeLoading, setLikeLoading] = useState(false);
    const duration = searchParams.get("duration");
  const profileDocId =
    user?.profileDocumentId ||
    user?.profileDocId ||
    (typeof user?.id === "string" && user.id.length > 5 ? user.id : null) ||
    "nh0p1vtynpr7mge2orest5mt";
    useEffect(() => {
        if (!pranayamId) return;

        const fetchPranayamaById = async () => {
            setLoading(true);
            try {
                const response = await pranayamService.getPranayamById(pranayamId);
                const payload = response?.data?.data || response?.data || response || null;

                console.log("pranayamService.getPranayamById", payload);
                setPranayama(payload);
            } catch (error) {
                console.error("Failed to fetch pranayam by id:", error);
                setPranayama(null);
            } finally {
                setLoading(false);
            }
        };

        fetchPranayamaById();
    }, [pranayamId]);

    const resolvedDuration = duration ? Number(duration) : pranayama?.duration || null;
   const handleLikePranayam = async () => {
    if (!pranayama || likeLoading || isLiked) return;

    const pranayamDocumentId =
        pranayama.documentId || pranayama.id || pranayamId;

    if (!pranayamDocumentId) return;

    setLikeLoading(true);

    try {
        await pranayamService.likePranayam(
            pranayamDocumentId,
            profileDocId
        );

        setIsLiked(true);
    } catch (error) {
        console.error("Failed to like pranayam:", error);
    } finally {
        setLikeLoading(false);
    }
};

    if (loading) {
        return (
            <main className="min-h-[60vh] flex items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-4">
                    <svg
                        className="animate-spin h-10 w-10 text-[#7C3AED]"
                        viewBox="0 0 24 24"
                        aria-label="Loading pranayam details"
                    >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    <span className="text-sm font-medium text-gray-500">Loading pranayam details...</span>
                </div>
            </main>
        );
    }

    return (
        <main className="w-full bg-white">
           <PranaymSessionHero
    meditation={pranayama}
    duration={resolvedDuration}
    onLikeClick={handleLikePranayam}
    isLiked={isLiked}
    likeLoading={likeLoading}
/>

            <hr className="w-full border-t border-gray-200" />

            <PranaymInfoCard
                meditation={pranayama}
                duration={resolvedDuration}
            />

            <PranaymSessionBenefits
                meditation={pranayama}
                duration={resolvedDuration}
            />

            <PracticeInfoGridPranaym
                meditation={pranayama}
                duration={resolvedDuration}
            />

            <RelatedPranaym
                meditation={pranayama}
                duration={resolvedDuration}
            />
        </main>
    );
}