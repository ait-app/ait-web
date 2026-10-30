---
title: 本地开发
description: 准备 Ait 工具链，从源码启动桌面、Web、移动端或独立 daemon，并在本地预览官网文档。
lang: zh
slug: development
group: development
order: 8
---

本页根据 Ait 当前源码文档整理。参与开发前先阅读[贡献指南](/zh/docs/contributing/)；安装已发布应用请看[快速上手](/zh/docs/quick-start/)。除最后一节官网开发外，以下命令均在 `ait` 仓库根目录执行。

## 准备工具链

- Git、**Node.js 24** 和 npm。
- [rust-toolchain.toml](https://github.com/ait-app/ait/blob/main/rust-toolchain.toml) 指定的 Rust 工具链及 `rustfmt`、Clippy。仓库固定版本，使用 rustup 时在仓库内按该文件选择工具链。
- CMake 与系统 C/C++ 构建工具，用于原生依赖。
- 联调 Agent 时，在工作主机安装并认证所需 CLI，先确认它能独立运行，见 [Agent 接入](/zh/docs/providers/)。

macOS / Linux 可运行本机 daemon。Windows 桌面客户端不附带 daemon，通过账户、TCP 或 SSH 连接其他主机；构建边界见[桌面说明](https://github.com/ait-app/ait/blob/main/apps/desktop/README.md)。原生 iOS 开发需要 macOS 与 Xcode，Android 需要 Android SDK 和对应的 JDK；平台细节见 [Apple 构建](https://github.com/ait-app/ait/blob/main/docs/operations/apple-builds.md)与 [Android 构建](https://github.com/ait-app/ait/blob/main/docs/operations/android-releases.md)。

仓库还提供可选的 Nix 环境，运行 `nix develop` 可准备 Rust、Node.js 与构建工具。

```sh
git clone https://github.com/ait-app/ait.git
cd ait
npm ci
```

准备贡献时可把克隆地址换成自己的 Fork。使用根目录 lockfile，不要在各应用下单独安装另一套依赖。

## 启动桌面应用

macOS / Linux 的完整本机开发入口：

```sh
npm run dev:desktop
```

脚本构建共享包、Rust daemon 和 Electron 主进程，再启动开发界面与桌面应用。首次构建需要下载和编译原生依赖。Electron 主进程管理其启动的 daemon，并向界面提供连接认证。

修改 Rust 后需重新构建并重启对应 daemon；刷新界面不会替换正在运行的服务。桌面专用调试与打包说明见 [apps/desktop/README.md](https://github.com/ait-app/ait/blob/main/apps/desktop/README.md)。

## 启动本地 Web 客户端

```sh
export AIT_SERVER_TOKEN="$(openssl rand -hex 32)"
npm run dev:mobile
```

打开 `http://localhost:8081`，添加直接连接：Host 填 `127.0.0.1`，端口 `7316`，访问令牌填写当前终端的 `AIT_SERVER_TOKEN`。不要把令牌放进 URL 或 `EXPO_PUBLIC_*` 变量。

入口构建共享依赖与 Rust binary，然后启动 daemon 和 Expo；Ctrl+C 会同时停止两者。开发数据默认保存在 `.tmp/app/server`，与独立 daemon 的默认目录分开。

| 变量                  | 用途                                       |
| --------------------- | ------------------------------------------ |
| `AIT_SERVER_DATA_DIR` | 更换开发 daemon 的数据目录                 |
| `AIT_SERVER_BIN`      | 使用已经构建的 daemon binary               |
| `AIT_SERVER_LISTEN`   | 更换监听地址与端口，连接表单也要同步       |
| `EXPO_PORT`           | 更换 Expo 端口，以启动输出中的页面地址为准 |

本地 Web 开发默认使用直接连接。线上 `aitapp.cn` 的账号客户端采用专用导出，见下方部署说明。

## 分别启动 daemon 与界面

需要调试服务启动或复用已有 binary 时，在一个终端运行：

```sh
export AIT_SERVER_TOKEN="$(openssl rand -hex 32)"
cargo run -p daemon --bin daemon -- \
  --data-dir .tmp/app/server --listen 127.0.0.1:7316 \
  --web-origin http://localhost:8081 --web-origin http://127.0.0.1:8081
```

在另一个终端、同一仓库根目录运行：

```sh
npm run build:ui-deps
npm run web:expo --workspace=@ait/mobile -- --localhost --port 8081
```

连接表单使用第一个终端生成的令牌。浏览器来源必须与 `--web-origin` 匹配；浏览器通过 Bearer 交换短时一次性连接票据。原生客户端不需要设置浏览器来源。

同一数据目录只能由一个 daemon 使用。切换启动方式前先停止旧进程；并行调试时为每个实例指定不同的数据目录和监听端口。

独立 daemon 的当前源码启动流程为 `daemon login` 后 `daemon run`，已移除 `--headless` 开关。所有启动入口在没有 `AIT_SERVER_TOKEN` 时都会生成并复用私有本地令牌；上面的显式变量便于本地连接调试。配置与已发布版本的区别见[服务配置](/zh/docs/configuration/)和[独立 daemon](/zh/docs/daemon/)。

## 联调 Android 与 iOS

先单独启动 daemon，再选择目标平台：

```sh
npm run ios --workspace=@ait/mobile
# 或
npm run android --workspace=@ait/mobile
```

这些入口会先构建共享依赖，再启动对应原生工程。iOS simulator 可连接宿主机 `127.0.0.1:7316`；Android 模拟器或已连接设备可先运行：

```sh
adb reverse tcp:7316 tcp:7316
```

随后使用 `127.0.0.1:7316` 和同一 daemon 令牌连接。真机通过局域网直连时，需要可达的工作电脑地址及相应监听配置；也可以登录同一账户连接在线主机。

模拟器 Release App 可在根目录用 `npm run build:ios:simulator` 构建。签名、发布与真机验收分别见 [Apple 构建](https://github.com/ait-app/ait/blob/main/docs/operations/apple-builds.md)、[Android 发布](https://github.com/ait-app/ait/blob/main/docs/operations/android-releases.md)与[移动端说明](https://github.com/ait-app/ait/blob/main/apps/mobile/README.md)。

## 构建托管 Web 客户端

```sh
npm run build:web-console --workspace=@ait/mobile
```

产物在 `apps/mobile/web-console/dist/`。当前部署方式是网站根路径 `/` 的独立静态镜像，共用同源 `/api` 与登录页，管理控制台位于 `/dash`。单独运行静态镜像只可验证路由，不会提供账户 API 或登录服务。

Docker 构建、路由检查和网关配置见[客户端部署说明](https://github.com/ait-app/ait/blob/main/apps/mobile/README.md)与 [ADR-188](https://github.com/ait-app/ait/blob/main/docs/decisions/clients/adr-188-standalone-web-client-image.md)。

## 开发官网与文档

官网使用独立的 **ait-web** 仓库和 Astro，不需要构建 Rust。需要 Node.js 22.12 或更高版本；使用 Node.js 24 也可满足要求。

```sh
git clone https://github.com/ait-app/ait-web.git
cd ait-web
npm ci
npm run dev
```

打开 `http://localhost:4321/zh/docs/` 或 `http://localhost:4321/en/docs/`。正文位于 `content/docs/{zh,en}/`，新增或修改时同步两种语言。提交前运行：

```sh
npm run check
npm run build
npm run verify
```

检查分别覆盖 Astro / TypeScript、静态生成，以及链接、锚点、双语完整性和搜索等站点内容。再预览实际页面，检查导航、窄屏阅读、语言切换和代码块。更完整的维护说明见 [ait-web README](https://github.com/ait-app/ait-web/blob/main/README.md)；产品代码的验证与 PR 流程见[参与贡献](/zh/docs/contributing/)。
