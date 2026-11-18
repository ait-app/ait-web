---
title: Another screen. No need to start over.
description: "Understanding Ait’s working hosts and clients: where work runs and where you connect are separate decisions."
lang: en
slug: across-devices
date: 2026-10-04
category: engineering
visual: connection
---

> Update (2026-10-16): This article preserves the product description at publication. iOS and Web now support account relay, and mobile background connection behavior has changed. See [Platform support](/en/docs/platforms/) and [Agent setup](/en/docs/providers/) for current installation and capabilities.

When an agent works on your computer, your phone does not need a second development environment just to check the progress. Ait separates running the work from accessing it. The host executes; the client connects.

## The working host holds the context

The working host runs the Rust daemon and native providers. Project files, workspaces, and agent runtimes live on the host. Clients access them through a shared protocol.

Connecting another device does not require copying the whole project. The computer keeps running while another screen shows the same working context.

## Account relay and direct connections

Desktop, Android, iOS, and the hosted Web client can sign in to the same account and select a computer from the online host list. Android and iOS act as clients and do not publish the phone as a working host. The hosted Web client uses account relay; local Web development and supported iOS setups can still use direct connections.

Platform capabilities have explicit boundaries. A desktop connection feature is not automatically available on every client.

## Reconnect, then resubscribe

Connections do not last forever. Mobile clients pause account activity after a background window and reconnect in the foreground. WebSocket subscriptions belong to a physical connection; they are released on disconnect and renewed after reconnecting.

For users, the interface needs to confirm host state before resuming the working view. In the implementation, connection identity, subscription lifecycle, and session data need separate ownership.

## Describe what works today

The current Ait source documentation covers account relay for desktop, Android, iOS, and Web, alongside direct-connection boundaries and mobile background behavior.

That boundary is documented in [Platform support](/en/docs/platforms/). Read [Connections & data](/en/docs/connection/) for the steps. The documentation should describe what you can use now and evolve with actual verification.
