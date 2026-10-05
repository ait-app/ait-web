import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { languages, pathFor, docPath, groups, type Language } from '../../lib/site';
export function getStaticPaths() { return languages.map(lang => ({ params: { lang } })); }
export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang as Language;
  const pages = (await getCollection('docs', page => page.data.lang === lang)).sort((a,b) => a.data.order - b.data.order);
  return new Response(JSON.stringify(pages.map(page => ({ title:page.data.title, description:page.data.description, text:page.body ?? '', href:pathFor(lang,docPath(page.data.slug)), group:groups[lang][page.data.group] }))),{ headers:{'Content-Type':'application/json; charset=utf-8'} });
};
