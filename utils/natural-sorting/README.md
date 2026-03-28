# Natural Sorting

JS functions to allow natural sorting on bootstrap-table columns.

## Usage

```html
<script src="natural-sorting.js"></script>
```

Add a data-sorter attribute to any th:
```html
<th data-sortable="true" data-sorter="alphanum">Name</th>
<th data-sortable="true" data-sorter="numericOnly">Price</th>
```

## Files

- **`src/natural-sorting.js`** - ES module source
  - For development and testing
  - Use with: `import { alphanum, numericOnly } from './natural-sorting.js'`

- **`dist/natural-sorting.js`** - Browser-ready build
  - Compiled and optimized for browsers
  - Exposes global functions: `alphanum()` and `numericOnly()`

## Development

### Build

```bash
npm run build
```

This compiles `src/natural-sorting.js` to `dist/natural-sorting.js` for browser usage.

### Test

```bash
npm run test
```

### Lint

```bash
npm run lint
```

## Sorters

### alphanum

* Sort alpha or numeric content naturally
* Works with columns containing mixed text and numeric content
* Numbers are sorted numerically (not ASCII order)
* Example: `file1, file2, file10` instead of `file1, file10, file2`

### numericOnly

* Extract numeric content and sort numerically
* Ideal for columns with formatted numeric content
* Removes HTML tags, currency symbols, and commas before sorting
* Example: `$1, $2, $20, $100` instead of `$1, $100, $2, $20`
* **Issue #558 fix**: Now properly handles complex HTML with debug comments

## Changelog

### v1.1.0 (2026-03-01)

- Fixed `numericOnly` to properly extract numbers from complex HTML (Issue #558)
- Added comprehensive unit tests using Vitest
- Improved error handling for edge cases (null, undefined, empty strings)
