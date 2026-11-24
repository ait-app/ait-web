---
title: Agent tools and skills
description: Understand Ait MCP, the bundled orchestration skill, and provider support.
lang: en
slug: agent-tools
group: reference
order: 6.1
---

## Give agents access to Ait tools

The Ait daemon exposes workspace, agent, and schedule tools through MCP. Available tools depend on host settings, credentials, and session permissions. An agent with access can create a managed child task or leave handoff notes using `notepad_read` and `notepad_write`.

| Provider | How it gets Ait MCP |
| --- | --- |
| Codex, Claude Code, DeepSeek Harness, MiniMax Code, OpenCode, Pi | The daemon can inject it when opening a compatible interactive session. |
| Oh My Pi, Antigravity | These use the provider's own MCP configuration. Ait has no automatic injection for them. |

If tools are missing in a new session, check the daemon's MCP injection setting and check for an existing `ait` entry in the provider configuration. Then reopen the session. Changes do not restart running sessions, and read-only history does not receive tools. Use the names shown in the catalog, such as `agent_create` and `schedule_pause`. [MCP setup and external clients](https://github.com/ait-app/ait/blob/main/docs/operations/mcp.md)

## Use the bundled orchestration skill

The daemon ships the Ait orchestration skill and installs or updates the selected skills at startup. New sessions can discover them through the provider. The provider determines when existing sessions refresh. The skill provides instructions. MCP and host settings supply tools and permissions.

Start by asking an agent to identify its current workspace and available tools. See the [skill distribution guide](https://github.com/ait-app/ait/blob/main/docs/operations/agent-skills.md) for setup, updates, and disabling installation. [Workspace Bot](/en/docs/bots/) has its own permission scope.
