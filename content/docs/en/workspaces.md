---
title: Workspaces
description: Keep agents, files, terminals, and code changes together in the context of a project.
lang: en
slug: workspaces
group: workflow
order: 4
---

A workspace keeps the context of a task together. Organize work inside a project and access agent conversations, directory files, terminals, and Git changes.

## Projects and workspaces

A **project** corresponds to the code directory you work in. A **workspace** organizes particular work and sessions. Agents execute in the selected working directory; creating a session does not automatically create a separate copy of the code.

Add a project first, then create its workspace. When using an existing directory, confirm that it contains the correct code, configuration, and project instructions.

## Give the agent context

When creating an agent, describe the intended result, relevant files, and verification method. For example:

> Add responsive navigation to this project. Follow the existing styles, check the mobile layout, and run the project’s current build command.

Agents use their native configuration. See [Agent setup](/en/docs/providers/) for how project instructions, skills, and tools are loaded.

## Inspect and verify changes

1. Follow the agent’s work in the conversation.
2. Open files and diffs to inspect the changes and scope.
3. Run the project’s build or verification commands in the terminal.
4. Add feedback or proceed with your next Git action.

The homepage demo illustrates this workflow. It does not run real tasks or modify your files.

## Git worktrees

- **Local** uses the project's existing checkout for work that can share a directory and branch.
- **New worktree** gives a parallel task its own directory and branch. A regular worktree separates the checkout and Git state.
- **Sandboxed worktree** also limits writes from agent processes on supported macOS and Linux hosts. It works with Claude Code, Codex, Pi, Oh My Pi, OpenCode, and MiniMax Code. It does not provide full read or network isolation. Linux needs `bubblewrap >= 0.8.0` and unprivileged user namespaces. See [Platform support](/en/docs/platforms/).

Check your starting branch and wait for any background project setup after creating a worktree.

## Workspace notepad

In a compatible client, enable **Settings → About → Experimental features**, then open the workspace notepad. Each workspace shares one Markdown file in the host's data directory. Use it for notes and handoffs outside the Git checkout. Desktop and Web can edit it. Android and iOS show a read-only preview. Agents with access can read and write through [Ait MCP](/en/docs/agent-tools/).

## Built-in browser

Open the built-in browser from a workspace in the desktop app. For a remote workspace, its traffic goes through the working host, so the browser can also open that host's `localhost` pages. See the [browser sign-in walkthrough](/en/blog/browser-login-on-host/).

## Commits and pull requests

The primary workspace action follows the actual Git and PR state, offering actions such as commit, create PR, push, or view PR. GitHub/GitLab operations also require Git and the appropriate `gh` / `glab` authentication on the working host.

“View PR” opens the existing request; it does not push commits. Resolve conflicts, divergence, or a behind branch before continuing. After merging, check for active agents and unanswered approvals before archiving the workspace.

The grouped Git panel and **Rebase remote** require a v0.2.26 client and compatible host. Archive from the workspace menu. Reset is limited to eligible managed worktrees. Check the branch and which files will be cleared before confirming.

## Scheduled tasks

Choose Scheduled tasks from the workspace’s New menu. Use an existing agent or create one per run. See [Scheduled tasks](/en/docs/automation/) for intervals, Cron, history, and session retention.

## Pick up on another device

After connecting to a working host, remote devices access its workspaces. Files and runtimes stay on the host. A remote connection does not copy the project to your phone.

See [Connections & data](/en/docs/connection/) for connection methods and platform differences.
