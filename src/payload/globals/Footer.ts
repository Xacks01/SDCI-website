import { GlobalConfig } from "payload";

export const Footer: GlobalConfig = {
  slug: "footer",
  fields: [
    {
      name: "columns",
      type: "array",
      maxRows: 4,
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "links",
          type: "array",
          fields: [
            {
              name: "label",
              type: "text",
              required: true,
            },
            {
              name: "url",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "newsletterMicrocopy",
      type: "text",
      defaultValue: "Get our briefings and new episodes in your inbox. No spam, unsubscribe anytime.",
    },
    {
      name: "socials",
      type: "group",
      fields: [
        { name: "linkedin", type: "text" },
        { name: "twitter", type: "text" },
        { name: "youtube", type: "text" },
        { name: "facebook", type: "text" },
      ],
    },
  ],
};
