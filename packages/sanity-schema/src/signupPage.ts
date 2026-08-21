import { defineField, defineType } from "sanity";

const actionFields = [
  defineField({
    name: "text",
    title: "Text",
    type: "string",
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "link",
    title: "Link",
    type: "string",
    validation: (rule) => rule.required(),
  }),
];

export default defineType({
  name: "signupPage",
  title: "Signup Page",
  type: "document",
  preview: {
    select: {
      title: "metadata.title",
      subtitle: "metadata.description",
    },
  },
  fields: [
    defineField({
      name: "metadata",
      title: "Metadata",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      fields: [
        defineField({
          name: "badge",
          title: "Badge",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 4,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "primaryAction",
          title: "Primary Action",
          type: "object",
          fields: actionFields,
        }),
        defineField({
          name: "secondaryAction",
          title: "Secondary Action",
          type: "object",
          fields: actionFields,
        }),
        defineField({
          name: "highlights",
          title: "Highlights",
          type: "array",
          of: [{ type: "string" }],
          validation: (rule) => rule.min(1).required(),
        }),
      ],
    }),
    defineField({
      name: "nextStepsSection",
      title: "Next Steps Section",
      type: "object",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 4,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "items",
          title: "Items",
          type: "array",
          of: [{ type: "string" }],
          validation: (rule) => rule.min(1).required(),
        }),
      ],
    }),
  ],
});