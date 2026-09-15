<template>
  <el-icon v-if="!isNarrow" class="header-toggle" @click="expandOrFoldSlider" :size="20">
    <el-icon-expand v-if="setting.sideIsCollapse"></el-icon-expand>
    <el-icon-fold v-else></el-icon-fold>
  </el-icon>
  <div class="header-breadcrumb">
    <span class="header-breadcrumb-text">{{ setting.title }}</span>
  </div>
  <div class="header-spacer"></div>
  <Setting></Setting>
</template>

<script>
  import { defineComponent, computed } from 'vue'
  import Setting from '@/layout/components/setting/index.vue'
  import { useAppStore } from '@/store/app'
  import { useNarrowLayout } from '@/composables/useNarrowLayout'

  export default defineComponent({
    name: 'LayerHeader',
    components: { Setting },
    setup () {
      const appStore = useAppStore()
      const setting = computed(() => appStore.setting)
      const isNarrow = useNarrowLayout()
      const expandOrFoldSlider = () => { appStore.sideCollapse() }
      return { setting, isNarrow, expandOrFoldSlider }
    },
  })
</script>

<style scoped lang="scss">
.header-toggle {
  cursor: pointer;
  color: #4e5969;
  transition: color 0.2s;
  flex-shrink: 0;
  &:hover { color: #4f6ef7; }
}
.header-breadcrumb {
  display: flex;
  align-items: center;
  margin-left: 12px;
}
.header-breadcrumb-text {
  font-size: 15px;
  font-weight: 500;
  color: #1d2129;
}
.header-spacer {
  flex: 1;
}
</style>
