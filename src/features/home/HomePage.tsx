import type { Component } from 'solid-js'
import { ClientOnly } from '~/components/ClientOnly'
import { SessionWrapper } from '~/features/profile/components/SessionWrapper'
import { UserStartPage } from './UserStartPage'
import { WelcomePage } from './WelcomePage'

export const HomePage: Component = () => (
  <ClientOnly>
    <SessionWrapper noDataFallback={<WelcomePage />}>
      {UserStartPage}
    </SessionWrapper>
  </ClientOnly>
)
