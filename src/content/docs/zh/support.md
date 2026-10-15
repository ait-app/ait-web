---
title: 常见问题与支持
description: 获取 Ait 使用帮助、报告问题、反馈建议，或申请删除账户与数据。
lang: zh
slug: support
group: start
order: 3.5
---

## 联系 Ait 支持

应用故障、账户或连接问题、使用反馈和功能建议，请发送邮件至 **[support@ait-app.com](mailto:support@ait-app.com)**。联系支持无需登录 Ait，也无需注册 GitHub 账户。

隐私问题及账户、数据删除申请，请查看[隐私政策](/zh/privacy/)和[删除申请指引](/zh/privacy/#data-deletion)。

## 申请 App Store / Google Play 内测

想参与 App Store 或 Google Play 内测，请将参加内测的账号邮箱发送至 **[support@ait-app.com](mailto:support@ait-app.com)**，并标注清楚是 **Apple ID（App Store）** 还是 **Google 账号（Google Play）**，以申请内测资格。

获得 Google Play 内测资格后，使用对应 Google 账号打开[内测安装链接](https://play.google.com/apps/internaltest/4699903411589312271)。更多平台与安装说明见[平台支持](/zh/docs/platforms/)。

## 反馈时提供什么

为了方便排查，请提供：

- Ait 版本与安装来源，例如 App Store、Google Play 或 GitHub。
- 设备型号、操作系统版本；远程连接时，也请提供工作主机的系统信息。
- 预期结果、实际现象和复现步骤。
- 相关的连接方式（本地、直接连接或账户中继）及 Agent 供应商。
- 错误信息或截图，请先移除密码、访问令牌、个人信息和私人项目内容。

确有需要时，只发送相关日志片段。不要发送整个项目目录、账户密码、验证码或 API Key。可复现的产品问题也可以提交到 [GitHub Issues](https://github.com/ait-app/ait/issues)；Issue 是公开的，账户与隐私申请请通过邮件处理。

## 常见问题

### 找不到工作电脑

确认电脑处于唤醒状态、网络正常且 Ait 正在运行。使用账户中继时，两台设备应登录同一账户、使用相同服务地址，工作主机也需要在线。刷新主机列表，具体步骤见[连接与数据](/zh/docs/connection/)。

### 直接连接失败

检查主机地址、端口和 daemon 访问令牌。`127.0.0.1` 指向当前设备本身，手机需要填写能访问工作电脑的地址。网络与监听设置见[服务配置](/zh/docs/configuration/)。请勿向客服发送令牌。

### Agent 不可用或要求登录

在工作电脑上安装并登录对应的 Agent CLI。Ait 连接凭据与 Agent 供应商凭据分别管理。各适配器的能力见 [Agent 接入](/zh/docs/providers/)。模型订阅与计费由对应供应商管理。

### 切到后台后连接断开

保持工作电脑处于唤醒状态。移动系统可能暂停后台连接，请回到应用后重新连接。如果反复发生，请在反馈中提供设备与主机版本、连接方式和可见的错误信息。

### 无法登录或账户已到期

如登录服务提供密码找回或联系方式验证，请先使用对应流程。Ait 账户访问或到期问题，可通过邮件联系支持，并提供注册邮箱或手机号。不要发送密码或验证码。

### 想删除账户或数据

请按[账户与数据删除指引](/zh/privacy/#data-deletion)发起申请。退出登录或卸载应用不会删除在线账户，也不会删除工作电脑上的项目数据。

## 继续查阅

- [快速开始](/zh/docs/)：安装与第一个工作区。
- [平台支持](/zh/docs/platforms/)：各平台能力与安装方式。
- [连接与数据](/zh/docs/connection/)：账户中继、直接连接与凭据存储。
- [隐私政策](/zh/privacy/)：Ait 处理的数据及隐私申请方式。
