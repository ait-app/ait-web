---
title: サーバー設定
description: スタンドアロンデーモンを起動し、リスナー、データディレクトリ、ローカルのブラウザー Origin を設定します。
lang: ja
slug: configuration
group: reference
order: 6
---

macOS / Linux のデスクトップアプリは同梱のデーモンを管理します。Windows ではリモートホストに接続します。このページは現在のソースに沿って、スタンドアロンサービス、ソースからの開発、カスタム接続について説明します。ツールチェーンと起動のエントリポイントについては[ローカル開発](/ja/docs/development/)を、旧リリースとの違いについては[スタンドアロンデーモン](/ja/docs/daemon/)をご覧ください。

## ローカルまたは直接接続のサービス

Ait ソースリポジトリのルートで実行します。

```sh
export AIT_SERVER_TOKEN="$(openssl rand -hex 32)"
cargo run -p daemon --bin daemon -- --listen 127.0.0.1:7316
```

この例では、ローカル API の認証情報を明示的に設定しています。すべての起動経路で `AIT_SERVER_TOKEN` が優先されます。この値は、空白を含まない 32～256 バイトの可視 ASCII 文字である必要があります。未設定の場合、デーモンは `<data-dir>/local-api.token` を `0600` のパーミッションで生成し、再利用します。ローカル API の認証情報が、コマンド引数、URL、TOML、`.env` ファイルから自動的に読み込まれることはありません。

## 無人モード

スタンドアロンデーモンとデスクトップ同梱のデーモンは、マシンの認証とホストの公開を共有します。Linux または macOS では、サインインしてから `run` を使うとホストをオンラインに保てます。現在のソースでは `--headless` は削除されています。リリース版の[スタンドアロンデーモン](/ja/docs/daemon/)の利用をおすすめします。そのガイドでは、ダウンロード、検証、インストール、実行方法に加え、tmux、systemd、launchd で常時稼働させる方法を説明しています。Ait のソースルートからビルドして実行することもできます（ソースビルドは `daemon` を生成します。リリースのアーカイブには同じプログラムが `aitd` として含まれます）。

```sh
cargo build --locked --release -p daemon --bin daemon
./target/release/daemon login
./target/release/daemon run
```

サインインと実行には、同じシステムユーザーと同じデータディレクトリを使用してください。初回のサインインでは Web アドレスと確認コードが表示されるので、ブラウザーで認証を完了します。以降の `run` では、有効なマシン認証が復元されます。サインインまたはサインアウトする前に、同じデータディレクトリを使用しているデーモンを停止してください。

認証済みのデーモンは公式のアカウントセンター `https://aitapp.cn/api` に接続し、そのマシン認証サービスを必要とします。`AIT_SERVER_TOKEN` が未設定の場合、初回起動時に `<data-dir>/local-api.token` が生成され、以降の起動で再利用されます。環境変数を明示的に指定した場合はそちらが優先され、このファイルは上書きされません。ローカルトークンとマシン認証は、別々の認証情報です。

