# Fix workplace.js ReferenceError

## What & Why
The bot crashes on startup because `workplace.js` has a stray `module.exports = { workplace }` at the very bottom of the file (line 162). The `workplace` identifier is not in scope at the module level — it is only defined as a local variable inside the `execute` function. The real export already happens on line 20 via `module.exports = { data, execute }`. The duplicate export line must be removed.

## Done looks like
- The bot starts without a `ReferenceError: workplace is not defined` crash.
- The `/workplace` command loads and responds correctly.

## Out of scope
- Any changes to the command's logic or UI.

## Steps
1. Remove the stray `module.exports = { workplace };` line (line 162) from the file.

## Relevant files
- `src/commands/economy/workplace.js:158-162`
