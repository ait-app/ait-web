import type { Language } from './site';

const zh = {
  appreciation: { title: '支持 Ait 开发', description: '如果 Ait 对你有帮助，欢迎随心赞赏，支持持续开发。', action: '微信赞赏', alt: 'Ait 开发微信赞赏码', hint: '用微信扫一扫，或保存赞赏码后在微信中识别。感谢你的支持。', original: '查看 / 保存赞赏码' },
  community: { title: '加入 Ait 社群', description: '交流使用心得、分享反馈，和其他 Ait 用户一起探索。', telegram: '加入 Telegram 社群', wechat: '加入微信群', wechatAlt: 'Ait 微信群「rats for ait」入群二维码', wechatHint: '用微信扫一扫，或保存图片后在微信中识别。', wechatExpiry: '二维码有效期至', original: '查看 / 保存原图' },
  nav: { product: '产品', blog: '博客', docs: '文档', webApp: 'Web 界面', download: '获取 Ait', menu: '打开导航', close: '关闭', language: 'Switch to English' },
  footer: { tagline: '时刻准备着', product: '产品', resources: '探索', source: '源代码', releases: '版本发布', start: '快速上手', copyright: '为行动而生。', status: '本地优先 · 多端连接', rss: '订阅 RSS', support: '联系支持', privacy: '隐私政策' },
  home: {
    eyebrow: '本地优先的多 Agent 工作空间',
    title: '你的 Agent，', titleAccent: '随时在场。',
    description: '把你熟悉的 Agent 带进同一个工作空间。\n在电脑上开始，从另一块屏幕继续。',
    cta: '下载 Ait', secondary: '打开 Web 界面', note: 'macOS · Linux · Android · iOS · Web',
    providers: '熟悉的 Agent，全新的连接方式',
    demoCaption: '从一句想法，到一次提交。', demoHint: '探索 Ait 的工作流', demoLabel: '交互演示',
    tabs: ['构建', '审查', '连接'],
    featuresEyebrow: '少一点切换，多一点创造', featuresTitle: '一个空间，\n把工作串起来。', featuresDescription: 'Agent、文件、终端和代码变更，在同一个上下文里。把注意力留给真正想做的事。',
    features: [
      { icon: 'layers', number: '01', title: '多 Agent，一起工作', description: '按任务选择合适的 Agent。使用你已有的 CLI、登录和模型配置，在同一界面管理会话。', link: '了解 Agent 接入', path: 'docs/providers' },
      { icon: 'git', number: '02', title: '从想法到代码变更', description: '按项目组织工作区，查看文件与 Diff，在内置终端验证结果，让每一步都有上下文。', link: '探索工作区', path: 'docs/workspaces' },
      { icon: 'shield', number: '03', title: '本地运行，自己掌控', description: 'Agent 在工作主机上运行。Ait 的连接凭据与各 Agent 的服务凭据各自管理。', link: '了解连接与数据', path: 'docs/connection' },
    ],
    connectEyebrow: '灵感，不只在桌前', connectTitle: '换一块屏幕，\n接着做。', connectDescription: '电脑负责运行，设备负责连接。桌面、Android、iOS 与 Web 可通过同一账户发现在线主机，继续查看工作区、Agent、文件和终端。', connectLink: '了解多端连接', connectNote: '在 aitapp.cn 登录同一账户，即可通过浏览器连接在线主机。工作电脑需保持在线。',
    blogEyebrow: '来自 Ait 的笔记', blogTitle: '产品在前进，\n故事也在继续。', blogLink: '阅读全部文章',
    docsEyebrow: '从这里起飞', docsTitle: '第一次使用？\n我们一起开始。', docsDescription: '从安装、接入 Agent，到连接另一台设备。\n一步一步，建立属于你的工作空间。', docsLink: '阅读快速上手',
    faqTitle: '你可能还想知道',
    faqs: [
      { question: 'Ait 自带 AI 模型吗？', answer: 'Ait 管理和连接 Agent，不提供模型订阅。请先在运行主机上安装并登录你选择的 Agent CLI，相关模型与服务费用由对应供应商决定。' },
      { question: '目前可以在哪些设备上使用？', answer: '官方桌面 Release 提供 Apple Silicon macOS 和 Linux x86_64 安装包。Android 与 iOS 支持账户及 Relay 连接；Web 界面可在 aitapp.cn 登录使用。下载页会说明每个平台的使用方式。' },
      { question: '我的代码会发送到哪里？', answer: '项目文件和 Agent 运行时保留在工作主机上。Agent 仍会按自身设置与供应商服务通信；远程设备通过所选连接方式访问主机。具体边界请阅读连接与数据文档。' },
      { question: '可以继续使用已有的 Agent 配置吗？', answer: 'Ait 复用工作主机上原生 CLI 的登录与配置。Codex、Claude Code、OpenCode、DeepSeek Harness 与 Antigravity 的接入方式和能力差异见 Agent 接入文档。' },
    ],
  },
  blog: { eyebrow: 'AIT JOURNAL', title: '记录每一次向前。', description: '产品的想法、工程的细节，以及更顺手的工作方式。', all: '全部文章', read: '阅读全文', back: '返回博客', related: '继续阅读', minutes: '分钟阅读', empty: '这个分类暂时没有文章。', rss: 'RSS 订阅' },
  docs: { label: '文档', quickStart: '第一次使用？从快速上手开始', quickStartDescription: '安装、接入 Agent、创建工作区，一步步完成第一个任务。', search: '搜索文档', searchPlaceholder: '搜索安装、Agent、工作区…', noResults: '没有找到相关内容，试试其他关键词。', searchHint: '输入关键词，查找文档内容。', toc: '本页内容', previous: '上一篇', next: '下一篇', edit: '在 GitHub 上编辑此页', copy: '复制', copied: '已复制', copyError: '请手动复制', navigation: '文档目录', breadcrumb: '文档', back: '返回首页' },
  support: { title: '需要帮助？', description: '安装、登录或连接遇到问题，或想反馈建议，都可以联系我们。', email: '发送邮件', guide: '常见问题与反馈', privacy: '隐私政策', hint: '请附上 Ait 版本、设备系统和复现步骤，并移除密码、令牌及私人代码。' },
  privacy: { label: 'PRIVACY', updated: '更新日期', support: '文档与支持', deletion: '申请删除账户与数据', contents: '政策目录' },
  download: { eyebrow: 'LET’S BUILD', title: '下一步，交给 Ait。', description: '选择你的平台，让 Agent 进入工作空间。', desktop: '桌面应用', mobile: '移动与 Web', mac: 'macOS', macDetail: 'Apple Silicon · 官方 Release', chinaDownload: '国内加速下载', linux: 'Linux', linuxDetail: 'x86_64 · AppImage / tar.gz', latest: '前往官方下载', releaseNote: '安装包与校验信息以 GitHub 最新 Release 为准。', daemon: '没有桌面环境的服务器？安装独立 daemon', android: 'Android', androidDetail: '通过 Google Play 参加封闭测试。请先申请测试资格，再使用名单中的 Google 账号加入。', androidTesting: '加入 Google Play 封测', androidGuide: '申请资格与安装说明', ios: 'iOS / iPadOS', iosDetail: '通过 TestFlight 安装测试版，连接工作电脑继续 Agent 任务。', testFlight: '加入 TestFlight 测试', testFlightNote: '先安装 TestFlight，再接受邀请并安装 Ait。', web: 'Web', webDetail: '在 aitapp.cn 登录同一账户，通过浏览器连接在线主机，无需安装客户端。', openWeb: '打开 Web 界面', guide: '申请资格与安装说明', prerequisite: '准备好你的 Agent', prerequisiteDetail: '在工作主机上安装并登录至少一个 Agent CLI。Ait 复用现有认证，不包含模型订阅。', prerequisiteLink: '了解 Agent 接入' },
  notFound: { title: '这页还没有着陆。', description: '页面可能已移动，或者地址有误。', cta: '返回首页' },
};

