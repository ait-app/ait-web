---
title: Standalone daemon
description: Download, verify, and install the separately released ait-daemon, then run it in unattended mode to connect a Linux or macOS host without a desktop to your Ait account.
lang: en
slug: daemon
group: reference
order: 5.5
---

Every Ait stable release includes standalone daemon archives containing a single executable, `ait-daemon`. Use it on hosts that do not need a desktop interface, such as cloud servers, build machines, or an always-on Mac mini. Once it runs in unattended mode and signs in to your Ait account, the host appears in the online host list, and you can connect to it from the desktop, Android, iOS, or Web clients.

This page uses two terms:

- **Standalone daemon** is how you get it: the `ait-daemon` program, downloaded separately instead of installed with the desktop app. It is the same program the desktop app bundles.
- **Unattended mode** (headless) is how it runs: authorize the machine with `ait-daemon login`, then start it with `ait-daemon run --headless`. The daemon stays online through account relay without anyone at the machine and reconnects automatically after restarts.

Hosts without a desktop usually combine the two, and this page describes that setup. The standalone daemon can also start in ordinary mode without `--headless`; it then needs `AIT_SERVER_TOKEN` and supports direct connections only. See [Server configuration](/en/docs/configuration/).

Computers with the desktop app do not need it. The desktop app includes the daemon, manages its lifecycle, and does not use unattended mode.

## Requirements

| Platform | Archive | Requirements |
| --- | --- | --- |
| Linux x86_64 | `daemon-linux-x64` | glibc 2.28 or later, such as Ubuntu 20.04, Debian 10, RHEL / Rocky / AlmaLinux 8, or newer |
| macOS Apple Silicon | `daemon-macos-arm64` | macOS 13 or later; the executable is signed and notarized by Apple |

You also need:

- An Ait account. Use the same account on the clients that connect to this host.
- At least one agent CLI installed and signed in on this host. See [Agent setup](/en/docs/providers/).

## Download (v0.1.8)

