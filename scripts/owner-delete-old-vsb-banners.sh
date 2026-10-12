#!/usr/bin/env bash
# Deletes the 10 old VSB banner objects under assets/unsorted/ and their 10 Sanity asset records.
# Run by the OWNER, not Claude. Checked 2026-10-12:
#   - each object is byte-identical (sha1) to its copy under blog/<slug>/ (blog-image-r2-manifest.csv)
#   - the only Sanity docs referencing them are their own asset records
#   - records backed up to backups/vsb-banner-records-2026-10-12.json
# Usage: bash scripts/owner-delete-old-vsb-banners.sh
set -u
cd "$(dirname "$0")/.."

for n in "BANNER – 1" "BANNER – 4" "BANNER – 5" "BANNER – 6" "BANNER – 7" "BANNER – 8" "BANNER – 35" "BANNER" "Group 2668" "Main Banner"; do
  npx wrangler r2 object delete "wugweb-assets/assets/unsorted/$n.png" --remote && echo "deleted R2 assets/unsorted/$n.png"
done

node --input-type=module -e '
import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
const dot = Object.fromEntries(readFileSync(".env","utf8").split("\n").filter(l=>l.includes("=")&&!l.trim().startsWith("#")).map(l=>{const i=l.indexOf("=");return [l.slice(0,i).trim(),l.slice(i+1).trim().replace(/^["\x27]|["\x27]$/g,"")]}));
const c = createClient({ projectId:"splvhmk1", dataset:"production", apiVersion:"2026-01-01", token: dot.SANITY_TOKEN||dot.SANITY_API_TOKEN, useCdn:false });
const ids = ["banner-1","banner-4","banner-5","banner-6","banner-7","banner-8","banner-35","banner","group-2668","main-banner"].map(s=>`asset-unsorted-mapped-assets-vsb-${s}-png`);
const tx = c.transaction(); ids.forEach(id => { tx.delete(id); tx.delete(`drafts.${id}`); });
await tx.commit(); console.log("deleted", ids.length, "Sanity asset records");
'
