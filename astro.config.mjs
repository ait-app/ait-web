import { defineConfig } from 'astro/config';

const site = process.env.SITE_URL ?? 'https://aitapp.cn';
const url = new URL(site);
if (url.protocol !== 'https:' || !['aitapp.cn', 'ait-app.com'].includes(url.hostname) || url.pathname !== '/' || url.search || url.hash || url.port || url.username || url.password) {
  throw new Error('SITE_URL must be https://aitapp.cn or https://ait-app.com');
}

export default defineConfig({
  site: url.origin,
  output: 'static',
  trailingSlash: 'always',
  prerenderConflictBehavior: 'error',
  devToolbar: { enabled: false },
  outDir: process.env.BUILD_TARGET ? `./dist/${process.env.BUILD_TARGET}/` : './dist/',
  markdown: { shikiConfig: { theme: 'github-light', wrap: true } },
  vite: { define: { __DEFAULT_LOCALE__: JSON.stringify(url.hostname === 'aitapp.cn' ? 'zh' : 'en') } },
});
