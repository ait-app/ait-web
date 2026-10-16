---
title: 平台支持
description: 桌面、Android、iOS 与 Web 的安装方式，以及当前连接能力。
lang: zh
slug: platforms
group: start
order: 2
---

Ait 的桌面、Web 与移动端复用共享界面和 Rust 协议。不同平台的安装与连接方式有所区别，请按下面的当前能力选择入口。

## TestFlight / Google Play 测试

### iPhone 和 iPad

通过公开邀请链接[加入 Ait TestFlight 测试](https://testflight.apple.com/join/fjc7g46u)，无需先通过邮件申请资格。

1. 在 iPhone 或 iPad 上安装 Apple 的 TestFlight。
2. 用同一台设备打开上方邀请链接，接受邀请并安装 Ait。
3. 在工作电脑安装 Ait 并配置 Agent，再从移动端连接电脑。

可安装的版本和剩余名额以 TestFlight 邀请页为准。遇到加入或安装问题，请联系 [support@ait-app.com](mailto:support@ait-app.com)。

### Android

Google Play 内测仍需申请资格：将参加测试的 **Google 账号邮箱**发送至 **[support@ait-app.com](mailto:support@ait-app.com)**，并注明申请 Google Play 内测。

获得资格后，使用该 Google 账号打开[加入 Ait 内测](https://play.google.com/apps/internaltest/4699903411589312271)并安装。

## 桌面

官方 [GitHub Release](https://github.com/ait-app/ait/releases/latest) 提供 Apple Silicon macOS 和 Linux x86_64 安装包。桌面壳内置 daemon，并管理本机服务生命周期。

macOS Apple Silicon 用户也可以使用[国内加速下载（DMG，v0.1.3）](https://ait-release-1251719274.cos.ap-shanghai.myqcloud.com/Ait-0.1.3-macos-arm64.dmg)。

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
