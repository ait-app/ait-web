export const languages = ['zh', 'en'] as const;
export type Language = typeof languages[number];
export const siteOrigin = 'https://ait-app.com';
export const featuredAgents = [
  { id: 'codex', name: 'Codex' },
  { id: 'deepseek-harness', name: 'DeepSeek Harness' },
  { id: 'opencode', name: 'OpenCode' },
  { id: 'antigravity', name: 'Antigravity' },
  { id: 'claude', name: 'Claude Code' },
] as const;
export type AgentProvider = typeof featuredAgents[number]['id'];
export const product = {
  webApp: 'https://aitapp.cn/',
  supportEmail: 'support@ait-app.com',
  telegramGroup: 'https://t.me/ait_users',
  wechatGroup: {
    qrCode: '/community/wechat-group-2026-10-31.png',
    expiresAt: '2026-10-31',
  },
  testFlightPublicUrl: 'https://testflight.apple.com/join/fjc7g46u',
  repository: 'https://github.com/ait-app/ait',
  websiteRepository: 'https://github.com/ait-app/ait-web',
  releases: 'https://github.com/ait-app/ait/releases',
  latestRelease: 'https://github.com/ait-app/ait/releases/latest',
  googlePlayTesting: 'https://play.google.com/apps/testing/dev.ait.mobile',
  macDmgMirror: {
    url: 'https://ait-release-1251719274.cos.ap-shanghai.myqcloud.com/v0.1.19/Ait-0.1.19-macos-arm64.dmg',
    version: '0.1.19',
  },
};
export const pathFor = (lang: Language, path = '') => `/${lang}/${path ? `${path.replace(/^\/+|\/+$/g, '')}/` : ''}`;
export const canonicalFor = (lang: Language, path = '') => new URL(pathFor(lang, path), siteOrigin).href;
export const docPath = (slug: string) => slug === 'getting-started' ? 'docs' : `docs/${slug}`;
export const isLanguage = (value: string | undefined): value is Language => languages.includes(value as Language);
export const dateLabel = (date: Date, lang: Language) => new Intl.DateTimeFormat(lang === 'zh' ? 'zh-CN' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' }).format(date);
export const categories = {
  zh: { product: '产品动态', engineering: '工程手记', guide: '使用指南' },
  en: { product: 'Product', engineering: 'Engineering', guide: 'Guides' },
};
export const groups = {
  zh: { quickstart: '快速上手', start: '开始使用', workflow: '工作流', reference: '参考与配置' },
  en: { quickstart: 'Quick start', start: 'Getting started', workflow: 'Workflows', reference: 'Reference' },
};
