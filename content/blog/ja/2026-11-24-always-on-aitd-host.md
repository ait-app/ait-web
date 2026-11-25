---
title: Linux サーバーや Mac mini を常時稼働の Agent ホストにする：aitd の実運用とハマりどころ
description: 単体バイナリの Rust デーモン aitd でヘッドレス Linux や Mac mini を常駐ホストにする手順と、実際につまずきやすい 4 つのポイントです。
lang: ja
slug: always-on-aitd-host
date: 2026-11-24
category: guide
visual: connection
---

コーディングエージェントを全部ノート PC のローカルで動かしていると、いくつか面倒が出てきます。フタを閉じればビルドが止まり、コンパイルと複数エージェントが重なればファンが回りっぱなしになります。あるいは普段のメイン機は Windows で、実際の開発環境は Linux サーバーに置いている人も多いはずです。

余っている Linux サーバーや常時通電している Apple Silicon Mac mini があるなら、スタンドアロン版の `aitd` を入れるだけで常駐の作業ホストになります。`aitd` はデスクトップ版に同梱されているものと同じ Rust 製の単体実行ファイルで、GUI もデーモン専用の Node.js も要りません（動かすエージェントやプロジェクトツール自体に必要なランタイムは別途ホスト側に置きます）。

導入の流れと、実運用でよく引っかかる箇所をまとめました。

## `aitd` を入れて、つなぎ方を決める

Linux x86_64（Ubuntu 20.04、Debian 10、Rocky / AlmaLinux 8 以降の glibc 2.28 以上）と macOS Apple Silicon（macOS 13 以上）向けに単体アーカイブを配布しています。[スタンドアロンデーモン](/ja/docs/daemon/) にあるコマンドでダウンロードと `SHA256SUMS` の検証を済ませ、`/usr/local/bin/aitd` へ配置します。

接続方法は大きく 3 つです。

1. **Ait アカウントでオンラインサービスを使う**：`aitd login`（ホスト名を変えたいときは `--name my-server` を追加）を実行し、任意のブラウザーで表示された URL を開いて確認コードを入力したあと、`aitd run` で起動します。同じアカウントでサインインしたデスクトップ（Windows 含む）、スマホ、[Ait for Web](https://aitapp.cn/) からすぐにつながり、公開ポートの設定は要りません。
2. **ブラウザーを開きにくい環境では使い捨てトークンを使う**：Web のホスト詳細ページで一度限りの登録トークンを発行し、ホスト側で `aitd login --token-stdin` を実行して標準入力へ渡します（対話時は貼り付けて Enter、`Ctrl-D`）。SSH オンリーの環境や構築スクリプトと相性が良いです。
3. **アカウントを使わず LAN や SSH で直接つなぐ**：
   - **信頼できる LAN / VPN 内**：`aitd run --listen 192.168.1.10:7316` のように内向け IP を指定し、`~/.ait/local-api.token`（または `AIT_SERVER_TOKEN` で指定した空白なしの 32〜256 文字の可視 ASCII トークン）をクライアントへ入力します。ファイアウォールは信頼できるサブネットからの TCP `7316` のみ許可してください。内蔵リスナーに TLS はないのでインターネットへ直接晒さないでください。
   - **SSH トンネル経由**：ホスト側は既定の `127.0.0.1:7316` のままにして、手元で `ssh -N -L 127.0.0.1:7316:127.0.0.1:7316 user@working-host` を張り、クライアントから `127.0.0.1:7316` にリモート側のトークンでつなぎます。

なお、`aitapp.cn` のホスト版 [Ait for Web](https://aitapp.cn/) はオンラインサービス専用です。どの PC のブラウザーからでもすぐ開きたい場合は 1 番目が手軽です。

## バックグラウンドで維持する：`tmux`、`systemd`、`launchd`

`aitd run` はフォアグラウンド実行なので、SSH が切れるとそのまま終了します。

とりあえず試す、あるいはログをそのまま眺めたいなら `tmux` が一番早いです。

```sh
tmux new -s aitd
aitd run
```

`Ctrl-b` のあと `d` で抜ければ裏で動き続けます。ただしマシン再起動後は戻らないため、常駐させるなら Linux は `systemd --user`、macOS は `launchd` の LaunchAgent を使います。そのままコピーできる設定ファイルは [常時稼働させる](/ja/docs/daemon/#常時稼働させる) に置いてあります。

## 実際につまずきやすい 4 つのポイント

### 1. SSH を抜けた瞬間に Linux ホストがオフラインになる

`systemctl --user enable --now aitd` で一度つながったのに、SSH を閉じたら消える場合、たいてい次を忘れています。

```sh
sudo loginctl enable-linger "$USER"
```

`enable-linger` がない状態では、最後のログインセッション終了と同時にユーザーサービスが停止し、再起動後もログインするまで上がりません。

### 2. ターミナルでは `claude` / `codex` が動くのに、systemd や launchd 経由だと見つからない

バックグラウンド化で一番多い落とし穴です。`systemd` と `launchd` は `~/.bashrc` や `~/.zshrc` を読み込まないため、`nvm`、`fnm`、npm のグローバルディレクトリ、Homebrew 経由で入れた CLI がサービスの既定 `PATH` から抜けます（`tmux` は対話シェルの環境を引き継ぐため起きにくいです）。

対策は 2 通りです。
- service ファイルや plist 内の `PATH` に該当ディレクトリを足す。
- あるいは `AIT_SERVER_CODEX_BIN`、`AIT_SERVER_CLAUDE_BIN`、`AIT_SERVER_OPENCODE_BIN` などの環境変数で実行ファイルの絶対パスを直接指定する（一覧は [プロバイダーの実行ファイルを選択する](/ja/docs/configuration/#プロバイダーの実行ファイルを選択する) を参照）。変更後はデーモンを再起動してください。

### 3. 古い起動スクリプトに `--headless` が残っている

v0.1.20 などの旧版から運用している環境では、`ait-daemon run --headless` のまま残っていることがあります。`--headless` は v0.1.22 で廃止され、バイナリ名も v0.1.30 から `aitd` に統一されました。古いスクリプトから `--headless` を外してパスを `/usr/local/bin/aitd` に直し、起動前に `aitd --version` と `aitd run --help` で確認しておくと安全です。

### 4. デーモンを止めずに `login` や `logout` を実行してしまう

同じデータディレクトリを使うデーモンが動いたまま再認可やログアウトをせず、先にサービスを止めてから実行し、終わったら起動し直してください。状態確認は `aitd status --json` で見られます。`reauthorization_required` が出ている場合も、停止 → `aitd login` → 再起動の順で復旧します。

また、macOS の LaunchAgent はそのユーザーがログインして初めて動き出します。モニターをつながない Mac mini で運用する場合は、対象ユーザーの自動ログインを有効にしておいてください。

ホストがオンラインになったら、そのマシン上で Codex や Claude Code の初回 OAuth サインインを済ませるのに SSH ポート転送は不要です。デスクトップ版の内蔵ブラウザーを使う手順は [Ait の内蔵ブラウザーでリモートホスト上の Codex や Claude にサインインする](/ja/blog/browser-login-on-host/) にまとめています。
