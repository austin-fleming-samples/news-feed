import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Story
 *
 *
 */
export interface Story extends SanityDocument {
  _type: "story";

  /**
   * Breaking — `boolean`
   *
   *
   */
  isBreaking?: boolean;

  /**
   * Published at* — `datetime`
   *
   * Do not change after publish.
   */
  timestampPublished: string;

  /**
   * Modified at — `datetime`
   *
   * Useful for pushing a story back to the top when changes are made.
   */
  timestampModified?: string;

  /**
   * Content Category* — `reference`
   *
   *
   */
  contentCategory: SanityReference<ContentCategory>;

  /**
   * Tags* — `array`
   *
   *
   */
  tags: Array<SanityKeyedReference<Tag>>;

  /**
   * Title* — `string`
   *
   *
   */
  title: string;

  /**
   * Slug* — `slug`
   *
   * Enter a "Publish Date" and "Title" then click the "generate" button. YYYYMMDD-TITLE format.
   */
  slug: { _type: "slug"; current: string };

  /**
   * Cover Image — `complexImage`
   *
   *
   */
  coverImage?: ComplexImage;

  /**
   * Cover Video — `youtubeEmbed`
   *
   *
   */
  coverVideo?: YoutubeEmbed;

  /**
   * Quote — `quoteSection`
   *
   *
   */
  quote?: QuoteSection;

  /**
   * Summary — `summarySection`
   *
   *
   */
  summary?: SummarySection;

  /**
   * Body — `bodySection`
   *
   *
   */
  body?: BodySection;

  /**
   * Out Links — `outlinksSection`
   *
   *
   */
  outlinks?: OutlinksSection;
}

/**
 * Banner
 *
 *
 */
export interface Banner extends SanityDocument {
  _type: "banner";

  /**
   * Banner — `object`
   *
   * Banner that appears over the header
   */
  banner?: {
    _type: "banner";
    /**
     * Show Banner — `boolean`
     *
     *
     */
    isActive: boolean;

    /**
     * Link — `link`
     *
     *
     */
    link?: Link;

    /**
     * Chip — `string`
     *
     * A small label that helps draw attention. For example: "Sale!"
     */
    chip?: string;

    /**
     * Content — `text`
     *
     *
     */
    content: string;
  };
}

/**
 * Content Category
 *
 *
 */
export interface ContentCategory extends SanityDocument {
  _type: "contentCategory";

  /**
   * Title* — `string`
   *
   * Keep brief as possible and preferably one word. For example: Finance ✅, What's In Your Wallet ❌
   */
  title: string;
}

/**
 * Tag
 *
 *
 */
export interface Tag extends SanityDocument {
  _type: "tag";

  /**
   * Title* — `string`
   *
   *
   */
  title: string;
}

export type YoutubeEmbed = {
  _type: "youtubeEmbed";
  /**
   * YouTube video URL — `url`
   *
   * Visit Youtube in a browser and copy the URL.
   */
  url?: string;

  /**
   * Alternative text — `string`
   *
   * Important for SEO and accessiblity.
   */
  alt?: string;
};

export type LinkExternal = {
  _type: "linkExternal";
  /**
   * URL — `url`
   *
   * Must begin with "https://"
   */
  href?: string;

  /**
   * Sponsored Content — `boolean`
   *
   * If the link goes to sponsored content (affiliate links, advertiser, etc.), then this should be selected. Search engines penalize pages that don't declare sponsored links.
   */
  isSponsor?: boolean;
};

export type Link = {
  _type: "link";
  /**
   * Type of Link — `string`
   *
   * (required)
   */
  linkType: "external" | "internal" | "internalReference";

  /**
   * External — `linkExternal`
   *
   * (required)
   */
  linkExternal?: LinkExternal;

  /**
   * Page — `reference`
   *
   * (required)
   */
  internalReference?: SanityReference<Story>;

  /**
   * Path — `url`
   *
   * (required) For example: /support-us/donations
   */
  path?: string;
};

export type Cta = {
  _type: "cta";
  /**
   * Label — `string`
   *
   * (required)
   */
  label: string;

  /**
   * Link — `link`
   *
   * (required)
   */
  link: Link;
};

export type ComplexImage = {
  _type: "complexImage";
  asset: SanityReference<SanityImageAsset>;
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;

  /**
   * Alt Description* — `string`
   *
   * A description of the image used by search engines, assistive tools, and when the image fails to load. For example: "full moon over a still lake".
   */
  alt: string;

  /**
   * Attribution — `string`
   *
   * A source or credit for the image. Often required for licensed images.
   */
  attribution?: string;

  /**
   * Caption — `string`
   *
   * A small description that will be displayed next to the image. Can help add explanation or context.
   */
  caption?: string;
};

export type ArticleBlockContent = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<YoutubeEmbed>
  | SanityKeyed<ComplexImage>
>;

export type SummaryBlockContent = Array<SanityKeyed<SanityBlock>>;

export type BodySection = {
  _type: "bodySection";
  /**
   * Content — `articleBlockContent`
   *
   *
   */
  content?: ArticleBlockContent;
};

export type HeadSection = {
  _type: "headSection";
  /**
   * Title* — `string`
   *
   *
   */
  title?: string;

  /**
   * Category* — `reference`
   *
   *
   */
  contentCategory?: SanityReference<ContentCategory>;

  /**
   * Cover Image — `complexImage`
   *
   *
   */
  coverImage?: ComplexImage;
};

export type OutlinksSection = {
  _type: "outlinksSection";
  /**
   * Links — `array`
   *
   *
   */
  outlinks?: Array<
    SanityKeyed<{
      _type: "outlink";
      /**
       * Outlet Name — `string`
       *
       * (required) Name of outlet. Use abbreviations or short names where possible. For example: NPR, Axios, NYT, WSJ
       */
      outletName: string;

      /**
       * Link — `linkExternal`
       *
       * (required)
       */
      link: LinkExternal;
    }>
  >;
};

export type QuoteSection = {
  _type: "quoteSection";
  /**
   * Quote — `text`
   *
   * Quotes longer than (300) characters will be truncated in the preview.
   */
  quote?: string;

  /**
   * Citation — `text`
   *
   * A brief "who, what, why" to accompany the quote. Citations longer than (150) characters will be truncated on cards.
   */
  citation?: string;
};

export type SummarySection = {
  _type: "summarySection";
  /**
   * Content — `summaryBlockContent`
   *
   *
   */
  content?: SummaryBlockContent;
};

export type Documents = Story | Banner | ContentCategory | Tag;
