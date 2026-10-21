# GitHub Pages 部署

唯一站点域名：`https://ait-app.com`。本仓库使用 GitHub Actions 构建 Astro 静态文件，并发布 `dist/`。根路径优先按浏览器偏好选择中文或英文，未匹配到支持的语言时进入中文；关闭 JavaScript 时进入英文。中英文内容均可直接通过语言前缀访问。

## 仓库设置

在 [Settings → Pages](https://github.com/ait-app/ait-web/settings/pages) 中设置：

- Build and deployment → Source：**GitHub Actions**。
- Custom domain：**ait-app.com**。
- 证书签发完成后开启 **Enforce HTTPS**。

自定义 Actions 发布不依赖 `CNAME` 文件，域名由 Pages 设置管理。项目部署在域名根路径，因此不配置 `/ait-web` 的 `base`，以保持现有文档、资源和隐私页地址。

## 自动发布

`.github/workflows/ci.yml` 同时负责验证与部署：

1. PR：安装锁定依赖，运行 `npm run check`、`npm run build`、`npm run verify`。
2. `main` 推送：完成上述检查，上传 `dist/` 为 Pages 产物，再通过 `github-pages` 环境发布。
3. 手动重发：在 Actions 中选择 **Verify and deploy website → Run workflow → main**。

发布作业使用工作流自带的 `GITHUB_TOKEN` 与 OIDC，不需要额外保存部署令牌。PR 不运行发布作业。常规构建产物 `ait-web` 保留供下载，同一份产物包含 `/en/` 和 `/zh/`。

## Cloudflare DNS

先在 GitHub Pages 中添加主域名并完成首次部署，再切换 Cloudflare 的主域名记录。首次配置时，将 `ait-app.com` 的 `@` A 记录替换为下列四条，TTL 使用自动，暂用仅 DNS 完成 GitHub 的域名检查和证书申请：

| 类型 | 名称 | 内容 | 代理状态 |
| --- | --- | --- | --- |
| A | `@` | `185.199.108.153` | 仅 DNS |
| A | `@` | `185.199.109.153` | 仅 DNS |
| A | `@` | `185.199.110.153` | 仅 DNS |
| A | `@` | `185.199.111.153` | 仅 DNS |

当前生产环境已按需为上述四条记录开启 **Cloudflare 代理（橙云）**。源站仍是 GitHub Pages，Cloudflare 提供对外 HTTPS 与代理服务；仅 DNS 是首次验证时的临时配置。Cloudflare 的 SSL/TLS 加密模式保持现有的“完全”，证书校验与签发进度可在 GitHub Pages 设置中检查。

同一主域名不要同时保留原托管的 A 记录，以免流量随机到达不同站点。MX、SPF、DKIM、其他 TXT 和应用子域名维持原配置。

若以后接入 `www.ait-app.com`，添加 `CNAME www → ait-app.github.io`，并在 Pages 中检查域名及 HTTPS 状态。

GitHub Pages 官方配置说明：[管理自定义域名](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)、[使用自定义工作流发布](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。

## 检查与回退

本地发布前检查：

```sh
npm ci
npm run check
npm run build
npm run verify
```

上线后检查 `/` 和 `/privacy/#data-deletion` 的语言选择：中文偏好进入 `/zh/` 下的对应页面，英文偏好进入 `/en/`，未匹配到支持的语言时进入中文，关闭 JavaScript 时进入英文。启用 JavaScript 时查询参数和锚点应保留。另检查中英文 Blog、Docs、搜索和下载。中英文下载及平台文档都应提供一致的 Google Play / TestFlight 入口，Google Play 页面要保留先申请名单资格的说明；搜索中也应能找到新增的 Agent、无人值守配置和诊断内容。DNS 生效且证书可用后，在 Pages 设置中强制 HTTPS。

如某次源码更新有误，使用 `git revert` 回退对应提交并推送 `main`，工作流会重新构建发布。切换托管期间可保留旧站作为回退目标；故障时先恢复原主域名 A 记录，再处理部署。
