---
title: Sign in to Codex and Claude on a remote host, from Ait’s built-in browser
description: Ait’s built-in browser sends traffic from the working host. Open a localhost login page on a remote machine inside the workspace, with no SSH tunnel.
lang: en
slug: browser-login-on-host
date: 2026-11-07
category: guide
visual: connection
---

Installing Codex or Claude Code on a remote host usually runs into the same wall at the first sign-in.

The CLI prints an authorization URL and asks you to finish in a browser. After you sign in, the provider redirects back to something like `http://localhost:1455/...` — an address that only works on the machine running the CLI. That machine often has no graphical interface, and on the browser in front of you, `localhost` is a different computer.

There are three familiar workarounds: forward the callback port over SSH, copy `~/.codex/auth.json` around, or switch to device codes and pasted authorization codes. All of them work, and all of them remind you that the login page and the machine doing the work are not the same place.

Ait’s workspace offers a more direct route. The built-in browser sends its network traffic from the host that owns the workspace. Paste the URL from the CLI, and the login page opens on the same machine that is waiting for the callback.

## Why the login page lands on localhost

This is the usual OAuth loopback redirect, not an oversight in the CLI.

During sign-in, the CLI listens on a temporary port on the loopback interface. After authorization, the browser redirects to that port and the CLI receives the authorization code. The provider does not need to register a public callback URL for every developer’s computer, and the code does not pass through a third-party server.

The tradeoff is that a browser on the machine running the CLI must reach that callback. Open `localhost:1455` on your laptop and you reach the laptop’s loopback address; Codex on the remote host never sees it.

## Which machine the built-in browser uses

A browser tab in the Ait desktop client has its interface on the client, but its network path follows the workspace:

- For a local workspace, the browser connects from the local machine.
- For a remote workspace, the connection made through an account, TCP, or SSH sends the browser’s HTTP, HTTPS, and WebSocket traffic to that host’s daemon. DNS resolution also happens on the host.

So `localhost:1455` in a remote workspace reaches the host’s loopback address. If the connection fails, it does not quietly fall back to your computer — which matters, because a fallback could send a sign-in to the wrong machine.

The browser keeps the original URL and Chromium still validates HTTPS certificates. Ait forwards TCP bytes and does not perform man-in-the-middle decryption. The page is still an ordinary page in Chromium; the website and the CLI handle their own credentials, and Ait does not take them over.

> The implementation details are recorded in Ait’s [ADR-152](https://github.com/ait-app/ait/blob/main/docs/decisions/clients/adr-152-remote-workspace-browser-loopback.md) and [ADR-186](https://github.com/ait-app/ait/blob/main/docs/decisions/clients/adr-186-workspace-browser-egress.md).

## Sign in to Codex inside Ait

1. Connect to the working host in Ait and open a workspace.
2. Open a new terminal tab. It runs on the host; run `codex login`.
3. The CLI prints an authorization URL. Without a graphical interface, its attempt to open a browser fails. Copy the URL.
4. Create a browser tab from the workspace tab bar, paste the URL, and open it.
5. Sign in with your ChatGPT account. After authorization, the browser redirects to `localhost:1455`; Codex on the host receives the callback and the terminal completes the sign-in.
6. Back in the terminal, confirm:

```sh
codex login status
```

Codex’s default loopback callback is `localhost:1455`, and the official [Authentication documentation](https://developers.openai.com/codex/auth) also covers device codes and SSH forwarding for headless environments. If your version supports `codex login --device-auth`, that path does not depend on the localhost callback. The built-in browser is not the only option; it is simply closer to a normal browser sign-in.

## Sign in to Claude Code inside Ait

The steps are the same:

1. In an Ait workspace terminal, run `claude auth login`, or run `/login` inside a `claude` session.
2. Copy the authorization URL printed by the terminal.
3. Open it in Ait’s built-in browser and sign in to your Claude account.
4. The callback reaches the host and the terminal confirms the result.

```sh
claude auth status
```

Recent Claude Code versions accept a pasted OAuth code when the browser callback cannot reach localhost (see the official [2026 W18 update](https://code.claude.com/docs/en/whats-new/2026-w18)). That fallback helps when no browser is available at all. When a browser is available, the built-in one removes the copy-and-paste step.

## More than login pages

The same network path covers other services running on the host: development servers, Storybook, Jupyter, admin panels, and internal sites that only allow the host’s IP address. As long as the workspace belongs to that host, `localhost`, `127.0.0.1`, or an internal address resolves and connects from the host.

Ordinary websites work too. The address bar adds `http://` for hosts such as `localhost` and defaults other addresses to `https://`; enter a full URL when you need a specific scheme.

## Limits and caveats

- The built-in browser is currently available only in the Ait desktop client. The Web and mobile clients do not expose it.
- Both sides need recent versions. If the `aitd` or desktop-bundled daemon on the host is too old, the connection reports that the host must be updated; upgrade the host first.
- The browser uses the host’s DNS and TCP network, but it does not read the host browser’s proxy settings. A host that needs a system proxy to reach the internet requires separate network configuration.
- The host’s route to the provider still determines whether sign-in succeeds. The built-in browser moves the browser to the host; it does not bypass the host’s network restrictions.
- Remote hosts use isolated, persistent browser profiles, so website sign-ins persist. Clearing browser data also clears these profiles.
- If the host is offline or the connection drops, the built-in browser does not fall back to the local network.

## Aligning where work runs with where the browser runs

The built-in browser is not meant to move everyday browsing into Ait. It fixes a consistency problem: the browser should see the network of the machine where the agent runs. Login pages are simply the most common place to notice the difference.

If you are still preparing the host, start with the [standalone daemon](/en/docs/daemon/); for installing and signing in to agents, see [Agent setup](/en/docs/providers/).
