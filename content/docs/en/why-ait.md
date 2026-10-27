---
title: Why Ait?
description: Use multiple agents, manage computers and servers, and continue the same work across devices from one interface.
lang: en
slug: why-ait
group: start
order: 0.5
---

Bring together the coding agents you know, projects spread across machines, and the devices you use every day. Ait gives you one place to choose tools, assign tasks, follow progress, and review results.

## Multiple agents, one way to work

Ait supports **Codex, Claude Code, OpenCode, DeepSeek Harness, and Antigravity CLI**. Use different agents in the same interface, choosing the tools, models, and permission options that fit each task.

Keep each agent’s existing sign-in and configuration. Use several agents in one project, or choose different tools for different projects, with a consistent way to manage their sessions. See [Agent setup](/en/docs/providers/) for integrations and capabilities.

## Multiple computers and servers, one interface

Ait can **connect to and manage multiple desktop computers and servers at the same time**, bringing their projects, workspaces, and agent sessions into one interface. View workspaces across your hosts, or filter by host to focus on one machine.

For example, ask an agent on your computer to update a page, have another agent on a server run a build, and check an existing task on your office computer. The machines can work at the same time while you follow progress, send messages, inspect files, and use their terminals from one interface.

Each host keeps its own development environment and project directories. You decide where a task runs based on the project’s needs. See [Connections & data](/en/docs/connection/) for connection options.

## Another screen, the same work

Start tasks on your computer, then use your phone to check progress, add instructions, or respond to approvals when you step away. On another computer, open the [Ait Web app](https://aitapp.cn/) to connect to your existing host and continue.

Desktop, Android, iOS, and Web access the workspaces and sessions already on the host. Your task context stays available when you change devices, without copying the project to your phone. Keep the working host awake and its service available, and continue from the device at hand. See [Platform support](/en/docs/platforms/) for installation options.

## From a task to a reviewed commit

Conversations, files, diffs, and a terminal live in the same workspace. Describe a change, follow the agent’s progress, inspect files and diffs, then run the project’s build or test commands in the terminal.

Bring the results back into the conversation when you need adjustments. Once the work is ready, move on to a commit or pull request. The context and tools for the task stay together, with less switching between apps. Explore the [workspace workflow](/en/docs/workspaces/).

## Move several tasks forward at once

Give independent tasks to separate agents and work on features, fixes, or code reviews in parallel. Use the same agent throughout, or choose different tools and models for each task.

For parallel changes in one repository, use **Git worktrees** to give tasks separate directories and branches. Inspect each diff, run the relevant checks, and decide which results to merge. See [Git worktrees](/en/docs/workspaces/#git-worktrees) for details.

## Central relay for simpler remote access

Your working host and connecting device each reach Ait’s **central relay service**. Sign in with the same account to discover and connect to online hosts. No public IP address, router port forwarding, or shared local network is required.

Hosts make outbound connections, reducing dependence on router settings and inbound network configuration. Connection health checks and automatic reconnection help recover from interruptions. Ait also reuses existing connections. When a persistent data tunnel is available, it avoids repeating the host-side connection and handshake, reducing the wait to open a workspace or reconnect.

Simpler setup, reliable connections, and less connection overhead make remote work easier day to day. Actual latency depends on both networks and their distance from the relay. See [Connections & data](/en/docs/connection/) for setup.

## A lightweight daemon for small-memory servers

Ait’s background service is written in **Rust** and runs as a standalone executable. A server needs neither a desktop application nor a separate Node.js runtime for the Ait daemon, reducing the overhead of keeping the environment available and leaving more resources for agents and project tools.

A small-memory Linux server or an always-on Mac can serve as a working host. Follow the [standalone daemon guide](/en/docs/daemon/) to install it, authorize the machine, and run in unattended mode. Size the host for the agents, concurrent tasks, and project tools you plan to run.

## Your tasks run on your own hosts

Project files, development environments, and agents run on the computers or servers you choose. Other devices connect to that environment. Local use does not require an Ait account.

The central relay forwards connections, while agents reach model services according to their own configuration. You continue to manage their sign-ins, subscriptions, and model choices; Ait does not include a model subscription. See [Connections & data](/en/docs/connection/) for data and credential details.

Follow the [Quick start](/en/docs/quick-start/) to bring your first agent and project into Ait.
