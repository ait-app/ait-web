---
title: Sign in to Codex and Claude on a remote host with Ait’s built-in browser
description: Ait’s desktop built-in browser routes traffic through the working host, so remote localhost OAuth callbacks work inside the workspace without SSH port forwarding.
lang: en
slug: browser-login-on-host
date: 2026-11-07
category: guide
visual: connection
---

Install Codex or Claude Code on a remote Linux host and the first sign-in almost always stalls at the same spot.

The CLI prints an authorization URL and asks you to finish in a browser. After you sign in, the provider redirects back to a loopback URL such as `http://localhost:1455/...`—a port listening on the remote machine running the CLI. That host usually has no desktop environment, and in the browser on your laptop, `localhost` points to your laptop instead.

Most people work around it with SSH port forwarding, copying `~/.codex/auth.json` across machines, or switching to device codes and pasted tokens. All three work, just with extra steps every time.

If you are already connected to that host in the Ait desktop app, open a built-in browser tab inside the workspace instead. Its network traffic exits from the host that owns the workspace, so both the sign-in page and the loopback callback hit the right machine.

## Why the CLI redirects back to localhost

Loopback redirect is standard OAuth for local CLIs. During sign-in, the CLI binds a temporary port on `127.0.0.1`, the browser redirects there after authorization, and the CLI receives the code directly without a public callback server in the middle.

It only becomes awkward on headless machines because the browser has to reach the loopback interface of the host running the CLI. Opening `localhost:1455` on your laptop never reaches Codex on the server.

## Where the built-in browser sends traffic

A browser tab in the Ait desktop client renders locally, while its network path follows the active workspace:

- **Local workspace:** traffic goes straight out from your local machine.
- **Remote workspace:** HTTP, HTTPS, and WebSocket traffic—including `localhost`—tunnels over your account, TCP, or SSH connection to that host’s daemon, and DNS resolves on the host as well.

So `localhost:1455` inside a remote workspace reaches the host’s loopback port. If the host goes offline or the connection drops, the browser does not silently fall back to your local machine, avoiding sending a sign-in to the wrong host.

Ait forwards raw TCP bytes without man-in-the-middle decryption. Original URLs stay intact, Chromium validates HTTPS certificates normally, and the website and CLI handle their own credentials.

> Implementation notes live in [ADR-152](https://github.com/ait-app/ait/blob/main/docs/decisions/clients/adr-152-remote-workspace-browser-loopback.md) and [ADR-186](https://github.com/ait-app/ait/blob/main/docs/decisions/clients/adr-186-workspace-browser-egress.md).

## Signing in to Codex on a remote host

1. Connect to the working host in the Ait desktop app and open a workspace.
2. Open a terminal tab and run `codex login`.
3. On a headless machine, the CLI cannot launch a local browser; copy the printed authorization URL.
4. Open a built-in browser tab from the workspace tab bar, paste the URL, and load it.
5. Sign in with your ChatGPT account. After redirecting to `localhost:1455`, Codex on the host receives the callback and finishes in the terminal.
6. Confirm in the terminal:

```sh
codex login status
```

Codex uses `localhost:1455` by default, and OpenAI’s [Authentication docs](https://developers.openai.com/codex/auth) also cover device auth and SSH forwarding. If your installed build supports `codex login --device-auth`, that avoids loopback callbacks altogether.

## Signing in to Claude Code on a remote host

The steps are the same:

1. In the workspace terminal, run `claude auth login` (or `/login` inside an existing `claude` session).
2. Copy the printed authorization URL.
3. Open it in a built-in browser tab and sign in to your Claude account.
4. Once the callback lands on the host, verify in the terminal:

```sh
claude auth status
```

Recent Claude Code releases also let you paste an OAuth code back into the terminal when the callback cannot reach localhost (see the [2026 W18 update](https://code.claude.com/docs/en/whats-new/2026-w18)); using the built-in browser skips that copy-and-paste step.

## Useful for other host-local services too

The same tunnel covers dev servers, Storybook, Jupyter, admin dashboards, and internal tools reachable only from the host’s IP. As long as the workspace belongs to that host, `localhost`, `127.0.0.1`, and internal hostnames resolve and connect from there.

The address bar automatically prepends `http://` for loopback hosts like `localhost` and `https://` for other addresses; type the full URL when you need a specific scheme.

## Caveats and requirements

- **Desktop client only:** the built-in browser is currently only in the Ait desktop app, not Web or mobile.
- **Recent host daemon required:** if the remote `aitd` or desktop daemon is too old, Ait prompts you to upgrade the host first.
- **Host browser proxy settings are not inherited:** traffic uses the host’s DNS and TCP stack, not desktop browser proxy preferences. Configure network routing separately if the host requires a proxy.
- **Reachability still depends on the host:** the built-in browser moves egress to the host; it does not bypass the host’s own network restrictions.
- **Isolated profiles per remote host:** website sessions persist per remote host and are cleared if you clear browser data.

If you are still setting up the remote machine, see [Turning a Linux server or Mac mini into an always-on agent host with aitd](/en/blog/always-on-aitd-host/) or [Standalone daemon](/en/docs/daemon/); for agent installation details, see [Agent setup](/en/docs/providers/).
