import sanityClient from '@sanity/client';
import 'dotenv/config';

export const privateConfig = {
	apiVersion: import.meta.env.VITE_SANITY_API_VERSION as string,
	dataset: import.meta.env.VITE_SANITY_STUDIO_API_DATASET as string,
	projectId: import.meta.env.VITE_SANITY_STUDIO_API_PROJECT_ID as string,
	token: process.env['SANITY_SECRET_TOKEN'],
	useCdn: false
};

export const privateClient = sanityClient(privateConfig);
