"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import OverviewElement from "../../components/ElementDetailTemplate/OverviewElement";
import ElementDetailTemplateHero from "../../components/ElementDetailTemplate/ElementDetailTemplateHero";
import Characteristics from "../../components/ElementDetailTemplate/Characteristics";
import SignsOfImbalance from "../../components/ElementDetailTemplate/SignsOfImbalance";
import BalanceEarth from "../../components/ElementDetailTemplate/BalanceEarth";
import InHarmony from "../../components/ElementDetailTemplate/InHarmony";
import ExploreMore from "../../components/ElementDetailTemplate/ExploreMore";
import { elementsService } from "../../services/apiService";

function ElementDetailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const documentId = searchParams.get("id") || "in4vcbjj65hiqpk4gs49mja7";

  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchElementDetails() {
      if (!documentId) return;
      setLoading(true);
      try {
        const response = await elementsService.getElementDetails(documentId);
        if (response && response.success && response.data) {
          setDetailData(response.data);
        }
      } catch (err) {
        console.error("Failed fetching element details:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchElementDetails();
  }, [documentId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="mt-4 text-sm text-gray-500">Loading element details...</p>
      </div>
    );
  }

  const name = detailData?.Name || "Earth";
  const title = `${name} Element`;
  
  // Hero properties
  const description = detailData?.FingerMapping?.ShortDescription || `${name} element represents grounding stability, patience, and nourishment.`;
  const image = detailData?.FingerMapping?.Image?.url || null;
  const finger = detailData?.FingerMapping?.Finger || "Thumb";
  const tags = [finger, "Grounding", "Stability"];

  const overview = detailData?.FingerMapping?.ShortDescription || "";
  const characteristics = detailData?.Characteristics || [];
  const howToBalance = detailData?.HowToBalance || [];
  
  // Imbalance state properties
  const excess = detailData?.SignsofImbalance?.Excess || null;
  const deficient = detailData?.SignsofImbalance?.Deficient || null;
  const imbalanceBg = detailData?.ImbalanceStates?.CardBackground || null;

  // Harmony properties
  const harmony = detailData?.Harmony || [];
  const balanced = (harmony && harmony.length > 0)
    ? {
        title: `Balanced ${name} brings`,
        points: harmony
      }
    : null;

  return (
    <main>
      <ElementDetailTemplateHero 
        title={title}
        description={description}
        tags={tags}
        image={image}
        category="Five Elements"
        onPlayClick={() => {
          const el = document.getElementById("harmony");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        onSaveClick={() => {
          const el = document.getElementById("balance");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <OverviewElement overview={overview} title={title} />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <Characteristics characteristics={characteristics} />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      
      <div id="imbalance">
        <SignsOfImbalance excess={excess} deficient={deficient} cardBackground={imbalanceBg} />
      </div>
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      
      <div id="balance">
        <BalanceEarth howToBalance={howToBalance} elementName={name} />
      </div>
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      
      <div id="harmony">
        {balanced ? (
          <InHarmony balanced={balanced} heading={`${name} in Harmony`} />
        ) : (
          <InHarmony heading={`${name} in Harmony`} />
        )}
      </div>
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <ExploreMore />
    </main>
  );
}

export default function ElementDetailTemplate() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="mt-4 text-sm text-gray-500">Loading...</p>
      </div>
    }>
      <ElementDetailContent />
    </Suspense>
  );
}