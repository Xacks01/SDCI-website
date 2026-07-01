import { CollectionConfig } from "payload";

export const Documentaries: CollectionConfig = {
  slug: "documentaries",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "videoEmbed",
      type: "text",
      required: true,
      admin: {
        description: "YouTube embed URL or iframe code.",
      },
    },
    {
      name: "about",
      type: "textarea",
      required: true,
    },
    {
      name: "length",
      type: "text",
      admin: {
        description: "e.g., 14 mins",
      },
    },
    {
      name: "year",
      type: "text",
      defaultValue: "2026",
    },
    {
      name: "relatedResearch",
      type: "relationship",
      relationTo: "publications",
      hasMany: true,
    },
  ],
};
