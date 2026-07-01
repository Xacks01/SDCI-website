import { CollectionConfig } from "payload";

export const FocusAreas: CollectionConfig = {
  slug: "focus-areas",
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
      name: "description",
      type: "textarea",
    },
    {
      name: "sdgTags",
      type: "select",
      hasMany: true,
      options: [
        { label: "SDG 1: No Poverty", value: "sdg1" },
        { label: "SDG 3: Good Health & Well-being", value: "sdg3" },
        { label: "SDG 4: Quality Education", value: "sdg4" },
        { label: "SDG 5: Gender Equality", value: "sdg5" },
        { label: "SDG 6: Clean Water & Sanitation", value: "sdg6" },
        { label: "SDG 7: Affordable & Clean Energy", value: "sdg7" },
        { label: "SDG 8: Decent Work & Economic Growth", value: "sdg8" },
        { label: "SDG 9: Industry, Innovation & Infrastructure", value: "sdg9" },
        { label: "SDG 10: Reduced Inequalities", value: "sdg10" },
        { label: "SDG 12: Responsible Consumption", value: "sdg12" },
        { label: "SDG 13: Climate Action", value: "sdg13" },
        { label: "SDG 16: Peace, Justice & Strong Institutions", value: "sdg16" },
        { label: "SDG 17: Partnerships for the Goals", value: "sdg17" },
      ],
    },
    {
      name: "order",
      type: "number",
      defaultValue: 10,
    },
  ],
};
