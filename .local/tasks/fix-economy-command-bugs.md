# Fix Economy Command Bugs

## What & Why
Three bugs are causing runtime errors and warnings in the economy system: empty command files, a null-reference crash in the workplace command, and two logic errors in the button interaction handler.

## Done looks like
- No warnings about missing `data` or `execute` properties for `city.js` or `market.js`
- The `/workplace` command no longer crashes when a user has no database entry; instead it shows a user-friendly message
- The "Find job" button flow completes without throwing `InteractionAlreadyReplied`
- The result text after the job search ("You've successfully found a job!" or "You have failed...") displays correctly, and the "back" UI is shown separately via `editReply` after a delay

## Out of scope
- Implementing full feature logic for `city.js` and `market.js` (only stub them to remove the warning)
- Any other economy commands or database schema changes

## Steps
1. **Stub `city.js` and `market.js`** — Add minimal valid exports with a `data` SlashCommandBuilder and an `execute` function that replies with "Coming soon" so the loader stops warning.
2. **Null-guard in `workplace.js`** — After the `db.findOne()` call, check if `data` is null and reply with an appropriate message (e.g. "No profile found, please try again") before attempting to access `data.workplace`.
3. **Fix `buttons.js` interaction reply error** — Replace `interaction.reply()` inside the `back()` function with `interaction.editReply()`, since the interaction was already acknowledged by `interaction.update()`.
4. **Fix `buttons.js` setTimeout concatenation bug** — Separate the `setTimeout(() => { back() }, 3000)` call from the result text assignment on line 66. The `back()` timeout should only fire when `rng <= 50` (job not found), as a standalone statement after the text is set.

## Relevant files
- `src/commands/economy/city.js`
- `src/commands/economy/market.js`
- `src/commands/economy/workplace.js`
- `src/interactions/buttons.js`
