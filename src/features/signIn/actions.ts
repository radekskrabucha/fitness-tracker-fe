import { queryOptions } from '@tanstack/solid-query'
import { authClient } from '~/lib/auth'

export const getSessionQueryOptions = () =>
  queryOptions({
    queryKey: ['session'],
    queryFn: () => authClient.getSession()
  })
