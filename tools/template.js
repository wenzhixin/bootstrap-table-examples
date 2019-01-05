const fs = require('fs')
const getopts = require('getopts')

const ISSUE_URL = 'https://github.com/wenzhixin/bootstrap-table/issues/'
const CLIENT_URL = 'json/data1.json'
const SERVER_URL = 'https://examples.wenzhixin.net.cn/examples/bootstrap_table/data'

const options = getopts(process.argv.slice(2), {
  alias: {
    h: 'help',
    i: 'issue',
    o: 'output',
    t: 'title',
    d: 'desc',
    s: 'server'
  }
})

function showHelp() {
  const baseCmd = 'node tools/template.js'

  console.info(`usage:
    -h, --help      show help info
    -o, --output    set the example output
    -t, --title     set the example title
    -d, --desc      set the example desc
    -i, --issue     set the example with an issue number
    -s, --server    use server side pagination
  `)

  console.info(`example:
    ${baseCmd} -i 1234 -d 'desc'
    ${baseCmd} -t 'title' -d 'desc' -o 'options/example'
  `)
}

function run() {
  if (options.help || Object.keys(options).length === 1) {
    return showHelp()
  }
  if (!options.output && !options.issue) {
    return console.error('You need to input -o, --output argv or -i, --issue argv')
  }

  if (options.issue) {
    options.title = `Issue #${options.issue}`
    options.desc = `${options.desc}(<a href="${ISSUE_URL}${options.issue}" target="_blank">#${options.issue}</a>).`
    options.output = `issues/${options.issue}`
  }

  let url = CLIENT_URL
  let attrs = ''
  if (options.server) {
    url = SERVER_URL
    attrs = '\n  data-pagination="true"\n  data-side-pagination="server"'
  }

  let content = fs.readFileSync(`${__dirname}/example.tpl`).toString()
  content = content.replace(/@title@/, options.title || '')
    .replace(/@desc@/, options.desc || '')
    .replace(/@url@/, url)
    .replace(/@attrs@/, attrs)

  fs.writeFileSync(`${__dirname}/../${options.output}.html`, content)
  console.info(`${options.output}.html`)
}

run()
