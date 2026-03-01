/**
 * version: 1.1.0
 * @author: Brian Huisman
 * @webSite: http://www.greywyvern.com
 * JS functions to allow natural sorting on bootstrap-table columns
 * add data-sorter="alphanum" or data-sorter="numericOnly" to any th
 */

function alphanum (a, b) {
  function chunkify (t) {
    const tz = []
    let y = -1
    let n = 0

    for (let i = 0; i <= t.length; i++) {
      const char = t.charAt(i)
      const charCode = char.charCodeAt(0)
      const m = charCode === 46 || charCode >= 48 && charCode <= 57

      if (m !== n) {
        tz[++y] = ''
        n = m
      }
      tz[y] += char
    }

    return tz
  }

  function stringfy (v) {
    if (typeof v === 'number') {
      v = `${v}`
    }
    if (!v) {
      v = ''
    }
    return v
  }

  const aa = chunkify(stringfy(a))
  const bb = chunkify(stringfy(b))

  for (let x = 0; aa[x] && bb[x]; x++) {
    if (aa[x] !== bb[x]) {
      const c = Number(aa[x])
      const d = Number(bb[x])

      if (c === aa[x] && d === bb[x]) {
        return c - d
      }
      return aa[x] > bb[x] ? 1 : -1

    }
  }
  return aa.length - bb.length
}

function numericOnly (a, b) {
  function stripNonNumber (s) {
    if (typeof s !== 'string') {
      s = String(s)
    }

    // Remove all HTML tags
    s = s.replace(/<[^>]+>/g, '')

    // Extract the first valid number (handles negative numbers)
    const match = s.match(/-?\d+/)

    return match ? parseInt(match[0], 10) : 0
  }

  return stripNonNumber(a) - stripNonNumber(b)
}

// Export for ES modules (Node.js and modern browsers)
export { alphanum, numericOnly }
