import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const readSource = relativePath => readFile(new URL(`../${relativePath}`, import.meta.url), 'utf8')

test('admin shell exposes no dark-mode control or dark theme import', async () => {
  const [mainSource, settingSource, styleSource] = await Promise.all([
    readSource('src/main.js'),
    readSource('src/layout/components/setting/index.vue'),
    readSource('src/styles/style.scss'),
  ])

  assert.equal(mainSource.includes('theme-chalk/dark/css-vars.css'), false)
  assert.equal(settingSource.includes('useDark'), false)
  assert.equal(settingSource.includes('v-model="isDark"'), false)
  assert.equal(styleSource.includes('html.dark'), false)
})

test('admin shell keeps the shared nickname display rule', async () => {
  const settingSource = await readSource('src/layout/components/setting/index.vue')

  assert.equal(settingSource.includes("getUserDisplayName(user)"), true)
  assert.equal(settingSource.includes("@/utils/user-display-name.mjs"), true)
})

test('refreshed layout offsets the fixed sidebar and keeps the light visual shell', async () => {
  const [layoutSource, asideSource, headerSource, menuSource, responsiveSource, loginSource, peerSource] = await Promise.all([
    readSource('src/layout/index.vue'),
    readSource('src/layout/components/aside.vue'),
    readSource('src/layout/components/header.vue'),
    readSource('src/layout/components/menu/index.vue'),
    readSource('src/composables/useNarrowLayout.js'),
    readSource('src/views/login/login.vue'),
    readSource('src/views/peer/index.vue'),
  ])

  assert.equal(layoutSource.includes(':style="{ marginLeft: leftWidth }"'), true)
  assert.equal(layoutSource.includes('@media (max-width: 900px)'), true)
  assert.equal(layoutSource.includes('isNarrow.value || appStore.setting.sideIsCollapse'), true)
  assert.equal(asideSource.includes(':src="setting.logo"'), true)
  assert.equal(asideSource.includes('isNarrow.value || appStore.setting.sideIsCollapse'), true)
  assert.equal(headerSource.includes('{{ setting.title }}'), true)
  assert.equal(menuSource.includes(':deep(.el-sub-menu)'), true)
  assert.equal(menuSource.includes('isNarrow.value || app.setting.sideIsCollapse'), true)
  assert.equal(responsiveSource.includes("'(max-width: 900px)'"), true)
  assert.equal(loginSource.includes('class="login-wrapper"'), true)
  assert.equal(peerSource.includes('class="peer-page"'), true)
  assert.equal(peerSource.includes('Web Client'), false)
  assert.equal(peerSource.includes("c.name==='group_id'"), false)
  assert.equal(peerSource.includes("c.name==='uuid'"), false)
  assert.equal(peerSource.includes("c.name==='alias'"), false)
})
