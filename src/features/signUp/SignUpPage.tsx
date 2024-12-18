import { buttonVariants } from '~/components/Button'
import { Card } from '~/components/Card'
import { Link } from '~/components/Link'
import { InternalLink } from '~/config/app'
import { SignUpForm } from './components/SignUpForm'

export const SignUpPage = () => (
  <>
    <section class="layout-section flex-1 justify-center">
      <Card class="items-center gap-6 text-center">
        <h1 class="mb-4 text-4xl font-bold">Sign up</h1>
        <SignUpForm />
        <p>
          Already have an account?{' '}
          <Link
            class={buttonVariants({ variant: 'link' })}
            href={InternalLink.signIn}
          >
            Sign in
          </Link>
        </p>
      </Card>
    </section>
  </>
)
