function loadUrl(url) {
  var template = 'template.html'
  var viewSource = ''
  if (/v4.html/.test(url)) {
    template = 'template4.html'
  }
  if (location.search.slice(1) === 'view-source') {
    viewSource = '#view-source'
  }
  $('iframe').attr('src', template + '?v=2&' + url + viewSource)
}

function initNavigation(href) {
  var $el = $('a[href="' + href + '"]')

  $('.navigation').hide()

  if (!$el.length) {
    return
  }
  var $prev = $el.parent().prev('li')
  var $next = $el.parent().next('li')

  if ($prev.text()) {
    $('.navigation.previous').show()
      .attr('href', '#' + $prev.find('a').attr('href'))
      .attr('title', 'Previous: ' + $prev.text())
  }
  if ($next.text()) {
    $('.navigation.next').show()
      .attr('href', 'index.html#' + $next.find('a').attr('href'))
      .attr('title', 'Next: ' + $next.text())
  }
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
