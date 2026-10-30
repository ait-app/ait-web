---
title: Agent setup
description: Connect Codex, Claude Code, OpenCode, DeepSeek Harness, Antigravity, Pi, Oh My Pi, and MiniMax Code with native sign-ins and configuration.
lang: en
slug: providers
group: start
order: 3
---

Install and authenticate your agents on the working computer, then select one when creating an Ait session. Phones and the Web app connect to that computer; they do not need their own agent CLI. Ait does not include a model subscription. Models, quotas, and costs depend on the services you configure.

Provider availability depends on the host daemon and native CLI versions. Current source documentation does not mean every store test build includes each capability.

## Codex

Ait uses the local `codex app-server`. Confirm that Codex runs independently in the working computer’s terminal and complete its native sign-in. Available models, reasoning levels, permissions, and other controls come from that installation.

Codex retains ownership of its instructions, skills, tools, authentication, and native sessions. Version-dependent features follow the installed CLI. Another agent’s file rewind feature does not imply that Codex supports it.

## Claude Code

After installing Claude Code on the working computer, check its sign-in:

```sh
claude --version
claude auth login
claude auth status
```

Select **Claude Code** in Ait. It uses the native `default` approval mode unless you choose another available mode. Models and reasoning levels come from the local CLI. Tool approvals and Claude’s questions appear in the conversation.

