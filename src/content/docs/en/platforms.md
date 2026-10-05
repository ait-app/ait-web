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

On first launch, choose **Account / Relay**. You can also open **Settings → Host → Account and online hosts**, sign in with the same account as the desktop app, and choose an online computer.

Connections pause in the background and resume in the foreground. See the [mobile guide](https://github.com/ait-app/ait/blob/main/apps/mobile/README.md) and [Android release guide](https://github.com/ait-app/ait/blob/main/docs/operations/android-releases.md) for implementation boundaries and build commands.

> The source documentation records physical-device verification of the account entry and sign-in form. The complete relay flow from a real account to a remote computer has not yet completed physical-device acceptance. Check the latest product documentation and release notes.

## iOS

iOS currently uses direct connections and does not provide account sign-in. Source builds support devices and simulators. Read the [Apple build guide](https://github.com/ait-app/ait/blob/main/docs/operations/apple-builds.md) before installation.

From the Ait repository root, build for the simulator:

```sh
npm run build:ios:simulator
```

The iOS simulator can access the host through loopback. A physical device needs network access to the working computer; `127.0.0.1` on the device refers to the device itself.

## Web

This marketing website is separate from the Agent Web client. To run the Web client from source, execute these commands from the Ait repository root:

```sh
npm ci
export AIT_SERVER_TOKEN="$(openssl rand -hex 32)"
npm run dev:mobile
```

Open `http://localhost:8081` and add a direct connection. Enter Host `127.0.0.1`, port `7316`, and the current terminal’s `AIT_SERVER_TOKEN`.

The development script builds shared dependencies and the daemon, configures local page origins, and starts Expo Web. Web does not currently support account sign-in. See [Server configuration](/en/docs/configuration/) for authentication and allowed origins.

## At a glance

| Platform | Runs a local daemon | Account / relay | Direct connection |
| --- | --- | --- | --- |
| macOS / Linux desktop | Yes | Yes | Yes |
| Android | No | Yes; acceptance boundaries above | Yes |
| iOS | No | Not available yet | Yes |
| Web | Requires a separate service | Not available yet | Yes |
