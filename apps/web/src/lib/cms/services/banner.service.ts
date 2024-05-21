import type { Nullable } from '$lib/utils/nullable';
import { privateClient } from '../client.private';
import type { ExpandedBanner, NormalizedBanner } from '../models/banner';

const BANNER_ID = 'banner';

const get = async (): Promise<Nullable<NormalizedBanner>> => {
	const query = `*[_type == "banner" && _id == "${BANNER_ID}"][0]`;

	const maybeBanner = await privateClient.fetch<ExpandedBanner>(query);

	if (!maybeBanner || !maybeBanner?.banner?.isActive) return;

	// TODO: normalize

	return maybeBanner;
};

export default {
	get
};
