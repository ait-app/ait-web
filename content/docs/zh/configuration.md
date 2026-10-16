---
title: 服务配置
description: 启动独立 daemon，设置监听、数据目录和本机浏览器来源。
lang: zh
slug: configuration
group: reference
order: 6
---

桌面应用会管理它自带的 daemon。只有独立服务、源码开发或自定义连接需要阅读下面的配置。

## 本机或直接连接服务

从 Ait 源码仓库根目录运行：

```sh
export AIT_SERVER_TOKEN="$(openssl rand -hex 32)"
cargo run -p daemon --bin daemon -- --listen 127.0.0.1:7316
```

这种普通启动模式从 `AIT_SERVER_TOKEN` 读取凭据，要求 32–256 字节可见 ASCII，无空格。不会从命令行、URL、TOML 或 `.env` 自动加载本地 API 凭据。下面的 headless 模式有独立的自动生成与持久保存机制。

## 无人值守在线主机

Linux 或 macOS 主机可独立接入账户中继，不需要启动桌面界面。从 Ait 源码根目录构建并运行：

```sh
cargo build --locked --release -p daemon --bin daemon
./target/release/daemon login
./target/release/daemon run --headless
```

使用同一个系统用户和数据目录完成登录与运行。首次登录在终端显示网页地址和验证码，在浏览器中完成授权；以后启动 `run --headless` 会恢复有效的机器授权。登录或退出前，先停止使用同一数据目录的 daemon。

此模式连接官方账户中心 `https://aitapp.cn/api`，需要中心提供机器授权服务。未设置 `AIT_SERVER_TOKEN` 时，首次启动生成并保存 `<data-dir>/local-api.token`，后续启动复用。显式环境变量优先，但不覆盖该文件；本地令牌与机器授权是不同凭据。

长时间后台运行使用系统已有的进程管理方式。daemon 没有 `service install` 子命令；配置与重新授权步骤见[无人值守 daemon 手册](https://github.com/ait-app/ait/blob/main/docs/operations/headless-daemon.md)。

## 常用配置项

| 参数 | 环境变量 | 默认值 |
| --- | --- | --- |
| `--data-dir` | `AIT_SERVER_DATA_DIR` | `~/.ait-server` |
| `--listen` | `AIT_SERVER_LISTEN` | `127.0.0.1:7316` |
| `--config` | 无 | 数据目录中的 `config.toml`，不存在则跳过 |
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
export AIT_SERVER_DEEPSEEK_HARNESS_BIN=/absolute/path/to/dsh
export AIT_SERVER_ANTIGRAVITY_BIN=/absolute/path/to/agy
```

只设置需要的变量，替换示例路径，并重启 daemon 使其生效。Provider 的认证与能力说明见 [Agent 接入](/zh/docs/providers/)。

## 从 MCP 客户端连接

启用 MCP 的 daemon 在自身监听地址提供 `/mcp/agents`，例如 `http://127.0.0.1:7316/mcp/agents`。外部 MCP 客户端需显式配置地址，并通过 `Authorization: Bearer` 请求头提供本地 API 令牌。

此入口可用于管理 Agent、工作区、终端与定时任务；它不会自动注入每个 Agent 的原生配置。连接方法与工具参数见 [MCP 手册](https://github.com/ait-app/ait/blob/main/docs/operations/mcp.md)。
