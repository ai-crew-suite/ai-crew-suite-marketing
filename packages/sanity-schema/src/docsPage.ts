import { defineArrayMember, defineField, defineType } from "sanity";

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
  name: "docsPage",
  title: "Docs Page",
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
      ],
    }),
    defineField({
      name: "highlightsSection",
      title: "Highlights Section",
      type: "object",
      fields: [
        defineField({
          name: "items",
          title: "Items",
          type: "array",
          of: [
            defineArrayMember({
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
                  rows: 4,
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "iconKey",
                  title: "Icon",
                  type: "string",
                  options: {
                    list: [
                      { title: "User Guide", value: "panelsTopLeft" },
                      { title: "Developer Guide", value: "orbit" },
                      { title: "Reference", value: "bookOpen" },
                      { title: "Admin Guide", value: "shieldCheck" },
                    ],
                  },
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "href",
                  title: "Href",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: "title",
                  subtitle: "href",
                },
              },
            }),
          ],
          validation: (rule) => rule.min(1).required(),
        }),
      ],
    }),
  ],
});