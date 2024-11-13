import { buttonVariants } from '~/components/Button'
import { Card } from '~/components/Card'
import { Link } from '~/components/Link'
import { InternalLink } from '~/config/app'
import { SignInForm } from './components/SignInForm'

export const SignInPage = () => (
  <>
    <section class="layout-section flex-1 justify-center">
      <Card class="items-center gap-6 text-center">
        <h1 class="mb-4 text-4xl font-bold">Sign In</h1>
        <SignInForm />
        <p>
          Don't have an account?{' '}
          <Link
            class={buttonVariants({ variant: 'link' })}
            href={InternalLink.signUp}
          >
            Sign up
          </Link>
        </p>
      </Card>
    </section>
  </>
)
