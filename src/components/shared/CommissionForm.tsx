"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { consultationRequestAction } from "@/app/actions";

export const CommissionForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organisation: "",
    engagementType: "research" as "research" | "training" | "advisory" | "evaluation" | "other",
    deliverables: "",
    timeline: "",
    budget: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = "Your name is required.";
    if (!formData.email.trim()) {
      tempErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email address is invalid.";
    }
    if (!formData.organisation.trim()) tempErrors.organisation = "Organisation is required.";
    if (!formData.deliverables.trim()) tempErrors.deliverables = "Deliverables description is required.";
    if (!formData.timeline.trim()) tempErrors.timeline = "Timeline details are required.";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    setMessage("");

    const res = await consultationRequestAction(formData);
    setLoading(false);

    if (res.success) {
      setIsSuccess(true);
      setMessage(res.message || "Consultation request sent successfully!");
      setFormData({
        name: "",
        email: "",
        organisation: "",
        engagementType: "research",
        deliverables: "",
        timeline: "",
        budget: "",
      });
      setErrors({});
    } else {
      setIsSuccess(false);
      setMessage(res.error || "Failed to submit request.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 border border-neutral-200 rounded-none shadow-sm max-w-2xl mx-auto font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Your Name"
          placeholder="e.g. Amina Bello"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
        />
        
        <Input
          label="Email Address"
          type="email"
          placeholder="amina@example.com"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
        />

        <Input
          label="Organisation"
          placeholder="Company, NGO, Agency name"
          required
          value={formData.organisation}
          onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
          error={errors.organisation}
        />

        <Select
          label="Type of Engagement"
          required
          options={[
            { label: "Commissioned Research", value: "research" },
            { label: "Capacity Building / Workshops", value: "training" },
            { label: "Technical Advisory", value: "advisory" },
            { label: "Monitoring & Evaluation", value: "evaluation" },
            { label: "Other Engagements", value: "other" },
          ]}
          value={formData.engagementType}
          onChange={(e) => setFormData({ ...formData, engagementType: e.target.value as any })}
        />
      </div>

      <Textarea
        label="Describe the deliverables you need"
        placeholder="Please describe in detail what specific research, evaluations, or training programs you want to commission..."
        required
        value={formData.deliverables}
        onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
        error={errors.deliverables}
        helperText="The more details you share, the faster we can build a formal scope & quote."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Indicative Timeline"
          placeholder="e.g. 3 months, by October 2026"
          required
          value={formData.timeline}
          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
          error={errors.timeline}
        />

        <Input
          label="Indicative Budget Range (Optional)"
          placeholder="e.g. ₦2,000,000 - ₦5,000,000"
          value={formData.budget}
          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
        />
      </div>

      <div className="pt-4 border-t border-neutral-100 flex flex-col items-center gap-4">
        <Button type="submit" variant="dark-green" className="w-full md:w-auto font-bold" loading={loading}>
          Submit Request
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
