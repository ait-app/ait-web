# Ait website

Ait 宣传官网，包含产品主页、Blog、Docs / 支持、Privacy 和下载页。使用 Astro 静态生成，中英文内容直接维护在 Markdown 中，不依赖数据库或 CMS。

官网唯一域名为 **[ait-app.com](https://ait-app.com/)**，中英文内容均在此域名下提供。

视觉使用 Ait 现有 BI，包括正式飞鸟 SVG、路径化 AIT 字标、暖白底与橙红品牌色。

## 本地开发

需要 Node.js 22.12+，使用项目中的 npm lockfile：

```sh
npm ci
npm run dev
```

默认地址为 `http://localhost:4321`。中文主页 `/zh/`，英文主页 `/en/`。根路径按浏览器语言偏好顺序选择中文或英文（如 `zh-CN`、`zh-TW`、`en-US`）；未匹配到支持的语言时进入中文。关闭 JavaScript 时固定进入英文。本地和线上使用相同规则。

```sh
npm run check
npm run build
npm run verify
```

`check` 检查 Astro 与 TypeScript；`verify` 检查 `dist/` 中生成页面的本地链接、资源、锚点、默认语言、canonical、hreflang、sitemap、RSS、搜索内容与双语文件完整性。

## 部署

网站使用 `ait-app.com`。使用 GitHub Pages 托管，通过本仓库的 GitHub Actions 自动发布，Cloudflare 提供 DNS 与代理。部署配置见 [GitHub Pages 部署说明](docs/github-pages.md)。

| 域名 | 根路径语言选择 | 构建命令 | 上传目录 |
| --- | --- | --- | --- |
| `ait-app.com` | 优先浏览器语言，未匹配时 `/zh/`，无 JavaScript 时 `/en/` | `npm run build` | `dist/` |

同一份构建包含中英页面：英文位于 `https://ait-app.com/en/`，中文位于 `https://ait-app.com/zh/`。语言切换保留当前文章或文档路径。新增官网链接、商店资料和部署配置统一使用 `ait-app.com`，语言通过路径区分。

无语言前缀的 `/privacy`（或 `/privacy/`）使用相同的浏览器语言选择规则，跳转到对应的隐私政策，并保留查询参数与锚点，例如账户删除入口 `#data-deletion`；关闭 JavaScript 时通过 HTML 自动跳转到 `/en/privacy/`，并提供可点击链接。带 `/zh/` 或 `/en/` 前缀的页面遵循链接指定的语言，不自动改写。

单独生成官网发布产物：

```sh
npm run build
```

默认站点地址为 `https://ait-app.com`，构建输出为 `dist/`。`SITE_URL` 仅接受此 HTTPS 域名。中英文 canonical、hreflang、RSS 与 sitemap 均使用同一域名；sitemap 包含两种语言的页面。

CI 在 `.github/workflows/ci.yml` 中对 PR 运行类型检查、构建与站内校验。推送 `main` 或手动运行工作流时，校验通过后发布 `dist/` 到 GitHub Pages；`ait-web` 为对应的可下载产物。

本项目按自定义域名根路径部署，`astro.config.mjs` 不设置 `/ait-web` 的 `base`。GitHub Pages 的 Custom domain 必须设为 `ait-app.com`；默认的 `ait-app.github.io/ait-web/` 地址由 GitHub 跳转到主域名。

## 内容维护

目录结构：

```text
content/blog/{zh,en}/*.md        Blog 正文和元数据
content/docs/{zh,en}/*.md        Docs 正文、分组和排序
content/legal/{zh,en}/*.md       隐私政策正文与更新日期
src/lib/i18n.ts                 界面与主页文案
src/lib/site.ts                 域名、路由和产品仓库入口
src/styles/global.css          BI 令牌和页面样式
public/brand/                  从 Ait 复用的生产素材
docs/internal/brand/{zh,en}.md  品牌设计维护说明，不参与网站发布
```

全部正文统一存放在根目录 `content/`，以 Markdown 文件维护。新增内容时同时添加中英文件，使用相同的 `slug`。Markdown 内站内链接使用对应语言前缀。

Blog 命名格式为 `content/blog/{zh,en}/YYYY-MM-DD-<slug>.md`，例如：

```text
content/blog/zh/2026-10-16-a-new-post.md
content/blog/en/2026-10-16-a-new-post.md
```

日期为首次发布日期；`slug` 使用小写英文、数字和连字符，中英文保持一致。文件名与 frontmatter 的 `date`、`slug`、`lang` 必须对应，构建时会检查。URL 只使用语言和 `slug`，例如 `/zh/blog/a-new-post/`，不包含文件名日期。已发布文章的 `slug` 保持稳定。

完整的命名规则、frontmatter 模板、字段说明和发布步骤见 [Blog 写作规范](content/blog/README.md)。Blog 设置 `draft: true` 后不生成页面，也不会进入列表与 RSS。

Docs 使用 `group: quickstart | start | workflow | reference` 与数值 `order`。`quickstart` 分组作为文档目录最前面的一级入口，当前对应双语 `/docs/quick-start/`，正文继续在 Markdown 中维护。`getting-started` 对应 `/zh/docs/` 与 `/en/docs/`，其他页面使用 `/[lang]/docs/[slug]/`。搜索索引在构建时从全部文档正文生成。

当前公开文档覆盖快速上手、为什么使用 Ait、文档与支持概览、平台安装、5 个 Agent 接入、支持与诊断、工作区及定时任务、连接与数据、独立 daemon 的下载安装与无人值守模式，以及服务配置。能力更新时先对照最新源码和运维说明，再同步中英正文及首页相关文案，并在 [内容来源](docs/content-sources.md)记录提交与核验范围。源码具备能力不代表每个商店测试版都已包含，也不代表已经完成实机验收。

## 商店支持与隐私页面

Docs 首页包含直接可见的客服邮箱、反馈与隐私入口；`docs/support/` 提供排障和反馈指引。客服邮箱统一为 `support@ait-app.com`，界面入口由 `src/lib/site.ts` 管理，Markdown 中的可见地址也需同步维护。

页脚、Docs 首页和支持页提供 Telegram 社群与微信群入口，统一使用 `CommunityLinks.astro`。邀请链接、微信二维码路径与有效期在 `src/lib/site.ts` 的 `product.telegramGroup`、`product.wechatGroup` 中维护。微信二维码保留用户提供的原图，存放在 `public/community/`；当前图片有效期至 2026-10-31，更新时一起替换图片路径与 `expiresAt`，页面会同步显示新日期。

部署后可使用以下地址填写商店资料，中文版本对应 `https://ait-app.com/zh/` 下的相同路径：

| 用途 | 英文地址 |
| --- | --- |
| App Store Support URL / Google Play 支持网站 | `https://ait-app.com/en/docs/` |
| Privacy Policy URL | `https://ait-app.com/en/privacy/` |
| Google Play 外部账户删除申请页面 | `https://ait-app.com/en/privacy/#data-deletion` |

Apple 的 [Support URL 定义](https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information/)要求真实联系方式；Google Play [要求提供客服邮箱，建议提供支持网站](https://support.google.com/googleplay/android-developer/answer/9859152?hl=en)。补充后的 Docs 可作为支持页面，但这些地址须先部署并保持无需登录可访问，邮箱须可实际收信。

网站的删除申请入口不替代应用内能力：提供账户创建的 App 还需要应用内账户删除入口，并实际处理账户与关联数据删除，见 [Apple 账号删除要求](https://developer.apple.com/support/offering-account-deletion-in-your-app/)和 [Google Play 账户删除要求](https://support.google.com/googleplay/android-developer/answer/13327111?hl=en)。Apple 对普通应用不接受仅通过客服邮件完成删除，应提供可在应用内发起的删除流程；本网站的邮件申请可作为 Google Play 的外部申请资源及额外隐私联系方式。商店隐私申报需与发布版本和第三方 SDK 的实际行为一致。Privacy 文案按源码边界编写；运营方已确认线上账户、日志和备份没有固定保留期限，可通过 `support@ait-app.com` 申请删除。运营安排变化时同步更新中英文政策。

## 内容和品牌来源

首批三篇双语 Blog 是为本站编写的文章。已发布文章保留首次发布日期与 `slug`；能力变化时增加带日期的更新提示，并链接到当前 Docs。Docs 根据 Ait 源码说明整理，具体来源记录在 [内容来源](docs/content-sources.md)。

品牌资源来自 `Documents/ait/assets/brand` 的正式生产资产，并保持原样。修改 Logo 应在 Ait 的共同矢量源中进行后重新导出，不能在官网里另画一个近似 Logo。

官网演示明确标注为交互演示，切换构建、审查与连接场景；不调用真实 Agent。官网不是 Ait Agent Web 客户端。

官方下载链接使用 `ait-app/ait` 的最新 Release。macOS Apple Silicon 另有注明版本的国内 DMG 加速入口，维护时同步更新 `src/lib/site.ts` 和中英文平台文档。

iOS / iPadOS 下载卡片提供 TestFlight 公开测试入口，中英文平台文档包含相同邀请链接与安装步骤，无需先邮件申请。公开链接在 `src/lib/site.ts` 的 `product.testFlightPublicUrl` 中维护，更换时同步更新两种语言的平台文档及快速开始中的直接链接；公开测试的构建、名额和开放状态由 App Store Connect 的外部测试组管理。

下载页的 Android 卡片提供 Google Play 封闭测试入口，地址在 `src/lib/site.ts` 的 `product.googlePlayTesting` 中维护，并同步到中英文平台、快速开始与支持文档。目前封测仍使用邮箱名单，用户需先通过 `support@ait-app.com` 申请资格，再使用同一 Google 账号加入；网站链接不会自动将用户加入名单。

Web 界面地址统一由 `src/lib/site.ts` 中的 `product.webApp` 管理，导航、首页、下载页和页脚均直接链接到 `https://aitapp.cn/`；中英文平台、快速开始、连接与支持文档也提供此入口或账户 API 说明，维护时一起核对。宣传官网域名、Web 界面地址与账户 API 不可互换。
