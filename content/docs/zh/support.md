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

## 参加 Ait 测试

**Android / Google Play 封闭式测试**：将你在 Google Play 使用的 Google 账号邮箱发送至 **[support@ait-app.com](mailto:support@ait-app.com)**，注明申请 Android 封测。获得资格后，使用同一账号打开[加入 Ait 封闭测试](https://play.google.com/apps/testing/dev.ait.mobile)，选择加入测试并安装。打开链接不会自动获得测试资格；已参加内部测试的账号需先退出内部测试。

**iOS / iPadOS**：通过[平台支持](/zh/docs/platforms/)中的 TestFlight 公开邀请加入，无需先邮件申请。各平台的安装步骤与参加条件也可在该页面查看。

## 反馈时提供什么

为了方便排查，请提供：

- Ait 版本与安装来源，例如 TestFlight、Google Play、GitHub 或源码构建。
- 设备型号、操作系统版本；远程连接时，也请提供工作主机的系统信息。
- 预期结果、实际现象和复现步骤。
- 相关的连接方式（本地、直接连接或账户中继）及 Agent 供应商。
- 错误信息或截图，请先移除密码、访问令牌、个人信息和私人项目内容。

确有需要时，只发送相关日志片段。不要发送整个项目目录、账户密码、验证码或 API Key。可复现的产品问题也可以提交到 [GitHub Issues](https://github.com/ait-app/ait/issues)；Issue 是公开的，账户与隐私申请请通过邮件处理。

## 导出应用诊断

在设置中打开 **应用诊断**，运行诊断后导出 `.txt` 报告。桌面与浏览器会下载文件，Android / iOS 会打开系统分享面板。反馈时附上故障发生时间，方便匹配记录。

报告会尝试移除常见凭据和私人字段，分享前仍应检查内容。诊断不会自动上传，也不会自动创建公开 Issue。显示 `unavailable`、`truncated` 或 `timeout` 表示证据不完整，不代表检查通过。

daemon 自动收集的本地故障证据最多保留 7 天、20 份、5 MiB，可能因容量限制提前清理；主动导出的文件由你管理。故障发生后请尽快导出。更多范围说明见[诊断手册](https://github.com/ait-app/ait/blob/main/docs/operations/diagnostics.md)。

## 常见问题

### 找不到工作电脑

确认电脑处于唤醒状态、网络正常，且已启用主机同步。两台设备应登录同一 Ait 账户并使用相同服务地址；默认账户 API 为 `https://aitapp.cn/api`。主机列表不显示当前机器。曾手动停止同步时，需要重新启用并刷新列表，具体步骤见[连接与数据](/zh/docs/connection/)。

只保留本地 daemon 运行，不保证桌面退出后账户中继仍然在线。需要独立运行的 Linux / macOS 主机，请按[无人值守配置](/zh/docs/configuration/)完成机器授权与启动。

### 直接连接失败

检查主机地址、端口和 daemon 访问令牌。`127.0.0.1` 指向当前设备本身，手机需要填写能访问工作电脑的地址。网络与监听设置见[服务配置](/zh/docs/configuration/)。请勿向客服发送令牌。

### Agent 不可用或要求登录

先在工作电脑的终端确认对应 CLI 能独立运行并已登录，再查看应用诊断中的程序版本与错误。安装、升级或修改程序路径后，重启工作主机的 daemon；只重开手机页面不会更新主机环境。

模型、模式与权限选项来自当前 Provider，不同 CLI 版本可能不同。OpenCode 首次启动需要初始化目录；DeepSeek Harness 的 Web 与桌面 profile 可能配置不同；Antigravity 需要 AGY CLI。各自步骤见 [Agent 接入](/zh/docs/providers/)。Ait 账户与 Agent 供应商登录分别管理，模型订阅、额度与计费由供应商管理。

### 切到后台后连接断开

新版 Android / iOS 客户端会尝试保留账户中继连接与下载最多 2 分钟，再暂停网络活动；系统可能更早挂起应用。回到前台后会重新验证和连接。工作电脑需保持唤醒，主机上的 Agent 不会因为手机断线就自动取消。

恢复后先查看会话状态，避免因不确定上一条消息是否送达而重复发送。若前台也持续断线，请导出诊断，并提供两端版本、连接方式和故障时间。

### 无法登录或账户已到期

如登录服务提供密码找回或联系方式验证，请先使用对应流程。Ait 账户访问或到期问题，可通过邮件联系支持，并提供注册邮箱或手机号。不要发送密码或验证码。

### 想删除账户或数据

请按[账户与数据删除指引](/zh/privacy/#data-deletion)发起申请。退出登录或卸载应用不会删除在线账户，也不会删除工作电脑上的项目数据。

## 继续查阅

- [快速开始](/zh/docs/)：安装与第一个工作区。
- [平台支持](/zh/docs/platforms/)：各平台能力与安装方式。
- [连接与数据](/zh/docs/connection/)：账户中继、直接连接与凭据存储。
- [隐私政策](/zh/privacy/)：Ait 处理的数据及隐私申请方式。
