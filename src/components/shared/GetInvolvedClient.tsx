"use client";

import React, { useState } from "react";
import Script from "next/script";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input, Textarea } from "@/components/ui/Input";
import { Accordion } from "@/components/ui/Accordion";

interface GetInvolvedClientProps {
  tiers: any[];
}

export const GetInvolvedClient: React.FC<GetInvolvedClientProps> = ({ tiers }) => {
  const [currency, setCurrency] = useState<"NGN" | "USD">("NGN");

  // Donation state
  const [donateAmount, setDonateAmount] = useState("");
  const [donateEmail, setDonateEmail] = useState("donor@example.com");
  const [donateLoading, setDonateLoading] = useState(false);
  const [paymentMsg, setPaymentMsg] = useState("");

  // Helper to initialize Paystack Sandbox transaction
  const initializePaystack = (email: string, amount: number, callback: (ref: any) => void) => {
    // Check if window.PaystackPop exists
    const handler = (window as any).PaystackPop?.setup({
      key: "pk_test_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0", // Standard public sandbox test key
      email: email,
      amount: amount * 100, // In kobo / cents
      currency: currency,
      ref: "SDCI_" + Math.floor(Math.random() * 1000000000 + 1),
      callback: function (response: any) {
        callback(response);
      },
      onClose: function () {
        setPaymentMsg("Payment cancelled.");
      },
    });
    handler?.openIframe();
  };

  const handleCheckout = (tierName: string, price: number) => {
    if (price === 0) {
      setPaymentMsg(`Thank you! You have joined the ${tierName} tier for free.`);
      return;
    }

    setPaymentMsg(`Opening Paystack checkout for ${tierName} tier...`);
    
    // Trigger Sandbox Paystack Checkout
    try {
      initializePaystack("member@example.com", price, (response) => {
        setPaymentMsg(`Payment successful! Reference: ${response.reference}. You are now subscribed to ${tierName}.`);
      });
    } catch (err) {
      console.error(err);
      setPaymentMsg("Checkout error. Ensure scripts are fully loaded.");
    }
  };

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(donateAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setPaymentMsg("Please enter a valid donation amount.");
      return;
    }

    setPaymentMsg(`Opening Paystack checkout for donation of ${currency} ${amountNum}...`);
    try {
      initializePaystack(donateEmail, amountNum, (response) => {
        setPaymentMsg(`Thank you for your donation of ${currency} ${amountNum}! Reference: ${response.reference}`);
        setDonateAmount("");
      });
    } catch (err) {
      console.error(err);
      setPaymentMsg("Donation gateway failure. Please retry.");
    }
  };



  return (
    <>
      <Script src="https://js.paystack.co/v1/inline.js" strategy="lazyOnload" />

      <div className="space-y-24 max-w-7xl mx-auto px-6 py-12 font-sans text-petrol-950 dark:text-neutral-200">
        {/* 1. Membership Section */}
        <section id="membership" className="space-y-12">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold font-serif text-petrol-950 dark:text-white">Select Membership Tier</h2>
              <p className="text-neutral-700 dark:text-neutral-400 text-sm md:text-base max-w-xl">
                Membership keeps our research independent and gives you a front-row seat to the conversation. Select the tier that fits you.
              </p>
            </div>
            
            {/* Currency Switcher */}
            <div className="bg-neutral-100 dark:bg-petrol-950/60 p-1 rounded-none flex border border-neutral-200 dark:border-petrol-800 text-xs font-semibold">
              <button
                onClick={() => setCurrency("NGN")}
                className={`px-4 py-2 rounded-none transition-colors cursor-pointer ${
                  currency === "NGN" ? "bg-white dark:bg-petrol-900 text-petrol-950 dark:text-white shadow-sm font-bold" : "text-neutral-500 dark:text-neutral-400 hover:text-petrol-950 dark:hover:text-white"
                }`}
              >
                ₦ Naira
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className={`px-4 py-2 rounded-none transition-colors cursor-pointer ${
                  currency === "USD" ? "bg-white dark:bg-petrol-900 text-petrol-950 dark:text-white shadow-sm font-bold" : "text-neutral-500 dark:text-neutral-400 hover:text-petrol-950 dark:hover:text-white"
                }`}
              >
                $ USD (Diaspora)
              </button>
            </div>
          </div>

          {paymentMsg && (
            <div className="p-4 bg-lime-100 dark:bg-lime-950/20 border-l-4 border-green-800 dark:border-green-500 text-petrol-950 dark:text-lime-300 text-xs font-semibold rounded-none">
              {paymentMsg}
            </div>
          )}

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tiers.map((tier) => {
              const price = currency === "NGN" ? tier.priceNGN : tier.priceUSD;
              const formattedPrice =
                price === 0
                  ? "Free"
                  : currency === "NGN"
                  ? `₦${price.toLocaleString()}`
                  : `$${price.toLocaleString()}`;

              return (
                <Card key={tier.name} variant="default" className="p-8 flex flex-col justify-between h-full bg-white dark:bg-petrol-900/40 border border-neutral-200 dark:border-petrol-800">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold font-serif text-petrol-950 dark:text-white">{tier.name}</h3>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{tier.audience}</p>
                    </div>
                    <div className="text-3xl font-bold text-green-800 dark:text-green-500 font-sans">
                      {formattedPrice}
                      {price > 0 && <span className="text-xs text-neutral-400 dark:text-neutral-400 font-semibold"> / year</span>}
                    </div>
                    <ul className="space-y-3 pt-6 border-t border-neutral-100 dark:border-petrol-800/60 text-sm text-neutral-700 dark:text-neutral-400 leading-relaxed">
                      {tier.features?.map((f: any, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-green-800 dark:text-green-500 font-bold flex-shrink-0">•</span>
                          <span>{f.feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-8">
                    <Button
                      onClick={() => handleCheckout(tier.name, price)}
                      variant={price === 0 ? "outline" : "dark-green"}
                      className="w-full text-xs font-bold"
                    >
                      {tier.ctaLabel || "Become a member"}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>


        {/* 3. Partner with Us Section */}
        <section id="partner" className="grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-neutral-200 dark:border-petrol-800 pt-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold font-serif text-petrol-950 dark:text-white">Partner with us</h2>
            <p className="text-neutral-800 dark:text-neutral-400 text-sm md:text-base leading-relaxed">
              We work with foundations, government bodies, businesses, and international organisations on research, events, and programmes. If you have a question worth answering or a convening worth hosting, let&apos;s talk.
            </p>
            <div className="space-y-3">
              <h3 className="font-bold text-sm uppercase tracking-wider text-petrol-950 dark:text-white">Ways to partner:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-neutral-700 dark:text-neutral-300 font-semibold">
                <li>• Commission research project</li>
                <li>• Sponsor an event / conference</li>
                <li>• Fund a capacity building program</li>
                <li>• Collaborate on a study paper</li>
              </ul>
            </div>
            <div className="pt-4">
              <a href="mailto:partnerships@sdci.org.ng">
                <Button variant="primary">Start a conversation</Button>
              </a>
            </div>
          </div>

          <div className="bg-petrol-50/50 dark:bg-petrol-900/10 p-8 rounded-none border border-neutral-200 dark:border-petrol-800 space-y-6">
            <h3 className="text-lg font-bold font-serif text-petrol-950 dark:text-white">Partnership Inquiries</h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-400 leading-relaxed">
              Send your request details to our Partnerships & Funding team at <span className="font-bold text-green-800 dark:text-green-500">partnerships@sdci.org.ng</span> and we will respond with timelines and details.
            </p>
          </div>
        </section>

        {/* 4. Donations Section */}
        <section id="donate" className="max-w-2xl mx-auto space-y-6 border-t border-neutral-200 dark:border-petrol-800 pt-16 text-center">
          <h2 className="text-3xl font-bold font-serif text-petrol-950 dark:text-white">Donate to SDCI</h2>
          <p className="text-neutral-700 dark:text-neutral-400 text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Independent research needs independent funding. A donation &mdash; large or small &mdash; helps keep our work free to read and free from any single backer&apos;s agenda.
          </p>
          
          <form onSubmit={handleDonate} className="flex flex-col md:flex-row gap-3 max-w-md mx-auto items-end justify-center">
            <div className="w-full text-left">
              <label className="block text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-1.5 uppercase">Amount ({currency})</label>
              <input
                type="number"
                placeholder="e.g. 5000"
                required
                value={donateAmount}
                onChange={(e) => setDonateAmount(e.target.value)}
                className="w-full px-4 py-2.5 rounded-none bg-white dark:bg-petrol-900 border border-neutral-300 dark:border-petrol-800 text-petrol-950 dark:text-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-800/50 dark:focus:ring-green-500/50"
              />
            </div>
            <Button type="submit" variant="secondary" className="w-full md:w-auto shrink-0 font-bold" loading={donateLoading}>
              Donate
            </Button>
          </form>
        </section>


      </div>
    </>
  );
};
