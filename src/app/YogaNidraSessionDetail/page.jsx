"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { yogaNidraService } from "../../services/apiService";
import WhattoExpect from "../../components/YogaNidraSessionDetail/WhattoExpect";
import Overview from "../../components/YogaNidraSessionDetail/Overview";
import YogaNidraSessionDetailHero from "../../components/YogaNidraSessionDetail/YogaNidraSessionDetailHero";
import Benefits from "../../components/YogaNidraSessionDetail/Benefits";
import SessionDetailsCard from "../../components/YogaNidraSessionDetail/SessionDetailsCard";
import MoreYogaNidraSessions from "../../components/YogaNidraSessionDetail/MoreYogaNidraSessions";
import { IMAGES } from "../../assets/assets";
import { useAuthStore } from "../../store/useAuthStore";

const getImgBaseUrl = () => {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname && hostname !== "localhost" && hostname !== "127.0.0.1") {
      return `http://${hostname}:1337`;
    }
  }
  return "http://192.168.1.14:1337";
};

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || getImgBaseUrl();

function SessionDetailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id") || "ui2phqjaaqub5r1k38gkppko";
  const [detailData, setDetailData] = useState(null);
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
  const loggedInProfileDocId = getProfileDocId();
  const profileDocId = loggedInProfileDocId || "nh0p1vtynpr7mge2orest5mt";

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  useEffect(() => {
    async function loadDetail() {
      try {
        const json = await yogaNidraService.getYogaNidraById(id, loggedInProfileDocId);
        let finalData = null;
        if (json && json.success && json.data) {
          finalData = json.data;
        } else if (json && json.data) {
          finalData = json.data;
        } else if (json) {
          finalData = json;
        }
        if (finalData && finalData.data) {
          finalData = finalData.data;
        }
        setDetailData(finalData);

        // Sync initial userActivity states
        const activity = finalData?.userActivity || json?.data?.userActivity || json?.userActivity;
        if (activity) {
          setIsLiked(!!activity.IsLiked);
          setIsSaved(!!activity.IsSaved);
          setIsDownloaded(!!activity.LastDownloadedAt);
        }

        // Call view increment API dynamically
        try {
          await yogaNidraService.viewYogaNidra(id, profileDocId);
        } catch (vErr) {
          console.warn("Failed to increment view count for Yoga Nidra:", vErr);
        }
      } catch (err) {
        console.warn("Failed fetching yoga-nidras session detail, using fallbacks:", err);
      }
    }
    if (id) {
      loadDetail();
    }
  }, [id, profileDocId, loggedInProfileDocId]);

  const handleLike = async () => {
    try {
      const nextState = !isLiked;
      setIsLiked(nextState);
      await yogaNidraService.likeYogaNidra(id, profileDocId);
    } catch (err) {
      console.error("Failed to toggle like:", err);
    }
  };

  const handleSave = async () => {
    try {
      const nextState = !isSaved;
      setIsSaved(nextState);
      await yogaNidraService.saveYogaNidra(id, profileDocId);
    } catch (err) {
      console.error("Failed to toggle save:", err);
    }
  };

  const handleDownload = async () => {
    try {
      const nextState = !isDownloaded;
      setIsDownloaded(nextState);
      await yogaNidraService.downloadYogaNidra(id, profileDocId);
    } catch (err) {
      console.error("Failed to track download:", err);
    }
  };

  const handleShare = async () => {
    try {
      await yogaNidraService.shareYogaNidra(id, profileDocId);
      if (navigator.share) {
        await navigator.share({
          title: heroName,
          text: shortDescription,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Failed to share:", err);
    }
  };

  // Map API fields
  const heroName = detailData?.Name || "Deep Relaxation Yoga Nidra";
  const categoryName = detailData?.Category?.Name || "Yoga Nidra";
  const shortDescription = detailData?.WebDetailsPage?.HeroSectionWeb?.HeroDescription || "A guided practice for restorative peace.";
  
  const thumbnail = detailData?.WebDetailsPage?.HeroSectionWeb?.HeroImages?.[0]?.url || detailData?.NidraIntroCard?.ThumbnailImage?.[0]?.url || detailData?.ThumbnailImage?.[0]?.url;
  const heroImgUrl = thumbnail ? `${IMAGE_BASE_URL}${thumbnail}` : null;

  const durationStr = detailData?.Duration ? `${detailData?.Duration} min` : "30 min";
  const durationpickercard = detailData?.DurationPickerCard || 30; // Default to 30 if not available
  const levelStr = detailData?.Level || "Beginner Friendly";

  const tagsList = detailData?.Intentions && detailData.Intentions.length > 0
    ? detailData.Intentions.map(i => i.name)
    : ["Relaxation", "Restorative", "Rejuvenating"];

  // expectations mapping
  const expectationsList = detailData?.WebDetailsPage?.Expectation || [];

  // benefits list mapping
  const benefitsList = detailData?.YogaNidraBenefits || [];

  // session details mapping
  const detailsList = [
    { icon: IMAGES.Clock, label: "Duration", value: durationStr },
    { icon: IMAGES.ImprovedOutcomes, label: "Level", value: levelStr },
    { icon: IMAGES.Volume, label: "Type", value: detailData?.MediaType === "AUDIO_SINGLE" ? "Audio Guided" : "Playlist" },
    { icon: IMAGES.EnhancesFocus, label: "Focus / Music", value: `${detailData?.WebDetailsPage?.SessionDetails?.Focus || "Relaxation"} • ${detailData?.BackgroundMusic || "Ambient"}` },
  ];

  // practice steps mapping
  const howToPracticeText = detailData?.WebDetailsPage?.SessionDetails?.HowToPractice || "";
  const bestPracticeTimeText = detailData?.WebDetailsPage?.SessionDetails?.BestPracticeTime || "";

  const practiceList = [
    {
      icon: IMAGES.IconYogaNidra,
      title: "How to Practice",
      lines: howToPracticeText ? howToPracticeText.split("\n").filter(Boolean) : [
        "Find a quiet, comfortable space where you won't be disturbed.",
        "Lie down on your back, close your eyes, and listen with awareness.",
        "Allow yourself to relax and follow the guidance.",
      ],
    },
    {
      icon: IMAGES.ClockStopwatch,
      title: "Best Time to Practice",
      lines: bestPracticeTimeText ? bestPracticeTimeText.split("\n").filter(Boolean) : [
        "Evening or before bedtime for better sleep.",
        "During the day when you need to relax and recharge.",
      ],
    },
  ];

  return (
    <main>
      <YogaNidraSessionDetailHero 
        category={categoryName}
        title={heroName}
        tags={tagsList}
        description={shortDescription}
        duration={durationStr}
        durationpickercard={durationpickercard}
        level={levelStr}
        imgSrc={heroImgUrl}
        onPlayClick={(selectedDuration) => {
        router.push(
          `/PlaySession?id=${id}&type=yoganidra&duration=${selectedDuration}`
        );
      }}
        onSaveClick={handleSave}
        onLikeClick={handleLike}
        onDownloadClick={handleDownload}
        onShareClick={handleShare}
        isLiked={isLiked}
        isSaved={isSaved}
        isDownloaded={isDownloaded}
      />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <Overview descriptionText={detailData?.WebDetailsPage?.Overview} />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <WhattoExpect expectations={expectationsList} />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <Benefits listOfBenefits={benefitsList} />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <SessionDetailsCard details={detailsList} practice={practiceList} />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <MoreYogaNidraSessions />
    </main>
  );
}

export default function YogaNidraSessionDetail() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Session Details...</div>}>
      <SessionDetailContent />
    </Suspense>
  );
}