# 内容来源

## 当前文档基线（2026-10-16）

本轮对照 [Ait `main` 源码快照](https://github.com/ait-app/ait/tree/5145d3ebc8f87216c47d7e960db04dac7d37058e)校对官网全部 8 类中英文 Docs，以及相关首页、支持、隐私与下载入口。提交为 `5145d3ebc8f87216c47d7e960db04dac7d37058e`；核对时从已 fetch 的 `origin/main` 导出独立快照，未以滞后的本地主分支作为依据。

这是源码与内容一致性校对，不是所有平台的安装或端到端验收。GitHub Release、Google Play 与 TestFlight 中的已发布构建可能早于该提交；官网不能把 `main` 中的新能力等同于每个商店构建都已包含，也不能把测试入口可见写成审核已通过或安装已验证。

| 官网内容 | Ait 原始资料（上述提交） |
| --- | --- |
| 快速开始、桌面安装、开发命令 | `README.md`、根目录 `package.json`、`apps/mobile/README.md` |
| 平台连接能力、Web 客户端与账户登录 | `apps/mobile/README.md`、`docs/operations/authing-client-login.md`、`apps/mobile/src/runtime/browser-account.web.ts` |
| 默认账户 API 与旧官方地址迁移 | `packages/client/src/account-session.ts`、`apps/mobile/src/runtime/native-account.native.ts` |
| Android / iOS 后台连接窗口 | `apps/mobile/src/runtime/native-account.native.ts`（`BACKGROUND_CONNECTION_GRACE_MS`） |
| 主机中继与凭据边界 | `docs/decisions/clients/adr-074-account-host-relay.md`、`docs/decisions/clients/adr-084-ios-account-relay.md` |
| daemon 监听、配置、数据目录与 token | `docs/operations/daemon.md` |
| Linux / macOS 无人值守模式、机器授权、持久 token | `docs/operations/headless-daemon.md` |
| 外部 MCP 入口与认证 | `docs/operations/mcp.md` |
| Codex 与 Claude 原生配置、能力差异 | `docs/reports/providers/provider-parity.md`、`docs/operations/claude-code.md`、`crates/provider/src/local/` |
| OpenCode 官方 ACP、版本相关能力与冷启动 | `docs/decisions/providers/adr-115-opencode-acp-provider.md`、`crates/provider/src/local/opencode/`；不再使用旧 ADR-074 的能力列表作为当前说明 |
| DeepSeek Harness 的 Web Host、profile 与写入所有权 | `docs/operations/deepseek-harness.md` |
| Antigravity AGY CLI、权限与能力限制 | `docs/operations/antigravity.md` |
| Worktree、Git / PR 主操作、工作区定时任务 | `docs/decisions/workspace/adr-060-workspace-create-worktree.md`、`adr-084-workspace-primary-git-action.md`、`adr-138-workspace-owned-schedules.md`（后两者位于同一目录） |
| 诊断导出、本地自动证据与滚动清理 | `docs/operations/diagnostics.md` |
| BI、Logo、留白、品牌色和生产 SVG | `docs/decisions/branding/adr-051-ait-brand-identity.md`、`assets/brand/README.md`；本轮核对后无需改动品牌规范 |

## 测试、下载与服务入口

- Google Play 封测链接为 `https://play.google.com/apps/testing/dev.ait.mobile`。2026-10-16 Console 核对仍为邮箱名单准入，未配置可自行加入的 Google Group。公开文案说明先申请、获资格后使用同一 Google 账号加入；名单成员和具体人数不写进官网。
- Google Play 目标受众按运营方确认设为 18 岁及以上，地区内容分级可能更高。链接不代表全球开放，实际可用性还取决于轨道发布状态、国家/地区、账号资格和设备。
- TestFlight 公开邀请为 `https://testflight.apple.com/join/fjc7g46u`；用户无需先邮件申请。链接来自现有网站配置，本轮没有核验 App Store Connect 的外部审核、剩余名额或实际安装。
- 桌面下载使用 [GitHub 最新 Release](https://github.com/ait-app/ait/releases/latest)入口，不在长期文档中写死“最新版本号”。国内 DMG 镜像使用固定文件名 `Ait-macos-arm64.dmg`，由 ait 的 Release CI 在每次正式版发布后覆盖为最新版，页面只标注“最新正式版”。
- `https://ait-app.com` 是宣传与文档网站，`https://aitapp.cn/` 是账户与 Web 客户端入口，原生客户端默认账户 API 为 `https://aitapp.cn/api`。
- Google Play 资格与 opt-in 行为依据 [Google 官方测试说明](https://support.google.com/googleplay/android-developer/answer/9845334?hl=en)。商店审核与实机测试需要单独确认。

更改入口时，同时更新 `src/lib/site.ts`、中英文 `platforms.md`、`getting-started.md`、`support.md`、`daemon.md` 与相关界面文案；本轮已核对这些位置的一致性。

## 独立 daemon 文档（2026-10-18）

`/docs/daemon/` 对照 [ait-app/ait#362](https://github.com/ait-app/ait/pull/362) 编写；该 PR 合并并随正式版发布前，页面中的下载链接尚不可用。

| 官网内容 | Ait 原始资料 |
| --- | --- |
| 归档文件名、内含 `ait-daemon` 与 `LICENSE`、正式版与 beta 发布范围 | `scripts/release-assets.mjs`、`docs/operations/releasing.md`、`docs/decisions/clients/adr-158-standalone-daemon-release.md` |
| Linux glibc 2.28 基线 | `scripts/build-linux-daemon.sh`；本地在 Debian 10、Ubuntu 20.04、AlmaLinux 8 容器中启动验证，不等同于各发行版的完整实机验收 |
| macOS 签名与公证 | `.github/workflows/release.yml`；首次在真实 release 工作流中执行前未经验证 |
| 登录、`run --headless`、状态、重新授权与退出 | `docs/operations/headless-daemon.md`、`bins/daemon` 的 CLI 帮助 |

术语约定：**独立 daemon** 指单独发布的 `ait-daemon` 程序（获取方式）；**无人值守模式** 指 `login` 授权后以 `run --headless` 运行（运行方式），英文为 unattended mode。桌面内置的 daemon 与独立 daemon 是同一程序，但由桌面管理，不使用无人值守模式。中英文 Docs 统一使用这组用词，不再单独称作“headless 模式”。

下载表和安装命令使用不带版本号的固定链接：GitHub `releases/latest/download/Ait-daemon-<平台>.tar.gz` 与同名 COS 对象。ait 的 Release 为正式版附带这些副本并写入 `SHA256SUMS`，Release 转为正式版时 `release-mirror.yml` 覆盖 COS 同名对象，发版后官网无需修改（见 ait 的 `docs/operations/releasing.md`）。SHA256SUMS 只在 GitHub Release 提供，COS 不镜像校验文件；COS 同步完成前的几分钟内两者可能不一致。

## 历史内容与维护方式

首批三篇双语 Blog 是为本站编写的文章，不是 Ait 的版本发布记录。保留已发布文章的日期与 URL；跨端与介绍文章已添加带日期的更新提示，引导读者查看当前 Docs，避免把历史能力当成现在的限制。

设计参考 `https://paseo.sh/` 的产品展示与 Blog / Docs 信息架构；未复制其品牌、代码、用户评价、使用数据或功能宣称。Logo 始终来自 Ait 正式生产素材。

每次能力变化先核对实现及对应运维说明，再同步中英文 Markdown、搜索可见正文和相关界面文案。发生冲突时记录实际源码证据，不把过时 ADR、未执行的验收清单或计划中的功能当成已交付能力。完成后运行 `npm run check`、`npm run build`、`npm run verify` 并检查关键页面；网站检查通过不等于 Ait 产品实机验收通过。

## Privacy 与支持页面（2026-10-14）

Privacy 新增内容对照本地 Ait `0f079a35` 与 ait-server `6eec893` 阅读；同步修正 Docs、首页与下载页的账户连接说明，包括 iOS 登录、Web 控制台构建及默认账户服务地址。这是隐私政策初次补充时的来源记录；本轮产品能力校对以本页顶部的新基线为准。

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
