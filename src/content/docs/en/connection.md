---
title: Connections & data
description: Working hosts, account relay, direct connections, and where credentials and data are stored.
lang: en
slug: connection
group: workflow
order: 5
---

Ait separates execution from access. The working host runs the daemon and agents. Clients connect to that host to access workspaces and conversations.

## Connect through an account

Desktop, Android, and iOS use `https://aitapp.cn:8443/api` as the default account service. The Web client in an account console uses that console’s same-origin `/api` service.

1. Open **Online service → Sign in / Register** on the working computer. Complete hosted sign-in and return to Ait.
2. Check that the working host is synchronized with the online service. If synchronization was stopped, enable it in the host’s connection settings.
3. Sign in to the same account and service on another desktop device, Android, or iOS. Open **Online service** or **Add Host**.
4. Select the working computer from the online host list and add it to your saved hosts.

The host list refreshes periodically and does not show the current machine. Mobile devices are clients and do not publish the phone as a working host. Hosted sign-in uses the system browser on desktop and Android and the system authentication window on iOS. See [Platform support](/en/docs/platforms/) for current mobile verification boundaries.

For a self-hosted account service, enter its API base address in **Service settings**. An empty field uses the default. `/hosts` is a management page, not an API base address. Saved accounts continue using their originally configured service address.

## Direct connections

Desktop and mobile clients can use direct connections; the local development Web client also uses this method. The Web client integrated into the account console provides online-service connections instead. A direct connection needs the host address, port, and daemon access token.

The default local development listener is `127.0.0.1:7316`. That address only works on the corresponding host; another device needs a reachable host address. See [Server configuration](/en/docs/configuration/) for listener and browser Origin settings.

## Separate credentials

- **Ait connection tokens** authenticate clients to the daemon.
- **Agent service credentials** are saved by native programs such as Codex, Claude Code, and OpenCode to access their services.
- **Account credentials** use platform secure storage. If secure storage is unavailable, a restart requires signing in again.

Browsers first exchange a short-lived, one-time connection ticket before upgrading to WebSocket. The service Bearer token is not placed in the URL.

## Data stays on the working host

Project files and agent runtimes stay on the working host. The desktop’s default service data directory is `~/.ait-server-desktop`; the standalone daemon defaults to `~/.ait-server`.

Local execution does not mean model requests never leave the network. Agents communicate with their providers according to their own configuration. Consult the provider’s data policy when using remote models. Remote clients read files and conversations through the chosen connection method.

## Disconnect and reconnect

WebSocket subscriptions belong to the current connection. They are released on disconnect and must be renewed after reconnecting. Android pauses its connection in the background and revalidates the account node on returning to the foreground.

Read the [daemon manual](https://github.com/ait-app/ait/blob/main/docs/operations/daemon.md) for the protocol, shutdown behavior, and data directories.
