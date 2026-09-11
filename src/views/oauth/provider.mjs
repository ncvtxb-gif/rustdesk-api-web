export const oauthProviderTypes = [
  { value: 'github', label: 'GitHub' },
  { value: 'google', label: 'Google' },
  { value: 'linuxdo', label: 'LinuxDo' },
  { value: 'oidc', label: 'OIDC' },
  { value: 'feishu', label: '飞书自建应用' },
]

export function normalizeProviderForm(form) {
  const normalized = { ...form }
  if (normalized.oauth_type === 'feishu') {
    normalized.op = normalized.op || 'company-feishu-app'
    normalized.issuer = ''
    normalized.pkce_enable = false
  }
  return normalized
}
