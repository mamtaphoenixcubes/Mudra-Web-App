"use client";

import { useEffect, useState } from "react";

import MudraNidraBenefits from "../../components/Benefits/MudraNidraBenefits";
import BenefitsHero from "../../components/Benefits/BenefitsHero";
import DownloadAppBanner from "../../components/Downloadapp/DownloadAppBanner";
import MudrasMayHelp from "../../components/Benefits/MudrasMayHelp";
import DoesResearch from "../../components/Benefits/DoesResearch";

import { combinedBenefitService } from "../../services/apiService";

export default function Benefits() {
  const [benefits, setBenefits] = useState([]);

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const response =
          await combinedBenefitService.getCombinedBenefits();

        if (response?.success && Array.isArray(response.data)) {
          setBenefits(response.data);
        }
      } catch (error) {
        console.error("Error fetching combined benefits:", error);
      }
    };

    fetchBenefits();
  }, []);

  return (
    <main>
      <BenefitsHero />

      <MudraNidraBenefits benefits={benefits} />

      <MudrasMayHelp />
      <DoesResearch />
      <DownloadAppBanner />
    </main>
  );
}