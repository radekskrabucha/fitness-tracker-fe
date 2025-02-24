import { Toast } from '@kobalte/core/toast'
import { MetaProvider } from '@solidjs/meta'
import { ErrorBoundary, Suspense, type FlowComponent } from 'solid-js'
import { SpriteIconsLink } from '~/components/Icon'
import { SEO } from '~/components/Seo'
import { defaultSeoTags } from '~/config/app'
import { Background } from './components/Background'
import { ErrorBoundary as ErrorBoundaryFallback } from './components/ErrorBoundary'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

export const MainLayout: FlowComponent = props => (
  <ErrorBoundary
    fallback={(error, onReset) => (
      <ErrorBoundaryFallback
        error={error}
        onReset={onReset}
      />
    )}
  >
    <MetaProvider>
      <SpriteIconsLink />
      <SEO
        title={undefined}
        description={defaultSeoTags.description}
        siteUrl={defaultSeoTags.siteUrl}
        imageUrl="/images/shared/og-image.jpg"
      />
      <Background />
      <Header />
      <main class="layout-container isolate flex-1 overflow-x-hidden">
        <Suspense>
          <ErrorBoundary
            fallback={(error, onReset) => (
              <ErrorBoundaryFallback
                error={error}
                onReset={onReset}
              />
            )}
          >
            {props.children}
          </ErrorBoundary>
        </Suspense>
      </main>
      <Footer />
      <Toast.Region class="z-9999">
        <Toast.List class="fixed right-0 bottom-0 m-0 flex w-md max-w-full list-none flex-col gap-4 p-6 outline-none" />
      </Toast.Region>
    </MetaProvider>
  </ErrorBoundary>
)
