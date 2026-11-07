---
title: ローカル開発
description: Ait のツールチェーンを準備し、ソースからデスクトップ、Web、モバイル、スタンドアロンのデーモンを実行して、Web サイトのドキュメントをローカルでプレビューします。
lang: ja
slug: development
group: development
order: 8
---

このガイドは、現在の Ait のソースドキュメントに基づいています。変更を加える前に[コントリビュート](/ja/docs/contributing/)を読んでください。リリース済みアプリをインストールする場合は、[クイックスタート](/ja/docs/quick-start/)を参照してください。最後の Web サイトの節を除き、コマンドは `ait` リポジトリのルートで実行します。

## ツールチェーンを準備する

- Git、**Node.js 24**、npm。
- [rust-toolchain.toml](https://github.com/ait-app/ait/blob/main/rust-toolchain.toml) で指定された Rust ツールチェーン、`rustfmt`、Clippy。リポジトリがバージョンを固定しているため、チェックアウト内で作業すると rustup が自動的に選択します。
- ネイティブ依存関係のための CMake とシステムの C/C++ ビルドツール。
- エージェントを連携させるには、作業ホストに必要な CLI をインストールして認証し、単独で動作することを確認してください。[エージェントのセットアップ](/ja/docs/providers/)を参照してください。

macOS と Linux ではローカルのデーモンを実行できます。Windows のデスクトップクライアントはデーモンを同梱しておらず、アカウント、TCP、SSH のいずれかで別のホストに接続します。詳しくは[デスクトップガイド](https://github.com/ait-app/ait/blob/main/apps/desktop/README.md)を参照してください。ネイティブ iOS の開発には macOS と Xcode が必要です。Android には Android SDK と、それに対応する JDK が必要です。各プラットフォームの要件は、[Apple ビルド](https://github.com/ait-app/ait/blob/main/docs/operations/apple-builds.md)と [Android ビルド](https://github.com/ait-app/ait/blob/main/docs/operations/android-releases.md)を参照してください。

リポジトリには、任意で使える Nix 環境も用意されています。`nix develop` を実行すると、Rust、Node.js、ビルドツールが準備されます。

```sh
git clone https://github.com/ait-app/ait.git
cd ait
npm ci
```

コントリビュートの準備では、ご自身のフォークの URL を使用してください。アプリごとに個別に依存関係をインストールせず、ルートのロックファイルからインストールします。

## デスクトップアプリを起動する

macOS または Linux で完全なローカル開発環境を用意するには、次を実行します。

```sh
npm run dev:desktop
```

このスクリプトは、共有パッケージ、Rust デーモン、Electron のメインプロセスをビルドしてから、開発用インターフェースとデスクトップアプリを起動します。初回のビルドでは、ネイティブ依存関係のダウンロードとコンパイルが行われます。Electron は自身が起動したデーモンを管理し、インターフェースに接続認証を渡します。

Rust を変更した後は、対応するデーモンを再ビルドして再起動してください。インターフェースを更新しても、実行中のサービスは置き換わりません。デスクトップのデバッグとパッケージングについては、[apps/desktop/README.md](https://github.com/ait-app/ait/blob/main/apps/desktop/README.md) を参照してください。

## ローカルの Web クライアントを起動する

```sh
export AIT_SERVER_TOKEN="$(openssl rand -hex 32)"
npm run dev:mobile
```

`http://localhost:8081` を開き、ホストに `127.0.0.1`、ポートに `7316`、そして現在のターミナルの `AIT_SERVER_TOKEN` を指定して、直接接続を追加します。トークンを URL や `EXPO_PUBLIC_*` 変数に含めないでください。

このエントリーポイントは、共有の依存関係と Rust バイナリをビルドしてから、デーモンと Expo を起動します。Ctrl+C で両方が停止します。開発データはデフォルトで `.tmp/app/server` に保存され、スタンドアロンのデーモンのデフォルトディレクトリとは別になります。

| 変数                  | 用途                                                                         |
| --------------------- | ---------------------------------------------------------------------------- |
| `AIT_SERVER_DATA_DIR` | 開発用データディレクトリを別の場所に変更する                                 |
| `AIT_SERVER_BIN`      | ビルド済みのデーモンバイナリを使用する                                       |
| `AIT_SERVER_LISTEN`   | リスナーのアドレスとポートを変更する。接続フォームの値も合わせて更新する     |
| `EXPO_PORT`           | Expo のポートを変更する。起動時に表示されるページのアドレスを使用する        |

ローカルの Web 開発では、デフォルトで直接接続を使用します。`aitapp.cn` のアカウントクライアントは、後述する専用のエクスポートを使用します。

## デーモンとインターフェースを個別に起動する

サービスの起動をデバッグする場合や、別のバイナリを使って作業する場合は、1 つのターミナルで次を実行します。

```sh
export AIT_SERVER_TOKEN="$(openssl rand -hex 32)"
cargo run -p daemon --bin daemon -- \
  --data-dir .tmp/app/server --listen 127.0.0.1:7316 \
  --web-origin http://localhost:8081 --web-origin http://127.0.0.1:8081
```

同じリポジトリルートの別のターミナルで、次を実行します。

```sh
npm run build:ui-deps
npm run web:expo --workspace=@ait/mobile -- --localhost --port 8081
```

接続フォームには、最初のターミナルで生成したトークンを使用します。ブラウザーのオリジンは `--web-origin` と一致している必要があります。ブラウザーは Bearer トークンを、有効期間の短い使い捨ての接続チケットと交換します。ネイティブクライアントでは、ブラウザーのオリジンを設定する必要はありません。

1 つのデータディレクトリを使用できるデーモンは、同時に 1 つだけです。起動方法を切り替える前に、以前のプロセスを停止してください。複数のインスタンスを同時にデバッグする場合は、インスタンスごとにデータディレクトリとリスナーのポートを分けてください。

現在のソースでは、スタンドアロン運用に `daemon login` に続けて `daemon run` を使用します。`--headless` フラグは廃止されました。ソースからのビルドでは `daemon` という名前の実行ファイルが生成されますが、リリースのアーカイブでは同じプログラムが `aitd` として提供されます。`AIT_SERVER_TOKEN` がない場合、どの起動方法でも、非公開のローカルトークンが生成され、再利用されます。上記のように変数を明示すると、ローカルでの接続のデバッグが容易になります。設定内容とリリース版との違いについては、[サーバー設定](/ja/docs/configuration/)と[スタンドアロンデーモン](/ja/docs/daemon/)を参照してください。

## Android と iOS 向けに開発する

デーモンを別途起動してから、対象のプラットフォームを選びます。

```sh
npm run ios --workspace=@ait/mobile
# Or
npm run android --workspace=@ait/mobile
```

これらのエントリーポイントは、ネイティブプロジェクトを起動する前に共有の依存関係をビルドします。iOS シミュレーターは、ホストに `127.0.0.1:7316` で到達できます。Android エミュレーターまたは接続済みのデバイスでは、まず次を実行します。

```sh
adb reverse tcp:7316 tcp:7316
```

その後、同じデーモントークンを使って `127.0.0.1:7316` に接続します。LAN 接続を使用する実機では、到達可能なコンピューターのアドレスと、それに合うリスナー設定が必要です。別の方法として、同じアカウントにサインインして、オンラインのホストに接続することもできます。

Release 構成のシミュレーターアプリをビルドするには、ルートで `npm run build:ios:simulator` を実行します。署名、配布、実機での検証については、[Apple ビルド](https://github.com/ait-app/ait/blob/main/docs/operations/apple-builds.md)、[Android リリース](https://github.com/ait-app/ait/blob/main/docs/operations/android-releases.md)、[モバイルガイド](https://github.com/ait-app/ait/blob/main/apps/mobile/README.md)を参照してください。

## ホスト型 Web クライアントをビルドする

```sh
npm run build:web-console --workspace=@ait/mobile
```

出力先は `apps/mobile/web-console/dist/` です。クライアントは現在、サイトルート `/` に独立した静的イメージとしてデプロイされ、同一オリジンの `/api` とサインインページを共有します。管理コンソールは `/dash` にあります。静的イメージだけを実行してもルーティングは確認できますが、アカウント API とサインインサービスは提供されません。

Docker ビルド、ルートの確認、ゲートウェイの設定については、[クライアントのデプロイガイド](https://github.com/ait-app/ait/blob/main/apps/mobile/README.md)と [ADR-188](https://github.com/ait-app/ait/blob/main/docs/decisions/clients/adr-188-standalone-web-client-image.md) を参照してください。

## Web サイトとドキュメントを開発する

Web サイトは、別リポジトリの **ait-web** で Astro を使って構築されており、Rust のビルドは不要です。Node.js 22.12 以降が必要で、Node.js 24 もこの条件を満たします。

```sh
git clone https://github.com/ait-app/ait-web.git
cd ait-web
npm ci
npm run dev
```

`http://localhost:4321/zh/docs/`、`http://localhost:4321/en/docs/`、`http://localhost:4321/ja/docs/` のいずれかを開きます。コンテンツは `content/docs/{zh,en,ja}/` にあります。3 つの言語を同期させてください。ブログは中国語と英語のみで公開しています。提出する前に、次を実行します。

```sh
npm run check
npm run build
npm run verify
```

これらのコマンドは、Astro と TypeScript のチェック、静的ページの生成、リンク、アンカー、多言語の網羅性、検索、その他のサイトコンテンツの検証を行います。ページをプレビューして、ナビゲーション、狭い画面での表示、言語の切り替え、コードブロックを確認してください。保守の詳細は [ait-web の README](https://github.com/ait-app/ait-web/blob/main/README.md) を、製品の検証と PR の手順は[コントリビュート](/ja/docs/contributing/)を参照してください。