| Platform | GitHub release | China download mirror |
| --- | --- | --- |
| Linux x86_64 | [Ait-0.1.8-daemon-linux-x64.tar.gz](https://github.com/ait-app/ait/releases/download/v0.1.8/Ait-0.1.8-daemon-linux-x64.tar.gz) | [COS download](https://ait-release-1251719274.cos.ap-shanghai.myqcloud.com/Ait-0.1.8-daemon-linux-x64.tar.gz) |
| macOS Apple Silicon | [Ait-0.1.8-daemon-macos-arm64.tar.gz](https://github.com/ait-app/ait/releases/download/v0.1.8/Ait-0.1.8-daemon-macos-arm64.tar.gz) | [COS download](https://ait-release-1251719274.cos.ap-shanghai.myqcloud.com/Ait-0.1.8-daemon-macos-arm64.tar.gz) |

Both locations serve identical files. The `SHA256SUMS` checksum file is published only on the [GitHub release](https://github.com/ait-app/ait/releases/tag/v0.1.8). Archives for other versions use the same names on [all releases](https://github.com/ait-app/ait/releases).

## Install

These commands download the archive from GitHub, verify its checksum, and install `ait-daemon` to `/usr/local/bin`. In mainland China, you can replace the first `curl` URL with `https://ait-release-1251719274.cos.ap-shanghai.myqcloud.com/${ASSET}`.

### Linux

```sh
VERSION=0.1.8
ASSET="Ait-${VERSION}-daemon-linux-x64.tar.gz"
curl -fLO "https://github.com/ait-app/ait/releases/download/v${VERSION}/${ASSET}"
curl -fLO "https://github.com/ait-app/ait/releases/download/v${VERSION}/SHA256SUMS"
grep -F "  ${ASSET}" SHA256SUMS | sha256sum -c -
tar -xzf "${ASSET}"
sudo install -m 0755 ait-daemon /usr/local/bin/ait-daemon
ait-daemon --version
```

### macOS

```sh
VERSION=0.1.8
ASSET="Ait-${VERSION}-daemon-macos-arm64.tar.gz"
curl -fLO "https://github.com/ait-app/ait/releases/download/v${VERSION}/${ASSET}"
curl -fLO "https://github.com/ait-app/ait/releases/download/v${VERSION}/SHA256SUMS"
grep -F "  ${ASSET}" SHA256SUMS | shasum -a 256 -c -
tar -xzf "${ASSET}"
sudo mkdir -p /usr/local/bin
sudo install -m 0755 ait-daemon /usr/local/bin/ait-daemon
ait-daemon --version
```

A successful check prints `OK`. If it prints nothing or reports `FAILED`, delete the downloaded files and download them again before installing.

`ait-daemon --help` shows the program name as `daemon`; it is the same program.

## Run in unattended mode

Authorize this machine first, then start the daemon in unattended mode. Run these commands as the same system user that will run the daemon:

```sh
ait-daemon login
ait-daemon run --headless
```

`login` prints a web address and a verification code. Open the address in a browser on any device, sign in to your Ait account, enter the code, and confirm this machine.

The online host list uses the system hostname as this machine's name by default. To use a different name, add `--name` when signing in, for example `ait-daemon login --name my-server`.

After authorization, `run --headless` connects to the official account service at `https://aitapp.cn/api` and listens locally on `127.0.0.1:7316`. Later restarts restore the authorization without signing in again. Sign in to the same account on another device and choose this host from the online host list; see [Connections & data](/en/docs/connection/).

If opening a browser is inconvenient, issue a single-use enrollment token from the host details page on the web, then sign in through standard input:

```sh
ait-daemon login --token-stdin
```

Check authorization and runtime status:

```sh
ait-daemon status --json
```

The default data directory is `~/.ait-server`. It holds the machine authorization, the local API token, and work data. See [Server configuration](/en/docs/configuration/) for the listen address, data directory, and other options.

## Keep it running

`ait-daemon run --headless` runs in the foreground and exits when you close the terminal or the SSH connection drops.

### Recommended: run it in tmux

tmux is the simplest option. The daemon keeps working after you disconnect, and you can return to the session to read its logs:

```sh
tmux new -s ait-daemon
ait-daemon run --headless
```

Press `Ctrl-b`, then `d`, to detach; the daemon keeps running. Reattach later with `tmux attach -t ait-daemon`, and press `Ctrl-c` in the session to stop it. If tmux is not installed, use your distribution's package manager on Linux (for example, `sudo apt install tmux`) or `brew install tmux` on macOS.

tmux sessions do not survive a host restart. To start the daemon automatically at boot, use systemd or launchd instead.

### Persistent start: systemd on Linux

Create a systemd user service as the same user that completed `login`:

```sh
mkdir -p ~/.config/systemd/user
cat > ~/.config/systemd/user/ait-daemon.service <<'EOF'
[Unit]
Description=Ait daemon

[Service]
ExecStart=/usr/local/bin/ait-daemon run --headless
Restart=on-failure
RestartSec=5
Environment=PATH=%h/.local/bin:/usr/local/bin:/usr/bin:/bin

[Install]
WantedBy=default.target
EOF
systemctl --user daemon-reload
systemctl --user enable --now ait-daemon
sudo loginctl enable-linger "$USER"
```

`enable-linger` starts the service at boot even when the user is not logged in. Follow its logs with `journalctl --user -u ait-daemon -f`.

### Persistent start: launchd on macOS

Create a LaunchAgent as the same user that completed `login`:

```sh
mkdir -p ~/Library/LaunchAgents ~/Library/Logs
cat > ~/Library/LaunchAgents/com.ait-app.daemon.plist <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>com.ait-app.daemon</string>
  <key>ProgramArguments</key>
  <array>
    <string>/usr/local/bin/ait-daemon</string>
    <string>run</string>
    <string>--headless</string>
  </array>
  <key>EnvironmentVariables</key>
  <dict>
    <key>PATH</key><string>$HOME/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin</string>
  </dict>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><true/>
  <key>StandardOutPath</key><string>$HOME/Library/Logs/ait-daemon.log</string>
  <key>StandardErrorPath</key><string>$HOME/Library/Logs/ait-daemon.log</string>
</dict>
</plist>
EOF
launchctl bootstrap "gui/$(id -u)" ~/Library/LaunchAgents/com.ait-app.daemon.plist
```

A LaunchAgent runs after its user logs in. To keep a Mac online with nobody logged in, turn on automatic login for that user. Logs go to `~/Library/Logs/ait-daemon.log`.

systemd and launchd do not read shell configuration such as `~/.bashrc` or `~/.zshrc`, so their PATH may differ from your terminal. If an agent is installed elsewhere (for example, a global npm directory or nvm), add that directory to the `PATH` above, or set an absolute program path with variables such as `AIT_SERVER_CODEX_BIN`; see [Server configuration](/en/docs/configuration/). tmux inherits your terminal environment and usually needs no extra setup.

### Stop and start

| Method | Stop | Start |
| --- | --- | --- |
| tmux | Press `Ctrl-c` in the session | Run `ait-daemon run --headless` in the session |
| systemd | `systemctl --user stop ait-daemon` | `systemctl --user start ait-daemon` |
| launchd | `launchctl bootout "gui/$(id -u)/com.ait-app.daemon"` | `launchctl bootstrap "gui/$(id -u)" ~/Library/LaunchAgents/com.ait-app.daemon.plist` |

## Upgrade

Repeat the installation steps with the new `VERSION`, then restart the daemon as described in [Stop and start](#stop-and-start); with systemd you can also run `systemctl --user restart ait-daemon`. Upgrading keeps the machine authorization and data directory. You do not need to sign in again.

## Reauthorize, sign out, and uninstall

Before signing in, reauthorizing, or signing out, stop the daemon that uses the same data directory as described in [Stop and start](#stop-and-start), then start it again when you are done.

- When authorization is no longer valid, status shows `reauthorization_required`. Stop the daemon, run `ait-daemon login`, then start it again. Use `ait-daemon login --force` to replace an authorization deliberately.
- `ait-daemon logout` revokes this machine's authorization and clears local credentials. If the account service is unreachable, follow the prompt to revoke it from the host details page on the web.
- To uninstall, sign out, disable any systemd or launchd service and delete its service file, then delete `/usr/local/bin/ait-daemon`. The `~/.ait-server` data directory is not deleted automatically; remove it manually when you no longer need it.

See the [unattended daemon guide](https://github.com/ait-app/ait/blob/main/docs/operations/headless-daemon.md) for authorization recovery, credential files, and status fields.
