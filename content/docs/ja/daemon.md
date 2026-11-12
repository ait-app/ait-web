---
title: スタンドアロンデーモン
description: 別途リリースされる aitd をダウンロード・検証・インストールし、無人モードで実行して、デスクトップのない Linux または macOS ホストを Ait アカウントに接続します。
lang: ja
slug: daemon
group: reference
order: 5.5
---

Ait の安定版リリースには、実行ファイル `aitd` 1 つを含むスタンドアロンデーモンのアーカイブが付属します。クラウドサーバー、ビルドマシン、常時稼働の Mac mini など、デスクトップ画面を必要としないホストで使用します。無人モードで実行して Ait アカウントにサインインすると、そのホストがオンラインのホスト一覧に表示され、デスクトップ、Android、iOS、Web の各クライアントから接続できます。

> **バージョンの範囲:** 以下のダウンロードとサービスの例は **v0.2.7** を対象としており、`run` を使用します。v0.1.20 などの旧バージョンでは `run --headless` を使用していました。アップグレードする際は以下の移行手順に従い、お使いのバージョンに合わせて起動引数を揃えてください。

このページでは 2 つの用語を使います。

- **スタンドアロンデーモン**は入手方法を指します。デスクトップアプリに同梱してインストールするのではなく、別途ダウンロードする `aitd` プログラムです。デスクトップアプリが同梱しているものと同じプログラムです。
- **無人運用**は動かし方を指します。`aitd login` でマシンを認可し、`aitd run` で起動します。デーモンは、マシンの前に誰もいなくてもアカウントリレー経由でオンラインを維持し、再起動後は自動的に再接続します。

0.1.22 以降、直接起動、`run`、デスクトップからの起動は同じライフサイクルを使用します。ローカル API はサインイン前から利用でき、デーモンはマシン認可の後にオンライン接続を維持します。古い起動スクリプトから `--headless` を削除してください。リスナー、データディレクトリ、ローカル API トークンについては、[サーバー設定](/ja/docs/configuration/)をご覧ください。

デスクトップアプリがあるコンピューターでは、これは不要です。デスクトップアプリにはデーモンが含まれており、同じマシン認可とオンライン接続のフローでそのライフサイクルを管理します。

## 最新ソースとアップグレード

**0.1.30** 以降、スタンドアロンのアーカイブとデスクトップのバンドルでは、実行ファイル名として `aitd` を使用します。既存のサービスをアップグレードする場合は、サービス名はそのままにして、systemd の `ExecStart` または launchd の `ProgramArguments` を `/usr/local/bin/aitd` に変更し、再読み込みして再起動してください。古い `/usr/local/bin/ait-daemon` は、新しいパスが使われていることを確認してから削除します。

