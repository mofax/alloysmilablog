import mdx from '@astrojs/mdx';
import cloudflare from "@astrojs/cloudflare";
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  server: {
    port: 4080,
  },
  markdown: {
    drafts: true,
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'dracula',
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: [],
      // Enable word wrap to prevent horizontal scrolling
      wrap: true
    }
  },
  integrations: [mdx({
    gfm: true,
    drafts: true
  })],
  output: "server",
  adapter: cloudflare()
});
