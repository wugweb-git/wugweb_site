# Eval report-traffic-drop: diagnose a drop in blog organic traffic

Prompt: Organic traffic to the blog dropped last month. Diagnose it.

Files read: SKILL.md, LESSONS.md, references/report.md, references/handoffs.md, references/standing-rules.md.

Note: saved by the coordinating session from the runner's returned text. The runner's own write of this file was refused by a filename rule, so the answer below is the runner's, unedited.

## Response

I can't diagnose it yet. No data came with the request, and I will not guess a cause or a size for the drop. Please send a Search Console export and I will run the diagnosis.

What I need:

1. **Search Console export, Performance, Search type Web, pages under /blog.** Three periods: last month (October 2026), the month before (September 2026) and the same month a year earlier (October 2025). Pages and queries, with clicks, impressions, click rate and position. Use the export, not the browser table, which stops at 1,000 rows.
2. **Daily clicks for the same range**, so I can see the shape of the drop.
3. **Analytics sessions for /blog from organic search** over the same dates, to confirm the drop is real and not a measurement fault.
4. **Dates of any deploy, robots.txt change or blog change** in September and October.

What I will do with it, in this order, stopping at the first cause found:

1. Tracking: did the measurement itself break? Clicks and sessions should move together.
2. Indexing: did robots.txt, a noindex, a canonical or a deploy change?
3. Search engine update: does the drop line up with a published update date?
4. Results features: did an AI answer or another feature take the click? Position steady with click rate down points here.
5. Competitors: did another page take the position?
6. Content decay: are the pages out of date?

I will read the shape first (a one-step cliff, a slow ramp or a one-day spike), then split by page, query, country and device, and end with one evidenced cause, or two with the data that would separate them.

Not checked: everything. No number in this reply, because none was supplied. Search Console data is sampled and lags two to three days, so the result will be read as a trend.
