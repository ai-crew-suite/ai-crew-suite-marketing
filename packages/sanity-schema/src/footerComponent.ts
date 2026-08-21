import { defineArrayMember, defineField, defineType } from "sanity";

const linkFields = [
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
];

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
  name: "footerComponent",
  title: "Footer Component",
  type: "document",
  preview: {
    prepare: () => ({
      title: "Footer Component",
      subtitle: "Description, CTAs, product links, and legal links",
    }),
  },
  fields: [
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
      name: "productLinks",
      title: "Product Links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: linkFields,
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
    defineField({
      name: "legalLinks",
      title: "Legal Links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: linkFields,
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