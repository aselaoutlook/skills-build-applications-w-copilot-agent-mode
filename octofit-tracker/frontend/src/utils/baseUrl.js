const envCodespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

const inferCodespaceNameFromHostname = () => {
  if (typeof window === 'undefined') return ''

  const match = window.location.hostname.match(/^(.*)-\d+\.app\.github\.dev$/)
  return match?.[1]?.trim() ?? ''
}

const inferredCodespaceName = envCodespaceName ? '' : inferCodespaceNameFromHostname()
const resolvedCodespaceName = envCodespaceName || inferredCodespaceName

export const apiBaseUrl = resolvedCodespaceName
  ? `https://${resolvedCodespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export const apiBaseSource = envCodespaceName
  ? 'env'
  : inferredCodespaceName
    ? 'hostname'
    : 'localhost'

export const apiBaseNotice = envCodespaceName
  ? null
  : inferredCodespaceName
    ? 'VITE_CODESPACE_NAME is unset. Using backend URL inferred from the current Codespaces hostname.'
    : 'VITE_CODESPACE_NAME is unset. Falling back to http://localhost:8000/api. Define VITE_CODESPACE_NAME in .env.local for Codespaces.'
