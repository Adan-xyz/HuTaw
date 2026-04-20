# Fix Button Interaction & Empty Bank Command

## What & Why
Two bugs need fixing:
1. The `resign` button handler crashes at runtime because it calls `editReply()` without first acknowledging the interaction. Discord requires button interactions to be acknowledged (via `update()` or `deferUpdate()`) before `editReply()` can be called.
2. `bank.js` is an empty file, causing a startup warning about a missing `data` or `execute` property.

## Done looks like
- Clicking the resign button no longer crashes the bot with `InteractionNotReplied`
- No startup warning about `bank.js` missing required properties
- Resign flow works end-to-end (shows the resigning message correctly)

## Out of scope
- Changes to any other button handlers
- New economy features in bank.js beyond resolving the empty file warning

## Steps
1. **Fix resign button** — Add `interaction.deferUpdate()` at the start of the `resign` handler (before `editReply()`), mirroring the pattern used in the `findjob` handler.
2. **Fix empty bank.js** — Either remove the file if it's unused, or add the required `data` and `execute` exports so it registers as a valid command without producing a warning.

## Relevant files
- `src/interactions/buttons.js:103-130`
- `src/commands/economy/bank.js`
