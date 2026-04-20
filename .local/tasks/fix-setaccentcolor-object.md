# Fix setAccentColor receiving object

## What & Why
`color.js` exports `{ randomColor }` as an object, but `buttons.js` imports the whole module and passes it directly to `setAccentColor()`, which expects a plain number. This causes a `ValidationError` crash on both the `findjob` and `resign` button interactions.

## Done looks like
- The `findjob` and `resign` button interactions no longer crash with a `ValidationError`
- `setAccentColor` receives the numeric color value correctly in both places

## Out of scope
- Changing when or how often the random color is generated
- Any other button interaction logic

## Steps
1. Fix the import in `buttons.js` to destructure `randomColor` from the `color.js` export, so the variable holds a plain number instead of an object. This fixes both `setAccentColor(color)` calls on lines 70 and 136.

## Relevant files
- `src/interactions/buttons.js:1-2,70,136`
- `src/utils/color.js`
