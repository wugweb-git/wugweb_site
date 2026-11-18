# Plan: brief constraints before a page is written

The plan part answers one question for a brief: which phrase and intent
should this page target, and what limits must the copy meet? It returns limits
and an outline of topics, never wording.

## What the request carries

```
Page: <path> | Type: <case study, blog post, service page> | Client: <name or none>
What was built or said (one sentence):
Audience: <who would read this and why>
Candidate phrases (owner's words only):
Question: which one phrase and intent should this page target?
```

If a field is missing, ask for it once. Do not guess the audience.

## Classify intent from the live results

| Intent | The searcher wants to | Results that usually rank |
|---|---|---|
| Learning | understand a subject | guides, explainers |
| Comparing | weigh options | lists, comparisons, case studies |
| Hiring | find someone to do the work | service pages, case studies, agency pages |
| By name | reach Wugweb itself | the home page, about page |

Read the intent from the results that rank now, not from the words alone. Match
the format those results share.

## Choose the phrases

1. Group the candidates by intent.
2. Drop any phrase whose results serve a different intent from the page.
3. Choose one primary phrase and up to three supporting phrases.
4. Give each phrase its source: Search Console with the date range, a keyword
   tool with the date, or "unvalidated".
5. Rank by fit with the page and with the work Wugweb wants, then by how
   winnable the current results look. Volume breaks ties only.

If another page already targets the primary phrase, name both pages and stop.
The owner decides which keeps it.

## Return this shape

```
Page: <path>
Intent: <learning, comparing, hiring or by name>, from <how it was read>
Primary phrase: <phrase> (<source and date, or unvalidated>)
Supporting phrases: <phrase> (<source>), ...
Format that ranks now: <format>, seen on <up to three addresses>
Entities the page must name: <people, products, places, numbers already in the source>
Title: source 51 characters or fewer for a case study; no source limit for a
  blog post or service page; rendered 60 or fewer; other sites not decided
Description: 140 to 160 characters
Schema: <types, from the fixed rules>
Links: <targets for this piece, inside the link structure wugweb-strategy
  sets>; rules: one up to the service page (a case study links up to its
  service page only; sector pages are not a link-up target), two or three
  across to siblings, descriptive anchors, no orphans or dead ends
Outline (topics in order, not headings):
  1. <topic> rests on <fact already in the source>
  2. ...
Not proposed: FAQ blocks for search, keyword counts, sections written for search
```

Every entity listed must already appear in the source. If the page needs a fact
the source does not hold, list it under "Missing from the source" for the owner.

## What the plan part never does

- Turns an outline topic into a heading.
- Writes a heading, a title, a description or a sentence of body copy.
- Asks for a question heading where the copy uses a claim.
- Adds a section, an FAQ or a keyword target.
- Gives a volume, a difficulty or a traffic figure without its source and date.

## Site keyword and intent map

Asked by `wugweb-strategy`. Return one table:

| Cluster | Primary phrase | Supporting phrases | Intent | Dominant page type | Existing page or new | Source |
|---|---|---|---|---|---|---|

Then list topic gaps and pages to refresh. What to publish and when is not
this skill's decision.

## Platform keyword note

Part of the one keyword note this skill writes per piece, added when the piece
has a LinkedIn, Behance or Dribbble form. `wugweb-strategy` pastes the note
unchanged into brief field 9, where `wugweb-work` reads it for own content.
For client work (a case study), `wugweb-work` writes the brief itself and asks
this skill for the one search phrase. Give terms for the title, the first line and the tags on
LinkedIn, Behance or Dribbble, each sourced or marked "unvalidated". Never
write the post.

## Absorbed rules

These rules were taken from the helper skills on 2026-11-16 and restated here,
so the plan part works without them. Figures marked "source's figure" are that
helper's claim, not a measured Wugweb number. The owner's rules win in any
clash.

| Rule | Source |
|---|---|
| Read intent from page one. Six or more results of one type in the top ten set the page type; otherwise mark it mixed. A page whose type differs is a type mismatch | rampstack seo-keyword, seo-skills seo-content-brief, seo-sxo |
| Two phrases share a page when their top-ten results overlap: 7 to 10 shared is one page, 4 to 6 the same cluster, 2 to 3 interlink, 0 to 1 separate (source's figures) | seo-skills seo-keyword-cluster, rampstack seo-keyword |
| Clean the phrase list first: lowercase, remove duplicates, merge singular and plural. Brand and comparison terms get their own clusters. Phrases that fit no cluster are listed apart. Each cluster names an existing page or says a new one is needed | searchfit keyword-clustering |
| Score a cluster as opportunity plus fit minus difficulty, 1 to 5 each, only where real data exists. Log deferred clusters with the reason | rampstack seo-keyword |
| Pick competitors by overlap: domains that recur in the top ten across priority phrases. A gap is a phrase where a competitor ranks in the top 20 and Wugweb does not. Note how many competitors rank; one alone may be noise. Drop competitor brand terms | rampstack seo-competitor, seo-skills seo-competitor-gap-analysis |
| The brief states what the ranking pages cover and what this page adds that they lack. The link plan lists source page, anchor and target section. Unknown volume or difficulty is written "unknown" | searchfit content-brief, seo-skills seo-content-brief |
| AI prompts usually show no search volume, so prompts are never ranked by volume | seo-skills ai-search-gaps-to-social-campaign |
| For templated page sets, such as Kits or sector pages, each page needs facts its siblings lack. Sample pages and fail the set if they differ only by name | seo-skills seo-keyword-niche, rampstack programmatic-seo |
| Platform keyword note: primary phrase early and natural, once or twice; one search intent per post; never state a volume without a tool. Tags are few and specific | social-media-skills social-seo, hashtag-strategy |
| For multi-language client sites only: research keywords per market, never translate them | searchfit content-translation |

Set aside from these helpers: heading outlines, FAQ blocks, drafted H1 and H2
lines, keyword density, volume columns with no data source.
