---
title: Workspace Bot
description: Delegate work from Ait or a chat app and receive updates in the original conversation.
lang: en
slug: bots
group: workflow
order: 4.4
---

Set up one Bot per workspace. It can hand work to agents in that workspace and report when a task finishes, fails, or needs your input. Availability depends on your client and host versions.

## Set up and connect

1. Turn on **Experimental features** in **Settings → About**, then choose **Bot** from the workspace's **New** menu. Update the working host's daemon if prompted.
2. Choose a provider, model, and run options. Review allowed agent modes and tool groups in the Bot settings.
3. Try the built-in Ait conversation first. To connect a chat app, add its channel in Bot settings, complete verification, and check that the channel is enabled.
4. Send a specific task, such as summarizing this week's workspace changes. Open the **Tasks** tab to see progress and questions awaiting answers.

| Channel | Setup and supported chats |
| --- | --- |
| Telegram | Use a BotFather token and open the verification link to select Start. Enable group chats to use mention or reply triggers. |
| Feishu / Lark | Scan a code or enter credentials for Feishu in China. Use separate app credentials for international Lark. Enable groups and mention the bot. |
| WeChat | Scan a QR code for direct messages. Scan again after the session expires. |
| QQ | Scan a QR code or configure credentials manually. Enable group chats separately. QQ limits replies to its passive reply window. |
| iMessage | Connect through a hosted Photon line for direct messages. |

Messaging channels no longer filter by the old sender allowlist. Check platform visibility and trigger rules before enabling groups. Each channel needs its own credentials. [Bot setup manual](https://github.com/ait-app/ait/blob/main/docs/operations/bots.md)

## Updates, pull requests, and permissions

Work updates normally go to the conversation that started the task. If its channel is disabled or unavailable, updates go to the built-in Ait conversation. External history is visible in the Bot tab. Pausing the Bot stops new conversations. Manage agents it already started separately.

Versions with PR tracking can follow a GitHub pull request or GitLab merge request in the same repository. Sign in to `gh` or `glab` on the working host. The task details show review and check status. The Bot handles feedback based on its source and permissions. Cancel the task to stop tracking.

The Bot's tool groups, workspace scope, and provider modes determine what it can do. Script and terminal groups are disabled by default. The Bot session cannot approve provider permission requests on your behalf. Granting command or terminal access can expand what agents can do, so configure those options for the task.
