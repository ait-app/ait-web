---
title: Contributing
description: Start with documentation, a reproducible issue, or a code improvement. Learn where changes belong, how to validate them, and how to submit a pull request.
lang: en
slug: contributing
group: development
order: 7
---

You can contribute by fixing documentation, improving translations, reproducing issues, refining the interface, or adapting agents. A small change that you can verify independently is a useful first contribution.

## Choose a repository and task

| What you want to improve                                           | Repository                                            |
| ------------------------------------------------------------------ | ----------------------------------------------------- |
| Daemon, agent adapters, desktop, mobile, Agent Web client, and SDK | [ait-app/ait](https://github.com/ait-app/ait)         |
| Marketing website, public docs, translations, and download links   | [ait-app/ait-web](https://github.com/ait-app/ait-web) |

Search existing [Ait issues](https://github.com/ait-app/ait/issues) and [pull requests](https://github.com/ait-app/ait/pulls) first. For a substantial feature or architectural change, consider opening an issue with the use case, expected behavior, and proposed scope. Small documentation fixes can go directly to a PR.

When reporting a problem, include the version, platform, reproduction steps, expected and actual behavior, and relevant logs you have checked for private data. See the checklist in [Support](/en/docs/support/). Keep tokens, passwords, and private project files out of public issues.

## Prepare your environment

If you do not have write access, fork the repository on GitHub, clone your fork, and create a task branch. In an existing checkout, start a branch from an up-to-date main branch, for example:

```sh
git switch -c docs/improve-development-guide
```

See [Local development](/en/docs/development/) for prerequisites, desktop and Web startup, native mobile development, and website previews. Ait installs JavaScript dependencies through its root npm workspace and builds the Rust daemon through its root Cargo workspace.

## Find the owning code

| Path                                                                                     | Responsibility                                                                     |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `bins/daemon`                                                                            | Entry point, host lifecycle, authentication, and capability assembly               |
| `crates/domain`, `crates/model`                                                          | Domain values and invariants, shared collaboration ports, and protocol resources   |
| `crates/provider`                                                                        | Native agent adapters, execution, history, and skill installation                  |
| `crates/metadata`, `crates/filesystem`                                                   | Project and workspace lifecycle; files, Git, Forge, and local worktree adapters    |
| `crates/terminal`, `crates/voice`, `crates/schedule`, `crates/bot`                       | Terminal, voice, scheduling, and Bot capabilities                                  |
| `crates/persistence`, `crates/api`, `crates/relay`, `crates/host-link`, `crates/browser` | Persistence, API, online transport, host authorization, and browser services       |
| `apps/mobile`                                                                            | Shared Expo / React Native interface for phones, browsers, and Electron            |
| `apps/desktop`                                                                           | Electron main process, desktop integration, and packaging                          |
| `packages/protocol`, `packages/client`                                                   | Repository-local protocol, SDK, and account session logic                          |
| `docs`                                                                                   | Current architecture, ADRs, operations, engineering policy, and validation records |

Shared interface changes usually start in `apps/mobile`; window or desktop system integration starts in `apps/desktop`. Native agent behavior belongs in `crates/provider`. Keep adapter logic out of the daemon. See [Current architecture](https://github.com/ait-app/ait/blob/main/docs/architecture/README.md) for the complete responsibilities and allowed dependencies.

## Follow the engineering rules

Read [AGENTS.md](https://github.com/ait-app/ait/blob/main/AGENTS.md) before making changes. Before every Rust change, including tests and refactors, read the [Rust style guide](https://github.com/ait-app/ait/blob/main/docs/policy/rust.md).

- Rust is the fixed server implementation language. Keep the root Cargo workspace buildable. Dependencies point inward: adapters implement ports, and the application coordinates domain behavior.
- New Rust behavior needs tests. Put unit tests in separate child files declared by their parent module, rather than inline in production files.
- Provider behavior tests belong in `crates/provider`, next to their adapter or service. Daemon tests cover host lifecycle, transport, and cross-capability integration. See [ADR-179](https://github.com/ait-app/ait/blob/main/docs/decisions/providers/adr-179-provider-owned-tests.md).
- Before changing durable boundaries, read [docs/README.md](https://github.com/ait-app/ait/blob/main/docs/README.md), record an ADR, and update the documentation index. See the [documentation policy](https://github.com/ait-app/ait/blob/main/docs/policy/documentation.md) for organization and maintenance.
- Do not commit credentials, provider tokens, local SQLite databases, or runtime artifacts. Preserve third-party licenses and attribution.

## Validate the affected scope

Run the following commands from the **Ait product repository root**. Select checks relevant to your change and report the actual commands and results in the PR.

| Change                              | Validation entry points                                                                                    |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Documentation, file paths, or links | `npm run check:docs`, `npm run check:format`                                                               |
| Rust                                | `cargo fmt --all --check`; Clippy and focused tests for the affected crate                                 |
| Shared interface or Electron        | `npm run build:ui-deps`, `npm run check:ui`, plus type checks and focused tests for the affected workspace |
| Protocol and SDK                    | `npm run build:sdk`, `npm run verify:local-packages`, plus tests for the affected packages                 |
| The `ait-web` website               | Run `npm run check`, `npm run build`, and `npm run verify` in the website repository                       |

Examples of focused Rust checks; select the ones that match your change:

```sh
# Check the provider crate when changing provider code
cargo clippy --locked -p provider --all-targets -- -D warnings
# Run offline tests when changing the MiniMax Code adapter
cargo test --locked -p provider --lib local::minimax
# Run configuration tests when changing daemon configuration
cargo test --locked -p daemon --bin daemon config::
```

Client examples:

```sh
npm run typecheck --workspace=@ait/mobile
npm run test --workspace=@ait/mobile -- src/runtime/host-runtime.test.ts
```

Run only tests for changed code and directly related behavior. Skip Rust tests unless explicitly requested when no Rust code in `bins/` or `crates/` changed. Preparing a commit or PR does not imply running the full Rust workspace suite or workspace-wide coverage. The [CI workflow](https://github.com/ait-app/ait/blob/main/.github/workflows/ci.yml) defines the complete CI checks.

Live provider tests may call models or use local authentication. Read the provider’s operations guide and distinguish offline tests from opt-in live tests. If coverage was not measured, say why; passing test counts are not a coverage percentage. For documentation-only changes, coverage can be marked not applicable because no Rust behavior changed.

## Submit a pull request

1. Review the diff for unrelated changes, local runtime data, and credentials.
2. Use a descriptive commit message and push the branch to your fork or another remote you can write to.
3. Open a PR against the appropriate repository’s `main` branch. Link the issue and describe the problem, resulting behavior, and validation.
4. For interface changes, include screenshots or an interaction record. State platforms, live providers, or other behavior you did not verify.
5. Address review feedback on the same branch and rerun affected checks. Include the ADR and index update when changing durable boundaries.

## Improve the website documentation

The edit link at the bottom of each page points to `ait-web/content/docs/{zh,en}/`. Add or update both languages with matching filenames and slugs. Use the corresponding language prefix for internal links. Groups, ordering, page headings, and search come from Markdown content and frontmatter.

Check product claims against current Ait documentation and implementation, then record the source revision and review scope in [docs/content-sources.md](https://github.com/ait-app/ait-web/blob/main/docs/content-sources.md). Implementation, successful validation, and availability in a store release are different states. Website checks validate bilingual completeness, internal links, anchors, search, and the sitemap.

Ait uses the [Apache License 2.0](https://github.com/ait-app/ait/blob/main/LICENSE). Preserve copyright, license notices, and [third-party attribution](https://github.com/ait-app/ait/blob/main/paseo/README.md) when contributing.
