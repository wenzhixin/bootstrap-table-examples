window._config = {
  isDebug: location.hash.slice(1) === 'is-debug' ||
    ['localhost', 'dev.bootstrap-table.com'].indexOf(location.hostname) > -1,
  cdnUrl: 'https://unpkg.com/bootstrap-table@1.13.4/dist/',
  localUrl: '../bootstrap-table/src/'
}

function _getLink(file) {
  var url = file
  if (!/^http/.test(file)) {
    url = window._config.cdnUrl + file

    if (window._config.isDebug) {
      url = window._config.localUrl + file.replace(/\.min/, '') + '?t=' + (+new Date())
    }
  }
  return '<link href="' + url + '" rel="stylesheet">'
}

function _getScript(file, isScriptTag) {
  var url = file
  if (!/^http/.test(file)) {
    url = window._config.cdnUrl + file

    if (window._config.isDebug) {
      url = window._config.localUrl + file.replace(/\.min/, '') + '?t=' + (+new Date())
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
  /* eslint-disable no-control-regex */
  var obj = eval('(' + strings.join('').replace(/[^\u0000-\u007E]/g, '')
    .replace(/^init\((.*)\)$/, '$1') + ')')

  var result = []
  result = result.concat($.map(obj.links, _getLink))
  result.push('')
  result = result.concat($.map(obj.scripts, function (script) {
    return _getScript(script, true)
  }))
  lines = result.concat(lines.slice(scriptEnd + 1))

  var mountedStart = lines.indexOf('  function mounted() {')
  var mountedEnd = lines.indexOf('  }', mountedStart)
  lines[mountedStart] = '  $(function() {'
  lines[mountedEnd] = '  })'

  return lines.join('\n')
}

$(function () {
  var run = function () {
    var query = {}
    location.search.substring(1).split('&').forEach(function (item) {
      query[item.split('=')[0]] = item.split('=')[1]
    })
    var url = query.url
    var isSource = location.hash.substring(1) === 'view-source'

    delete query.url

    $.ajax({
      type: 'GET',
      url: url + '?' + $.param(query),
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
      },
      error: function () {
        parent.location.href = 'index.html'
      }
    })

    if (isSource) {
      $('#viewExample').show().tooltip({
        title: 'View Example',
        placement: 'right'
      }).click(function () {
        $('#viewExample').hide()
        window.parent.location.hash = window.parent.location.hash.replace('#view-source', '')
      })
    } else {
      $('#viewSource').show().tooltip({
        title: 'View Source',
        placement: 'right'
      }).click(function () {
        $('#viewSource').hide()
        if (window.parent.location.hash.indexOf('view-source') === -1) {
          window.parent.location.hash += '#view-source'
        }
      })
    }
  }

  window.addEventListener('popstate', run)
  run()
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

  $('.bd-title span').html(options.title)
  $('.bd-lead').html(options.desc)
  $.each(options.links, function (i, file) {
    _link(file)
  })
  _scripts(options.scripts, options.callback)
}
