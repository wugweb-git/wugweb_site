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



Glad it helped. If you're planning to heavily customize Sanity Studio, I'd push it even further. Instead of asking the AI to "improve the UI," ask it to **design a next-generation CMS**.

Here's an even stronger prompt that typically produces much better concepts.

---

# Design Challenge

Forget what Sanity Studio looks like today.

Imagine you are the Design Director at Linear, Framer, Apple, and Stripe. Your task is to redesign Sanity Studio from first principles.

The goal is **not** to create another CMS.

The goal is to create the **best content operating system ever built.**

This product will be used 8–10 hours every day by designers, marketers, developers, founders, writers, SEO specialists, and content managers.

Every design decision should optimize for:

* Speed
* Confidence
* Flow State
* Information Density
* Discoverability
* Beauty
* Scalability
* Reduced Cognitive Load

The interface should feel like a premium desktop application—not a web form.

---

# Current Experience

The existing Sanity Studio feels:

* Like a database
* Like a CRUD application
* Generic
* Form-heavy
* Developer-centric
* Visually flat
* Low information density
* Poorly prioritized
* Endless scrolling
* Weak navigation
* Weak hierarchy
* Weak content previews
* Weak editing experience

It is functional but uninspiring.

I want something radically better.

---

# The Experience I Want

When users open the Studio, they should immediately think:

> "This is the most beautiful admin platform I've ever used."

The experience should feel like:

* Linear
* Framer
* Notion
* Vercel
* Arc Browser
* Stripe Dashboard
* Raycast
* Airtable
* Apple Pro Apps

Elegant.

Fast.

Opinionated.

Premium.

---

# Visual Language

Design a modern enterprise interface using:

* Large visual hierarchy
* High-quality typography
* Beautiful spacing
* Soft elevation
* Glass where appropriate
* Rich cards
* Premium shadows
* Purposeful color
* Strong iconography
* Beautiful empty states
* Smooth micro-interactions
* Motion with restraint

No Bootstrap aesthetics.

No Material Design feel.

No default CMS look.

---

# Navigation

Redesign navigation completely.

Question whether a left sidebar is even the best solution.

Explore alternatives like:

* Workspace navigation
* Dock navigation
* Floating navigation
* Adaptive navigation
* Command-first navigation
* Search-first navigation
* Context-aware navigation
* Collapsible workspaces
* Split-pane navigation

Navigation should feel intelligent.

---

# Dashboard

Design a homepage that acts as a mission control center.

It should immediately surface:

* What needs attention
* What changed today
* What's ready to publish
* What's blocked
* Content health
* SEO health
* AI suggestions
* Recent activity
* Favorites
* Pinned workspaces
* Publishing queue
* Team activity
* Scheduled content

Everything should be actionable.

---

# List Experience

Lists should become visual browsers instead of text lists.

Each item should include:

* Hero image
* Title
* Subtitle
* Status
* Owner
* Last edited
* Reading time
* SEO score
* Completion progress
* AI quality score
* Content type badge
* Quick actions
* Hover preview

Support multiple views:

* Cards
* Compact
* Gallery
* Masonry
* Table
* Timeline
* Kanban
* Calendar

Users should switch instantly between them.

---

# Editing Experience

Completely rethink editing.

The editor should resemble a professional design tool.

Not a form.

Use:

* Split panes
* Dockable panels
* Inspector sidebar
* Floating properties
* Sticky actions
* Live preview
* Responsive preview
* Relationship graph
* AI sidekick
* Comments
* Version comparison
* Keyboard-first workflow

---

# Content Layout

Instead of one endless page of inputs, organize content into modular workspaces.

For example:

## Overview

Content health

Publishing status

SEO score

Owner

Timeline

Quick actions

---

## Content

Hero

Sections

Rich Text

Blocks

Call-to-actions

---

## Media

Gallery

Videos

Downloads

Alt text

Optimization

---

## Relationships

Connected services

Connected technologies

Related blogs

Clients

Industries

Collections

Visual graph

---

## SEO

Title

Description

