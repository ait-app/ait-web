import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { blogLanguages, canonicalFor, locales, type BlogLanguage } from '../../lib/site';
import { t } from '../../lib/i18n';
const xml = (value: string) => value.replace(/[<>&'\"]/g, character => ({'<':'&lt;','>':'&gt;','&':'&amp;',"'":'&apos;','"':'&quot;'}[character]!));
export function getStaticPaths() { return blogLanguages.map(lang => ({ params:{lang} })); }
export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang as BlogLanguage;
  const posts = (await getCollection('blog', post => post.data.lang === lang && !post.data.draft)).sort((a,b) => b.data.date.valueOf() - a.data.date.valueOf());
  const feed = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Ait Blog</title><link>${canonicalFor(lang,'blog')}</link><description>${xml(t(lang).blog.description)}</description><language>${locales[lang].hreflang}</language>${posts.map(post => `<item><title>${xml(post.data.title)}</title><link>${canonicalFor(lang,`blog/${post.data.slug}`)}</link><guid isPermaLink="true">${canonicalFor(lang,`blog/${post.data.slug}`)}</guid><description>${xml(post.data.description)}</description><pubDate>${post.data.date.toUTCString()}</pubDate></item>`).join('')}</channel></rss>`;
  return new Response(feed,{headers:{'Content-Type':'application/rss+xml; charset=utf-8'}});
};
