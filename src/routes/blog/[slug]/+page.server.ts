import type { PageServerLoad } from './$types';
import { PRIVATE_STRAPI_TOKEN } from '$env/static/private';
import { marked } from 'marked';
import {notionClient, notionClient2} from "../../../lib/tools/notion";

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
	const response = await notionClient2.getPage(slug);

	console.log(response);
	const page  =  {
		createdTime: response.created_time,
		lastEditedTime: response.last_edited_time
	}

	console.log(page)
	return { error: new Error("Not implementted"), data: null };
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
