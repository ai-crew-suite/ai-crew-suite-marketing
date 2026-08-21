import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "pricingPage",
  title: "Pricing Page",
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
          name: "primaryAction",
          title: "Primary Action",
          type: "object",
          fields: [
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
          ],
        }),
        defineField({
          name: "secondaryAction",
          title: "Secondary Action",
          type: "object",
          fields: [
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
          ],
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
          of: [{ type: "string" }],
          validation: (rule) => rule.min(1).required(),
        }),
      ],
    }),
    defineField({
      name: "matrixSection",
      title: "Comparison Matrix Section",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
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
          name: "columns",
          title: "Columns",
          type: "array",
          of: [{ type: "string" }],
          validation: (rule) => rule.min(1).required(),
        }),
        defineField({
          name: "rows",
          title: "Rows",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({
                  name: "feature",
                  title: "Feature",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "values",
                  title: "Values",
                  type: "array",
                  of: [{ type: "string" }],
                  validation: (rule) => rule.min(1).required(),
                }),
              ],
              preview: {
                select: { title: "feature" },
              },
            }),
          ],
          validation: (rule) => rule.min(1).required(),
        }),
      ],
    }),
    defineField({
      name: "faqSection",
      title: "FAQ Section",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
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
                  type: "text",
                  rows: 5,
                  validation: (rule) => rule.required(),
                }),
              ],
              preview: {
                select: { title: "question" },
              },
            }),
          ],
          validation: (rule) => rule.min(1).required(),
        }),
      ],
    }),
    defineField({
      name: "ctaSection",
      title: "CTA Section",
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
          fields: [
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
          ],
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
                  rows: 4,
                  validation: (rule) => rule.required(),
                }),
              ],
              preview: {
                select: { title: "title", subtitle: "step" },
              },
            }),
          ],
          validation: (rule) => rule.min(1).required(),
        }),
      ],
    }),
  ],
});