#!/usr/bin/env bash
# Run by the OWNER, not Claude. Each spare below was copied (byte-identical, verified 2026-10-13) to:
#   alt-cover.png       -> blog/how-exactly-do-product-manager-and-ux-designer-collaborate/cover.png
#   alt-design-grid.png -> blog/ui-design-trends-to-watch-out-for-in-2023-and-resurfacing-comeback-trend/cover.png
# Run only after Notion no longer links the alt-* URLs.
set -u
npx wrangler r2 object delete "wugweb-assets/blog/how-exactly-do-product-manager-and-ux-designer-collaborate/alt-cover.png" --remote
npx wrangler r2 object delete "wugweb-assets/blog/stop-using-dribbble-behance-to-find-practical-design-inspiration/alt-design-grid.png" --remote
