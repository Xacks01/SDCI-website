import { CollectionConfig } from "payload";

export const Publications: CollectionConfig = {
  slug: "publications",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "format", "publishDate", "gated"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "format",
      type: "select",
      required: true,
      options: [
        { label: "Policy Brief", value: "brief" },
        { label: "Thematic Report", value: "report" },
        { label: "Working Paper", value: "working-paper" },
        { label: "White Paper (Gated)", value: "white-paper" },
      ],
    },
    {
      name: "themes",
      type: "relationship",
      relationTo: "focus-areas",
      hasMany: true,
    },
    {
      name: "excerpt",
      type: "textarea",
    },
    {
      name: "body",
      type: "richText",
    },
    {
      name: "authors",
      type: "relationship",
      relationTo: "team",
      hasMany: true,
    },
    {
      name: "cover",
      type: "relationship",
      relationTo: "media",
    },
    {
      name: "attachment",
      type: "relationship",
      relationTo: "media",
      admin: {
        description: "PDF file download for the publication.",
      },
    },
    {
      name: "publishDate",
      type: "date",
      required: true,
    },
    {
      name: "gated",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "If checked, this publication will require a paid membership or individual purchase to download/read.",
      },
    },
    {
      name: "seo",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
        },
        {
          name: "description",
          type: "textarea",
        },
      ],
    },
  ],
};
