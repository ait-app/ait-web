# GitHub Pages 部署

唯一站点域名：`https://ait.guide`。原域名 `ait-app.com` 不再提供页面，由 Cloudflare 以 301 跳转到 `ait.guide` 的相同路径（见下文“原域名跳转”）。本仓库使用 GitHub Actions 构建 Astro 静态文件，并发布 `dist/`。根路径优先按浏览器偏好选择中文、英文或日文，未匹配到支持的语言时进入中文；关闭 JavaScript 时进入英文。三种语言的 Docs 与隐私页面均可通过语言前缀访问；Blog 仅发布中文和英文，日文 Blog 页面链接到英文文章。

## 仓库设置

在 [Settings → Pages](https://github.com/ait-app/ait-web/settings/pages) 中设置：

- Build and deployment → Source：**GitHub Actions**。
- Custom domain：**ait.guide**。
- 证书签发完成后开启 **Enforce HTTPS**。

自定义 Actions 发布不依赖 `CNAME` 文件，域名由 Pages 设置管理。项目部署在域名根路径，因此不配置 `/ait-web` 的 `base`，以保持现有文档、资源和隐私页地址。

## 自动发布

`.github/workflows/ci.yml` 同时负责验证与部署：

1. PR：安装锁定依赖，运行 `npm run check`、`npm run build`、`npm run verify`。
2. `main` 推送：完成上述检查，上传 `dist/` 为 Pages 产物，再通过 `github-pages` 环境发布。
3. 手动重发：在 Actions 中选择 **Verify and deploy website → Run workflow → main**。

发布作业使用工作流自带的 `GITHUB_TOKEN` 与 OIDC，不需要额外保存部署令牌。PR 不运行发布作业。常规构建产物 `ait-web` 保留供下载，同一份产物包含 `/en/`、`/zh/` 和 `/ja/`。

## Cloudflare DNS

先在 GitHub Pages 中添加主域名并完成首次部署，再切换 Cloudflare 的主域名记录。首次配置时，将 `ait.guide` 的 `@` A 记录替换为下列四条，TTL 使用自动，暂用仅 DNS 完成 GitHub 的域名检查和证书申请：

| 类型 | 名称 | 内容 | 代理状态 |
| --- | --- | --- | --- |
| A | `@` | `185.199.108.153` | 仅 DNS |
| A | `@` | `185.199.109.153` | 仅 DNS |
| A | `@` | `185.199.110.153` | 仅 DNS |
| A | `@` | `185.199.111.153` | 仅 DNS |

当前生产环境已按需为上述四条记录开启 **Cloudflare 代理（橙云）**。源站仍是 GitHub Pages，Cloudflare 提供对外 HTTPS 与代理服务；仅 DNS 是首次验证时的临时配置。Cloudflare 的 SSL/TLS 加密模式保持现有的“完全”，证书校验与签发进度可在 GitHub Pages 设置中检查。

同一主域名不要同时保留原托管的 A 记录，以免流量随机到达不同站点。MX、SPF、DKIM、其他 TXT 和应用子域名维持原配置。

`www.ait.guide` 使用 `CNAME www → ait-app.github.io`，GitHub Pages 会把它跳转到主域名；在 Pages 中检查域名及 HTTPS 状态。

## 原域名跳转

`ait-app.com` 的 DNS 区域继续保留在 Cloudflare，网页请求全部跳转到 `ait.guide`：

- `@` 与 `www` 记录保持 **Cloudflare 代理（橙云）**，否则跳转规则不会生效；记录内容不再被访问。
- Rules → Redirect Rules 中保留一条规则：

  | 项目 | 值 |
  | --- | --- |
  | 匹配条件 | `(http.host eq "ait-app.com") or (http.host eq "www.ait-app.com")` |
  | 类型 | Dynamic |
  | 表达式 | `concat("https://ait.guide", http.request.uri.path)` |
  | 状态码 | 301 |
  | Preserve query string | 开启 |

- MX、SPF、DKIM 及其他 TXT 记录维持原配置，客服邮箱 `support@ait-app.com` 继续使用原域名。
- 应用商店资料、应用内链接和外部文章中的旧地址依靠此规则保持可用，路径、查询参数与锚点均保留；不要删除此规则或让 `ait-app.com` 过期。

检查：

```sh
curl -sI "https://ait-app.com/en/privacy/?x=1" | grep -i -E "^HTTP|^location"
# 期望：301，location: https://ait.guide/en/privacy/?x=1
```

GitHub Pages 官方配置说明：[管理自定义域名](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)、[使用自定义工作流发布](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。

## 检查与回退

本地发布前检查：

```sh
npm ci
npm run check
npm run build
npm run verify
```

上线后检查 `/` 和 `/privacy/#data-deletion` 的语言选择：中文偏好进入 `/zh/` 下的对应页面，英文偏好进入 `/en/`，日文偏好进入 `/ja/`，未匹配到支持的语言时进入中文，关闭 JavaScript 时进入英文。启用 JavaScript 时查询参数和锚点应保留。另检查三种语言的 Docs、中文和英文 Blog、搜索和下载。三种语言的下载及平台文档都应提供一致的 Google Play / TestFlight 入口，Google Play 页面要保留先申请名单资格的说明；搜索中也应能找到新增的 Agent、无人值守配置和诊断内容。DNS 生效且证书可用后，在 Pages 设置中强制 HTTPS。

如某次源码更新有误，使用 `git revert` 回退对应提交并推送 `main`，工作流会重新构建发布。切换托管期间可保留旧站作为回退目标；故障时先恢复原主域名 A 记录，再处理部署。若需撤回域名迁移：停用 `ait-app.com` 的跳转规则，把 Pages 的 Custom domain 改回 `ait-app.com`，并回退切换站点域名的提交。
