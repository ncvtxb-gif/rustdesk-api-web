import test from 'node:test'
import assert from 'node:assert/strict'

import { getUserDisplayName } from '../src/utils/user-display-name.mjs'

test('prefers nickname over an internal open_id username', () => {
  assert.equal(
    getUserDisplayName({
      nickname: '钟俊歌',
      username: 'ou_3bbbd2bbed3dc1ebb182471971285bad',
    }),
    '钟俊歌',
  )
})

test('falls back to username when nickname is empty', () => {
  assert.equal(getUserDisplayName({ nickname: '', username: 'admin' }), 'admin')
})
