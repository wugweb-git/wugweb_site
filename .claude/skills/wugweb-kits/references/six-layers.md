# Six layers

Every visual value belongs to one layer. Layer N references only layer N minus 1.

| # | Layer | Holds | Wugweb example |
|---|---|---|---|
| 1 | Primitive token | raw value | a colour or size literal in `:root` |
| 2 | Semantic token | role | `--color-text-primary`, `--shell-gutter`, `--grid-gap` |
| 3 | Component token | scoped binding, only when earned | `--pillar-thumb`, `--bento-min` |
| 4 | Primitive component | structure class | `.wrap`, `.grid`, `.btn` |
| 5 | Component | named part with its own file | `SiteHeader`, `SiteFooter` |
| 6 | Block | section level composition with a block doc | Service Spotlight Panel, Bento Block |

Pattern: a reusable arrangement specified once and used inside blocks, such as the rail or the viewer.

One way rule: a component reads layer 2 or 3, never a raw value, never layer 1. A block never restyles a component from outside. Layer 3 is optional; add it only for a real override point. At the time of writing 392 declarations exist in `:root` and 112 alias another token, so alias chains are reported, not cleaned up, until the owner asks.
