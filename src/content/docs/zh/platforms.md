---
title: 平台支持
description: 桌面、Android、iOS 与 Web 的安装方式，以及当前连接能力。
lang: zh
slug: platforms
group: start
order: 2
---

Ait 的桌面、Web 与移动端复用共享界面和 Rust 协议。不同平台的安装与连接方式有所区别，请按下面的当前能力选择入口。

## 桌面

官方 [GitHub Release](https://github.com/ait-app/ait/releases/latest) 提供 Apple Silicon macOS 和 Linux x86_64 安装包。桌面壳内置 daemon，并管理本机服务生命周期。

桌面支持账户登录与在线主机连接，也可以连接本机工作空间。目前下载页不提供未经发布验证的 Windows 或 Intel Mac 安装包。

## Android

Android 作为客户端连接工作电脑，不在手机上运行 daemon，也不把手机发布为工作主机。

打开 **在线服务 → 登录 / 注册**，在系统浏览器完成登录并返回 Ait。使用和桌面相同的账户及服务，再选择在线电脑。主机同步步骤见[连接与数据](/zh/docs/connection/)。

进入后台后连接暂停，回到前台后恢复。相关实现边界与构建命令见 [移动端说明](https://github.com/ait-app/ait/blob/main/apps/mobile/README.md) 和 [Android 发布说明](https://github.com/ait-app/ait/blob/main/docs/operations/android-releases.md)。

> 当前源码文档记录：账户入口与登录表单已经过实体设备验证；真实账户到远程电脑的完整中继流程尚未完成真机验收。请以最新产品文档与 Release 为准。

## iOS

iOS 支持账户登录、中继与直接连接。在 **在线服务 → 登录 / 注册** 中，通过系统认证窗口完成托管登录。源码提供真机与模拟器构建入口，安装前请阅读 [Apple 构建说明](https://github.com/ait-app/ait/blob/main/docs/operations/apple-builds.md)；账户配置与真机验证要求见[统一登录说明](https://github.com/ait-app/ait/blob/main/docs/operations/authing-client-login.md)。

从 Ait 仓库根目录运行模拟器构建：

```sh
npm run build:ios:simulator
```

iOS simulator 可通过 loopback 访问宿主服务。真机需要能够访问工作主机，不能使用真机自身的 `127.0.0.1` 指代电脑。

## Web

这里的宣传网站与 Agent Web 客户端分别运行。账户控制台可以在 `/client/` 提供 Web 客户端；此构建共享控制台登录，使用在线服务连接。说明见 [Web 控制台客户端](https://github.com/ait-app/ait/blob/main/docs/decisions/clients/adr-132-web-console-client.md)。

运行源码中的本地 Web 客户端，请在 Ait 仓库根目录执行：

```sh
npm ci
export AIT_SERVER_TOKEN="$(openssl rand -hex 32)"
npm run dev:mobile
```

打开 `http://localhost:8081`，添加直接连接，Host 填写 `127.0.0.1`，端口 `7316`，令牌填写当前终端的 `AIT_SERVER_TOKEN`。

开发脚本构建共享依赖和 daemon，配置本机页面来源，再启动 Expo Web。此本地开发构建使用直接连接；控制台账户登录需要控制台专用构建。认证与来源配置见[服务配置](/zh/docs/configuration/)。

## 能力速查

| 平台 | 本机运行 daemon | 账户 / Relay | 直接连接 |
| --- | --- | --- | --- |
| macOS / Linux 桌面 | 支持 | 支持 | 支持 |
| Android | 不支持 | 支持，验收边界见上文 | 支持 |
| iOS | 不支持 | 支持，见统一登录说明 | 支持 |
| Web 控制台客户端 | 不支持 | 支持，控制台构建 | 不支持 |
| 本地 Web 客户端 | 需要独立服务 | 不支持 | 支持 |
