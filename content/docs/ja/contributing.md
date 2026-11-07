---
title: コントリビュート
description: ドキュメント、再現可能な Issue、コードの改善から始めましょう。変更を加える場所、検証方法、プルリクエストの出し方を説明します。
lang: ja
slug: contributing
group: development
order: 7
---

ドキュメントの修正、翻訳の改善、問題の再現、インターフェースの改良、エージェントの対応など、さまざまな形でコントリビュートできます。単独で検証できる小さな変更は、最初のコントリビュートに適しています。

## リポジトリとタスクを選ぶ

| 改善したい内容                                                     | リポジトリ                                            |
| ------------------------------------------------------------------ | ----------------------------------------------------- |
| デーモン、エージェントアダプター、デスクトップ、モバイル、Agent Web クライアント、SDK | [ait-app/ait](https://github.com/ait-app/ait)         |
| マーケティングサイト、公開ドキュメント、翻訳、ダウンロードリンク   | [ait-app/ait-web](https://github.com/ait-app/ait-web) |

まず、既存の [Ait の Issue](https://github.com/ait-app/ait/issues) と[プルリクエスト](https://github.com/ait-app/ait/pulls)を検索してください。大きな機能追加やアーキテクチャの変更では、ユースケース、期待する動作、提案する範囲を記載した Issue を作成することを検討してください。ドキュメントの小さな修正は、直接 PR を送っても構いません。

問題を報告するときは、バージョン、プラットフォーム、再現手順、期待する動作と実際の動作、そして機密データが含まれていないか確認したうえで関連ログを添えてください。チェックリストは[サポート](/ja/docs/support/)を参照してください。トークン、パスワード、非公開のプロジェクトファイルは、公開 Issue に含めないでください。

## 環境を準備する

書き込み権限がない場合は、GitHub でリポジトリをフォークし、フォークをクローンして、タスク用のブランチを作成します。既存のチェックアウトでは、最新の main ブランチからブランチを作成します。例:

```sh
git switch -c docs/improve-development-guide
```

前提条件、デスクトップと Web の起動、ネイティブモバイル開発、Web サイトのプレビューについては、[ローカル開発](/ja/docs/development/)を参照してください。Ait は、ルートの npm ワークスペースで JavaScript の依存関係をインストールし、ルートの Cargo ワークスペースで Rust デーモンをビルドします。

## 担当コードを見つける

| パス                                                                                     | 役割                                                                               |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `bins/daemon`                                                                            | エントリーポイント、ホストのライフサイクル、認証、機能の組み立て                   |
| `crates/domain`, `crates/model`                                                          | ドメインの値と不変条件、共有コラボレーションポート、プロトコルリソース             |
| `crates/provider`                                                                        | ネイティブエージェントアダプター、実行、履歴、スキルのインストール                 |
| `crates/metadata`, `crates/filesystem`                                                   | プロジェクトとワークスペースのライフサイクル、ファイル、Git、Forge、ローカル worktree アダプター |
| `crates/terminal`, `crates/voice`, `crates/schedule`, `crates/bot`                       | ターミナル、音声、スケジュール、Bot の各機能                                       |
| `crates/persistence`, `crates/api`, `crates/relay`, `crates/host-link`, `crates/browser` | 永続化、API、オンライン転送、ホスト認可、ブラウザーサービス                        |
| `apps/mobile`                                                                            | スマートフォン、ブラウザー、Electron で共有する Expo / React Native インターフェース |
| `apps/desktop`                                                                           | Electron のメインプロセス、デスクトップ統合、パッケージング                        |
| `packages/protocol`, `packages/client`                                                   | リポジトリ内のプロトコル、SDK、アカウントセッションのロジック                      |
| `docs`                                                                                   | 現行のアーキテクチャ、ADR、運用、エンジニアリングポリシー、検証記録                |

共有インターフェースの変更は、通常 `apps/mobile` から始めます。ウィンドウやデスクトップのシステム統合は `apps/desktop` から始めます。ネイティブエージェントの動作は `crates/provider` に置き、アダプターのロジックをデーモンに入れないでください。責務と許可される依存関係の全体像は、[現行のアーキテクチャ](https://github.com/ait-app/ait/blob/main/docs/architecture/README.md)を参照してください。

## エンジニアリングルールに従う

変更を加える前に [AGENTS.md](https://github.com/ait-app/ait/blob/main/AGENTS.md) を読んでください。テストやリファクタリングを含め、Rust を変更する前には必ず [Rust スタイルガイド](https://github.com/ait-app/ait/blob/main/docs/policy/rust.md)を読んでください。

- サーバーの実装言語は Rust に固定されています。ルートの Cargo ワークスペースがビルドできる状態を保ってください。依存関係は内側に向かいます。アダプターはポートを実装し、アプリケーションがドメインの振る舞いを調整します。
- 新しい Rust の振る舞いにはテストが必要です。ユニットテストは、本番ファイル内にインラインで書かず、親モジュールが宣言する別の子ファイルに置いてください。
- プロバイダーの振る舞いのテストは、対応するアダプターやサービスの隣、つまり `crates/provider` に置きます。デーモンのテストは、ホストのライフサイクル、トランスポート、機能をまたぐ統合をカバーします。[ADR-179](https://github.com/ait-app/ait/blob/main/docs/decisions/providers/adr-179-provider-owned-tests.md) を参照してください。
- 永続的な境界を変更する前に、[docs/README.md](https://github.com/ait-app/ait/blob/main/docs/README.md) を読み、ADR を記録し、ドキュメント索引を更新してください。構成と保守については、[ドキュメントポリシー](https://github.com/ait-app/ait/blob/main/docs/policy/documentation.md)を参照してください。
- 認証情報、プロバイダートークン、ローカルの SQLite データベース、実行時の成果物はコミットしないでください。サードパーティのライセンスと帰属表示は維持してください。

## 影響範囲を検証する

次のコマンドは、**Ait プロダクトリポジトリのルート**から実行します。変更に関係するチェックを選び、実際に実行したコマンドと結果を PR に記載してください。

| 変更内容                            | 検証のエントリーポイント                                                                                   |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| ドキュメント、ファイルパス、リンク  | `npm run check:docs`, `npm run check:format`                                                               |
| Rust                                | `cargo fmt --all --check`、対象クレートの Clippy と絞り込んだテスト                                        |
| 共有インターフェースまたは Electron | `npm run build:ui-deps`, `npm run check:ui`、および対象ワークスペースの型チェックと絞り込んだテスト        |
| プロトコルと SDK                    | `npm run build:sdk`, `npm run verify:local-packages`、および対象パッケージのテスト                         |
| `ait-web` Web サイト                | Web サイトのリポジトリで `npm run check`、`npm run build`、`npm run verify` を実行                         |

Rust の絞り込んだチェックの例です。変更内容に合ったものを選んでください。

```sh
# Check the provider crate when changing provider code
cargo clippy --locked -p provider --all-targets -- -D warnings
# Run offline tests when changing the MiniMax Code adapter
cargo test --locked -p provider --lib local::minimax
# Run configuration tests when changing daemon configuration
cargo test --locked -p daemon --bin daemon config::
```

クライアントの例です。

```sh
npm run typecheck --workspace=@ait/mobile
npm run test --workspace=@ait/mobile -- src/runtime/host-runtime.test.ts
```

実行するのは、変更したコードと、それに直接関連する振る舞いのテストだけにしてください。`bins/` や `crates/` の Rust コードを変更していない場合は、明示的に求められない限り Rust のテストを省略します。コミットや PR の準備は、Rust ワークスペース全体のテストスイートやワークスペース全体のカバレッジの実行を意味しません。CI の完全なチェックは、[CI ワークフロー](https://github.com/ait-app/ait/blob/main/.github/workflows/ci.yml)で定義されています。

実際のプロバイダーを使うテストは、モデルを呼び出したり、ローカルの認証を使用したりする場合があります。プロバイダーの運用ガイドを読み、オフラインテストと任意参加のライブテストを区別してください。カバレッジを測定していない場合は、その理由を記載してください。テストの合格件数は、カバレッジの割合ではありません。ドキュメントのみの変更では、Rust の振る舞いが変わらないため、カバレッジは対象外としてかまいません。

## プルリクエストを送る

1. 差分を確認し、無関係な変更、ローカルの実行時データ、認証情報が含まれていないことを確かめます。
2. わかりやすいコミットメッセージを付け、ブランチをフォークまたは書き込み可能な別のリモートにプッシュします。
3. 対象リポジトリの `main` ブランチに対して PR を作成します。Issue へのリンクを付け、問題、変更後の動作、検証内容を説明してください。
4. インターフェースの変更では、スクリーンショットまたは操作の記録を添えてください。確認していないプラットフォーム、実際のプロバイダー、その他の動作は明記してください。
5. レビューのフィードバックには同じブランチで対応し、影響するチェックを再実行します。永続的な境界を変更する場合は、ADR と索引の更新も含めてください。

## Web サイトのドキュメントを改善する

各ページ下部の編集リンクは、`ait-web/content/docs/{zh,en,ja}/` を指しています。3 つの言語すべてを、同じファイル名とスラッグで追加または更新してください。内部リンクには、対応する言語のプレフィックスを使用します。グループ、並び順、ページの見出し、検索は、Markdown の内容とフロントマターから生成されます。

製品に関する記述は、現行の Ait のドキュメントと実装に照らして確認し、ソースのリビジョンとレビュー範囲を [docs/content-sources.md](https://github.com/ait-app/ait-web/blob/main/docs/content-sources.md) に記録してください。実装済みであること、検証に成功したこと、ストアのリリースで利用できることは、それぞれ異なる状態です。Web サイトのチェックでは、多言語の網羅性、内部リンク、アンカー、検索、サイトマップを検証します。

Ait は [Apache License 2.0](https://github.com/ait-app/ait/blob/main/LICENSE) で提供されています。コントリビュートする際は、著作権表示、ライセンス表示、[サードパーティの帰属表示](https://github.com/ait-app/ait/blob/main/paseo/README.md)を維持してください。