> **実験的な Bot のデータ変更:** 0.1.30 は起動時に、従来の Bot 設定、チャネル、会話、履歴を移行せずに破棄します。これらのデータが必要な場合は、アップグレードして起動する前にデーモンのデータディレクトリをバックアップしてください。ワークスペースの古い `.ait/bots/` メモリファイルは自動では削除されません。詳しくは [0.1.30 リリースノート](https://github.com/ait-app/ait/releases/tag/v0.1.30)をご覧ください。

現在のスタンドアロンデーモンとデスクトップ同梱のデーモンは、認可と公開のフローを共有しています。

```sh
aitd login
aitd run
```

`--headless` フラグは削除されました。この変更を含むビルドにアップグレードしたら、tmux のコマンド、systemd の `ExecStart`、launchd の `ProgramArguments` から削除し、サービス設定を再読み込みしてください。起動する前に `aitd --version` と `aitd run --help` を確認します。

`AIT_SERVER_TOKEN` が未設定の場合、どの起動経路でも `<data-dir>/local-api.token` が生成され、再利用されます。マシンの認可、リースの更新、再接続はデーモンが担当します。クライアントを終了しても認可は取り消されません。ホストを明示的に切断すると、認可が消去されます。ソースビルドでは `target/release/daemon` が生成されます。現在のセットアップについては、[ローカル開発](/ja/docs/development/)、[サーバー設定](/ja/docs/configuration/)、[デーモンマニュアル](https://github.com/ait-app/ait/blob/main/docs/operations/headless-daemon.md)をご覧ください。

以下のダウンロードとサービスの例は v0.2.7 を使用しています。別のバージョンを実行する場合は、そのリリースのアセットと引数を使用してください。

## 要件

| プラットフォーム | アーカイブ | 要件 |
| --- | --- | --- |
| Linux x86_64 | `daemon-linux-x64` | glibc 2.28 以降（Ubuntu 20.04、Debian 10、RHEL / Rocky / AlmaLinux 8 以降など） |
| macOS Apple Silicon | `daemon-macos-arm64` | macOS 13 以降。実行ファイルは Apple の署名と公証を受けています |

次のものも必要です。

- Ait アカウント。このホストに接続するクライアントでも同じアカウントを使用してください。
- このホストにインストールされ、サインイン済みのエージェント CLI が 1 つ以上。[エージェントのセットアップ](/ja/docs/providers/)をご覧ください。

## ダウンロード (v0.2.7)

| プラットフォーム | GitHub リリース | 中国向けダウンロードミラー |
| --- | --- | --- |
| Linux x86_64 | [Ait-0.2.7-daemon-linux-x64.tar.gz](https://github.com/ait-app/ait/releases/download/v0.2.7/Ait-0.2.7-daemon-linux-x64.tar.gz) | [COS ダウンロード](https://download.aitapp.cn/v0.2.7/Ait-0.2.7-daemon-linux-x64.tar.gz) |
| macOS Apple Silicon | [Ait-0.2.7-daemon-macos-arm64.tar.gz](https://github.com/ait-app/ait/releases/download/v0.2.7/Ait-0.2.7-daemon-macos-arm64.tar.gz) | [COS ダウンロード](https://download.aitapp.cn/v0.2.7/Ait-0.2.7-daemon-macos-arm64.tar.gz) |

どちらの場所も同一のファイルを提供します。チェックサムファイル `SHA256SUMS` は、[GitHub リリース](https://github.com/ait-app/ait/releases/tag/v0.2.7)でのみ公開されています。他のバージョンのアーカイブも同じ名前で、[すべてのリリース](https://github.com/ait-app/ait/releases)に置かれています。

## インストール

以下のコマンドは、GitHub からアーカイブをダウンロードし、チェックサムを検証して、`aitd` を `/usr/local/bin` にインストールします。中国本土では、最初の `curl` の URL を `https://download.aitapp.cn/v${VERSION}/${ASSET}` に置き換えることができます。

### Linux

```sh
VERSION=0.2.7
ASSET="Ait-${VERSION}-daemon-linux-x64.tar.gz"
curl -fLO "https://github.com/ait-app/ait/releases/download/v${VERSION}/${ASSET}"
curl -fLO "https://github.com/ait-app/ait/releases/download/v${VERSION}/SHA256SUMS"
grep -F "  ${ASSET}" SHA256SUMS | sha256sum -c -
tar -xzf "${ASSET}"
sudo install -m 0755 aitd /usr/local/bin/aitd
aitd --version
```

### macOS

```sh
VERSION=0.2.7
ASSET="Ait-${VERSION}-daemon-macos-arm64.tar.gz"
curl -fLO "https://github.com/ait-app/ait/releases/download/v${VERSION}/${ASSET}"
curl -fLO "https://github.com/ait-app/ait/releases/download/v${VERSION}/SHA256SUMS"
grep -F "  ${ASSET}" SHA256SUMS | shasum -a 256 -c -
tar -xzf "${ASSET}"
sudo mkdir -p /usr/local/bin
sudo install -m 0755 aitd /usr/local/bin/aitd
aitd --version
```

検証に成功すると `OK` と表示されます。何も表示されない場合や `FAILED` と表示された場合は、ダウンロードしたファイルを削除し、もう一度ダウンロードしてからインストールしてください。

このリリースでは、パッケージ化されたプログラム名とコマンドラインのヘルプの両方で `aitd` を使用します。

## 無人モードで実行する

まずこのマシンを認可してから、デーモンを無人モードで起動します。デーモンを実行するのと同じシステムユーザーで、次のコマンドを実行してください。

```sh
aitd login
aitd run
```

`login` は Web アドレスと確認コードを表示します。任意のデバイスのブラウザーでそのアドレスを開き、Ait アカウントにサインインして、コードを入力し、このマシンを承認します。

オンラインのホスト一覧では、既定でシステムのホスト名がこのマシンの名前になります。別の名前を使うには、サインイン時に `--name` を追加します（例: `aitd login --name my-server`）。

認可後、`run` は公式のアカウントサービス `https://aitapp.cn/api` に接続し、ローカルの `127.0.0.1:7316` で待ち受けます。以降の再起動では、再度サインインしなくても認可が復元されます。別のデバイスで同じアカウントにサインインし、オンラインのホスト一覧からこのホストを選択してください。詳しくは[接続とデータ](/ja/docs/connection/)をご覧ください。

ブラウザーを開くのが難しい場合は、Web 上のホスト詳細ページで使い捨ての登録トークンを発行し、標準入力からサインインします。

```sh
aitd login --token-stdin
```

認可と実行状態を確認するには、次のコマンドを使います。

```sh
aitd status --json
```

新規インストールでは `~/.ait` を使用します。データディレクトリを明示的に指定しない場合、デーモンは `~/.ait`、`~/.ait-server-desktop`、`~/.ait-server` の順で、最初に存在するパスを選びます。既存のディレクトリが移動または統合されることはありません。特定の場所を使い続けるには `--data-dir` を指定してください。選択されたディレクトリには、マシン認可、ローカル API トークン、作業データが保存されます。待ち受けアドレス、データディレクトリ、その他のオプションについては、[サーバー設定](/ja/docs/configuration/)をご覧ください。

## 常時稼働させる

`aitd run` はフォアグラウンドで動作し、ターミナルを閉じたり SSH 接続が切れたりすると終了します。

以下の新規インストール向けの例では、プログラム、tmux セッション、systemd サービス、ログの名前に `aitd` を使用しています。旧リリースからアップグレードしたホストでは既存の名前を使い続けられ、変更が必要なのは起動パスを `/usr/local/bin/aitd` にすることだけです。

### おすすめ: tmux で実行する

tmux は最も手軽な方法です。接続を切ってもデーモンは動き続け、セッションに戻ってログを確認できます。

```sh
tmux new -s aitd
aitd run
```

`Ctrl-b` を押してから `d` を押すとデタッチされ、デーモンは動き続けます。後で `tmux attach -t aitd` で再接続し、セッション内で `Ctrl-c` を押すと停止します。tmux がインストールされていない場合は、Linux ではディストリビューションのパッケージマネージャー（例: `sudo apt install tmux`）、macOS では `brew install tmux` を使用してください。

tmux のセッションはホストの再起動後には残りません。起動時にデーモンを自動的に開始するには、代わりに systemd または launchd を使用してください。

### 永続的な起動: Linux の systemd

`login` を完了したのと同じユーザーで、systemd のユーザーサービスを作成します。

```sh
mkdir -p ~/.config/systemd/user
cat > ~/.config/systemd/user/aitd.service <<'EOF'
[Unit]
Description=Ait daemon

[Service]
ExecStart=/usr/local/bin/aitd run
Restart=on-failure
RestartSec=5
Environment=PATH=%h/.local/bin:/usr/local/bin:/usr/bin:/bin

[Install]
WantedBy=default.target
EOF
systemctl --user daemon-reload
systemctl --user enable --now aitd
sudo loginctl enable-linger "$USER"
```

`enable-linger` を実行すると、ユーザーがログインしていなくても、起動時にサービスが開始されます。ログは `journalctl --user -u aitd -f` で追跡できます。

### 永続的な起動: macOS の launchd

`login` を完了したのと同じユーザーで、LaunchAgent を作成します。

```sh
mkdir -p ~/Library/LaunchAgents ~/Library/Logs
cat > ~/Library/LaunchAgents/com.ait-app.aitd.plist <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>com.ait-app.aitd</string>
  <key>ProgramArguments</key>
  <array>
    <string>/usr/local/bin/aitd</string>
    <string>run</string>
  </array>
  <key>EnvironmentVariables</key>
  <dict>
    <key>PATH</key><string>$HOME/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin</string>
  </dict>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><true/>
  <key>StandardOutPath</key><string>$HOME/Library/Logs/aitd.log</string>
  <key>StandardErrorPath</key><string>$HOME/Library/Logs/aitd.log</string>
</dict>
</plist>
EOF
launchctl bootstrap "gui/$(id -u)" ~/Library/LaunchAgents/com.ait-app.aitd.plist
```

LaunchAgent は、そのユーザーがログインした後に実行されます。誰もログインしていない状態で Mac をオンラインに保つには、そのユーザーの自動ログインを有効にしてください。ログは `~/Library/Logs/aitd.log` に出力されます。

systemd と launchd は `~/.bashrc` や `~/.zshrc` などのシェル設定を読み込まないため、PATH がターミナルと異なる場合があります。エージェントが別の場所（グローバルの npm ディレクトリや nvm など）にインストールされている場合は、上の `PATH` にそのディレクトリを追加するか、`AIT_SERVER_CODEX_BIN` などの変数でプログラムの絶対パスを指定してください。[サーバー設定](/ja/docs/configuration/)をご覧ください。tmux はターミナルの環境を引き継ぐため、通常は追加の設定は不要です。

### 停止と起動

この表は、新規インストール向けの例で使った `aitd` の名前を前提としています。従来のサービス名、ラベル、plist のパス、ログのパスをそのまま使っている場合は、これらのコマンドでそれらに置き換えてください。

| 方法 | 停止 | 起動 |
| --- | --- | --- |
| tmux | セッション内で `Ctrl-c` を押す | セッション内で `aitd run` を実行する |
| systemd | `systemctl --user stop aitd` | `systemctl --user start aitd` |
| launchd | `launchctl bootout "gui/$(id -u)/com.ait-app.aitd"` | `launchctl bootstrap "gui/$(id -u)" ~/Library/LaunchAgents/com.ait-app.aitd.plist` |

## アップグレード

新しい `VERSION` でインストール手順を繰り返し、[停止と起動](#停止と起動)の手順でデーモンを再起動します。systemd の場合は `systemctl --user restart aitd` も使えます。アップグレードしても、マシン認可とデータディレクトリは保持されます。再度サインインする必要はありません。

## 再認可、サインアウト、アンインストール

サインイン、再認可、サインアウトの前に、[停止と起動](#停止と起動)の手順で同じデータディレクトリを使用しているデーモンを停止し、完了したら再び起動してください。

- 認可が無効になると、ステータスに `reauthorization_required` と表示されます。デーモンを停止して `aitd login` を実行し、再び起動してください。認可を意図的に置き換える場合は `aitd login --force` を使用します。
- `aitd logout` は、このマシンの認可を取り消し、ローカルの認証情報を消去します。アカウントサービスに到達できない場合は、表示される案内に従って、Web 上のホスト詳細ページから取り消してください。
- アンインストールするには、サインアウトし、systemd または launchd のサービスを無効にしてサービスファイルを削除してから、`/usr/local/bin/aitd` を削除します。データディレクトリは自動では削除されません。新規インストールでは `~/.ait`、既存のインストールではデーモンが選択した `~/.ait-server-desktop` または `~/.ait-server`、もしくは `--data-dir` で指定したパスです。不要になったら手動で削除してください。

認可の復旧、認証情報ファイル、ステータスのフィールドについては、[無人デーモンガイド](https://github.com/ait-app/ait/blob/main/docs/operations/headless-daemon.md)をご覧ください。
