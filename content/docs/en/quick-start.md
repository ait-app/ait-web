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

Have an **Apple Silicon Mac or Linux x86_64 computer** as the working host, a project directory, and at least one agent CLI installed and authenticated. Ait supports Codex, Claude Code, OpenCode, DeepSeek Harness, Antigravity CLI, Pi, Oh My Pi, and MiniMax Code. See [Agent setup](/en/docs/providers/) for configuration details. The Windows x64 desktop app is a remote client; install agents on the working host.

Ait reuses each agent’s sign-in and model configuration. It does not include a model subscription. Install agents on the host that runs your tasks; phones and browsers connect to that host.

## 1. Install Ait

### Desktop app (recommended)

Choose an installer on the [Ait download page](/en/download/):

- **macOS Apple Silicon**: open the DMG, drag Ait into Applications, and launch it. A ZIP is also available.
- **Arch Linux**: install the stable release (or substitute `ait-git` to build from main)

  ```sh
  paru -S ait-bin
  ```
- **Debian / Ubuntu**: Download the .deb and run

  ```sh
  sudo apt install ./Ait-*-linux-amd64.deb
  ```

- **Fedora / RHEL**: Download the .rpm and run

  ```sh
  sudo dnf install ./Ait-*-linux-x86_64.rpm
  ```

- **Other Linux x86_64**: run the AppImage or extract the tar.gz. For sandboxed worktrees, set up `bubblewrap >= 0.8.0` and unprivileged user namespaces as described in [Platform support](/en/docs/platforms/#linux-x86_64).
- **Windows x64**: install the remote client and access the working host through Online Service, Direct connection, or Remote SSH.

On macOS and Linux, opening Ait starts the bundled daemon. Local use requires no Ait account. Continue to “Connect an agent” below.

### Server / standalone daemon

Follow the [standalone daemon guide](/en/docs/daemon/) to download, verify, and install `aitd` on a headless Linux host or an always-on Apple Silicon Mac. Set up your agent CLI and project files there, then choose [Online Service](#connect-with-online-service) or [direct connection over LAN](#connect-directly-over-lan) below.

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

### Connect with Online Service

- **Desktop working host**: open **Online Service → Sign in / Register**, sign in, and confirm that host sync is enabled.
- **Headless host**: run these commands as the system user that will run your agents. For first-time authorization, open the URL displayed in the terminal on any device, enter the verification code, and approve the host.

```sh
aitd login
aitd run
```

If you have a single-use enrollment token, replace the first command with the following to supply the token on standard input:

```sh
aitd login --token-stdin
```

Follow the [background service instructions](/en/docs/daemon/#keep-it-running) to keep the daemon running with tmux or systemd.

On another desktop, Android, iOS, or [Ait for Web](https://aitapp.cn/), sign in with the **same account and service**. Select the working host from the online host list and keep the host and daemon online. Online Service works across networks without public port forwarding.

### Connect directly over LAN

- **Desktop working host**: open Ait on macOS or Linux for local use without signing in. To accept direct connections from other devices on your LAN, open **Daemon** in the local host’s settings, set the host’s LAN address and a fixed port (such as `7316`), and restart the daemon.
- **Headless host**: standalone `aitd` listens on `127.0.0.1:7316` by default. Start it without signing in and bind a trusted LAN interface (replace the example IP with your host’s address):

```sh
aitd run --listen 192.168.1.10:7316
```

Read the access token from `<data-dir>/local-api.token`, or use the value set in `AIT_SERVER_TOKEN` at startup. Allow the TCP port from the trusted subnet only. In the desktop or mobile app, choose **Add host → Direct connection** and enter the host IP, port, and server token. Ait for Web connects through Online Service only.

See [Connections & data](/en/docs/connection/#direct-connections) for firewall details and SSH tunneling.

### Install on mobile

- **iPhone / iPad**: follow the [TestFlight steps](/en/docs/platforms/#iphone-and-ipad) to accept the public invitation and install Ait.
- **Android**: follow the [Google Play closed testing steps](/en/docs/platforms/#google-play-closed-testing) to request access and install with the approved Google account.

## Next steps

- [Why Ait?](/en/docs/why-ait/): explore working with multiple agents, managing several hosts, and continuing across devices.
- [Workspaces](/en/docs/workspaces/): organize sessions, isolate parallel tasks, review changes, and commit.
- [Agent setup](/en/docs/providers/): configure more agents and explore their model and permission options.
- [Connections & data](/en/docs/connection/): understand remote access and where data lives.
- [Troubleshooting & support](/en/docs/support/): resolve installation, sign-in, or host connection issues, or contact [support@ait-app.com](mailto:support@ait-app.com).
- [Task board](/en/docs/task-board/) brings running agents, approvals, and results into one view.
- [Agent sessions](/en/docs/sessions/) covers side questions, session recovery, and timeline export.
