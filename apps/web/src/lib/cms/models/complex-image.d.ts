import type * as Codegen from 'cms/codegen-types';
import type { ImagePalette } from './image-palette';

export type ComplexImage = Codegen.ComplexImage;

export type ExpandedComplexImage = Omit<Codegen.ComplexImage, 'asset'> & {
	asset: {
		_createdAt: string;
		_id: string;
		_rev: string;
		_type: 'sanity.imageAsset';
		_updatedAt: string;
		assetId: string;
		extension: string;
		metadata: {
			_type: 'sanity.imageMetadata';
			blurHash: string;
			dimensions: {
				_type: 'sanity.imageDimensions';
				aspectRatio: number;
				height: number;
				width: number;
			};
			hasAlpha: false;
			isOpaque: true;
			lqip: string;
			palette: {
				_type: 'sanity.imagePalette';
				darkMuted: ImagePalette;
				darkVibrant: ImagePalette;
				dominant: ImagePalette;
				lightMuted: ImagePalette;
				lightVibrant: ImagePalette;
				muted: ImagePalette;
				vibrant: ImagePalette;
			};
		};
		mimeType: string;
		originalFilename: string;
		path: string;
		sha1hash: string;
		size: number;
		uploadId: string;
		url: string;
	};
};
