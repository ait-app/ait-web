---
title: 参与贡献
description: 从文档、问题复现或代码改进开始，了解 Ait 的仓库分工、工程规范、验证范围与 Pull Request 流程。
lang: zh
slug: contributing
group: development
order: 7
---

你可以通过修正文档、补充翻译、复现问题、改进界面或适配 Agent 参与 Ait。第一次贡献可以从一个能独立验证的小改动开始。

## 选择仓库与任务

| 想改进的内容                                             | 仓库与入口                                            |
| -------------------------------------------------------- | ----------------------------------------------------- |
| daemon、Agent 适配、桌面、移动端、Agent Web 客户端和 SDK | [ait-app/ait](https://github.com/ait-app/ait)         |
| 官网、使用文档、中英文内容和下载入口                     | [ait-app/ait-web](https://github.com/ait-app/ait-web) |

先搜索已有 [Ait Issues](https://github.com/ait-app/ait/issues) 和 [Pull Requests](https://github.com/ait-app/ait/pulls)，避免重复工作。较大的功能或架构调整，建议先在 Issue 中说明使用场景、预期行为与改动范围；小的文档修正可以直接提交 PR。

报告问题时提供版本、平台、复现步骤、预期和实际结果，以及经过检查的相关日志。具体清单见[常见问题与支持](/zh/docs/support/)。公开 Issue 中不要附上令牌、账号密码或私人项目文件。

## 准备开发环境

没有仓库写权限时，先在 GitHub Fork 对应仓库，再克隆自己的 Fork 并创建任务分支。已有本地仓库时，从最新的主分支创建分支，例如：

```sh
git switch -c docs/improve-development-guide
```

环境依赖、桌面与 Web 的启动命令、移动端联调和官网预览见[本地开发](/zh/docs/development/)。Ait 使用根目录 npm workspace 安装依赖；Rust daemon 使用根 Cargo workspace 构建。

## 找到代码归属

| 路径                                                                                     | 负责的内容                                                   |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `bins/daemon`                                                                            | 程序入口、宿主生命周期、鉴权与能力组装                       |
| `crates/domain`、`crates/model`                                                          | 领域值与不变量、共享协作端口和协议资源                       |
| `crates/provider`                                                                        | 原生 Agent 适配、会话执行、历史和技能安装                    |
| `crates/metadata`、`crates/filesystem`                                                   | 项目和工作区生命周期；文件、Git、Forge 与本地 worktree 适配  |
| `crates/terminal`、`crates/voice`、`crates/schedule`、`crates/bot`                       | 终端、语音、调度与 Bot 能力                                  |
| `crates/persistence`、`crates/api`、`crates/relay`、`crates/host-link`、`crates/browser` | 持久化、API、在线传输、主机授权与浏览器服务                  |
| `apps/mobile`                                                                            | Expo / React Native 共享界面，供手机、浏览器和 Electron 使用 |
| `apps/desktop`                                                                           | Electron 主进程、桌面集成和打包                              |
| `packages/protocol`、`packages/client`                                                   | 仓库内协议、SDK 和账户会话逻辑                               |
| `docs`                                                                                   | 当前架构、ADR、操作指南、工程规范和验证记录                  |

共享界面改动通常从 `apps/mobile` 开始；桌面窗口或系统集成从 `apps/desktop` 开始。Agent 原生行为在 `crates/provider` 中维护，不要把适配器逻辑放进 daemon。更完整的职责与允许依赖见[当前架构](https://github.com/ait-app/ait/blob/main/docs/architecture/README.md)。

## 遵循工程规范

开始改动前阅读 [AGENTS.md](https://github.com/ait-app/ait/blob/main/AGENTS.md)。每次 Rust 改动，包括测试和重构，都先阅读 [Rust 规范](https://github.com/ait-app/ait/blob/main/docs/policy/rust.md)。

- Rust 是服务端的固定实现语言，保持根 Cargo workspace 可构建。依赖向内，适配器实现端口，由应用协调领域行为。
- Rust 新行为需要相应测试；单元测试放在独立子文件，由父模块声明，不能内联堆在生产文件中。
- Provider 行为测试放在 `crates/provider`、靠近所属适配器或服务；daemon 测试覆盖宿主生命周期、传输和跨能力集成，见 [ADR-179](https://github.com/ait-app/ait/blob/main/docs/decisions/providers/adr-179-provider-owned-tests.md)。
- 变更长期边界前阅读 [docs/README.md](https://github.com/ait-app/ait/blob/main/docs/README.md)，记录 ADR，并更新文档索引。文档分类与维护流程见[文档规范](https://github.com/ait-app/ait/blob/main/docs/policy/documentation.md)。
- 不提交凭据、Provider token、本地 SQLite 数据库或运行产物；保留第三方许可证与来源声明。

## 按改动范围验证

以下命令均在 **Ait 产品仓库根目录**运行。选择与本次改动有关的检查，并把实际命令和结果写入 PR。

| 改动                 | 验证入口                                                                               |
| -------------------- | -------------------------------------------------------------------------------------- |
| 文档、文件路径或链接 | `npm run check:docs`、`npm run check:format`                                           |
| Rust                 | `cargo fmt --all --check`；针对受影响 crate 运行 Clippy 和定向测试                     |
| 共享界面或 Electron  | `npm run build:ui-deps`、`npm run check:ui`，以及受影响 workspace 的类型检查和定向测试 |
| 协议与 SDK           | `npm run build:sdk`、`npm run verify:local-packages`，以及受影响包的测试               |
| 官网 `ait-web`       | 在官网仓库运行 `npm run check`、`npm run build`、`npm run verify`                      |

Rust 定向验证示例，实际选择要与改动对应：

```sh
# 修改 Provider 时检查该 crate
cargo clippy --locked -p provider --all-targets -- -D warnings
# 修改 MiniMax Code 适配时运行其离线测试
cargo test --locked -p provider --lib local::minimax
# 修改 daemon 配置时运行对应测试
cargo test --locked -p daemon --bin daemon config::
```

客户端示例：

```sh
npm run typecheck --workspace=@ait/mobile
npm run test --workspace=@ait/mobile -- src/runtime/host-runtime.test.ts
```

仅运行改动代码及直接相关行为的测试。没有修改 `bins/` 或 `crates/` 中的 Rust 代码时，除非明确要求，否则跳过 Rust 测试；提交或更新 PR 不代表需要运行全 Rust workspace 测试或全量覆盖率。完整 CI 检查由[工作流配置](https://github.com/ait-app/ait/blob/main/.github/workflows/ci.yml)定义。

真实 Provider 测试可能调用模型或使用本机认证。先阅读对应操作指南，区分离线测试与需要显式启用的真实测试。覆盖率没有测量时说明原因，不把测试通过数量当成覆盖率；纯文档改动可写明不适用，没有 Rust 行为变化。

## 提交 Pull Request

1. 检查 diff，确保只包含本次改动和必要文档，没有本地运行数据或凭据。
2. 使用清楚描述改动的提交信息，将分支推送到自己的 Fork 或有权限的远端。
3. 向对应仓库的 `main` 创建 PR，关联相关 Issue，说明具体问题、改动后的行为与验证结果。
4. 界面改动附上截图或操作记录；写明未验证的平台、真实 Provider 或其他限制。
5. 根据审查意见更新同一分支，并重跑受影响的检查。长期边界变化一并提交 ADR 与索引更新。

## 改进官网文档

本站每篇文档底部的编辑入口指向 `ait-web/content/docs/{zh,en}/`。新增页面时同时维护中英文 Markdown，使用一致的文件名和 `slug`；站内链接使用对应语言前缀。分组、排序、页内目录和搜索来自文档内容与 frontmatter。

产品能力先对照 Ait 当前文档与实现，再更新网站，并在 [docs/content-sources.md](https://github.com/ait-app/ait-web/blob/main/docs/content-sources.md)记录提交和核验范围。源码已实现、测试通过与商店版本已发布是不同状态，说明时应区分。官网构建检查会验证中英文完整性、站内链接、锚点、搜索与 sitemap。

Ait 使用 [Apache License 2.0](https://github.com/ait-app/ait/blob/main/LICENSE)。提交贡献时保留原有版权、许可证与[第三方来源说明](https://github.com/ait-app/ait/blob/main/paseo/README.md)。
