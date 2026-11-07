import { readFile, readdir, access } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { runInNewContext } from 'node:vm';

const workspace = process.cwd();
const origin = 'https://ait-app.com';
const languages = ['zh', 'en', 'ja'];
// The blog is published in Chinese and English only; Japanese pages link to the English articles.
const blogLanguages = ['zh', 'en'];
const hreflangs = { zh: 'zh-CN', en: 'en', ja: 'ja' };
const languagePattern = new RegExp(`^/(${languages.join('|')})/`);
const root = path.join(workspace, 'dist');
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

const markdownFiles = async directory => (await readdir(directory)).filter(file => file.endsWith('.md')).sort();
for (const [collection, collectionLanguages] of [['docs', languages], ['legal', languages], ['blog', blogLanguages]]) {
  const root = path.join(workspace, 'content', collection);
  const [reference, ...others] = collectionLanguages;
  const expected = await markdownFiles(path.join(root, reference));
  for (const lang of others) {
    assert.deepEqual(await markdownFiles(path.join(root, lang)), expected, `${collection}: ${lang} and ${reference} content must have matching files`);
  }
  for (const lang of languages.filter(lang => !collectionLanguages.includes(lang))) {
    assert.ok(!await exists(path.join(root, lang)), `${collection}: ${lang} content is not published; remove content/${collection}/${lang}/`);
  }
}

