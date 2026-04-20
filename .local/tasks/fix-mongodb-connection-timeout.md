# Fix MongoDB Connection Timeout

## What & Why
The app is failing to save documents to MongoDB with a buffering timeout error. This happens because Mongoose operations are queued before a connection is established, and the connection never succeeds — most likely due to MongoDB Atlas blocking Replit's dynamic IP addresses, or the `DB` environment variable not being properly available at runtime. There is also a bug in the error handling: `mongoose.connect()` returns a Promise, so the `try/catch` block in `connection.js` silently swallows async connection errors.

## Done looks like
- The app connects to MongoDB successfully on startup, logging "Database connected..."
- Property saves (and other DB operations) complete without timeout errors
- Connection errors are properly caught and logged, making future debugging easier
- The `DB` environment variable is stored as a Replit secret (not only in `.env`) so it is reliably available at runtime

## Out of scope
- Changing the MongoDB provider or database schema
- Changing any command or event logic unrelated to the DB connection

## Tasks
1. **Fix async error handling in connection.js** — Change the `connect()` function to use `async/await` with a proper `try/catch` so Promise rejections from `mongoose.connect()` are caught and logged correctly.

2. **Store DB URI as a Replit secret** — Move the `DB` connection string from the `.env` file into Replit's environment secrets so it is reliably available in all environments. Also store the `TOKEN` secret the same way if it isn't already.

3. **Open MongoDB Atlas network access** — In the MongoDB Atlas dashboard, set the IP Access List to allow connections from anywhere (`0.0.0.0/0`) so Replit's dynamic IPs are not blocked. Add a note in the README or a comment in `connection.js` explaining this requirement.

## Relevant files
- `src/database/connection.js`
- `src/hutaw.js`
- `.env`
