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

准备一台 **Apple Silicon Mac 或 Linux x86_64 电脑**、一个项目目录，以及至少一个已经安装并完成登录的 Agent CLI。Ait 支持 Codex、Claude Code、OpenCode、DeepSeek Harness 和 Antigravity CLI，具体配置见 [Agent 接入](/zh/docs/providers/)。

Ait 复用 Agent 自己的登录与模型配置，不包含模型订阅。Agent 安装在运行任务的工作主机上，手机和浏览器负责连接这台主机。

## 1. 安装 Ait

### 桌面应用（推荐）

前往 [Ait 下载页](/zh/download/)，选择与你的电脑匹配的安装包：

- **macOS Apple Silicon**：打开 DMG，将 Ait 安装到「应用程序」，然后启动。
- **Linux x86_64**：下载 AppImage 或 tar.gz，按发行包格式运行或解压后启动。

打开 Ait，进入本机服务。桌面应用会自动启动内置 daemon，无需再安装独立服务。**只在本机使用时，无需登录 Ait 账户。**

安装包、国内下载入口和各平台说明见 [平台支持](/zh/docs/platforms/)。已安装桌面版，可以直接继续下面的「接入 Agent」。

### 服务器 / 独立 daemon

如果项目在云服务器或常开的工作主机上，先按 [独立 daemon 安装指南](/zh/docs/daemon/) 下载、校验并安装 `ait-daemon`，再以运行任务的同一个系统用户执行：

```sh
ait-daemon login
ait-daemon run --headless
```

首次授权时，终端会显示网页地址和验证码。在浏览器中打开地址，登录 Ait 账户并确认这台机器。启动后，打开 [Ait Web 界面](https://aitapp.cn/)，登录同一账户，从在线主机列表选择它。

`run --headless` 在前台运行，请保持进程运行。长期在线可按 [后台常驻说明](/zh/docs/daemon/#保持运行)配置 systemd 或 launchd。Agent CLI 和项目文件也应准备在这台主机上。

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

1. 在工作电脑打开 **在线服务 → 登录 / 注册**，完成 Ait 账户登录，确认主机已开启同步。使用无人值守 daemon 时，前面的 `login` 已完成机器授权。
2. 在另一台设备打开 Ait，登录**同一账户与服务**，从在线主机列表选择工作电脑。
3. 打开原来的工作区，继续查看进度、发送消息或处理审批。

选择连接设备：

- **浏览器**：打开 [Ait Web 界面](https://aitapp.cn/)，无需安装客户端。
- **iPhone / iPad**：按 [TestFlight 安装步骤](/zh/docs/platforms/#iphone-和-ipad)接受公开邀请并安装 Ait。
- **Android**：按 [Google Play 封测步骤](/zh/docs/platforms/#google-play-封闭式测试)先申请资格，再使用获准的 Google 账号安装。
- **另一台电脑**：安装桌面应用，登录同一 Ait 账户并选择在线主机。

工作主机需要保持唤醒，Ait 服务与 Agent 也需要保持可用。通过账户中继连接，无需两端在同一局域网，也无需设置公网端口转发。连接细节见 [连接与数据](/zh/docs/connection/)。

## 接下来

- [工作区](/zh/docs/workspaces/)：组织会话、隔离并行任务、审查和提交变更。
- [Agent 接入](/zh/docs/providers/)：配置更多 Agent，了解各自的模型和权限选项。
- [连接与数据](/zh/docs/connection/)：了解远程连接和数据存放的位置。
- [常见问题与支持](/zh/docs/support/)：处理安装、登录或主机连接问题，也可以联系 [support@ait-app.com](mailto:support@ait-app.com)。
