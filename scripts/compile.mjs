import fs from 'node:fs/promises';
import path from 'node:path';
import { marked } from 'marked';
import fm from 'front-matter';
import hljs from 'highlight.js';

marked.setOptions({
	renderer: new marked.Renderer(),
	highlight: function (code, lang) {
		const language = hljs.getLanguage(lang) ? lang : 'plaintext';
		return hljs.highlight(code, { language }).value;
	},
	langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
	pedantic: false,
	gfm: true,
	breaks: false,
	sanitize: false,
	smartypants: false,
	xhtml: false
});

const contentFolder = path.join(process.cwd(), './content');
const index = [];

async function createDirectoryIfNotExists(directoryPath) {
	try {
		await fs.mkdir(directoryPath, { recursive: true });
		console.log(`Directory created: ${directoryPath}`);
	} catch (err) {
		console.error(`Error creating directory: ${err}`);
	}
}

async function readFolder(directory) {
	const files = await fs.readdir(directory);
	const filePaths = files.map((file) => path.join(directory, file));
	// ignore files with .draft.md extension
	const filteredFilePaths = filePaths.filter((file) => !file.includes('.draft.md'));
	return filteredFilePaths;
}

async function processMarkdown(filepath) {
	const fileExt = path.extname(filepath);
	const basename = path.basename(filepath).replace(fileExt, '');
	const componentDir = path.join(process.cwd(), '/src/routes/blog/', basename);
	const componentFilePath = path.join(componentDir, '+page.svelte');

	const data = await fs.readFile(filepath, 'utf-8');
	const fmResult = fm(data);
	const attributes = fmResult.attributes;
	const body = fmResult.body;
	const toWrite = `
<script>
import HeaderArea from "$lib/components/header_area.svelte";
import ArticleArea from "$lib/components/article_area.svelte";
let attributes = JSON.parse('${JSON.stringify(attributes)}')
</script>
<svelte:head>
    <title>${attributes.title}</title>
</svelte:head>
<HeaderArea attributes={attributes} />
<ArticleArea>
${marked.parse(body)}
</ArticleArea>
`;
	// await createDirectoryIfNotExists(componentDir);
	// await fs.writeFile(componentFilePath, toWrite);

	// file is writen add to index
	index.push({
		basename,
		date: new Date(attributes.date),
		attributes
	});
}

async function writeIndex() {
	// sort index by date
	index.sort((a, b) => b.date - a.date);
	const indexList = index.map((item) => {
		const link = `/blog/${item.basename}`;
		return `
        <li class="blog-roll-item">
          <b>${new Date(item.attributes.date).toDateString()}</b>
          <p><a href="${link}">${item.attributes.title}</a></p>
        </li>
        `;
	});
	const indexMarkup = indexList.join('');
	const toWrite = `
<svelte:head>
    <title>Blog roll</title>
</svelte:head>
<div class="blog-roll">
     <ul>${indexMarkup}</ul>
</div>
    `;
	const componentDir = path.join(process.cwd(), './src/pages/blog');
	const componentPath = path.join(componentDir, 'index.astro');

	await createDirectoryIfNotExists(componentDir);
	await fs.writeFile(componentPath, toWrite);
}

async function run() {
	let files = await readFolder(contentFolder);
	for (let i = 0; i < files.length; i++) {
		await processMarkdown(files.at(i));
	}
	await writeIndex();
}

run();
