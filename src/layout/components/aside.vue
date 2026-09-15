<template>
  <div class="sidebar-container">
    <div class="sidebar-logo" v-show="!isCollapse">
      <img :src="setting.logo" alt="logo" class="sidebar-logo-img"/>
      <span class="sidebar-logo-text">{{ setting.title }}</span>
    </div>
    <div class="sidebar-logo sidebar-logo--collapsed" v-show="isCollapse">
      <img :src="setting.logo" alt="logo" class="sidebar-logo-img"/>
    </div>
    <el-scrollbar class="sidebar-menu-wrapper">
      <menus></menus>
    </el-scrollbar>
  </div>
</template>
<script>
  import Menus from '@/layout/components/menu/index.vue'
  import { defineComponent, computed } from 'vue'
  import { useAppStore } from '@/store/app'
  import { useNarrowLayout } from '@/composables/useNarrowLayout'

  export default defineComponent({
    name: 'GAside',
    components: { Menus },
    setup () {
      const appStore = useAppStore()
      const setting = computed(() => appStore.setting)
      const isNarrow = useNarrowLayout()
      const isCollapse = computed(() => isNarrow.value || appStore.setting.sideIsCollapse)
      return { setting, isCollapse }
    },
  })
</script>

<style scoped lang="scss">
.sidebar-container {
  height: 100vh;
  height: 100dvh;
  background: linear-gradient(180deg, #1b1c2e 0%, #1e2040 100%);
  display: flex;
  flex-direction: column;
}

.sidebar-logo {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  gap: 10px;
  height: 52px;
  box-sizing: border-box;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  &--collapsed {
    justify-content: center;
    padding: 16px 0;
  }
}

.sidebar-logo-img {
  width: 30px;
  height: 30px;
  border-radius: 6px;
  flex-shrink: 0;
}

.sidebar-logo-text {
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-menu-wrapper {
  flex: 1;
  overflow-y: auto;
}
</style>
