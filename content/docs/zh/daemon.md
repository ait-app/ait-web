---
title: 独立 daemon
description: 下载、校验并安装单独发布的 ait-daemon，在没有桌面环境的 Linux 或 macOS 主机上以无人值守模式接入 Ait 账户。
lang: zh
slug: daemon
group: reference
order: 5.5
---

每个 Ait 正式版都附带独立 daemon 归档，内含一个可执行文件 `ait-daemon`。它适合云服务器、构建机或常开的 Mac mini 这类不需要桌面界面的工作主机：以无人值守模式运行并登录 Ait 账户后，主机会出现在在线主机列表中，你可以从桌面、Android、iOS 或 Web 客户端连接它。

本文涉及两个概念：

- **独立 daemon** 是获取方式：不随桌面应用安装、单独下载的 `ait-daemon` 程序。它与桌面应用内置的 daemon 是同一个程序。
- **无人值守模式** 是运行方式：执行 `ait-daemon login` 授权这台机器后，用 `ait-daemon run --headless` 启动。daemon 通过账户中继保持在线，无需有人操作，重启后自动恢复连接。

在没有桌面的主机上，通常把两者配合使用，本文也按这种方式介绍。独立 daemon 也可以不加 `--headless`，以普通模式启动：这时需要自行设置 `AIT_SERVER_TOKEN`，只支持直接连接，见[服务配置](/zh/docs/configuration/)。

已安装桌面版的电脑不需要单独安装。桌面应用自带 daemon 并管理它的生命周期，不使用无人值守模式。

## 系统要求

| 平台 | 归档 | 要求 |
| --- | --- | --- |
| Linux x86_64 | `daemon-linux-x64` | glibc 2.28 及以上，例如 Ubuntu 20.04、Debian 10、RHEL / Rocky / AlmaLinux 8 或更新版本 |
| macOS Apple Silicon | `daemon-macos-arm64` | macOS 13 及以上；可执行文件已签名并经过 Apple 公证 |

你还需要：

- 一个 Ait 账户，与要连接这台主机的客户端使用同一账户。
- 在这台主机上安装并登录至少一个 Agent CLI，见 [Agent 接入](/zh/docs/providers/)。

## 下载（v0.1.16）

