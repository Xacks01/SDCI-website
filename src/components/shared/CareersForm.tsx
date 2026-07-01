"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { cvSubmissionAction } from "@/app/actions";

export const CareersForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "research",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = "Your name is required.";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    setMessage("");

    const res = await cvSubmissionAction({
      name: formData.name,
      email: formData.email,
      interest: formData.interest,
    });
    setLoading(false);

    if (res.success) {
      setIsSuccess(true);
      setMessage(res.message || "CV submitted successfully!");
      setFormData({
        name: "",
        email: "",
        interest: "research",
      });
      setErrors({});
    } else {
      setIsSuccess(false);
      setMessage(res.error || "Submission failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 border border-neutral-200 rounded-none shadow-sm max-w-xl mx-auto font-sans">
      <div className="space-y-4">
        <Input
          label="Your Name"
          placeholder="e.g. Chinedu Okafor"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
        />
        
        <Input
          label="Email Address"
          type="email"
          placeholder="chinedu@example.com"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
        />

        <Select
          label="Area of Interest"
          required
          options={[
            { label: "Research & Policy Advocacy", value: "research" },
            { label: "Partnerships & Programs", value: "programs" },
            { label: "Stakeholder Engagement", value: "engagement" },
            { label: "Communications & Media", value: "media" },
            { label: "Operations & HR", value: "operations" },
          ]}
          value={formData.interest}
          onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
        />
      </div>

      <div className="pt-4 border-t border-neutral-100 flex flex-col items-center gap-4">
        <Button type="submit" variant="dark-green" className="w-full md:w-auto font-bold" loading={loading}>
          Submit CV
        </Button>

        {message && (
          <p className={`text-sm font-semibold text-center ${isSuccess ? "text-green-700" : "text-red-600"}`}>
            {message}
          </p>
        )}
      </div>
    </form>
  );
};
