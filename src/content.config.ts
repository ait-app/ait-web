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
  loader: glob({ pattern: '**/*.md', base: './src/content/blog', generateId: ({ entry }) => entry.replace(/\.md$/, '') }),
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
  loader: glob({ pattern: '**/*.md', base: './src/content/docs', generateId: ({ entry }) => entry.replace(/\.md$/, '') }),
  schema: z.object({
    ...common,
    group: z.enum(['start', 'workflow', 'reference']),
    order: z.number(),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal', generateId: ({ entry }) => entry.replace(/\.md$/, '') }),
  schema: z.object({ ...common, updated: z.coerce.date() }),
});

export const collections = { blog, docs, legal };
