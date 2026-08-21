import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "pricingComponent",
  title: "Pricing Component",
  type: "document",
  preview: {
    select: {
      title: "title",
      subtitle: "description",
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
      name: "annualDiscount",
      title: "Annual Discount",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "plans",
      title: "Plans",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "monthlyPrice",
              title: "Monthly Price",
              type: "number",
              validation: (rule) => rule.required().min(0),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 4,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "features",
              title: "Features",
              type: "array",
              of: [{ type: "string" }],
              validation: (rule) => rule.min(1).required(),
            }),
            defineField({
              name: "link",
              title: "Link",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "buttonLabel",
              title: "Button Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "buttonVariant",
              title: "Button Variant",
              type: "string",
              options: {
                list: [
                  { title: "Default", value: "default" },
                  { title: "Outline", value: "outline" },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "isPopular",
              title: "Is Popular",
              type: "boolean",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "buttonLabel",
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1).required(),
    }),
  ],
});