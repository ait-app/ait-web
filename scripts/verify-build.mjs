import { readFile, readdir, access } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';

const workspace = process.cwd();
const targets = [{ name: 'cn', origin: 'https://aitapp.cn', lang: 'zh' }, { name: 'com', origin: 'https://ait-app.com', lang: 'en' }];
const errors = [];
const decode = value => value.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
const exists = async file => { try { await access(file); return true; } catch { return false; } };
const walk = async directory => {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(file)); else files.push(file);
  }
  return files;
};
const check = (condition, message) => { if (!condition) errors.push(message); };

for (const collection of ['docs', 'blog']) {
  const root = path.join(workspace, 'src/content', collection);
  const zh = (await readdir(path.join(root, 'zh'))).filter(file => file.endsWith('.md')).sort();
  const en = (await readdir(path.join(root, 'en'))).filter(file => file.endsWith('.md')).sort();
  assert.deepEqual(zh, en, `${collection}: Chinese and English content must have matching files`);
}

for (const target of targets) {
  const root = path.join(workspace, 'dist', target.name);
  if (!await exists(root)) throw new Error(`Missing ${root}. Run npm run build:all first.`);
  const htmlFiles = (await walk(root)).filter(file => file.endsWith('.html'));
  const cache = new Map();
  for (const file of htmlFiles) cache.set(file, await readFile(file, 'utf8'));
  let references = 0;
  for (const [file, html] of cache) {
    const relative = path.relative(root, file);
    check(/<title>[^<]+<\/title>/.test(html), `${target.name}/${relative}: missing title`);
    const route = `/${relative.replace(/index\.html$/, '').replaceAll(path.sep, '/')}`;
    const lang = route.split('/')[1];
    if (['zh', 'en'].includes(lang)) {
      const expectedOrigin = lang === 'zh' ? 'https://aitapp.cn' : 'https://ait-app.com';
      check(html.includes(`rel="canonical" href="${expectedOrigin}${route}"`), `${target.name}/${relative}: incorrect canonical`);
      check((html.match(/<h1(?:\s|>)/g) ?? []).length === 1, `${target.name}/${relative}: must contain exactly one h1`);
      check(html.includes(`lang="${lang === 'zh' ? 'zh-CN' : 'en'}"`), `${target.name}/${relative}: incorrect language`);
      check(html.includes('hreflang="zh-CN"') && html.includes('hreflang="en"'), `${target.name}/${relative}: missing language alternates`);
    }
    for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
      const reference = decode(match[1]);
      if (!reference || /^(https?:|mailto:|tel:|data:|javascript:)/.test(reference)) continue;
      references++;
      const url = new URL(reference, `${target.origin}${route}`);
      const localPath = decodeURIComponent(url.pathname);
      const destination = path.join(root, localPath.endsWith('/') ? `${localPath}index.html` : localPath);
      check(await exists(destination), `${target.name}/${relative}: broken reference ${reference}`);
      if (url.hash && cache.has(destination)) {
        const id = decodeURIComponent(url.hash.slice(1));
        check(cache.get(destination).includes(`id="${id}"`), `${target.name}/${relative}: missing anchor ${reference}`);
      }
    }
  }
  const homepage = cache.get(path.join(root, 'index.html'));
  check(homepage?.includes(`0;url=/${target.lang}/`), `${target.name}: incorrect default-language redirect`);
  const robots = await readFile(path.join(root, 'robots.txt'), 'utf8');
  check(robots.includes(`${target.origin}/sitemap.xml`), `${target.name}: incorrect robots sitemap`);
  const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8');
  for (const [,loc] of sitemap.matchAll(/<loc>(.*?)<\/loc>/g)) check(loc.startsWith(`${target.origin}/${target.lang}/`), `${target.name}: sitemap contains a noncanonical locale ${loc}`);
  for (const lang of ['zh', 'en']) {
    const index = JSON.parse(await readFile(path.join(root, lang, 'search.json'), 'utf8'));
    check(index.length >= 7, `${target.name}/${lang}: missing searchable docs`);
    for (const entry of index) {
      check(entry.text?.length > 100, `${target.name}/${lang}: missing search body ${entry.title}`);
      check(await exists(path.join(root,entry.href,'index.html')), `${target.name}/${lang}: broken search result ${entry.href}`);
    }
    const rss = await readFile(path.join(root,lang,'rss.xml'), 'utf8');
    check((rss.match(/<item>/g) ?? []).length >= 3, `${target.name}/${lang}: missing RSS posts`);
  }
  console.log(`${target.name}: checked ${htmlFiles.length} HTML pages, ${references} local references, language redirects, SEO, search, and RSS`);
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; } else console.log('All generated-site checks passed.');
