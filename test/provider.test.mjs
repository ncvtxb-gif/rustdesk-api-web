import test from 'node:test'
import assert from 'node:assert/strict'
import { oauthProviderTypes, normalizeProviderForm } from '../src/views/oauth/provider.mjs'

test('offers Feishu self-built app OAuth', () => {
  assert.ok(oauthProviderTypes.some(x => x.value === 'feishu'))
})

test('normalizes Feishu provider fields', () => {
  const form = normalizeProviderForm({ oauth_type: 'feishu', op: '', issuer: 'old', pkce_enable: true })
  assert.equal(form.op, 'company-feishu-app')
  assert.equal(form.issuer, '')
  assert.equal(form.pkce_enable, false)
})
