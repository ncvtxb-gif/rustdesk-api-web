import test from 'node:test'
import assert from 'node:assert/strict'
import { normalizePeerColumns } from '../src/views/peer/columns.mjs'

test('moves last online time immediately after version for saved column layouts', () => {
  const savedColumns = [
    { name: 'id', visible: true },
    { name: 'last_online_time', visible: false },
    { name: 'hostname', visible: true },
    { name: 'version', visible: true },
    { name: 'created_at', visible: true },
  ]

  const normalized = normalizePeerColumns(savedColumns)

  assert.deepEqual(normalized.map(column => column.name), [
    'id',
    'hostname',
    'version',
    'last_online_time',
    'created_at',
  ])
  assert.equal(normalized[3].visible, false)
})

test('leaves a layout unchanged when version or last online time is missing', () => {
  const savedColumns = [
    { name: 'id', visible: true },
    { name: 'last_online_time', visible: true },
  ]

  assert.deepEqual(normalizePeerColumns(savedColumns), savedColumns)
})

test('removes enterprise-hidden columns from saved column layouts', () => {
  const savedColumns = [
    { name: 'id', visible: true },
    { name: 'group_id', visible: true },
    { name: 'uuid', visible: false },
    { name: 'version', visible: true },
    { name: 'last_online_time', visible: true },
    { name: 'alias', visible: true },
    { name: 'created_at', visible: true },
  ]

  assert.deepEqual(normalizePeerColumns(savedColumns).map(column => column.name), [
    'id',
    'version',
    'last_online_time',
    'created_at',
  ])
})
