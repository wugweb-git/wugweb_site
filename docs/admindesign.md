# Wugweb Sanity Studio — Product Requirements Document

**Status:** Master PRD for Wugweb's Sanity Studio  
**Last Updated:** 2026-07-31  
**Owner:** Vedanshu Srivastava / Wugweb  

---

## Table of Contents

1. [Vision](#1-vision)
2. [Architecture](#2-architecture)
3. [Current Status](#3-current-status)
4. [Design Principles](#4-design-principles)
5. [Workspace Architecture](#5-workspace-architecture)
6. [Information Architecture](#6-information-architecture)
7. [Schema Capability Matrix](#7-schema-capability-matrix)
8. [Dashboard Design](#8-dashboard-design)
9. [Document Experience](#9-document-experience)
10. [Content Health Engine](#10-content-health-engine)
11. [Relationship Intelligence](#11-relationship-intelligence)
12. [Asset Intelligence](#12-asset-intelligence)
13. [Operations Center](#13-operations-center)
14. [Editorial Productivity](#14-editorial-productivity)
15. [Performance Budget](#15-performance-budget)
16. [Extension Architecture](#16-extension-architecture)
17. [Implementation Roadmap](#17-implementation-roadmap)
18. [Code Patterns](#18-code-patterns)
19. [Decision Log](#19-decision-log)
20. [Known Limitations](#20-known-limitations)

---

## 1. Vision

### This is NOT a CMS.

This is the **internal operating system for Wugweb**.

The Studio will be used daily by founders, designers, developers, marketers, SEO specialists, content editors, AI agents, and operations teams.

Think of this as building a product comparable to:

- Linear
- Notion
- Airtable
- Framer
- Vercel
- Stripe Dashboard
- Shopify Admin
- Raycast

**NOT** WordPress.  
**NOT** a CRUD application.  
**NOT** a database UI.

This is a **premium enterprise content operating system**.

---

## 2. Architecture

```
Neon PostgreSQL ← Single Source of Truth
    ↓
Sanity Studio ← Editorial & Management Layer
    ↓
Astro Website ← Presentation Layer
    ↓
Future systems (Memory OS, Knowledge Graph, Digital Twin, AI Agents, Internal Search)
```

**Key Rule:** Sanity is NOT the source of truth. It is the editorial interface.

---

## 3. Current Status

### Already Implemented

- ✅ 14+ production schemas
- ✅ Desk Structure with sections
- ✅ Editor Tabs on all document types
- ✅ Validation rules
- ✅ Schema descriptions
- ✅ Fixed previews (no DOM errors)
- ✅ Sync Status tracking
- ✅ Taxonomy (179 terms)
- ✅ Asset Library (113 docs)
- ✅ Engagements (70 docs)
- ✅ Dashboard foundation
- ✅ Structure Builder with dashboard widgets
- ✅ TypeScript clean
- ✅ Production build successful
- ✅ Studio deployed to https://wugweb.sanity.studio/

### Current Data State

| Type | Count | In Neon |
|------|-------|---------|
| caseStudy | 82 | ✅ |
| post | 75 | ✅ |
| person | 12 | ✅ |
| client | 106 | ✅ |
| industry | 66 | ✅ |
| service | 12 | ✅ |
| singletonPage | 17 | ✅ |
| siteSettings | 1 | ✅ |
| syncStatus | 19 | ✅ |
| asset | 113 | ✅ |
| taxonomy | 179 | ✅ |
| engagement | 70 | ✅ |
| contactSubmission | 0 | Schema exists |

**Total: 562 documents**

---

## 4. Design Principles

Everything must optimize for:

- **Information Architecture** — structure before colors
- **Editorial Productivity** — workflow-first, not CRUD-first
- **Content Operations** — batch actions, bulk operations
- **Scalability** — from dozens to 500+ schemas
- **Discoverability** — important work surfaces automatically
- **Workflow** — drafts → review → publish → analyze
- **Low Cognitive Load** — 2 clicks to anything important
- **High Information Density** — see everything at a glance
- **Beautiful UX** — premium, not generic
- **Premium UI** — Linear/Notion quality
- **Keyboard-first usage** — Cmd+K, shortcuts everywhere
- **Performance** — lazy load, minimize API calls
- **Maintainability** — extend, don't replace

### DO NOT

- Redesign the public website
- Change information architecture unnecessarily
- Change schemas without reason
- Duplicate logic
- Create unnecessary plugins
- Exceed Sanity free-tier limits
- Introduce expensive GROQ queries
- Create heavy React components
- Create unnecessary API requests

---

## 5. Workspace Architecture

Replace one giant tree with role-based workspaces.

### Workspace Model

```
🏠 Home
📊 Dashboard
✍ Editorial
🎨 Brand
💼 Business
🚀 Marketing
🧠 Knowledge
📦 Platform
⚙ Operations
🔧 System
```

Each workspace exposes only the relevant schemas.

### Editorial Workspace

```
Pages (16 singletons)
├── Home · About · Services · Work · Blog · FAQ · Contact
└── Privacy · Terms · Refund · Impact · Subscription · Sitemap
Case Studies (82)
Blog Posts (75)
Services (12)
Resources
```

### Brand Workspace

```
Assets (113)
├── Work (55)
├── Services (42)
└── More (16)
Client Logos
Brand Guidelines
Typography
Color Palette
```

### Business Workspace

```
Clients (106)
Engagements (70)
Industries (66)
Services (12)
Pricing / Packages
Testimonials
```

### Marketing Workspace

```
SEO Settings
Campaigns
CTAs
Redirects
Social Media
Email Templates
Analytics
```

### Knowledge Workspace

```
Taxonomy (179 terms)
├── Tags (36)
├── Tech Stack (21)
├── Sub-Services (85)
├── Publishing Platforms (10)
├── Team Departments (6)
├── Asset Types (5)
├── Content Types (2)
└── Countries (14)
Technologies
Capabilities
Glossary
Prompt Library (AI)
```

### Operations Workspace

```
Sync Status (19 docs)
Contact Submissions
Content Relationships (55)
Import Queue
Export Queue
Diagnostics
Data Integrity
Media Audit
```

### System Workspace

```
Site Settings
Navigation
Integrations
Users / Permissions
Webhooks
API Status
Environment
Studio Health
```

---

## 6. Information Architecture

### Navigation Rules

1. **Two-click rule** — anything important reachable in 2 clicks from dashboard
2. **Task-based navigation** — "I want to publish a case study" not "find the case study doc type"
3. **Progressive disclosure** — show what matters now, hide the rest
4. **Contextual** — surface related content when editing
5. **Search-first** — Cmd+K as primary navigation for power users

### Target Desk Structure

```
📊 Dashboard
├── Overview
├── Quick Create
├── Recently Edited
├── Drafts
├── Scheduled
├── Publishing Queue
├── Content Health
└── Quick Actions

✍ Editorial
├── Pages
│   ├── Home · About · Services · Work · Blog · FAQ · Contact
│   └── Privacy · Terms · Refund · Impact · Subscription · Sitemap
├── Case Studies (82)
├── Blog Posts (75)
└── Services (12)

🎨 Brand
├── Assets (113)
├── Client Logos
└── Brand Guidelines

💼 Business
├── Clients (106)
├── Engagements (70)
├── Industries (66)
└── Services (12)

🚀 Marketing
├── SEO Settings
├── Campaigns
└── Social Media

🧠 Knowledge
├── Taxonomy (179)
├── Technologies
└── Prompt Library

📦 Platform
├── Assets
├── Taxonomy
└── Capabilities

⚙ Operations
├── Sync Status (19)
├── Contact Submissions
├── Content Relationships
├── Import/Export
└── Diagnostics

🔧 System
├── Site Settings
├── Navigation
├── Integrations
├── Users / Permissions
└── Studio Health
```

---

## 7. Schema Capability Matrix

Document every schema with:

| Schema | Purpose | Editable | Singleton | Relationships | Health Checks |
|--------|---------|----------|-----------|---------------|---------------|
| post | Blog content | ✓ | | author, service, taxonomy, asset | SEO, image, slug |
| caseStudy | Portfolio piece | ✓ | | client, industry, asset | cover, relationships |
| service | Core service | ✓ | | taxonomy, technology | icon, slug |
| person | Team member | ✓ | | asset (photo) | photo, role |
| client | Business client | ✓ | | industry, engagement | logo, description |
| engagement | Client project | ✓ | | client, service | dates, status |
| industry | Industry vertical | ✓ | | client, caseStudy | name, slug |
| asset | Shared media | ✓ | | all | path, alt, usage |
| taxonomy | Classification | ✓ | | all | duplicates |
| singletonPage | Page content | ✓ | ✓ | asset, navigation | SEO |
| siteSettings | Global config | ✓ | ✓ | asset (logo, favicon) | complete |
| syncStatus | Monitoring | System | | Neon | stale |
| contactSubmission | Form data | System | | | status |
| blockContent | Rich text | ✓ | | asset | complete |

---

## 8. Dashboard Design

Replace default document list with operational dashboard.

### Dashboard Sections

```
┌─────────────────────────────────────────────────────────────┐
│  📊 Dashboard                                      [🔄] [⚙️] │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │ Drafts       │ │ Scheduled    │ │ Published    │        │
│  │ 12 pending   │ │ 3 this week  │ │ 487 total    │        │
│  └──────────────┘ └──────────────┘ └──────────────┘        │
│                                                             │
│  Recently Edited                  Quick Create (+)          │
│  ┌────────────────────────┐      ┌────────────────────┐    │
│  │ Case Study: Axis Bank  │      │ + Case Study       │    │
│  │ Blog: AI in UX Design  │      │ + Blog Post        │    │
│  │ Client: Airtel         │      │ + Client           │    │
│  │ Service: Strategy      │      │ + Service          │    │
│  └────────────────────────┘      └────────────────────┘    │
│                                                             │
│  Content Health                                             │
│  ✅ 82/82 Case Studies have cover images                    │
│  ⚠️ 12/75 Blog Posts missing SEO description                │
│  ❌ 5 Documents have broken references                      │
└─────────────────────────────────────────────────────────────┘
```

### Dashboard Widgets

| Widget | Data Source | Priority |
|--------|-------------|----------|
| Content Stats | `count(*[])` per type | 🔴 Now |
| Recently Edited | `_updatedAt > now() - 7` | 🔴 Now |
| Drafts | `_id match "drafts.*"` | 🔴 Now |
| Publishing Queue | `publishedAt > now() - 14` | 🟡 Soon |
| Content Health | Custom queries | 🟡 Soon |
| SEO Health | `!defined(seoDescription)` | 🟡 Soon |
| Media Health | `!defined(coverImage)` | 🟡 Soon |
| Relationship Health | Custom queries | 🔵 Future |

---

## 9. Document Experience

Every document type should support:

### Editor Tabs

```
┌──────────────────────────────────────────────┐
│  Case Study: Axis Bank           [Save] [↓] │
├──────────────┬───────────────────────────────┤
│  Overview    │  Status: Published           │
│  Content     │  Last Edited: 2h ago         │
│  Results     │  SEO Score: 85/100          │
│  SEO         │  Related: 3 Services        │
│  Media       │  Related: 2 Blog Posts      │
│  Relations   │  Related Client: Axis Bank   │
│  Activity    │                              │
└──────────────┴───────────────────────────────┘
```

### Tab Groups by Schema

**Case Study:**
- Overview (title, slug, subtitle, client, industry, featured)
- Content (body, challenges, solutions, impact)
- Results (metrics, outcomes)
- SEO (seoTitle, seoDescription, ogImage)
- Media (coverImage, gallery)
- Relations (services, technologies, tags)

**Blog Post:**
- Overview (title, slug, excerpt, featured)
- Content (body, author, readingTime)
- Meta (category, tags, publishedAt)
- SEO (seoTitle, seoDescription, ogImage)
- Media (coverImage)

**Service:**
- Overview (title, slug, subtitle, tags)
- Content (heroText, body, capabilities, approach, process, tools)
- FAQ (faqs array)
- Why (why array)
- SEO (seoTitle, seoDescription)

---

## 10. Content Health Engine

Every document receives health scores.

### Health Rules

**SEO:**
- Title present and optimal length
- Description present and optimal length
- OG image present
- Slug present and valid
- Schema markup complete
- Indexability configured

**Content:**
- Hero/featured image present
- Body content present and adequate length
- Category assigned
- Author assigned
- Tags assigned
- Reading time calculated

**Relationships:**
- Service linked
- Industry linked
- Technology linked
- Assets linked
- Client linked (case studies)

**Publishing:**
- Status defined
- Publish date set
- Draft/published state correct

### Health Score Calculation

```
Content Score = (fields_present / total_fields) * 100
SEO Score = (seo_fields_present / seo_fields_total) * 100
Relationship Score = (relations_linked / relations_possible) * 100
Overall Health = (Content + SEO + Relationship) / 3
```

---

## 11. Relationship Intelligence

Every document displays:

### Incoming References
What links TO this document.

### Outgoing References
What this document links TO.

### Shared Assets
Images and media used by multiple documents.

### Dependencies
What must exist for this document to work.

### Impact if Deleted
What would break if this document is removed.

### Missing Relationships
What SHOULD be linked but isn't.

### Broken Relationships
References to non-existent documents.

---

## 12. Asset Intelligence

Assets (113 docs) need special treatment.

### Asset Health Metrics

- **Usage Count** — how many documents reference this asset
- **Referenced By** — list of documents using this asset
- **Unused Assets** — assets with zero references
- **Duplicate Assets** — assets with same name/path
- **External URLs** — assets still pointing to Framer CDN
- **Local Files** — assets mapped to `public/assets/`
- **Missing Alt** — assets without alt text
- **Missing Metadata** — assets without description/tags
- **Missing Categories** — assets without asset type
- **Wrong Dimensions** — images that don't meet requirements
- **Oversized Files** — files over size limit
- **Broken Files** — files that don't exist at path

---

## 13. Operations Center

### Diagnostics

- Studio Health — plugin status, bundle size
- Dataset Health — document counts, type distribution
- Sync Status — Neon ↔ Sanity comparison
- Import Queue — pending imports
- Export Queue — pending exports
- Data Validation — schema compliance
- Broken References — orphaned documents
- Media Audit — asset health
- Relationship Audit — connection health
- Performance — query times, API calls

### Environment

- Sanity project ID
- Dataset
- API version
- Neon connection status
- Webhook status
- Plugin versions

---

## 14. Editorial Productivity

### Quick Create
- Floating action button on every list view
- Templates for common content types
- Pre-filled fields based on context

### Templates
- Case Study template
- Blog Post template
- Service template
- Client template

### Favorites
- Pin frequently accessed documents
- Quick access from dashboard

### Saved Views
- "My Drafts"
- "Needs Review"
- "Published This Month"
- "Missing SEO"
- "Unlinked Content"

### Bulk Operations
- Bulk Publish
- Bulk Archive
- Bulk Delete
- Bulk Tag
- Bulk Category

### Keyboard Shortcuts
- `Cmd+K` — Command palette
- `Cmd+P` — Quick open document
- `Cmd+N` — New document
- `Cmd+Shift+F` — Global search
- `Escape` — Close panel / back to list

### Search
- Global search across all document types
- Filter by type, status, date range
- Save frequent searches
- Command palette for power users

---

## 15. Performance Budget

### Sanity Free Tier Constraints

- 50,000 documents max
- 500 API requests/minute
- 500KB response size limit
- 10 seconds query timeout

### Performance Rules

1. **Never exceed Sanity Free Tier**
2. **Avoid unnecessary GROQ queries** — use projections
3. **Avoid duplicate document lists** — cache results
4. **Reuse query fragments** — DRY GROQ
5. **Lazy-load heavy panes** — don't load everything at once
6. **No live subscriptions unless required** — use `fetch` over `listen`
7. **No expensive graph traversals** — keep relationship queries shallow
8. **Keep dashboard widgets lightweight** — use `count()` over full fetches
9. **Minimize API requests** — batch where possible
10. **Use projections** — only fetch fields you need

### Bundle Budget

- Core Sanity: ~300KB
- Custom plugins: <50KB total
- Dashboard widgets: <10KB each
- Total JS: <400KB gzipped

---

## 16. Extension Architecture

### Plugin Classification

| Category | Plugins | Purpose |
|----------|---------|---------|
| Core | `structureTool`, `visionTool` | Essential Studio |
| Editorial | `dashboardTool`, `orderable` | Content management |
| Media | `@sanity/media` | Asset management |
| Search | — | Global search (future) |
| Preview | `iframe-pane` | Live preview |
| Workflow | — | Draft/publish workflow |
| AI | — | Content suggestions |
| Developer | `visionTool` | GROQ testing |
| Diagnostics | — | Health monitoring |
| Operations | — | Sync, import, export |

### Extension Requirements

Each extension must document:
- Purpose
- Dependencies
- Performance impact
- Free-tier compatibility
- Maintenance cost

---

## 17. Implementation Roadmap

### Phase 1 — Foundation ✅ COMPLETE

- ✅ Desk Structure
- ✅ Schema Groups
- ✅ Preview Fixes
- ✅ Validation
- ✅ Editor Tabs
- ✅ Sync Status
- ✅ Dashboard Foundation
- ✅ Build + Deploy

### Phase 2 — Workspace Architecture 🔴 NEXT

- [ ] Restructure desk into workspaces
- [ ] Add workspace icons and descriptions
- [ ] Implement collapsible sections
- [ ] Add quick-create floating button
- [ ] Fix filter syntax errors
- [ ] Deploy updated Studio

### Phase 3 — Dashboard 🔴 NEXT

- [ ] Real operational dashboard
- [ ] Content stats widget
- [ ] Recently edited widget
- [ ] Drafts widget
- [ ] Publishing queue widget
- [ ] Content health widget
- [ ] Quick create widget

### Phase 4 — Editorial 🟡 SOON

- [ ] Saved views
- [ ] Bulk operations
- [ ] Templates
- [ ] Favorites
- [ ] Command palette
- [ ] Keyboard shortcuts

### Phase 5 — Relationships 🟡 SOON

- [ ] Relationship explorer
- [ ] Incoming/outgoing references
- [ ] Dependency analysis
- [ ] Impact analysis
- [ ] Broken reference detection

### Phase 6 — Asset Intelligence 🔵 FUTURE

- [ ] Usage tracking
- [ ] Duplicate detection
- [ ] Health scoring
- [ ] Missing metadata detection
- [ ] External URL detection

### Phase 7 — Content Health 🔵 FUTURE

- [ ] Health scoring engine
- [ ] SEO scoring
- [ ] Accessibility scoring
- [ ] Metadata scoring
- [ ] Publishing scoring
- [ ] Actionable fix suggestions

### Phase 8 — Operations 🔵 FUTURE

- [ ] Diagnostics dashboard
- [ ] Data integrity reports
- [ ] Performance monitoring
- [ ] Environment status
- [ ] Webhook monitoring

### Phase 9 — AI Integration 🔵 FUTURE

- [ ] Content assistant
- [ ] SEO assistant
- [ ] Relationship suggestions
- [ ] Metadata suggestions
- [ ] Content quality scoring

### Phase 10 — Advanced 🔵 FUTURE

- [ ] Kanban views
- [ ] Calendar views
- [ ] Timeline views
- [ ] Advanced search
- [ ] Custom dashboards
- [ ] Role-based access

---

## 18. Code Patterns

### Custom Desk Structure with Workspaces

```ts
// sanity/schemaTypes/deskStructure.ts
import { type StructureBuilder, type StructureResolver } from 'sanity/structure';

export const deskStructure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Wugweb Admin')
    .items([
      dashboardItem(S),
      S.divider(),
      workspaceItem(S, '✍ Editorial', '📝', [
        pagesItem(S),
        S.documentTypeListItem('caseStudy').title('Case Studies'),
        S.documentTypeListItem('post').title('Blog Posts'),
        S.documentTypeListItem('service').title('Services'),
      ]),
      S.divider(),
      workspaceItem(S, '💼 Business', '🏢', [
        S.documentTypeListItem('client').title('Clients'),
        S.documentTypeListItem('engagement').title('Engagements'),
        S.documentTypeListItem('industry').title('Industries'),
        S.documentTypeListItem('person').title('Team'),
      ]),
      S.divider(),
      workspaceItem(S, '⚙ Operations', '🔧', [
        S.documentTypeListItem('syncStatus').title('Sync Status'),
        S.documentTypeListItem('contactSubmission').title('Contact Submissions'),
      ]),
    ]);

function workspaceItem(S: StructureBuilder, title: string, icon: string, items: any[]) {
  return S.listItem()
    .title(title)
    .icon(() => icon)
    .child(S.list().title(title).items(items));
}
```

### Custom Preview with prepare()

```ts
// Always use prepare() to prevent DOM errors from special characters
preview: {
  select: { title: 'title', subtitle: 'client', media: 'coverImage' },
  prepare: ({ title, subtitle, media }: any) => ({
    title: title || 'Untitled',
    subtitle: subtitle ? String(subtitle).replace(/&/g, 'and') : '',
    media,
  }),
}
```

### Document with Editor Tabs

```ts
groups: [
  { name: 'content', title: 'Content', default: true },
  { name: 'meta', title: 'Meta' },
  { name: 'seo', title: 'SEO' },
],
fields: [
  defineField({ name: 'title', type: 'string', validation: (r) => r.required(), group: 'content' }),
  defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, group: 'content' }),
  defineField({ name: 'category', type: 'string', options: { list: [...] }, group: 'meta' }),
  defineField({ name: 'seoTitle', type: 'string', group: 'seo' }),
]
```

### Dashboard Widget Pattern

```ts
// Lightweight dashboard widget using count()
S.listItem()
  .title('📊 Dashboard')
  .icon(() => '📊')
  .child(
    S.list()
      .title('Dashboard')
      .items([
        quickStat(S, '📝', 'Drafts', '_id match "drafts.*"', '_updatedAt desc'),
        quickStat(S, '🕐', 'Recently Edited', '_updatedAt > now() - 7', '_updatedAt desc'),
      ])
  );
```

---

## 19. Decision Log

| Date | Decision | Reason |
|------|----------|--------|
| 2026-07-29 | Neon is SSOT | Sanity is editorial, Neon is source of truth |
| 2026-07-29 | Sanity syncs to Neon | Structured content flows one way |
| 2026-07-29 | Media goes to R2 | Not Neon or Sanity |
| 2026-07-29 | 6-pillar taxonomy | Strategy, Brand, Experience, Engineering, Growth, Operations |
| 2026-07-29 | Vedanshu owns everything | `owner: 'vedanshu'` on every content row |
| 2026-07-30 | Dashboard replaces blank slate | First thing editors see should be actionable |
| 2026-07-30 | Two-click rule | Anything important reachable in 2 clicks |
| 2026-07-30 | Workspace model over flat tree | Role-based navigation for different teams |

---

## 20. Known Limitations

| Limitation | Status | Mitigation |
|------------|--------|------------|
| Sanity free-tier document limit | 50,000 max | Monitor usage, archive old content |
| No live preview | Not configured | Use iframe-pane for frontend preview |
| No draft/publish workflow | Schema exists | Implement in Phase 4 |
| No bulk operations | Not built | Implement in Phase 4 |
| No command palette | Not built | Implement in Phase 4 |
| No relationship explorer | Not built | Implement in Phase 5 |
| No health scoring | Not built | Implement in Phase 7 |
| No AI integration | Not built | Implement in Phase 9 |

---

## Appendix A: Quick Reference

### Sanity Studio URLs

- Local: http://localhost:3333
- Production: https://wugweb.sanity.studio/
- Project: https://www.sanity.io/manage/project/splvhmk1

### Key Commands

```bash
# Start Studio locally
cd sanity && npx sanity dev

# Build Studio
cd sanity && npx sanity build

# Deploy Studio
cd sanity && npx sanity deploy

# Test GROQ queries
cd sanity && npx sanity vision
```

### Important Files

```
sanity/
├── sanity.config.ts          # Studio configuration
├── schemaTypes/
│   ├── index.ts              # Schema registry
│   ├── deskStructure.ts      # Navigation structure
│   ├── post.ts               # Blog post schema
│   ├── caseStudy.ts          # Case study schema
│   ├── service.ts            # Service schema
│   ├── client.ts             # Client schema
│   ├── engagement.ts         # Engagement schema
│   ├── industry.ts           # Industry schema
│   ├── person.ts             # Team member schema
│   ├── asset.ts              # Media asset schema
│   ├── taxonomy.ts           # Taxonomy term schema
│   ├── singletonPage.ts      # Page content schema
│   ├── siteSettings.ts       # Global settings schema
│   └── blockContent.ts       # Rich text blocks
└── structure/
    └── dashboardWidget.tsx   # Dashboard widget component
```

---

*This document is the single source of truth for the Wugweb Sanity Studio. Update it after significant changes.*