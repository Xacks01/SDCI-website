import { CollectionConfig } from "payload";

export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "type", "date", "format"],
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
        { label: "Conference", value: "conference" },
        { label: "Seminar", value: "seminar" },
        { label: "Forum", value: "forum" },
        { label: "Webinar", value: "webinar" },
        { label: "Lecture", value: "lecture" },
        { label: "Roundtable", value: "roundtable" },
        { label: "Launch", value: "launch" },
      ],
    },
    {
      name: "date",
      type: "date",
      required: true,
    },
    {
      name: "location",
      type: "text",
      admin: {
        description: "Venue name (e.g. Bauchi Conference Hall) or online platform (e.g. Zoom).",
      },
    },
    {
      name: "format",
      type: "select",
      required: true,
      options: [
        { label: "In-Person", value: "in-person" },
        { label: "Online / Virtual", value: "online" },
        { label: "Hybrid", value: "hybrid" },
      ],
    },
    {
      name: "description",
      type: "richText",
    },
    {
      name: "registrationURL",
      type: "text",
      admin: {
        description: "External link for ticket purchases or registrations.",
      },
    },
    {
      name: "image",
      type: "relationship",
      relationTo: "media",
      admin: {
        description: "Cover image / thumbnail for the event.",
      },
    },
    {
      name: "recording",
      type: "text",
      admin: {
        description: "Post-event video recording link (YouTube, Vimeo, etc.).",
      },
    },
  ],
};
