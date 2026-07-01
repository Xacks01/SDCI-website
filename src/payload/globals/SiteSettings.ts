import { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      defaultValue: "SDCI",
    },
    {
      name: "description",
      type: "textarea",
      defaultValue: "Sustainable Development Conversations Initiative",
    },
    {
      name: "logo",
      type: "relationship",
      relationTo: "media",
    },
    {
      name: "registrationNumber",
      type: "text",
      admin: {
        description: "Corporate affairs commission (CAC) registration number.",
      },
      defaultValue: "[RC/registration number]",
    },
  ],
};
