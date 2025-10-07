const isDebug = ['localhost', '127.0.0.1'].indexOf(location.hostname) > -1
const { computed, createApp, onMounted, ref } = window.Vue

const Utils = {
  getUrl () {
    let href = location.hash.substring(1)
    let isViewSource = false

    if (href.includes('view-source')) {
      href = href.replace('#view-source', '').replace('view-source', '')
      isViewSource = true
    }
    return {
      href: href || 'welcome.html',
      isViewSource
    }
  },

  loadUrl (theme, href, isViewSource) {
    let template = 'template'

    if (theme) {
      template += `-${theme}`
    }
    let url = `${template}.html?v=VERSION&url=${href}`

    if (isDebug) {
      url = `${template}.html?t=${+new Date()}&url=${href}`
    }
    if (isViewSource) {
      url = `${template}.html?v=VERSION&view-source&url=${href}#view-source`
    }
    $('iframe').attr('src', url)
  },

  initSearch () {
    window.docsearch({
      container: '.bd-search',
      appId: 'FXDJ517Z8G',
      apiKey: '9b89c4a7048370f4809b0bc77b2564ac',
      indexName: 'bootstrap-table-examples',
      transformItems: items => items.map(item => {
        // Replace the production domain with the current origin
        if (item.url && item.url.startsWith('https://examples.bootstrap-table.com')) {
          item.url = item.url.replace('https://examples.bootstrap-table.com', window.location.origin)
        }
        return item
      })
    })
  },

  autoScrollNavigation () {
    const $el = $('#bd-docs-nav li a.active')

    $('#bd-docs-nav').scrollTop(0)
    setTimeout(() => {
      if ($el.length && $el.offset().top > $(window).height() / 2) {
        $('#bd-docs-nav').scrollTop($el.offset().top - $(window).height() / 2)
      }
    }, 100)
  },

  initViewSource () {
    const isSource = /view-source$/.test(location.hash)

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
      } else if (location.hash.indexOf('view-source') === -1) {
        location.hash += '#view-source'
      }
    })

    $('.view-online').attr('href', `https://live.bootstrap-table.com/example/${
      location.hash.slice(1).split('#')[0] || 'welcome.html'}`)
  }
}

const setup = () => {
  const {
    navItems,
    bootstrapThemes,
    icons,
    themes,
    menus
  } = window.Config || {}

  const theme = ref('')
  const bootstrapTheme = ref('')
  const currentHref = ref('')

  const themeText = computed(() => themes.find(it => it.value === theme.value)?.label)
  const bootstrapThemeIcon = computed(() => bootstrapThemes.find(it => it.value === bootstrapTheme.value)?.icon)
  const displayMenus = computed(() => menus.map(group => ({
    ...group,
    children: group.children.filter(item => !item.show || item.show.includes(theme.value))
  })))

  const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

  const setBootstrapTheme = value => {
    localStorage.setItem('bootstrap-theme', value)
    location.reload()
  }

  const applyBootstrapTheme = value => {
    let actualTheme = value

    if (value === 'auto') {
      actualTheme = getSystemTheme()
    }

    $('html').attr('data-bs-theme', actualTheme)
  }

  const initThemes = () => {
    const t = location.search.slice(1)
    const bt = localStorage.getItem('bootstrap-theme') || 'light'

    if (themes.map(it => it.value).includes(t)) {
      theme.value = t
    }

    if (theme.value) {
      localStorage.removeItem('bootstrap-theme')
    } else {
      if (bootstrapThemes.map(it => it.value).includes(bt)) {
        bootstrapTheme.value = bt
      }

      applyBootstrapTheme(bootstrapTheme.value)
    }

    $('[data-show]').each(function () {
      $(this).toggle($(this).data('show').split(',').includes(theme.value))
    })
  }
  const initData = () => {
    const { href, isViewSource } = Utils.getUrl()

    Utils.loadUrl(theme.value, href, isViewSource)

    currentHref.value = `#${href}`

    Utils.initViewSource()
  }
  const initViews = () => {
    $('[data-bs-toggle="tooltip"]').tooltip()

    $(window).hashchange(function () {
      initData()
    })

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      const storedTheme = localStorage.getItem('bootstrap-theme')

      // If current theme is auto, respond to system theme changes
      if (storedTheme === 'auto') {
        location.reload()
      }
    })

    // Close offcanvas when clicking menu items on mobile
    $('.bd-links-link').on('click', function () {
      // Check if it's mobile (offcanvas visible)
      const offcanvasElement = document.getElementById('bdSidebar')

      if (window.getComputedStyle(offcanvasElement).visibility !== 'hidden') {
        const offcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasElement)

        if (offcanvas) {
          offcanvas.hide()
        }
      }
    })

    initData()
    Utils.initSearch()
    Utils.autoScrollNavigation()
  }

  onMounted(() => {
    initThemes()
    initViews()
  })

  return {
    navItems,
    themes,
    bootstrapThemes,
    icons,

    // ref
    theme,
    bootstrapTheme,
    currentHref,

    // computed
    themeText,
    bootstrapThemeIcon,
    displayMenus,

    // methods
    setBootstrapTheme
  }
}

function initApp () {
  const app = createApp({
    setup
  })

  app.mount('#app')
  $('#app').removeClass('d-none')
}

$(function () {
  initApp()
})
