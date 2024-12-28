import { createQuery } from '@tanstack/solid-query'
import type { ComponentProps } from 'solid-js'
import type { Component, JSXElement } from 'solid-js'
import { Portal } from 'solid-js/web'
import { Card } from '~/components/Card'
import { DefaultErrorFallback, QueryBoundary } from '~/components/QueryBoundary'
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
      loadingFallback={props.loadingFallback || <LoadingFallback />}
      errorFallback={props.errorFallback}
    >
      {({ user }) => props.children(user)}
    </QueryBoundary>
  )
}

const LoadingFallback = () => (
  <Portal>
    <div class="animate-show bg-background/10 fixed inset-0 z-1000 flex items-center justify-center backdrop-blur-sm">
      <span class="animate-bounce text-9xl font-bold">🍑</span>
    </div>
  </Portal>
)

type ErrorFallbackProps = ComponentProps<typeof DefaultErrorFallback>

export const ErrorCardFallback: Component<ErrorFallbackProps> = props => (
  <section class="layout-section">
    <Card>
      <DefaultErrorFallback {...props} />
    </Card>
  </section>
)
