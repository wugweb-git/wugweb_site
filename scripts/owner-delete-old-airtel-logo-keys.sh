#!/usr/bin/env bash
# FOR THE OWNER TO RUN. The assistant never runs this.
# Removes the old copies of the two Airtel logos after the new keys are live:
#   assets/logos/airtel-xsafe.png   (was client-logo-c6rj.png)
#   assets/logos/airtel-xstream.png (was client-logo-8gyg.png)
#
# Before running, confirm nothing still points at the old keys:
#   node scripts/scan-asset-usage.mjs   (read-only) and check the 4 old paths are unused.
# The old Sanity asset records (asset-logos-client-logo-c6rj-png, -8gyg-png and the two
# framer/... records) are NOT deleted here; archive or delete them in the Studio if you want.
set -euo pipefail
cd "$(dirname "$0")/.."
OLD_KEYS=(
  assets/logos/client-logo-c6rj.png
  assets/logos/client-logo-8gyg.png
  assets/framer/airtel-xsafe-securing-homes-with-intuitive-digital-experiences/client-logo-c6rj.png
  assets/framer/airtel-xstream-play-digital-entertainment-ux-web-design/client-logo-8gyg.png
)
for k in "${OLD_KEYS[@]}"; do
  echo "R2: deleting $k"
  npx wrangler r2 object delete "wugweb-assets/$k" --remote
  echo "local: removing public/$k"
  rm -f "public/$k"
done
