# Report: search and AI answer performance

The report part reads data and says what to improve next. It is advisory. It
changes nothing.

## Name the source of every number

| Need | Without a connected tool | With a connected tool |
|---|---|---|
| Clicks, impressions, click rate, position | A Search Console export | The Search Console API, or an SEO data tool |
| Phrase volume and difficulty | Search Console queries | An SEO data tool, with its date |
| Speed | PageSpeed Insights | The same, by script |
| AI answer presence | A fixed prompt sample run by hand | An AI visibility tool |

A Search Console export is the standard source, set by the owner. A connected
tool is optional. If no export is given, ask for it and stop.

## The monthly report

```
Site: <host> | Period: <dates> | Source: <tool, date fetched>

Totals: clicks, impressions, click rate, average position
  against the previous period: <change>
  against the same period last year: <change>

Rose most: <page>, <change>, ...
Fell most: <page>, <change>, ...

Quick wins
  Title and description: <queries with many impressions and a low click rate>
  Content: <pages at positions 8 to 20>

AI answers: <n> prompts; cited <n>, mentioned <n>, absent <n>; trend over <months>

Not checked: <anything the data did not cover>
```

Search Console data is sampled and leaves some queries out. Read it as a trend.

Facts about the data, from Google's and Bing's own pages as read on 2026-11-16:

- Clicks and impressions from AI Overviews and AI Mode are counted inside the
  Web totals. Say so beside the totals.
- Search Console's Generative AI performance report, live for all sites since
  2026-08-31, shows impressions.
- The Search Console table in the browser stops at 1,000 rows. Use the export
  or the API for more.
- Bing Webmaster Tools has an AI Performance report, in preview since
  2026-02-10, that shows citations in its AI answers.

## AI answer sample

1. Fix a list of prompts a buyer would ask, in the owner's words. Keep it the
   same each month.
2. Run each prompt several times in the AI tools that matter to the owner. The
   same prompt gives different answers each run, so one run is not evidence.
   Report how often Wugweb appears across the runs, not a single result.
3. Log each result as cited (a Wugweb page is linked), mentioned (Wugweb is
   named) or absent.
4. Read the trend over several months. A single month moves a lot.

## Diagnose a drop

Check in this order and stop at the first cause found:

1. Tracking: did the measurement itself break?
2. Indexing: did robots.txt, a noindex, a canonical or a deploy change?
3. Search engine update: does the drop line up with a published update date?
4. Results features: did an AI answer or another feature take the click?
5. Competitors: did another page take the position?
6. Content decay: is the page out of date?

## Limits on use

- Never place these numbers on a case study as a client result.
- Never estimate a missing number. Say it is missing.

## Absorbed rules

Taken from the helper skills on 2026-11-16 and restated here, so the report
part works without them. The owner's rules win in any clash.

| Rule | Source |
|---|---|
| Before any diagnosis, confirm the drop is real: Search Console clicks and analytics sessions move together. Restate the question with the metric, dates and figures | rampstack seo-traffic-diagnosis, analytics analytics-diagnostic-method |
| Read the shape first. A one-step cliff points to a deploy, tracking or an outage; a slow ramp to decay; a one-day spike to a bot or a viral moment. Every channel falling together points to measurement. Compare the same weekdays | analytics traffic-change-diagnosis |
| Split by country, device, section, and branded or not. Position steady with click rate down means a results feature took the click. If the total moved and no segment did, it is a mix change. End with one evidenced hypothesis; if two causes fit, report both and say what data would separate them | rampstack seo-traffic-diagnosis, analytics skills |
| Search Console data lags two to three days. State the sample size first. Call a trend only with enough points. A benchmark is never a target | seo-skills seo-google, analytics metric-context-and-benchmarks, marketing performance-report |
| Junk-traffic check for organic: pages per session near one, very short visits, very low engagement, off-market geography, spam referrers. Direct traffic absorbs branded search | analytics channel-and-funnel-quality |
| AI answer sample: fixed prompt types (best in category, brand against rival, alternatives, a how-to for the problem, a recommendation for a use case). Per engine, record named, linked as a source, or absent, plus position, whether the description is accurate, and which competitors were named. Use fresh sessions. Zero stays zero. Citation rate is cited over answers present | searchfit ai-visibility, seo-skills seo-ai-search-share-of-voice, seo-geo, `social-media-skills:ai-search-optimization` |
| Report visits referred by AI assistants as their own line. ChatGPT links carry `utm_source=chatgpt.com` (third-party claim: SearchPilot, 2026-05-13); some AI apps pass no referrer, so the line undercounts | sanity seo-aeo-best-practices, `social-media-skills:ai-search-optimization` |
| Lead with outcomes, include what underperformed, and close with three ranked actions. Each action cites its data point, impact and effort | social-media-skills analytics-and-reporting, marketing performance-report |

Set aside: recovery forecasts as numbers, generic benchmark ranges, redirects
from old paths as a fix, scores with no rubric.
