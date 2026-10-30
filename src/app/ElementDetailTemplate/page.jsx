"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import OverviewElement from "../../components/ElementDetailTemplate/OverviewElement";
import ElementDetailTemplateHero from "../../components/ElementDetailTemplate/ElementDetailTemplateHero";
import Characteristics from "../../components/ElementDetailTemplate/Characteristics";
import SignsOfImbalance from "../../components/ElementDetailTemplate/SignsOfImbalance";
import BalanceEarth from "../../components/ElementDetailTemplate/BalanceEarth";
import ExploreMore from "../../components/ElementDetailTemplate/ExploreMore";
import { elementsService } from "../../services/apiService";

function ElementDetailContent() {
  const searchParams = useSearchParams();
  const documentId = searchParams.get("id") || "in4vcbjj65hiqpk4gs49mja7";

  const [detailData, setDetailData] = useState(null);
console.log(detailData,"detailDatadetailDatadetailData");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchElementDetails() {
      if (!documentId) return;

      setLoading(true);

      try {
        const response = await elementsService.getElementDetails(documentId);
          console.log(response?.data,"adwdwa");

        if (response?.data) {
          
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
        <p className="mt-4 text-sm text-gray-500">
          Loading element details...
        </p>
      </div>
    );
  }

  if (!detailData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Element details not found.
      </div>
    );
  }

  const name = detailData?.Name || "Earth";
  const title = `${name} Element`;

  // Hero properties
  const description = detailData?.Description || "";
  const image = detailData?.Image?.url || null;
  const finger = detailData?.Finger || "";

  const tags = finger ? [finger] : [];

  // Overview
  const overview = detailData?.Overview || "";

  // Characteristics
  const characteristics = (detailData?.Characteristics || [])
    .filter((item) => item.IsActive)
    .map((item) => ({
      ...item,
      name: item.Name,
      description: item.Description,
    }));

  // Signs of imbalance
  const balanceSigns = (detailData?.BalanceSigns || []).filter(
    (item) => item.IsActive
  );

  const excess =
    balanceSigns.find((item) => item.Type === "EXCESS") || null;

  const deficient =
    balanceSigns.find((item) => item.Type === "DEFICIENT") || null;

  // Balancing methods
const howToBalance = (detailData?.BalancingMethods || []).filter(
  (item) => item.IsActive
);

  return (
    <main>
      <ElementDetailTemplateHero
        title={title}
        description={description}
        tags={tags}
        image={image}
        category="Five Elements"
        onPlayClick={() => {
          const el = document.getElementById("imbalance");
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
        <SignsOfImbalance
          excess={excess}
          deficient={deficient}
          cardBackground={null}
        />
      </div>

      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>

      <div id="balance">
        <BalanceEarth
          howToBalance={howToBalance}
          elementName={name}
        />
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
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-sm text-gray-500">Loading...</p>
        </div>
      }
    >
      <ElementDetailContent />
    </Suspense>
  );
}