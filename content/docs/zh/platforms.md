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

### Google Play 封闭式测试

Google Play 版本面向 18 岁及以上用户；部分地区的内容分级可能要求更高年龄。

1. 将你在 Google Play 使用的 **Google 账号邮箱**发送至 **[support@ait-app.com](mailto:support@ait-app.com)**，注明申请 Android 封闭式测试。
2. 获得测试资格后，使用同一 Google 账号打开 [加入 Ait 封闭测试](https://play.google.com/apps/testing/dev.ait.mobile)。
3. 在 Google Play 页面选择加入测试，再按页面指引安装 Ait。

当前封测使用邮箱名单，打开链接不会自动获得测试资格。可用性受发布国家/地区及设备兼容性限制；如果提示无法参与，请确认登录的是已获资格的 Google 账号。此前参加内部测试的账号，需要先在原测试页面退出内部测试，再通过上面的链接加入封测。

## 桌面

官方 [GitHub Release](https://github.com/ait-app/ait/releases/latest) 提供 Apple Silicon macOS 和 Linux x86_64 安装包。桌面壳内置 daemon，并管理本机服务生命周期。

macOS Apple Silicon 用户也可以使用[国内加速下载（DMG，v0.1.8）](https://ait-release-1251719274.cos.ap-shanghai.myqcloud.com/v0.1.8/Ait-0.1.8-macos-arm64.dmg)。

桌面支持账户登录与在线主机连接，也可以连接本机工作空间。目前下载页不提供未经发布验证的 Windows 或 Intel Mac 安装包。

没有桌面环境的 Linux x86_64 或 Apple Silicon macOS 主机，可以安装[独立 daemon](/zh/docs/daemon/)，以无人值守模式接入账户。

## Android

Android 作为客户端连接工作电脑，不在手机上运行 daemon，也不把手机发布为工作主机。

打开 **在线服务 → 登录 / 注册**，在系统浏览器完成登录并返回 Ait。使用和桌面相同的账户及服务，再选择在线电脑。主机同步步骤见[连接与数据](/zh/docs/connection/)。

新版客户端切到后台后会尝试保留账户中继连接与下载最多 2 分钟，再暂停网络活动；系统可能提前挂起应用。回到前台后恢复连接，详情见[连接与数据](/zh/docs/connection/)。源码构建见 [移动端说明](https://github.com/ait-app/ait/blob/main/apps/mobile/README.md) 和 [Android 发布说明](https://github.com/ait-app/ait/blob/main/docs/operations/android-releases.md)。

> 商店测试版的可安装版本、地区与功能以相应发布说明为准。遇到登录或中继问题，请提供 App 版本和设备信息，通过[支持页面](/zh/docs/support/)反馈。

## iOS

iOS 支持账户登录、中继与直接连接。在 **在线服务 → 登录 / 注册** 中，通过系统认证窗口完成托管登录。源码提供真机与模拟器构建入口，安装前请阅读 [Apple 构建说明](https://github.com/ait-app/ait/blob/main/docs/operations/apple-builds.md)；账户配置与真机验证要求见[统一登录说明](https://github.com/ait-app/ait/blob/main/docs/operations/authing-client-login.md)。

从 Ait 仓库根目录运行模拟器构建：

```sh
npm run build:ios:simulator
```

iOS simulator 可通过 loopback 访问宿主服务。真机直接连接时需要可达的电脑地址，不能使用手机自己的 `127.0.0.1` 指代电脑；通过账户中继连接无需填写本机地址。新版 iOS 客户端采用与 Android 相同的后台连接保留窗口，见[连接与数据](/zh/docs/connection/)。

## Web

打开 **[Ait Web 界面](https://aitapp.cn/)**，登录与桌面端相同的 Ait 账户，即可在浏览器中连接在线主机、继续工作。无需在当前设备安装客户端；运行 Agent 的工作电脑仍需保持在线。

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
| 独立 daemon（Linux / macOS） | 支持 | 支持 | 支持 |
| Android | 不支持 | 支持 | 支持 |
| iOS / iPadOS | 不支持 | 支持 | 支持 |
| Web 控制台客户端 | 不支持 | 支持，控制台构建 | 不支持 |
| 本地 Web 客户端 | 需要独立服务 | 不支持 | 支持 |
