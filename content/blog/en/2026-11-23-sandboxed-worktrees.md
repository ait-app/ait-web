---
title: "Running multiple agents in one repo: regular vs. sandboxed worktrees"
description: How Ait separates Git branches and filesystem writes for parallel agent tasks without asking you to maintain containers for every small change.
lang: en
slug: sandboxed-worktrees
date: 2026-11-23
category: engineering
visual: workspace
---

Run two or three coding agents in the same repository and you hit two practical problems within ten minutes.

First, they step on each other’s files. One agent edits navigation while another fixes a sign-in bug in the same checkout. `git status` turns into a pile of mixed changes, and you can no longer tell which edit belongs to which task, let alone commit or revert them separately.

Second, separating branches does nothing to limit where a process can write. Even inside its own folder, an agent still runs under your user account. A bad path or cleanup script can write outside the repo. Spinning up a Docker container for every small task is heavier than most day-to-day edits justify, once you factor in images, dependency caches, and toolchain setup.

Ait splits workspace directories into three modes around these two concerns.

## Local directory, new worktree, and sandboxed worktree

When you create a workspace inside a project, you pick one of three setups:

- **Local** uses the project’s existing checkout. Pick this when you are doing one task at a time or continuing on the branch you already have checked out.
- **New worktree** creates a separate directory and Git branch via Git worktree. Parallel agents get isolated files and Git state without colliding.
- **Sandboxed worktree** adds OS-level write restrictions on top of the worktree so the agent process is constrained to allowed write paths.

A regular worktree solves branch and file collisions; it does not restrict process permissions. A sandboxed worktree adds write boundaries. Keeping the distinction explicit makes it easier to choose the right one for the task.

## What sandboxed worktrees do — and do not — isolate

On supported macOS and Linux hosts, sandboxed worktrees currently work with **Claude Code, Codex, Pi, Oh My Pi, OpenCode, and MiniMax Code**.

Two boundaries are worth knowing upfront so you do not treat it like a VM:

1. **It restricts writes, not full reads or network access.** Agents still need outbound network access for model providers and read access to installed toolchains and dependencies. If a task requires full network, environment, or read isolation, use a dedicated VM or container.
2. **Linux hosts require `bubblewrap >= 0.8.0` and unprivileged user namespaces.** The `.deb`, `.rpm`, and Arch AUR `ait-bin` packages declare the `bubblewrap` dependency automatically. If you use the AppImage, `tar.gz`, or `ait-git`, install `bubblewrap` yourself and make sure unprivileged user namespaces are enabled.

Keeping this layer focused on write boundaries avoids container overhead while letting agents reuse the Rust, Node, Python toolchains, and local caches already on your host.

## Wrapping up parallel work

Right after creating a worktree, project setup scripts may still be running in the background. Check the branch and let setup finish before sending the first prompt to avoid spurious dependency errors.

Once parallel tasks finish, the Git flow follows the actual branch state:

- The primary workspace action adjusts to what the branch needs next: commit, create PR, push, or view PR. GitHub and GitLab actions require `gh` or `glab` to be signed in on the working host.
- With a v0.2.26 client and compatible host, the grouped Git panel organizes changes more cleanly, and **Rebase remote** brings a behind branch up to date without leaving the workspace.
- After merging, check that no agent is still running and no permission prompt is left unanswered, then archive from the workspace menu. Eligible managed worktrees also support reset if you want a clean slate—double-check the branch and files that will be cleared before confirming.

Once this loop clicks, running three or four tasks in parallel rarely requires juggling `git stash` by hand. Full details on directory modes and Git actions are in [Workspaces](/en/docs/workspaces/), and Linux package notes are in [Platform support](/en/docs/platforms/).
