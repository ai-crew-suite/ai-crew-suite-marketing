import { defineField, defineType } from "sanity";

export default defineType({
  name: "brandSettings",
  title: "Brand Settings",
  type: "document",
  preview: {
    prepare: () => ({
      title: "Brand Settings",
      subtitle: "Shared brand copy used across metadata and footer surfaces",
    }),
  },
  fields: [
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});