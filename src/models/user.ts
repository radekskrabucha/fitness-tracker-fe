import type { authClient } from '~/lib/auth'

export type User = NonNullable<
  Awaited<ReturnType<typeof authClient.getSession>>
>['user']
