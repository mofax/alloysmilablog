import type { PageServerLoad } from './$types';
import { PRIVATE_STRAPI_TOKEN } from '$env/static/private';
import { marked } from 'marked';

const cache = new Map<string, Article>();

interface Article {
	id: string;
	html: string;
	attributes: {
		title: string;
		summary: string;
		body: string;
	};
}

type ArticleResponse = { data: Article; error: null } | { data: null; error: Error };

async function fetchArticles(slug: string): Promise<ArticleResponse> {
	const token = PRIVATE_STRAPI_TOKEN;
	const headers = {
		Authorization: `Bearer ${token}`
	};

	try {
		const response = await fetch(`https://alloysblogbackend.fly.dev/api/articles/${slug}`, { headers });
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();
		const article = data.data;
		article.html = marked.parse(article.attributes.body);
		return { data: article, error: null };
	} catch (error) {
		console.error(error);
		return { error: error as Error, data: null };
	}
}

export const load: PageServerLoad<{ article: Article | null }> = async ({ params }) => {
	if (cache.has(params.slug)) {
		return {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			article: cache.get(params.slug)!
		};
	}

	const response = await fetchArticles(params.slug);
	if (response.data) {
		cache.set(params.slug, response.data);
		return {
			article: response.data
		};
	} else {
		return { article: null }
	}
};
