import { defineField, defineType } from "sanity";

const consentOptionFields = [
  defineField({
    name: "eyebrow",
    title: "Eyebrow",
    type: "string",
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "status",
    title: "Status",
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

export default defineType({
  name: "consentComponent",
  title: "Consent Component",
  type: "document",
  preview: {
    prepare: () => ({
      title: "Consent Component",
      subtitle: "Consent modal copy and policy link",
    }),
  },
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
      name: "essentialOption",
      title: "Essential Option",
      type: "object",
      fields: consentOptionFields,
    }),
    defineField({
      name: "marketingOption",
      title: "Marketing Option",
      type: "object",
      fields: consentOptionFields,
    }),
    defineField({
      name: "policyLink",
      title: "Policy Link",
      type: "object",
      fields: linkFields,
    }),
    defineField({
      name: "essentialOnlyButtonText",
      title: "Essential Only Button Text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "acceptAllButtonText",
      title: "Accept All Button Text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});