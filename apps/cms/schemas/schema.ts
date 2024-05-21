// @ts-expect-error: built-in type
import createSchema from "part:@sanity/base/schema-creator";
// @ts-expect-error: built-in type
import schemaTypes from "all:part:@sanity/base/schema-type";

import banner from "./documents/banner";
import story from "./documents/story";
import link from "./objects/link";
import cta from "./objects/cta";
import linkExternal from "./objects/link-external";
import complexImage from "./objects/complex-image";
import bodySection from "./sections/body-section";
import headSection from "./sections/head-section";
import outlinksSection from "./sections/outlinks-section";
import quoteSection from "./sections/quote-section";
import summarySection from "./sections/summary-section";
import contentCategory from "./documents/content-category";
import tag from "./documents/tag";
import articleBlockContent from "./objects/article-block-content";
import summaryBlockContent from "./objects/summary-block-content";
import youtubeEmbed from "./objects/youtube-embed";

const documents = [story, banner, contentCategory, tag];
const sections = [
  bodySection,
  headSection,
  outlinksSection,
  quoteSection,
  summarySection,
];
const objects = [
  youtubeEmbed,
  linkExternal,
  link,
  cta,
  complexImage,
  articleBlockContent,
  summaryBlockContent,
];

export default createSchema({
  name: "default",
  types: schemaTypes.concat([...objects, ...sections, ...documents]),
});
