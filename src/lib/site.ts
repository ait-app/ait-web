export const languages = ['zh', 'en'] as const;
export type Language = typeof languages[number];
export const domains: Record<Language, string> = {
  zh: 'https://aitapp.cn',
  en: 'https://ait-app.com',
};
export const product = {
  supportEmail: 'support@ait-app.com',
  repository: 'https://github.com/ait-app/ait',
  websiteRepository: 'https://github.com/ait-app/ait-web',
  releases: 'https://github.com/ait-app/ait/releases',
  latestRelease: 'https://github.com/ait-app/ait/releases/latest',
};
export const pathFor = (lang: Language, path = '') => `/${lang}/${path ? `${path.replace(/^\/+|\/+$/g, '')}/` : ''}`;
export const canonicalFor = (lang: Language, path = '') => new URL(pathFor(lang, path), domains[lang]).href;
export const docPath = (slug: string) => slug === 'getting-started' ? 'docs' : `docs/${slug}`;
export const isLanguage = (value: string | undefined): value is Language => languages.includes(value as Language);
export const dateLabel = (date: Date, lang: Language) => new Intl.DateTimeFormat(lang === 'zh' ? 'zh-CN' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }).format(date);
export const categories = {
  zh: { product: '产品动态', engineering: '工程手记', guide: '使用指南' },
  en: { product: 'Product', engineering: 'Engineering', guide: 'Guides' },
};
export const groups = {
  zh: { start: '开始使用', workflow: '工作流', reference: '参考与配置' },
  en: { start: 'Getting started', workflow: 'Workflows', reference: 'Reference' },
};
