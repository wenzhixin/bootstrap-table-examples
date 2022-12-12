window._config = {
  isDebug: location.hash.slice(1) === 'is-debug' ||
    ['localhost', '127.0.0.1', 'dev.bootstrap-table.com'].indexOf(location.hostname) > -1,
  cdnUrl: 'https://unpkg.com/bootstrap-table@1.21.2/dist/',
  localUrl: '../bootstrap-table/src/',
  testUrl: '/src/'
}

function _getLink(file) {
  var url = file
  if (!/^http/.test(file)) {
    url = window._config.cdnUrl + file

    if (window._config.isDebug) {
      url = (location.href.includes('for-test') ? window._config.testUrl : window._config.localUrl) +
        file.replace(/\.min/, '') + '?t=' + (+new Date())
    }
  }
  return '<link href="' + url + '" rel="stylesheet">'
}

function _getScript(file, isScriptTag) {
  var url = file
  if (!/^http/.test(file)) {
    url = window._config.cdnUrl + file

    if (window._config.isDebug) {
      url = (location.href.includes('for-test') ? window._config.testUrl : window._config.localUrl) +
        file.replace(/\.min/, '') + '?t=' + (+new Date())
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

  if (window._config.isDebug && !/^http/.test(file)) {
    script.type = 'module'
  }

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
  if (!scripts.length) {
    return callback()
  }

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

function _themeUpdate(data) {
  if (/bootstrap3.html$/.test(location.pathname)) {
    return data.replace(/btn-secondary/g, 'btn-default')
  }
  if (/semantic.html$/.test(location.pathname)) {
    return data.replace(/btn btn-secondary/g, 'ui button')
      .replace(/btn btn-danger/g, 'ui red button')
      .replace(/select class="form-control"/g, 'select class="ui dropdown"')
      .replace(/'bootstrap-table.min.js'/, '\'bootstrap-table.min.js\',\n      \'themes/semantic/bootstrap-table-semantic.min.js\'')
      .replace(/'bootstrap-table.min.css'/, '\'themes/semantic/bootstrap-table-semantic.min.css\'')
  }
  if (/bulma.html$/.test(location.pathname)) {
    return data.replace(/btn btn-secondary/g, 'button')
      .replace(/btn btn-danger/g, 'button is-danger')
      .replace(/'bootstrap-table.min.js'/, '\'bootstrap-table.min.js\',\n      \'themes/bulma/bootstrap-table-bulma.min.js\'')
      .replace(/'bootstrap-table.min.css'/, '\'themes/bulma/bootstrap-table-bulma.min.css\'')
  }
  if (/materialize.html$/.test(location.pathname)) {
    return data.replace(/class="select"/g, 'class="input-field"')
      .replace(/btn btn-secondary/g, 'waves-effect waves-light btn')
      .replace(/btn btn-danger/g, 'waves-effect waves-light btn')
      .replace('<i class="fa fa-heart"></i>', '<i class="material-icons">star</i>')
      .replace('<i class="fa fa-trash"></i>', '<i class="material-icons">clear</i>')
      .replace(/'bootstrap-table.min.js'/, '\'bootstrap-table.min.js\',\n      \'themes/materialize/bootstrap-table-materialize.min.js\'')
      .replace(/'bootstrap-table.min.css'/, '\'themes/materialize/bootstrap-table-materialize.min.css\'')
  }
  if (/foundation.html$/.test(location.pathname)) {
    return data.replace(/btn btn-secondary/g, 'button')
      .replace(/btn btn-danger/g, 'alert button')
      .replace(/'bootstrap-table.min.js'/, '\'bootstrap-table.min.js\',\n      \'themes/foundation/bootstrap-table-foundation.min.js\'')
      .replace(/'bootstrap-table.min.css'/, '\'themes/foundation/bootstrap-table-foundation.min.css\'')
  }
  if (/bootstrap-table.html$/.test(location.pathname)) {
    return data
      .replace(/'bootstrap-table.min.js'/, '\'bootstrap-table.min.js\',\n      \'themes/bootstrap-table/bootstrap-table.min.js\'')
      .replace(/'bootstrap-table.min.css'/, '\'themes/bootstrap-table/bootstrap-table.min.css\'')
  }
  return data
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
      success: function (_data) {
        var data = _themeUpdate(_data)

        if (isSource) {
          $('#example').hide().html(data)
          $('.source-pre').show()
          $('#source').text(_beautifySource(data))
          window.hljs.highlightAll()
        } else {
          $('#example').html(data.replace(/ data-toggle="table"/g, ' data-toggle="bootstrap-table"'))
        }
      },
      error: function () {
        parent.location.href = 'index.html'
      }
    })
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
    callback: function () {
      if ($('[data-toggle="bootstrap-table"]').length) {
        $('[data-toggle="bootstrap-table"]').bootstrapTable()
      }
      if (/materialize.html$/.test(location.pathname)) {
        $('select').formSelect()
      }
      if (typeof window.mounted === 'function') {
        window.mounted()
      }
    }
  }, options_)

  if ($('.bd-title span').length) {
    $('.bd-title span').html(options.title)
  }
  if ($('.bd-lead').length) {
    $('.bd-lead').html(marked(options.desc)).find('a').attr('target', '_blank')
  }
  $.each(options.links, function (i, file) {
    _link(file)
  })
  _scripts(options.scripts, options.callback)
}
