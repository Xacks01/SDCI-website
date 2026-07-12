"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { contactMessageAction } from "@/app/actions";

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organisation: "",
    reason: "general",
    message: "",
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
    if (!formData.message.trim()) {
      tempErrors.message = "Message is required.";
    } else if (formData.message.length < 5) {
      tempErrors.message = "Message must be at least 5 characters.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    setMessage("");

    const res = await contactMessageAction(formData);
    setLoading(false);

    if (res.success) {
      setIsSuccess(true);
      setMessage(res.message || "Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        organisation: "",
        reason: "general",
        message: "",
      });
      setErrors({});
    } else {
      setIsSuccess(false);
      setMessage(res.error || "Failed to send message.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 border border-neutral-200 rounded-none shadow-sm w-full font-sans">
      <div className="space-y-4">
        <Input
          label="Your Name"
          placeholder="e.g. Ibrahim Abubakar"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
        />
        
        <Input
          label="Email Address"
          type="email"
          placeholder="ibrahim@example.com"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
        />

        <Input
          label="Organisation"
          placeholder="Company, NGO, or Agency name"
          value={formData.organisation}
          onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
        />

        <Select
          label="Reason for Contact"
          required
          options={[
            { label: "General Enquiries", value: "general" },
            { label: "Media & Press Enquiries", value: "media" },
            { label: "Partnership & Funding", value: "partnerships" },
            { label: "Research Collaborations", value: "research" },
          ]}
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
        />

        <Textarea
          label="Your Message"
          placeholder="Please type your message here..."
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          error={errors.message}
        />
      </div>

      <div className="pt-4 border-t border-neutral-100 flex flex-col items-center gap-4">
        <Button type="submit" variant="dark-green" className="w-full md:w-auto font-bold" loading={loading}>
          Send Message
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
