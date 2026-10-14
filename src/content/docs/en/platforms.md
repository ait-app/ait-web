---
title: Platform support
description: Installation and current connection capabilities on desktop, Android, iOS, and Web.
lang: en
slug: platforms
group: start
order: 2
---

Ait’s desktop, Web, and mobile clients reuse a shared interface and Rust protocol. Installation and connection methods differ by platform. Use the current capabilities below to choose your entry point.

## Desktop

Official [GitHub releases](https://github.com/ait-app/ait/releases/latest) provide installers for Apple Silicon macOS and Linux x86_64. The desktop shell includes the daemon and manages its lifecycle.

Desktop supports account sign-in and online host connections as well as local workspaces. The download page does not offer unverified Windows or Intel Mac installers.

## Android

Android connects to a working computer as a client. It does not run a daemon on the phone or publish the phone as a working host.

Open **Online service → Sign in / Register**, complete sign-in in the system browser, and return to Ait. Use the same account and service as the desktop app, then choose an online computer. See [Connections & data](/en/docs/connection/) for host synchronization.

Connections pause in the background and resume in the foreground. See the [mobile guide](https://github.com/ait-app/ait/blob/main/apps/mobile/README.md) and [Android release guide](https://github.com/ait-app/ait/blob/main/docs/operations/android-releases.md) for implementation boundaries and build commands.

> The source documentation records physical-device verification of the account entry and sign-in form. The complete relay flow from a real account to a remote computer has not yet completed physical-device acceptance. Check the latest product documentation and release notes.

## iOS

iOS supports account sign-in and relay connections as well as direct connections. Open **Online service → Sign in / Register** to complete hosted sign-in in the system authentication window. Source builds support devices and simulators. Read the [Apple build guide](https://github.com/ait-app/ait/blob/main/docs/operations/apple-builds.md) before installation and the [sign-in guide](https://github.com/ait-app/ait/blob/main/docs/operations/authing-client-login.md) for account setup and device verification.

From the Ait repository root, build for the simulator:

```sh
npm run build:ios:simulator
```

The iOS simulator can access the host through loopback. A physical device needs network access to the working computer; `127.0.0.1` on the device refers to the device itself.

## Web

This marketing website is separate from the Agent Web client. An account console can host the client at `/client/`; that build shares the console’s sign-in and uses online-service connections. See the [Web console client documentation](https://github.com/ait-app/ait/blob/main/docs/decisions/clients/adr-132-web-console-client.md).

To run the local Web client from source, execute these commands from the Ait repository root:

```sh
npm ci
export AIT_SERVER_TOKEN="$(openssl rand -hex 32)"
npm run dev:mobile
```

Open `http://localhost:8081` and add a direct connection. Enter Host `127.0.0.1`, port `7316`, and the current terminal’s `AIT_SERVER_TOKEN`.

The development script builds shared dependencies and the daemon, configures local page origins, and starts Expo Web. This local development build uses direct connections; console account sign-in requires the console-specific build. See [Server configuration](/en/docs/configuration/) for authentication and allowed origins.

## At a glance

| Platform | Runs a local daemon | Account / relay | Direct connection |
| --- | --- | --- | --- |
| macOS / Linux desktop | Yes | Yes | Yes |
| Android | No | Yes; acceptance boundaries above | Yes |
| iOS | No | Yes; see sign-in guide | Yes |
| Web console client | No | Yes; console build | No |
| Local Web client | Requires a separate service | No | Yes |
