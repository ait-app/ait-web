# Ait website

Ait 宣传官网，包含产品主页、Blog、Docs / 支持、Privacy 和下载页。使用 Astro 静态生成，中英文内容直接维护在 Markdown 中，不依赖数据库或 CMS。

设计参考 [Paseo 官网](https://paseo.sh/) 的产品展示方式；视觉使用 Ait 现有 BI，包括正式飞鸟 SVG、路径化 AIT 字标、暖白底与橙红品牌色。

## 本地开发

需要 Node.js 22.12+，使用项目中的 npm lockfile：

```sh
npm ci
npm run dev
```

默认地址为 `http://localhost:4321`。中文主页 `/zh/`，英文主页 `/en/`。本地开发默认进入中文。

```sh
npm run check
npm run build:all
npm run verify
```

`check` 检查 Astro 与 TypeScript；`verify` 检查两份构建的本地链接、资源、锚点、默认语言、canonical、hreflang、sitemap、RSS、搜索内容与双语文件完整性。

## 双域名部署

| 域名 | 根路径默认进入 | 构建命令 | 上传目录 |
| --- | --- | --- | --- |
| `aitapp.cn` | `/zh/` | `npm run build:cn` | `dist/cn/` |
| `ait-app.com` | `/en/` | `npm run build:com` | `dist/com/` |

两个构建都包含中英页面。语言切换保留当前文章或文档路径，不要求用户切换域名。SEO 的主地址按语言固定：中文 canonical 指向 `aitapp.cn`，英文指向 `ait-app.com`，两个域名不会争夺同一语言的主地址。每份 sitemap 只列出本域名的主要语言，并包含另一个语言的 alternate。

无语言前缀的 `/privacy`（或 `/privacy/`）跳转到当前域名的默认语言隐私政策：中文站进入 `/zh/privacy/`，英文站进入 `/en/privacy/`。启用 JavaScript 时保留查询参数与锚点，例如账户删除入口 `#data-deletion`；禁用 JavaScript 时通过 HTML 自动跳转，并提供可点击链接。

`npm run build` 默认输出 `dist/`。可设置 `SITE_URL=https://ait-app.com` 改为英文默认站。`SITE_URL` 只接受两个正式 HTTPS 域名，防止误生成错误的 SEO 地址。

将对应目录发布到支持静态目录的托管服务，配置 `index.html` 与 `404.html`。不使用把全部地址改写成首页的 SPA fallback。域名解析、TLS 与托管账户由最终部署环境配置；本次项目初始化没有发布线上站点。

CI 在 `.github/workflows/ci.yml` 中生成两份通过校验的部署产物，不自动上线。

## 内容维护

目录结构：

```text
src/content/blog/{zh,en}/*.md    Blog 正文和元数据
src/content/docs/{zh,en}/*.md    Docs 正文、分组和排序
src/content/legal/{zh,en}/*.md   隐私政策正文与更新日期
src/lib/i18n.ts                 界面与主页文案
src/lib/site.ts                 域名、路由和产品仓库入口
src/styles/global.css          BI 令牌和页面样式
public/brand/                  从 Ait 复用的生产素材
```

新增内容时同时添加中英文件，使用相同的 `slug`。Markdown 内站内链接使用对应语言前缀。Blog 设置 `draft: true` 后不生成页面，也不会进入列表与 RSS。

Blog frontmatter 示例：

```yaml
---
title: 新文章标题
description: 文章简介
lang: zh
slug: a-new-post
date: 2026-10-05
category: product
visual: flight
draft: true
---
```

`category` 可选 `product`、`engineering`、`guide`；`visual` 可选 `flight`、`connection`、`workspace`。

Docs 使用 `group: start | workflow | reference` 与数值 `order`。`getting-started` 对应 `/zh/docs/` 与 `/en/docs/`，其他页面使用 `/[lang]/docs/[slug]/`。搜索索引在构建时从全部文档正文生成。

## 商店支持与隐私页面

Docs 首页包含直接可见的客服邮箱、反馈与隐私入口；`docs/support/` 提供排障和反馈指引。客服邮箱统一为 `support@ait-app.com`，界面入口由 `src/lib/site.ts` 管理，Markdown 中的可见地址也需同步维护。

部署后可使用以下地址填写商店资料，中文版本对应 `https://aitapp.cn/zh/` 下的相同路径：

| 用途 | 英文地址 |
| --- | --- |
| App Store Support URL / Google Play 支持网站 | `https://ait-app.com/en/docs/` |
| Privacy Policy URL | `https://ait-app.com/en/privacy/` |
| Google Play 外部账户删除申请页面 | `https://ait-app.com/en/privacy/#data-deletion` |

Apple 的 [Support URL 定义](https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information/)要求真实联系方式；Google Play [要求提供客服邮箱，建议提供支持网站](https://support.google.com/googleplay/android-developer/answer/9859152?hl=en)。补充后的 Docs 可作为支持页面，但这些地址须先部署并保持无需登录可访问，邮箱须可实际收信。

网站的删除申请入口不替代应用内能力：提供账户创建的 App 还需要应用内账户删除入口，并实际处理账户与关联数据删除，见 [Apple 账号删除要求](https://developer.apple.com/support/offering-account-deletion-in-your-app/)和 [Google Play 账户删除要求](https://support.google.com/googleplay/android-developer/answer/13327111?hl=en)。Apple 对普通应用不接受仅通过客服邮件完成删除，应提供可在应用内发起的删除流程；本网站的邮件申请可作为 Google Play 的外部申请资源及额外隐私联系方式。商店隐私申报需与发布版本和第三方 SDK 的实际行为一致。Privacy 文案按源码边界编写；运营方已确认线上账户、日志和备份没有固定保留期限，可通过 `support@ait-app.com` 申请删除。运营安排变化时同步更新中英文政策。

## 内容和品牌来源

首批三篇双语 Blog 是为本站编写的起始文案，后续可在 Markdown 中编辑日期、作者与内容。Docs 根据 Ait 源码说明整理，具体来源记录在 [内容来源](docs/content-sources.md)。

品牌资源来自 `Documents/ait/assets/brand` 的正式生产资产，并保持原样。修改 Logo 应在 Ait 的共同矢量源中进行后重新导出，不能在官网里另画一个近似 Logo。

官网演示明确标注为交互演示，切换构建、审查与连接场景；不调用真实 Agent。官网不是 Ait Agent Web 客户端。

下载链接使用 `ait-app/ait` 的官方最新 Release，避免固定版本过期。移动与 Web 入口指向能力与构建文档，不宣称当前未发布的安装渠道。
