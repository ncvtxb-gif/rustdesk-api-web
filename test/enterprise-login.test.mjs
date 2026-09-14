import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

import { selectFeishuLoginOptions } from '../src/views/login/enterprise-login.mjs'

test('only exposes Feishu login providers', () => {
  assert.deepEqual(
    selectFeishuLoginOptions(['WebAuth', '飞书登录', 'GitHub', 'Feishu SSO']),
    ['飞书登录', 'Feishu SSO'],
  )
})

test('enterprise login page contains no password login controls or automatic redirect', async () => {
  const source = await readFile(new URL('../src/views/login/login.vue', import.meta.url), 'utf8')

  for (const forbidden of [
    '<el-form',
    "T('Username')",
    "T('Password')",
    "T('Captcha')",
    "T('Register')",
    'res.data.auto_oidc',
  ]) {
    assert.equal(source.includes(forbidden), false, `unexpected login control: ${forbidden}`)
  }
  assert.equal(source.includes('handleOIDCLogin(option.name)'), true)
})
