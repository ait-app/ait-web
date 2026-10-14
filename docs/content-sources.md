# 内容来源

资料读取时间：2026-10-05。产品仓库：`git@github.com:ait-app/ait.git`，本地读取目录：`/Users/necokeine/Documents/ait`，源码 HEAD：`3a13d02bea2c63592f61727e382678f76566a40c`。

| 官网内容 | Ait 原始资料 |
| --- | --- |
| 产品定位、开发命令、账户主机 | `README.md` |
| 平台支持、Android 验收范围、Web 入口 | `apps/mobile/README.md` |
| daemon、配置、凭据、订阅、数据目录 | `docs/operations/daemon.md` |
| Claude 原生登录与能力 | `docs/operations/claude-code.md` |
| OpenCode 能力与限制 | `docs/decisions/providers/adr-074-opencode-native-provider.md` |
| BI、Logo、留白与品牌色 | `docs/decisions/branding/adr-051-ait-brand-identity.md` |
| 生产 SVG 来源 | `assets/brand/README.md` |
| 官方桌面安装格式 | `ait-app/ait` GitHub Release，查询时为 `v0.0.17` |

本站的 Blog 是新编写的起始文案，不是从 Paseo 复制的文章，也不是 Ait 历史发布记录。对外上线前可以根据发布节奏调整日期、署名与 `draft` 状态。

设计参考 `https://paseo.sh/` 的产品导向展示与 Blog / Docs 信息架构；未复制 Paseo 的品牌、代码、用户评价、使用数据或功能宣称。

网站中具体支持范围以此版本的源码说明为准。产品能力调整后同步更新中文与英文 Markdown。

## Privacy 与支持页面（2026-10-14）

Privacy 新增内容对照本地 Ait `0f079a35` 与 ait-server `6eec893` 阅读；同步修正 Docs、首页与下载页的账户连接说明，包括 iOS 登录、Web 控制台构建及默认账户服务地址。其余首批内容仍以上述来源为基础，历史 Blog 保留发布时的描述。

| 内容 | 来源 |
| --- | --- |
| 登录身份、邮箱/手机号、Authing、会话、安全存储 | Ait `packages/client/src/account-session.ts`、`docs/operations/authing-client-login.md`；ait-server `docs/authing.md` |
| 主机元数据、中继信任边界、授权与撤销记录 | Ait `docs/decisions/clients/adr-074-account-host-relay.md`；ait-server `docs/architecture.md` |
| iOS 登录与 Web 控制台边界 | Ait `docs/operations/authing-client-login.md`、`apps/mobile/src/runtime/browser-account.web.ts`、`apps/mobile/README.md` |
| 音频、转写与可配置语音服务 | Ait `crates/voice/src/openai.rs`、移动端麦克风权限配置 |
| 通知令牌、注册与撤销 | Ait `apps/mobile/src/push-notifications/internal/subscriptions.ts`、`crates/metadata/src/push/service.rs` |
| 网站不包含分析脚本，文档使用静态搜索索引 | 本网站 `src/layouts/Base.astro`、`src/components/Search.astro`、`src/pages/[lang]/search.json.ts` |
| 商店支持与隐私链接要求 | [Apple Support URL](https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information/)、[Apple 审核说明](https://developer.apple.com/app-store/review/)、[Google Play 商店联系方式](https://support.google.com/googleplay/android-developer/answer/9859152?hl=en)、[Google Play 用户数据政策](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en) |

运营方于 2026-10-14 确认：线上账户、日志和备份没有固定保留期限，可以申请删除。中英文政策据此明确说明没有固定保留期限，并提供 `support@ait-app.com` 邮件申请入口；未承诺固定回复或删除完成期限。源码说明数据处理边界，实际删除的执行情况仍取决于服务运营。此次网站修改不实现 App 内账户删除，也不把服务端停用或软删除描述为永久删除。
