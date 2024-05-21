import type * as Codegen from 'cms/codegen-types';
import type { ExpandedComplexImage } from './complex-image';

export type Story = Codegen.Story;

export type ExpandedStory = Omit<Codegen.Story, 'contentCategory' | 'coverImage' | 'tags'> & {
	contentCategory: Codegen.ContentCategory;
	coverImage?: ExpandedComplexImage;
	tags: Codegen.Tag[];
};

export type NormalizedStory = ExpandedStory & {
	readTimeMinutes: number;
};
