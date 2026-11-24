---
title: Docs & support
description: Get help with Ait, install the app, connect your agents, and start your first workspace.
lang: en
slug: getting-started
group: start
order: 1
---

Ait is a local-first manager for multiple agents. Agents run on your working host. A shared interface lets you manage sessions, inspect files and code changes, and verify results in a terminal.

Read [Why Ait?](/en/docs/why-ait/) to explore using multiple agents, managing several hosts, and continuing across devices. When you are ready to try it, follow the [Quick start](/en/docs/quick-start/).

## Install the desktop app

Choose your platform on the [download page](/en/download/) and download from the [official release](https://github.com/ait-app/ait/releases/latest). Releases include `SHA256SUMS` to verify downloaded files.

- **macOS Apple Silicon**: install Ait from the DMG and launch it. A ZIP is also available.
- **Arch Linux**: run `paru -S ait-bin`, or `paru -S ait-git` to build from main.
- **Debian / Ubuntu**: download the .deb and run `sudo apt install ./Ait-*-linux-amd64.deb`.
- **Fedora / RHEL**: download the .rpm and run `sudo dnf install ./Ait-*-linux-x86_64.rpm`.
- **Other Linux x86_64**: run the AppImage or extract the tar.gz. See [Linux installation and dependencies](/en/docs/platforms/#linux-x86_64).
- **Windows x64**: install the client and connect to a remote working host. The client runs without a local daemon.

The macOS and Linux desktop apps start their bundled daemon automatically.

## Bring an agent

Ait does not include a model subscription. Before starting, install and sign in to at least one supported agent CLI on the working host, such as Claude Code, Codex, OpenCode, DeepSeek Harness, Antigravity, Pi, Oh My Pi, or MiniMax Code.

If you already use these tools in your terminal, keep your existing sign-in. Available models and permissions depend on the version installed on the working computer. See [Agent setup](/en/docs/providers/) for setup and differences between the integrations.

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

## Contribute to Ait

To fix documentation, reproduce a problem, or improve code, start with [Contributing](/en/docs/contributing/) for repository responsibilities, engineering rules, validation scope, and the pull request process.

To run from source, read [Local development](/en/docs/development/): prepare Node.js 26, the pinned Rust toolchain, CMake, and system build tools, then choose desktop, Web, or mobile. Website documentation lives in the separate `ait-web` repository; the guide also covers local previews.
