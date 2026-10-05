---
title: 连接与数据
description: 了解工作主机、账户中继、直接连接，以及凭据和数据分别存放在哪里。
lang: zh
slug: connection
group: workflow
order: 5
---

Ait 将运行和连接分开：工作主机运行 daemon 与 Agent，客户端连接主机，访问工作区与会话。

## 通过账户连接

桌面与 Android 默认账户服务地址为 `https://dash.ait-app.com:8443/api`。

1. 在电脑的桌面应用中登录账户，让电脑上线。
2. 在另一台桌面设备或 Android 中登录同一账户。
3. 打开 **Settings → Host → Account and online hosts** 或 **Add Host**。
4. 从在线主机列表选择工作电脑。

主机列表定期刷新，不显示当前机器。Android 只作为客户端，不发布手机为工作主机。当前移动验证范围见 [平台支持](/zh/docs/platforms/)。

使用自建账户服务时，在 **Service settings** 中填写 API 基础地址。留空使用默认地址。`/hosts` 是管理页面，不是 API 基础地址。已保存的账户沿用原先配置的服务地址。

## 直接连接

Web 与 iOS 当前使用直接连接，尚未提供账户登录。连接时需要工作主机地址、端口和 daemon 访问令牌。

本地开发的默认 daemon 监听地址为 `127.0.0.1:7316`。此地址只能在对应主机上使用；另一台设备需要能够访问的具体主机地址。监听与浏览器 Origin 设置见 [服务配置](/zh/docs/configuration/)。

## 凭据分别管理

- **Ait 连接令牌**用于客户端与 daemon 的认证。
- **Agent 服务凭据**由 Codex、Claude Code、OpenCode 等原生程序保存，用于访问各自服务。
- **账户登录凭据**通过平台安全存储保存；安全存储不可用时，重启后需要重新登录。

浏览器先交换短时一次性连接票据，再升级 WebSocket。服务 Bearer 不放入 URL。

## 数据留在工作主机

项目文件与 Agent 运行时保留在工作主机。桌面默认服务数据目录为 `~/.ait-server-desktop`，独立 daemon 默认目录为 `~/.ait-server`。

本地运行不表示模型请求永远不出网。Agent 会按自身配置与对应供应商通信，使用远程模型时应参考供应商的数据政策。远程客户端通过所选连接方式读取主机上的文件与会话。

## 断开与恢复

WebSocket 订阅归当前连接所有，断开时释放，重连需要重新订阅。Android 进入后台暂停连接，回到前台后重新验证账户节点。

更完整的协议、关闭与数据目录说明见 [daemon 手册](https://github.com/ait-app/ait/blob/main/docs/operations/daemon.md)。
