---
title: Scheduled tasks
description: Run agents in a workspace on an interval or Cron schedule and inspect run history.
lang: en
slug: automation
group: workflow
order: 4.3
---

## Create a schedule

1. Open **New → Scheduled task** in the workspace and create a task. From the global schedules page, first select the host, project, and workspace.
2. Start from a template or a blank form. Enter a name and prompt. The task uses that workspace's directory. For isolation, create it in the appropriate worktree.
3. Choose an existing agent in that workspace or create one per run. New sessions can stay in the workspace or be archived when the run ends. Archiving is the default and applies only to the session.
4. Set a fixed interval or a five-field Cron expression with an IANA time zone. The default is one run. Leave the count blank for unlimited runs. Successes, failures, and manual runs all count. You can set a first run and a deadline.

For example, use `0 9 * * 1-5` and `Asia/Shanghai` to summarize recent project changes at 9 a.m. on weekdays.

## Review results and handle failures

Open run history to read the output or follow the link to the session. Use **Run now** to check the configuration. Pausing stops future automatic runs while the current run continues. Wait for it to finish before deleting the task or changing its target.

Scheduling runs on the working host's daemon with the client closed. An offline host or stopped daemon cannot run a task. Recurring schedules skip missed triggers. Runs of one task cannot overlap. If its agent is busy or waiting for approval, the run fails. Check the history and resolve the blocker before retrying.
