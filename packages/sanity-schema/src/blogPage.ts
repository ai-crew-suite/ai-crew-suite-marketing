import { defineField, defineType } from "sanity";

export default defineType({
  name: "blogPage",
  title: "Blog Page",
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
      ],
    }),
    defineField({
      name: "postsSection",
      title: "Posts Section",
      type: "object",
      fields: [
        defineField({
          name: "fallbackDescription",
          title: "Fallback Description",
          type: "text",
          rows: 3,
          description: "Used on blog cards when an individual MDX post has no frontmatter description.",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
  ],
});