Claude Code keeps its authentication and loads user, project, and local settings, including `CLAUDE.md`, skills, and MCP. Ait supports image and text attachments, session recovery, and native checkpoint rewind. File rewind covers only files tracked by Claude’s checkpoints. See the [Claude Code manual](https://github.com/ait-app/ait/blob/main/docs/operations/claude-code.md).

## OpenCode

Install, configure, and sign in to `opencode` on the working computer. Ait connects through the official **`opencode acp`** interface. Models, reasoning options, and modes come from the current project’s native catalog, including Build, Plan, or custom primary agents when provided by that installation.

Text conversations, tool progress, native permission requests, cancellation, and recovery are supported. Native session listing and import, image input, and question forms depend on the installed version’s ACP capabilities. Permissions can include one-time approval, persistent approval, or rejection when the native request offers them. Older CLIs may not provide every option.

OpenCode manages authentication, project settings, and history. It loads the project’s native MCP configuration; Ait does not inject MCP servers dynamically per session or provide OpenCode native rewind. If catalog loading fails, check app diagnostics and the CLI, then refresh the provider. A first launch may need time to initialize the native catalog.

See the [OpenCode ACP integration](https://github.com/ait-app/ait/blob/main/docs/decisions/providers/adr-115-opencode-acp-provider.md) for protocol and version differences.

## DeepSeek Harness

Install and configure DeepSeek Harness so that `dsh` runs on the working computer. Ait looks for the CLI first and can also detect supported DSH desktop installations that include it. Restart the Ait daemon after installing or upgrading DSH.

By default, Ait uses the **native interactive Host in the web profile**. Models and reasoning options come from local configuration. Modes come from that profile’s plugin presets, with permission presets selected separately. Conversations, attachments, images allowed by native capabilities, approvals, questions, recovery, and native session import are supported.

Plugins in the desktop profile are not automatically copied into the web profile. To use another profile already configured with a Web Host, set this before starting the daemon:

```sh
export AIT_SERVER_DEEPSEEK_HARNESS_PROFILE=team-web
```

Manage MCP and plugins in the corresponding DSH profile. If the DSH desktop app owns a native session’s write lock, release it there before continuing in Ait. Importing history does not take over an active session. See the [DeepSeek Harness manual](https://github.com/ait-app/ait/blob/main/docs/operations/deepseek-harness.md).

## Antigravity CLI

Ait uses the **AGY CLI**. Installing the Antigravity IDE alone is not sufficient. After installing the CLI, run `agy` in the working computer’s terminal to complete native sign-in, then select Antigravity in Ait.

Models come from `agy models`. Multi-turn text, text attachments, tool progress, usage, and conversation recovery are supported. Local permissions are preserved by default. The native headless interface has no interactive approval callback, so tools that require a question may be denied. Configure AGY’s native permissions for your task; Ait does not automatically change global rules.

Image input, guidance during an active turn, full native history import, and rewind are not integrated. See the [Antigravity CLI manual](https://github.com/ait-app/ait/blob/main/docs/operations/antigravity.md) for installation, permissions, and diagnostics.

## Pi

Install and configure Pi on the working host, then confirm that `pi --version` and interactive `pi` work. Ait uses `pi --mode rpc` and requires Pi 1.2 or newer. The verified baseline is `@earendil-works/pi-coding-agent` 1.2.0; older 0.x RPC versions are incompatible.

Models come from Pi’s catalog with `provider/model` identifiers. Ait supports conversations, images accepted by the native model, tool progress, cancellation, session recovery, and native history discovery, import, and explicit refresh. Pi owns authentication, tools, extensions, project trust, and session files. Ait does not expose Pi mode selection or native rewind. Stop other writers before importing the same session. See the [Pi manual](https://github.com/ait-app/ait/blob/main/docs/operations/pi.md).

## Oh My Pi

Oh My Pi (`omp`) and Pi are separate providers with different installations, configuration, and sessions. Install and sign in on the working host, confirm `omp --version` works, then select **Oh My Pi** in Ait. The current documentation uses official 18.12.6 RPC v2 as its compatibility baseline.

Ait connects its ACP bridge to official `omp --mode rpc-ui`. It supports dynamic model and reasoning options, native approvals and structured questions, image and text attachments, subagent display, session import, and recovery. OMP continues to manage tools, MCP, and extensions. Native permissions are not an operating-system sandbox. See the [Oh My Pi manual](https://github.com/ait-app/ait/blob/main/docs/operations/oh-my-pi.md) for capabilities and limitations.

## MiniMax Code

Ait uses MiniMax Code’s `mcode acp`, not the `mmx` multimedia/API CLI. Follow the [MiniMax Code manual](https://github.com/ait-app/ait/blob/main/docs/operations/minimax-code.md) to prepare a supported Node.js version, install the native CLI, and run `mcode login`. Check `mcode --version`, restart the daemon, and refresh the provider catalog.

Select **MiniMax Code** to use models, thinking levels, working modes, and permissions from the signed-in native program. Ait supports text and images, streaming responses, tool progress, approvals, stopping, and Ait session recovery. External session import, rewind, and realtime voice are not available. The manual records validation with 0.7.1; select models actually available in the catalog, refreshing and reselecting when it changes.

## Select executable paths

If the desktop process cannot find a CLI, or you use a nonstandard installation, set the appropriate variable before starting the daemon or development entry. Set only the variables you need and replace each example with a real executable path:

```sh
export AIT_SERVER_CODEX_BIN=/absolute/path/to/codex
export AIT_SERVER_CLAUDE_BIN=/absolute/path/to/claude
export AIT_SERVER_OPENCODE_BIN=/absolute/path/to/opencode
export AIT_SERVER_DEEPSEEK_HARNESS_BIN=/absolute/path/to/dsh
export AIT_SERVER_ANTIGRAVITY_BIN=/absolute/path/to/agy
export AIT_SERVER_PI_BIN=/absolute/path/to/pi
export AIT_SERVER_OMP_BIN=/absolute/path/to/omp
export AIT_SERVER_MINIMAX_CODE_BIN=/absolute/path/to/mcode
```

These variables select programs; they do not store model service credentials. Restart the corresponding daemon after changing them. Reopening a browser or phone screen does not change the working host’s environment.

## Choose a provider

Check the models, modes, and permissions returned by the working host before creating or continuing a session. Each provider’s capabilities depend on both its native program and Ait’s adapter. Permission modes do not provide operating-system isolation.

Continue with [Workspaces](/en/docs/workspaces/). For availability, sign-in, or quota problems, see [Troubleshooting & support](/en/docs/support/).
