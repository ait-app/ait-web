---
title: Troubleshooting & support
description: Get help with Ait, report a problem, share feedback, or request account and data deletion.
lang: en
slug: support
group: start
order: 3.5
---

## Contact Ait support

Email **[support@ait-app.com](mailto:support@ait-app.com)** for app issues, account or connection help, general feedback, and feature requests. You can contact us without signing in to Ait or creating a GitHub account.

For privacy questions and account or data deletion, see the [Privacy policy](/en/privacy/) and [deletion instructions](/en/privacy/#data-deletion).

## Join the Ait beta

**Android / Google Play closed testing**: Send the Google account email address you use for Google Play to **[support@ait-app.com](mailto:support@ait-app.com)** and request Android closed-test access. Once approved, use that same account to [join the Ait closed test](https://play.google.com/apps/testing/dev.ait.mobile), opt in, and install the app. Opening the link does not grant access automatically. If you are in the internal test, leave it before joining the closed test.

**iOS / iPadOS**: Join through the public TestFlight invitation in [Platform support](/en/docs/platforms/); no email request is needed. That page also explains installation steps and eligibility for each platform.

## Before sending a report

Include the following so we can investigate:

- Your Ait version and installation source, such as TestFlight, Google Play, GitHub, or a source build.
- Your device model and operating system version; for remote connections, include the working host’s system too.
- What you expected, what happened, and the steps to reproduce the problem.
- The connection method (local, direct, or account relay) and the agent provider, when relevant.
- Error messages or screenshots with passwords, access tokens, personal information, and private project content removed.

Send a relevant log excerpt only if needed. Do not email entire project directories, account passwords, verification codes, or API keys. You can also report reproducible product bugs in the [GitHub issue tracker](https://github.com/ait-app/ait/issues); issues are public, so keep account and privacy requests in email.

## Export app diagnostics

Open **App diagnostics** in Settings, run diagnostics, and export the `.txt` report. Desktop and browser clients download a file; Android and iOS open the system share sheet. Include the time of the problem so the report can be matched to the incident.

Reports try to remove common credentials and private fields, but review the content before sharing it. Diagnostics are not uploaded automatically and do not create public issues. `unavailable`, `truncated`, or `timeout` indicates incomplete evidence, not a successful check.

The daemon keeps automatic local incident evidence for up to seven days, with limits of 20 files and 5 MiB; capacity limits may remove it sooner. Files you export are under your control. Export soon after a failure. See the [diagnostics manual](https://github.com/ait-app/ait/blob/main/docs/operations/diagnostics.md) for collection details.

## Common questions

### My working computer does not appear

Check that the working computer is awake, connected to the network, and has host synchronization enabled. Both devices must use the same Ait account and service address; the default account API is `https://aitapp.cn/api`. The host list excludes the current machine. If you stopped synchronization manually, enable it again and refresh the list. See [Connections & data](/en/docs/connection/) for setup details.

Keeping only the local daemon running does not guarantee that account relay remains online after quitting the desktop app. For an independent Linux or macOS host, follow the [headless setup](/en/docs/configuration/) to authorize the machine and start the service.

### A direct connection fails

Check the host address, port, and daemon access token. `127.0.0.1` refers to the device you are currently using; a phone needs an address that can reach the working computer. Check network and listener settings in [Server configuration](/en/docs/configuration/). Never send your token to support.

### An agent is unavailable or asks me to sign in

First check that the CLI can run independently in the working computer’s terminal and is signed in, then inspect its version and errors in app diagnostics. Restart the host daemon after installing, upgrading, or changing an executable path. Reopening the phone app does not update the host environment.

Models, modes, and permission options come from the current provider and may differ by CLI version. OpenCode initializes its catalog on first launch; DeepSeek Harness Web and desktop profiles may have different settings; Antigravity requires the AGY CLI. See [Agent setup](/en/docs/providers/) for each integration. Your Ait account and provider sign-in are separate. Model subscriptions, quotas, and billing are managed by the provider.

### The connection drops when I leave the app

Newer Android and iOS clients try to retain account relay connections and downloads for up to two minutes before pausing network activity; the operating system may suspend the app sooner. Connections are revalidated when you return. Keep the working computer awake. Disconnecting the phone does not automatically cancel the agent on that host.

Check the session after reconnecting before resending a message whose delivery was uncertain. If connections also keep dropping in the foreground, export diagnostics and include both versions, the connection method, and the time of the failure.

### I cannot sign in, or my account has expired

Use the sign-in service’s password recovery or contact verification flow where available. For Ait account access or expiry issues, email support with your registered email address or phone number. Do not include passwords or verification codes.

### I want to remove my account or data

Follow the [account and data deletion instructions](/en/privacy/#data-deletion). Signing out or uninstalling the app does not delete an online account or project data on your working computer.

## More help

- [Quick start](/en/docs/): installation and your first workspace.
- [Platform support](/en/docs/platforms/): platform capabilities and installation options.
- [Connections & data](/en/docs/connection/): account relay, direct connections, and credential storage.
- [Privacy policy](/en/privacy/): what Ait processes and how to make a privacy request.
