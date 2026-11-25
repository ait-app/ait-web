---
title: 把 Linux 服务器或 Mac mini 配成常驻 Agent 主机：aitd 实操和常见坑
description: 用单文件 Rust daemon 把闲置服务器或 Mac mini 变成长期在线的工作主机，以及部署时最容易踩的几个坑。
lang: zh
slug: always-on-aitd-host
date: 2026-11-24
category: guide
visual: connection
draft: true
---

把编程 Agent 全跑在随身笔记本上，用久了会碰到几件烦心事：合盖休眠任务就停、编译加多个 Agent 一起跑风扇直响；或者主力机是 Windows，日常开发和工具链其实都在一台 Linux 服务器上。

如果手头正好有一台闲置的 Linux 云主机、实验室机器，或者插电常开的 Apple Silicon Mac mini，装一个独立的 `aitd` 就能把它变成常驻工作主机。`aitd` 是 Rust 编译出来的单个可执行文件，跟桌面版内置的是同一个程序，运行它本身不需要图形界面，也不用为了 daemon 单独装 Node.js。

下面把部署路径和几个真容易踩的坑捋一遍。

## 装好 `aitd`，先想清楚用哪种方式连

Linux x86_64（glibc 2.28 及以上，比如 Ubuntu 20.04、Debian 10、Rocky/AlmaLinux 8 及更新版本）和 macOS Apple Silicon（macOS 13 及以上）都有对应的独立归档。下载链接和 `SHA256SUMS` 校验步骤在[独立 daemon 文档](/zh/docs/daemon/)里有现成命令，解压放到 `/usr/local/bin/aitd` 即可。

连上这台机器常见有三条路：

1. **登录 Ait 账户走在线服务**：执行 `aitd login`（想自定义主机名就加 `--name my-server`），在任意浏览器打开提示的链接输入验证码，然后运行 `aitd run`。之后手机、网页（[aitapp.cn](https://aitapp.cn/)）和另一台电脑（包括 Windows 客户端）登录同一账号就能直接看到这台主机，不用配公网端口。
2. **服务器不方便拷验证码链接时，用一次性令牌**：在网页端 Host 详情页签发一次性接入令牌，再到主机上跑 `aitd login --token-stdin`，粘进去按回车再按 `Ctrl-D` 完成授权，很适合纯 SSH 或脚本化部署。
3. **不想登录账户，只在可信内网或 SSH 里直连**：
   - 局域网直连：启动时把监听地址改成内网 IP，比如 `aitd run --listen 192.168.1.10:7316`，读取 `~/.ait/local-api.token`（或用 `AIT_SERVER_TOKEN` 自己指定 32–256 位可见 ASCII 令牌），并在防火墙里只对可信网段放行 `7316` 端口。内置监听没有 TLS，不要直接暴露到公网。
   - SSH 隧道：主机保持默认的 `127.0.0.1:7316`，在本地电脑跑一条 `ssh -N -L 127.0.0.1:7316:127.0.0.1:7316 user@working-host`，客户端直连本地 `127.0.0.1:7316` 填远端令牌就行。

注意一个区别：托管网页版 [Ait for Web](https://aitapp.cn/) 只走在线服务；如果你希望随时打开浏览器就能连，选第一种方式最省事。

## 长期挂在后台：`tmux`、`systemd` 和 `launchd`

`aitd run` 默认跑在前台，SSH 一断进程就没了。

临时试用或者想随时贴上去看日志，直接开个 `tmux` 最快：

```sh
tmux new -s aitd
aitd run
```

按 `Ctrl-b` 再按 `d` 切出来就行。但它不会随系统重启自动拉起；打算长期常驻的话，Linux 用 `systemd --user`，macOS 用 `launchd` 的 LaunchAgent，完整配置模板直接照[独立 daemon 文档](/zh/docs/daemon/#保持运行)抄一份即可。

## 最容易踩的 4 个坑

### 1. Linux 退出 SSH 后服务跟着停了

配好 `systemctl --user enable --now aitd` 之后，人一退出 SSH，主机在线状态就掉线了。多半是忘了执行：

```sh
sudo loginctl enable-linger "$USER"
```

没有 `enable-linger`，systemd 的用户级服务会在最后一个登录会话结束时被停掉，开机不登录也不会自动拉起。

### 2. 终端里能跑 `claude` / `codex`，切到 systemd 或 launchd 就找不到

这是后台服务里最常见的问题。`systemd` 和 `launchd` 不会去读你的 `~/.bashrc` 或 `~/.zshrc`，所以用 `nvm`、`fnm`、pnpm 或自定义目录装的 Agent CLI 往往不在默认 `PATH` 里（`tmux` 继承了当前 shell 环境，反而不太会碰上这个问题）。

解法二选一：
- 把实际路径补进 service / plist 的 `PATH` 环境变量；
- 或者直接用环境变量指明绝对路径，比如 `AIT_SERVER_CODEX_BIN`、`AIT_SERVER_CLAUDE_BIN`、`AIT_SERVER_OPENCODE_BIN`，完整列表见[服务配置](/zh/docs/configuration/#指定-provider-程序)。改完记得重启 daemon。

### 3. 旧脚本里还留着 `--headless`

如果你以前装过 v0.1.20 这类早期版本，启动脚本里可能写着 `ait-daemon run --headless`。从 v0.1.22 起已经移除 `--headless`，v0.1.30 起可执行文件也统一叫 `aitd`。升级后把旧脚本里的 `--headless` 删掉、路径换成 `/usr/local/bin/aitd`，执行前用 `aitd --version` 和 `aitd run --help` 看一眼最稳妥。

### 4. 没停 daemon 就执行 `login` 或 `logout`

重新授权或退出机器授权前，先停掉正在使用同一数据目录的 daemon，操作完再启动。平常想看授权和运行状态，跑一条 `aitd status --json` 就能确认；如果状态里出现 `reauthorization_required`，也是先停、再 `aitd login`、再拉起。

另外，macOS 的 LaunchAgent 要等该系统用户登录后才会启动；如果是一台不接显示器的 Mac mini，记得给这个用户打开自动登录。

主机在线之后，如果要在上面给 Codex 或 Claude Code 做第一次 OAuth 登录，不用折腾 SSH 端口转发，可以直接用桌面端工作区的内置浏览器完成，具体做法见[在内置浏览器里登录远程主机上的 Codex 和 Claude](/zh/blog/browser-login-on-host/)。
