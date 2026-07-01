import { CollectionConfig } from "payload";

export const Gallery: CollectionConfig = {
  slug: "gallery",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "type", "publishDate"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Picture", value: "picture" },
        { label: "Video", value: "video" },
      ],
    },
    {
      name: "image",
      type: "relationship",
      relationTo: "media",
      required: false,
      admin: {
        description: "The image to display (or video cover thumbnail). If empty, a default placeholder is used.",
      },
    },
    {
      name: "videoUrl",
      type: "text",
      admin: {
        description: "YouTube or Vimeo video URL (required if type is video).",
      },
    },
    {
      name: "publishDate",
      type: "date",
      required: true,
    },
  ],
};
