import { createQuery } from '@tanstack/solid-query'
import type { Component, JSXElement } from 'solid-js'
import { QueryBoundary } from '~/components/QueryBoundary'
import { getSessionQueryOptions } from '~/features/signIn/actions'
import type { User } from '~/models/user'

type SessionWrapperProps = {
  children: (user: User) => JSXElement
}

export const SessionWrapper: Component<SessionWrapperProps> = props => {
  const getSessionQuery = createQuery(getSessionQueryOptions)

  return (
    <QueryBoundary query={getSessionQuery}>
      {({ user }) => props.children(user)}
    </QueryBoundary>
  )
}
