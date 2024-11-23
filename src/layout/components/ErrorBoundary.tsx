import type { Component } from 'solid-js'
import { Button, buttonVariants } from '~/components/Button'
import { Card } from '~/components/Card'
import { Link } from '~/components/Link'
import { InternalLink } from '~/config/app'

type ErrorBoundaryProps = {
  onReset: VoidFunction
  error: Error
}

export const ErrorBoundary: Component<ErrorBoundaryProps> = props => (
  <section class="layout-section flex-1 items-center text-center">
    <Card class="items-center gap-6">
      <h2 class="text-3xl font-bold">Uh oh, something went sideways! 🚧</h2>
      <p class="text-lg">
        It appears an unexpected error has occurred. Don't worry, our engineers
        are already on it. ️
      </p>
      <div class="flex flex-col gap-4">
        <Button
          variant="primary"
          onClick={props.onReset}
        >
          Try again
        </Button>
        <Link
          class={buttonVariants({ variant: 'outline' })}
          href={InternalLink.home}
        >
          Go back to homepage
        </Link>
      </div>
      <pre class="mt-6 text-xs text-current/50">{props.error.message}</pre>
    </Card>
  </section>
)
