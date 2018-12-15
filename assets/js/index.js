function loadUrl(url) {
  var template = 'template.html'
  if (/v4.html/.test(url)) {
    template = 'template4.html'
  }
  $('iframe').attr('src', template + '?' + url)
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
  }
  if ($next.text()) {
    $('.navigation.next').show()
      .attr('href', '#' + $next.find('a').attr('href'))
  }
}

$(function () {
  $('.toggle').click(function () {
    $('.nav-list').toggleClass('active')
  })

  $(document).on('click', '#navbar li a, .nav-list li a, .navigation a', function (e) {
    var href = $(this).attr('href')
    if (href === '#' || /^http.*/.test(href)) {
      return
    }
    e.preventDefault()
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
