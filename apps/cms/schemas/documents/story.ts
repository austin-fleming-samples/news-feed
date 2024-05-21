/* eslint-disable sort-keys */
/* sort-keys-fix/sort-keys-fix */

import { slugHasDatePrefix } from "../../lib/slugs/slug-has-date-prefix";
import { slugIsUnique } from "../../lib/slugs/slug-is-unique";
import {
  getSlugSourceWithDate,
  slugifyWithDate,
} from "../../lib/slugs/slugify";

// TODO: add feature image
// TODO: add author
// TODO: add SEO

export default {
  name: "story",
  title: "Story",
  type: "document",
  fields: [
    {
      name: "isBreaking",
      title: "Breaking",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "timestampPublished",
      title: "Published at*",
      type: "datetime",
      description: "Do not change after publish.",
      codegen: { required: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "timestampModified",
      type: "datetime",
      title: "Modified at",
      description:
        "Useful for pushing a story back to the top when changes are made.",
    },
    {
      name: "contentCategory",
      title: "Content Category*",
      type: "reference",
      to: [{ type: "contentCategory" }],
      codegen: { required: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "tags",
      title: "Tags*",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "tag" }],
        },
      ],
      codegen: { required: true },
      validation: (Rule) => [
        Rule.required(),
        Rule.min(1).error('"Tags" must have at least one item.'),
      ],
    },
    {
      name: "title",
      title: "Title*",
      type: "string",
      codegen: { required: true },
      validation: (Rule) => [
        Rule.required(),
        Rule.max(150).error('"Title" must be (150) characters or less'),
      ],
    },
    {
      name: "slug",
      title: "Slug*",
      type: "slug",
      description:
        'Enter a "Publish Date" and "Title" then click the "generate" button. YYYYMMDD-TITLE format.',
      options: {
        source: getSlugSourceWithDate,
        slugify: slugifyWithDate,
        isUnique: slugIsUnique,
      },
      codegen: { required: true },
      validation: (Rule) => [
        Rule.required().error('"Slug" is missing.'),
        Rule.custom(slugHasDatePrefix).error(
          '"Slug" should have a date prefix in YYYYMMDD-TITLE format.'
        ),
      ],
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "complexImage",
    },
    {
      name: "coverVideo",
      title: "Cover Video",
      type: "youtubeEmbed",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: "quote",
      title: "Quote",
      type: "quoteSection",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: "summary",
      title: "Summary",
      type: "summarySection",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: "body",
      title: "Body",
      type: "bodySection",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: "outlinks",
      title: "Out Links",
      type: "outlinksSection",
      options: {
        collapsible: true,
        collapsed: false,
      },
      validation: (Rule) =>
        Rule.custom((outlinks, { parent }) => {
          const hasSummaryOrQuote =
            !!parent.quote?.quote || !!parent.summary?.content;

          const hasOutlinks =
            outlinks?.outlinks?.length && outlinks.outlinks.length > 0;

          if (!hasSummaryOrQuote && !hasOutlinks)
            return '"Summary" or "Quote" must be provided if "Outlinks" isn\'t used. Having no quote or summary implies to readers that this story is just a headline link.';

          return true;
        }),
    },
  ],
  validation: (Rule) => [
    Rule.custom((fields) => {
      const hasCoverImage = Boolean(fields.coverImage.asset);
      const hasCoverVideo = Boolean(fields.coverVideo?.url);

      if (hasCoverImage && hasCoverVideo) {
        return 'Use only a "Cover Image" or "Cover Video", but not both.';
      }

      return true;
    }).error(),
  ],
  preview: {
    select: {
      title: "title",
      image: "coverImage",
      date: "timestampPublished",
      modified: "timestampModified",
      category: "contentCategory.title",
    },
    prepare({ title, image, date, modified, category }) {
      const formattedDate = date;

      const categoryName = category || "Uncategorized";

      return {
        title,
        media: image,
        subtitle: `${categoryName} • ${formattedDate}`,
      };
    },
  },
};
