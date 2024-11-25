import { createQuery } from '@tanstack/solid-query'
import type { ComponentProps } from 'solid-js'
import type { Component, JSXElement } from 'solid-js'
import { QueryBoundary } from '~/components/QueryBoundary'
import { getSessionQueryOptions } from '~/features/signIn/actions'
import type { User } from '~/models/user'

type SessionWrapperProps = {
  children: (user: User) => JSXElement
} & Pick<
  ComponentProps<typeof QueryBoundary>,
  'loadingFallback' | 'noDataFallback' | 'errorFallback'
>

export const SessionWrapper: Component<SessionWrapperProps> = props => {
  const getSessionQuery = createQuery(getSessionQueryOptions)

  return (
    <QueryBoundary
      query={getSessionQuery}
      noDataFallback={props.noDataFallback}
      loadingFallback={props.loadingFallback}
      errorFallback={props.errorFallback}
    >
      {({ user }) => props.children(user)}
    </QueryBoundary>
  )
}
