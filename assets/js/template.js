window._config = {
  isDebug: location.hash.slice(1) === 'is-debug' ||
    ['localhost', '127.0.0.1', 'test.examples.wenzhixin.net.cn'].includes(location.hostname),
  cdnUrl: 'https://cdn.jsdelivr.net/npm/bootstrap-table@1.27.2/dist/',
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
  return data.replace(/\r\n/g, '\n').trim()
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

  // Switch highlight.js theme based on Bootstrap theme
  const hljsLightTheme = document.querySelector('link[href*="github.min.css"]:not([data-hljs-theme])')
  const hljsDarkTheme = document.querySelector('link[data-hljs-theme="dark"]')

  if (hljsLightTheme && hljsDarkTheme) {
    if (actualTheme === 'dark') {
      hljsLightTheme.disabled = true
      hljsDarkTheme.disabled = false
    } else {
      hljsLightTheme.disabled = false
      hljsDarkTheme.disabled = true
    }
  }
}

// Data configuration extraction function
function _extractDataConfig (data) {
  const scriptStart = data.indexOf('<script>')
  const scriptEnd = data.indexOf('</script>', scriptStart)

  // Ensure we found a valid <script>...</script> block before attempting to slice/parse
  if (scriptStart === -1 || scriptEnd === -1 || scriptEnd <= scriptStart) {
    return '// Failed to locate configuration <script> block in provided HTML'
  }

  // Skip the '<script>' tag by adding its length
  const strings = data.slice(scriptStart + '<script>'.length, scriptEnd).split('\n')
    .map(s => s.trim())

  try {
    // Parse configuration object from init() call without executing arbitrary code.
    // Support JavaScript object-literal syntax (single quotes, unquoted keys) instead of strict JSON.
    /* eslint-disable no-control-regex */
    const contentStr = strings.join('').replace(/[^\u0000-\u007E]/g, '')
    const initMatch = contentStr.match(/^init\(\s*(\{[\s\S]*\})\s*\);?$/)

    if (!initMatch) {
      throw new Error('Unexpected init() format')
    }

    const cfgStr = initMatch[1]

    // Helpers to extract simple properties from the object-literal string without executing it.
    // Match string values while handling escaped quotes inside the string.
    const extractStringProp = name => {
      // - Group 1: the quote character used (' or ")
      // - Group 2: the string body, allowing escaped characters (e.g. \', \") so they don't terminate the match
      const re = new RegExp(`${name}\\s*:\\s*(['"])((?:\\\\.|(?!\\1).)*)\\1`)
      const m = cfgStr.match(re)

      return m ? m[2] : undefined
    }

    const extractArrayProp = name => {
      const re = new RegExp(`${name}\\s*:\\s*\\[([\\s\\S]*?)\\]`)
      const m = cfgStr.match(re)

      if (!m) {
        return []
      }
      const items = []
      const value = m[1]
      // Match single quoted strings
      const singleRe = /'([^']*)'/g
      let match

      while ((match = singleRe.exec(value)) !== null) {
        items.push(match[1])
      }
      // Match double quoted strings
      const doubleRe = /"([^"]*)"/g

      while ((match = doubleRe.exec(value)) !== null) {
        items.push(match[1])
      }
      return items
    }

    // Helper function to convert local file to CDN URL
    const toCdnUrl = file => {
      if (!file || /^http/.test(file)) {
        return file
      }
      return window._config.cdnUrl + file
    }

    // Extract data-url attribute from table
    const tableMatch = data.match(/data-url="([^"]+)"/)
    const dataUrl = tableMatch ? tableMatch[1] : null

    // Build result object
    const result = {
      config: {
        title: extractStringProp('title'),
        description: extractStringProp('desc'),
        css: extractArrayProp('links').map(toCdnUrl),
        javascript: extractArrayProp('scripts').map(toCdnUrl)
      }
    }

    // Add data-url to config if exists
    if (dataUrl) {
      result.dataUrl = dataUrl
    }

    return JSON.stringify(result, null, 2)
  } catch (e) {
    return `// Failed to parse configuration: ${e.message}`
  }
}

// Async function to load data-url data
function _loadDataUrl (dataUrl, callback) {
  if (!dataUrl) {
    callback(null)
    return
  }

  $.ajax({
    url: dataUrl,
    dataType: 'json',
    success (json) {
      callback(JSON.stringify(json, null, 2))
    },
    error () {
      callback(`// Failed to load data: ${dataUrl}`)
    }
  })
}

