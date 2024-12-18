import type { Component } from 'solid-js'
import { Portal } from 'solid-js/web'
import { ClientOnly } from '~/components/ClientOnly'
import { SessionWrapper } from '~/features/profile/components/SessionWrapper'
import { UserStartPage } from './UserStartPage'
import { WelcomePage } from './WelcomePage'

export const HomePage: Component = () => (
  <ClientOnly>
    <SessionWrapper
      noDataFallback={<WelcomePage />}
      loadingFallback={<LoadingFallback />}
    >
      {UserStartPage}
    </SessionWrapper>
  </ClientOnly>
)

const LoadingFallback = () => (
  <Portal>
    <div class="animate-show bg-background/10 fixed inset-0 z-1000 flex items-center justify-center backdrop-blur-sm">
      <span class="animate-bounce text-9xl font-bold">🍑</span>
    </div>
  </Portal>
)
