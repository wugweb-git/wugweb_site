#!/usr/bin/env bash
# Run by the OWNER. Deletes assets/unsorted/blog1.png and blog3.png and their two Sanity asset records.
# Checked 2026-10-14: each is a smaller crop (864x600) of an existing cover — blog1 = 0072
# (blog/top-10-design-tools-that-will-simplify-your-design-process/cover.png), blog3 = 0053
# (blog/a-guide-to-evaluating-design-projects/cover.png). Nothing else in Sanity references them.
# Record backup: backups/unsorted-blog1-blog3-records-2026-10-14.json
set -euo pipefail
cd "$(dirname "$0")/.."
npx wrangler r2 object delete "wugweb-assets/assets/unsorted/blog1.png" --remote
npx wrangler r2 object delete "wugweb-assets/assets/unsorted/blog3.png" --remote
node --input-type=module -e '
import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
const env = Object.fromEntries(readFileSync(".env","utf8").split("\n").filter(l=>/^[A-Z_]+=/.test(l)).map(l=>{const i=l.indexOf("=");return [l.slice(0,i),l.slice(i+1).replace(/^["\x27]|["\x27]$/g,"")]}));
const c = createClient({ projectId:"splvhmk1", dataset:"production", apiVersion:"2026-01-01", token: env.SANITY_TOKEN||env.SANITY_API_TOKEN, useCdn:false });
const ids = ["asset-unsorted-assets-used-previously-blog1-png","asset-unsorted-assets-used-previously-blog3-png"];
const tx = c.transaction(); ids.forEach(id => { tx.delete(id); tx.delete("drafts."+id); }); await tx.commit();
console.log("deleted 2 R2 files and", ids.length, "asset records");
'
