# Skill map

Optional helper skills per mode, and what each may not do. Every mode works without them, using the rules in this skill's references. Helpers return proposals only. The owner's rules win over anything a helper says.

## Wugweb skills

| Skill | Link |
| --- | --- |
| `wugweb-work` | Takes briefs and plans; returns pieces, return notes, post results. Its Brief mode is for client work only (decision 4) |
| `wugweb-seo` | Gives the site map, topic gaps, refresh list, link targets, link rules and audit, search reports, retired-URL behaviour. Takes goal, audience, page list, the pillar and cluster structure, the proof map, retire proposals |
| `wugweb-brand-os` | Gives positioning, audiences, messaging, approved facts. Takes requests only |
| `wugweb-voice` | Reads the signal log directly (owner decision 2026-11-17). Read only: it may not edit the log. No other link |
| `wugweb-kits` | No link. A block awaiting sign-off is a calendar dependency; the owner signed off the five blocks that were awaiting it (2026-11-17) |
| `wugweb-engineer` | Takes the ruling on whether a content type should have a field and whether stored values stay, then builds the schema change or leaves the field alone, as ruled. Gives change reports (current → proposed), backups, result logs and check results, and schema check findings for content fields. It owns patches to Sanity and Notion data, schema edits and the sync scripts; this skill never decides those and it never decides the fields |

## Helpers per mode

| Mode | Helpers |
| --- | --- |
| Strategy | `rampstack-seo:content-strategy`, `searchfit-seo:content-strategy`, `social-media-skills:content-pillars` |
| Topics | `searchfit-seo:create-topic` |
| Calendar | `social-media-skills:content-calendar`, `social-media-skills:batch-content-plan` |
| Brief | `searchfit-seo:content-brief`, `marketing:content-creation` (format reference only) |
| Review | `rampstack-seo:seo-content-audit` |
| Campaign | `marketing:campaign-plan` |
| Repurpose | `social-media-skills:content-recycling`, `social-media-skills:cross-platform-repurposing` |
| Notion reads | `Notion:database-query` (read only) |
| Number checks | `data:analyze`, on numbers the owner supplies only |

## What helpers may not do here

Decline and record any helper answer that:

- schedules or approves a batch of posts at once;
- creates, uploads or edits media, or adds sound or trending audio;
- keeps the plan in local files instead of Notion;
- scrapes by default, or uses review sites as a source;
- uses an uncited percentage or vendor statistic as a fact;
- adds FAQ or HowTo schema, keyword counts, or llms.txt work;
- adds visible update dates or "republish as fresh";
- redirects or deletes as an action;
- writes copy, hooks, captions or headlines;
- uses em dashes, American spelling or title case;
- writes a calendar row to Notion without the owner's yes for that row (`Notion:create-database-row` writes at once).

## Sources of the absorbed rules

The rules in this skill were restated in Wugweb's words from these skills, read on 2026-11-16. No text was copied, and no helper figure is used as a fact.

- `rampstack-seo`: content-strategy, content-and-copy (brief), seo-content-audit, seo-keyword, seo-competitor
- `seo-skills`: seo-page, seo-content-audit, seo-keyword-cluster, seo-competitor-gap-analysis, seo-plan, seo-gaps-to-social-campaign, ai-search-gaps-to-social-campaign, site-audit-to-social-distribution
- `searchfit-seo`: keyword-clustering, internal-linking, content-strategy, create-topic
- `social-media-skills`: content-pillars, batch-content-plan, content-calendar, idea-generation-and-ideation, content-research-and-sourcing, social-strategy, goals-and-kpis, linkedin-company-pages, linkedin-growth, x-growth, instagram-growth, campaign-and-launch-planning, seasonal-and-moment-marketing, trend-jacking, cross-platform-repurposing, content-recycling, collabs-and-cross-promotion, ugc-and-influencer, social-proof-and-testimonials, audience-research, content-audit, analytics-and-reporting, experimentation-and-ab-testing, viral-reverse-engineering, data-and-original-research, email-and-newsletter, lead-magnets-and-funnels, caption-writer (goal table only), competitor-analysis
- `marketing`: campaign-plan, content-creation (section lists), email-sequence, performance-report, competitive-brief
- `analytics-skills` and `rampstack-seo:seo-traffic-diagnosis`: noise floor and comparison rules
- `sanity:content-experimentation-best-practices`: test rules
- `anthropic-skills`: skill-creator, skill-development (for the skill's own shape)
