import { Link } from '~/components/Link'
import { InternalLink } from '~/config/app'
import { SignUpForm } from './components/SignUpForm'

export const SignUpPage = () => (
  <>
    <section class="layout-section flex-1 items-center justify-center gap-2 text-center">
      <h1 class="mb-4 text-4xl font-bold">Sign up</h1>
      <SignUpForm />
      <p>
        Already have an account? <Link href={InternalLink.signIn}>Sign in</Link>
      </p>
    </section>
  </>
)
