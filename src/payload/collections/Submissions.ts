import { CollectionConfig } from "payload";

export const Submissions: CollectionConfig = {
  slug: "submissions",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["formType", "email", "name", "timestamp"],
  },
  fields: [
    {
      name: "formType",
      type: "select",
      required: true,
      options: [
        { label: "Newsletter Signup", value: "newsletter" },
        { label: "Consultation Request", value: "consultation" },
        { label: "Contact Message", value: "contact" },
        { label: "CV Submission", value: "cv-submission" },
      ],
    },
    {
      name: "name",
      type: "text",
    },
    {
      name: "email",
      type: "text",
      required: true,
    },
    {
      name: "organisation",
      type: "text",
    },
    // General message / inquiry
    {
      name: "message",
      type: "textarea",
    },
    // Talent Pool / CV upload
    {
      name: "cvFile",
      type: "relationship",
      relationTo: "media",
    },
    // Commission us / consultation fields
    {
      name: "engagementType",
      type: "select",
      options: [
        { label: "Commissioned Research", value: "research" },
        { label: "Capacity Building / Training", value: "training" },
        { label: "Technical Advisory", value: "advisory" },
        { label: "Monitoring & Evaluation", value: "evaluation" },
        { label: "Other", value: "other" },
      ],
    },
    {
      name: "deliverables",
      type: "textarea",
    },
    {
      name: "timeline",
      type: "text",
    },
    {
      name: "budget",
      type: "text",
    },
    {
      name: "timestamp",
      type: "date",
      defaultValue: () => new Date().toISOString(),
    },
  ],
};
