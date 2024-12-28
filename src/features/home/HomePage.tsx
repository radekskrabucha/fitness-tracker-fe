import type { Component } from 'solid-js'
import { ClientOnly } from '~/components/ClientOnly'
import {
  ErrorCardFallback,
  SessionWrapper
} from '~/features/profile/components/SessionWrapper'
import { UserStartPage } from './UserStartPage'
import { WelcomePage } from './WelcomePage'

export const HomePage: Component = () => (
  <ClientOnly>
    <SessionWrapper
      noDataFallback={<WelcomePage />}
      errorFallback={ErrorCardFallback}
    >
      {UserStartPage}
    </SessionWrapper>
  </ClientOnly>
)
