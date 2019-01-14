window._config = {
  isDebug: location.hash.slice(1) === 'is-debug' ||
  ['localhost', 'dev.wenzhixin.net.cn'].indexOf(location.hostname) > -1,
  cdnUrl: 'https://unpkg.com/bootstrap-table/dist/',
  localUrl: '../bootstrap-table/src/'
}

function _getLink(file) {
  var url = file
  if (!/^http/.test(file)) {
    url = window._config.cdnUrl + file

    if (window._config.isDebug) {
      url = window._config.localUrl + file.replace(/\.min/, '')
    }
  }
  return '<link href="' + url + '" rel="stylesheet">'
}

function _getScript(file, isScriptTag) {
  var url = file
  if (!/^http/.test(file)) {
    url = window._config.cdnUrl + file

    if (window._config.isDebug) {
      url = window._config.localUrl + file.replace(/\.min/, '')
    }
  }
  if (isScriptTag) {
    return '<script src="' + url + '"></script>'
  }
  return url
}

function _link(file) {
  $('head').append(_getLink(file))
}

function _script(file, callback) {
  var head = document.getElementsByTagName('head')[0]
  var script = document.createElement('script')

  script.src = _getScript(file)

  var done = false
  // Attach handlers for all browsers
  script.onload = script.onreadystatechange = function() {
    if (!done && (!this.readyState ||
      this.readyState === 'loaded' || this.readyState === 'complete')) {
      done = true
      if (callback)
        callback()

      // Handle memory leak in IE
      script.onload = script.onreadystatechange = null
    }
  }

  head.appendChild(script)
}

function _scripts(scripts, callback) {
  var eachSeries = function (arr, iterator, callback_) {
    var callback = callback_ || function () {}
    if (!arr.length) {
      return callback()
    }
    var completed = 0
    var iterate = function () {
      iterator(arr[completed], function (err) {
        if (err) {
          callback(err)
          callback = function () {}
        } else {
          completed += 1
          if (completed >= arr.length) {
            callback(null)
          } else {
            iterate()
          }
        }
      })
    }
    iterate()
  }

  eachSeries(scripts, _script, function () {
    callback()
  })
}

function _beautifySource(data) {
  var lines = data.split('\n')
  var scriptStart = lines.indexOf('<script>')
  var scriptEnd = lines.indexOf('</script>', scriptStart)
  var strings = lines.slice(scriptStart + 1, scriptEnd)
  strings = $.map(strings, function (s) {
    return $.trim(s)
  })
  var obj = eval('(' + strings.join('').replace(/^init\((.*)\)$/, '$1') + ')')

  var result = []
  result = result.concat($.map(obj.links, _getLink))
  result.push('')
  result = result.concat($.map(obj.scripts, function (script) {
    return _getScript(script, true)
  }))
  lines = result.concat(lines.slice(scriptEnd + 1))

  var mountedStart = lines.indexOf('function mounted() {')
  var mountedEnd = lines.indexOf('}', mountedStart)
  lines[mountedStart] = '$(function() {'
  lines[mountedEnd] = '})'

  return lines.join('\n')
}

$(function () {
  var url = location.search.replace(/\?v=\d+&/, '').replace(/\?v=VERSION&/, '')
  var isSource = location.hash.slice(1) === 'view-source'

  $.ajax({
    type: 'GET',
    url: url + '?v=VERSION', // todo: add version to solve cache problem
    dataType: 'html',
    global: false,
    cache: true, // (warning: setting it to false will cause a timestamp and will call the request twice)
    success: function (data) {
      if (isSource) {
        $('#example').hide().html(data)
        $('.source-pre').show()
        $('#source').text(_beautifySource(data))
        window.hljs.initHighlightingOnLoad()
      } else {
        $('#example').html(data)
      }
    }
  })

  var $el
  if (isSource) {
    $el = $('#viewExample').attr('href', 'index.html#' + url)
    $el.show().tooltip({
      title: 'View Example',
      placement: 'right',
      trigger: 'manual hover focus'
    })
  } else {
    $el = $('#viewSource').attr('href', 'index.html?view-source#' + url)
    $el.show().tooltip({
      title: 'View Source',
      placement: 'right',
      trigger: 'manual hover focus'
    })
  }

  setTimeout(function () {
    $el.tooltip('show')
    setTimeout(function () {
      $el.tooltip('hide')
    }, 5000)
  }, 1000)
})

window.init = function (options_) {
  var options = $.extend({
    title: '',
    desc: '',
    links: [],
    scripts: [],
    bootstrapVersion: 3,
    callback: function () {
      if (typeof window.mounted === 'function') {
        window.mounted()
      }
    }
  }, options_)

  $('#header h1 span').html(options.title)
  $('#header div').html(options.desc)
  $.each(options.links, function (i, file) {
    _link(file)
  })
  _scripts(options.scripts, options.callback)
}
