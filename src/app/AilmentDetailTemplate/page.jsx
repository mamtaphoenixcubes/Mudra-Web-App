"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import OverviewAilment from "../../components/AilmentDetailTemplate/OverviewAilment";
import AilmentDetailTemplateHero from "../../components/AilmentDetailTemplate/AilmentDetailTemplateHero";
import CommonSymptoms from "../../components/AilmentDetailTemplate/CommonSymptoms";
import HowMudras from "../../components/AilmentDetailTemplate/HowMudras";
import RecommendedPractices from "../../components/AilmentDetailTemplate/RecommendedPractices";
import LifestyleTips from "../../components/AilmentDetailTemplate/Lifestyletips";
import ExploreMore from "../../components/AilmentDetailTemplate/ExploreMore";
import AilmentDetailTemplateBanner from "../../components/AilmentDetailTemplate/AilmentDetailTemplateBanner";
import { needsService } from "../../services/apiService";

function AilmentDetailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const documentId = searchParams.get("id") || "ohiyk60qhza1ylkyzcep3npm";

  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetailTemplate() {
      setLoading(true);
      try {
        const response = await needsService.getNeedDetailsTemplate(documentId);
        if (response && response.success && response.data) {
          setDetailData(response.data);
        }
      } catch (err) {
        console.error("Failed fetching need details template:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDetailTemplate();
  }, [documentId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="mt-4 text-sm text-gray-500">Loading ailment details...</p>
      </div>
    );
  }

  const name = detailData?.Name || "Stress & Anxiety";
  const heroImage = detailData?.NeedDetailsWeb?.HeroSection?.HeroImage?.url || null;
  const categoryName = detailData?.NeedDetailsWeb?.HeroSection?.NeedCategory?.name || "Well-being";
  const heroDescription = detailData?.NeedDetailsWeb?.HeroSection?.HeroDescription || "";
  const overview = detailData?.NeedDetailsWeb?.Overview || "";
  const symptoms = detailData?.NeedDetailsWeb?.Symptoms || [];
  const benefits = detailData?.benefits || [];
  const mudras = detailData?.mudras || [];
  const yogaNidra = detailData?.YogaNidra || [];
  const lifestyleTips = detailData?.Web?.LifeStyleTips || [];
  const whenToSeekHelp = detailData?.NeedDetailsWeb?.WhenToSeekHelp || null;

  return (
    <main>
      <AilmentDetailTemplateHero 
        title={name}
        image={heroImage}
        category={categoryName}
        description={heroDescription}
        tags={[categoryName]}
        onPlayClick={() => {
          const el = document.getElementById("how-mudras");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        onSaveClick={() => router.push("/AilmentsMudrasforNeeds")}
      />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <OverviewAilment overview={overview} title={name} />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <CommonSymptoms symptoms={symptoms} />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <HowMudras benefits={benefits} />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <RecommendedPractices 
        heading={name}
        mudras={mudras}
        yogaNidra={yogaNidra}
        onViewAllMudras={() => router.push("/MudraLibrary")}
        onViewAllYogaNidra={() => router.push("/YogaNidraLibrary")}
      />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <LifestyleTips tips={lifestyleTips} whenToSeekHelp={whenToSeekHelp} />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <ExploreMore />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <AilmentDetailTemplateBanner />
    </main>
  );
}

export default function AilmentDetailTemplate() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="mt-4 text-sm text-gray-500">Loading...</p>
      </div>
    }>
      <AilmentDetailContent />
    </Suspense>
  );
}