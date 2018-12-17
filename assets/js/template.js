$(function () {
  var url = location.search.replace(/\?v=\d+&/, '')
  var isSource = location.hash.slice(1) === 'view-source'
  $.ajax({
    type: 'GET',
    url: url + '?v=3', // todo: add version to solve cache problem
    dataType: 'html',
    global: false,
    cache: true, // (warning: setting it to false will cause a timestamp and will call the request twice)
    success: function (data) {
      if (isSource) {
        $('#example').hide().html(data)
        $('.source-pre').show()
        $('#source').text(data.replace(/( +function mounted)/,
          '  // Here the mounted function is same as $(function() {})\n$1'))
        window.hljs.initHighlightingOnLoad()
      } else {
        $('#example').html(data)
      }
    }
  })

  if (isSource) {
    $('#viewExample').attr('href', 'index.html#' + url).show().tooltip({
      title: 'View Example',
      placement: 'right'
    })
  } else {
    $('#viewSource').attr('href', 'index.html?view-source#' + url).show().tooltip({
      title: 'View Source',
      placement: 'right'
    })
  }
})

function _link(file) {
  var url = file
  if (!/^http/.test(file)) {
    url = 'https://unpkg.com/bootstrap-table/dist/' + file
  }
  $('head').append('<link href="' + url + '" rel="stylesheet"></link>')
}

function _script(file, callback) {
  var head = document.getElementsByTagName('head')[0]
  var script = document.createElement('script')
  var url = file
  if (!/^http/.test(file)) {
    url = 'https://unpkg.com/bootstrap-table/dist/' + file
  }
  script.src = url

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
