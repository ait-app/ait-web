import { defineConfig } from 'astro/config';

const site = process.env.SITE_URL ?? 'https://ait-app.com';
const url = new URL(site);
if (url.origin !== 'https://ait-app.com' || url.pathname !== '/' || url.search || url.hash || url.port || url.username || url.password) {
  throw new Error('SITE_URL must be https://ait-app.com');
}

export default defineConfig({
  site: url.origin,
  output: 'static',
  trailingSlash: 'always',
  prerenderConflictBehavior: 'error',
  devToolbar: { enabled: false },
  outDir: './dist/',
  markdown: { shikiConfig: { theme: 'github-light', wrap: true } },
  vite: { define: { __DEFAULT_LOCALE__: JSON.stringify('en') } },
});
