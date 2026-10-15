---
title: Agent setup
description: Bring native CLIs, existing sign-ins, and model settings, with clear provider boundaries.
lang: en
slug: providers
group: start
order: 3
---

Ait connects to agents installed on the working host through native provider adapters. Each agent manages its own sign-in. Ait connection tokens and model service credentials serve different purposes.

## Codex

The Codex integration uses the local `codex app-server`. Confirm that Codex is installed and signed in through its own CLI before using it in Ait.

If the desktop process cannot find the executable, set an absolute path before starting the daemon or development entry:

```sh
export AIT_SERVER_CODEX_BIN=/absolute/path/to/codex
```

Choose Codex when creating an agent and use the available models and settings returned by the interface.

## Claude Code

Install and sign in to Claude Code on the machine running the daemon:

```sh
claude --version
claude auth login
claude auth status
```

Select **Claude Code** when creating an agent. Models and reasoning levels come from the local CLI. The default approval mode is `default`; tool approvals and Claude’s questions appear in the conversation.

Claude Code keeps its own authentication and loads user, project, and local settings, including `CLAUDE.md`, skills, and MCP configuration. You do not need to put an API key in the Ait configuration.

```sh
export AIT_SERVER_CLAUDE_BIN=/absolute/path/to/claude
```

Read the [Claude Code manual](https://github.com/ait-app/ait/blob/main/docs/operations/claude-code.md) for attachments, rewind, and native session behavior.

## OpenCode

Use a locally installed, signed-in `opencode`. Override the executable path with:

```sh
export AIT_SERVER_OPENCODE_BIN=/absolute/path/to/opencode
```

The current adapter provides **Build mode, dynamic model discovery, text conversations, one-time approvals, cancellation, and recovery**. Authentication stays with the native CLI.

Plan mode, custom agents, steer, attachments, forms, rewind, external session import, MCP configuration, and background tasks are not claimed as supported. See the [OpenCode adapter decision](https://github.com/ait-app/ait/blob/main/docs/decisions/providers/adr-074-opencode-native-provider.md) for full boundaries.

## Choose a provider

Each provider’s capabilities depend on its native CLI and the current adapter. Check available models and modes before creating a session. One agent’s advanced features are not automatically shared by all agents.

Once an agent is ready, [create a workspace](/en/docs/workspaces/).
