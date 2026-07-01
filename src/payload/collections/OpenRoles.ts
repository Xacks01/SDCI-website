import { CollectionConfig } from "payload";

export const OpenRoles: CollectionConfig = {
  slug: "open-roles",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "department", "type", "deadline"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "department",
      type: "text",
    },
    {
      name: "location",
      type: "text",
      defaultValue: "Bauchi, Nigeria",
    },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Full-Time", value: "full-time" },
        { label: "Part-Time", value: "part-time" },
        { label: "Contract", value: "contract" },
        { label: "Internship", value: "internship" },
      ],
    },
    {
      name: "deadline",
      type: "date",
    },
    {
      name: "body",
      type: "richText",
    },
    {
      name: "applyURL",
      type: "text",
    },
  ],
};