const en = {
  appreciation: { title: 'Support Ait development', description: 'If Ait helps you, a voluntary tip supports its continued development.', action: 'Tip via WeChat', alt: 'WeChat appreciation code for Ait development', hint: 'Scan with WeChat, or save the code and open it in WeChat to scan. Thank you for your support.', original: 'View / save the code' },
  community: { title: 'Join the Ait community', description: 'Share tips, exchange feedback, and explore Ait with other users.', telegram: 'Join us on Telegram', wechat: 'Join our WeChat group', wechatAlt: 'QR code to join the Ait WeChat group “rats for ait”', wechatHint: 'Scan with WeChat, or save the image and open it in WeChat to scan.', wechatExpiry: 'QR code valid until', original: 'View / save full image' },
  nav: { product: 'Product', blog: 'Blog', docs: 'Docs', webApp: 'Web app', download: 'Get Ait', menu: 'Open navigation', close: 'Close', language: '切换到中文' },
  footer: { tagline: 'always ready', product: 'Product', resources: 'Explore', source: 'Source code', releases: 'Releases', start: 'Quick start', copyright: 'Built for doing.', status: 'Local first · Connected across devices', rss: 'Subscribe via RSS', support: 'Contact support', privacy: 'Privacy policy' },
  home: {
    eyebrow: 'A local-first workspace for your agents',
    title: 'Your agents.', titleAccent: 'Within reach.',
    description: 'Bring your favorite agents into one workspace.\nStart on your computer. Pick up on another screen.',
    cta: 'Get Ait', secondary: 'Open Web app', note: 'macOS · Linux · Android · iOS · Web',
    providers: 'The agents you know. A more connected workflow.',
    demoCaption: 'From a first thought to a code change.', demoHint: 'Explore the Ait workflow', demoLabel: 'Interactive demo',
    tabs: ['Build', 'Review', 'Connect'],
    featuresEyebrow: 'Less switching. More making.', featuresTitle: 'One space.\nA connected workflow.', featuresDescription: 'Agents, files, terminals, and code changes, all in context. Keep your attention on what you want to build.',
    features: [
      { icon: 'layers', number: '01', title: 'Your agents, together', description: 'Choose the right agent for the task. Bring your existing CLIs, sign-ins, and models into one interface for your sessions.', link: 'Explore agent setup', path: 'docs/providers' },
      { icon: 'git', number: '02', title: 'From ideas to code', description: 'Organize workspaces by project, inspect files and diffs, and verify results in the built-in terminal. Every step stays in context.', link: 'Explore workspaces', path: 'docs/workspaces' },
      { icon: 'shield', number: '03', title: 'Local, under your control', description: 'Agents run on your working host. Ait connection credentials and each provider’s service credentials are managed separately.', link: 'Connections & data', path: 'docs/connection' },
    ],
    connectEyebrow: 'Ideas don’t stay at your desk', connectTitle: 'Another screen.\nThe same work.', connectDescription: 'Your computer runs the agents. Your devices connect to it. Desktop, Android, iOS, and Web can discover online hosts through the same account and access workspaces, agents, files, and terminals.', connectLink: 'Explore device connections', connectNote: 'Sign in at aitapp.cn with the same account to connect to an online host in your browser. Keep your working computer online.',
    blogEyebrow: 'Notes from Ait', blogTitle: 'The product moves.\nThe story continues.', blogLink: 'Read all articles',
    docsEyebrow: 'Your starting point', docsTitle: 'First time here?\nLet’s get you going.', docsDescription: 'From installation and agent setup to connecting another device.\nBuild your own workspace, one step at a time.', docsLink: 'Read the quick start',
    faqTitle: 'A few things you might wonder',
    faqs: [
      { question: 'Does Ait include an AI model?', answer: 'Ait manages and connects agents; it does not include a model subscription. Install and sign in to your chosen agent CLI on the working host. Model access and service costs depend on the provider.' },
      { question: 'Which devices can I use?', answer: 'Official desktop releases include Apple Silicon macOS and Linux x86_64 installers. Android and iOS support account and relay connections. Sign in at aitapp.cn to use the Web app in your browser. The download page explains each platform.' },
      { question: 'Where does my code go?', answer: 'Project files and agent runtimes stay on the working host. Agents still communicate with their providers according to their own settings. Remote devices access the host through your chosen connection method. Read Connections & data for details.' },
      { question: 'Can I keep my existing agent configuration?', answer: 'Ait reuses native CLI sign-ins and configuration on the working host. See Agent setup for the integration steps and capability differences across Codex, Claude Code, OpenCode, DeepSeek Harness, and Antigravity.' },
    ],
  },
  blog: { eyebrow: 'AIT JOURNAL', title: 'Notes on moving forward.', description: 'Product ideas, engineering details, and better ways to work.', all: 'All articles', read: 'Read article', back: 'Back to Blog', related: 'Keep reading', minutes: 'min read', empty: 'No articles in this category yet.', rss: 'RSS feed' },
  docs: { label: 'Documentation', quickStart: 'New to Ait? Start here', quickStartDescription: 'Install Ait, connect an agent, and complete your first task, step by step.', search: 'Search docs', searchPlaceholder: 'Search installation, agents, workspaces…', noResults: 'No matching pages. Try a different keyword.', searchHint: 'Type a keyword to search the documentation.', toc: 'On this page', previous: 'Previous', next: 'Next', edit: 'Edit this page on GitHub', copy: 'Copy', copied: 'Copied', copyError: 'Copy manually', navigation: 'Documentation menu', breadcrumb: 'Docs', back: 'Back to home' },
  support: { title: 'Need a hand?', description: 'Contact us for help with installation, sign-in, or connections, or to share feedback and feature requests.', email: 'Email support', guide: 'Troubleshooting & feedback', privacy: 'Privacy policy', hint: 'Include your Ait version, operating system, and steps to reproduce. Remove passwords, tokens, and private code.' },
  privacy: { label: 'PRIVACY', updated: 'Last updated', support: 'Docs & support', deletion: 'Request account & data deletion', contents: 'Policy contents' },
  download: { eyebrow: 'LET’S BUILD', title: 'Your next step, with Ait.', description: 'Pick your platform. Bring your agents into your workspace.', desktop: 'Desktop apps', mobile: 'Mobile & Web', mac: 'macOS', macDetail: 'Apple Silicon · Official release', chinaDownload: 'Download mirror for China', linux: 'Linux', linuxDetail: 'x86_64 · AppImage / tar.gz', latest: 'Get the official release', releaseNote: 'Installers and checksums are available in the latest GitHub release.', daemon: 'Running a server without a desktop? Install the standalone daemon', android: 'Android', androidDetail: 'Try Ait through Google Play closed testing. Request access first, then join with your approved Google account.', androidTesting: 'Join Google Play testing', androidGuide: 'Access & installation guide', ios: 'iOS / iPadOS', iosDetail: 'Install the beta with TestFlight and connect to your working computer to continue agent tasks.', testFlight: 'Join the TestFlight beta', testFlightNote: 'Install TestFlight, then accept the invitation and install Ait.', web: 'Web', webDetail: 'Sign in at aitapp.cn with the same account to connect to online hosts in your browser. No client installation needed.', openWeb: 'Open Web app', guide: 'Access & installation guide', prerequisite: 'Bring your agents', prerequisiteDetail: 'Install and sign in to at least one agent CLI on your working host. Ait reuses your authentication and does not include a model subscription.', prerequisiteLink: 'Explore agent setup' },
  notFound: { title: 'This page hasn’t landed.', description: 'It may have moved, or the address may be incorrect.', cta: 'Back to home' },
};

export const translations = { zh, en };
export const t = (lang: Language) => translations[lang];
