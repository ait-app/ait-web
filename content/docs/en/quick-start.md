---
title: Quick start
description: Install Ait, connect an agent you know, and start your first task. Begin on your computer and pick up on another screen.
lang: en
slug: quick-start
group: quickstart
order: 0
---

Ait brings agent sessions, files, code changes, and a terminal into one workspace. Agents run on your working computer. Use Ait locally, or connect from your phone or browser. Choose how to install it below.

<div class="quick-start-paths">
  <a class="quick-start-path quick-start-path-recommended" href="#desktop-app-recommended">
    <span class="quick-start-path-label">Everyday use · Recommended</span>
    <strong>Desktop app</strong>
    <span>Install on your Mac or Linux computer and connect to the local service.</span>
    <span class="quick-start-path-action">Start on desktop <span aria-hidden="true">↗</span></span>
  </a>
  <a class="quick-start-path" href="#server--standalone-daemon">
    <span class="quick-start-path-label">Remote host</span>
    <strong>Server / standalone daemon</strong>
    <span>Run on a machine without a desktop environment and connect from another device.</span>
    <span class="quick-start-path-action">Set up your host <span aria-hidden="true">↗</span></span>
  </a>
</div>

## Before you start

Have an **Apple Silicon Mac or Linux x86_64 computer**, a project directory, and at least one agent CLI installed and authenticated. Ait supports Codex, Claude Code, OpenCode, DeepSeek Harness, and Antigravity CLI. See [Agent setup](/en/docs/providers/) for configuration details.

Ait reuses each agent’s sign-in and model configuration. It does not include a model subscription. Install agents on the host that runs your tasks; phones and browsers connect to that host.

## 1. Install Ait

### Desktop app (recommended)

Visit the [Ait download page](/en/download/) and choose the package for your computer:

- **macOS Apple Silicon**: open the DMG, install Ait in Applications, and launch it.
- **Linux x86_64**: download the AppImage or tar.gz, then run or extract and launch the appropriate package.

Open Ait and connect to the local service. The desktop app starts its bundled daemon automatically, so there is no separate service to install. **Local use does not require an Ait account.**

See [Platform support](/en/docs/platforms/) for installers, the China download mirror, and platform details. If you installed the desktop app, continue to “Connect an agent” below.

### Server / standalone daemon

If your project lives on a cloud server or an always-on host, follow the [standalone daemon guide](/en/docs/daemon/) to download, verify, and install `ait-daemon`. Then run these commands as the same system user that will run your tasks:

```sh
ait-daemon login
ait-daemon run
```

For initial authorization, the terminal displays a web address and a verification code. Open the address in a browser, sign in to your Ait account, and approve the machine. Once the daemon is running, open the [Ait Web app](https://aitapp.cn/), sign in with the same account, and select the machine from the online host list.

`run` runs in the foreground, so keep the process running. For ongoing use, configure systemd or launchd with the [background service instructions](/en/docs/daemon/#keep-it-running). Install your agent CLIs and keep the project files on this host too.

## 2. Connect an agent

1. Launch your chosen agent in a **terminal on the working host**. Confirm that it is authenticated and can handle a task on its own.
2. Return to Ait and choose that agent when creating a session. Keep using its existing native sign-in and project configuration.
3. Select the model and permission options the agent provides. Available options depend on the installed version.

You only need one agent to start. You can add sessions with other agents to the same workspace later.

> Agent missing? Confirm that its CLI is installed on the host you are connected to and works in a terminal. For a nonstandard installation, see [Executable paths](/en/docs/providers/#select-executable-paths), then restart the corresponding daemon.

## 3. Create your first workspace

1. **Add a project**: select an existing project directory on the working host.
2. **Create a workspace**: start with the existing directory. Use a [Git worktree](/en/docs/workspaces/#git-worktrees) when you need separate directories for parallel changes.
3. **Create an agent session**: choose the agent you prepared and send a task with a clear scope.

Start by getting to know the project. Try this prompt:

> Read this project and explain what it does, its main directories, and how to run it locally. Find the existing build or test commands. Do not change any files yet.

Once you see the response and tool activity, you have completed your first task. Next, ask the agent for a small change, such as correcting some copy or updating the README, and respond to any permission requests in the conversation.

After a change, inspect **files and diffs**, then run the project’s own build or test commands in the **terminal**. See [Workspaces](/en/docs/workspaces/) for more.

## 4. Continue on another device (optional)

1. On your working computer, open **Online Service → Sign in / Register**, sign in to Ait, and confirm that host sync is enabled. For an unattended daemon, the earlier `login` step already authorized the machine.
2. Open Ait on another device, sign in with the **same account and service**, and choose your working computer from the online host list.
3. Open the same workspace to follow progress, send messages, or respond to approvals.

Choose a connecting device:

- **Browser**: open the [Ait Web app](https://aitapp.cn/). No client installation required.
- **iPhone / iPad**: follow the [TestFlight steps](/en/docs/platforms/#iphone-and-ipad) to accept the public invitation and install Ait.
- **Android**: follow the [Google Play testing steps](/en/docs/platforms/#google-play-closed-testing) to request access first, then install with the approved Google account.
- **Another computer**: install the desktop app, sign in to the same Ait account, and select the online host.

Keep the working host awake, with its Ait service and agents available. Account relay does not require the devices to share a local network or the host to have public port forwarding. See [Connections & data](/en/docs/connection/) for details.

## Next steps

- [Why Ait?](/en/docs/why-ait/): explore working with multiple agents, managing several hosts, and continuing across devices.
- [Workspaces](/en/docs/workspaces/): organize sessions, isolate parallel tasks, review changes, and commit.
- [Agent setup](/en/docs/providers/): configure more agents and explore their model and permission options.
- [Connections & data](/en/docs/connection/): understand remote access and where data lives.
- [Troubleshooting & support](/en/docs/support/): resolve installation, sign-in, or host connection issues, or contact [support@ait-app.com](mailto:support@ait-app.com).
