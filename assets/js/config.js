/**
 * This file contains all theme and menu structures for reuse by other modules
 */

const navItems = [
  {
    text: 'Home',
    href: 'https://bootstrap-table.com/'
  },
  {
    text: 'Docs',
    href: 'https://bootstrap-table.com/docs/getting-started/introduction/'
  },
  {
    text: 'Themes',
    href: 'https://bootstrap-table.com/themes'
  },
  {
    text: 'Examples',
    href: 'https://examples.bootstrap-table.com',
    active: true
  },
  {
    text: 'Online Editor',
    href: 'https://live.bootstrap-table.com',
    target: '_blank'
  },
  {
    text: 'News',
    href: 'https://bootstrap-table.com/news'
  },
  {
    text: 'Blog',
    href: 'https://blog.bootstrap-table.com',
    target: '_blank'
  }
]
const bootstrapThemes = [
  {
    label: 'Light',
    value: 'light',
    icon: 'bi-sun-fill'
  },
  {
    label: 'Dark',
    value: 'dark',
    icon: 'bi-moon-stars-fill'
  },
  {
    label: 'Auto',
    value: 'auto',
    icon: 'bi-circle-half'
  }
]
const icons = [
  {
    href: 'https://github.com/wenzhixin/bootstrap-table',
    ariaLabel: 'GitHub',
    icon: 'bi-github'
  },
  {
    href: 'https://twitter.com/wenzhixin2010',
    ariaLabel: 'Twitter',
    icon: 'bi-twitter'
  },
  {
    href: 'https://opencollective.com/bootstrap-table',
    ariaLabel: 'Open Collective',
    icon: 'bi-heart-fill'
  }
]
const themes = [
  { label: 'Bootstrap v5', value: '' },
  { label: 'Bootstrap v4', value: 'bootstrap4' },
  { label: 'Bootstrap v3', value: 'bootstrap3' },
  { label: 'Bootstrap Table', value: 'bootstrap-table' },
  { label: 'Semantic UI', value: 'semantic' },
  { label: 'Bulma', value: 'bulma' },
  { label: 'Materialize', value: 'materialize' },
  { label: 'Foundation', value: 'foundation' }
]
const menus = [
  {
    title: 'Welcome',
    children: [
      { label: 'Index', href: '#welcome.html' },
      { label: 'From HTML', href: '#welcomes/from-html.html' },
      { label: 'From Data', href: '#welcomes/from-data.html' },
      { label: 'From URL', href: '#welcomes/from-url.html' },
      { label: 'No Data', href: '#welcomes/no-data.html' },
      { label: 'Modal Table', href: '#welcomes/modal-table.html', show: [''] },
      { label: 'Modal Table', href: '#welcomes/modal-table-bootstrap4.html', show: ['bootstrap4'] },
      { label: 'Modal Table', href: '#welcomes/modal-table-bootstrap3.html', show: ['bootstrap3'] },
      { label: 'Modal Table', href: '#welcomes/modal-table-semantic.html', show: ['semantic'] },
      { label: 'Modal Table', href: '#welcomes/modal-table-bulma.html', show: ['bulma'] },
      { label: 'Modal Table', href: '#welcomes/modal-table-materialize.html', show: ['materialize'] },
      { label: 'Modal Table', href: '#welcomes/modal-table-foundation.html', show: ['foundation'] },
      { label: 'Group Columns', href: '#welcomes/group-columns.html' },
      { label: 'Sub Table', href: '#welcomes/sub-table.html' },
      { label: 'Multiple Table', href: '#welcomes/multiple-table.html' },
      { label: 'Flat Json', href: '#welcomes/flat-json.html' },
      { label: 'Large Data', href: '#welcomes/large-data.html' },
      { label: 'Vue Component', href: '#welcomes/vue-component.html' }
    ]
  },
  {
    title: 'Options',
    children: [
      { label: 'AJAX', href: '#options/table-ajax.html' },
      { label: 'AJAX Options', href: '#options/ajax-options.html' },
      { label: 'Basic Columns', href: '#options/basic-columns.html' },
      { label: 'Buttons Custom', href: '#options/buttons.html' },
      { label: 'Buttons Align', href: '#options/buttons-align.html' },
      { label: 'Buttons Attribute Title', href: '#options/buttons-attribute-title.html' },
      { label: 'Buttons Class', href: '#options/buttons-class.html', show: ['', 'bootstrap3', 'bootstrap4'] },
      { label: 'Buttons Order', href: '#options/buttons-order.html' },
      { label: 'Buttons Prefix', href: '#options/buttons-prefix.html', show: ['', 'bootstrap3', 'bootstrap4'] },
      { label: 'Buttons Toolbar', href: '#options/buttons-toolbar.html' },
      { label: 'Cache', href: '#options/table-cache.html' },
      { label: 'Card View', href: '#options/card-view.html' },
      { label: 'Checkbox Header', href: '#options/checkbox-header.html' },
      { label: 'Classes', href: '#options/table-classes.html', show: [''] },
      { label: 'Click To Select', href: '#options/click-to-select.html' },
      { label: 'Client Side Pagination', href: '#options/client-side-pagination.html' },
      { label: 'Columns', href: '#options/table-columns.html' },
      { label: 'Columns Search', href: '#options/columns-search.html' },
      { label: 'Columns Toggle All', href: '#options/columns-toggle-all.html' },
      { label: 'Content Type', href: '#options/content-type.html' },
      { label: 'Custom Search', href: '#options/custom-search.html' },
      { label: 'Custom Sort', href: '#options/custom-sort.html' },
      { label: 'Custom Toolbar', href: '#options/custom-toolbar.html' },
      { label: 'Data Type', href: '#options/data-type.html' },
      { label: 'Detail Filter', href: '#options/detail-filter.html' },
      { label: 'Detail View', href: '#options/detail-view.html' },
      { label: 'Detail View Align', href: '#options/detail-view-align.html' },
      { label: 'Detail View Icon', href: '#options/detail-view-icon.html' },
      { label: 'Detail View Unique ID', href: '#options/detail-view-unique-id.html' },
      { label: 'Escape', href: '#options/table-escape.html' },
      { label: 'Escape Title', href: '#options/table-escape-title.html' },
      { label: 'Filter Options', href: '#options/filter-options.html' },
      { label: 'Fixed Scroll', href: '#options/fixed-scroll.html' },
      { label: 'Footer Field', href: '#options/footer-field.html' },
      { label: 'Footer Style', href: '#options/footer-style.html' },
      { label: 'Header Style', href: '#options/header-style.html' },
      { label: 'Height', href: '#options/table-height.html' },
      { label: 'Icon Size', href: '#options/icon-size.html', show: ['', 'bootstrap3', 'bootstrap4'] },
      { label: 'Icons Prefix', href: '#options/icons-prefix.html', show: ['', 'bootstrap3', 'bootstrap4'] },
      { label: 'Id Field', href: '#options/id-field.html' },
      { label: 'Ignore Click To Select On', href: '#options/ignore-click-to-select-on.html' },
      { label: 'Large Columns', href: '#options/large-columns.html' },
      { label: 'Locale', href: '#options/table-locale.html' },
      { label: 'Loading Font Size', href: '#options/loading-font-size.html' },
      { label: 'Loading Template', href: '#options/loading-template.html' },
      { label: 'Maintain Meta Data', href: '#options/maintain-meta-data.html' },
      { label: 'Method', href: '#options/table-method.html' },
      { label: 'Minimum Count Columns', href: '#options/minimum-count-columns.html' },
      { label: 'Multiple Select Row', href: '#options/multiple-select-row.html' },
      { label: 'Page List', href: '#options/page-list.html' },
      { label: 'Page Number', href: '#options/page-number.html' },
      { label: 'Page Size', href: '#options/page-size.html' },
      { label: 'Pagination', href: '#options/table-pagination.html' },
      { label: 'Pagination H Align', href: '#options/pagination-h-align.html' },
      { label: 'Pagination Index Number', href: '#options/pagination-index-number.html' },
      { label: 'Pagination Load More', href: '#options/pagination-load-more.html' },
      { label: 'Pagination Loop', href: '#options/pagination-loop.html' },
      { label: 'Pagination Parts', href: '#options/pagination-parts.html' },
      { label: 'Pagination Text', href: '#options/pagination-text.html' },
      { label: 'Pagination V Align', href: '#options/pagination-v-align.html' },
      { label: 'Query Params', href: '#options/query-params.html' },
      { label: 'Query Params Type', href: '#options/query-params-type.html' },
      { label: 'Regex Search', href: '#options/regex-search.html' },
      { label: 'Remember Order', href: '#options/remember-order.html' },
      { label: 'Response Handler', href: '#options/response-handler.html' },
      { label: 'Row Attributes', href: '#options/row-attributes.html', show: ['', 'bootstrap3', 'bootstrap4'] },
      { label: 'Row Style', href: '#options/row-style.html' },
      { label: 'Search', href: '#options/table-search.html' },
      { label: 'Searchable', href: '#options/searchable.html' },
      { label: 'Search Accent Neutralise', href: '#options/search-accent-neutralise.html' },
      { label: 'Search Align', href: '#options/search-align.html' },
      { label: 'Search Highlight', href: '#options/search-highlight.html' },
      { label: 'Search On Enter Key', href: '#options/search-on-enter-key.html' },
      { label: 'Search Selector', href: '#options/search-selector.html' },
      { label: 'Search Text', href: '#options/search-text.html' },
      { label: 'Search Time Out', href: '#options/search-time-out.html' },
      { label: 'Server Side Pagination', href: '#options/server-side-pagination.html' },
      { label: 'Server Sort', href: '#options/server-sort.html' },
      { label: 'Show Button Icon', href: '#options/show-button-icons.html' },
      { label: 'Show Button Text', href: '#options/show-button-text.html' },
      { label: 'Show Extended Pagination', href: '#options/show-extended-pagination.html' },
      { label: 'Show Footer', href: '#options/show-footer.html' },
      { label: 'Show Fullscreen', href: '#options/show-fullscreen.html' },
      { label: 'Show Header', href: '#options/show-header.html' },
      { label: 'Show Pagination Switch', href: '#options/show-pagination-switch.html' },
      { label: 'Show Refresh', href: '#options/show-refresh.html' },
      { label: 'Show Search Button', href: '#options/show-search-button.html' },
      { label: 'Show Search Clear Button', href: '#options/show-search-clear-button.html' },
      { label: 'Show Toggle', href: '#options/show-toggle.html' },
      { label: 'Silent Sort', href: '#options/silent-sort.html' },
      { label: 'Single Select', href: '#options/single-select.html' },
      { label: 'Smart Display', href: '#options/smart-display.html' },
      { label: 'Sort Class', href: '#options/sort-class.html' },
      { label: 'Sort Empty Last', href: '#options/sort-empty-last.html' },
      { label: 'Sort Name Order', href: '#options/sort-name-order.html' },
      { label: 'Sort Reset', href: '#options/sort-reset.html' },
      { label: 'Sort Reset Page', href: '#options/sort-reset-page.html' },
      { label: 'Sort Stable', href: '#options/sort-stable.html' },
      { label: 'Sortable', href: '#options/table-sortable.html' },
      { label: 'Strict Search', href: '#options/strict-search.html' },
      { label: 'Table Icons', href: '#options/table-icons.html', show: ['', 'bootstrap3', 'bootstrap4'] },
      { label: 'Thead Classes', href: '#options/thead-classes.html', show: [''] },
      { label: 'Toolbar Align', href: '#options/toolbar-align.html' },
      { label: 'Total Not Filtered Field', href: '#options/total-not-filtered-field.html' },
      { label: 'Total/Data Field', href: '#options/total-data-field.html' },
      { label: 'Trim On Search', href: '#options/trim-on-search.html' },
      { label: 'Undefined Text', href: '#options/undefined-text.html' },
      { label: 'Visible Search', href: '#options/visible-search.html' }
    ]
  },
  {
    title: 'Column Options',
    children: [
      { label: 'Aligning Columns', href: '#column-options/aligning-columns.html' },
      { label: 'Aligning Footer', href: '#column-options/aligning-footer.html' },
      { label: 'Card Visible', href: '#column-options/card-visible.html' },
      { label: 'Cell Style', href: '#column-options/cell-style.html' },
      { label: 'Checkbox', href: '#column-options/checkbox.html' },
      { label: 'Checkbox Disabled', href: '#column-options/checkbox-disabled.html' },
      { label: 'Checkbox Enabled', href: '#column-options/checkbox-enabled.html' },
      { label: 'Class', href: '#column-options/class.html' },
      { label: 'Click To Select', href: '#column-options/click-to-select.html' },
      { label: 'Detail Formatter', href: '#column-options/detail-formatter.html' },
      { label: 'Escape', href: '#column-options/escape.html' },
      { label: 'Events', href: '#column-options/events.html' },
      { label: 'Fields', href: '#column-options/field.html' },
      { label: 'Footer Formatter', href: '#column-options/footer-formatter.html' },
      { label: 'Formatter', href: '#column-options/formatter.html' },
      { label: 'Natural Sorting', href: '#column-options/natural-sorting.html' },
      { label: 'Radio', href: '#column-options/radio.html' },
      { label: 'Rowspan Colspan', href: '#column-options/rowspan-colspan.html' },
      { label: 'Search Formatter', href: '#column-options/search-formatter.html' },
      { label: 'Search Highlight Formatter', href: '#column-options/search-highlight-formatter.html' },
      { label: 'Searchable', href: '#column-options/searchable.html' },
      { label: 'Show Select Title', href: '#column-options/show-select-title.html' },
      { label: 'Sort Name Order', href: '#column-options/sort-name-order.html' },
      { label: 'Sortable', href: '#column-options/sortable.html' },
      { label: 'Sorter', href: '#column-options/sorter.html' },
      { label: 'Switchable', href: '#column-options/switchable.html' },
      { label: 'Title', href: '#column-options/title.html' },
      { label: 'Title Tooltip', href: '#column-options/title-tooltip.html' },
      { label: 'Visible', href: '#column-options/visible.html' },
      { label: 'Width', href: '#column-options/width.html' },
      { label: 'Width Unit', href: '#column-options/width-unit.html' }
    ]
  },
  {
    title: 'Methods',
    children: [
      { label: 'Append', href: '#methods/append.html' },
      { label: 'Check Invert', href: '#methods/check-invert.html' },
      { label: 'Check/Uncheck', href: '#methods/check-uncheck.html' },
      { label: 'Check/Uncheck All', href: '#methods/check-uncheck-all.html' },
      { label: 'Check/Uncheck By', href: '#methods/check-uncheck-by.html' },
      { label: 'Destroy', href: '#methods/destroy.html' },
      { label: 'Expand/Collapse All Rows', href: '#methods/expand-collapse-all-rows.html' },
      { label: 'Expand/Collapse Row by uniqueId', href: '#methods/expand-collapse-row-by-uniqueid.html' },
      { label: 'Expand/Collapse Row', href: '#methods/expand-collapse-row.html' },
      { label: 'Filter By', href: '#methods/filter-by.html' },
      { label: 'Get Data', href: '#methods/get-data.html' },
      { label: 'Get Footer Data', href: '#methods/get-footer-data.html' },
      { label: 'Get Hidden Rows', href: '#methods/get-hidden-rows.html' },
      { label: 'Get Options', href: '#methods/get-options.html' },
      { label: 'Get Row By Unique Id', href: '#methods/get-row-by-unique-id.html' },
      { label: 'Get Scroll Position', href: '#methods/get-scroll-position.html' },
      { label: 'Get Selections', href: '#methods/get-selections.html' },
      { label: 'Get Visible/Hidden Columns', href: '#methods/get-visible-hidden-columns.html' },
      { label: 'Insert Row', href: '#methods/insert-row.html' },
      { label: 'Load', href: '#methods/load.html' },
      { label: 'Merge Cells', href: '#methods/merge-cells.html' },
      { label: 'Prepend', href: '#methods/prepend.html' },
      { label: 'Refresh', href: '#methods/refresh.html' },
      { label: 'Refresh Options', href: '#methods/refresh-options.html' },
      { label: 'Remove', href: '#methods/remove.html' },
      { label: 'Remove All', href: '#methods/remove-all.html' },
      { label: 'Remove By Unique Id', href: '#methods/remove-by-unique-id.html' },
      { label: 'Reset Search', href: '#methods/reset-search.html' },
      { label: 'Reset View', href: '#methods/reset-view.html' },
      { label: 'Scroll To', href: '#methods/scroll-to.html' },
      { label: 'Select/Prev/Next Page', href: '#methods/select-prev-next-page.html' },
      { label: 'Show/Hide All Columns', href: '#methods/show-hide-all-columns.html' },
      { label: 'Show/Hide Column', href: '#methods/show-hide-column.html' },
      { label: 'Show/Hide Loading', href: '#methods/show-hide-loading.html' },
      { label: 'Show/Hide Row', href: '#methods/show-hide-row.html' },
      { label: 'Sort By', href: '#methods/sort-by.html' },
      { label: 'Sort reset', href: '#methods/sort-reset.html' },
      { label: 'Toggle Detail View', href: '#methods/toggle-detail-view.html' },
      { label: 'Toggle Fullscreen', href: '#methods/toggle-fullscreen.html' },
      { label: 'Toggle Pagination', href: '#methods/toggle-pagination.html' },
      { label: 'Toggle View', href: '#methods/toggle-view.html' },
      { label: 'Update By Unique Id', href: '#methods/update-by-unique-id.html' },
      { label: 'Update Cell', href: '#methods/update-cell.html' },
      { label: 'Update Cell By Unique Id', href: '#methods/update-cell-by-unique-id.html' },
      { label: 'Update Column Title', href: '#methods/update-column-title.html' },
      { label: 'Update Format Text', href: '#methods/update-format-text.html' },
      { label: 'Update Row', href: '#methods/update-row.html' }
    ]
  },
  {
    title: 'Extensions',
    children: [
      { label: 'Addrbar', href: '#extensions/addrbar.html' },
      { label: 'Auto Refresh', href: '#extensions/auto-refresh.html' },
      { label: 'Cookie', href: '#extensions/cookie.html' },
      { label: 'Copy Rows', href: '#extensions/copy-rows.html' },
      { label: 'Custom View', href: '#extensions/custom-view.html' },
      { label: 'Defer Url', href: '#extensions/defer-url.html' },
      { label: 'Editable', href: '#extensions/editable.html', show: ['bootstrap3'] },
      { label: 'Export', href: '#extensions/export.html' },
      { label: 'Filter Control', href: '#extensions/filter-control.html', show: ['', 'bootstrap3', 'bootstrap4'] },
      { label: 'Fixed Columns', href: '#extensions/fixed-columns.html' },
      { label: 'Group By V2', href: '#extensions/group-by-v2.html', show: ['', 'bootstrap3', 'bootstrap4'] },
      { label: 'I18n Enhance', href: '#extensions/i18n-enhance.html' },
      { label: 'Key Events', href: '#extensions/key-events.html' },
      { label: 'Mobile', href: '#extensions/mobile.html' },
      { label: 'Multiple Sort', href: '#extensions/multiple-sort.html', show: ['', 'bootstrap3', 'bootstrap4'] },
      { label: 'Page Jump To', href: '#extensions/page-jump-to.html', show: ['', 'bootstrap3', 'bootstrap4'] },
      { label: 'Pipeline', href: '#extensions/pipeline.html', show: ['', 'bootstrap3', 'bootstrap4'] },
      { label: 'Print', href: '#extensions/print.html', show: ['', 'bootstrap3', 'bootstrap4'] },
      { label: 'Reorder Columns', href: '#extensions/reorder-columns.html' },
      { label: 'Reorder Rows', href: '#extensions/reorder-rows.html' },
      { label: 'Resizable', href: '#extensions/resizable.html' },
      { label: 'Sticky Header', href: '#extensions/sticky-header.html' },
      { label: 'Toolbar', href: '#extensions/toolbar.html' },
      { label: 'Treegrid', href: '#extensions/treegrid.html' }
    ]
  },
  {
    title: 'Issues',
    children: [
      { label: '137. Refresh from url after use data option', href: '#issues/137.html' },
      { label: '152. How to pass parameter to server', href: '#issues/152.html' },
      { label: '177. The Multiple Fields in Column', href: '#issues/177.html' },
      { label: '188. Show Export button only', href: '#issues/188.html' },
      { label: '220. Hide state column', href: '#issues/220.html' },
      { label: '221. Use cellStyle', href: '#issues/221.html' },
      { label: '283. Use resetView to reset the header width', href: '#issues/283.html' },
      { label: '337. Custom fontawsome icons', href: '#issues/337.html' },
      { label: '371. Using table content in a HTML form', href: '#issues/371.html' },
      { label: '383. Use Flat UI to style the checkboxes', href: '#issues/383.html' },
      { label: '386. Override default queryParam variables', href: '#issues/386.html' },
      { label: '395. Enable/disable delete button on click checkbox', href: '#issues/395.html' },
      { label: '406. Align the toolbar and search input', href: '#issues/406.html' },
      { label: '409. Refresh method with new url', href: '#issues/409.html' },
      { label: '415. Get checked row index', href: '#issues/415.html' },
      { label: '424. Toggle pagination', href: '#issues/424.html' },
      { label: '431. Load pagination data', href: '#issues/431.html' },
      { label: '457. Set the global defaults for the table', href: '#issues/457.html' },
      { label: '563. Change the background color on selected rows', href: '#issues/563.html' },
      { label: '579. Show images formatter', href: '#issues/579.html' },
      { label: '639. Footer resizing problem.', href: '#issues/639.html' },
      { label: '917. Maintain selected on server side.', href: '#issues/917.html' },
      { label: '986. Editable select box', href: '#issues/986.html' },
      { label: '987. Save row data using input.', href: '#issues/987.html' },
      { label: '1167. Check/Uncheck All in all page with client side', href: '#issues/1167.html' },
      { label: '2211. Rotated table column headers', href: '#issues/2211.html' },
      { label: '2619. Click sort with html Checkbox', href: '#issues/2619.html' },
      { label: '3345. Check/Uncheck All in all page with server side', href: '#issues/3345.html' },
      { label: '3784. Overwrite the table scrollbar', href: '#issues/3784.html' },
      { label: '3830. Export all records with server side pagination', href: '#issues/3830.html' },
      { label: '3949. Multiple group header and large columns', href: '#issues/3949.html' },
      { label: '4210. Get table full url', href: '#issues/4210.html' },
      { label: '4214. Added index field', href: '#issues/4214.html' },
      { label: '4586. Customize data attribute of td', href: '#issues/4586.html' }
    ]
  }
]

if (typeof window !== 'undefined') {
  window.Config = {
    navItems,
    bootstrapThemes,
    icons,
    themes,
    menus
  }
}

export {
  navItems,
  bootstrapThemes,
  icons,
  themes,
  menus
}
