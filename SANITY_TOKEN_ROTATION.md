# Sanity Token Rotation - Action Required

## Current Status
The current Sanity API token (`sk0ArwboL...`) has been exposed in conversation transcripts and **must be rotated immediately**.

## Steps to Fix

### 1. Create New Editor Token
1. Go to https://sanity.io/manage
2. Select project: **splvhmk1**
3. Navigate to: **API** → **Tokens**
4. Click: **Add new token**
5. Configure:
   - **Name**: `wugweb-editor-token`
   - **Role**: **Editor** (not Viewer - Editor is required for create/update/delete)
   - **Expiration**: Set a reasonable expiry (e.g., 1 year)
6. Copy the new token immediately (you won't see it again)

### 2. Update Local Environment
```bash
# In your .env file, replace the old token:
SANITY_API_TOKEN=sk0ArwboLQ0iGTvUfmmAPitJVHBIw0vErssdCOwc92Xm4NRz6N9ZrVFK3olAr81Djqux1jJV1upPwslk250r7BrQbUFDxfYguJLO9l0X1GIpU2g1rEARYq6J2R6iqYWdn0eIsSFWMnxRZMeryHKi7akyvEEdv4u8YAVMQWJg5EBwAzFs1lTr

# With the new token:
SANITY_API_TOKEN=<new-token-here>
```

### 3. Update Cloudflare Secrets
```bash
# If you use SANITY_SYNC_TOKEN in Cloudflare, update it:
wrangler pages secret put SANITY_SYNC_TOKEN
# Enter the new token when prompted
```

### 4. Delete Old Token
1. Return to https://sanity.io/manage → splvhmk1 → API → Tokens
2. Find the old token: `sk0ArwboL...`
3. Click the **⋯** menu → **Delete**
4. Confirm deletion

### 5. Verify Token Works
```bash
# Test the new token:
cd /Users/abcom/Documents/GitHub/wugweb_site
SANITY_API_TOKEN="<new-token>" node -e "
const {createClient} = require('@sanity/client');
const s = createClient({
  projectId:'splvhmk1', 
  dataset:'production', 
  apiVersion:'2024-01-01', 
  token: process.env.SANITY_API_TOKEN
});
s.fetch('*[_type == \"post\"] | count(1)').then(r => console.log('✓ Token works. Posts in Sanity:', r)).catch(e => console.error('✗ Token failed:', e.message));
"
```

## Why This Matters
- **Security**: Exposed tokens can be used to read/write your production data
- **Functionality**: The current token has permission issues (update/delete operations fail)
- **Compliance**: Best practice is to rotate any credential that appears in logs/transcripts

## After Rotation
Once you've completed these steps, the following will work correctly:
- ✅ Migration scripts (create/update/delete operations)
- ✅ Content imports from CSV/Notion
- ✅ Real-time content sync
- ✅ All Sanity Studio operations

**Estimated time**: 5 minutes
**Priority**: High (do this today)