import type { PageServerLoad } from './$types';
import { PRIVATE_STRAPI_TOKEN } from '$env/static/private';

interface Article {
	id: string;
	attributes: {
		title: string;
		summary: string;
		body: string;
	};
}
type ArticleResponse = { data: Article[]; error: null } | { data: null; error: Error };

let responseCache: ArticleResponse | null = null;

async function fetchArticles(): Promise<ArticleResponse> {
	const token = PRIVATE_STRAPI_TOKEN;
	const headers = {
		Authorization: `Bearer ${token}`
	};

	try {
		const response = await fetch('https://alloysblogbackend.fly.dev/api/articles', { headers });
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		return { data: data.data, error: null };
	} catch (error) {
		return { error: error as Error, data: null };
	}
}

export const load: PageServerLoad<{ articles: Article[] }> = async () => {
	let response: ArticleResponse;
	if (responseCache) {
		response = responseCache;
	} else {
		response = await fetchArticles();
		responseCache = response;
	}
	if (response.data) {
		return {
			articles: response.data
		};
	} else {
		return {
			articles: []
		};
	}
};