if (!await exists(root)) throw new Error(`Missing ${root}. Run npm run build first.`);
const htmlFiles = (await walk(root)).filter(file => file.endsWith('.html'));
const cache = new Map();
for (const file of htmlFiles) cache.set(file, await readFile(file, 'utf8'));
const canonicalRoutes = new Set();
let references = 0;
for (const [file, html] of cache) {
  const relative = path.relative(root, file);
  check(/<title>[^<]+<\/title>/.test(html), `${relative}: missing title`);
  const route = `/${relative.replace(/index\.html$/, '').replaceAll(path.sep, '/')}`;
  const lang = route.split('/')[1];
  if (languages.includes(lang)) {
    canonicalRoutes.add(`${origin}${route}`);
    check(html.includes(`rel="canonical" href="${origin}${route}"`), `${relative}: incorrect canonical`);
    check((html.match(/<h1(?:\s|>)/g) ?? []).length === 1, `${relative}: must contain exactly one h1`);
    check(html.includes(`<html lang="${hreflangs[lang]}"`), `${relative}: incorrect language`);
    const isBlogPost = /^\/[a-z]+\/blog\/[^/]+\/$/.test(route);
    for (const alternate of languages) {
      const alternateRoute = route.replace(languagePattern, `/${alternate}/`);
      const tag = `hreflang="${hreflangs[alternate]}" href="${origin}${alternateRoute}"`;
      if (isBlogPost && !blogLanguages.includes(alternate)) check(!html.includes(tag), `${relative}: unexpected ${alternate} alternate for an untranslated blog post`);
      else check(html.includes(tag), `${relative}: incorrect ${alternate} language alternate`);
    }
    const defaultRoute = route.replace(languagePattern, '/zh/');
    check(html.includes(`hreflang="x-default" href="${origin}${defaultRoute}"`), `${relative}: incorrect default language alternate`);
  }
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const reference = decode(match[1]);
    if (!reference || /^(mailto:|tel:|data:|javascript:)/.test(reference)) continue;
    const url = new URL(reference, `${origin}${route}`);
    if (url.origin !== origin) continue;
    references++;
    const localPath = decodeURIComponent(url.pathname);
    const destination = path.join(root, localPath.endsWith('/') ? `${localPath}index.html` : localPath);
    check(await exists(destination), `${relative}: broken reference ${reference}`);
    if (url.hash && cache.has(destination)) {
      const id = decodeURIComponent(url.hash.slice(1));
      check(cache.get(destination).includes(`id="${id}"`), `${relative}: missing anchor ${reference}`);
    }
  }
}
const languagePreferences = [
  { name: 'Chinese first', navigator: { languages: ['zh-CN', 'en-US'] }, expected: 'zh' },
  { name: 'English first', navigator: { languages: ['en-US', 'zh-CN'] }, expected: 'en' },
  { name: 'Traditional Chinese', navigator: { languages: ['zh-TW'] }, expected: 'zh' },
  { name: 'British English', navigator: { languages: ['en-GB'] }, expected: 'en' },
  { name: 'secondary supported language', navigator: { languages: ['fr-FR', 'en-US', 'zh-CN'] }, expected: 'en' },
  { name: 'Japanese first', navigator: { languages: ['ja-JP', 'en-US'] }, expected: 'ja' },
  { name: 'Japanese without region', navigator: { languages: ['ja'] }, expected: 'ja' },
  { name: 'secondary Japanese', navigator: { languages: ['ko-KR', 'ja-JP', 'en-US'] }, expected: 'ja' },
  { name: 'unsupported languages', navigator: { languages: ['fr-FR', 'de-DE'] }, expected: 'zh' },
  { name: 'empty language list', navigator: { languages: [], language: 'en-GB' }, expected: 'en' },
  { name: 'single browser language', navigator: { language: 'zh-HK' }, expected: 'zh' },
  { name: 'no language preference', navigator: { languages: [], language: '' }, expected: 'zh' },
];
for (const page of ['', 'privacy/']) {
  const file = path.join(root, page, 'index.html');
  const html = cache.get(file);
  if (!html) { check(false, `Missing language redirect page: /${page}`); continue; }
  const noscript = html.match(/<noscript>([\s\S]*?)<\/noscript>/)?.[1];
  check(noscript?.includes(`http-equiv="refresh" content="0;url=/en/${page}"`), `/${page}: missing English no-JavaScript redirect`);
  check(!html.replace(/<noscript>[\s\S]*?<\/noscript>/g, '').includes('http-equiv="refresh"'), `/${page}: unconditional refresh overrides browser language`);
  check(html.includes(`href="/en/${page}"`), `/${page}: missing English fallback link`);
  const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(([, script]) => script);
  check(scripts.length > 0, `/${page}: missing browser-language redirect script`);
  for (const preference of languagePreferences) {
    const redirects = [];
    const search = '?source=language-check';
    const hash = '#data-deletion';
    try {
      const context = { navigator: preference.navigator, window: { location: { search, hash, replace: destination => redirects.push(destination) } } };
      for (const script of scripts) runInNewContext(script, context, { timeout: 1000 });
      check(redirects.length === 1 && redirects[0] === `/${preference.expected}/${page}${search}${hash}`, `/${page}: incorrect redirect for ${preference.name}`);
    } catch (error) {
      check(false, `/${page}: language redirect failed for ${preference.name}: ${error.message}`);
    }
  }
}
for (const lang of languages) {
  const policy = cache.get(path.join(root, lang, 'privacy/index.html'));
  check(policy?.includes('id="data-deletion"'), `${lang}: missing privacy policy or deletion section`);
}
const robots = await readFile(path.join(root, 'robots.txt'), 'utf8');
check(robots.includes(`${origin}/sitemap.xml`), 'Incorrect robots sitemap');
const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8');
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, loc]) => decode(loc));
check(locations.length === canonicalRoutes.size, 'Sitemap must include every published page in every language exactly once');
for (const loc of locations) check(canonicalRoutes.has(loc), `Sitemap contains a noncanonical page ${loc}`);
for (const [, loc, links] of sitemap.matchAll(/<url><loc>(.*?)<\/loc>(.*?)<\/url>/g)) {
  const route = new URL(decode(loc)).pathname;
  const expected = /^\/[a-z]+\/blog\/[^/]+\/$/.test(route) ? blogLanguages : languages;
  const declared = [...links.matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)].map(([, hreflang, href]) => `${hreflang} ${decode(href)}`).sort();
  const wanted = expected.map(lang => `${hreflangs[lang]} ${origin}${route.replace(languagePattern, `/${lang}/`)}`).sort();
  check(JSON.stringify(declared) === JSON.stringify(wanted), `Sitemap has incorrect language alternates for ${route}`);
}
// Languages without a translated blog show the English articles.
const englishPosts = locations.map(loc => new URL(loc).pathname).filter(route => /^\/en\/blog\/[^/]+\/$/.test(route));
for (const lang of languages.filter(lang => !blogLanguages.includes(lang))) {
  const blogIndex = cache.get(path.join(root, lang, 'blog', 'index.html')) ?? '';
  check(englishPosts.length > 0 && englishPosts.every(route => blogIndex.includes(`href="${route}"`)), `${lang}: blog index must link to every English article`);
  const home = cache.get(path.join(root, lang, 'index.html')) ?? '';
  check((home.match(/class="blog-card" href="\/en\/blog\/[^"]+\/"/g) ?? []).length === Math.min(3, englishPosts.length), `${lang}: home page must feature the latest English articles`);
}
for (const route of canonicalRoutes) check(locations.includes(route), `Sitemap is missing ${route}`);
for (const lang of languages) {
  const index = JSON.parse(await readFile(path.join(root, lang, 'search.json'), 'utf8'));
  check(index.length >= 7, `${lang}: missing searchable docs`);
  for (const entry of index) {
    check(entry.text?.length > 100, `${lang}: missing search body ${entry.title}`);
    check(await exists(path.join(root, entry.href, 'index.html')), `${lang}: broken search result ${entry.href}`);
  }
  if (!blogLanguages.includes(lang)) {
    check(!await exists(path.join(root, lang, 'rss.xml')), `${lang}: unexpected RSS feed for an untranslated blog`);
    check(!await exists(path.join(root, lang, 'blog')) || (await readdir(path.join(root, lang, 'blog'))).every(entry => entry === 'index.html'), `${lang}: unexpected untranslated blog article pages`);
    continue;
  }
  const rss = await readFile(path.join(root, lang, 'rss.xml'), 'utf8');
  check((rss.match(/<item>/g) ?? []).length >= 3, `${lang}: missing RSS posts`);
  for (const [, link] of rss.matchAll(/<link>(.*?)<\/link>/g)) {
    check(canonicalRoutes.has(decode(link)) && link.startsWith(`${origin}/${lang}/`), `${lang}: RSS contains a noncanonical link ${link}`);
  }
}
console.log(`Checked ${htmlFiles.length} HTML pages, ${references} local references, language and privacy redirects, SEO, search, and RSS`);
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; } else console.log('All generated-site checks passed.');
