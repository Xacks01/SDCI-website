'use client';

import { useEffect } from "react";
import Script from "next/script";

export function LumaInit() {
  useEffect(() => {
    const initLuma = () => {
      if (typeof window !== "undefined" && (window as any).luma?.initCheckout) {
        try {
          (window as any).luma.initCheckout();
        } catch (e) {
          console.error("Failed to initialize Luma checkout:", e);
        }
      }
    };

    initLuma();

    const t1 = setTimeout(initLuma, 200);
    const t2 = setTimeout(initLuma, 800);
    const t3 = setTimeout(initLuma, 2000);

    const observer = new MutationObserver(() => {
      initLuma();
    });

    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      observer.disconnect();
    };
  }, []);

  return (
    <Script
      id="luma-checkout"
      src="https://embed.lu.ma/checkout-button.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (typeof window !== "undefined" && (window as any).luma?.initCheckout) {
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
