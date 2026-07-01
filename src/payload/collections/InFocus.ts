import { CollectionConfig } from "payload";

export const InFocus: CollectionConfig = {
  slug: "in-focus",
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
      name: "image",
      type: "relationship",
      relationTo: "media",
      required: true,
    },
    {
      name: "caption",
      type: "textarea",
    },
    {
      name: "relatedPublication",
      type: "relationship",
      relationTo: "publications",
    },
    {
      name: "themes",
      type: "relationship",
      relationTo: "focus-areas",
      hasMany: true,
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
