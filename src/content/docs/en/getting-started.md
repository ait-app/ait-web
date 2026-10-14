---
title: Docs & support
description: Get help with Ait, install the app, connect your agents, and start your first workspace.
lang: en
slug: getting-started
group: start
order: 1
---

Ait is a local-first manager for multiple agents. Agents run on your working host. A shared interface lets you manage sessions, inspect files and code changes, and verify results in a terminal.

## Install the desktop app

Choose your platform on the [download page](/en/download/). Official desktop releases currently provide installers for **Apple Silicon macOS** and **Linux x86_64**.

Download the appropriate file from the [official Ait release](https://github.com/ait-app/ait/releases/latest). On macOS, open the DMG, install Ait, and launch it. On Linux, extract and run the distribution package or use the AppImage. Releases include `SHA256SUMS` for checking downloaded files.

The desktop package includes the Rust daemon. The desktop app starts it for you, so a separate Ait server installation is not required.

## Bring an agent

Ait does not include a model subscription. Before starting, install and sign in to at least one supported agent CLI on the working host, such as Claude Code, Codex, or OpenCode.

If you already use these tools in your terminal, keep your existing sign-in. Model access, subscriptions, and costs are managed by the respective providers. See [Agent setup](/en/docs/providers/) for the capabilities of each adapter.

## Start your first workspace

1. Open Ait and connect to the local service.
2. Add an existing project by selecting its directory.
3. Create a workspace and choose an available agent.
4. Describe your task and follow the progress in the conversation.
5. Inspect files and diffs, then run your project’s verification commands in the terminal.

Read [Workspaces](/en/docs/workspaces/) for project organization and Git worktrees.

## Connect another device

Desktop, Android, and iOS can sign in to the same account and select the working computer from the online host list. The Web client built into the account console uses that console’s online service; the local development Web client uses direct connections. Connection capabilities differ by platform and build.

Read [Connections & data](/en/docs/connection/) and [Platform support](/en/docs/platforms/) to choose a connection method.

## Run from source

Local development requires Git, Node.js, and the Rust toolchain specified by the Ait repository. Run:

```sh
git clone https://github.com/ait-app/ait.git
cd ait
npm ci
npm run dev:desktop
```

The desktop development entry builds the shared packages, daemon, and Electron main process, then starts the app. See [Platform support](/en/docs/platforms/) for Web development commands.
