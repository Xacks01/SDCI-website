import { CollectionConfig } from "payload";

export const MagazineIssues: CollectionConfig = {
  slug: "magazine-issues",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["issueNo", "title", "publishDate"],
  },
  fields: [
    {
      name: "issueNo",
      type: "text",
      required: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "cover",
      type: "relationship",
      relationTo: "media",
      required: true,
    },
    {
      name: "theme",
      type: "relationship",
      relationTo: "focus-areas",
    },
    {
      name: "freeExcerpt",
      type: "richText",
      admin: {
        description: "Excerpt available to everyone, including free tier members.",
      },
    },
    {
      name: "gatedBody",
      type: "richText",
      admin: {
        description: "Full body content of the issue, accessible only by paid tiers.",
      },
    },
    {
      name: "gatedPDF",
      type: "relationship",
      relationTo: "media",
      admin: {
        description: "Full PDF version of the issue (gated).",
      },
    },
    {
      name: "publishDate",
      type: "date",
      required: true,
    },
  ],
};
