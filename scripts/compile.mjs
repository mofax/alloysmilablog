// @ts-check
import fs from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'marked';
import fm from 'front-matter';

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
	return filePaths;
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
let attributes = JSON.parse('${JSON.stringify(attributes)}')
</script>
<svelte:head>
    <title>${attributes.title}</title>
</svelte:head>
<HeaderArea attributes={attributes} />
<article class="blog-article">
${parse(body)}
</article>
`;
	await createDirectoryIfNotExists(componentDir);
	await fs.writeFile(componentFilePath, toWrite);

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
	const componentDir = path.join(process.cwd(), './src/routes/blog');
	const componentPath = path.join(componentDir, '+page.svelte');

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
