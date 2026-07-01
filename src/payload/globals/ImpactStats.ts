import { GlobalConfig } from "payload";

export const ImpactStats: GlobalConfig = {
  slug: "impact-stats",
  fields: [
    {
      name: "conversations",
      type: "text",
      defaultValue: "[X]",
      required: true,
    },
    {
      name: "publications",
      type: "text",
      defaultValue: "[X]",
      required: true,
    },
    {
      name: "partners",
      type: "text",
      defaultValue: "[X]",
      required: true,
    },
    {
      name: "reached",
      type: "text",
      defaultValue: "[X]",
      required: true,
    },
  ],
};
