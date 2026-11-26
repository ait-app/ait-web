import { defineConfig } from 'astro/config';

const site = process.env.SITE_URL ?? 'https://ait.guide';
const url = new URL(site);
if (url.origin !== 'https://ait.guide' || url.pathname !== '/' || url.search || url.hash || url.port || url.username || url.password) {
  throw new Error('SITE_URL must be https://ait.guide');
}

export default defineConfig({
  site: url.origin,
  output: 'static',
  trailingSlash: 'always',
  prerenderConflictBehavior: 'error',
  devToolbar: { enabled: false },
  outDir: './dist/',
  markdown: { shikiConfig: { theme: 'github-light', wrap: true } },
  vite: { define: { __DEFAULT_LOCALE__: JSON.stringify('zh') } },
});
