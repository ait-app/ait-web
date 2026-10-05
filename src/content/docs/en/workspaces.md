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

Use the project’s Git worktree workflow when you need separate directories for parallel tasks. A worktree gives the same Git repository multiple working directories, each with its own branch and file state.

Check the repository state and target branch before starting, then review changes before merging. Worktrees separate directories and branches; they are not an operating-system security sandbox.

## Pick up on another device

After connecting to a working host, remote devices access its workspaces. Files and runtimes stay on the host. A remote connection does not copy the project to your phone.

See [Connections & data](/en/docs/connection/) for connection methods and platform differences.
