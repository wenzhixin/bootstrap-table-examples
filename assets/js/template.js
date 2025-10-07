window._config = {
  isDebug: location.hash.slice(1) === 'is-debug' ||
    ['localhost', '127.0.0.1', 'dev.bootstrap-table.com'].indexOf(location.hostname) > -1,
  cdnUrl: 'https://cdn.jsdelivr.net/npm/bootstrap-table@1.24.2/dist/',
  localUrl: '../bootstrap-table/src/',
  testUrl: '/src/'
}

function _getLink (file) {
  let url = file

  if (!/^http/.test(file)) {
    url = window._config.cdnUrl + file

    if (window._config.isDebug) {
      url = `${(location.href.includes('for-test') ? window._config.testUrl : window._config.localUrl) +
        file.replace(/\.min/, '')}?t=${+new Date()}`
    }
  }
  return `<link rel="stylesheet" href="${url}">`
}

function _getScript (file, isScriptTag) {
  let url = file

  if (!/^http/.test(file)) {
    url = window._config.cdnUrl + file

    if (window._config.isDebug) {
      url = `${(location.href.includes('for-test') ? window._config.testUrl : window._config.localUrl) +
        file.replace(/\.min/, '')}?t=${+new Date()}`
    }
  }
  if (isScriptTag) {
    return `<script src="${url}"></script>`
  }
  return url
}

function _link (file) {
  $('head').append(_getLink(file))
}

function _script (file, callback) {
  const head = document.getElementsByTagName('head')[0]
  const script = document.createElement('script')

  if (window._config.isDebug && !/^http/.test(file)) {
    script.type = 'module'
  }

  script.src = _getScript(file)

  let done = false

  // Attach handlers for all browsers
  script.onload = script.onreadystatechange = function () {
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

function _scripts (scripts, callback) {
  if (!scripts.length) {
    return callback()
  }

  const eachSeries = function (arr, iterator, callback_) {
    let callback = callback_ || function () {}

    if (!arr.length) {
      return callback()
    }
    let completed = 0
    const iterate = function () {
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

function _themeUpdate (_data) {
  const data = _data

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

function _beautifySource (data) {
  let lines = data.split('\n')
  const scriptStart = lines.indexOf('<script>')
  const scriptEnd = lines.indexOf('</script>', scriptStart)
  const strings = lines.slice(scriptStart + 1, scriptEnd)
    .map(s => s.trim())
  const templateStart = lines.indexOf('<template>')
  const templateEnd = lines.indexOf('</template>', scriptStart)
  const templates = lines.slice(templateStart + 1, templateEnd)
    .map(s => s.replace(/^ {2}/, ''))

  /* eslint-disable no-control-regex */
  const obj = eval(`(${strings.join('').replace(/[^\u0000-\u007E]/g, '')
    .replace(/^init\((.*)\)$/, '$1')})`)

  let result = []
  const addEmptyLine = () => {
    if (result[result.length - 1] !== '') {
      result.push('')
    }
  }

  result = result.concat($.map(obj.links, _getLink))
  addEmptyLine()
  result = result.concat($.map(obj.scripts, function (script) {
    return _getScript(script, true)
  }))
  addEmptyLine()
  lines = result.concat(templates, lines.slice(templateEnd + 1))

  const mountedStart = lines.indexOf('  function mounted () {')
  const mountedEnd = lines.indexOf('  }', mountedStart)

  lines[mountedStart] = '  $(function() {'
  lines[mountedEnd] = '  })'

  return lines.join('\n')
}

function getSystemTheme () {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyBootstrapTheme (theme) {
  let actualTheme = theme

  if (theme === 'auto') {
    actualTheme = getSystemTheme()
  }

  $('html').attr('data-bs-theme', actualTheme)
}

$(function () {
  const bootstrapTheme = localStorage.getItem('bootstrap-theme')
  const run = function () {
    const query = {}

    location.search.substring(1).split('&').forEach(function (item) {
      query[item.split('=')[0]] = item.split('=')[1]
    })
    const url = query.url
    const isSource = location.hash.substring(1) === 'view-source'

    delete query.url

    $.ajax({
      type: 'GET',
      url: `${url}?${$.param(query)}`,
      dataType: 'html',
      global: false,
      cache: true, // (warning: setting it to false will cause a timestamp and will call the request twice)
      success (_data) {
        const data = _themeUpdate(_data)

        if (isSource) {
          $('#example').hide().html(data)
          $('.source-pre').show()
          $('#source').text(_beautifySource(data))
          window.hljs.highlightAll()
        } else {
          $('#example').html(data
            .replace('<template>', '').replace('</template>', '')
            .replace(/ data-toggle="table"/g, ' data-toggle="bootstrap-table"'))
        }
      },
      error () {
        parent.location.href = 'index.html'
      }
    })
  }

  window.addEventListener('popstate', run)
  run()

  if (bootstrapTheme) {
    applyBootstrapTheme(bootstrapTheme)
  }

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = localStorage.getItem('bootstrap-theme')

    // If current theme is auto, respond to system theme changes
    if (storedTheme === 'auto') {
      applyBootstrapTheme('auto')
    }
  })
})

window.init = function (options_) {
  const options = $.extend({
    title: '',
    desc: '',
    links: [],
    scripts: [],
    callback () {
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
    $('.bd-lead').html(window.marked(options.desc)).find('a').attr('target', '_blank')
  }
  $.each(options.links, function (i, file) {
    _link(file)
  })
  _scripts(options.scripts, options.callback)
}
