# Credentials Used (Session 2026-07-28/29)

All of these were shared in plaintext during the session and should be rotated.

## ❌ Must Rotate (exposed in transcript)

| Service | Credential | Used For |
|---|---|---|
| **Neon DB** | `npg_ZOYC0QvHs3rp` | Database password — full read/write access |
| **Cloudflare API** | `cfat_cEzy1LVeyaOX7VQbKzRbcZqbaVuNtjC22pNaqf2wcfe94b88` | Cloudflare deploy + R2 + secret management |
| **Sanity API** | `sk0ArwboLQ0iGTvUfmmAPitJVHBIw0vErssdCOwc92Xm4NRz6N9ZrVFK3olAr81Djqux1jJV1upPwslk250r7BrQbUFDxfYguJLO9l0X1GIpU2g1rEARYq6J2R6iqYWdn0eIsSFWMnxRZMeryHKi7akyvEEdv4u8YAVMQWJg5EBwAzFs1lTr` | Editor token — create/replace/update/delete content |
| **Notion Integration** | `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` | Read access to 18 Notion databases |

## 🔐 Safe (not exposed)

| Service | How Set |
|---|---|
| SANITY_SYNC_TOKEN | Set via wrangler secret, not in transcript |
| DATABASE_URL | Set via wrangler secret, used in transcript but pg password is above |

## Rotation Instructions

1. **Neon**: console.neon.tech → project → Settings → Reset password
2. **Cloudflare**: dash.cloudflare.com → API Tokens → Rotate `wugweb` token
3. **Sanity**: sanity.io/manage → project splvhmk1 → API → Tokens → Create new Editor token, delete old
4. **Notion**: notion.so/my-integrations → neon_sync → rotate secret
