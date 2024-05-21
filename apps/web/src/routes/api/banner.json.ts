import bannerService from '$lib/cms/services/banner.service';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async (request) => {
	const banner = await bannerService.get();

	return {
		status: 200,
		body: JSON.stringify(banner)
	};
};