バックグラウンドで常時稼働させるには、お使いのオペレーティングシステムのプロセスマネージャーを使用してください。`service install` サブコマンドはありません。設定と再認証については、[ヘッドレスデーモンマニュアル](https://github.com/ait-app/ait/blob/main/docs/operations/headless-daemon.md)をご覧ください。

## 主な設定

| 引数 | 環境変数 | 既定値 |
| --- | --- | --- |
| `--data-dir` | `AIT_SERVER_DATA_DIR` | `~/.ait`（新規インストール。下記の検索順序を参照） |
| `--listen` | `AIT_SERVER_LISTEN` | `127.0.0.1:7316` |
| `--config` | なし | データディレクトリ内の `config.toml`（存在しない場合はスキップ） |
| `--log-level` | `AIT_SERVER_LOG_LEVEL` | `info` |
| `--web-origin` | なし | 追加のブラウザー Origin なし |

設定の優先順位は、コマンド引数、環境変数、TOML、既定値の順です。データディレクトリは TOML では上書きできません。明示的に指定した設定ファイルは必ず存在している必要があります。未知のフィールドや無効な値があると、起動できません。

`--data-dir` と `AIT_SERVER_DATA_DIR` のどちらも設定されていない場合は、`~/.ait`、`~/.ait-server-desktop`、`~/.ait-server` の順で、最初に存在するディレクトリを使用します。いずれも存在しない場合は `~/.ait` を作成します。既存のディレクトリが移動、名前変更、統合されることはありません。新しく作成された `~/.ait` は従来の場所より優先されるため、既存のインストールで特定のディレクトリを使い続ける必要がある場合は、`--data-dir` を明示的に指定してください。

## ローカルのブラウザー Origin

ポート付きでパスを含まない HTTP のループバック Origin を、明示的に設定します。次の例は、ローカルの Expo Web 開発用クライアント向けです。

```toml
listen = "127.0.0.1:7316"
log_level = "info"
web_origins = ["http://localhost:8081", "http://127.0.0.1:8081"]
```

`--web-origin` を複数回指定する方法もあります。マーケティング用ドメインはエージェントクライアントの Origin ではありません。この Web サイトは、ローカルの Web クライアントとは別のものです。

## サービスの準備状態を確認する

```sh
curl http://127.0.0.1:7316/readyz
curl -H "Authorization: Bearer $AIT_SERVER_TOKEN" \
  http://127.0.0.1:7316/v1/server/info
```

`/healthz` は生存確認、`/readyz` は準備状態の確認です。サーバー情報と WebSocket へのアクセスには認証が必要で、クライアントはプロトコルのネゴシエーションを完了する必要があります。認証付きの例では、明示的に設定した環境変数を使っています。未設定の場合は、代わりにそのデータディレクトリに保存されているローカル API トークンを使用してください。

## プロバイダーの実行ファイルを選択する

```sh
export AIT_SERVER_CODEX_BIN=/absolute/path/to/codex
export AIT_SERVER_CLAUDE_BIN=/absolute/path/to/claude
export AIT_SERVER_OPENCODE_BIN=/absolute/path/to/opencode
export AIT_SERVER_DEEPSEEK_HARNESS_BIN=/absolute/path/to/dsh
export AIT_SERVER_ANTIGRAVITY_BIN=/absolute/path/to/agy
export AIT_SERVER_PI_BIN=/absolute/path/to/pi
export AIT_SERVER_OMP_BIN=/absolute/path/to/omp
export AIT_SERVER_MINIMAX_CODE_BIN=/absolute/path/to/mcode
```

必要な変数だけを設定し、例のパスを実際のパスに置き換えて、デーモンを再起動してください。認証と機能については、[エージェントのセットアップ](/ja/docs/providers/)をご覧ください。

## MCP クライアントを接続する

MCP を有効にすると、デーモンは自身のリスナー上に `/mcp/agents` を提供します（例: `http://127.0.0.1:7316/mcp/agents`）。MCP クライアントでエンドポイントを明示的に設定し、`Authorization: Bearer` ヘッダーにローカル API トークンを指定してください。

このエンドポイントでは、エージェント、ワークスペース、ターミナル、スケジュールを管理できます。新規の設定では、MCP とエージェントへの注入が既定で有効になります。ネイティブセッションが開くと、Codex、Claude、DSH ACP、MiniMax Code は専用のランタイム接続を受け取れます。明示的に無効化されている既存の設定は無効のままで、その他のプロバイダーは各自の設定を維持します。外部の MCP クライアントは、上記のとおり明示的に接続します。有効化のタイミング、オプションの Unix ソケット、ツールのパラメーターについては、[MCP マニュアル](https://github.com/ait-app/ait/blob/main/docs/operations/mcp.md)をご覧ください。
