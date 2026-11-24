---
title: Agent 会话
description: 导入原生历史、发起 BTW 侧会话、管理目标并导出时间线。
lang: zh
slug: sessions
group: workflow
order: 4.2
---

## 导入或恢复会话

打开侧栏的 **导入会话**。已登录时从账号菜单进入。选择主机、Provider 和对应会话，再打开工作区。Codex、Claude Code、DeepSeek Harness、Pi 和 Oh My Pi 支持原生导入。OpenCode 取决于 CLI 的 ACP 能力。Antigravity 和 MiniMax Code 可恢复在 Ait 中创建的会话，但不提供完整的外部历史导入。恢复之前，停止在原程序中写入同一会话。[Agent 接入](/zh/docs/providers/)

## 在主会话旁提问

在已有会话中输入 `/btw` 或 `/btw 你的问题`。主任务运行时也可在浮窗追问。话题沿用第一次提问时已保存的可读上下文，并独立保存问答。选择 **展开** 可将话题带入新的完整会话草稿。

BTW 目前支持 Codex、Claude Code、OpenCode、Pi 和 Oh My Pi，需要兼容的客户端和 Unix 主机。跨会话交接可用[工作区记事本](/zh/docs/workspaces/#工作区记事本)。

## 查看和调整 Goal

在支持原生 Goal 的 Codex 或 Oh My Pi 会话中，输入区会显示主机上报的目标和可用操作，如编辑、暂停、恢复或清除。统一功能菜单和新版 Goal 显示需要 v0.2.26 客户端和兼容主机。

## 导出时间线

在 **上下文详情** 中选择 Markdown 或 HTML，导出完整已保存时间线，或仅导出对话和语音转写。导出不打断正在运行的任务。附件只保留引用。旧主机可能不支持导出，超出大小限制会报错。

## 听写与实时语音

听写默认由主机处理，首次准备离线模型需要联网。实时语音由 Codex 原生提供，入口取决于 CLI、认证、客户端和主机配置。桌面和 Web 使用 WebRTC，其他客户端的原生音频通道可能需要 API Key。[语音配置](https://github.com/ait-app/ait/blob/main/docs/operations/speech.md)
