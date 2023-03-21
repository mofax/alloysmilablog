import { PRIVATE_NOTION_TOKEN } from '$env/static/private';
import { NotionAPI } from 'notion-client'
import { Client } from "@notionhq/client";

const notion = new Client({
    auth: PRIVATE_NOTION_TOKEN
})



// you can optionally pass an authToken to access private notion resources
const api = new NotionAPI({
    authToken: PRIVATE_NOTION_TOKEN
})

export { notion as notionClient, api as notionClient2 }