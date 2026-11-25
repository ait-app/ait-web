---
title: Why Ait separates the working host from the client
description: How Ait splits execution on the working host from access on desktop, mobile, and Web, and what happens across reconnects and mobile backgrounding.
lang: en
slug: across-devices
date: 2026-10-04
category: engineering
visual: connection
---

When an agent is halfway through a refactor on your computer and you step away to grab coffee or catch a train, you want to check progress or approve a prompt from your phone—without reproducing a Rust toolchain and a gigabyte of dependencies on iOS.

Ait’s architecture starts from that split: **execution stays on the working host, and every other device connects as a client.**

## The working host owns the state

The Rust daemon (bundled in the macOS/Linux desktop app or installed standalone as `aitd`) and your native agent CLIs run on the working host. Project files, Git state, workspace metadata, and terminals stay on that machine.

Clients—another desktop, Android, iOS, or Web—talk to the host over a shared protocol to view diffs, send prompts, and handle approvals. Connecting from your phone never copies the repository to the phone or moves the agent into a cloud container. As long as the host is online, every screen looks at the same workspace.

## Two connection paths: Online Service and direct connection

Different networks call for different setups, so Ait supports two paths:

- **Online Service (account relay):** sign in to the same Ait account on the host and client. The host maintains an outbound connection to the online service, and clients pick it from the online host list—no public IP or router port forwarding required. Desktop, Android, iOS, and hosted [Ait for Web](https://aitapp.cn/) all use this path. Regular online traffic goes through the Hub, while file downloads use a separate Relay channel.
- **Direct connection:** if you prefer not to sign in, desktop and mobile clients can connect directly over a trusted LAN or VPN using the daemon’s listen address and access token, or leave `aitd` bound to `127.0.0.1:7316` and forward it through an SSH tunnel.

Platform boundaries stay explicit: phones only act as clients and never publish themselves as hosts; the Windows desktop app connects remotely and does not run a local daemon; hosted Ait for Web at `aitapp.cn` uses Online Service only, while local dev Web builds support direct connections.

## What happens on backgrounding, drops, and reconnects

Mobile networks drop and screens lock constantly. A few implementation details matter in daily use:

- **A dropped client never cancels the agent.** Execution lives on the host. If your phone loses signal or you close a browser tab, the task keeps running. After reconnecting, check the latest session state before resending a message.
- **Mobile background connections have a grace window.** Recent Android and iOS builds try to keep the account relay connection and active downloads alive for up to 2 minutes in the background so quick app switches reuse the socket. After that window, network activity pauses until you return to the foreground (and the OS may still suspend the app sooner).
- **WebSocket subscriptions belong to the physical socket.** When a connection drops, subscriptions are released and renewed after reconnecting, so the client separates connection identity, subscription lifecycle, and session state.
- **Quitting a client does not revoke host authorization.** The daemon manages machine authorization, lease renewal, and reconnects on its own. Only explicitly disconnecting the host or running `aitd logout` clears that authorization.

For platform details and step-by-step setup, see [Platform support](/en/docs/platforms/) and [Connections & data](/en/docs/connection/).
