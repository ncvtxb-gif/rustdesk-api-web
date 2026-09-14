export function getUserDisplayName(user) {
  return user?.nickname?.trim() || user?.username?.trim() || ''
}
