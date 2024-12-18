import { redirect } from '@solidjs/router'
import { createMiddleware } from '@solidjs/start/middleware'
import { InternalLink } from '~/config/app'
import { isAuthRestrictedRoute, isRestrictedRoute } from './url'

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
