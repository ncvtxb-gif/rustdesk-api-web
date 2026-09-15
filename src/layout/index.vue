<template>
  <el-config-provider :locale="appStore.setting.locale.value">
    <el-container :style="{'--sideBarWidth': sideBarWidth}">
      <!-- Sidebar -->
      <el-aside :width="leftWidth" class="app-sidebar">
        <g-aside></g-aside>
      </el-aside>

      <!-- Main Content -->
      <el-container class="app-body" :style="{ marginLeft: leftWidth }">
        <!-- Header -->
        <el-header class="app-header">
          <g-header></g-header>
        </el-header>

        <!-- Tag Tabs -->
        <div class="header-tags">
          <tags></tags>
        </div>

        <!-- Content Area -->
        <el-main class="app-main">
          <router-view v-slot="{ Component }">
            <transition mode="out-in" name="el-fade-in-linear">
              <keep-alive :include="cachedTags">
                <component :is="Component"/>
              </keep-alive>
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-config-provider>
</template>

<script setup>
  import { useAppStore } from '@/store/app'
  import { useTagsStore } from '@/store/tags'
  import { ref, computed } from 'vue'
  import Tags from '@/layout/components/tags/index.vue'
  import GAside from '@/layout/components/aside.vue'
  import GHeader from '@/layout/components/header.vue'
  import { useNarrowLayout } from '@/composables/useNarrowLayout'

  const appStore = useAppStore()
  const tagStore = useTagsStore()
  const isNarrow = useNarrowLayout()
  const sideBarWidth = computed(() => appStore.setting.locale.sideBarWidth)
  const leftWidth = computed(() => isNarrow.value || appStore.setting.sideIsCollapse ? '64px' : 'var(--sideBarWidth)')

  const cachedTags = ref([])
  cachedTags.value = tagStore.cached
</script>

<style lang="scss" scoped>
.app-body {
  min-height: 100vh;
  background: var(--el-bg-color-page);
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.app-header {
  background: #ffffff;
  color: #1d2129;
  display: flex;
  align-items: center;
  height: 52px;
  padding: 0 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-tags {
  height: auto;
  background: #ffffff;
  border-bottom: 1px solid #e5e6eb;
  display: flex;
  align-items: center;
  padding: 6px 12px;
  gap: 6px;
  flex-wrap: wrap;
}

.app-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 101;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.app-main {
  padding: 20px;
}

@media (max-width: 900px) {
  .app-sidebar {
    width: 64px !important;
  }

  .app-body {
    margin-left: 64px !important;
    min-width: 0;
  }

  .app-main {
    padding: 12px;
  }

  .app-header {
    padding: 0 12px;
  }
}
</style>
