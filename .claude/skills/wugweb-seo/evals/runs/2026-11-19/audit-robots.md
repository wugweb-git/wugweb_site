# Eval audit-robots: can AI answer bots reach /work/care-booking

Prompt: Does robots.txt let the AI answer bots reach /work/care-booking?

Files read: SKILL.md, LESSONS.md, references/audit.md, references/handoffs.md, references/standing-rules.md, README.md (commands), examples/robots.txt. Script run (read-only): `node scripts/check-robots.mjs examples/robots.txt --path /work/care-booking`.

## Response

I could not read the live robots.txt, so I cannot answer for wugweb.com yet. I ran the check on the example file the skill ships, `examples/robots.txt`, which is a test file and says so in its first line. Send the robots.txt the site serves and I will run the same check on it.

**On the example file: no, not all of them. PerplexityBot is blocked from /work/care-booking. The other seven search and citation bots are allowed.**

```
robots.txt for /work/care-booking. 1 search or citation bot blocked. 1 sitemap line.

allowed  search    Googlebot           Allow: / (group *)
allowed  search    Bingbot             Allow: / (group *)
allowed  search    OAI-SearchBot       Allow: / (group *)
allowed  search    ChatGPT-User        Allow: / (group *)
BLOCKED  search    PerplexityBot       Disallow: /work/ (group PerplexityBot)
allowed  search    Perplexity-User     Allow: / (group *)
allowed  search    Claude-SearchBot    Allow: / (group *)
allowed  search    Claude-User         Allow: / (group *)
BLOCKED  training  GPTBot              Disallow: / (group GPTBot)
allowed  training  ClaudeBot           Allow: / (group *)
allowed  training  Google-Extended     Allow: / (group *)
allowed  training  Applebot-Extended   Allow: / (group *)
BLOCKED  training  CCBot               Disallow: / (group CCBot)
allowed  training  Bytespider          Allow: / (group *)
allowed  training  meta-externalagent  Allow: / (group *)

Not checked: firewall and bot settings that block crawlers before robots.txt is read; whether each bot obeys the file; bot names added since this list.
Training bots are the owner's choice. Report them; do not change them.
```

### Findings on the example file

```
1 file, 1 path. 1 blocker. 2 to report.

BLOCKER  robots.txt  PerplexityBot disallowed on /work/           crawler-access (search and citation)
REPORT   robots.txt  GPTBot disallowed on /                       crawler-access (training)
REPORT   robots.txt  CCBot disallowed on /                        crawler-access (training)
```

- **PerplexityBot.** A search and citation bot must reach every page that should be found. With `Disallow: /work/` the case study cannot be indexed for Perplexity answers. Perplexity-User, which fetches a page when a person asks, is still allowed by the file.
- **GPTBot and CCBot.** These are training bots, not answer bots. On wugweb.com you allow training bots (2026-11-17), so if the live file blocks them it differs from your decision. I report it and change nothing.
- **Sitemap line.** Present.

Read with these facts, from each operator's own bot page as read on 2026-11-16:

- Google's AI Overviews and AI Mode follow Googlebot, which the example file allows. Blocking Google-Extended would not affect them.
- A site that blocks OAI-SearchBot is not shown in ChatGPT search answers. The example file allows it.
- ChatGPT-User and Perplexity-User fetch on a person's request and may not follow robots.txt.

If the live file reads the same, the fix goes to site code:

```
SEO fixes: wugweb.com, 2026-11-19
To: site code
Scope: robots.txt
1. BLOCKER Remove Disallow: /work/ from the PerplexityBot group. Check: check-robots.mjs shows PerplexityBot allowed on /work/care-booking
Copy, layout and tokens are out of scope.
```

### Not checked

- The live robots.txt. Not supplied; this result is for the example file only.
- Firewall and bot settings. A host setting can return 403 to a crawler that robots.txt allows. Cloudflare has blocked AI crawlers by default for new sign-ups since 2025-07-01, so check the bot settings on the host as well.
- Whether each bot obeys the file, and bot names added since this list.
- The page's own `noindex` and `X-Robots-Tag`, which can block a page the file allows.

Next most useful check: the host's bot settings, since they can block a crawler before robots.txt is read.
