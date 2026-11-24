---
title: Agent 工具与 Skill
description: 了解 Ait MCP、内置编排 Skill 与各 Provider 的接入边界。
lang: zh
slug: agent-tools
group: reference
order: 6.1
---

## 让 Agent 使用 Ait 工具

Ait daemon 通过 MCP 向兼容会话提供工作区、Agent 和定时任务等工具。工具是否可用取决于主机配置、调用凭据和会话权限。例如，具备相应权限的 Agent 可以创建受管子任务，或通过 `notepad_read` / `notepad_write` 为同一工作区记录交接信息。

| Provider | Ait MCP 配置方式 |
| --- | --- |
| Codex、Claude Code、DeepSeek Harness、MiniMax Code、OpenCode、Pi | 在兼容的交互会话打开时可由 daemon 注入。 |
| Oh My Pi、Antigravity | 没有 Ait 自动注入，沿用 Provider 自己的 MCP 配置。 |

若新会话看不到工具，确认 daemon 的 MCP 注入设置，检查 Provider 原生配置中是否已有同名 `ait` 项，然后重新打开会话。修改设置不会重建正在运行的会话，只读历史也不会注入。用工具目录中显示的名称，例如 `agent_create`、`schedule_pause`。外部客户端的设置和认证见 [MCP 手册](https://github.com/ait-app/ait/blob/main/docs/operations/mcp.md)。

## 使用内置编排 Skill

daemon 随包提供 Ait 编排 Skill，并在启动时安装或更新已选项。新会话可通过 Provider 的原生 Skill 发现机制加载它。已有会话是否刷新由 Provider 决定。Skill 提供操作指引，实际工具和权限仍由 MCP 与主机配置决定。

先用一个小任务验证，例如让 Agent 列出当前工作区并说明可用的工具。设置、更新和停用方式见 [Skill 分发手册](https://github.com/ait-app/ait/blob/main/docs/operations/agent-skills.md)。Bot 使用受限权限，详见[工作区 Bot](/zh/docs/bots/)。
