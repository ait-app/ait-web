---
title: 快速上手
description: 安装 Ait，接入你熟悉的 Agent，开始第一个任务。从电脑出发，随时换一块屏幕继续。
lang: zh
slug: quick-start
group: quickstart
order: 0
---

Ait 把 Agent 会话、文件、代码变更和终端放在同一个工作区。Agent 在你的工作电脑上运行，你可以在本机使用，也可以从手机或浏览器连接。先选择适合你的安装方式。

<div class="quick-start-paths">
  <a class="quick-start-path quick-start-path-recommended" href="#桌面应用推荐">
    <span class="quick-start-path-label">日常使用 · 推荐</span>
    <strong>桌面应用</strong>
    <span>在 Mac 或 Linux 电脑上安装，打开即可连接本机服务。</span>
    <span class="quick-start-path-action">从桌面开始 <span aria-hidden="true">↗</span></span>
  </a>
  <a class="quick-start-path" href="#服务器--独立-daemon">
    <span class="quick-start-path-label">远程主机</span>
    <strong>服务器 / 独立 daemon</strong>
    <span>在没有桌面环境的机器上运行，从其他设备连接。</span>
    <span class="quick-start-path-action">设置工作主机 <span aria-hidden="true">↗</span></span>
  </a>
</div>

## 开始之前

准备一台 **Apple Silicon Mac 或 Linux x86_64 电脑**作为工作主机、一个项目目录，以及至少一个已经安装并完成登录的 Agent CLI。Ait 支持 Codex、Claude Code、OpenCode、DeepSeek Harness、Antigravity CLI、Pi、Oh My Pi 和 MiniMax Code，具体配置见 [Agent 接入](/zh/docs/providers/)。Windows x64 桌面应用作为远端客户端使用，Agent 仍安装在工作主机上。

Ait 复用 Agent 自己的登录与模型配置，不包含模型订阅。Agent 安装在运行任务的工作主机上，手机和浏览器负责连接这台主机。

## 1. 安装 Ait

### 桌面应用（推荐）

打开 [Ait 下载页](/zh/download/)，按平台安装：

- **macOS Apple Silicon**：打开 DMG，将 Ait 拖到「应用程序」后启动。也可解压 ZIP。
- **Arch Linux**：安装正式版（或将包名改为 `ait-git` 从主线构建）

  ```sh
  paru -S ait-bin
  ```
- **Debian / Ubuntu**：下载 .deb 后运行

  ```sh
  sudo apt install ./Ait-*-linux-amd64.deb
  ```

- **Fedora / RHEL**：下载 .rpm 后运行

  ```sh
  sudo dnf install ./Ait-*-linux-x86_64.rpm
  ```

