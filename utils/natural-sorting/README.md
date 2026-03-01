# Natural Sorting

JS functions to allow natural sorting on bootstrap-table columns.

## Usage

### Browser (CDN)

```html
<script src="natural-sorting.js"></script>
```

Add a data-sorter attribute to any th:
```html
<th data-sortable="true" data-sorter="alphanum">Name</th>
<th data-sortable="true" data-sorter="numericOnly">Price</th>
```

### ES Modules

```javascript
import { alphanum, numericOnly } from './utils/natural-sorting/src/natural-sorting.js'
```

## Development

### Build

After modifying `src/natural-sorting.js`, run:

```bash
npm run build
```

This will compile the source files to `dist/natural-sorting.js` using Babel.

### Test

```bash
npm run test
```

### Lint

```bash
npm run lint
```

Note: The `dist/` directory is excluded from linting as it contains build artifacts.

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

## Changelog

### v1.1.0 (2026-03-01)

- Fixed `numericOnly` to properly extract numbers from complex HTML (Issue #558)
- Added ES modules export for better tree-shaking and IDE support
- Added comprehensive unit tests using Vitest
- Improved error handling for edge cases (null, undefined, empty strings)
