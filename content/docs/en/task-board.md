---
title: Task board
description: Track agents across connected hosts and handle approvals, questions, and results.
lang: en
slug: task-board
group: workflow
order: 4.1
---

Open **Task board** from the sidebar or command center. It shows agents on your connected hosts. Filter by host or project, or search by title, model, or branch.

## Read task status

| Status | Meaning |
| --- | --- |
| Needs action | Waiting for approval or an answer |
| Running | Starting up or executing |
| Needs review | An unread result, a failure, or an unconfirmed native child task |
| Done | No active work, outstanding input, or unread alert |

Expand a parent task to see its children. The parent reflects the state that needs the most attention in the tree. Some native child tasks are read-only. Actions depend on the provider and host version.

## Act on a task

1. Select a card to see the latest reply, permission request, and child tasks.
2. Respond to available permission or plan requests in the card. For a question, open the answer form in the details.
3. Select **Open** to continue in the workspace. You can also stop an eligible task or clear its unread alert. Marking it reviewed preserves any failure status.
4. Archive a task once it and its children have no active work or pending input.

An offline host may show its last known state. Reconnect before approving, stopping, or archiving tasks. For recurring work, see [Scheduled tasks](/en/docs/automation/).
