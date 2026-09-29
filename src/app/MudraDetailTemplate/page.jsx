"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import MudraInfoCard from "../../components/MudraDetailTemplate/MudraInfoCard";
import MudraDetailTemplateHero from "../../components/MudraDetailTemplate/MudraDetailTemplateHero";
import HowToPractice from "../../components/MudraDetailTemplate/HowToPractice";
import Benefits from "../../components/MudraDetailTemplate/Benefits";
import PracticeInfoGrid from "../../components/MudraDetailTemplate/PracticeInfoGrid";
import RelatedMudras from "../../components/MudraDetailTemplate/RelatedMudras";
import { mudraService } from "../../services/apiService";
import { useAuthStore } from "../../store/useAuthStore";
import { toast } from "react-toastify";

function MudraDetailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id") || "ahi75a9qfj8f8btb4u23zrrh"; // Fallback to Gyan Mudra documentId
  const [mudra, setMudra] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();
  const [isLiked, setIsLiked] = useState(false);

  const getProfileDocId = () => {
    if (typeof window !== "undefined") {
      try {
        const userObjStr = localStorage.getItem("user");
        if (userObjStr) {
          const userObj = JSON.parse(userObjStr);
          if (userObj && userObj.id) {
            return userObj.id;
          }
        }
      } catch (e) {
        console.error("Error reading user from localStorage:", e);
      }
    }
    return null;
  };
  const profileDocId = getProfileDocId() || "nh0p1vtynpr7mge2orest5mt";

  useEffect(() => {
    async function loadMudra() {
      setLoading(true);
      try {
        const response = await mudraService.getMudraDetail(id);
        const data = response?.data || response;
        if (data) {
          setMudra(data);
          
          // Sync initial userActivity states
          const activities = data.userMudraActivities || [];
          const userActivity = activities.find(act => 
            act?.user?.documentId === profileDocId || 
            act?.user?.id === user?.id || 
            String(act?.user?.id) === String(profileDocId)
          );
          if (userActivity) {
            setIsLiked(!!userActivity.isLiked);
          }
          
          // Call view increment API dynamically
          const docId = data.documentId || data.id;
          if (docId) {
            try {
              await mudraService.incrementMudraView(docId, profileDocId);
            } catch (vErr) {
              console.warn("Failed to increment mudra view count:", vErr);
            }
          }
        }
      } catch (error) {
        console.warn("Failed to load mudra details, using local fallbacks:", error);
      } finally {
        setLoading(false);
      }
    }
    loadMudra();
  }, [id, user, profileDocId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-10 w-10 text-primary" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">Loading details...</span>
        </div>
      </div>
    );
  }

  const handlePracticeScroll = () => {
    router.push(`/MudraMeditation?id=${id}`);
  };

  const handleBenefitsScroll = () => {
    document.getElementById("benefits")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLike = async () => {
    const docId = mudra?.documentId || mudra?.id;
    if (!docId) return;
    try {
      const nextState = !isLiked;
      setIsLiked(nextState);
      await mudraService.likeMudra(docId, profileDocId);
    } catch (err) {
      console.error("Failed to toggle like:", err);
    }
  };

  const handleShare = async () => {
    const docId = mudra?.documentId || mudra?.id;
    if (docId) {
      try {
        await mudraService.incrementMudraShare(docId, profileDocId);
      } catch (sErr) {
        console.warn("Failed to increment share count:", sErr);
      }
    }
    const textToCopy = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: mudra?.name || "Mudra",
          text: mudra?.description || "",
          url: textToCopy,
        });
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
        toast.success("Link copied to clipboard!");
      } else {
        // Fallback for non-secure HTTP contexts
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand("copy");
        document.body.removeChild(textArea);
        if (successful) {
          toast.success("Link copied to clipboard!");
        } else {
          toast.error("Failed to copy link.");
        }
      }
    } catch (err) {
      console.error("Failed to share:", err);
      toast.error("Failed to copy link.");
    }
  };

  return (
    <main className="bg-white dark:bg-gray-900 min-h-screen">
      <MudraDetailTemplateHero 
        mudra={mudra} 
        onPracticeClick={handlePracticeScroll}
        onBenefitsClick={handleBenefitsScroll}
        onLikeClick={handleLike}
        onShareClick={handleShare}
        isLiked={isLiked}
      />
      
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-200 dark:border-gray-800" />
      </div>
      
      <MudraInfoCard mudra={mudra} />
      
      <div className="max-w-10xl mx-auto" id="how-to-practice">
        <hr className="border-t border-gray-200 dark:border-gray-800" />
      </div>
      
      <HowToPractice mudra={mudra} />
      
      <div className="max-w-10xl mx-auto" id="benefits">
        <hr className="border-t border-gray-200 dark:border-gray-800" />
      </div>
      
      <Benefits mudra={mudra} />
      
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-200 dark:border-gray-800" />
      </div>
      
      <PracticeInfoGrid mudra={mudra} />
      
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-200 dark:border-gray-800" />
      </div>
      
      <RelatedMudras currentId={id} />
    </main>
  );
}

export default function MudraDetailTemplate() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-gray-500">Loading page...</div>
      </div>
    }>
      <MudraDetailContent />
    </Suspense>
  );
}