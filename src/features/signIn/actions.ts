import { queryOptions } from '@tanstack/solid-query'
import { authClient } from '~/lib/auth'
import type { SignInRequest } from './types/request'

export const signInWithEmail = (values: SignInRequest) =>
  authClient.signIn.email(values)

export const getSessionQueryOptions = () =>
  queryOptions({
    queryKey: ['session'],
    queryFn: () => authClient.getSession()
  })
