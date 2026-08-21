import { defineArrayMember, defineField, defineType } from "sanity";

const ctaActionFields = [
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

const richTextField = defineArrayMember({
  type: "block",
  marks: {
    annotations: [],
    decorators: [
      { title: "Strong", value: "strong" },
      { title: "Code", value: "code" },
    ],
  },
  lists: [
    { title: "Bullet", value: "bullet" },
    { title: "Number", value: "number" },
  ],
  styles: [{ title: "Normal", value: "normal" }],
});

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  preview: {
    prepare: () => ({
      title: "Home Page",
      subtitle: "Hero, problems, solution, features, FAQ, and CTA content",
    }),
  },
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
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
          name: "btnGetStarted",
          title: "Primary Action",
          type: "object",
          fields: ctaActionFields,
        }),
      ],
    }),
    defineField({
      name: "problems",
      title: "Problems",
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
          type: "text",
          rows: 3,
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
          name: "toolsHeading",
          title: "Tools Heading",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "toolsDescription",
          title: "Tools Description",
          type: "text",
          rows: 5,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "toolFailures",
          title: "Tool Failures",
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
                  rows: 3,
                  validation: (rule) => rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: "title",
                  subtitle: "description",
                },
              },
            }),
          ],
          validation: (rule) => rule.min(1).required(),
        }),
      ],
    }),
    defineField({
      name: "solution",
      title: "Solution",
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
          rows: 5,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "steps",
          title: "Steps",
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
                  name: "image",
                  title: "Image",
                  type: "image",
                  options: {
                    hotspot: true,
                  },
                  validation: (rule) => rule.required(),
                }),
              ],
              preview: {
                select: {
                  media: "image",
                  title: "title",
                  subtitle: "description",
                },
              },
            }),
          ],
          validation: (rule) => rule.min(1).required(),
        }),
      ],
    }),
    defineField({
      name: "features",
      title: "Features",
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
                  name: "image",
                  title: "Image",
                  type: "image",
                  options: {
                    hotspot: true,
                  },
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "link",
                  title: "Link",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
              ],
              preview: {
                select: {
                  media: "image",
                  title: "title",
                  subtitle: "description",
                },
              },
            }),
          ],
          validation: (rule) => rule.min(1).required(),
        }),
      ],
    }),
    defineField({
      name: "faq",
      title: "FAQ",
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
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({
                  name: "question",
                  title: "Question",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "answer",
                  title: "Answer",
                  type: "array",
                  of: [richTextField],
                  validation: (rule) => rule.min(1).required(),
                }),
              ],
              preview: {
                select: {
                  title: "question",
                },
              },
            }),
          ],
          validation: (rule) => rule.min(1).required(),
        }),
      ],
    }),
    defineField({
      name: "cta",
      title: "Call To Action",
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
          name: "badges",
          title: "Badges",
          type: "array",
          of: [{ type: "string" }],
          validation: (rule) => rule.min(1).required(),
        }),
        defineField({
          name: "primaryAction",
          title: "Primary Action",
          type: "object",
          fields: ctaActionFields,
        }),
        defineField({
          name: "highlights",
          title: "Highlights",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({
                  name: "step",
                  title: "Step",
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
                  rows: 3,
                  validation: (rule) => rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: "title",
                  subtitle: "step",
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