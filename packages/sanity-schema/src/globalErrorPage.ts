import { defineArrayMember, defineField, defineType } from "sanity";

const recoveryLinkFields = [
  defineField({
    name: "href",
    title: "Href",
    type: "string",
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "label",
    title: "Label",
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
];

export default defineType({
  name: "globalErrorPage",
  title: "Global Error Page",
  type: "document",
  preview: {
    prepare: () => ({
      title: "Global Error Page",
      subtitle: "Copy and recovery links for the top-level error boundary",
    }),
  },
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
      name: "imageAlt",
      title: "Image Alt Text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "referenceLabel",
      title: "Reference Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "retryButtonText",
      title: "Retry Button Text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "homeButtonLabel",
      title: "Home Button Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "homeButtonHref",
      title: "Home Button Href",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "recoveryLinks",
      title: "Recovery Links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: recoveryLinkFields,
          preview: {
            select: {
              title: "label",
              subtitle: "href",
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1).required(),
    }),
  ],
});