<template>
  <el-menu
          class="sidebar-menu"
          :collapse="isCollapse"
          :default-active="activeIndex"
          background-color="transparent"
          text-color="rgba(255,255,255,0.7)"
          active-text-color="#ffffff"
          router
  >
    <menu-item v-for="(route,index) in routes" :key="route.name" :route="route"></menu-item>
  </el-menu>
</template>

<script>
  import { defineComponent, ref, computed } from 'vue'
  import { useRouteStore } from '@/store/router'
  import MenuItem from '@/layout/components/menu/item.vue'
  import { useRoute } from 'vue-router'
  import { useAppStore } from '@/store/app'
  import { useNarrowLayout } from '@/composables/useNarrowLayout'

  export default defineComponent({
    name: 'Menu',
    components: { MenuItem },
    setup () {
      const routes = ref([])
      const route = useRoute()
      const app = useAppStore()
      const isNarrow = useNarrowLayout()
      const isCollapse = computed(() => isNarrow.value || app.setting.sideIsCollapse)
      const activeIndex = computed(() => route.name)
      routes.value = useRouteStore().routes
      return { routes, activeIndex, isCollapse }
    },
  })
</script>

<style lang="scss" scoped>
.sidebar-menu {
  min-height: 100%;
  padding: 8px 0;

  &:not(.el-menu--collapse) {
    width: var(--sideBarWidth);
  }

  :deep(.el-menu-item) {
    margin: 2px 8px;
    border-radius: 8px;
    height: 42px;
    line-height: 42px;
    font-size: 14px;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.08) !important;
      color: #ffffff !important;
    }

    &.is-active {
      background: rgba(79, 110, 247, 0.25) !important;
      color: #ffffff !important;
      font-weight: 500;
      box-shadow: 0 2px 8px rgba(79, 110, 247, 0.15);
    }
  }

  :deep(.el-sub-menu) {
    margin: 2px 8px;

    .el-sub-menu__title {
      border-radius: 8px;
      height: 42px;
      line-height: 42px;
      font-size: 14px;
      transition: all 0.2s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.08) !important;
        color: #ffffff !important;
      }
    }

    &.is-active .el-sub-menu__title {
      color: #ffffff !important;
      font-weight: 500;
    }

    .el-menu {
      background: rgba(255, 255, 255, 0.03);
      border-radius: 8px;
      margin: 0 4px;
      padding: 4px 0;

      .el-menu-item {
        padding-left: 56px !important;
        height: 38px;
        line-height: 38px;
        font-size: 13px;
      }
    }
  }
}
</style>
