
"use client";

import { useEffect, useState } from "react";

import PricingSection from "../../components/PricingMembership/PricingSection";
import PricingMembershipHero from "../../components/PricingMembership/PricingMembershipHero";
import CompletePracticeSection from "../../components/PricingMembership/CompletePracticeSection";
import ExperiencetheFullPower from "../../components/PricingMembership/ExperiencetheFullPower";

import { subscriptionService } from "../../services/apiService";

export default function PricingMembership() {
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscriptionPlans = async () => {
      try {
        setLoading(true);

        const response = await subscriptionService.getSubscriptionPlans();

        console.log("Subscription Plans:", response);

        const plans = Array.isArray(response?.data)
          ? response.data
          : [];

        setSubscriptionPlans(
          plans
            .filter((plan) => plan.IsActive)
            .sort((a, b) => a.SortOrder - b.SortOrder)
        );
      } catch (err) {
        console.error("Subscription Plans API Error:", err);
        setError(
          err.response?.data?.message ||
          err.message ||
          "Failed to fetch subscription plans"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionPlans();
  }, []);

  return (
    <main>
      <PricingMembershipHero />

      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>

      <PricingSection
        plans={subscriptionPlans}
        loading={loading}
        error={error}
      />

      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>

      <CompletePracticeSection />

      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>

      <ExperiencetheFullPower />
    </main>
  );
}
