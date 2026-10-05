---
title: 快速开始
description: 安装 Ait，接入你熟悉的 Agent，然后开始第一个工作区。
lang: zh
slug: getting-started
group: start
order: 1
---

Ait 是一个本地优先的多 Agent 管理器。Agent 在你的工作主机上运行，你通过统一界面管理会话、查看文件和代码变更，并使用终端验证结果。

## 安装桌面应用

在 [下载页](/zh/download/) 选择你的平台。目前官方桌面 Release 提供 **Apple Silicon macOS** 与 **Linux x86_64** 安装包。

从 [Ait 官方 Release](https://github.com/ait-app/ait/releases/latest) 下载对应文件。macOS 打开 DMG，安装并启动 Ait；Linux 根据发行包格式解压运行，或使用 AppImage。Release 同时提供 `SHA256SUMS`，可核对下载文件。

桌面安装包带有 Rust daemon，由桌面应用负责启动，无需额外安装一个 Ait 服务。

## 准备一个 Agent

Ait 不包含模型订阅。开始之前，在工作主机上安装并登录至少一个支持的 Agent CLI，例如 Claude Code、Codex 或 OpenCode。

如果已经在终端使用这些工具，可以继续使用现有登录。各服务的模型权限、订阅和费用由相应供应商管理。不同 Provider 的可用能力见 [Agent 接入](/zh/docs/providers/)。

## 开始第一个工作区

1. 打开 Ait，连接本机服务。
2. 添加已有项目，选择项目所在目录。
3. 创建工作区，选择一个可用的 Agent。
4. 描述你想完成的任务，并在会话里查看执行过程。
5. 检查文件与 Diff，在终端运行项目的验证命令。

工作区的组织方式与 Git worktree 的用途见 [工作区](/zh/docs/workspaces/)。

## 连接另一台设备

桌面和 Android 可以登录同一账户，从在线主机列表选择工作电脑。Web 与 iOS 当前使用直接连接，各端并不具有完全相同的连接能力。

继续阅读 [连接与数据](/zh/docs/connection/) 和 [平台支持](/zh/docs/platforms/)，选择适合你的连接方式。

## 从源码运行

本地开发需要 Git、Node.js，以及 Ait 仓库指定的 Rust 工具链。在终端运行：

```sh
git clone https://github.com/ait-app/ait.git
cd ait
npm ci
npm run dev:desktop
```

桌面开发入口会构建共享包、daemon 与 Electron 主进程，然后启动桌面应用。Web 的开发命令见 [平台支持](/zh/docs/platforms/)。
