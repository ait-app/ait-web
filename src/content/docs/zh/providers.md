---
title: Agent 接入
description: 复用原生 CLI、现有登录与模型配置，并了解各 Provider 的能力。
lang: zh
slug: providers
group: start
order: 3
---

Ait 通过原生 Provider 适配器连接工作主机上的 Agent。Agent 的登录由各自程序管理，Ait 的连接令牌与模型服务凭据用途不同。

## Codex

Codex 接入使用本机的 `codex app-server`。请先在终端确认已经安装 Codex，并完成它自身的登录。

桌面进程找不到可执行文件时，可在启动 Ait daemon 或开发入口前设置绝对路径：

```sh
export AIT_SERVER_CODEX_BIN=/absolute/path/to/codex
```

在新建 Agent 时选择 Codex，使用界面中实际返回的可用模型与配置。

## Claude Code

在运行 daemon 的机器上安装并登录 Claude Code：

```sh
claude --version
claude auth login
claude auth status
```

新建 Agent 时选择 **Claude Code**。模型与推理等级来自本机 CLI，默认采用 `default` 审批模式。工具授权与 Claude 的提问显示在同一会话中。

Claude Code 继续保存自己的认证，默认加载用户、项目与本地设置，以及 `CLAUDE.md`、技能和 MCP 配置。无需将 API key 写入 Ait 配置。

```sh
export AIT_SERVER_CLAUDE_BIN=/absolute/path/to/claude
```

详细的附件、回退与原生会话能力见 [Claude Code 手册](https://github.com/ait-app/ait/blob/main/docs/operations/claude-code.md)。

## OpenCode

使用本机已经登录的 `opencode`。可通过下面的变量指定程序：

```sh
export AIT_SERVER_OPENCODE_BIN=/absolute/path/to/opencode
```

当前适配提供 **Build 模式、动态模型发现、文本对话、单次审批、取消与恢复**。OpenCode 认证继续由原生 CLI 管理。

当前不宣称支持 Plan、自定义 Agent、steer、附件、表单、rewind、外部会话导入、MCP 配置与后台任务。完整边界见 [OpenCode 适配决策](https://github.com/ait-app/ait/blob/main/docs/decisions/providers/adr-074-opencode-native-provider.md)。

## 选择合适的 Provider

每个 Provider 的能力由原生 CLI 和当前适配器共同决定。创建前检查可用模型与模式，不把某个 Agent 的高级功能推定为所有 Agent 的通用功能。

完成接入后，继续 [创建工作区](/zh/docs/workspaces/)。
