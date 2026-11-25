---
title: Turning a Linux server or Mac mini into an always-on agent host with aitd
description: How to run the standalone Rust daemon on a headless Linux box or Mac mini, plus the four setup snags people hit most often.
lang: en
slug: always-on-aitd-host
date: 2026-11-24
category: guide
visual: connection
---

Running every coding agent on your laptop gets old quickly: close the lid and a build stops, run three agents alongside a compiler and the fans spin up, or maybe your daily machine is Windows while the real toolchain lives on a Linux server.

If you have an idle Linux box or an always-on Apple Silicon Mac mini, the standalone `aitd` binary turns it into a persistent working host. It is the same Rust daemon bundled inside the desktop app—a single executable that needs no desktop environment and no Node.js runtime of its own (though the agents and project tools you run on the machine still need their own runtimes).

Here is the setup flow and the snags worth avoiding.

## Install `aitd` and pick how you will connect

Standalone archives are published for Linux x86_64 (glibc 2.28+, such as Ubuntu 20.04, Debian 10, or Rocky/AlmaLinux 8 and newer) and macOS Apple Silicon (macOS 13+). Grab the archive and verify it against `SHA256SUMS` using the commands in [Standalone daemon](/en/docs/daemon/), then install `aitd` to `/usr/local/bin/aitd`.

From there, you have three ways to connect:

1. **Online Service with your Ait account.** Run `aitd login` (add `--name my-server` if you do not want the system hostname), open the printed URL in any browser to enter the verification code, then run `aitd run`. Desktop (including Windows), mobile, and [Ait for Web](https://aitapp.cn/) signed into the same account will see the host automatically, with no public port forwarding.
2. **Single-use enrollment token over SSH.** If opening a browser is inconvenient, issue a one-time token from the host details page on the web and feed it to `aitd login --token-stdin` (paste, press Enter, then Ctrl-D). This works cleanly over SSH or in provisioning scripts.
3. **Direct connection without an Ait account.**
   - **Over a trusted LAN or VPN:** bind to the host’s LAN IP, such as `aitd run --listen 192.168.1.10:7316`, read the generated token from `~/.ait/local-api.token` (or pass your own 32–256 character visible ASCII token via `AIT_SERVER_TOKEN`), and restrict TCP `7316` in your firewall to your client subnet. The built-in listener does not serve TLS, so keep it off the public internet.
   - **Over an SSH tunnel:** leave `aitd` on its default `127.0.0.1:7316`, run `ssh -N -L 127.0.0.1:7316:127.0.0.1:7316 user@working-host` on your laptop, and connect the Ait client to `127.0.0.1:7316` with the remote daemon’s token.

Keep in mind that hosted [Ait for Web](https://aitapp.cn/) connects through Online Service only. If you want browser access from any computer, account sign-in is the simplest path.

## Keeping it alive: `tmux`, `systemd`, and `launchd`

`aitd run` stays in the foreground and exits as soon as your SSH session drops.

For quick testing or live log watching, `tmux` is the shortest path:

```sh
tmux new -s aitd
aitd run
```

Detach with `Ctrl-b` then `d`. It will not survive a reboot, though. For an always-on host, use a `systemd --user` unit on Linux or a LaunchAgent on macOS—ready-to-copy service files are in [Keep it running](/en/docs/daemon/#keep-it-running).

## Four snags that actually bite people

### 1. The Linux host goes offline as soon as you exit SSH

You enable `systemctl --user enable --now aitd`, everything looks online, and the moment you close SSH the host disappears. In most cases, lingering is not enabled:

```sh
sudo loginctl enable-linger "$USER"
```

Without `enable-linger`, systemd stops your user services when your last login session closes and will not start them at boot.

### 2. `claude` or `codex` works in your shell, but `aitd` cannot find it

`systemd` and `launchd` do not source `~/.bashrc` or `~/.zshrc`. If you installed agent CLIs through `nvm`, `fnm`, global npm directories, or Homebrew, they are often missing from the service’s default `PATH`. (`tmux` inherits your interactive shell environment, which is why it rarely hits this.)

Two clean fixes:
- Add the missing binary directories to `PATH` inside the systemd unit or launchd plist.
- Or set explicit absolute paths with environment variables such as `AIT_SERVER_CODEX_BIN`, `AIT_SERVER_CLAUDE_BIN`, or `AIT_SERVER_OPENCODE_BIN` (full list in [Server configuration](/en/docs/configuration/#select-provider-executables)), then restart the daemon.

### 3. Old startup scripts still pass `--headless`

If you set up an earlier build such as v0.1.20, your unit file may still say `ait-daemon run --headless`. The `--headless` flag was removed in v0.1.22, and the binary name became `aitd` in v0.1.30. Remove `--headless`, update the executable path to `/usr/local/bin/aitd`, and verify with `aitd --version` and `aitd run --help`.

### 4. Running `login` or `logout` while `aitd` is still active

Always stop the daemon using that data directory before reauthorizing or signing out, then start it again afterward. To check live authorization and runtime status at any time, run `aitd status --json`. If it reports `reauthorization_required`, stop the daemon, run `aitd login`, and restart.

On macOS, remember that a LaunchAgent starts only after that user logs in—for a headless Mac mini, enable automatic login for the account running `aitd`.

Once the host is online, you do not need SSH port forwarding just to finish the first OAuth sign-in for Codex or Claude Code. You can do it inside the workspace’s built-in browser—see [Sign in to Codex and Claude on a remote host with Ait’s built-in browser](/en/blog/browser-login-on-host/).
