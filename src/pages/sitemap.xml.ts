import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { canonicalFor, docPath } from '../lib/site';
export const GET: APIRoute = async () => {
  const lang = __DEFAULT_LOCALE__;
  const docs = await getCollection('docs', page => page.data.lang === lang);
  const blog = await getCollection('blog', page => page.data.lang === lang && !page.data.draft);
  const paths = ['', 'blog','download', 'privacy', ...docs.map(page => docPath(page.data.slug)), ...blog.map(page => `blog/${page.data.slug}`)];
  const urls = paths.map(path => `<url><loc>${canonicalFor(lang,path)}</loc><xhtml:link rel="alternate" hreflang="zh-CN" href="${canonicalFor('zh',path)}"/><xhtml:link rel="alternate" hreflang="en" href="${canonicalFor('en',path)}"/></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
};
