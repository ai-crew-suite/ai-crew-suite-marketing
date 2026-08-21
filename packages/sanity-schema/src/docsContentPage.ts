import { defineField, defineType } from "sanity";

export default defineType({
  name: "docsContentPage",
  title: "Docs Content Page",
  type: "document",
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
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
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        slugify: (value) => String(value).toLowerCase().replace(/\s+/g, "-"),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sourcePath",
      title: "Source Path",
      type: "string",
      description: "Original markdown file path relative to src/content/docs.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.min(1).required(),
    }),
  ],
});