# Example: an inventory run on this site

A real run of the inventory script on the Wugweb site source, 2026-11-19. It is the first phase of an audit: count the raw values before proposing anything. The numbers are what the script printed that day; they change as the code changes.

```
node scripts/kits-inventory.mjs src/ --findings
```

## Output

```

Phase 0 inventory --- 151 files under src/

| Dimension | Distinct | Total uses | Top 5 cover |
|---|---|---|---|
| Color | 66 | 201 | 23% |
| Spacing / size | 164 | 739 | 21% |
| Font size | 28 | 51 | 35% |
| Font weight | 8 | 40 | 90% |
| Radius | 10 | 32 | 78% |
| Shadow | 16 | 23 | 52% |

Most frequent raw values (candidates for the surviving scale):

  Color
       11  #09e2c0
       11  #ffffff
        9  rgba(255, 255, 255, 0.02)
        8  #ffbe1a
        8  #3ed219
        6  rgba(255, 255, 255, 0.1)
        6  #ea1828
        5  rgba(0, 0, 0, 0.5)

  Spacing / size
       55  2px
       28  16px
       25  10px
       23  0.02em
       21  8px
       21  0.75rem
       21  3px
       19  0.875rem

  Font size
        5  1.125rem
        4  clamp(1rem
        3  0.8rem
        3  1rem
        3  clamp(2rem
        2  15px
        2  clamp(18px
        2  0.7rem

  Font weight
       16  600
        7  500
        5  400
        4  100 900
        4  700
        2  800
        1  ${t.weight
        1  ${spec.weight

  Radius
       13  50%
        3  2px
        3  12px
        3  16px
        3  6px
        2  ${r.val
        2  4px
        1  3px

  Shadow
        6  0 10px 30px rgba(0
        2  inset 0 1px 0 color-mix(in srgb
        2  0 25px 50px rgba(0
        1  0 24px 70px color-mix(in srgb
        1  0 8px 24px color-mix(in srgb
        1  0 14px 36px color-mix(in srgb
        1  0 20px 48px color-mix(in srgb
        1  0 0 0 3px color-mix(in srgb

Tokens declared: 386 · referenced: 303 · orphaned: 119
  ORPHAN  --ts-display-size  (src/styles/global.css:30)
  ORPHAN  --ts-h1-size  (src/styles/global.css:31)
  ORPHAN  --ts-h2-size  (src/styles/global.css:32)
  ORPHAN  --ts-h3-size  (src/styles/global.css:33)
  ORPHAN  --ts-body-lg-size  (src/styles/global.css:35)
  ORPHAN  --ts-body-md-size  (src/styles/global.css:36)
  ORPHAN  --ts-label-md-size  (src/styles/global.css:38)
  ORPHAN  --ts-label-sm-size  (src/styles/global.css:39)
  ORPHAN  --ts-caption-size  (src/styles/global.css:40)
  ORPHAN  --type-graphic-l  (src/styles/global.css:80)
  ORPHAN  --type-graphic-m  (src/styles/global.css:81)
  ORPHAN  --t-lead  (src/styles/global.css:94)
  ORPHAN  --core-line-height-loose  (src/styles/global.css:105)
  ORPHAN  --lh-h1  (src/styles/global.css:111)
  ORPHAN  --lh-h4  (src/styles/global.css:114)
  ORPHAN  --lh-m  (src/styles/global.css:119)
  ORPHAN  --color-grey  (src/styles/global.css:146)
  ORPHAN  --color-accent-lime  (src/styles/global.css:179)
  ORPHAN  --svc-strategy-light  (src/styles/global.css:204)
  ORPHAN  --svc-experience-light  (src/styles/global.css:206)
  ORPHAN  --svc-engineering-light  (src/styles/global.css:207)
  ORPHAN  --svc-growth-light  (src/styles/global.css:208)
  ORPHAN  --svc-operations-light  (src/styles/global.css:209)
  ORPHAN  --p-0  (src/styles/global.css:250)
  ORPHAN  --p-7  (src/styles/global.css:257)
  ORPHAN  --p-9  (src/styles/global.css:259)
  ORPHAN  --p-11  (src/styles/global.css:261)
  ORPHAN  --gap-xs  (src/styles/global.css:265)
  ORPHAN  --gap-sm  (src/styles/global.css:266)
  ORPHAN  --gap  (src/styles/global.css:267)
  ORPHAN  --gap-md  (src/styles/global.css:268)
  ORPHAN  --gap-xl  (src/styles/global.css:270)
  ORPHAN  --space-section-xs  (src/styles/global.css:273)
  ORPHAN  --radius-0  (src/styles/global.css:318)
  ORPHAN  --radius-1  (src/styles/global.css:319)
  ORPHAN  --radius-6  (src/styles/global.css:324)
  ORPHAN  --radius-8  (src/styles/global.css:325)
  ORPHAN  --r-sm  (src/styles/global.css:328)
  ORPHAN  --r  (src/styles/global.css:329)
  ORPHAN  --r-md  (src/styles/global.css:330)
  --� and 79 more

Referenced but never declared here (36) --- external theme or typo:
  UNDECLARED  --gap-5
  UNDECLARED  --gap-4
  UNDECLARED  --gap-12
  UNDECLARED  --gap-6
  UNDECLARED  --gap-3
  UNDECLARED  --gap-8
  UNDECLARED  --gap-2
  UNDECLARED  --gap-1
  UNDECLARED  --gap-10
  UNDECLARED  --gap-7
  UNDECLARED  --card-accent
  UNDECLARED  --pm-line-w
  UNDECLARED  --gap-9
  UNDECLARED  --theme-base
  UNDECLARED  --showcase-dwell
  UNDECLARED  --svc-
  UNDECLARED  --tag-x
  UNDECLARED  --tag-y
  UNDECLARED  --tag-hue
  UNDECLARED  --tag-chip

Raw values, file:line
  WARN     src/components/BentoBlock.astro:233  width: 6rem;  ->  same value as: no token holds this value   kits-tokens-only
  WARN     src/components/BentoBlock.astro:234  height: 6rem;  ->  same value as: no token holds this value   kits-tokens-only
  WARN     src/components/BentoBlock.astro:235  margin: -3rem 0 0 -3rem;  ->  same value as: --ts-h1-size or --p-12   kits-tokens-only
  WARN     src/components/BentoBlock.astro:235  margin: -3rem 0 0 -3rem;  ->  same value as: --ts-h1-size or --p-12   kits-tokens-only
  WARN     src/components/BentoBlock.astro:281  .bento-tile.is-tall  { min-height: 17rem; }  ->  same value as: no token holds this value   kits-tokens-only
  WARN     src/components/BentoBlock.astro:282  .bento-tile.is-mid   { min-height: 15rem; }  ->  same value as: no token holds this value   kits-tokens-only
  WARN     src/components/BentoBlock.astro:283  .bento-tile.is-short { min-height: 13rem; }  ->  same value as: no token holds this value   kits-tokens-only
  WARN     src/components/BentoBlock.astro:284  .bento-tile.is-slim  { min-height: 10rem; }  ->  same value as: no token holds this value   kits-tokens-only
  WARN     src/components/BentoBlock.astro:285  .bento-tile.is-strip { min-height: 5.6rem; padding: var(--gap-5) var(-  ->  same value as: no token holds this value   kits-tokens-only
  WARN     src/components/BentoBlock.astro:290  .bento-col { min-height: 39rem; }  ->  same value as: no token holds this value   kits-tokens-only
```

## How to read it

- The table at the top is the shape of the system: how many distinct raw values exist for each dimension, how often they are used, and how much of the use the five commonest values cover. A low cover figure means the values are scattered and a scale has not been adopted.
- The lists under it are the commonest raw values, which are the candidates for the surviving scale.
- The findings at the end are heuristic: each gives a file, a line and the literal found. Confirm a finding in the file before reporting it, then report it as current to proposed with the token to use.
- Nothing is edited by this script.
