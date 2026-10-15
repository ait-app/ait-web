# Provider icons

Existing official assets were downloaded on 2026-10-14. Additional SVGs were reused from the Ait app on 2026-10-16. Keep their shapes and colors intact.

- `claude.png`: Claude's transparent Splat favicon, used on the [official Claude Code page](https://claude.com/product/claude-code), from [Claude's asset CDN](https://assets.claude.com/95a868946ac8a31e5ff832e2899f294aa368b836.png).
- `codex.png`: the icon of [Codex, published by OpenAI in the Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=openai.chatgpt), downloaded from the publisher's asset CDN for version `26.51007.21434`.
- `opencode.svg`: the light-theme square SVG downloaded from [OpenCode's official brand page](https://opencode.ai/brand), decoded from its download data URI without altering the SVG.
- `deepseek-harness.svg`: copied unchanged from `Documents/ait/apps/mobile/src/assets/acp-provider-icons/deepseek-harness.svg`.
- `antigravity.svg`: the unchanged `agy` SVG from `Documents/ait/apps/mobile/src/assets/acp-provider-icons.ts`, which the Ait app also uses for its built-in Antigravity provider.

The homepage order is maintained in `src/lib/site.ts`: Codex, DeepSeek Harness, OpenCode, Antigravity, Claude Code.

These trademarks belong to their respective owners. The icons identify supported agents.
