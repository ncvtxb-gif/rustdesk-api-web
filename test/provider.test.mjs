import test from 'node:test'
import assert from 'node:assert/strict'
import {
  oauthProviderTypes,
  normalizeProviderForm,
  providerScopesPlaceholder,
} from '../src/views/oauth/provider.mjs'

test('offers Feishu self-built app OAuth', () => {
  assert.ok(oauthProviderTypes.some(x => x.value === 'feishu'))
})

test('normalizes Feishu provider fields', () => {
  const form = normalizeProviderForm({ oauth_type: 'feishu', op: '', issuer: 'old', pkce_enable: true })
  assert.equal(form.op, 'company-feishu-app')
  assert.equal(form.issuer, '')
  assert.equal(form.pkce_enable, false)
})

test('does not advertise OIDC default scopes for Feishu', () => {
  assert.equal(providerScopesPlaceholder('feishu', 'Optional, default is'), '')
  assert.equal(
    providerScopesPlaceholder('oidc', 'Optional, default is'),
    "Optional, default is 'openid,profile,email'",
  )
})
