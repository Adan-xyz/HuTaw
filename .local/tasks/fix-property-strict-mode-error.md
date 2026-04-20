# Fix Property Schema StrictModeError

## What & Why
The bot crashes on startup with a Mongoose `StrictModeError` because `propertyModels` in `database.js` queries the `property` collection using a `uid` field that does not exist in the property schema. The `property` collection is a catalog of property types (id, name, price, description) — not a per-user record. Per-user property data is already tracked as a subdocument inside the user schema.

## Done looks like
- The bot starts without a `StrictModeError`
- User interactions that call `dbModels` work correctly
- The `property` catalog collection is unaffected

## Out of scope
- Changes to the property catalog schema or its data
- Any new per-user property tracking beyond what the user schema already handles

## Steps
1. **Remove `propertyModels` from `dbModels`** — Delete the `propertyModels` function and its call inside `dbModels` in `database.js`, since user property data is already managed through the user schema subdocument.

## Relevant files
- `src/utils/database.js`
- `src/database/models/property.js`
- `src/database/models/user.js`
