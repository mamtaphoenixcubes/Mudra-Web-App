"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import PracticeSteps from "../../components/MudraMeditation/PracticeSteps";
import MudraMeditationCard from "../../components/MudraMeditation/MudraMeditationCard";
import AffirmationDurationSection from "../../components/MudraMeditation/AffirmationDurationSection";
import PracticeActionBar from "../../components/MudraMeditation/PracticeActionBar";
import { mudraService } from "../../services/apiService";

function MudraMeditationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id") || "ahi75a9qfj8f8btb4u23zrrh"; // Fallback to Gyan Mudra documentId
  const [mudra, setMudra] = useState(null);
  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState(10); // Default to 10 minutes

  useEffect(() => {
    async function loadMudra() {
      setLoading(true);
      try {
        const response = await mudraService.getMudraDetail(id);
        const data = response?.data || response;
        if (data) {
          setMudra(data);
          const defaultDur = data?.durationPickerCard?.defaultDuration || 10;
          setDuration(defaultDur);
        }
      } catch (error) {
        console.warn("Failed to load mudra details for meditation page:", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      loadMudra();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-10 w-10 text-primary" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">Loading session...</span>
        </div>
      </div>
    );
  }

  // Parse and format practice steps
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

  const rawSteps = mudra?.web?.WebPracticeSteps?.PracticeSteps || [];
  const stepImages = mudra?.web?.WebPracticeSteps?.StepImages || [];
  
  const formattedSteps = rawSteps.length > 0 ? rawSteps.map((step, idx) => {
    const colors = ["#FBE3B8", "#E4D3F5", "#DCEFC7", "#C7E7EF"];
    const bg = colors[idx % colors.length];
    const stepImg = stepImages[idx]?.url;
    return {
      id: step.id || idx,
      title: `${idx + 1}. ${step.nameOfTheSteps}`,
      lines: step.describeTheStep ? step.describeTheStep.split("\n").filter(Boolean) : [],
      imageSrc: stepImg ? `${IMAGE_BASE_URL}${stepImg}` : null,
      bg: bg
    };
  }) : undefined;

  const handleStartPractice = () => {
    // Navigate to centralized PlaySession with configuration parameters
    const durInSeconds = duration * 60;
    router.push(`/PlaySession?id=${id}&type=mudra&mode=timer&duration=${durInSeconds}`);
  };

  return (
    <main className="bg-white dark:bg-gray-900 min-h-screen pb-10">
      {/* Mudra Info Card */}
      <MudraMeditationCard mudra={mudra} />

      {/* Dynamic Practice Steps */}
      <PracticeSteps steps={formattedSteps} />

      {/* Affirmation & Duration Settings */}
      <AffirmationDurationSection 
        mudra={mudra} 
        duration={duration} 
        setDuration={setDuration} 
      />

      {/* Bottom action controls */}
      <PracticeActionBar onStartPractice={handleStartPractice} />
    </main>
  );
}

export default function MudraMeditation() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Meditation...</div>}>
      <MudraMeditationContent />
    </Suspense>
  );
}
