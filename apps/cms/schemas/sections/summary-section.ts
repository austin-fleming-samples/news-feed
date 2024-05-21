import { toPlainText } from "@portabletext/react";

export default {
  name: "summarySection",
  title: "Summary",
  type: "object",
  fields: [
    /* {
      name: "content",
      title: "Content",
      // TODO: replace with block content
      type: "text",
      rows: 5,
      description:
        "Content longer than (300) characters will be truncated on cards.",
      validation: (Rule) => [
        Rule.max(200).warning(
          "Quote is longer than (200) characters. Consider shortening."
        ),
        Rule.max(300).warning(
          "Summary will be truncated. (300) characters or less is strongly recommended."
        ),
      ],
    }, */
    {
      name: "content",
      title: "Content",
      type: "summaryBlockContent",
      validation: (Rule) => [
        Rule.custom((blockContent) => {
          if (!blockContent) return true;

          const plainBlockContent = toPlainText(blockContent);

          if (plainBlockContent.length > 300)
            return "(300) characters or less is strongly recommended.";

          return true;
        }).warning(),
        Rule.custom((blockContent) => {
          if (!blockContent) return true;

          const plainBlockContent = toPlainText(blockContent);

          if (plainBlockContent.length > 600)
            return '"Summary" must be (600) characters or less.';

          return true;
        }).error(),
      ],
    },
  ],
};
