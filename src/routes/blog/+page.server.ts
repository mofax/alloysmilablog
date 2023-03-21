import type { PageServerLoad } from './$types';

import { appConfig } from '$lib/config/app_config';
import { getProperty } from '$lib/tools/objects';
import type { POJO } from '$lib/tools/types';
import { isArrayUnknown } from 'typechecked';
import { notionClient } from "$lib/tools/notion";


interface ArticleSummary {
	id: string;
	title: string;
	date: string;
}

async function fetchArticles(): Promise<ArticleSummary[]> {
	const response = await notionClient.databases.query({
		database_id: appConfig.databaseId,
		filter: {
			property: 'Status',
			select: {
				equals: 'Published'
			}
		},
		sorts: [
			{
				property: 'Date',
				direction: 'descending'
			}
		]
	})

	const nodes: ArticleSummary[] = []
	response.results.forEach(result => {
		const properties = getProperty<POJO>(result, 'properties')
		// extract title
		const Name = properties['Name'] as POJO;
		const NameId = Name['id'] as string;
		const idContent = Name[NameId];
		const idContentArray = isArrayUnknown(idContent) as POJO[];
		const textNode = idContentArray.at(0);

		// extract date
		const Date = properties['Date'] as POJO
		const DateItem = (Date['date'] as POJO)['start']

		if (textNode) {
			nodes.push({
				id: String(result['id']).replace(/-/g, ''),
				title: textNode['plain_text'] as string,
				date: DateItem as string
			});
		} else {
			console.warn('Could not find text node for Name')
		}
	})

	return nodes;
}

export const load: PageServerLoad<{ articles: ArticleSummary[] }> = async ({ setHeaders }) => {
	setHeaders({
		"Cache-Control": "max-age=3600"
	})
	const articles = await fetchArticles()
	return {
		articles: articles as ArticleSummary[]
	}
};
