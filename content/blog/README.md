# Blog 写作与命名规范

文章正文和元数据均以 UTF-8 Markdown（`.md`）保存在 `content/blog/`。本文件用于维护说明，不会生成博客文章。

Blog、Docs 与隐私政策均同时维护 `zh/`、`en/`、`ja/` 三种语言。日文站点的 `/ja/blog/`、首页文章区与 `/ja/rss.xml` 直接展示 `content/blog/ja/` 下的日文文章。

## 目录与文件名

```text
content/
├── blog/
│   ├── README.md
│   ├── zh/
│   │   └── 2026-10-16-a-new-post.md
│   ├── en/
│   │   └── 2026-10-16-a-new-post.md
│   └── ja/
│       └── 2026-10-16-a-new-post.md
├── docs/
│   ├── zh/
│   ├── en/
│   └── ja/
└── legal/
    ├── zh/
    ├── en/
    └── ja/
```

文件名固定为 **`YYYY-MM-DD-<slug>.md`**：

- 日期使用首次发布日期，年月日补齐两位，并与 frontmatter 的 `date` 一致。后续修改正文时保留首次发布日期。
- `slug` 是文章的稳定英文短名，使用小写英文字母、数字和单个连字符，如 `hello-ait`、`workspace-context`、`ait-0-1-3`。
- 不使用空格、下划线、中文、大写字母、连续连字符或 `.markdown` 扩展名。
- 同一语言内 `slug` 唯一；不同日期的文章也不能重复使用同一个 `slug`。
- 中文放在 `zh/`，英文放在 `en/`，日文放在 `ja/`。同一篇文章的三语文件名相同，frontmatter 的 `lang` 分别为 `zh`、`en`、`ja`。三份语言使用相同的首次发布日期。
- 文章直接放在语言目录下，不额外按年份、分类或主题创建子目录。分类由 `category` 字段管理。

`content/blog/zh/2026-10-16-a-new-post.md` 对应页面：

```text
https://ait.guide/zh/blog/a-new-post/
```

文件名中的日期方便在仓库中整理文章；网址由 `lang` 和 `slug` 决定。修改标题或正文不会改变网址。已发布的 `slug` 应保持不变，改动它会改变公开链接。

## Markdown 模板

创建 `content/blog/zh/2026-10-16-a-new-post.md`：

```markdown
---
title: 新文章标题
description: 用一句话说明文章内容，显示在列表、RSS 和分享摘要中。
lang: zh
slug: a-new-post
date: 2026-10-16
category: product
author: Ait Team
visual: flight
draft: true
---

在这里写文章导语。

## 第一个小节

在这里使用 Markdown 编写正文，可以包含列表、链接、引用和代码块。
```

英文与日文文件使用相同文件名，分别将 `lang` 改为 `en`、`ja`，并翻译 `title`、`description` 和正文。

| 字段 | 要求 | 用途 |
| --- | --- | --- |
| `title` | 必填 | 文章主标题，由页面模板生成；正文从 `##` 小节标题开始 |
| `description` | 必填 | 一句话摘要 |
| `lang` | 必填：`zh` / `en` / `ja` | 必须与所在目录一致 |
| `slug` | 必填 | 必须与文件名中的英文短名一致 |
| `date` | 必填：`YYYY-MM-DD` | 必须与文件名日期一致；列表按此日期倒序排列 |
| `category` | 必填：`product` / `engineering` / `guide` | 产品动态 / 工程手记 / 使用指南 |
| `author` | 可选，默认 `Ait Team` | 作者署名 |
| `visual` | 必填：`flight` / `connection` / `workspace` | 选择现有文章配图样式 |
| `draft` | 可选，默认 `false` | `true` 时不生成文章页面，也不进入首页、博客列表、相关推荐、RSS 或 sitemap |

新建文章建议明确写 `draft: true`。三种语言准备好后，再同时改成 `false`，保证语言切换有对应页面。当前没有定时发布功能：未来的 `date` 不会阻止 `draft: false` 的文章发布。

站内链接使用目标语言的页面路径，例如 `[快速开始](/zh/docs/)`。不要链接到仓库中的 `.md` 文件。文章里的图片可放在 `public/blog/<slug>/`，正文用 `/blog/<slug>/图片文件名` 引用，三种语言可以共用图片。

## 检查与发布

1. 在 `zh/`、`en/`、`ja/` 下创建同名 Markdown 文件，填写元数据和正文。
2. 用 `npm run dev` 本地查看；查看文章页面前，临时将三份 `draft` 设为 `false`。
3. 运行下列命令。构建会拒绝不符合规则的文件名、无效日期、元数据不一致或重复 `slug`；站内校验还会检查三语文件是否配对，以及链接、RSS 和 sitemap。

   ```sh
   npm run check
   npm run build
   npm run verify
   ```

4. 发布时确认三份文章均为 `draft: false`，提交并推送到 `main`。GitHub Actions 验证通过后会自动更新 `ait.guide`。

Docs 与隐私正文分别保存在 `content/docs/`、`content/legal/`，沿用各自的文件名和元数据规范，不使用 Blog 的日期前缀。
