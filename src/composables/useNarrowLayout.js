import { onBeforeUnmount, onMounted, ref } from 'vue'

const NARROW_LAYOUT_QUERY = '(max-width: 900px)'

export const useNarrowLayout = () => {
  const isNarrow = ref(false)
  let mediaQuery

  const sync = (event) => {
    isNarrow.value = event.matches
  }

  onMounted(() => {
    mediaQuery = window.matchMedia(NARROW_LAYOUT_QUERY)
    isNarrow.value = mediaQuery.matches
    mediaQuery.addEventListener('change', sync)
  })

  onBeforeUnmount(() => {
    mediaQuery?.removeEventListener('change', sync)
  })

  return isNarrow
}
