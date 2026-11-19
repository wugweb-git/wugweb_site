# Charts

A chart is made only from numbers the body already holds in full.

## A number qualifies when it has all six

value, what it measures, period, baseline or benchmark, source, date (the metric form lives in `copy-and-seo.md`).

## Refuse

- A chart request on a body with no numbers. Say so and list what the owner would need to supply.
- A number missing any of the six parts.
- A benchmark shown as the client's result.

## Page element or made file

| Where the chart goes | What it is | Gate |
|---|---|---|
| On a page: a case study, a blog post or a service page | Markup. The chart renders as HTML or SVG from the owner's numbers, in the server HTML. No image file is made | The body's approval; the gate for new files does not apply |
| In a deck, a post, a carousel or a share image | A made file | The gate for new files in `forms.md`: a yes for that one file |
| Already in the client's folder as an image | Existing media of kind `chart` | Read in Look mode like any other file; its numbers are still checked with the owner |

The catalogue has no chart block. On a page the chart sits inside the chapter that carries its numbers (the Results chapter in a stats-led case), and one or two numbers stay a stat. The drawing rules below apply to both kinds.

## Steps

1. List the qualifying numbers from the fact pack.
2. Propose the chart: type, axes, units, the source line that will sit under it, and whether it is a page element or a made file.
3. Use only the design system's tokens for colour and type (the type roles for made files are in `forms.md`). `wugweb-kits` may check the result.
4. A chart for a page is written as HTML or SVG and goes into the proposal. A chart file for a deck, post or share image is a made file: it goes through the gate for new files in `forms.md`.

## How the chart is drawn

- The title states the finding, with its dates.
- Bars start at zero. No 3D. No second axis.
- Sorted by value unless time is the axis.
- Meaning never rests on colour alone. The chart has alt text.
- The source and date are printed on the chart.
- One or two numbers are a stat, not a chart.
- Use the median for skewed data. One result is not a general claim.

## Check

Every plotted value equals the value in the body. The source and date are printed on the chart.
