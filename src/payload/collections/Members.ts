import { CollectionConfig } from "payload";

export const Members: CollectionConfig = {
  slug: "members",
  auth: true, // Enables standard login/password hashing
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "tier", "paidUntil"],
  },
  fields: [
    {
      name: "tier",
      type: "relationship",
      relationTo: "membership-tiers",
    },
    {
      name: "paidUntil",
      type: "date",
    },
    {
      name: "paystackRef",
      type: "text",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "isAdmin",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "If checked, this member has full administrative access to edit content.",
      },
    },
  ],
};
