---
title: Agent 接入
description: 配置 Codex、Claude Code、OpenCode、DeepSeek Harness 和 Antigravity，复用原生登录与模型设置。
lang: zh
slug: providers
group: start
order: 3
---

先在运行 Agent 的工作电脑上安装并认证所需工具，再在 Ait 新建会话时选择它。手机和网页连接这台电脑，无需在手机上安装 Agent CLI。Ait 不提供模型订阅；模型、额度和费用由你配置的服务决定。

## Codex

Ait 使用本机的 `codex app-server`。先确认 Codex 可以在工作电脑的终端独立运行，并完成原生登录。创建会话时，模型、推理等级、权限和其他选项以 Ait 从本机 Codex 读取的目录为准。

Codex 的指令、技能、工具、认证与原生会话仍由 Codex 管理。版本相关能力以当前 CLI 实际提供的选项为准；不要把其他 Agent 的文件回退能力套用到 Codex。

## Claude Code

在工作电脑安装 Claude Code 后，检查登录状态：

```sh
claude --version
claude auth login
claude auth status
```

在 Ait 选择 **Claude Code**。默认使用原生 `default` 审批模式；可用模型、推理等级与模式来自本机 CLI。工具审批和 Claude 的提问会显示在会话中。

Claude Code 保留自己的认证，并加载用户、项目和本地设置，包括 `CLAUDE.md`、技能和 MCP。Ait 支持图片与文本附件、会话恢复及原生检查点回退；文件回退只涵盖 Claude 检查点跟踪的文件。详情见 [Claude Code 手册](https://github.com/ait-app/ait/blob/main/docs/operations/claude-code.md)。

## OpenCode

在工作电脑安装、配置并登录 `opencode`。Ait 通过官方 **`opencode acp`** 连接，模型、推理选项与模式从当前项目的原生目录读取，包括该安装实际提供的 Build、Plan 或自定义主 Agent。

支持文本对话、工具进度、原生权限审批、取消和会话恢复；已有原生会话的列举与导入、图片输入、提问表单取决于安装版本提供的 ACP 能力。原生支持时，审批可以包含一次性允许、持久允许或拒绝。较旧 CLI 不一定提供所有选项。

OpenCode 继续管理认证、项目配置和历史。项目中已有的 MCP 设置由 OpenCode 加载；Ait 不提供每个会话动态注入 MCP server 或 OpenCode 原生 rewind。目录加载失败时，先查看应用诊断与 CLI 状态，再刷新 Provider；首次启动可能需要等待原生目录初始化。

协议和版本差异见 [OpenCode ACP 接入说明](https://github.com/ait-app/ait/blob/main/docs/decisions/providers/adr-115-opencode-acp-provider.md)。

## DeepSeek Harness

先安装并配置 DeepSeek Harness，使 `dsh` 能在工作电脑运行。Ait 优先发现 CLI，也能识别包含 CLI 的受支持 DSH 桌面安装包。安装或升级后，重启 Ait daemon 重新发现。

默认使用 **web profile 的原生交互 Host**。模型与推理选项从本机配置读取；情景模式来自该 profile 的插件预设，权限预设单独选择。支持对话、附件、原生能力允许的图片、审批、提问、恢复与已有会话导入。

桌面 profile 中的插件不会自动复制到 web profile。需要其他已配置 Web Host 的 profile 时，在启动 daemon 前设置：

```sh
export AIT_SERVER_DEEPSEEK_HARNESS_PROFILE=team-web
```

MCP 和插件在 DSH 对应 profile 中管理。已有原生会话被 DSH 桌面占用时，先让原程序释放写入所有权再继续；导入历史不会替你接管正在执行的会话。详情见 [DeepSeek Harness 手册](https://github.com/ait-app/ait/blob/main/docs/operations/deepseek-harness.md)。

## Antigravity CLI

Ait 使用 **AGY CLI**；只安装 Antigravity IDE 并不足够。安装 CLI 后，在工作电脑终端运行 `agy` 完成原生登录，再在 Ait 中选择 Antigravity。

模型来自 `agy models`，支持多轮文本、文本附件、工具进度、用量与 conversation 恢复。默认保留本机权限；原生 headless 接口没有交互审批回传，需要询问的工具可能直接被拒绝。按任务需要配置 AGY 的原生权限，Ait 不会自动改写全局规则。

当前未接入图片输入、运行中追加指导、完整原生历史导入或 rewind。安装、权限与诊断说明见 [Antigravity CLI 手册](https://github.com/ait-app/ait/blob/main/docs/operations/antigravity.md)。

## 指定程序路径

桌面进程找不到 CLI，或需要使用非标准安装时，在启动 daemon 或开发入口前设置对应变量。只设置你需要的项，并替换为真实的可执行文件路径：

```sh
export AIT_SERVER_CODEX_BIN=/absolute/path/to/codex
export AIT_SERVER_CLAUDE_BIN=/absolute/path/to/claude
export AIT_SERVER_OPENCODE_BIN=/absolute/path/to/opencode
export AIT_SERVER_DEEPSEEK_HARNESS_BIN=/absolute/path/to/dsh
export AIT_SERVER_ANTIGRAVITY_BIN=/absolute/path/to/agy
```

这些变量选择程序，不保存模型服务凭据。修改后重启对应 daemon；只重开网页或手机页面不会改变工作主机的启动环境。

## 选择合适的 Provider

新建或继续会话前，检查当前工作主机返回的模型、模式与权限。每个 Provider 的能力由原生程序和 Ait 适配器共同决定；权限模式不能替代操作系统隔离。

完成接入后，继续 [创建工作区](/zh/docs/workspaces/)。遇到不可用、登录或额度问题，查看 [常见问题与支持](/zh/docs/support/)。
