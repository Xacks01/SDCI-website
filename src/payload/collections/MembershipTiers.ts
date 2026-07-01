import { CollectionConfig } from "payload";

export const MembershipTiers: CollectionConfig = {
  slug: "membership-tiers",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "audience",
      type: "text",
      admin: {
        description: "Who this tier is targetted at, e.g. Students, professionals.",
      },
    },
    {
      name: "priceNGN",
      type: "number",
      required: true,
      admin: {
        description: "Annual price in Nigerian Naira (₦). Enter 0 for free.",
      },
    },
    {
      name: "priceUSD",
      type: "number",
      required: true,
      admin: {
        description: "Annual price in USD ($) for the diaspora path. Enter 0 for free.",
      },
    },
    {
      name: "features",
      type: "array",
      fields: [
        {
          name: "feature",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "ctaLabel",
      type: "text",
      defaultValue: "Become a member",
    },
  ],
};
