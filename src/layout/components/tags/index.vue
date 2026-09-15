<template>
  <div class="tags-nav">
    <div
      v-for="(t, i) in tags"
      :key="t.name"
      class="nav-tag"
      :class="{ 'nav-tag--active': t.active }"
      @click="toTag(t)"
    >
      <span class="nav-tag-text">{{ T(t.title) }}</span>
      <el-icon v-if="t.closeable" :size="12" class="nav-tag-close" @click.stop="close(t)">
        <Close />
      </el-icon>
    </div>
  </div>
</template>

<script>
  import { defineComponent, ref, onMounted, watch } from 'vue'
  import { useTagsStore } from '@/store/tags'
  import { useRoute, useRouter } from 'vue-router'
  import { T } from '@/utils/i18n'
  import { Close } from '@element-plus/icons'

  export default defineComponent({
    name: 'Index',
    components: { Close },
    setup () {
      const tags = ref([])
      const tagsStore = useTagsStore()
      const route = useRoute()
      const router = useRouter()
      tags.value = tagsStore.tags

      const addTag = (route) => {
        if (!route.meta?.hide && route.name) {
          tagsStore.addTag(route)
        }
      }
      const close = (tag) => {
        tagsStore.removeTag(tag)
        if (tag.active) {
          toLastTag()
        }
      }
      const toLastTag = () => {
        if (tags.value.length) {
          router.push({ name: tags.value[tags.value.length - 1].name })
        }
      }
      const init = () => {
        if (!tagsStore.tags.length) {
          tagsStore.initTags()
        }
        addTag(route)
      }

      const toTag = (tag) => {
        if (tag.name !== route.name) {
          router.push({ name: tag.name })
        }
      }

      onMounted(init)
      watch(route, (val) => {
        addTag(val)
      })
      return {
        tags,
        addTag,
        close,
        toLastTag,
        toTag,
        T,
      }
    },
  })
</script>

<style lang="scss" scoped>
.tags-nav {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  height: 100%;
}

.nav-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 13px;
  color: #86909c;
  cursor: pointer;
  user-select: none;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: #f2f3f5;
  }

  &.nav-tag--active {
    background: #e8eeff;
    color: #4f6ef7;
    font-weight: 500;
  }

  .nav-tag-close {
    cursor: pointer;
    border-radius: 50%;
    transition: background 0.2s;

    &:hover {
      background: rgba(0, 0, 0, 0.08);
    }
  }
}
</style>
