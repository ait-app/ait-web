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

- Your Ait version and installation source, such as App Store, Google Play, or GitHub.
- Your device model and operating system version; for remote connections, include the working host’s system too.
- What you expected, what happened, and the steps to reproduce the problem.
- The connection method (local, direct, or account relay) and the agent provider, when relevant.
- Error messages or screenshots with passwords, access tokens, personal information, and private project content removed.

Send a relevant log excerpt only if needed. Do not email entire project directories, account passwords, verification codes, or API keys. You can also report reproducible product bugs in the [GitHub issue tracker](https://github.com/ait-app/ait/issues); issues are public, so keep account and privacy requests in email.

## Common questions

### My working computer does not appear

Check that the working computer is awake, connected to the network, and running Ait. For account relay, both devices must use the same account and service address, and the working host must be online. Refresh the host list. See [Connections & data](/en/docs/connection/) for setup details.

### A direct connection fails

Check the host address, port, and daemon access token. `127.0.0.1` refers to the device you are currently using; a phone needs an address that can reach the working computer. Check network and listener settings in [Server configuration](/en/docs/configuration/). Never send your token to support.

### An agent is unavailable or asks me to sign in

Install and sign in to the agent CLI on the working computer. Ait connection credentials are separate from your agent provider’s credentials. Check [Agent setup](/en/docs/providers/) for supported capabilities. Model subscriptions and billing are managed by the provider.

### The connection drops when I leave the app

Keep the working computer awake. Mobile platforms may pause a background connection; return to the app and reconnect. If the problem repeats, include your device and host versions, the connection method, and any visible error in your report.

### I cannot sign in, or my account has expired

Use the sign-in service’s password recovery or contact verification flow where available. For Ait account access or expiry issues, email support with your registered email address or phone number. Do not include passwords or verification codes.

### I want to remove my account or data

Follow the [account and data deletion instructions](/en/privacy/#data-deletion). Signing out or uninstalling the app does not delete an online account or project data on your working computer.

## More help

- [Quick start](/en/docs/): installation and your first workspace.
- [Platform support](/en/docs/platforms/): platform capabilities and installation options.
- [Connections & data](/en/docs/connection/): account relay, direct connections, and credential storage.
- [Privacy policy](/en/privacy/): what Ait processes and how to make a privacy request.
