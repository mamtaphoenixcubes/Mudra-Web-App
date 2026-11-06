
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


  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!profileDocumentId) return;

    const fetchOverview = async () => {
      try {
        setLoading(true);
        setError(null);

        const response =
          await progressInsightService.getOverview(profileDocumentId);

        console.log("Progress Overview API Response:", response);

        setOverview(response);
      } catch (err) {
        console.error("Overview API Error:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, [profileDocumentId]);


   return(
       <main>
           <ProgressInsights/>
           <Practiceanalysis/>
           <Consistency/>
           <Analytics/>
       </main>
   )
}
