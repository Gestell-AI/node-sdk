# CHANGELOG

## 1.4.1

- `@gestell/sdk/types` export fixes

- Made sure `singleEntry` is typed into `collection.create(...)` payloads.

## 1.4.0

- Exposed types with more verbose and clear response and request shapes

- Added PII Controls with Explicit Identifiers for each

- Added single entry option for categories

- Updated tables to the new record format

- Tables now support prompt features

- Refactored code structure with enhanced intellisense

- Enhanced testing to verify API shapes are correct

- Cleaned root project structure

## 1.3.0

- Deprecated `threadId` and `chat` flags, instead use messages for history:

```typescript
interface Message {
  role: 'user' | 'model' | 'system'
  content: string
}
```

- Updated job management to use `documentId` only

## 1.2.3

- Added the tables flag for document upload and creation

## 1.2.1

- Removed Create and Delete Organization (can only be done in app)

- Added export features for documents, tables and features

## 1.1.0

- Added Category API Calls

- Flattened and Normalized Schema (to match Python, Python does not support nested class inheritance)

- Added `document.upload()`, convenient function that supports both client and server side uplaods

- Some Intellisense Improvements

## 1.1.15

- ESM and CJS Export Fixes were implemented

## 1.1.20

- Fix ESM and CJS conditional env loader

- Fix build artifacts (lots of debugging between link vs publish, lol)

## 1.1.21

- Fix buffer encoding and client side compatibility for `document.upload()`
