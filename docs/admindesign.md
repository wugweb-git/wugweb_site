# Sanity Studio Admin Design — Wugweb

Use this as a master prompt for Claude Code, Cursor, Gemini CLI, or ChatGPT.
It is written as a product design brief rather than a coding prompt.

---

## Status Quo (Current Implementation)

Current Studio has been improved from default:

- **14 document types** with editor tabs, descriptions, sort orders, fixed previews
- **Desk structure**: Dashboard → Content → Library → Data
- **179 taxonomy terms** imported from Notion (tags, tech stack, publishing platforms, sub-services, departments, asset types, content types, countries)
- **113 asset docs** with local file mapping
- **70 client engagements** imported
- **19 sync status docs** tracking Notion ↔ Sanity ↔ Neon
- `codeBlock` type defined, preview `media` fields fixed (no more DOM errors)
- All previews use `prepare()` functions to avoid `&` → HTML tag crashes

**Still rough:**
- Desk structure is basic nested lists, not a proper admin panel
- No dashboard with drafts/recent/publishing queue
- No relationship visualization
- No command palette or global search enhancements
- Document editor shows all fields in flat tab groups
- No quick-create, no templates, no favorites

---

## Design Principles

1. **Information Architecture first** — structure before colors
2. **Progressive Disclosure** — show what matters now, hide the rest
3. **Contextual Editing** — fields grouped by task, not by schema
4. **Task-based Navigation** — "I want to publish a case study" not "find the case study doc type"
5. **Minimal Cognitive Load** — 2 clicks to anything important
6. **Workflow-first** — drafts → review → publish → analyze, not just CRUD

---

## Target Studio Structure

```
🏠 Home (default landing)

📊 Dashboard
├── Recently Edited
├── Drafts
├── Scheduled
├── Publishing Queue
├── Broken References
├── Missing SEO / Images
├── Content Health
├── Quick Create (+)

✍ Content
├── Pages (16 singletons)
│   ├── Home · About · Services · Work · Blog · FAQ · Contact
│   └── Privacy · Terms · Refund · Impact · Subscription · Sitemap
├── Case Studies (82)
├── Blog Posts (75)
├── Services (12)
└── Resources / Documentation

🎨 Brand & Media
├── Assets (113)
│   ├── Work (55)
│   ├── Services (42)
│   └── More (16)
├── Client Logos
└── Brand Guidelines

💼 Business
├── Clients (106)
├── Engagements (70)
├── Industries (66)
├── Pricing / Packages
└── Testimonials

🧠 Knowledge
├── Taxonomy (179 terms)
│   ├── Tags (36)
│   ├── Tech Stack (21)
│   ├── Sub-Services (85)
│   ├── Publishing Platforms (10)
│   ├── Team Departments (6)
│   ├── Asset Types (5)
│   ├── Content Types (2)
│   └── Countries (14)
├── Technologies
├── Capabilities
├── Glossary
└── Prompt Library (AI)

⚙ System
├── Site Settings
├── Navigation
├── Integrations
├── Users / Permissions
└── Sync Status (19 docs)

🔄 Data
├── Contact Submissions
├── Sync Log
└── Content Relationships (55)
```

---

## Dashboard Design

Replace the default document list landing with a proper dashboard:

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

---

## Navigation Improvements

### Replace default nav with:

```ts
// Custom desk structure pattern:
S.list()
  .title('Wugweb Admin')
  .items([
    // Dashboard — always first
    dashboardItem(S),

    // Content — most-used
    collapsibleSection(S, '✍ Content', [
      pagesItem(S),
      documentTypeListItem('caseStudy').title('Case Studies'),
      documentTypeListItem('post').title('Blog Posts'),
    ]),

    // Business
    collapsibleSection(S, '💼 Business', [
      documentTypeListItem('client').title('Clients'),
      documentTypeListItem('engagement').title('Engagements'),
      documentTypeListItem('service').title('Services'),
    ]),

    // etc.
  ])
```

### Custom pane for collapsible sections:

```ts
function collapsibleSection(S, title, items) {
  return S.listItem()
    .title(title)
    .child(S.list().title(title).items(items))
}
```

---

## Document Editor Layout

Every document type should have this pattern:

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

Tabbed left sidebar, content + metadata on right.

---

## List View Improvements

Default document lists should support:

- **Sortable columns** — click to sort by title, date, status
- **Inline preview** — show cover image, excerpt, status badge
- **Batch actions** — select multiple → publish, archive, delete
- **Quick filters** — by status, category, date range
- **Saved views** — "My Drafts", "Needs Review", "Published This Month"

---

## Relationship Visualization

For document types with relations (caseStudy → service, post → author, etc.):

```ts
// Custom pane showing related documents
S.view.component(RelationshipGraph).title('Relations')
```

The graph shows:
- Incoming references (what links to this doc)
- Outgoing references (what this doc links to)
- Missing references (broken refs)
- Depth control (1 level, 2 levels, all)

---

## Smart Features to Add

### Command Palette
```ts
// Custom Studio plugin — Cmd+K / Ctrl+K
// Search all document types, actions, recently viewed
```

### Global Search Enhancements
- Search across all document types simultaneously
- Filter by type, status, date range
- Save frequent searches

### Quick Create
- Floating action button on every list view
- "+ New Case Study" pre-fills common fields
- Templates for recurring content types