| 平台 | GitHub Release | 国内加速下载 |
| --- | --- | --- |
| Linux x86_64 | [Ait-0.1.16-daemon-linux-x64.tar.gz](https://github.com/ait-app/ait/releases/download/v0.1.16/Ait-0.1.16-daemon-linux-x64.tar.gz) | [COS 下载](https://ait-release-1251719274.cos.ap-shanghai.myqcloud.com/v0.1.16/Ait-0.1.16-daemon-linux-x64.tar.gz) |
| macOS Apple Silicon | [Ait-0.1.16-daemon-macos-arm64.tar.gz](https://github.com/ait-app/ait/releases/download/v0.1.16/Ait-0.1.16-daemon-macos-arm64.tar.gz) | [COS 下载](https://ait-release-1251719274.cos.ap-shanghai.myqcloud.com/v0.1.16/Ait-0.1.16-daemon-macos-arm64.tar.gz) |

两个地址的文件完全相同。校验文件 `SHA256SUMS` 只在 [GitHub Release](https://github.com/ait-app/ait/releases/tag/v0.1.16) 发布。其他版本可在 [全部 Release](https://github.com/ait-app/ait/releases) 中找到同名归档。

## 安装

下面的命令从国内镜像下载、核对校验值，并把 `ait-daemon` 安装到 `/usr/local/bin`。可以直接访问 GitHub 时，把第一条 `curl` 的地址换成 `https://github.com/ait-app/ait/releases/download/v${VERSION}/${ASSET}`。

### Linux

```sh
VERSION=0.1.16
ASSET="Ait-${VERSION}-daemon-linux-x64.tar.gz"
curl -fLO "https://ait-release-1251719274.cos.ap-shanghai.myqcloud.com/v${VERSION}/${ASSET}"
curl -fLO "https://github.com/ait-app/ait/releases/download/v${VERSION}/SHA256SUMS"
grep -F "  ${ASSET}" SHA256SUMS | sha256sum -c -
tar -xzf "${ASSET}"
sudo install -m 0755 ait-daemon /usr/local/bin/ait-daemon
ait-daemon --version
```

### macOS

```sh
VERSION=0.1.16
ASSET="Ait-${VERSION}-daemon-macos-arm64.tar.gz"
curl -fLO "https://ait-release-1251719274.cos.ap-shanghai.myqcloud.com/v${VERSION}/${ASSET}"
curl -fLO "https://github.com/ait-app/ait/releases/download/v${VERSION}/SHA256SUMS"
grep -F "  ${ASSET}" SHA256SUMS | shasum -a 256 -c -
tar -xzf "${ASSET}"
sudo mkdir -p /usr/local/bin
sudo install -m 0755 ait-daemon /usr/local/bin/ait-daemon
ait-daemon --version
```

校验通过时会输出 `OK`。如果没有输出或提示 `FAILED`，删除下载的文件并重新下载，不要继续安装。

`ait-daemon --help` 中显示的程序名为 `daemon`，与 `ait-daemon` 是同一个程序。

## 以无人值守模式运行

先授权这台机器，再以无人值守模式启动。用之后运行 daemon 的同一个系统用户执行：

```sh
ait-daemon login
ait-daemon run --headless
```

`login` 会在终端显示网页地址和验证码。在任意设备的浏览器打开地址，登录 Ait 账户，输入验证码并确认这台机器。

在线主机列表默认使用系统 hostname 作为这台机器的名称。需要指定其他名称时，在登录时加上 `--name`，例如 `ait-daemon login --name my-server`。

授权完成后，`run --headless` 连接官方账户中心 `https://aitapp.cn/api`，并在本机监听 `127.0.0.1:7316`。以后重新启动会自动恢复授权，不需要再次登录。随后在其他设备登录同一账户，从在线主机列表选择这台主机，步骤见[连接与数据](/zh/docs/connection/)。

不方便打开浏览器时，也可以在网页的 Host 详情中签发一次性接入令牌，然后通过标准输入登录：

```sh
ait-daemon login --token-stdin
```

查看授权与运行状态：

```sh
ait-daemon status --json
```

默认数据目录为 `~/.ait-server`，机器授权、本地 API 令牌和工作数据都保存在这里。监听地址、数据目录等参数见[服务配置](/zh/docs/configuration/)。

## 保持运行

`ait-daemon run --headless` 在前台运行，关闭终端或 SSH 断开后会随之退出。

### 推荐：在 tmux 中运行

用 tmux 运行最简单，断开连接后 daemon 继续工作，回到会话可以直接查看日志：

```sh
tmux new -s ait-daemon
ait-daemon run --headless
```

按 `Ctrl-b` 再按 `d` 离开会话，daemon 保持运行。之后用 `tmux attach -t ait-daemon` 回到会话，在会话中按 `Ctrl-c` 停止。没有安装 tmux 时，Linux 使用发行版的包管理器安装（例如 `sudo apt install tmux`），macOS 使用 `brew install tmux`。

tmux 会话不会在主机重启后自动恢复。需要开机自动启动时，改用下面的 systemd 或 launchd。

### 持久启动：Linux 使用 systemd

以完成 `login` 的同一用户创建 systemd 用户服务：

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

`enable-linger` 让服务在用户未登录时也随系统启动。查看日志使用 `journalctl --user -u ait-daemon -f`。

### 持久启动：macOS 使用 launchd

以完成 `login` 的同一用户创建 LaunchAgent：

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

LaunchAgent 在该用户登录后运行。需要在无人登录时保持在线的 Mac，请为该用户开启自动登录。日志写入 `~/Library/Logs/ait-daemon.log`。

systemd 和 launchd 不会读取 `~/.bashrc`、`~/.zshrc` 等 shell 配置，PATH 可能与终端不同。如果 Agent 安装在其他目录（例如 npm 全局目录或 nvm），请把该目录加入上面的 `PATH`，或按[服务配置](/zh/docs/configuration/)用 `AIT_SERVER_CODEX_BIN` 等环境变量指定程序的绝对路径。tmux 沿用当前终端的环境，通常不需要额外配置。

### 停止与启动

| 运行方式 | 停止 | 启动 |
| --- | --- | --- |
| tmux | 在会话中按 `Ctrl-c` | 在会话中运行 `ait-daemon run --headless` |
| systemd | `systemctl --user stop ait-daemon` | `systemctl --user start ait-daemon` |
| launchd | `launchctl bootout "gui/$(id -u)/com.ait-app.daemon"` | `launchctl bootstrap "gui/$(id -u)" ~/Library/LaunchAgents/com.ait-app.daemon.plist` |

## 升级

按上面的安装步骤，把 `VERSION` 改为新版本重新下载并安装，然后按[停止与启动](#停止与启动)中对应的方式重启 daemon；systemd 也可以直接执行 `systemctl --user restart ait-daemon`。升级不会改变机器授权和数据目录，不需要重新登录。

## 重新授权、退出与卸载

登录、重新授权或退出前，先按[停止与启动](#停止与启动)停止正在使用同一数据目录的 daemon，完成后再启动。

- 授权失效时，状态显示 `reauthorization_required`。停止 daemon 后执行 `ait-daemon login`，再重新启动。需要主动更换授权时使用 `ait-daemon login --force`。
- 执行 `ait-daemon logout` 会撤销这台机器的授权并清除本地凭据。中心不可达时，按提示到网页的 Host 详情中撤销。
- 卸载时先退出，停用 systemd 或 launchd 服务并删除对应的服务文件，再删除 `/usr/local/bin/ait-daemon`。数据目录 `~/.ait-server` 不会自动删除，确认不再需要后可手动删除。

授权恢复、凭据文件与状态字段的完整说明见 [无人值守 daemon 手册](https://github.com/ait-app/ait/blob/main/docs/operations/headless-daemon.md)。