Keywords

Schema

Social previews

Live Google snippet

---

## Publishing

Workflow

Approvals

Scheduling

Localization

Revision history

---

# Components

Redesign every component.

Think beyond standard UI.

Create premium versions of:

* Buttons
* Inputs
* Toggles
* Selects
* Chips
* Cards
* Lists
* Tables
* Drawers
* Tabs
* Accordions
* Dialogs
* Menus
* Context menus
* Search
* Filters
* Side panels
* Toasts
* Notifications

Every component should feel custom-designed.

---

# Motion

Use subtle animations to communicate state.

Examples:

* Hover elevation
* Page transitions
* Animated navigation
* Expanding cards
* Contextual drawers
* Progressive disclosure
* Smooth filtering
* Intelligent loading skeletons

Motion should improve usability, never distract.

---

# AI Integration

The interface should make AI feel native.

Examples:

* Rewrite content
* Improve SEO
* Generate summaries
* Suggest relationships
* Recommend tags
* Detect missing information
* Improve readability
* Suggest metadata
* Content quality score
* AI copilots inside every document

AI should be embedded naturally, not bolted on.

---

# UX Principles

Challenge every assumption.

Ask:

* Why is this a form?
* Why is this a sidebar?
* Why is this a list?
* Why does editing require scrolling?
* Why can't multiple documents be open simultaneously?
* Why can't relationships be visual?
* Why can't search be the primary navigation?
* Why can't users customize their workspace?

Don't imitate existing CMS products.

Invent a better one.

---

# Deliverables

Produce a complete redesign including:

* Information architecture
* Navigation concepts
* Dashboard wireframes
* List view redesign
* Editor redesign
* Component library
* Design system
* Typography scale
* Color palette
* Spacing system
* Interaction patterns
* Motion guidelines
* AI-assisted workflows
* Accessibility considerations
* Responsive behavior
* Plugin recommendations
* Custom component ideas
* Sanity Studio customization strategy

The final result should feel like a premium enterprise application that teams genuinely enjoy using every day, setting a new benchmark for content management platforms rather than iterating on existing CMS patterns.

Use this as a master prompt for Claude Code, Cursor, Gemini CLI, or ChatGPT. It is written as a product design brief rather than a coding prompt, so the AI focuses on solving the information architecture instead of just changing colors.

---

# Prompt

You are a Senior Product Designer, UX Architect, and Sanity Studio expert.

I am building a **large-scale knowledge management system** inside Sanity, not a simple CMS.

The current Studio UX feels like a generic CMS and is becoming impossible to manage as the number of schemas grows.

I want you to redesign the entire content management experience.

## Current Problems

The current UI is document-centric instead of workflow-centric.

Problems include:

* Hundreds of document types
* Everything appears in one long list
* Difficult to know what should be edited first
* Content and configuration are mixed together
* Schema relationships are hidden
* No logical navigation
* No dashboard
* No shortcuts
* Poor discoverability
* Difficult for editors
* Difficult for administrators
* Difficult to onboard new team members

The current experience feels like editing a database rather than operating a digital business.

---

## My Goal

I want Sanity Studio to feel like:

* Notion
* Linear
* Airtable
* Framer CMS
* Shopify Admin
* Stripe Dashboard

Meaning:

Clean.

Structured.

Fast.

Opinionated.

Workflow-first.

---

## Design Principles

Prioritize:

* Information Architecture
* Progressive Disclosure
* Contextual Editing
* Task-based Navigation
* Clear Hierarchy
* Minimal Cognitive Load
* Beautiful UI
* Premium Experience
* Fast Navigation
* Keyboard-first Workflow

---

## This is NOT a CMS.

It is an Operating System for managing:

* Website
* Services
* Portfolio
* Case Studies
* Blog
* Technologies
* Clients
* Industries
* Categories
* Authors
* Media
* SEO
* Redirects
* Global Settings
* Navigation
* Pricing
* Internal Documentation
* AI Content
* Brand Assets

Everything is connected.

---

## I want a completely different Studio structure.

