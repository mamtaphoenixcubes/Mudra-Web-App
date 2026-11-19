
"use client";

import Script from "next/script";
import { useEffect, useState, useCallback, type CSSProperties } from "react";

type CheckoutResult = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type CheckoutOptions = {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  handler: (result: CheckoutResult) => void | Promise<void>;
  modal?: { ondismiss?: () => void };
};

declare global {
  interface Window {
    Razorpay?: new (options: CheckoutOptions) => { open: () => void };
  }
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function RazorpayPayment({
  profileDocumentId,
  subscriptionPlanDocumentId,
  buttonText = "Pay",
  className = "",
  style,
  disabled = false,
  autoPay = false,
  renderButton = true,
}: {
  profileDocumentId?: string | null;
  subscriptionPlanDocumentId?: string | null;
  buttonText?: string;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  autoPay?: boolean;
  renderButton?: boolean;
}) {
  const [scriptReady, setScriptReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  // Start automatic payment only after Razorpay is loaded
  useEffect(() => {
    if (
      autoPay &&
      scriptReady &&
      profileDocumentId &&
      subscriptionPlanDocumentId
    ) {
      pay();
    }
  }, [
    autoPay,
    scriptReady,
    profileDocumentId,
    subscriptionPlanDocumentId,
  ]);

  const pay = useCallback(async () => {
    if (!profileDocumentId || !subscriptionPlanDocumentId) {
      setMessage("Missing profile or subscription information.");
      return;
    }

    if (!API_BASE) {
      setMessage("NEXT_PUBLIC_API_BASE_URL is not configured.");
      return;
    }

    if (!window.Razorpay) {
      setMessage("Razorpay Checkout has not loaded yet.");
      return;
    }

    if (busy) return;

    setBusy(true);
    setMessage("");

    try {
      const orderResponse = await fetch(
        `${API_BASE}/payments/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            profileDocumentId,
            subscriptionPlanDocumentId,
          }),
        }
      );

      const orderResult = await orderResponse.json();

      if (!orderResponse.ok || !orderResult.success) {
        throw new Error(
          orderResult.message || "Could not create payment order."
        );
      }

      const order = orderResult.data;

      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,

        handler: async (result) => {
          try {
            const verifyResponse = await fetch(
              `${API_BASE}/payments/verify`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  profileDocumentId,
                  subscriptionPlanDocumentId,
                  razorpayOrderId: result.razorpay_order_id,
                  razorpayPaymentId: result.razorpay_payment_id,
                  razorpaySignature: result.razorpay_signature,
                }),
              }
            );

            const verifyResult = await verifyResponse.json();

            if (!verifyResponse.ok || !verifyResult.success) {
              throw new Error(
                verifyResult.message || "Payment verification failed."
              );
            }

            setMessage("Payment successful.");
          } catch (error) {
            setMessage(
              error instanceof Error
                ? error.message
                : "Verification failed."
            );
          } finally {
            setBusy(false);
          }
        },

        modal: {
          ondismiss: () => setBusy(false),
        },
      });

      checkout.open();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Could not start payment."
      );

      setBusy(false);
    }
  }, [profileDocumentId, subscriptionPlanDocumentId, busy]);

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />

      {renderButton && (
        <button
          type="button"
          onClick={pay}
          disabled={
            !scriptReady ||
            busy ||
            disabled ||
            !profileDocumentId ||
            !subscriptionPlanDocumentId
          }
          className={className}
          style={style}
        >
          {busy ? "Processing..." : buttonText}
        </button>
      )}

      {message && <p>{message}</p>}
    </>
  );
}
