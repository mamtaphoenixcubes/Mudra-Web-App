
"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { typography, spacing, card } from "../../theme";
import { Check } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import SiteContainer from "../../common/SiteContainer";
import RazorpayPayment from "../RazorpayPayment";
import { useAuthStore } from "../../store/useAuthStore";

export default function PricingSection({
  plans = [],
  loading = false,
  error = null,
}) {
  const { dark, textColor } = useTheme();
  const { user } = useAuthStore();
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.05,
    margin: "-50px",
  });

  const [selected, setSelected] = useState(() => {
    const popularPlan = plans.find((plan) => plan.IsPopular);
    return popularPlan?.documentId || plans[0]?.documentId || null;
  });
  const [checkoutPlan, setCheckoutPlan] = useState(null);
  const profileDocumentId =
    user?.profileDocumentId ||
    user?.profileDocId ||
    user?.id ||
    null;

  const handlePlanCheckout = (plan) => {
    if (!profileDocumentId || !plan?.documentId) return;

    setSelected(plan.documentId);
    setCheckoutPlan({
      profileDocumentId,
      subscriptionPlanDocumentId: plan.documentId,
    });
  };

  // Currency formatter
  const formatPrice = (price, currency = "INR") => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(Number(price || 0));
  };

  // Billing text
  const getBillingText = (plan) => {
    switch (plan.BillingType) {
      case "FREE":
        return "Forever free";

      case "MONTHLY":
        return "Billed monthly";

      case "YEARLY":
        return "Billed yearly";

      case "ONE_TIME":
        return "One-time payment";

      default:
        return plan.BillingType || "";
    }
  };

  // CTA text
  const getButtonText = (plan) => {
    if (plan.PlanType === "FREE") {
      return "Get Started Free";
    }

    if (plan.BillingType === "ONE_TIME") {
      return "Get Lifetime Access";
    }

    if (plan.TrialEnabled && plan.TrialDays > 0) {
      return `Start ${plan.TrialDays}-Day Free Trial`;
    }

    return `Choose ${plan.Name}`;
  };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const planVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      className={spacing.sectionPaddingY}
      style={{
        backgroundColor: dark ? "#111827" : "#ffffff",
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <SiteContainer
        sx={{
          width: "100%",
          maxWidth: {
            xs: "100%",
            sm: "100%",
            md: "1200px",
            lg: "1360px",
            xl: "1600px",
          },
          mx: "auto",
          px: {
            xs: 2,
            sm: 3,
            md: 3,
            lg: 3,
            xl: 3,
          },
          py: 0,
        }}
      >
        {/* Loading */}
        {loading && (
          <p className="text-center py-10" style={{ color: textColor }}>
            Loading subscription plans...
          </p>
        )}

        {/* Error */}
        {!loading && error && (
          <p className="text-center text-red-500 py-10">
            {error}
          </p>
        )}

        {/* Empty */}
        {!loading && !error && plans.length === 0 && (
          <p className="text-center py-10" style={{ color: textColor }}>
            No subscription plans available.
          </p>
        )}

        {/* Pricing Cards */}
        {!loading && !error && plans.length > 0 && (
          <motion.div
            className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-2 -mx-4 px-4 md:mx-0 pt-8 sm:pt-10 md:pt-1 md:px-0 md:grid md:grid-cols-4 md:overflow-visible md:gap-2 lg:gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {plans.map((plan) => {
              const isSelected = selected === plan.documentId;
              const isDisabledPlan = ["premium", "premium plus"].includes(
                  plan.Name?.trim().toLowerCase()
                );
              return (
                <motion.div
                  key={plan.documentId}
                  onClick={() => setSelected(plan.documentId)}
                  className={`${card.radius} border p-6 md:p-3 lg:p-6 flex flex-col relative cursor-pointer transition-colors shrink-0 w-[80%] sm:w-[45%] md:w-auto snap-center ${
                    isSelected
                      ? "border-primary"
                      : "border-gray-200"
                  }`}
                  style={{
                    backgroundColor: isSelected
                      ? "#9A85FE"
                      : dark
                        ? "#1f2937"
                        : "#ffffff",
                    borderColor: isSelected
                      ? "#9A85FE"
                      : dark
                        ? "#374151"
                        : "#e5e7eb",
                  }}
                  variants={planVariants}
                  whileHover={{
                    y: -6,
                    boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Popular Badge */}
                  {plan.IsPopular && (
                    <motion.span
                      className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] md:text-[9px] lg:text-xs font-semibold px-3 md:px-2 py-1 rounded-full whitespace-nowrap"
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.3,
                        duration: 0.3,
                      }}
                    >
                      Most Popular
                    </motion.span>
                  )}

                  {/* Plan Name */}
                  <motion.h3
                    className={`${typography.cardTitle} text-base md:text-xs lg:text-base font-semibold text-center mb-3`}
                    style={{ color: isSelected ? "#ffffff" : textColor }}
                  >
                    {plan.Name}
                  </motion.h3>

                  {/* Price */}
                  <div className="text-center mb-2">
                    <motion.span
                      className="text-3xl md:text-xl lg:text-3xl font-bold"
                      style={{
                        color: isSelected
                          ? "#ffffff"
                          : dark
                            ? "#e5e7eb"
                            : "#111827",
                      }}
                    >
                      {formatPrice(plan.Price, plan.Currency)}
                    </motion.span>
                  </div>

                  {/* Billing Information */}
                  <p
                    className="text-xs md:text-[9px] lg:text-xs text-center mb-4"
                    style={{
                      color: isSelected
                        ? "rgba(255,255,255,0.8)"
                        : dark
                          ? "#9ca3af"
                          : "#6b7280",
                    }}
                  >
                    {getBillingText(plan)}
                  </p>

                  {/* Trial Information */}
                  {plan.TrialEnabled && plan.TrialDays > 0 && (
                    <p
                      className="text-xs text-center mb-3"
                      style={{
                        color: isSelected
                          ? "#ffffff"
                          : textColor,
                      }}
                    >
                      {plan.TrialDays} days free trial
                    </p>
                  )}

                  {/* Features */}
                  <ul className="flex flex-col gap-2.5 md:gap-1 lg:gap-2.5 mb-6 md:mb-3 lg:mb-6">
                    {(Array.isArray(plan.Description)
                      ? plan.Description
                      : []
                    ).map((feature, idx) => (
                      <motion.li
                        key={`${plan.documentId}-${idx}`}
                        className="flex items-center gap-2 md:gap-1 lg:gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: idx * 0.05 + 0.1,
                          duration: 0.3,
                        }}
                      >
                        <span
                          className="flex items-center justify-center w-4 h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 rounded-full shrink-0"
                          style={{
                            backgroundColor: isSelected
                              ? "rgba(255,255,255,0.2)"
                              : dark
                                ? "#374151"
                                : "#f3f4f6",
                            color: isSelected
                              ? "#ffffff"
                              : dark
                                ? "#9ca3af"
                                : "#6b7280",
                          }}
                        >
                          <Check
                            size={10}
                            className="md:!size-[6px] lg:!size-[10px]"
                            strokeWidth={3}
                          />
                        </span>

                        <span
                          className="text-xs md:text-[8px] lg:text-xs"
                          style={{
                            color: isSelected
                              ? "#FFFFFF"
                              : textColor,
                          }}
                        >
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <div className="mt-auto">
                    {checkoutPlan?.subscriptionPlanDocumentId === plan.documentId && (
                      <RazorpayPayment
                        profileDocumentId={checkoutPlan.profileDocumentId}
                        subscriptionPlanDocumentId={checkoutPlan.subscriptionPlanDocumentId}
                        autoPay
                        renderButton={false}
                      />
                    )}

                    <button
                      type="button"
                      className="w-full py-2.5 md:py-1.5 lg:py-2.5 rounded-lg text-sm md:text-[10px] lg:text-sm font-medium transition-colors cursor-pointer"
                      style={{
                        backgroundColor: isSelected
                          ? "#ffffff"
                          : dark
                            ? "#374151"
                            : "#ffffff",
                        color: isSelected
                          ? "#9A85FE"
                          : dark
                            ? "#e5e7eb"
                            : "#374151",
                        border: isSelected
                          ? "none"
                          : dark
                            ? "1px solid #374151"
                            : "1px solid #e5e7eb",
                      }}
                      onClick={(event) => {
                        event.stopPropagation();
                        handlePlanCheckout(plan);
                      }}
                      disabled={
                        isDisabledPlan ||
                        !profileDocumentId ||
                        !plan?.documentId
                      }
                    >
                      {getButtonText(plan)}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </SiteContainer>
    </motion.section>
  );
}
