export function selectFeishuLoginOptions(options) {
  if (!Array.isArray(options)) return []

  return options.filter((option) => {
    if (typeof option !== 'string') return false
    const normalized = option.trim().toLowerCase()
    return normalized.includes('飞书') || normalized.includes('feishu') || normalized.includes('lark')
  })
}
