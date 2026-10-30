---
title: Local development
description: Prepare the Ait toolchain, run desktop, Web, mobile, or a standalone daemon from source, and preview the website documentation locally.
lang: en
slug: development
group: development
order: 8
---

This guide follows the current Ait source documentation. Read [Contributing](/en/docs/contributing/) before making changes; use [Quick start](/en/docs/quick-start/) to install a released application. Except for the final website section, run commands from the `ait` repository root.

## Prepare the toolchain

- Git, **Node.js 24**, and npm.
- The Rust toolchain, `rustfmt`, and Clippy specified by [rust-toolchain.toml](https://github.com/ait-app/ait/blob/main/rust-toolchain.toml). The repository pins its version; rustup selects it when you work inside the checkout.
- CMake and system C/C++ build tools for native dependencies.
- For agent integration, install and authenticate the required CLI on the working host and confirm that it runs independently. See [Agent setup](/en/docs/providers/).

macOS and Linux can run a local daemon. The Windows desktop client ships without a daemon and connects to another host through an account, TCP, or SSH; see the [desktop guide](https://github.com/ait-app/ait/blob/main/apps/desktop/README.md). Native iOS development requires macOS and Xcode. Android requires the Android SDK and its corresponding JDK. See [Apple builds](https://github.com/ait-app/ait/blob/main/docs/operations/apple-builds.md) and [Android builds](https://github.com/ait-app/ait/blob/main/docs/operations/android-releases.md) for platform requirements.

The repository also provides an optional Nix environment. Run `nix develop` to prepare Rust, Node.js, and build tools.

```sh
git clone https://github.com/ait-app/ait.git
cd ait
npm ci
```

Use your fork’s URL when preparing a contribution. Install through the root lockfile rather than creating separate dependency installations in each app.

## Start the desktop app

For a complete local development environment on macOS or Linux:

```sh
npm run dev:desktop
```

The script builds shared packages, the Rust daemon, and the Electron main process, then starts the development interface and desktop app. The first build downloads and compiles native dependencies. Electron manages the daemon it starts and supplies connection authentication to the interface.

After changing Rust, rebuild and restart the corresponding daemon. Refreshing the interface does not replace a running service. See [apps/desktop/README.md](https://github.com/ait-app/ait/blob/main/apps/desktop/README.md) for desktop debugging and packaging.

## Start the local Web client

```sh
export AIT_SERVER_TOKEN="$(openssl rand -hex 32)"
npm run dev:mobile
```

Open `http://localhost:8081` and add a direct connection with Host `127.0.0.1`, port `7316`, and the current terminal’s `AIT_SERVER_TOKEN`. Do not put the token in a URL or an `EXPO_PUBLIC_*` variable.

The entry point builds shared dependencies and the Rust binary, then starts the daemon and Expo. Ctrl+C stops both. Development data defaults to `.tmp/app/server`, separate from the standalone daemon’s default directory.

| Variable              | Purpose                                                              |
| --------------------- | -------------------------------------------------------------------- |
| `AIT_SERVER_DATA_DIR` | Choose a different development data directory                        |
| `AIT_SERVER_BIN`      | Use an already built daemon binary                                   |
| `AIT_SERVER_LISTEN`   | Change the listener address and port; update the connection form too |
| `EXPO_PORT`           | Change the Expo port; use the page address shown at startup          |

Local Web development uses direct connections by default. The account client at `aitapp.cn` uses the dedicated export described below.

## Start the daemon and interface separately

To debug service startup or work with a separate binary, run this in one terminal:

```sh
export AIT_SERVER_TOKEN="$(openssl rand -hex 32)"
cargo run -p daemon --bin daemon -- \
  --data-dir .tmp/app/server --listen 127.0.0.1:7316 \
  --web-origin http://localhost:8081 --web-origin http://127.0.0.1:8081
```

In another terminal at the same repository root:

```sh
npm run build:ui-deps
npm run web:expo --workspace=@ait/mobile -- --localhost --port 8081
```

Use the token generated in the first terminal in the connection form. Browser origins must match `--web-origin`. Browsers exchange the Bearer token for a short-lived, one-time connection ticket. Native clients do not need browser origins configured.

Only one daemon can use a data directory at a time. Stop the previous process before switching launch methods. Give each instance a separate data directory and listener port when debugging concurrently.

The current source uses `daemon login` followed by `daemon run` for standalone operation; the `--headless` flag has been removed. Every startup path generates and reuses a private local token when `AIT_SERVER_TOKEN` is absent. The explicit variable above makes local connection debugging easier. See [Server configuration](/en/docs/configuration/) and [Standalone daemon](/en/docs/daemon/) for settings and differences from released versions.

## Develop for Android and iOS

Start the daemon separately, then choose a target platform:

```sh
npm run ios --workspace=@ait/mobile
# Or
npm run android --workspace=@ait/mobile
```

These entry points build shared dependencies before starting the native project. An iOS simulator can reach the host at `127.0.0.1:7316`. For an Android emulator or connected device, first run:

```sh
adb reverse tcp:7316 tcp:7316
```

Then connect to `127.0.0.1:7316` with the same daemon token. A physical device using a LAN connection needs a reachable computer address and matching listener configuration. Alternatively, sign in to the same account and connect to an online host.

Build a Release simulator app with `npm run build:ios:simulator` from the root. See [Apple builds](https://github.com/ait-app/ait/blob/main/docs/operations/apple-builds.md), [Android releases](https://github.com/ait-app/ait/blob/main/docs/operations/android-releases.md), and the [mobile guide](https://github.com/ait-app/ait/blob/main/apps/mobile/README.md) for signing, distribution, and device validation.

## Build the hosted Web client

```sh
npm run build:web-console --workspace=@ait/mobile
```

The output is `apps/mobile/web-console/dist/`. The client now deploys as a separate static image at the site root `/`, sharing same-origin `/api` and sign-in pages. The management console lives at `/dash`. Running the static image alone can verify routes but does not provide the account API or sign-in service.

See the [client deployment guide](https://github.com/ait-app/ait/blob/main/apps/mobile/README.md) and [ADR-188](https://github.com/ait-app/ait/blob/main/docs/decisions/clients/adr-188-standalone-web-client-image.md) for Docker builds, route checks, and gateway configuration.

## Develop the website and documentation

The website uses Astro in the separate **ait-web** repository and does not require a Rust build. It needs Node.js 22.12 or newer; Node.js 24 also meets that requirement.

```sh
git clone https://github.com/ait-app/ait-web.git
cd ait-web
npm ci
npm run dev
```

Open `http://localhost:4321/zh/docs/` or `http://localhost:4321/en/docs/`. Content lives in `content/docs/{zh,en}/`; keep both languages in sync. Before submitting, run:

```sh
npm run check
npm run build
npm run verify
```

These commands check Astro and TypeScript, generate static pages, and validate links, anchors, bilingual completeness, search, and other site content. Preview the pages and check navigation, narrow screens, language switching, and code blocks. See the [ait-web README](https://github.com/ait-app/ait-web/blob/main/README.md) for maintenance details and [Contributing](/en/docs/contributing/) for product validation and the PR process.
