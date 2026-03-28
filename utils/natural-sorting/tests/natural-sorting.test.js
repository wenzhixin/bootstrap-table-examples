import { describe, expect, it } from 'vitest'
import { numericOnly } from '../src/natural-sorting.js'

describe('natural-sorting', () => {
  describe('numericOnly', () => {
    it('should extract and compare numbers from simple strings', () => {
      expect(numericOnly('123', '456')).toBeLessThan(0)
      expect(numericOnly('456', '123')).toBeGreaterThan(0)
      expect(numericOnly('123', '123')).toBe(0)
    })

    it('should extract numbers from text', () => {
      expect(numericOnly('value: 100', 'value: 200')).toBeLessThan(0)
      expect(numericOnly('price $50', 'price $30')).toBeGreaterThan(0)
    })

    it('should handle HTML tags (Issue #558)', () => {
      // Complex HTML with debug comments
      const complexHTML = `<!-- THEME DEBUG -->
<!-- THEME HOOK: 'field' -->
<!-- FILE NAME SUGGESTIONS:
  ● field--paragraph--default.html.twig
  ● field--default.html.twig
  ● field--paragraph.html.twig
  ✔ field.html.twig
-->
<!-- BEGIN OUTPUT from 'modules/contrib/xxx/templates/field.html.twig' -->
  <div class="field__items">
        <div class="field__item">1</div>
  </div>
<!-- END OUTPUT from 'modules/contrib/fences/templates/field.html.twig' -->`

      expect(numericOnly(complexHTML, '2')).toBeLessThan(0)
      expect(numericOnly(complexHTML, '0')).toBeGreaterThan(0)
    })

    it('should extract the first number from HTML', () => {
      expect(numericOnly('<div>100</div>', '<div>200</div>')).toBeLessThan(0)
      expect(
        numericOnly('<span class="value">50</span>', '<span class="value">10</span>')
      ).toBeGreaterThan(0)
      expect(numericOnly('<td>42</td>', '<td>42</td>')).toBe(0)
    })

    it('should handle negative numbers', () => {
      expect(numericOnly('-100', '100')).toBeLessThan(0)
      expect(numericOnly('100', '-100')).toBeGreaterThan(0)
      expect(numericOnly('-50', '-100')).toBeGreaterThan(0)
    })

    it('should return 0 for strings without numbers', () => {
      expect(numericOnly('abc', 'def')).toBe(0)
      expect(numericOnly('no numbers here!', 'still no numbers')).toBe(0)
    })

    it('should handle empty strings', () => {
      expect(numericOnly('', '100')).toBeLessThan(0)
      expect(numericOnly('100', '')).toBeGreaterThan(0)
      expect(numericOnly('', '')).toBe(0)
    })

    it('should handle null/undefined', () => {
      expect(numericOnly(null, '100')).toBeLessThan(0)
      expect(numericOnly('100', null)).toBeGreaterThan(0)
      expect(numericOnly(null, null)).toBe(0)
    })

    it('should handle non-string input', () => {
      expect(numericOnly(123, 456)).toBeLessThan(0)
      expect(numericOnly(100, '200')).toBeLessThan(0)
      expect(numericOnly('300', 150)).toBeGreaterThan(0)
    })

    it('should extract the first valid number when multiple exist', () => {
      expect(numericOnly('10 and 20', '5 and 30')).toBeGreaterThan(0)
      expect(
        numericOnly('<div>5</div><span>10</span>', '<div>3</div><span>20</span>')
      ).toBeGreaterThan(0)
    })

    it('should handle decimal numbers by extracting integer part', () => {
      expect(numericOnly('123.45', '67.89')).toBeGreaterThan(0)
      expect(numericOnly('12.34', '56.78')).toBeLessThan(0)
    })
  })
})
