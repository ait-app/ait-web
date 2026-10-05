---
title: Server configuration
description: Start a standalone daemon and configure its listener, data directory, and local browser origins.
lang: en
slug: configuration
group: reference
order: 6
---

The desktop app manages its bundled daemon. The configuration below is for standalone services, source development, or custom connections.

## Start a standalone service

Run from the Ait source repository root:

```sh
export AIT_SERVER_TOKEN="$(openssl rand -hex 32)"
cargo run -p daemon --bin daemon -- --listen 127.0.0.1:7316
```

Credentials are read only from `AIT_SERVER_TOKEN`. The value must contain 32–256 bytes of visible ASCII without spaces. Credentials are not automatically loaded from command arguments, URLs, TOML, or `.env` files.

## Common settings

| Argument | Environment variable | Default |
| --- | --- | --- |
| `--data-dir` | `AIT_SERVER_DATA_DIR` | `~/.ait-server` |
| `--listen` | `AIT_SERVER_LISTEN` | `127.0.0.1:7316` |
| `--config` | None | `config.toml` in the data directory |
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

`/healthz` checks liveness; `/readyz` checks readiness. Server information and WebSocket access require authentication, and clients must complete protocol negotiation.

## Select provider executables

```sh
export AIT_SERVER_CODEX_BIN=/absolute/path/to/codex
export AIT_SERVER_CLAUDE_BIN=/absolute/path/to/claude
export AIT_SERVER_OPENCODE_BIN=/absolute/path/to/opencode
```

These variables select native executables on the working host. Read [Agent setup](/en/docs/providers/) for provider authentication and capabilities.
