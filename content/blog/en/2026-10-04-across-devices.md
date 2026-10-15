---
title: Another screen. No need to start over.
description: "Understanding Ait’s working hosts and clients: where work runs and where you connect are separate decisions."
lang: en
slug: across-devices
date: 2026-10-04
category: engineering
visual: connection
---

When an agent works on your computer, your phone does not need a second development environment just to check the progress. Ait separates running the work from accessing it. The host executes; the client connects.

## The working host holds the context

The working host runs the Rust daemon and native providers. Project files, workspaces, and agent runtimes live on the host. Clients access them through a shared protocol.

Connecting another device does not require copying the whole project. The computer keeps running while another screen shows the same working context.

## Two connection methods

Desktop and Android can sign in to the same account and select a computer from the online host list. Android acts as a client and does not publish the phone as a working host.

Web and iOS currently use direct connections, requiring a host address, port, and access token. Platform capabilities have explicit boundaries. A desktop connection feature is not automatically available on every client.

## Reconnect, then resubscribe

Connections do not last forever. Android pauses in the background and reconnects in the foreground. WebSocket subscriptions belong to a physical connection; they are released on disconnect and renewed after reconnecting.

For users, the interface needs to confirm host state before resuming the working view. In the implementation, connection identity, subscription lifecycle, and session data need separate ownership.

## Describe what works today

Cross-device access takes time to verify. The current Ait source documentation records physical-device checks of the Android account entry and sign-in form. Full physical-device acceptance of the account relay flow remains pending.

That boundary is documented in [Platform support](/en/docs/platforms/). Read [Connections & data](/en/docs/connection/) for the steps. The documentation should describe what you can use now and evolve with actual verification.
