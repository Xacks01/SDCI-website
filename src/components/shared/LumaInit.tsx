'use client';

import { useEffect } from "react";
import Script from "next/script";

export function LumaInit() {
  useEffect(() => {
    // Re-initialize Luma checkout when client-side routing changes/components mount
    if (typeof window !== "undefined" && (window as any).luma) {
      try {
        (window as any).luma.initCheckout();
      } catch (e) {
        console.error("Failed to initialize Luma checkout:", e);
      }
    }
  }, []);

  return (
    <Script
      id="luma-checkout"
      src="https://embed.lu.ma/checkout-button.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (typeof window !== "undefined" && (window as any).luma) {
          try {
            (window as any).luma.initCheckout();
          } catch (e) {
            console.error("Failed to initialize Luma checkout on script load:", e);
          }
        }
      }}
    />
  );
}
