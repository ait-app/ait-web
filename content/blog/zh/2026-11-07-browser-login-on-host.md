---
title: 在内置浏览器里，登录远程主机上的 Codex 与 Claude
description: Ait 的内置浏览器从工作主机出站。远端主机上的 localhost 登录页，可以直接在工作区里打开，不必配置 SSH 隧道。
lang: zh
slug: browser-login-on-host
date: 2026-11-07
category: guide
visual: connection
---

把 Codex 或 Claude Code 装到一台远程主机上，第一次登录常卡在同一个地方。

CLI 在终端打印一个授权地址，让你在浏览器里完成登录。登录成功后，服务商把浏览器重定向回 `http://localhost:1455/...` 一类的地址——这个地址只在运行 CLI 的那台机器上有效。可那台机器往往没有图形界面；你手边的浏览器里，`localhost` 又是另一台电脑。

常见的绕法有三种：用 SSH 把回调端口转发到本地、把 `~/.codex/auth.json` 拷来拷去，或者改用设备码和粘贴授权码。它们都能完成任务，但每一步都在提醒你：登录页和执行任务的机器不是同一台。

Ait 的工作区里有一条更直接的路。内置浏览器的网络出口跟随工作区所属的主机，把 CLI 打印的地址粘进去，浏览器打开登录页的位置，正好就是回调服务所在的那台机器。

## 登录页为什么总落在 localhost

这是 OAuth 回环重定向的常见做法，不是 CLI 的疏忽。

CLI 登录时只在本机回环地址上临时监听一个端口，浏览器完成授权后跳到这个端口，CLI 由此拿到授权码。服务商不需要为每个开发者的电脑注册公网回调地址，授权码也不用经过第三方服务器。

代价是：回调必须由“运行 CLI 的那台机器”上的浏览器访问。你在笔记本上打开 `localhost:1455`，访问的是笔记本的回环地址；远程主机上的 Codex 当然收不到。

## 内置浏览器用的是哪台机器的网络

Ait 桌面客户端里的浏览器标签，界面在客户端，网络路径却跟着工作区走：

- 工作区在本机时，浏览器直连本机。
- 工作区在远程主机时，通过账户、TCP 或 SSH 建立的连接会把浏览器的 HTTP、HTTPS 和 WebSocket 流量都送到那台主机的 daemon，DNS 也在主机上解析。

因此在远程工作区里打开 `localhost:1455`，访问的是主机的回环地址。连接失败时，它也不会悄悄回退到你面前的电脑——这很重要，否则一次登录可能被发到错误的机器上。

浏览器保留原始 URL，HTTPS 证书仍由 Chromium 校验。Ait 转发的是 TCP 字节流，不做中间人解密；网页本身仍是 Chromium 里的普通网页，登录凭据由网站和 CLI 各自处理，Ait 不接管。

> 实现细节分别记录在 Ait 仓库的 [ADR-152](https://github.com/ait-app/ait/blob/main/docs/decisions/clients/adr-152-remote-workspace-browser-loopback.md) 和 [ADR-186](https://github.com/ait-app/ait/blob/main/docs/decisions/clients/adr-186-workspace-browser-egress.md)。

## 在 Ait 里完成 Codex 登录

1. 在 Ait 连接工作主机，打开一个工作区。
2. 新建终端标签。终端运行在主机上，执行 `codex login`。
3. 终端会打印授权地址；主机没有图形界面时，它尝试打开浏览器也不会成功。复制这个地址。
4. 在工作区的标签栏新建浏览器标签，粘贴地址并打开。
5. 用 ChatGPT 账号完成登录。授权结束后，浏览器跳回 `localhost:1455`，主机上的 Codex 收到回调，终端里的登录随之完成。
6. 回到终端确认：

```sh
codex login status
```

Codex 的默认回环回调是 `localhost:1455`，官方 [Authentication 文档](https://developers.openai.com/codex/auth)也记录了无头环境下的设备码与 SSH 转发方案。如果当前版本支持 `codex login --device-auth`，它不依赖 localhost 回调；内置浏览器不是唯一选择，只是更接近平时在浏览器里登录的体验。

## 在 Ait 里完成 Claude Code 登录

Claude Code 的步骤相同：

1. 在 Ait 的工作区终端执行 `claude auth login`，或者在 `claude` 会话里运行 `/login`。
2. 复制终端输出的授权地址。
3. 在 Ait 的内置浏览器中打开，完成 Claude 账号登录。
4. 回调落在主机上，终端确认登录结果。

```sh
claude auth status
```

较新的 Claude Code 在浏览器回调不可达时，允许把 OAuth code 粘贴回终端（见官方 [2026 W18 更新](https://code.claude.com/docs/en/whats-new/2026-w18)）。这条备选路径适合完全拿不到浏览器的情况；能用浏览器时，内置浏览器省掉的是粘贴授权码这一步。

## 不止登录页

同一条网络路径也适用于主机上的其他本地服务：开发服务器、Storybook、Jupyter、管理面板，以及只允许主机 IP 访问的内部站点。只要工作区连的是那台主机，地址栏里的 `localhost`、`127.0.0.1` 或主机内网地址都会从主机发出。

它也能打开普通网站。浏览器地址栏对 `localhost` 这类主机自动补上 `http://`，其他地址默认使用 `https://`；需要指定协议时，直接输入完整 URL。

## 边界与注意事项

- 内置浏览器目前只在 Ait 桌面客户端提供，Web 与移动端没有这个入口。
- 需要较新的客户端与主机端程序。远端主机上的 `aitd` 或桌面内置 daemon 太旧时，连接会提示主机需要更新；先升级主机端再试。
- 浏览器使用主机的 DNS 和 TCP 网络，但不会读取主机上浏览器的代理设置。依赖系统代理才能访问外网的主机，需要另行配置网络。
- 主机到服务商的网络仍然决定登录能不能完成。内置浏览器只是把浏览器的位置换到主机上，不会替主机翻越网络限制。
- 远端主机使用独立的持久浏览器 profile，网站的登录状态会保留；清除浏览器数据会一并清除这些 profile。
- 主机离线或连接中断时，内置浏览器不会退回本机网络。

## 把“在哪执行”和“在哪打开”对齐

内置浏览器不是为了把日常浏览搬进 Ait。它解决的是一致性：Agent 在哪台机器上执行，浏览器就应该看到那台机器的网络。登录页只是最容易碰到的例子。

如果还在准备主机，可以先看[独立 daemon](/zh/docs/daemon/)；Agent 本身的安装与登录见 [Agent 接入](/zh/docs/providers/)。
