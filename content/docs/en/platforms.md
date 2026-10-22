---
title: Platform support
description: Installation and current connection capabilities on desktop, Android, iOS, and Web.
lang: en
slug: platforms
group: start
order: 2
---

Ait’s desktop, Web, and mobile clients reuse a shared interface and Rust protocol. Installation and connection methods differ by platform. Use the current capabilities below to choose your entry point.

## TestFlight / Google Play beta testing

### iPhone and iPad

[Join the Ait TestFlight beta](https://testflight.apple.com/join/fjc7g46u) through the public invitation link. You do not need to request access by email first.

1. Install Apple's TestFlight on your iPhone or iPad.
2. Open the invitation link on the same device, accept the invitation, and install Ait.
3. Install Ait and configure an agent on your working computer, then connect from your mobile device.

Available builds and tester spaces are shown in TestFlight. If you cannot join or install the beta, contact [support@ait-app.com](mailto:support@ait-app.com).

### Google Play closed testing

The Google Play version targets adults aged 18 and over; regional content ratings may require a higher age.

1. Send the **Google account email address** you use for Google Play to **[support@ait-app.com](mailto:support@ait-app.com)** and mention that you are requesting Android closed-test access.
2. Once you have access, use that same Google account to open [Join the Ait closed test](https://play.google.com/apps/testing/dev.ait.mobile).
3. Choose to join the test on the Google Play page, then follow its instructions to install Ait.

The closed test currently uses an email list; opening the link does not grant access automatically. Availability depends on your Play account country or region and device compatibility. If you cannot join, check that you are signed in with the approved Google account. If you previously joined the internal test, leave it on its original testing page before joining the closed test through the link above.

## Desktop

Official [GitHub releases](https://github.com/ait-app/ait/releases/latest) provide installers for Apple Silicon macOS and Linux x86_64. The desktop shell includes the daemon and manages its lifecycle.

For Apple Silicon Macs in China, use the [China download mirror (DMG, v0.1.15)](https://ait-release-1251719274.cos.ap-shanghai.myqcloud.com/v0.1.15/Ait-0.1.15-macos-arm64.dmg).

Desktop supports account sign-in and online host connections as well as local workspaces. The download page does not offer unverified Windows or Intel Mac installers.

Linux x86_64 or Apple Silicon macOS hosts without a desktop environment can install the [standalone daemon](/en/docs/daemon/) and join your account in unattended mode.

## Android

Android connects to a working computer as a client. It does not run a daemon on the phone or publish the phone as a working host.

Open **Online service → Sign in / Register**, complete sign-in in the system browser, and return to Ait. Use the same account and service as the desktop app, then choose an online computer. See [Connections & data](/en/docs/connection/) for host synchronization.

Newer clients try to retain account relay connections and downloads for up to two minutes in the background before pausing network activity. The operating system may suspend the app sooner. Connections resume in the foreground; see [Connections & data](/en/docs/connection/). For source builds, see the [mobile guide](https://github.com/ait-app/ait/blob/main/apps/mobile/README.md) and [Android release guide](https://github.com/ait-app/ait/blob/main/docs/operations/android-releases.md).

> Available store test builds, regions, and features follow their release notes. For sign-in or relay problems, include your app version and device details when contacting [support](/en/docs/support/).

## iOS

iOS supports account sign-in and relay connections as well as direct connections. Open **Online service → Sign in / Register** to complete hosted sign-in in the system authentication window. Source builds support devices and simulators. Read the [Apple build guide](https://github.com/ait-app/ait/blob/main/docs/operations/apple-builds.md) before installation and the [sign-in guide](https://github.com/ait-app/ait/blob/main/docs/operations/authing-client-login.md) for account setup and device verification.

From the Ait repository root, build for the simulator:

```sh
npm run build:ios:simulator
```

The iOS simulator can access the host through loopback. Direct connections from a physical device need a reachable computer address; `127.0.0.1` refers to the phone itself. Account relay does not require a local host address. Newer iOS clients use the same background connection window as Android; see [Connections & data](/en/docs/connection/).

## Web

Open the **[Ait Web app](https://aitapp.cn/)** and sign in with the same Ait account as your desktop app to connect to an online host and continue in your browser. No client installation is needed on this device; the computer running your agents must stay online.

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
| Standalone daemon (Linux / macOS) | Yes | Yes | Yes |
| Android | No | Yes | Yes |
| iOS / iPadOS | No | Yes | Yes |
| Web console client | No | Yes; console build | No |
| Local Web client | Requires a separate service | No | Yes |