$(function () {
  const bootstrapTheme = localStorage.getItem('bootstrap-theme')
  const run = function () {
    const query = {}

    location.search.substring(1).split('&').forEach(function (item) {
      query[item.split('=')[0]] = item.split('=')[1]
    })
    const url = query.url

    delete query.url

    $.ajax({
      type: 'GET',
      url: `${url}?${$.param(query)}`,
      dataType: 'html',
      global: false,
      cache: true, // (warning: setting it to false will cause a timestamp and will call the request twice)
      success (_data) {
        const data = _themeUpdate(_data)
        const viewType = location.search.match(/view-type=([^&]+)/)?.[1] || 'example'

        // Hide all views
        $('#example').hide()
        $('.source-pre').hide()
        $('.data-pre').hide()

        switch (viewType) {
          case 'html': {
            // Parse the original data structure
            let result = ''

            // Extract and expand links from init()
            const linksMatch = data.match(/links\s*:\s*\[([\s\S]*?)\]/)

            if (linksMatch) {
              const links = []
              const singleQuotes = linksMatch[1].matchAll(/'([^']+)'/g)

              for (const match of singleQuotes) {
                links.push(match[1])
              }
              result += `${links.map(file => _getLink(file)).join('\n')}\n\n`
            }

            // Extract and expand scripts from init()
            const scriptsMatch = data.match(/scripts\s*:\s*\[([\s\S]*?)\]/)

            if (scriptsMatch) {
              const scripts = []
              const singleQuotes = scriptsMatch[1].matchAll(/'([^']+)'/g)

              for (const match of singleQuotes) {
                scripts.push(match[1])
              }
              result += `${scripts.map(file => _getScript(file, true)).join('\n')}\n\n`
            }

            // Extract template content and remove base indentation
            const templateStart = data.indexOf('<template>')
            const templateEnd = data.indexOf('</template>')

            if (templateStart !== -1 && templateEnd !== -1) {
              const templateContent = data.substring(templateStart + '<template>'.length, templateEnd)

              // Remove base indentation
              // First, split by newline and find the first non-empty line's indentation
              const rawLines = templateContent.split('\n')

              // Find the indentation of the first non-empty line
              let baseIndent = 0

              for (const line of rawLines) {
                if (line.trim() !== '') {
                  baseIndent = line.match(/^\s*/)[0].length
                  break
                }
              }

              // Now trim and process
              const lines = templateContent.trim().split('\n')

              // Remove the base indentation from all lines
              const dedentedLines = lines.map(line => {
                const trimmed = line.trim()

                if (trimmed === '') return ''
                // Remove baseIndent spaces from the start if present
                if (line.startsWith(' '.repeat(baseIndent))) {
                  return line.substring(baseIndent)
                }
                return line
              })

              result += dedentedLines.join('\n')
            }

            // Find and append inline scripts (after template, not the init script)
            const initScriptEnd = data.indexOf('</script>', data.indexOf('<script>')) + '</script>'.length
            const remainingContent = data.substring(initScriptEnd)

            // Extract inline script (if exists)
            const inlineScriptMatch = remainingContent.match(/<script>([\s\S]*?)<\/script>/)

            if (inlineScriptMatch) {
              result += `\n\n<script>${inlineScriptMatch[1].trim()}</script>`
            }

            // Extract style (if exists)
            const styleMatch = remainingContent.match(/<style>([\s\S]*?)<\/style>/)

            if (styleMatch) {
              result += `\n\n<style>${styleMatch[1].trim()}</style>`
            }

            // Directly display the source without injecting HTML to avoid script execution
            $('.source-pre').show()
            $('#source').text(_beautifySource(result))
            window.hljs.highlightAll()
            break
          }
          case 'data':
            $('.data-pre').show()

            // Extract configuration
            const configText = _extractDataConfig(data)

            $('#data-config').text(configText)

            // Try to load data-url data
            const tableMatch = data.match(/data-url="([^"]+)"/)

            if (tableMatch) {
              $('#data-url-loading').show()
              _loadDataUrl(tableMatch[1], function (jsonText) {
                $('#data-url-loading').hide()
                $('#data-url-content').text(jsonText || '// No data')
                window.hljs.highlightAll()
              })
            } else {
              $('#data-url-content').text('// This example does not use data-url')
            }

            window.hljs.highlightAll()
            break
          default: // example
            $('#example').html(data
              .replace('<template>', '').replace('</template>', '')
              .replace(/ data-toggle="table"/g, ' data-toggle="bootstrap-table"'))
            $('#example').show()
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
  options.links.forEach(function (file) {
    _link(file)
  })
  _scripts(options.scripts, options.callback)
}