### Keyboard Shortcuts
- `Cmd+K` — Command palette
- `Cmd+P` — Quick open document
- `Cmd+N` — New document
- `Cmd+Shift+F` — Global search
- `Escape` — Close panel / back to list

---

## Custom Components Worth Building

| Component | Purpose |
|---|---|
| `DashboardWidget` | Stat card (counts, health, queues) |
| `RelationshipGraph` | Interactive graph of document relationships |
| `CommandPalette` | Cmd+K search across all types |
| `QuickCreate` | Floating FAB for new documents |
| `ContentHealth` | Missing fields, broken refs, SEO gaps |
| `BreadcrumbNav` | Context-aware breadcrumbs |
| `SavedViewSelector` | Named, filterable list views |
| `InlineReferenceEditor` | Edit referenced docs without leaving current |
| `RevisionTimeline` | Visual diff of document versions |
| `TemplatePicker` | Pre-filled document templates |

---

## Plugins to Use

| Plugin | Purpose |
|---|---|
| `@sanity/vision` | ✅ Already installed — GROQ query playground |
| `@sanity/orderable` | Drag-to-reorder lists (services, team, industries) |
| `sanity-plugin-dashboard` | Custom dashboard widgets |
| `sanity-plugin-media` | Enhanced media browser |
| `sanity-plugin-markdown` | Markdown editing for blog bodies |
| `sanity-plugin-mux-input` | Video upload via Mux |
| `sanity-plugin-note-field` | Read-only annotation fields |
| `sanity-plugin-tabs` | Better tabbed editing |
| `sanity-plugin-iframe-pane` | Preview pane for frontend |

---

## Implementation Priority

### Phase 1 (Now — already done)
- ✅ Editor tabs on all document types
- ✅ Field descriptions and validation
- ✅ Default sort orders
- ✅ Fixed previews (no DOM errors)
- ✅ Custom desk structure with sections
- ✅ Sync status tracking

### Phase 2 (Next)
- [ ] Dashboard with custom widgets
- [ ] Collapsible navigation sections
- [ ] Relationship graph view
- [ ] Quick-create menu
- [ ] Content health panel
- [ ] Enhanced list views (sortable, filterable)

### Phase 3 (Future)
- [ ] Command palette (Cmd+K)
- [ ] Keyboard shortcuts
- [ ] Templates for content types
- [ ] Revision timeline
- [ ] AI-assisted editing (content suggestions, SEO scoring)
- [ ] Saved views and smart folders

---

## Code Patterns

### Custom Desk Structure with Sections

```ts
// sanity/schemaTypes/deskStructure.ts
import { type StructureBuilder, type StructureResolver } from 'sanity/structure';

export const deskStructure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Wugweb Admin')
    .items([
      dashboardItem(S),
      S.divider(),
      contentSection(S),
      S.divider(),
      businessSection(S),
      S.divider(),
      systemSection(S),
    ]);

function dashboardItem(S: StructureBuilder) {
  return S.listItem()
    .title('Dashboard')
    .icon(() => '📊')
    .child(
      S.list()
        .title('Dashboard')
        .items([
          S.listItem().title('Recently Edited').child(S.documentList().title('Recent').filter('_updatedAt > now() - 7').order([{field: '_updatedAt', direction: 'desc'}])),
          S.listItem().title('Drafts').child(S.documentList().title('Drafts').filter('_originalId in path("*drafts*")')),
        ])
    );
}

function contentSection(S: StructureBuilder) {
  return S.listItem()
    .title('✍ Content')
    .icon(() => '📝')
    .child(
      S.list()
        .title('Content')
        .items([
          S.documentTypeListItem('caseStudy').title('Case Studies'),
          S.documentTypeListItem('post').title('Blog Posts'),
          S.documentTypeListItem('service').title('Services'),
        ])
    );
}

function businessSection(S: StructureBuilder) {
  return S.listItem()
    .title('💼 Business')
    .icon(() => '🏢')
    .child(
      S.list()
        .title('Business')
        .items([
          S.documentTypeListItem('client').title('Clients'),
          S.documentTypeListItem('engagement').title('Engagements'),
          S.documentTypeListItem('industry').title('Industries'),
        ])
    );
}

function systemSection(S: StructureBuilder) {
  return S.listItem()
    .title('⚙ System')
    .icon(() => '🔧')
    .child(
      S.list()
        .title('System')
        .items([
          S.documentTypeListItem('siteSettings').title('Site Settings'),
          S.documentTypeListItem('syncStatus').title('Sync Status'),
        ])
    );
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

---

## Key Takeaways

1. **Sanity is the UI layer** — Neon is SSOT. Studio writes to Sanity, syncs to Neon.
2. **Every field needs a description** — editors shouldn't guess what goes where.
3. **Every list needs a default sort** — newest first always.
4. **Every preview needs prepare()** — prevent `&` → DOM crash.
5. **Tab groups reduce overwhelm** — 3-5 tabs max per document type.
6. **Dashboard replaces the blank slate** — first thing editors see should be actionable.
7. **2-click rule** — anything important reachable in 2 clicks from dashboard.
8. **Collapsible nav sections** — prevent scroll fatigue with 10+ items.
9. **Relationships should be visible** — editors need to know what connects to what.
10. **Sync status should be visible** — editors need to know when content was last synced to Neon.

---

## Quick Reference: Current Sanity State

| Type | Count | In Neon |
|---|---|---|
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
| contactSubmission | 0 | Schema exists, no data |
