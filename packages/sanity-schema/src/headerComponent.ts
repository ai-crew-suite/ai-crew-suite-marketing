import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "headerComponent",
  title: "Header Component",
  type: "document",
  preview: {
    prepare: () => ({
      title: "Header Component",
      subtitle: "Navigation items and login button text",
    }),
  },
  fields: [
    defineField({
      name: "navigationItems",
      title: "Navigation Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
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
          ],
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
      name: "loginButtonText",
      title: "Login Button Text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});