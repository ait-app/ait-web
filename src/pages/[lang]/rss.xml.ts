import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { languages, canonicalFor, type Language } from '../../lib/site';
const xml = (value: string) => value.replace(/[<>&'\"]/g, character => ({'<':'&lt;','>':'&gt;','&':'&amp;',"'":'&apos;','"':'&quot;'}[character]!));
export function getStaticPaths() { return languages.map(lang => ({ params:{lang} })); }
export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang as Language;
  const posts = (await getCollection('blog', post => post.data.lang === lang && !post.data.draft)).sort((a,b) => b.data.date.valueOf() - a.data.date.valueOf());
  const feed = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Ait Blog</title><link>${canonicalFor(lang,'blog')}</link><description>${lang === 'zh' ? '产品的想法、工程的细节，以及更顺手的工作方式。' : 'Product ideas, engineering details, and better ways to work.'}</description><language>${lang === 'zh' ? 'zh-CN' : 'en'}</language>${posts.map(post => `<item><title>${xml(post.data.title)}</title><link>${canonicalFor(lang,`blog/${post.data.slug}`)}</link><guid isPermaLink="true">${canonicalFor(lang,`blog/${post.data.slug}`)}</guid><description>${xml(post.data.description)}</description><pubDate>${post.data.date.toUTCString()}</pubDate></item>`).join('')}</channel></rss>`;
  return new Response(feed,{headers:{'Content-Type':'application/rss+xml; charset=utf-8'}});
};
