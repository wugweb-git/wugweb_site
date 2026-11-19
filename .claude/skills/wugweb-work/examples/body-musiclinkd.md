# Example: MusicLinkd, Body Content v2 skeleton (large screen set)

A skeleton for a product with a very large set of screens. The page shows 1 to 4 proof screens per chapter and puts every other approved screen in the All screens block, grouped by audience then flow. Every fact the owner has not supplied is an `OWNER INPUT` marker.

## Count destinations, not files

MusicLinkd's registry holds 205 entries, but its own design system says those are not 205 product screens. A component, widget, block, state, sheet or dialog is not a screen; a screen is a destination someone arrives at with an intent. Before writing the body:

1. Use the MusicLinkd design system helper named in `references/skill-map.md` to read its taxonomy, `screen.json` and `flows-map.json`.
2. Count screens as destinations. Record states as states of one screen (`state` in the visual read), not as extra screens.
3. Group by audience, then flow. The flows follow the nine template families: Splash, Login, Onboarding, Home, Discover, Artist Profile, Studio Profile, Marketplace, Settings.
4. Write one chapter per journey that crosses flows (for example: find a studio, view it, check availability, book, pay, review), with the proof screens for each step.

## Skeleton

```
## MusicLinkd: OWNER INPUT what was built, in plain words
**Subtitle:** OWNER INPUT one line, 90 characters or fewer
**Client:** MusicLinkd
**Industry:** OWNER INPUT
**Disciplines:** OWNER INPUT
**Team:** OWNER INPUT
**Year:** OWNER INPUT
**Platform:** OWNER INPUT, for example iOS, Android
**App Store:** OWNER INPUT URL
**Play Store:** OWNER INPUT URL
**Accent:** proposed from the visual read, contrast-checked

### OWNER INPUT claim heading: who MusicLinkd is for and what they could not do before
Lead sentence that answers the heading.

### Artists find and book a studio in one journey
Lead sentence naming the journey and its number of steps, as seen in the screens.
1. OWNER INPUT step, from Discover
2. OWNER INPUT step, from Studio Profile
3. OWNER INPUT step, from Marketplace
4. OWNER INPUT step, from Settings or payments
![Screens: Discover 1, OWNER INPUT caption after a close look](OWNER INPUT R2 URL)
![Screens: Studio Profile 1, OWNER INPUT](OWNER INPUT R2 URL)
![Screens: Marketplace 1, OWNER INPUT](OWNER INPUT R2 URL)
![Screens: Marketplace 2, OWNER INPUT](OWNER INPUT R2 URL)

### OWNER INPUT claim heading for the artist profile
Lead sentence.
![Screens: Artist Profile 1, OWNER INPUT](OWNER INPUT R2 URL)
![Screens: Artist Profile 2, OWNER INPUT](OWNER INPUT R2 URL)

### OWNER INPUT claim heading for onboarding
Lead sentence.
![Screens: Onboarding 1, OWNER INPUT](OWNER INPUT R2 URL)
![Screens: Onboarding 2, OWNER INPUT](OWNER INPUT R2 URL)
![Screens: Onboarding 3, OWNER INPUT](OWNER INPUT R2 URL)

### The app says what to do when a network or search fails
Lead sentence. Only if the screens show loading, empty, error and offline states.
![States: Empty search, OWNER INPUT](OWNER INPUT R2 URL)
![States: Offline, OWNER INPUT](OWNER INPUT R2 URL)

### Design decisions, and the screens that show them
- **OWNER INPUT decision**: one sentence. See Discover 1.
- **OWNER INPUT decision**: one sentence. See Marketplace 2.
- **OWNER INPUT decision**: one sentence. See the empty state.
```

All other approved screens are not linked in the body. They stay folder-only and reach the All screens block through the manifest, with captions from the approved visual read.

## Owner questions this skeleton raises

1. What is the product in one sentence, and who are its audiences (artists, studios, venues, businesses)?
2. Which journeys matter most to show?
3. Is it live, and where?
4. Any numbers with source and date: users, bookings, ratings, launch date.

## Expected block plan when filled

hero → chapter (context) → chapter (journey) + timeline (4 steps) + rail "Journey" (4) → chapter (artist profile) + pair → chapter (onboarding) + rail (3) → chapter (states) + pair "States" → chapter (decisions) + points (3 columns) → screens (All screens: set chips by audience then flow, thumbnails, viewer) → credits → presence → related → next.
