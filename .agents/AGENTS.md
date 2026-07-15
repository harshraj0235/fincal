# Agent Guidelines

## Discover Articles Metadata
When modifying `src/data/discover/index.ts` to add, update, or remove discover articles, ALWAYS remember that the frontend uses `src/data/discover/metadata.ts` to display these articles on the UI.
Therefore, you MUST run the metadata generation script (`npx tsx scripts/generateDiscoverMetadata.ts`) immediately after any modifications to `index.ts`. If an automated script modifies `index.ts`, ensure that it also executes this metadata generation step so that the UI updates correctly.

## TypeScript Identifiers for Articles
When converting slugs to camelCase variable names (for example, `export const myArticle`), ensure that numbers are properly handled. Hyphens followed by numbers (like `-4`) should drop the hyphen and keep the number (e.g. `dhamaal-4-movie` -> `dhamaal4Movie`). Also, if the resulting variable starts with a number (e.g., `8th-pay`), you MUST prepend an underscore (e.g., `_8thPay`) since TypeScript identifiers cannot start with a number.

## Avoid AI Hallucinated Dates
When using AI to generate code containing timestamps or dates (like `date: '2026-07-15'`), **never trust the AI to reliably output the correct current date**, as they will often hallucinate older dates from their training data or write placeholder dates. Always write a post-processing script or regex (e.g., `code.replace(/date:\s*['"].*?['"]/, \`date: '\${new Date().toISOString()}'\`)`) to deterministically inject the true system timestamp into the code after the AI generates it. This is especially critical for sorting algorithms on the frontend that depend on the `date` field.
