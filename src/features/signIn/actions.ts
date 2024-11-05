import { queryOptions } from '@tanstack/solid-query'
import { authClient } from '~/lib/auth'

type SignInRequest = {
  email: string
  password: string
}

export const signInWithEmail = (values: SignInRequest) =>
  authClient.signIn.email(values)

export const getSessionQueryOptions = () =>
  queryOptions({
    queryKey: ['session'],
    queryFn: () => authClient.getSession()
  })
