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

Download the appropriate file from the [official Ait release](https://github.com/ait-app/ait/releases/latest). On macOS, open the DMG, install Ait, and launch it. On Linux, extract and run the distribution package or use the AppImage. Releases include `SHA256SUMS` for checking downloaded files. Arch Linux users can also install `ait-bin` or `ait-git` from the AUR; see [Platform support](/en/docs/platforms/).

The desktop package includes the Rust daemon. The desktop app starts it for you, so a separate Ait server installation is not required.

## Bring an agent

Ait does not include a model subscription. Before starting, install and sign in to at least one supported agent CLI on the working host, such as Claude Code, Codex, or OpenCode.

If you already use these tools in your terminal, keep your existing sign-in. Ait also supports DeepSeek Harness and Antigravity CLI. Available models and permissions depend on the version installed on the working computer. See [Agent setup](/en/docs/providers/) for setup and differences between the integrations.

## Start your first workspace

1. Open Ait and connect to the local service.
2. Add an existing project by selecting its directory.
3. Create a workspace and choose an available agent.
4. Describe your task and follow the progress in the conversation.
5. Inspect files and diffs, then run your project’s verification commands in the terminal.

Read [Workspaces](/en/docs/workspaces/) for project organization and Git worktrees.

## Connect another device

Desktop, Android, and iOS can sign in to the same account and select the working computer through account relay. Web users can sign in at [aitapp.cn](https://aitapp.cn/) and open the client. Keep the computer awake with its Ait service and agents available.

- Android: request Google Play closed-test access, then open the [opt-in link](https://play.google.com/apps/testing/dev.ait.mobile).
- iPhone / iPad: join through the [public TestFlight invitation](https://testflight.apple.com/join/fjc7g46u), without an email request first.
- Linux/macOS without a desktop environment: install and authorize the [standalone daemon](/en/docs/daemon/).

Google Play eligibility uses your Google account; signing in inside the app uses your Ait account. They serve different purposes. See [Platform support](/en/docs/platforms/) for store eligibility and installation steps.

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
