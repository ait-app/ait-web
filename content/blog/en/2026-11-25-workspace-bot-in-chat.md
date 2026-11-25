---
title: Assigning repo tasks from WeChat, Feishu, and Telegram with Workspace Bot
description: Hand off repo questions and PR follow-ups from your chat app while keeping terminal access and permission approvals under your control.
lang: en
slug: workspace-bot-in-chat
date: 2026-11-25
category: product
visual: flight
---

Away from your desk, you rarely want to edit fifty lines of code on a phone screen. More often, something small comes up: summarize what changed on this branch this week, trace which commit introduced a bug, or keep an eye on an open PR to see whether CI passed and what reviewers commented.

Opening a full dev client, picking a host, and navigating into a session feels heavy for a one-line question. On the other hand, wiring a chat bot with unrestricted shell access into a group chat is asking for trouble. Ait’s **Workspace Bot** sits between those two extremes.

## One Bot per workspace, testable before connecting any chat app

Workspace Bot currently lives behind **Settings → About → Experimental features**. Once enabled, choose **Bot** from the workspace’s **New** menu (update the working host’s daemon first if prompted).

Each workspace gets its own Bot with a chosen provider, model, allowed agent modes, and tool groups. You do not need to set up an external messenger right away—Ait includes a built-in Bot conversation so you can test prompts first and inspect progress or pending questions in the **Tasks** tab.

When you are ready, connect the chat apps you actually use:

- **Telegram:** add a BotFather token and open the verification link to tap Start. Group chats are opt-in and trigger on mention or reply.
- **Feishu / Lark:** China Feishu supports QR scan or manual credentials; international Lark uses its own app credentials. Group chats require opting in and mentioning the bot.
- **WeChat:** QR scan for direct messages only; scan again when the session expires.
- **QQ:** QR scan or manual configuration, with group chats enabled separately and replies subject to QQ’s passive reply window.
- **iMessage:** direct messages over a hosted Photon line.

Updates go back to whichever conversation started the task. If that external channel is disabled or unreachable, updates fall back to the built-in Ait conversation, and full external history remains visible in the Bot tab.

One note before turning on group chats: channels no longer filter by the legacy sender allowlist, so verify visibility and trigger rules on the chat platform first.

## Following GitHub PRs and GitLab MRs

If `gh` or `glab` is signed in on the working host, versions with PR tracking can follow a GitHub pull request or GitLab merge request in the same repository.

Task details show review status and check progress, and the Bot handles review feedback according to its source and configured permissions. Cancel the task whenever you want it to stop tracking.

## Keeping permissions tight

When people connect a messenger to a repository, the main worry is usually not whether the bot can answer—it is whether it might run commands they did not intend. A Workspace Bot’s reach is bounded by three things together: its workspace scope, the allowed provider modes, and the tool groups you enable.

Two defaults do the heavy lifting:

1. **Script and terminal tool groups are off by default.** If you only want chat access for reading code, summarizing changes, or tracking PRs, leave them off and only enable command access when a workflow actually requires it.
2. **The Bot cannot approve provider permission prompts for you.** When an agent asks for permission to run a sensitive action, it pauses until you review and approve or reject it yourself in Ait (for example, from the [Task board](/en/docs/task-board/)).

Pausing a Bot stops new incoming conversations; agents it has already started continue independently and should be managed in the workspace or Task board.

For channel credentials and setup steps, see [Workspace Bot](/en/docs/bots/) and the [Bot setup manual](https://github.com/ait-app/ait/blob/main/docs/operations/bots.md).
