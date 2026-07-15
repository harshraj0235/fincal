# Agent Guidelines

## Discover Articles Metadata
When modifying `src/data/discover/index.ts` to add, update, or remove discover articles, ALWAYS remember that the frontend uses `src/data/discover/metadata.ts` to display these articles on the UI.
Therefore, you MUST run the metadata generation script (`npx tsx scripts/generateDiscoverMetadata.ts`) immediately after any modifications to `index.ts`. If an automated script modifies `index.ts`, ensure that it also executes this metadata generation step so that the UI updates correctly.
