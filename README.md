# SvelteKit Personal Blog Generator

This script is designed to automatically generate and maintain a personal blog using SvelteKit. It reads markdown files from a content folder, extracts front-matter metadata and content, and generates corresponding SvelteKit pages with proper routing.

**Features**

- Automatically creates blog pages from markdown files
- Generates an index page with a list of all blog posts
- Extracts and utilizes front-matter metadata for each blog post

**Usage**

- Clone this repository or copy the script into your SvelteKit project.
- Create a `content` folder at the root of your SvelteKit project.
- Add your markdown files with front-matter metadata to the content folder.
- Run the script to generate the blog pages and index page.
- run `vite build` in you sveltekit project to build the web app

**Example Markdown file**

```md
---
title: My First Blog Post
date: 2023-03-22
---

Welcome to my blog! This is my first post. In this blog, I'll be sharing my thoughts on various topics.
```

**Front-Matter Metadata**

Each markdown file should include front-matter metadata at the beginning, wrapped in triple-dashes. The script currently supports the following front-matter properties:

```
title: The title of the blog post
date: The publication date of the blog post
```

**Project Structure**

After running the script, your SvelteKit project should have the following structure:

```yaml
- content
  - my-first-blog-post.md
  - my-second-blog-post.md
- src
  - lib
  - routes
  - blog
  - my-first-blog-post
  - +page.svelte
  - my-second-blog-post
  - +page.svelte
  - +page.svelte
```

LICENSE: MIT
