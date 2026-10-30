---
title: Server configuration
description: Start a standalone daemon and configure its listener, data directory, and local browser origins.
lang: en
slug: configuration
group: reference
order: 6
---

The macOS / Linux desktop app manages its bundled daemon; Windows connects to remote hosts. This page follows the current source and covers standalone services, source development, and custom connections. See [Local development](/en/docs/development/) for the toolchain and startup entry points, and [Standalone daemon](/en/docs/daemon/) for differences in older releases.

## Local or direct-connection service

Run from the Ait source repository root:

```sh
export AIT_SERVER_TOKEN="$(openssl rand -hex 32)"
cargo run -p daemon --bin daemon -- --listen 127.0.0.1:7316
```

This example explicitly sets the local API credential. All startup paths prefer `AIT_SERVER_TOKEN`, which must contain 32–256 bytes of visible ASCII without spaces. Without it, the daemon generates and reuses `<data-dir>/local-api.token` with `0600` permissions. Local API credentials are not automatically loaded from command arguments, URLs, TOML, or `.env` files.

## Unattended mode

Standalone and desktop-bundled daemons share machine authorization and host publication. On Linux or macOS, sign in and use `run` to keep the host online. The current source has removed `--headless`. We recommend the released [standalone daemon](/en/docs/daemon/), whose guide covers download, verification, installation, running, and keeping it running with tmux, systemd, or launchd. You can also build and run from the Ait source root:

```sh
cargo build --locked --release -p daemon --bin daemon
./target/release/daemon login
./target/release/daemon run
```

Use the same system user and data directory for sign-in and execution. The first sign-in displays a web address and verification code; complete authorization in a browser. Later `run` starts restore valid machine authorization. Stop a daemon using the same data directory before signing in or out.

An authorized daemon connects to the official account center at `https://aitapp.cn/api` and requires its machine authorization service. Without `AIT_SERVER_TOKEN`, the first start generates `<data-dir>/local-api.token` and subsequent starts reuse it. An explicit environment variable takes priority without overwriting that file. The local token and machine authorization are separate credentials.

Use your operating system’s process manager for persistent background operation. There is no `service install` subcommand. See the [headless daemon manual](https://github.com/ait-app/ait/blob/main/docs/operations/headless-daemon.md) for configuration and reauthorization.

## Common settings

| Argument | Environment variable | Default |
| --- | --- | --- |
| `--data-dir` | `AIT_SERVER_DATA_DIR` | `~/.ait-server` |
| `--listen` | `AIT_SERVER_LISTEN` | `127.0.0.1:7316` |
| `--config` | None | `config.toml` in the data directory, skipped if absent |
| `--log-level` | `AIT_SERVER_LOG_LEVEL` | `info` |
| `--web-origin` | None | No additional browser origins |

Configuration priority is command arguments, environment, TOML, then defaults. The data directory cannot be overridden through TOML. An explicitly selected configuration file must exist. Unknown fields and invalid values prevent startup.

## Local browser origins

Explicitly configure HTTP loopback origins with a port and no path. This example is for the local Expo Web development client:

```toml
listen = "127.0.0.1:7316"
log_level = "info"
web_origins = ["http://localhost:8081", "http://127.0.0.1:8081"]
```

Alternatively, pass `--web-origin` more than once. Marketing domains are not Agent client origins. This website is separate from the local Web client.

## Check service readiness

```sh
curl http://127.0.0.1:7316/readyz
curl -H "Authorization: Bearer $AIT_SERVER_TOKEN" \
  http://127.0.0.1:7316/v1/server/info
```

`/healthz` checks liveness; `/readyz` checks readiness. Server information and WebSocket access require authentication, and clients must complete protocol negotiation. The authenticated example uses the explicitly configured environment variable. When it is unset, use the local API token saved in that data directory instead.

## Select provider executables

```sh
export AIT_SERVER_CODEX_BIN=/absolute/path/to/codex
export AIT_SERVER_CLAUDE_BIN=/absolute/path/to/claude
export AIT_SERVER_OPENCODE_BIN=/absolute/path/to/opencode
export AIT_SERVER_DEEPSEEK_HARNESS_BIN=/absolute/path/to/dsh
export AIT_SERVER_ANTIGRAVITY_BIN=/absolute/path/to/agy
export AIT_SERVER_PI_BIN=/absolute/path/to/pi
export AIT_SERVER_OMP_BIN=/absolute/path/to/omp
export AIT_SERVER_MINIMAX_CODE_BIN=/absolute/path/to/mcode
```

Set only the variables you need, replace the example paths, and restart the daemon. See [Agent setup](/en/docs/providers/) for authentication and capabilities.

## Connect an MCP client

With MCP enabled, the daemon provides `/mcp/agents` on its own listener, for example `http://127.0.0.1:7316/mcp/agents`. Configure the endpoint explicitly in your MCP client and supply the local API token in an `Authorization: Bearer` header.

This endpoint manages agents, workspaces, terminals, and schedules. New configurations enable MCP and agent injection by default: Codex, Claude, DSH ACP, and MiniMax Code can receive a dedicated runtime connection when a native session opens. Existing explicit opt-outs remain disabled, and other providers keep their own configuration. External MCP clients connect explicitly as described above. See the [MCP manual](https://github.com/ait-app/ait/blob/main/docs/operations/mcp.md) for activation timing, optional Unix sockets, and tool parameters.
