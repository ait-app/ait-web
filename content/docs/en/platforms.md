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

Official [GitHub releases](https://github.com/ait-app/ait/releases/latest) provide Apple Silicon macOS, Linux x86_64, and Windows x64 installers, plus `SHA256SUMS` to verify downloads. The macOS and Linux desktop apps start their bundled daemon automatically.

### macOS Apple Silicon

Open the DMG, drag Ait into Applications, and launch it. You can also download the ZIP, extract it, and move Ait to Applications. For mainland China, use the [China download mirror (DMG, v0.2.26)](https://download.aitapp.cn/v0.2.26/Ait-0.2.26-macos-arm64.dmg).

### Linux x86_64

- **Arch Linux (AUR)**: run `paru -S ait-bin` or `yay -S ait-bin` for the [prebuilt stable package](https://aur.archlinux.org/packages/ait-bin), published by CI. To build from `main`, use `paru -S ait-git` ([source package](https://aur.archlinux.org/packages/ait-git)).
- **Debian / Ubuntu (.deb)**: in the download directory, run `sudo apt install ./Ait-*-linux-amd64.deb`.
- **Fedora / RHEL (.rpm)**: in the download directory, run `sudo dnf install ./Ait-*-linux-x86_64.rpm`.
- **AppImage / tar.gz**: make the AppImage executable with `chmod +x Ait-linux-x86_64.AppImage` and run `./Ait-linux-x86_64.AppImage`. Or extract the tarball with `tar -xzf Ait-*-linux-x64.tar.gz` and run `./Ait` inside the extracted directory. Keep only one matching version in the download directory.

ait-bin, .deb, and .rpm packages install the `bubblewrap >= 0.8.0` dependency. For ait-git, AppImage, or tar.gz, install that version or newer yourself and ensure your system permits unprivileged user namespaces for sandboxed worktrees. Your distribution’s repositories need to provide the dependency versions required by the selected package.

### Windows x64

The Windows desktop client connects to the working host through Online Service, Direct connection, or Remote SSH. It runs without a local daemon. For a headless Linux x86_64 host or an always-on Apple Silicon Mac, see the [standalone daemon](/en/docs/daemon/).

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

Open the **[Ait for Web](https://aitapp.cn/)** and sign in with the same Ait account as your desktop app to connect to an online host and continue in your browser. No client installation is needed on this device; the computer running your agents must stay online.

This marketing website is separate from the Agent Web client. The current client deploys as a separate static image at the site root `/`, sharing same-origin sign-in and `/api`. The management console lives at `/dash`. See [ADR-188](https://github.com/ait-app/ait/blob/main/docs/decisions/clients/adr-188-standalone-web-client-image.md).

Local Web development uses direct connections. See [Local development](/en/docs/development/) for prerequisites, startup commands, tokens, browser origins, and the hosted build.

## At a glance

| Platform | Runs a local daemon | Account connection | Direct connection |
| --- | --- | --- | --- |
| macOS / Linux desktop | Yes | Yes | Yes |
| Windows desktop | No | Yes | Yes |
| Standalone daemon (Linux / macOS) | Yes | Yes | Yes |
| Android | No | Yes | Yes |
| iOS / iPadOS | No | Yes | Yes |
| Hosted Web client | No | Yes; console build | No |
| Local Web client | Requires a separate service | No | Yes |
