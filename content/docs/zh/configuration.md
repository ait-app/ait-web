---
title: 服务配置
description: 启动独立 daemon，设置监听、数据目录和本机浏览器来源。
lang: zh
slug: configuration
group: reference
order: 6
---

桌面应用会管理它自带的 daemon。只有独立服务、源码开发或自定义连接需要阅读下面的配置。

## 启动独立服务

从 Ait 源码仓库根目录运行：

```sh
export AIT_SERVER_TOKEN="$(openssl rand -hex 32)"
cargo run -p daemon --bin daemon -- --listen 127.0.0.1:7316
```

认证凭据只从 `AIT_SERVER_TOKEN` 读取，要求 32–256 字节可见 ASCII，无空格。不会从命令行、URL、TOML 或 `.env` 自动加载服务凭据。

## 常用配置项

| 参数 | 环境变量 | 默认值 |
| --- | --- | --- |
| `--data-dir` | `AIT_SERVER_DATA_DIR` | `~/.ait-server` |
| `--listen` | `AIT_SERVER_LISTEN` | `127.0.0.1:7316` |
| `--config` | 无 | 数据目录中的 `config.toml` |
| `--log-level` | `AIT_SERVER_LOG_LEVEL` | `info` |
| `--web-origin` | 无 | 不添加浏览器来源 |

配置优先级为命令行、环境变量、TOML、默认值。数据目录不接受 TOML 覆盖。显式指定的配置文件必须存在，未知字段与无效内容会拒绝启动。

## 本机浏览器来源

浏览器来源需要显式配置 HTTP loopback origin，包含端口且不带路径。下面适用于本机 Expo Web 开发客户端：

```toml
listen = "127.0.0.1:7316"
log_level = "info"
web_origins = ["http://localhost:8081", "http://127.0.0.1:8081"]
```

也可以重复传入 `--web-origin`。宣传站域名不是 Agent 客户端来源；不要把官网与本地 Web 客户端混为一谈。

## 检查服务状态

```sh
curl http://127.0.0.1:7316/readyz
curl -H "Authorization: Bearer $AIT_SERVER_TOKEN" \
  http://127.0.0.1:7316/v1/server/info
```

`/healthz` 是存活检查，`/readyz` 是就绪检查。服务信息与 WebSocket 需要认证，客户端还需完成协议协商。

## 指定 Provider 程序

```sh
export AIT_SERVER_CODEX_BIN=/absolute/path/to/codex
export AIT_SERVER_CLAUDE_BIN=/absolute/path/to/claude
export AIT_SERVER_OPENCODE_BIN=/absolute/path/to/opencode
```

这些变量选择工作主机上的原生可执行文件。Provider 的认证与能力说明见 [Agent 接入](/zh/docs/providers/)。