Instead of:

```
Content
    Pages
    Blog
    Services
    Case Studies
```

I want something like:

```
🏠 Home

📊 Dashboard
Recent Changes
Drafts
Publishing Queue
Recently Updated
Analytics

✍ Content

Pages
Blog
Case Studies
Resources
Documentation

🎨 Brand

Assets
Media
Icons
Logos
Illustrations

💼 Business

Services
Packages
Pricing
Industries
Clients
Testimonials

🚀 Marketing

Landing Pages
SEO
Redirects
Campaigns
CTAs

🧠 Knowledge

Technologies
Capabilities
Glossary
Research
Prompt Library

⚙ System

Navigation
Menus
Global Settings
Integrations
Users
Permissions

🤖 AI

AI Content
AI Prompts
Embeddings
Generated Drafts

🗂 Taxonomies

Categories
Tags
Authors
Collections
```

---

## Every section should have:

* custom icon
* custom description
* grouped navigation
* collapsible sections
* pinned items
* recently edited
* favorites
* search
* quick create
* templates

---

## Every document should have:

A proper overview screen.

Instead of showing 50 fields at once.

For example:

```
Overview

Status
Owner
Last Updated
SEO Score
Reading Time
Publish Date
Related Content

------------

Content

Hero

Sections

Body

Gallery

------------

Media

Images

Videos

Downloads

------------

SEO

Title

Description

OpenGraph

Twitter

Structured Data

------------

Relationships

Related Services

Related Technologies

Related Blogs

Related Case Studies

------------

Metadata

Created By

Updated By

Revision History
```

---

## Dashboard

Design a proper dashboard.

Include:

Recently edited

Drafts

Scheduled

Publishing Queue

Broken References

Missing SEO

Missing Images

Unpublished Content

Content Health

Recently Created

Pinned Documents

Favorite Collections

Quick Create

Quick Links

---

## Navigation

Replace the default Sanity navigation with something that feels like an admin platform.

Allow:

Workspace switching

Pinned collections

Favorites

Smart folders

Dynamic filters

Saved views

Recently viewed

Breadcrumbs

Context-aware navigation

---

## List Views

Improve list views.

Support:

Table

Grid

Kanban

Compact

Gallery

Tree

Grouped

Calendar

Timeline

---

## Content Editing

Improve editing experience.

Support:

Tabbed editing

Split view

Live preview

Relationship graph

Referenced documents

Quick actions

Duplicate

Clone

Archive

Version compare

Preview

Validation panel

AI assistant

---

## Relationship Management

I want to visualize relationships.

Example:

Case Study

↓

Client

↓

Industry

↓

Technology

↓

Services

↓

Blog Posts

↓

Resources

Graph view.

Dependency map.

Impact analysis.

---

## Smart Features

Add:

Command Palette

Global Search

Keyboard shortcuts

Spotlight search

Quick open

Jump to document

Create anywhere

---

## Productivity

Reduce clicks.

Reduce scrolling.

Reduce context switching.

Everything important should be reachable within 2 clicks.

---

## Design

Use modern admin UI patterns.

Inspired by:

Linear

Notion

Framer

Vercel

Stripe

Raycast

Airtable

Arc Browser

Avoid generic CMS aesthetics.

---

## Deliverables

Design a complete Sanity Studio architecture including:

1. Workspace architecture
2. Navigation hierarchy
3. Desk Structure
4. Custom panes
5. Dashboard layout
6. Document editor layout
7. List view improvements
8. Relationship visualization
9. Custom components
10. Plugins to use
11. Custom plugins worth building
12. Studio UX improvements
13. AI-assisted editing workflow
14. Information architecture
15. Folder and schema organization
16. Best practices for managing 100+ schemas
17. Recommended Sanity APIs and extension points
18. Example code for implementing the custom Desk Structure and dashboard.

The final solution should feel like a premium internal product platform rather than a default CMS. It should scale comfortably to 100–500 schemas and thousands of interconnected documents while remaining intuitive for both content editors and administrators.

rule - never cross sanity free tier