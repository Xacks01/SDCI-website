import { CollectionConfig } from "payload";

export const Team: CollectionConfig = {
  slug: "team",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "department", "order"],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "text",
      required: true,
    },
    {
      name: "department",
      type: "select",
      required: true,
      options: [
        { label: "Board of Directors", value: "board" },
        { label: "Executive Leadership", value: "exec" },
        { label: "Research & Policy Advocacy", value: "research-policy" },
        { label: "Partnerships & Funding", value: "partnerships" },
        { label: "Stakeholder Engagement & Programs", value: "stakeholder" },
        { label: "HR & Operations", value: "hr-ops" },
      ],
    },
    {
      name: "photo",
      type: "relationship",
      relationTo: "media",
    },
    {
      name: "bio",
      type: "richText",
    },
    {
      name: "cvFile",
      type: "relationship",
      relationTo: "media",
    },
    {
      name: "linkedin",
      type: "text",
    },
    {
      name: "email",
      type: "text",
    },
    {
      name: "order",
      type: "number",
      defaultValue: 10,
    },
  ],
};
