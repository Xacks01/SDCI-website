import { CollectionConfig } from "payload";

export const PodcastEpisodes: CollectionConfig = {
  slug: "podcast-episodes",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["number", "title", "publishDate"],
  },
  fields: [
    {
      name: "number",
      type: "text",
      required: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "guests",
      type: "relationship",
      relationTo: "team",
      hasMany: true,
    },
    {
      name: "audioEmbed",
      type: "text",
      admin: {
        description: "Iframe embed code (e.g., from Audiomack, Spotify, or YouTube).",
      },
    },
    {
      name: "platformLinks",
      type: "group",
      fields: [
        { name: "spotify", type: "text" },
        { name: "apple", type: "text" },
        { name: "youtube", type: "text" },
        { name: "audiomack", type: "text" },
        { name: "rss", type: "text" },
      ],
    },
    {
      name: "summary",
      type: "textarea",
      required: true,
    },
    {
      name: "duration",
      type: "text",
      admin: {
        description: "Duration of the episode (e.g., 42 min).",
      },
    },
    {
      name: "cover",
      type: "relationship",
      relationTo: "media",
      admin: {
        description: "Cover image / thumbnail for the podcast episode.",
      },
    },
    {
      name: "keyTakeaways",
      type: "array",
      fields: [
        {
          name: "point",
          type: "text",
          required: true,
        },
      ],
    },

    {
      name: "publishDate",
      type: "date",
      required: true,
    },
  ],
};
