window._config = {
  isDebug: ['localhost', '127.0.0.1'].indexOf(location.hostname) > -1,
  isViewSource: false,
  theme: location.search.slice(1),
  themes: []
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

function initThemes() {
  $('[data-theme]').each(function () {
    if ($(this).data('theme')) {
      window._config.themes.push($(this).data('theme'))
    }
  })
  if (window._config.themes.indexOf(window._config.theme) === -1) {
    window._config.theme = ''
  }
  var $theme = $('[data-theme="' + window._config.theme + '"]').addClass('active')
  $('#theme-title').text($theme.text())

  $('[data-show]').each(function () {
    $(this).toggle($(this).data('show').split(',').indexOf(window._config.theme) > -1)
  })
}

function loadUrl(url_) {
  var template = 'template'
  if (window._config.themes.indexOf(window._config.theme) > -1) {
    template += '-' + window._config.theme
  }
  var url = template + '.html?v=VERSION&url=' + url_
  if (window._config.isDebug) {
    url = template + '.html?t=' + (+new Date()) + '&url=' + url_
  }
  if (window._config.isViewSource) {
    url = template + '.html?v=VERSION&view-source&url=' + url_ + '#view-source'
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
        helper.clearTags()
        helper.addTag(window._config.theme)
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
          var search = ''
          if (window._config.theme) {
            search = '?' + window._config.theme
          }
          return [
            '<div class="link" data-href="' + hit.url + search + hit.anchor + '">',
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

function initViewSource () {
  var isSource = /view-source$/.test(location.hash)

  if (isSource) {
    $('.view-example').css('display', 'block')
    $('.view-source').css('display', 'none')
  } else {
    $('.view-example').css('display', 'none')
    $('.view-source').css('display', 'block')
  }

  $('.view-example, .view-source').off('click').click(function () {
    if (isSource) {
      location.hash = location.hash.replace('#view-source', '')
    } else {
      if (location.hash.indexOf('view-source') === -1) {
        location.hash += '#view-source'
      }
    }
  })

  $('.view-online').attr('href', 'https://live.bootstrap-table.com/example/' +
    (location.hash.slice(1).split('#')[0] || 'welcome.html'))
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
    initViewSource()
  })

  initThemes()
  var href = initUrl()
  loadUrl(href)
  initNavigation(href)
  autoScrollNavigation()
  doSearch()
  initViewSource()
})
