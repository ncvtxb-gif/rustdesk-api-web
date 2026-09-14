export function normalizePeerColumns(columns) {
  const normalized = [...columns]
  const lastOnlineIndex = normalized.findIndex(column => column.name === 'last_online_time')
  const versionIndex = normalized.findIndex(column => column.name === 'version')

  if (lastOnlineIndex === -1 || versionIndex === -1 || lastOnlineIndex === versionIndex + 1) {
    return normalized
  }

  const [lastOnlineColumn] = normalized.splice(lastOnlineIndex, 1)
  const normalizedVersionIndex = normalized.findIndex(column => column.name === 'version')
  normalized.splice(normalizedVersionIndex + 1, 0, lastOnlineColumn)
  return normalized
}
