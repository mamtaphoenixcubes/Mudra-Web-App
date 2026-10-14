"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { asanaService } from "../../services/apiService";
import AsanasPracticeSteps from "./AsanasPracticeSteps";
import AsanasMeditationBar from "./AsanasMeditationBar";
import AsanasMeditationCard from "./AsanasMeditationCard";
import AsanasMeditationSection from "./AsanasMeditationSection";

export default function AsanasMeditation() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [asana, setAsana] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(5);
  const [isLoading, setIsLoading] = useState(Boolean(id));

  useEffect(() => {
    const nextDefault = asana?.data?.durationPickerCard?.defaultDuration || 5;
    setSelectedDuration(nextDefault);
  }, [asana]);

  useEffect(() => {
    if (!id) {
      setAsana(null);
      setIsLoading(false);
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
      <AsanasMeditationCard asana={asana} />
      <hr className="w-full border-t border-gray-200" />
      <AsanasPracticeSteps asana={asana} />
      <hr className="w-full border-t border-gray-200" />
      <AsanasMeditationSection asana={asana} duration={selectedDuration} setDuration={setSelectedDuration} />
      <hr className="w-full border-t border-gray-200" />
      <AsanasMeditationBar asana={asana} mudra={asana} duration={selectedDuration} />
    </main>
  );
}