- **其他 Linux x86_64**：运行 AppImage 或解压 tar.gz。沙箱 Worktree 需要 `bubblewrap >= 0.8.0` 和非特权用户命名空间。请按[平台支持](/zh/docs/platforms/#linux-x86_64)准备依赖。
- **Windows x64**：安装远端客户端，通过在线服务、直接连接或远程 SSH 访问工作主机。

在 macOS 或 Linux 打开 Ait 时，桌面应用会启动内置 daemon。本机使用不需要 Ait 账户，可直接继续接入 Agent。

### 服务器 / 独立 daemon

在无桌面 Linux 或常开的 Apple Silicon Mac 上，按[独立 daemon 指南](/zh/docs/daemon/)下载、校验并安装 `aitd`。在主机上接入 Agent 并准备项目文件，再从下文的[在线服务连接](#在线服务连接)或[局域网直连](#局域网直连)选一种访问方式。

## 2. 接入 Agent

1. 在**工作主机的终端**中启动你要使用的 Agent，确认它已经完成认证，能够独立处理任务。
2. 回到 Ait，在新建会话时选择这个 Agent。已有的原生登录与项目配置可以继续使用。
3. 选择当前 Agent 提供的模型和权限选项；可用选项以本机安装的版本为准。

只需要准备一个 Agent 就能开始。之后可以在同一工作区增加其他 Agent 会话。

> 找不到 Agent？先确认 CLI 安装在当前连接的工作主机上，并且能在终端运行。非标准安装路径可参考 [指定程序路径](/zh/docs/providers/#指定程序路径)，配置后重启对应 daemon。

## 3. 创建第一个工作区

1. **添加项目**：选择工作主机上已有的项目目录。
2. **创建工作区**：第一次可以使用现有目录；需要隔离并行修改时，再选择 [Git worktree](/zh/docs/workspaces/#git-worktree)。
3. **新建 Agent 会话**：选择已准备好的 Agent，发送一个范围清晰的任务。

可以从了解项目开始，直接发送：

> 阅读这个项目，说明它的用途、主要目录和本地启动方式。找出已有的构建或测试命令，先不要修改文件。

看到回复和工具执行进度后，就完成了第一次任务。接下来可以让 Agent 做一项小改动，例如修正文案或补充 README，并在需要时处理会话里的权限审批。

完成修改后，打开**文件与 Diff** 检查变更，再在**终端**运行项目自己的构建或测试命令。更多操作见 [工作区](/zh/docs/workspaces/)。

## 4. 从其他设备继续（可选）

### 在线服务连接

- **桌面工作主机**：打开 **在线服务 → 登录 / 注册**，完成登录并确认主机同步已启用。
- **无头主机**：以运行 Agent 的系统用户执行以下命令。首次登录时，在任意设备的浏览器打开终端显示的网址，输入验证码并批准主机。

```sh
aitd login
aitd run
```

已有一次性接入令牌时，用以下命令代替第一条，从标准输入提交令牌：

```sh
aitd login --token-stdin
```

按[后台常驻指南](/zh/docs/daemon/#保持运行)用 tmux 或 systemd 保持服务运行。

在另一台桌面、Android、iOS 或 [Ait for Web](https://aitapp.cn/) 登录**同一账户和服务**，从在线主机列表选择工作主机。保持主机与 daemon 在线。在线连接可跨网络使用，无需公网端口转发。

### 局域网直连

- **桌面工作主机**：在 macOS 或 Linux 打开应用即可免登录直连本机 daemon。要让局域网其他设备直连，打开本机主机设置的 **守护进程**，填写实际局域网监听地址与固定端口（如 `7316`）并重启 daemon。
- **无头主机**：独立 `aitd` 默认仅监听 `127.0.0.1:7316`。在可信内网免登录启动并绑定主机的局域网地址（把示例 IP 换成主机的实际地址）：

```sh
aitd run --listen 192.168.1.10:7316
```

从 `<data-dir>/local-api.token` 读取访问令牌，或使用启动时设置的 `AIT_SERVER_TOKEN`。仅向可信网段放行对应 TCP 端口。在另一台桌面或移动端选择 **添加主机 → 直接连接**，填写主机 IP、端口和访问令牌。Ait for Web 仅支持在线服务。

更多防火墙限制及 SSH 隧道示例见[连接与数据](/zh/docs/connection/#直接连接)。

### 安装移动端

- **iPhone / iPad**：按 [TestFlight 安装步骤](/zh/docs/platforms/#iphone-和-ipad)接受邀请并安装。
- **Android**：按 [Google Play 封测步骤](/zh/docs/platforms/#google-play-封闭式测试)申请资格，再用获准的 Google 账户安装。

## 接下来

- [为什么使用 Ait](/zh/docs/why-ait/)：了解多 Agent、多主机统一管理，以及跨设备继续工作的方式。
- [工作区](/zh/docs/workspaces/)：组织会话、隔离并行任务、审查和提交变更。
- [Agent 接入](/zh/docs/providers/)：配置更多 Agent，了解各自的模型和权限选项。
- [连接与数据](/zh/docs/connection/)：了解远程连接和数据存放的位置。
- [常见问题与支持](/zh/docs/support/)：处理安装、登录或主机连接问题，也可以联系 [support@ait-app.com](mailto:support@ait-app.com)。
- [任务总览](/zh/docs/task-board/)：集中查看运行中的 Agent、权限审批和结果。
- [Agent 会话](/zh/docs/sessions/)：侧问、恢复已有会话和导出时间线。
