# Fix setAccentColor type error

## What & Why
`setAccentColor` is crashing because it receives either the full exported object or a hex string instead of a plain integer. Two bugs need fixing together.

## Done looks like
- The bot no longer throws a `ValidationError` when a button interaction triggers the container builder.
- The accent color is applied correctly as a numeric value.

## Out of scope
- Changing the color generation logic beyond the type fix.

## Steps
1. **Fix the import in buttons.js** — Destructure the import so `randomColor` is the string value, not the whole module object.
2. **Fix the color type in color.js** — Change the exported value from a hex string (`"0x..."`) to a proper integer using `parseInt` so `setAccentColor` receives a number.

## Relevant files
- `src/interactions/buttons.js:2`
- `src/utils/color.js`
