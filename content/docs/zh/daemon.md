---
title: 独立 daemon
description: 在没有桌面环境的 Linux 或 macOS 主机上下载、校验、安装 ait-daemon，并以无人值守方式接入 Ait 账户。
lang: zh
slug: daemon
group: reference
order: 5.5
---

每个 Ait 正式版都附带独立 daemon 归档，内含一个可执行文件 `ait-daemon`。它适合云服务器、构建机或常开的 Mac mini 这类不需要桌面界面的工作主机：登录 Ait 账户后，主机会出现在在线主机列表中，你可以从桌面、Android、iOS 或 Web 客户端连接它。

已安装桌面版的电脑不需要单独安装。桌面应用自带 daemon 并管理它的生命周期。

## 系统要求

| 平台 | 归档 | 要求 |
| --- | --- | --- |
| Linux x86_64 | `daemon-linux-x64` | glibc 2.28 及以上，例如 Ubuntu 20.04、Debian 10、RHEL / Rocky / AlmaLinux 8 或更新版本 |
| macOS Apple Silicon | `daemon-macos-arm64` | macOS 13 及以上；可执行文件已签名并经过 Apple 公证 |

你还需要：

- 一个 Ait 账户，与要连接这台主机的客户端使用同一账户。
- 在这台主机上安装并登录至少一个 Agent CLI，见 [Agent 接入](/zh/docs/providers/)。

## 下载（v0.1.8）

| 平台 | GitHub Release | 国内加速下载 |
| --- | --- | --- |
| Linux x86_64 | [Ait-0.1.8-daemon-linux-x64.tar.gz](https://github.com/ait-app/ait/releases/download/v0.1.8/Ait-0.1.8-daemon-linux-x64.tar.gz) | [COS 下载](https://ait-release-1251719274.cos.ap-shanghai.myqcloud.com/Ait-0.1.8-daemon-linux-x64.tar.gz) |
| macOS Apple Silicon | [Ait-0.1.8-daemon-macos-arm64.tar.gz](https://github.com/ait-app/ait/releases/download/v0.1.8/Ait-0.1.8-daemon-macos-arm64.tar.gz) | [COS 下载](https://ait-release-1251719274.cos.ap-shanghai.myqcloud.com/Ait-0.1.8-daemon-macos-arm64.tar.gz) |

两个地址的文件完全相同。校验文件 `SHA256SUMS` 只在 [GitHub Release](https://github.com/ait-app/ait/releases/tag/v0.1.8) 发布。其他版本可在 [全部 Release](https://github.com/ait-app/ait/releases) 中找到同名归档。

## 安装

下面的命令从国内镜像下载、核对校验值，并把 `ait-daemon` 安装到 `/usr/local/bin`。可以直接访问 GitHub 时，把第一条 `curl` 的地址换成 `https://github.com/ait-app/ait/releases/download/v${VERSION}/${ASSET}`。

### Linux

```sh
VERSION=0.1.8
ASSET="Ait-${VERSION}-daemon-linux-x64.tar.gz"
curl -fLO "https://ait-release-1251719274.cos.ap-shanghai.myqcloud.com/${ASSET}"
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
curl -fLO "https://ait-release-1251719274.cos.ap-shanghai.myqcloud.com/${ASSET}"
curl -fLO "https://github.com/ait-app/ait/releases/download/v${VERSION}/SHA256SUMS"
grep -F "  ${ASSET}" SHA256SUMS | shasum -a 256 -c -
tar -xzf "${ASSET}"
sudo mkdir -p /usr/local/bin
sudo install -m 0755 ait-daemon /usr/local/bin/ait-daemon
ait-daemon --version
```

校验通过时会输出 `OK`。如果没有输出或提示 `FAILED`，删除下载的文件并重新下载，不要继续安装。

`ait-daemon --help` 中显示的程序名为 `daemon`，与 `ait-daemon` 是同一个程序。

## 登录并运行

用之后运行 daemon 的同一个系统用户执行：

```sh
ait-daemon login --name my-server
ait-daemon run --headless
```

`login` 会在终端显示网页地址和验证码。在任意设备的浏览器打开地址，登录 Ait 账户，输入验证码并确认这台机器。`--name` 是在线主机列表中显示的名称，省略时使用系统 hostname。

授权完成后，`run --headless` 连接官方账户中心 `https://aitapp.cn/api`，并在本机监听 `127.0.0.1:7316`。以后重新启动会自动恢复授权，不需要再次登录。随后在其他设备登录同一账户，从在线主机列表选择这台主机，步骤见[连接与数据](/zh/docs/connection/)。

不方便打开浏览器时，也可以在网页的 Host 详情中签发一次性接入令牌，然后通过标准输入登录：

```sh
ait-daemon login --token-stdin --name my-server
```

查看授权与运行状态：

```sh
ait-daemon status --json
```

默认数据目录为 `~/.ait-server`，机器授权、本地 API 令牌和工作数据都保存在这里。监听地址、数据目录等参数见[服务配置](/zh/docs/configuration/)。

## 升级

按上面的安装步骤，把 `VERSION` 改为新版本重新下载并安装，然后重启正在运行的 `ait-daemon`。升级不会改变机器授权和数据目录，不需要重新登录。

## 重新授权、退出与卸载

登录、重新授权或退出前，先停止正在使用同一数据目录的 `ait-daemon`，完成后再重新运行 `ait-daemon run --headless`。

- 授权失效时，状态显示 `reauthorization_required`。停止 daemon 后执行 `ait-daemon login`，再重新启动。需要主动更换授权时使用 `ait-daemon login --force`。
- 执行 `ait-daemon logout` 会撤销这台机器的授权并清除本地凭据。中心不可达时，按提示到网页的 Host 详情中撤销。
- 卸载时先退出，再删除 `/usr/local/bin/ait-daemon`。数据目录 `~/.ait-server` 不会自动删除，确认不再需要后可手动删除。

授权恢复、凭据文件与状态字段的完整说明见 [无人值守 daemon 手册](https://github.com/ait-app/ait/blob/main/docs/operations/headless-daemon.md)。
