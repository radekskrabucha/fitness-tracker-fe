import { AUTH_RESTRICTED_ROUTES } from '~/config/app'
import { RESTRICTED_ROUTES } from '~/config/app'

export const isActivePath = (
  currentPath: string,
  path: string,
  exact = false
): boolean => {
  const normalizedCurrentPath = currentPath.toLowerCase().replace(/\/$/, '')
  const normalizedPath = path.toLowerCase().replace(/\/$/, '')

  if (normalizedCurrentPath === '/') {
    return normalizedPath === normalizedCurrentPath
  }
  if (exact) {
    return normalizedCurrentPath === normalizedPath
  }

  return normalizedCurrentPath.startsWith(normalizedPath)
}

export const isRestrictedRoute = (path: string) =>
  (RESTRICTED_ROUTES as Array<string>).includes(path)

export const isAuthRestrictedRoute = (path: string) =>
  (AUTH_RESTRICTED_ROUTES as Array<string>).includes(path)
