---
title: エージェントのツールとスキル
description: Ait MCP、同梱の編成スキル、プロバイダーごとの対応を確認します。
lang: ja
slug: agent-tools
group: reference
order: 6.1
---

## エージェントから Ait のツールを使う

Ait daemon はワークスペース、エージェント、定期タスクのツールを MCP で提供します。使えるツールはホスト設定、認証情報、セッションの権限で決まります。権限があれば、管理対象の子タスクを作成し、`notepad_read` と `notepad_write` で引き継ぎを記録できます。

| プロバイダー | Ait MCP の設定 |
| --- | --- |
| Codex、Claude Code、DeepSeek Harness、MiniMax Code、OpenCode、Pi | 対応する対話セッションを開くときに daemon が設定できます。 |
| Oh My Pi、Antigravity | プロバイダー側の MCP 設定を使います。Ait による自動設定はありません。 |

新しいセッションにツールが見つからない場合は、daemon の MCP 設定とプロバイダー側の同名の `ait` 設定を確認し、セッションを開き直します。設定を変更しても実行中のセッションは再起動されません。閲覧専用の履歴にはツールが追加されません。`agent_create` や `schedule_pause` など、一覧に表示される名前を使用します。[MCP の設定と外部クライアント](https://github.com/ait-app/ait/blob/main/docs/operations/mcp.md)

## 同梱の編成スキルを使う

daemon には Ait の編成スキルが付属し、起動時に選択されたスキルを追加または更新します。新規セッションはプロバイダーの仕組みでスキルを読み込みます。既存セッションの更新時期はプロバイダーによります。スキルは使い方を説明し、ツールや権限は MCP とホスト設定が提供します。

まず、現在のワークスペースと使えるツールをエージェントに尋ねてください。設定、更新、無効化は[スキルの配布手順](https://github.com/ait-app/ait/blob/main/docs/operations/agent-skills.md)を参照してください。[Workspace Bot](/ja/docs/bots/)には独自の権限範囲があります。
