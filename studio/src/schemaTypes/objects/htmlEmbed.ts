import { defineField, defineType } from "sanity";
import { CodeBlockIcon } from "@sanity/icons";

export default defineType({
  name: "htmlEmbed",
  title: "HTML Embed",
  type: "object",
  icon: CodeBlockIcon,
  fields: [
    defineField({
      name: "html",
      title: "HTML",
      type: "text",
      description: "Paste your HTML embed code here.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "html",
    },
    prepare({ title }) {
      return {
        title: "HTML Embed",
        subtitle: title ? title.substring(0, 80) + "..." : "Empty",
      };
    },
  },
}); 