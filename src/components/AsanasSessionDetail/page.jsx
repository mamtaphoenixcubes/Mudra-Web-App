"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { asanaService } from "../../services/apiService";
import { useAuthStore } from "../../store/useAuthStore";
import AsanasInfoCard from "./AsanasInfoCard";
import AsanasSessionBenefits from "./AsanasSessionBenefits";
import AsanasSessionHero from "./AsanasSessionHero";
import HowToPracticeAsanas from "./HowToPracticeAsanas";
import PracticeInfoGridAsanas from "./PracticeInfoGridAsanas";
import RelatedAsanas from "./RelatedAsanas";

export default function AsanasSessionDetail() {
  const searchParams = useSearchParams();
  const { user } = useAuthStore();
  const id = searchParams.get("id");
  const [asana, setAsana] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(Boolean(id));

  const profileDocId =
    user?.profileDocumentId ||
    user?.profileDocId ||
    (typeof user?.id === "string" && user.id.length > 5 ? user.id : null) ||
    "nh0p1vtynpr7mge2orest5mt";

  useEffect(() => {
    if (!id) {
      return;
    }

    let isMounted = true;

    const fetchAsana = async () => {
      try {
        setIsLoading(true);
        const response = await asanaService.getAsanaById(id);
        const responseData = response?.data ?? response;

        if (isMounted) {
          setAsana(responseData || null);
        }
      } catch (error) {
        console.error("Error fetching asana details:", error);
        if (isMounted) {
          setAsana(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchAsana();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleLike = async () => {
    const docId = asana?.data?.documentId || asana?.id;
    if (!docId) return;

    const nextState = !isLiked;
    setIsLiked(nextState);

    try {
      const response = await asanaService.likeAsana(docId, profileDocId);
      const responseData = response?.data || response;
      const serverIsLiked =
        responseData?.isLiked ??
        responseData?.IsLiked ??
        responseData?.isliked;

      if (typeof serverIsLiked === "boolean") {
        setIsLiked(serverIsLiked);
      }
    } catch (error) {
      console.error("Failed to toggle asana like:", error);
      setIsLiked(!nextState);
    }
  };

  if (isLoading) {
    return (
      <main className="w-full bg-white min-h-[50vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-[#9A85FE] font-medium">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#9A85FE] border-t-transparent" />
          Loading asana details...
        </div>
      </main>
    );
  }

  if (!asana) {
    return (
      <main className="w-full bg-white min-h-[50vh] flex items-center justify-center px-6">
        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-8 py-10 text-center max-w-md">
          <p className="text-lg font-semibold text-gray-800">No asana found</p>
          <p className="mt-2 text-sm text-gray-500">The requested asana could not be loaded.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full bg-white">
      <AsanasSessionHero
        asana={asana}
        onLikeClick={handleLike}
        isLiked={isLiked}
      />
      <hr className="w-full border-t border-gray-200" />
      <AsanasInfoCard asana={asana} />
      <hr className="w-full border-t border-gray-200" />
      <HowToPracticeAsanas asana={asana} />
      <hr className="w-full border-t border-gray-200" />
      <AsanasSessionBenefits asana={asana} />
      <hr className="w-full border-t border-gray-200" />
      <PracticeInfoGridAsanas asana={asana} />
      <hr className="w-full border-t border-gray-200" />
      <RelatedAsanas asana={asana} />
    </main>
  );
}