function loadUrl(url) {
  var template = 'template.html'
  var hash = ''
  if (location.search.slice(1) === 'view-source') {
    hash = '#view-source'
  } else if (location.search.slice(1) === 'is-debug') {
    hash = '#is-debug'
  }
  $('iframe').attr('src', template + '?v=VERSION&url=' + url + hash)
}

function initNavigation(href) {
  var $el = $('a[href="#' + href + '"]')

  if (!$el.length) {
    return
  }

  $('#bd-docs-nav .active').removeClass('active')
  $el.parent().addClass('active')
  $el.parents('.bd-toc-item').addClass('active')
}

$(function () {
  $('.toggle').click(function () {
    $('.nav-list').toggleClass('active')
  })

  $('[data-toggle="tooltip"]').tooltip()

  $(document).on('click', '#navbar li a, .nav-list li a, .navigation a', function (e) {
    var href = $(this).attr('href')
    if (href === '#' || /^http.*/.test(href)) {
      return
    }
    e.preventDefault()
    if (location.search.slice(1) === 'view-source') {
      location.href = 'index.html#' + href
      return
    }

    $(this).blur()
    $('.nav-list').removeClass('active')
    location.hash = href
    loadUrl(href)
    initNavigation(href)
  })

  $(window).hashchange(function () {
    var href = location.hash.substring(1)
    loadUrl(href)
    initNavigation(href)
  })

  $(window).on('blur',function() {
    $('.dropdown-toggle').parent().removeClass('open')
  })

  var href = location.hash.substring(1) || 'welcome.html'
  loadUrl(href)
  initNavigation(href)
})
