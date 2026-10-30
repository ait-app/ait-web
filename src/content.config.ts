import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const common = {
  title: z.string(),
  description: z.string(),
  lang: z.enum(['zh', 'en']),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
};

const blog = defineCollection({
  loader: glob({
    pattern: ['**/*.md', '!README.md'],
    base: './content/blog',
    generateId: ({ entry, data }) => {
      const match = /^(zh|en)\/(\d{4}-\d{2}-\d{2})-([a-z0-9]+(?:-[a-z0-9]+)*)\.md$/.exec(entry);
      if (!match) throw new Error(`content/blog/${entry}: use {zh,en}/YYYY-MM-DD-kebab-case-slug.md. See content/blog/README.md.`);
      const [, lang, date, slug] = match;
      const parsedDate = new Date(`${date}T00:00:00.000Z`);
      if (Number.isNaN(parsedDate.valueOf()) || parsedDate.toISOString().slice(0, 10) !== date) {
        throw new Error(`content/blog/${entry}: filename must contain a valid publication date.`);
      }
      const metadataDate = data.date instanceof Date && !Number.isNaN(data.date.valueOf()) ? data.date.toISOString().slice(0, 10) : data.date;
      if (data.lang !== lang || data.slug !== slug || metadataDate !== date) {
        throw new Error(`content/blog/${entry}: frontmatter lang, slug, and date must match the directory and filename.`);
      }
      return `${lang}/${slug}`;
    },
  }),
  schema: z.object({
    ...common,
    date: z.coerce.date(),
    category: z.enum(['product', 'engineering', 'guide']),
    author: z.string().default('Ait Team'),
    visual: z.enum(['flight', 'connection', 'workspace']),
    draft: z.boolean().default(false),
  }),
});

const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/docs', generateId: ({ entry }) => entry.replace(/\.md$/, '') }),
  schema: z.object({
    ...common,
    group: z.enum(['quickstart', 'start', 'workflow', 'reference', 'development']),
    order: z.number(),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/legal', generateId: ({ entry }) => entry.replace(/\.md$/, '') }),
  schema: z.object({ ...common, updated: z.coerce.date() }),
});

export const collections = { blog, docs, legal };
