# Raghad, twenty-one: a love letter in almond blossom

Date: 2026-09-03. Approved by Yousef in chat.

## Purpose

A single-page birthday love letter for Raghad (رغد), 21 today, from Yousef.
Sent as a link, opened on her phone. Hosted on GitHub Pages at
https://yousef-alghzawi.github.io/raghad-21/ in a new repo, so the older
letter at /Raghad/ stays live and untouched. The older letter is NOT a design
reference for this one.

## Concept

Van Gogh painted Almond Blossom (1890) as a gift for a newborn: the first
flowers of the year opening on bare branches against a blue sky. The page is
one long scroll under that sky. A single dark branch grows down the page as
she reads, and blossoms open at every chapter.

- Sky teal-blue = her favourite colour.
- Burgundy = what she wears; it is the ink accent and the wardrobe chapter.
- Gold = reserved for "21" and the gift.

## Palette

| Role            | Hex     |
|-----------------|---------|
| Sky             | #7FB3C8 |
| Sky light wash  | #A9CFDD |
| Sky deep        | #5B93AB |
| Branch ink      | #2E2B3F |
| Branch ink 2    | #3B3B52 |
| Blossom white   | #FBF6EE |
| Blossom pink    | #F2D4D8 |
| Burgundy        | #6E1E2B |
| Gold            | #C9A24B |
| Cream panel     | #F7F1E6 |

## Type

- Prose: Cormorant Garamond (italic for stanzas).
- Arabic display: Aref Ruqaa for رغد; Amiri for Arabic prose lines.
- Labels: Jost, small caps tracking.

## Chapters (top to bottom)

1. The sky (hero). Name blooms inside a branch. "Raghad, twenty-one,
   3 September 2026". Scroll cue.
2. Presence. How she became the most essential part of the day.
3. Irbid, drawn in you. Blossom map of places; tap a blossom, a line opens.
   Places: OZ cafe, Daiken, Calma, Vogo, the airplane restaurant, District 7,
   Cracko, McDonald's, the east and south neighbourhoods, University Street
   (where they go together to pick up lunch for the family), King Abdullah
   University Hospital, JUST, Culture Circle, the cinema (Spider-Man and
   The Odyssey).
4. Scent. Days go wrong without it.
5. Wardrobe. Every outfit outdoes the last. Burgundy panel.
6. Light. Smile and laugh, stories that keep ringing, prettier every day.
7. White coat. Rotations at KAUH are no memory without her.
8. The missing piece. She is the soul that completes; without her a big piece
   is missing. A blossom with one petal gone that returns on scroll.
9. Memories the heart keeps. Lunch, coffee date, study session, breakfast
   pastry with tea, evening talk. Row of keepsake cards.
10. Now playing. Majida El Roumi: Khedni Habibi and Matrahak Bi Albi, as
    Spotify embed cards (no lyrics quoted).
    - https://open.spotify.com/track/5QlWYR4aCHZIF5wwl9BBPA
    - https://open.spotify.com/track/0f6iJjj6MqYZcFoftpjuwp
11. Twenty-one, the gift. Illustrated gold bracelet and ring. Gold-plated
    silver so gold and silver both have a place in her outfits (she already
    has a silver one from him). He saw her wearing them before he bought
    them. Shown openly; she reads after or while receiving the box.
12. Happy birthday. كل عام وأنتِ بخير يا رغد. May 21 and every year after be
    her best. Signed Yousef.

## Constraints

- No em dashes anywhere in the product (user's global rule).
- No photos (none supplied).
- No song lyrics reproduced; titles and artist only.
- Phone-first; must read well at 360px wide. Also fine on desktop.
- Reduced-motion users get the content with no scroll animation.

## Tech

- Static: index.html, style.css, script.js, .nojekyll, README.md.
- GSAP 3 + ScrollTrigger from cdnjs for branch growth (stroke-dashoffset,
  scrubbed) and chapter reveals. IntersectionObserver fallback not needed;
  GSAP handles reveals, CSS handles no-JS legibility (content visible by
  default, animations only add).
- Google Fonts for type.
- Deploy: new public repo Yousef-Alghzawi/raghad-21, Pages from main, root.

## Verification

- Open locally in Chrome at 390px and 1280px widths; screenshot each chapter.
- Console has no errors.
- grep the deliverables for em dashes and en dashes: zero hits.
- Deployed URL returns 200 and renders the hero.
