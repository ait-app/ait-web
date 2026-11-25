---
title: 在内置浏览器里登录远程主机上的 Codex 和 Claude
description: Ait 桌面端的内置浏览器从工作主机出站，远端主机上的 localhost 登录回调可以直接在工作区里打开，省掉 SSH 端口转发。
lang: zh
slug: browser-login-on-host
date: 2026-11-07
category: guide
visual: connection
---

把 Codex 或 Claude Code 装到一台远程 Linux 主机上，第一次登录十有八九会卡在同一步。

CLI 在终端打印出一个授权链接，让你到浏览器里完成登录。授权之后，服务商会把浏览器重定向回 `http://localhost:1455/...` 这样的本地回环地址——这个端口只监听在运行 CLI 的那台远程主机上。可远程机器多半没有桌面环境，而在你手边笔记本的浏览器里，`localhost` 指的是笔记本自己。

平时常见的绕法有三种：开一条 SSH 端口转发、手动把 `~/.codex/auth.json` 拷过去，或者改用设备码和粘贴授权码。几种办法都能通，只是每次都要折腾一下。

如果你已经在 Ait 桌面端连上了这台主机，有一条更顺手的路：直接在工作区里开一个内置浏览器标签。它的网络出口跟着工作区所在的主机走，把 CLI 打印的地址粘进去，登录和回环回调都会落在远程主机上。

## 为什么 CLI 一定要跳回 localhost

这是 OAuth 回环重定向的标准做法。CLI 登录时只在本机回环接口临时监听一个端口，浏览器完成授权后跳回这个端口，把授权码交回 CLI——服务商不用为每台开发机登记公网回调地址，授权码也不用经由第三方中转。

麻烦只在远程机器上出现：回调请求必须发往运行 CLI 的那台机器，你在笔记本浏览器里敲 `localhost:1455`，远端的 Codex 根本收不到。

## 内置浏览器的流量从哪台机器出去

Ait 桌面端里的浏览器标签，界面渲染在你面前的电脑上，网络连接则跟随当前工作区：

- 本地工作区：浏览器直连本机网络。
- 远程工作区：通过账户中继、TCP 或 SSH 建立的连接，把浏览器的 HTTP、HTTPS 和 WebSocket 流量统一转发到对应主机的 daemon，DNS 也在主机上解析。

所以在远程工作区里访问 `localhost:1455`，命中的就是远程主机的回环端口。如果主机离线或连接断了，它也不会悄悄回退到你面前的电脑，避免把一次登录误发到错误的机器上。

转发的是原始 TCP 字节流，URL 保持原样，HTTPS 证书仍由 Chromium 自己校验证书链，不做中间人解密。网页本身和普通 Chromium 标签页一样，账号凭据由网站和 CLI 各自处理，Ait 不接管。

> 实现细节可参考主仓库的 [ADR-152](https://github.com/ait-app/ait/blob/main/docs/decisions/clients/adr-152-remote-workspace-browser-loopback.md) 和 [ADR-186](https://github.com/ait-app/ait/blob/main/docs/decisions/clients/adr-186-workspace-browser-egress.md)。

## 登录远程主机上的 Codex

1. 在 Ait 桌面端连接目标主机，打开一个工作区。
2. 新建终端标签，运行 `codex login`。
3. 远程主机没有图形界面，CLI 自动弹浏览器会失败，复制终端打印的授权链接。
4. 在工作区标签栏新建内置浏览器标签，粘贴链接并打开。
5. 用 ChatGPT 账号登录。授权完成后浏览器自动跳到 `localhost:1455`，主机上的 Codex 收到回调，终端里随之提示登录成功。
6. 回到终端确认状态：

```sh
codex login status
```

Codex 默认使用 `localhost:1455` 回调，官方 [Authentication 文档](https://developers.openai.com/codex/auth) 也列出了无头环境下的设备码和 SSH 转发方式。如果所装版本支持 `codex login --device-auth`，也可以直接走设备码，不依赖回环回调。

## 登录远程主机上的 Claude Code

步骤基本一致：

1. 在工作区终端执行 `claude auth login`，或在 `claude` 会话里输入 `/login`。
2. 复制终端输出的授权地址。
3. 在内置浏览器标签里打开并登录 Claude 账号。
4. 回调回到远程主机，终端确认登录完成：

```sh
claude auth status
```

较新的 Claude Code 在回环回调不可达时，也支持把页面给出的 OAuth code 粘贴回终端（见官方 [2026 W18 更新](https://code.claude.com/docs/en/whats-new/2026-w18)）；用内置浏览器的话，省掉了手动粘贴这一步。

## 顺带也能看主机上的本地服务

同一条网络路径同样适用于远程主机上起的其他服务：前端开发服务器、Storybook、Jupyter、内部管理后台，或者只放行主机内网 IP 的站点。只要工作区连的是那台主机，地址栏里的 `localhost`、`127.0.0.1` 和主机内网地址都会从主机发出。

地址栏对 `localhost` 这类本地主机名默认补 `http://`，其他域名默认补 `https://`；需要指定协议时直接输完整 URL。

## 几个使用前提和限制

- **仅桌面端提供**：目前内置浏览器只在 Ait 桌面客户端里可用，Web 和移动端没有这个入口。
- **需要较新的主机 daemon**：远程 `aitd` 或桌面内置 daemon 版本太旧时会提示升级，先更新主机端再试。
- **不读取主机系统代理**：浏览器走主机的 DNS 和 TCP 网络，但不会读取主机桌面浏览器的代理配置。如果主机需要代理才能访问外网，要单独配置网络环境。
- **不改变主机自身的网络可达性**：能否连上 OpenAI 或 Anthropic 仍取决于远程主机本身的网络。
- **按远端主机保留独立 profile**：网站的登录态会持久化保存，清除浏览器数据时会一并清掉。

如果还在配远程主机，先看 [把 Linux 服务器或 Mac mini 配成常驻 Agent 主机](/zh/blog/always-on-aitd-host/) 或 [独立 daemon 文档](/zh/docs/daemon/)；各 Agent 的安装与认证说明在 [Agent 接入](/zh/docs/providers/)。
