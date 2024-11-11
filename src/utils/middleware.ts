import { redirect } from '@solidjs/router'
import { createMiddleware } from '@solidjs/start/middleware'
import {
  InternalLink,
  AUTH_RESTRICTED_ROUTES,
  RESTRICTED_ROUTES
} from '~/config/app'

export default createMiddleware({
  onRequest: [
    event => {
      const authCookie = event.request.headers.get('cookie')
      const path = new URL(event.request.url).pathname
      const isProtectedRoute = isRestrictedRoute(path)

      if (isProtectedRoute && !authCookie) {
        return redirect(InternalLink.signIn)
      }

      const isAuthProtectedRoute = isAuthRestrictedRoute(path)

      if (isAuthProtectedRoute && authCookie) {
        return redirect(InternalLink.home)
      }
    }
  ]
})

const isRestrictedRoute = (path: string) =>
  (RESTRICTED_ROUTES as Array<string>).includes(path)

const isAuthRestrictedRoute = (path: string) =>
  (AUTH_RESTRICTED_ROUTES as Array<string>).includes(path)
