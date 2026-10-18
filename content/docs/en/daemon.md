---
title: Standalone daemon
description: Download, verify, and install ait-daemon on a Linux or macOS host without a desktop, then connect it to your Ait account as an unattended host.
lang: en
slug: daemon
group: reference
order: 5.5
---

Every Ait stable release includes standalone daemon archives containing a single executable, `ait-daemon`. Use it on hosts that do not need a desktop interface, such as cloud servers, build machines, or an always-on Mac mini. After you sign in to your Ait account, the host appears in the online host list, and you can connect to it from the desktop, Android, iOS, or Web clients.

Computers with the desktop app do not need it. The desktop app includes the daemon and manages its lifecycle.

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

## Sign in and run

Run these commands as the same system user that will run the daemon:

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

## Upgrade

Repeat the installation steps with the new `VERSION`, then restart the running `ait-daemon`. Upgrading keeps the machine authorization and data directory. You do not need to sign in again.

## Reauthorize, sign out, and uninstall

Stop any `ait-daemon` that uses the same data directory before signing in, reauthorizing, or signing out, then run `ait-daemon run --headless` again when you are done.

- When authorization is no longer valid, status shows `reauthorization_required`. Stop the daemon, run `ait-daemon login`, then start it again. Use `ait-daemon login --force` to replace an authorization deliberately.
- `ait-daemon logout` revokes this machine's authorization and clears local credentials. If the account service is unreachable, follow the prompt to revoke it from the host details page on the web.
- To uninstall, sign out, then delete `/usr/local/bin/ait-daemon`. The `~/.ait-server` data directory is not deleted automatically; remove it manually when you no longer need it.

See the [unattended daemon guide](https://github.com/ait-app/ait/blob/main/docs/operations/headless-daemon.md) for authorization recovery, credential files, and status fields.
