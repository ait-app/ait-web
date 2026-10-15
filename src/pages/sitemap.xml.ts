import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { canonicalFor, docPath, languages } from '../lib/site';
export const GET: APIRoute = async () => {
  const [docs, blog] = await Promise.all([getCollection('docs'), getCollection('blog', page => !page.data.draft)]);
  const urls = languages.flatMap(lang => {
    const paths = ['', 'blog', 'download', 'privacy', ...docs.filter(page => page.data.lang === lang).map(page => docPath(page.data.slug)), ...blog.filter(page => page.data.lang === lang).map(page => `blog/${page.data.slug}`)];
    return paths.map(path => `<url><loc>${canonicalFor(lang,path)}</loc><xhtml:link rel="alternate" hreflang="zh-CN" href="${canonicalFor('zh',path)}"/><xhtml:link rel="alternate" hreflang="en" href="${canonicalFor('en',path)}"/></url>`);
  }).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
};
