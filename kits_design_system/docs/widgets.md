# Wugweb Kits — Reusable UI Widgets & Building Blocks

> Master specification for reusable UI widgets, controls, input components, cards, indicators, and layout building blocks used across Wugweb.

---

## 1. Input Controls & Selectors

### 6-Pillar Scope Selector Card
- **Description**: Interactive checkbox grid item used in enquiry forms to select target service pillars.
- **Markup Structure**:
  ```html
  <label class="pillar-selector">
    <input type="checkbox" name="interests" value="Strategy" />
    <div class="selector-content">
      <span class="pillar-name">Strategy</span>
      <span class="pillar-desc">Product, Brand & Growth Architecture</span>
    </div>
  </label>
  ```
- **Styling & Tokens**:
  - Container: `--surface-2` bg, `--stroke-thin` border (`--line`), `--radius-sm` (8px)
  - Checked State: `--surface-hover` bg, border `--accent-warm` (`#FFBE1A`), `box-shadow: 0 0 12px rgba(255, 180, 0, 0.15)`
  - Typography: `.pillar-name` (600 weight, `--fg`), `.pillar-desc` (0.82rem, `--fg-muted`)

### Radio Budget & Timeline Chips
- **Description**: Pill-shaped single-select radio button chips for quick budget and timeline selection.
- **Markup Structure**:
  ```html
  <label class="radio-chip">
    <input type="radio" name="budget" value="$15K - $35K" />
    <span>$15K - $35K</span>
  </label>
  ```
- **Styling & Tokens**:
  - Pill Shape: `--radius-full` (9999px), `--surface-2` bg, `--stroke-thin` border
  - Checked State: `--surface-hover` bg, `--accent-warm` text & border color

### Custom Text Field & Textarea
- **Description**: Styled text inputs, email inputs, phone fields, and textareas.
- **Markup Structure**:
  ```html
  <div class="field-group">
    <label for="email">Work Email *</label>
    <input type="email" id="email" name="email" required placeholder="name@company.com" />
  </div>
  ```
- **Styling & Tokens**:
  - Label: `--font-mono`, `--fluid-label`, `--fg-muted`
  - Input: `--surface-2` bg, `--stroke-thin` border, `--radius-sm` (8px), padding `--gap-3` `--gap-4`
  - Focus State: `--stroke-focus`, border `--accent-warm`, `--surface-hover` bg

### Spam Honeypot Protection Field
- **Description**: Invisible field designed to catch automated spam bots.
- **Markup Structure**:
  ```html
  <label class="hp-field" aria-hidden="true">
    <input type="text" name="website" tabindex="-1" autocomplete="off" />
  </label>
  ```
- **CSS Rule**: `.hp-field { position: absolute; left: -9999px; opacity: 0; pointer-events: none; }`

---

## 2. Badges & Status Indicators

### Status Pulse Badge & Dot
- **Description**: Live availability / status indicator badge with animated pulsing green dot.
- **Markup Structure**:
  ```html
  <div class="hero-badge">
    <span class="pulse-dot"></span>
    <span>Accepting Select Projects for Q3/Q4</span>
  </div>
  ```
- **Styling & Tokens**:
  - Badge: `--surface-elevated` bg, `--stroke-thin` border, `--radius-full`, `--font-mono`, `--fluid-label`
  - Dot: 8×8px circle, background `#10b981`, `box-shadow: 0 0 8px #10b981`

### SLA Guaranteed Response Chip
- **Description**: Quick response SLA guarantee indicator with clock SVG icon.
- **Markup Structure**:
  ```html
  <span class="quick-sla">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    Guaranteed 24h Response
  </span>
  ```

### Quick Action Chips (Email & WhatsApp)
- **Description**: Direct contact action chips for immediate communication.
- **Markup Structure**:
  ```html
  <a href="https://wa.me/919205996219" target="_blank" rel="noopener noreferrer" class="quick-chip">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    WhatsApp Us
  </a>
  ```

---

## 3. Cards & Bento Layouts

### Glassmorphic Elevated Panel (`.glass-panel`)
- **Description**: Standard elevated card for sidebars, details, and feature highlights.
- **Tokens**: Background `--surface-elevated` (#191919), `--stroke-thin` border, `--radius-lg` (16px), padding `--gap-6`

### Bento Grid Tile (`.bento-card`)
- **Description**: Modular bento tile for service capabilities, case study highlights, and value propositions.
- **Tokens**: Background `--surface-2`, `--stroke-thin` border, `--radius-lg` (16px), transition `--transition-fast`, hover `translateY(-4px)`

---

## 4. Editorial & Navigation Building Blocks

### Interactive Table of Contents (ToC)
- **Description**: Auto-generated article outline with active heading tracking.
- **Tokens**: Border-left `--stroke-thin` (`--line`), link text `--fg-muted`, active link `--accent-warm` + bold weight.

### Sticky Social Share Bar
- **Description**: Floating or sticky bar for sharing articles across X, LinkedIn, WhatsApp, and Clipboard.
- **Tokens**: Button size 40×40px (`--share-btn`), `--radius-full`, background `--surface-2`, hover `--surface-hover`.

### Accordion FAQ Card
- **Description**: Expandable question and answer accordion tile.
- **Markup Structure**:
  ```html
  <details class="faq-card">
    <summary class="faq-trigger">
      <span>What is the typical timeline for an engagement?</span>
      <svg class="faq-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    </summary>
    <div class="faq-content">
      <p>Most strategic engagements range from 4 to 12 weeks depending on scope...</p>
    </div>
  </details>
  ```
