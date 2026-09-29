"use client";

import { useEffect, useState } from "react";
import Learnscreen from "../../components/AilmentsMudrasforNeeds/Learnscreen";
import AilmentsMudrashero from "../../components/AilmentsMudrasforNeeds/AilmentsMudrashero";
import SuggestedMudras from "../../components/AilmentsMudrasforNeeds/Suggestedmudras";
import PracticeSteps from "../../components/AilmentsMudrasforNeeds/Practicesteps";
import FaqAndCta from "../../components/AilmentsMudrasforNeeds/Faqandcta";
import { needsService } from "../../services/apiService";

export default function AilmentsMudrasforNeeds() {
  const [needs, setNeeds] = useState([]);
  const [activeNeedId, setActiveNeedId] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Needs list on mount
  useEffect(() => {
    async function loadNeeds() {
      try {
        const response = await needsService.getNeedsCategories();
        if (response && response.success && Array.isArray(response.data)) {
          setNeeds(response.data);
          // Set first need as active initially (prefer stress & anxiety if found)
          const stressNeed = response.data.find(
            (n) => n.documentId === "ohiyk60qhza1ylkyzcep3npm"
          );
          if (stressNeed) {
            setActiveNeedId(stressNeed.documentId);
          } else if (response.data.length > 0) {
            setActiveNeedId(response.data[0].documentId);
          }
        }
      } catch (err) {
        console.error("Failed fetching needs categories:", err);
      }
    }
    loadNeeds();
  }, []);

  // 2. Fetch specific Need Details when activeNeedId changes
  useEffect(() => {
    if (!activeNeedId) return;
    async function loadDetail() {
      setLoading(true);
      try {
        const response = await needsService.getNeedDetails(activeNeedId);
        if (response && response.success && response.data) {
          setSelectedDetail(response.data);
        }
      } catch (err) {
        console.error(`Failed fetching details for need ${activeNeedId}:`, err);
      } finally {
        setLoading(false);
      }
    }
    loadDetail();
  }, [activeNeedId]);

  return (
    <main>
      <AilmentsMudrashero />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <Learnscreen
        needs={needs}
        activeNeedId={activeNeedId}
        setActiveNeedId={setActiveNeedId}
        selectedDetail={selectedDetail}
        loading={loading}
      />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <SuggestedMudras 
        mudras={selectedDetail?.mudras || []} 
        activeNeedId={activeNeedId}
        activeNeedName={selectedDetail?.Name}
      />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <PracticeSteps 
        tips={selectedDetail?.Web?.LifeStyleTips || []} 
        title={selectedDetail?.Name}
      />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <FaqAndCta 
        faqs={selectedDetail?.Web?.MudraForNeed?.NeedFAQs || []} 
      />
    </main>
  );
}