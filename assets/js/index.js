window._config = {
  isDebug: ['localhost', 'dev.bootstrap-table.com'].indexOf(location.hostname) > -1,
  isViewSource: false
}

function initUrl() {
  var href = location.hash.substring(1)
  window._config.isViewSource = false
  if (href.indexOf('view-source') > -1) {
    href = href.replace('#view-source', '').replace('view-source', '')
    window._config.isViewSource = true
  }
  return href || 'welcome.html'
}

function loadUrl(url_) {
  var hash = ''
  var url = 'template.html?v=VERSION&url=' + url_
  if (window._config.isDebug) {
    url = 'template.html?t=' + (+new Date()) + '&url=' + url_
  }
  if (window._config.isViewSource) {
    url = 'template.html?v=VERSION&view-source&url=' + url_ + '#view-source'
  }
  $('iframe').attr('src', url)
}

function initNavigation(href) {
  var $el = $('a[href="#' + href + '"]')
  var $parent = $el.parent()

  if (!$el.length) {
    return
  }

  $('#bd-docs-nav .active').removeClass('active')
  $parent.addClass('active')
  $el.parents('.bd-toc-item').addClass('active')
}

function autoScrollNavigation () {
  var $el = $('.bd-sidenav >li.active')
  $('#bd-docs-nav').scrollTop(0)
  if ($el.length && $el.offset().top > $(window).height() / 2) {
    $('#bd-docs-nav').scrollTop($el.offset().top - $(window).height() / 2)
  }
}

function doSearch() {
  var searchClient = window.algoliasearch('FXDJ517Z8G', '9b89c4a7048370f4809b0bc77b2564ac')

  var search = window.instantsearch({
    indexName: 'bootstrap-table-example',
    searchClient: searchClient,
    searchFunction: function (helper) {
      if (helper.state.query) {
        helper.search()
        $('#hits').show()
      } else {
        $('#hits').hide()
      }
    }
  })

  search.addWidget(
    window.instantsearch.widgets.searchBox({
      container: '#searchbox'
    })
  )

  search.addWidget(
    window.instantsearch.widgets.hits({
      container: '.hits-body',
      templates: {
        item: function (hit) {
          return [
            '<div class="link" data-href="' + hit.url + hit.anchor + '">',
            '<div class="category">',
            hit.anchor.split('/')[0].slice(1),
            '</div>',
            '<div class="title">',
            hit.title,
            '</div>',
            '<div class="description">',
            hit.description,
            '</div>',
            '</div>'
          ].join('')
        }
      }
    })
  )

  $(document).on('click', '.ais-Hits-item .link', function (e) {
    var href = $(e.currentTarget).data('href')
    if ($(e.target).is('a')) {
      return
    }
    location.href = href
    $('.ais-SearchBox-reset').click()
    $('.ais-SearchBox-input').blur()
    setTimeout(autoScrollNavigation, 200)
  })

  search.start()
}

$(function () {
  $('.bd-sidenav li').each(function () {
    $(this).attr('title', $.trim($(this).text()))
  })

  $('[data-toggle="tooltip"]').tooltip()

  $(window).hashchange(function () {
    var href = initUrl()
    loadUrl(href)
    initNavigation(href)
  })

  var href = initUrl()
  loadUrl(href)
  initNavigation(href)
  autoScrollNavigation()
  doSearch()
})
