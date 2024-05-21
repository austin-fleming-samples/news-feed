import type { ArticleBlockContent } from 'cms/codegen-types';
import type { ExpandedArticleBlockContent } from './article-block-content';
import type { ExpandedSummaryBlockContent, SummaryBlockContent } from './summary-block-content';

export type GeneralBlockContent =
	| ArticleBlockContent
	| ExpandedArticleBlockContent
	| SummaryBlockContent
	| ExpandedSummaryBlockContent;
