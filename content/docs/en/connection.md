---
title: Connections & data
description: Working hosts, account relay, direct connections, and where credentials and data are stored.
lang: en
slug: connection
group: workflow
order: 5
---

Ait separates execution from access. The working host runs the daemon and agents. Clients connect to that host to access workspaces and conversations. Keep the working computer and its service online for remote access.

## Choose the right address

| Purpose | Address |
| --- | --- |
| Website, downloads, and docs | [ait-app.com](https://ait-app.com/) |
| Account and Web app entry | [aitapp.cn](https://aitapp.cn/) |
| Default account API | `https://aitapp.cn/api` |
| Local development daemon | `127.0.0.1:7316` |

The marketing website is not the account API. The `/hosts` management page is not an API address either.

## Connect through an account

Desktop, Android, and iOS use the account service address configured in the app; check **Service settings** for the current configuration. The hosted Web client runs at the site root and uses same-origin `/api`; the management console lives at `/dash`. The website `https://ait-app.com` provides product information and documentation; it is not an account API address.

1. Open **Online service → Sign in / Register** on the working computer. Complete hosted sign-in and return to Ait.
2. Check that the working host is synchronized with the online service. If synchronization was stopped, enable it in the host’s connection settings.
3. Sign in to the same account and service on another desktop device, Android, or iOS. Open **Online service** or **Add Host**.
4. Select the working computer from the online host list and add it to your saved hosts.

Current clients receive host snapshots and connection availability through the account status channel. The list does not show the current machine. Phones are clients and are not published as working hosts. Hosted sign-in uses the system browser on desktop and Android and the system authentication window on iOS. For browser access, sign in at [aitapp.cn](https://aitapp.cn/) and open the Web client. Account relay does not require the devices to share a local network or the working computer to expose forwarded public ports.

For a self-hosted account service, enter its API base address in **Service settings**. An empty field uses `https://aitapp.cn/api`. Newer clients migrate saved legacy official addresses, including addresses using `:8443`; custom service addresses are preserved. Both devices must use the same service and account.

## Direct connections

Desktop and mobile clients can use direct connections; the local development Web client also uses this method. The hosted Web client provides online-service connections. A direct connection needs the host address, port, and daemon access token.

The default local development listener is `127.0.0.1:7316`. That address only works on the corresponding host; another device needs a reachable host address. See [Server configuration](/en/docs/configuration/) for listener and browser Origin settings.

## Separate credentials

- **Ait connection tokens** authenticate clients to the daemon.
- **Agent service credentials** are saved by native programs such as Codex, Claude Code, and OpenCode to access their services.
- **Account credentials** use platform secure storage in native clients. If secure storage is unavailable, a restart may require signing in again. The Web client uses browser storage to retain sign-in.

Browsers first exchange a short-lived, one-time connection ticket before upgrading to WebSocket. The service Bearer token is not placed in the URL.

## Data stays on the working host

Project files and agent runtimes stay on the working host. The desktop’s default service data directory is `~/.ait-server-desktop`; the standalone daemon defaults to `~/.ait-server`.

Local execution does not mean model requests never leave the network. Agents communicate with their providers according to their own configuration. Consult the provider’s data policy when using remote models. Remote clients read files and conversations through the chosen connection method.

## Disconnect and reconnect

Newer Android and iOS clients try to retain account relay connections and active downloads for up to two minutes after entering the background. Returning within that window can reuse a healthy connection. After the window, account network activity pauses and is revalidated when the app returns. The operating system may suspend the app or interrupt networking sooner; this is not a guarantee of background execution.

A disconnected phone does not move or automatically cancel an agent running on the working computer. Reconnect and inspect the session before resending a task whose delivery is uncertain.

In the current source, the daemon owns machine authorization, host lease renewal, and online reconnects. Quitting a client does not revoke machine authorization while the daemon remains running with valid credentials. **Keep daemon running after quit** can retain the local process. Explicitly disconnecting host synchronization closes online connections and clears machine authorization; authorize again to reconnect. Use a [standalone daemon](/en/docs/daemon/) for persistent operation independent of the desktop lifecycle.

Current desktop, Android, iOS, and Web clients use Hub for ordinary online operations. An unavailable Hub produces an explicit failure without falling back to older business transports. File downloads retain a separate Relay channel. Check client, daemon, and account service compatibility together; see [ADR-204](https://github.com/ait-app/ait/blob/main/docs/decisions/clients/adr-204-hub-only-online-business-transport.md).

Read the [daemon manual](https://github.com/ait-app/ait/blob/main/docs/operations/daemon.md) for the protocol, shutdown behavior, and data directories.
