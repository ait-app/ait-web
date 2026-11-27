---
title: 対応プラットフォーム
description: デスクトップ、Android、iOS、Web でのインストール方法と、現在利用できる接続機能を紹介します。
lang: ja
slug: platforms
group: start
order: 2
---

Ait のデスクトップ、Web、モバイルの各クライアントは、共通のインターフェイスと Rust プロトコルを再利用しています。インストール方法と接続方法はプラットフォームごとに異なります。以下の現在の機能を参考に、利用開始する環境を選んでください。

## TestFlight / Google Play ベータテスト

### iPhone と iPad

公開されている招待リンクから、[Ait の TestFlight ベータに参加](https://testflight.apple.com/join/fjc7g46u)できます。事前にメールで参加を申請する必要はありません。

1. iPhone または iPad に Apple の TestFlight をインストールします。
2. 同じデバイスで招待リンクを開き、招待を承諾して Ait をインストールします。
3. 作業用コンピューターに Ait をインストールしてエージェントを設定し、モバイルデバイスから接続します。

利用可能なビルドとテスターのスペースは TestFlight に表示されます。ベータに参加またはインストールできない場合は、[support@ait-app.com](mailto:support@ait-app.com) までご連絡ください。

### Google Play クローズドテスト

Google Play 版は 18 歳以上の成人を対象としています。地域のコンテンツレーティングにより、より高い年齢が求められる場合があります。

1. Google Play で使用している **Google アカウントのメールアドレス**を **[support@ait-app.com](mailto:support@ait-app.com)** に送り、Android のクローズドテストへの参加を希望する旨を記載してください。
2. アクセス権が付与されたら、同じ Google アカウントで [Ait クローズドテストに参加する](https://play.google.com/apps/testing/dev.ait.mobile)を開きます。
3. Google Play のページでテストへの参加を選択し、表示される手順に従って Ait をインストールします。

クローズドテストは現在メールアドレスのリストで管理しており、リンクを開くだけでは自動的にアクセス権は付与されません。利用可否は、Play アカウントの国または地域とデバイスの互換性によって異なります。参加できない場合は、承認された Google アカウントでサインインしているか確認してください。以前に内部テストに参加していた場合は、元のテストページで内部テストから退出してから、上記のリンクでクローズドテストに参加してください。

## デスクトップ

公式の [GitHub リリース](https://github.com/ait-app/ait/releases/latest)には、Apple Silicon の macOS、Linux x86_64、Windows x64 向けのインストーラーと、検証用の `SHA256SUMS` があります。macOS と Linux のデスクトップアプリは同梱のデーモンを自動で起動します。

### macOS Apple Silicon

DMG を開き、Ait を「アプリケーション」にドラッグして起動します。ZIP をダウンロードして展開し、Ait を「アプリケーション」に移動する方法もあります。中国本土では[中国向けダウンロードミラー（DMG、v0.2.28）](https://download.aitapp.cn/v0.2.28/Ait-0.2.28-macos-arm64.dmg)を利用できます。

### Linux x86_64

- **Arch Linux（AUR）**：`paru -S ait-bin` または `yay -S ait-bin` で、CI が公開する[ビルド済みの安定版](https://aur.archlinux.org/packages/ait-bin)をインストールします。`main` からビルドする場合は `paru -S ait-git` を使います（[ソースパッケージ](https://aur.archlinux.org/packages/ait-git)）。
- **Debian / Ubuntu（.deb）**：ダウンロード先で `sudo apt install ./Ait-*-linux-amd64.deb` を実行します。
- **Fedora / RHEL（.rpm）**：ダウンロード先で `sudo dnf install ./Ait-*-linux-x86_64.rpm` を実行します。
- **AppImage / tar.gz**：`chmod +x Ait-linux-x86_64.AppImage` で実行権限を付け、`./Ait-linux-x86_64.AppImage` を実行します。tar.gz の場合は `tar -xzf Ait-*-linux-x64.tar.gz` で展開し、展開先の `./Ait` を実行します。一致するファイルはダウンロード先に一つだけ置いてください。

ait-bin、.deb、.rpm は依存パッケージの `bubblewrap >= 0.8.0` もインストールします。ait-git、AppImage、tar.gz でサンドボックス Worktree を使う場合は、対象バージョン以降の bubblewrap を別途インストールし、非特権ユーザー名前空間を許可してください。選んだパッケージの依存バージョンがディストリビューションのリポジトリで提供されている必要があります。

### Windows x64

Windows 版はオンラインサービス、直接接続、リモート SSH で作業ホストに接続するクライアントです。ローカルではデーモンを起動しません。ヘッドレスの Linux x86_64 や常時稼働の Apple Silicon Mac では[スタンドアロンデーモン](/ja/docs/daemon/)を利用できます。

## Android

Android は、作業用コンピューターに接続するクライアントとして動作します。スマートフォン上でデーモンを実行したり、スマートフォンを作業ホストとして公開したりすることはありません。

**オンラインサービス → サインイン / 登録**を開き、システムブラウザーでサインインを完了して Ait に戻ります。デスクトップアプリと同じアカウントとサービスを使用し、オンラインのコンピューターを選択してください。ホストの同期については[接続とデータ](/ja/docs/connection/)を参照してください。

新しいクライアントは、バックグラウンドでネットワーク動作を一時停止するまで、アカウントのリレー接続とダウンロードを最大 2 分間維持しようとします。オペレーティングシステムによって、それより早くアプリが停止される場合もあります。フォアグラウンドに戻ると接続が再開されます。詳しくは[接続とデータ](/ja/docs/connection/)を参照してください。ソースからのビルドについては、[モバイルガイド](https://github.com/ait-app/ait/blob/main/apps/mobile/README.md)と [Android リリースガイド](https://github.com/ait-app/ait/blob/main/docs/operations/android-releases.md)を参照してください。

> 利用できるストア向けテストビルド、地域、機能は、リリースノートに従います。サインインやリレーに問題がある場合は、[サポート](/ja/docs/support/)への連絡時にアプリのバージョンとデバイスの情報を添えてください。

## iOS

iOS は、アカウントへのサインインとリレー接続に加えて、直接接続にも対応しています。**オンラインサービス → サインイン / 登録**を開き、システムの認証ウィンドウでホスト型サインインを完了します。ソースからのビルドは、実機とシミュレーターに対応しています。インストールの前に [Apple ビルドガイド](https://github.com/ait-app/ait/blob/main/docs/operations/apple-builds.md)を、アカウント設定とデバイス認証については[サインインガイド](https://github.com/ait-app/ait/blob/main/docs/operations/authing-client-login.md)をお読みください。

Ait リポジトリのルートから、シミュレーター向けにビルドします。

```sh
npm run build:ios:simulator
```

iOS シミュレーターは、ループバック経由でホストにアクセスできます。実機からの直接接続には、到達可能なコンピューターのアドレスが必要です。`127.0.0.1` はスマートフォン自身を指します。アカウントリレーでは、ローカルのホストアドレスは不要です。新しい iOS クライアントは Android と同じバックグラウンド接続の猶予時間を使用します。詳しくは[接続とデータ](/ja/docs/connection/)を参照してください。

## Web

**[Ait for Web](https://aitapp.cn/)**を開き、デスクトップアプリと同じ Ait アカウントでサインインすると、オンラインホストに接続してブラウザーで作業を続けられます。このデバイスにクライアントをインストールする必要はありませんが、エージェントを実行しているコンピューターはオンラインのままにしておく必要があります。

このマーケティングサイトは、エージェントの Web クライアントとは別のものです。現在のクライアントは、サイトのルート `/` に別の静的イメージとしてデプロイされ、同一オリジンのサインインと `/api` を共有します。管理コンソールは `/dash` にあります。[ADR-188](https://github.com/ait-app/ait/blob/main/docs/decisions/clients/adr-188-standalone-web-client-image.md)を参照してください。

ローカルでの Web 開発では直接接続を使用します。前提条件、起動コマンド、トークン、ブラウザーのオリジン、ホスト型ビルドについては、[ローカル開発](/ja/docs/development/)を参照してください。

## 一覧

| プラットフォーム | ローカルデーモンの実行 | アカウント接続 | 直接接続 |
| --- | --- | --- | --- |
| macOS / Linux デスクトップ | あり | あり | あり |
| Windows デスクトップ | なし | あり | あり |
| スタンドアロンデーモン（Linux / macOS） | あり | あり | あり |
| Android | なし | あり | あり |
| iOS / iPadOS | なし | あり | あり |
| ホスト型 Web クライアント | なし | あり（コンソールビルド） | なし |
| ローカル Web クライアント | 別のサービスが必要 | なし | あり |
