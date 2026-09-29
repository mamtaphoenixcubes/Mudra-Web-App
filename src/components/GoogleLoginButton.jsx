"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

export default function GoogleLoginButton({
    clientId,
    onSuccess,
    onError,
}) {
    const buttonRef = useRef(null);

    const renderGoogleButton = () => {
        if (
            !window.google ||
            !window.google.accounts ||
            !window.google.accounts.id ||
            !buttonRef.current ||
            !clientId
        ) {
            return;
        }

        // Prevent rendering the button multiple times
        buttonRef.current.innerHTML = "";

        window.google.accounts.id.initialize({
            client_id: clientId,

            callback: async (response) => {
                try {
                    const idToken = response?.credential;

                    if (!idToken) {
                        throw new Error(
                            "Google ID token was not received"
                        );
                    }

                    console.log(
                        "GOOGLE ID TOKEN RECEIVED"
                    );

                    const apiBase =
                        process.env.NEXT_PUBLIC_API_BASE_URL;

                    if (!apiBase) {
                        throw new Error(
                            "NEXT_PUBLIC_API_BASE_URL is not configured"
                        );
                    }

                    const res = await fetch(
                        `${apiBase}/auth/google`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type":
                                    "application/json",
                            },
                            body: JSON.stringify({
                                idToken,
                            }),
                        }
                    );

                    const data = await res.json();

                    if (!res.ok) {
                        throw new Error(
                            data?.message ||
                                data?.error ||
                                "Google login failed"
                        );
                    }

                    console.log(
                        "GOOGLE LOGIN SUCCESS:",
                        data
                    );

                    onSuccess?.(data);
                } catch (error) {
                    console.error(
                        "GOOGLE LOGIN ERROR:",
                        error
                    );

                    onError?.(error);
                }
            },
        });

        window.google.accounts.id.renderButton(
            buttonRef.current,
            {
                theme: "outline",
                size: "large",
                width: "100%",
                text: "continue_with",
                shape: "rectangular",
            }
        );
    };

    useEffect(() => {
        if (
            window.google?.accounts?.id
        ) {
            renderGoogleButton();
        }
    }, [clientId]);

    return (
        <>
            <Script
                src="https://accounts.google.com/gsi/client"
                strategy="afterInteractive"
                onLoad={renderGoogleButton}
            />

            <div
                ref={buttonRef}
                className="w-full flex justify-center"
            />
        </>
    );
}