
"use client";

import { useEffect, useState } from "react";

import Analytics from "../../components/Progressinsights/Analytics";
import Consistency from "../../components/Progressinsights/Consistency";
import Practiceanalysis from "../../components/Progressinsights/Practiceanalysis";
import ProgressInsights from "../../components/Progressinsights/Progressinsights";

import { progressInsightService } from "../../services/apiService";
import { useAuthStore } from "../../store/useAuthStore";

export default function Progressinsights() {
  const { user } = useAuthStore();

  const profileDocumentId = user?.id;

  const [overviewData, setOverviewData] = useState(null);
  const [overview, setOverview] = useState(null);
  const [analytics, setAnalytics] = useState(null);

  const [loading, setLoading] = useState(false);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!profileDocumentId) return;

    const fetchProgressData = async () => {
      try {
        setLoading(true);
        setAnalysisLoading(true);
        setError(null);

        // 1. Overview API
        const overviewResponse =
          await progressInsightService.getAnalysis(profileDocumentId);

        console.log("Overview API Response:", overviewResponse);

        setOverviewData(
          overviewResponse?.data?.data ||
          overviewResponse?.data ||
          overviewResponse
        );

        // 2. Distribution API
        const distributionResponse =
          await progressInsightService.getDistribution(profileDocumentId);

        setOverview(
          distributionResponse?.data?.data ||
          distributionResponse?.data ||
          distributionResponse
        );

        // 3. Analytics API
        const analysisResponse =
          await progressInsightService.getAnalytics(profileDocumentId);


        setAnalytics(
          analysisResponse?.data?.data ||
          analysisResponse?.data ||
          analysisResponse
        );

      } catch (err) {
        console.error("Progress Insights API Error:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
        setAnalysisLoading(false);
      }
    };

    fetchProgressData();
  }, [profileDocumentId]);

  return (
    <main>
      <ProgressInsights
        overview={overviewData}
        loading={loading}
      />

      <Practiceanalysis
        overview={overview}
        loading={loading}
      />

      <Consistency />

      <Analytics
        analysis={analytics}
        loading={analysisLoading}
      />
    </main>
  );
}
