import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const source = await readFile(new URL('../src/views/address_book/index.vue', import.meta.url), 'utf8')

test('administrator address book omits retired alias, hash and web-client controls', () => {
  assert.doesNotMatch(source, /prop="alias"/)
  assert.doesNotMatch(source, /prop="hash"/)
  assert.doesNotMatch(source, />Web Client</)
  assert.doesNotMatch(source, /toWebClientLink/)
})
