---
title: Agent sessions
description: Import history, ask side questions, manage goals, and export a timeline.
lang: en
slug: sessions
group: workflow
order: 4.2
---

## Import or resume a session

Open **Import session** from the sidebar, or the account menu when signed in. Choose a host, provider, and session, then open the associated workspace. Codex, Claude Code, DeepSeek Harness, Pi, and Oh My Pi support native import. OpenCode depends on the CLI's ACP capabilities. Antigravity and MiniMax Code can resume Ait sessions, with no full import of external history. Stop any other writer before resuming the same session. [Agent setup](/en/docs/providers/)

## Ask a side question

Enter `/btw` or `/btw your question` in an existing session. Ask follow-ups in the floating window while the main task runs. The topic uses the readable context saved when you first ask, and keeps a separate conversation history. Select **Expand** to open a full session draft with the topic.

BTW supports Codex, Claude Code, OpenCode, Pi, and Oh My Pi on a compatible client and Unix host. Use the [workspace notepad](/en/docs/workspaces/#workspace-notepad) to leave handoff notes for other sessions.

## View and manage a Goal

In Codex or Oh My Pi sessions with native Goal support, the composer shows the goal reported by the host and its available actions, such as edit, pause, resume, or clear. The unified feature menu and Goal display require a v0.2.26 client and compatible host.

## Export a timeline

In **Context details**, choose Markdown or HTML and export the full saved timeline or only messages and voice transcripts. Active tasks can continue during export. The file includes attachment references. Older hosts may lack export, and oversized exports fail with a message.

## Dictation and realtime voice

Dictation runs on the host by default. The offline models need internet access for initial setup. Codex provides native realtime voice when the CLI version, authentication, client, and host configuration support it. Desktop and Web use WebRTC. The native audio transport on other clients may require an API key. [Speech configuration](https://github.com/ait-app/ait/blob/main/docs/operations/speech.md)
