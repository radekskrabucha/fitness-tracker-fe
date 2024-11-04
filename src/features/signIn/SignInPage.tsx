import { Link } from '~/components/Link'
import { InternalLink } from '~/config/app'
import { SignInForm } from './components/SignInForm'

export const SignInPage = () => (
  <>
    <section class="layout-section flex-1 items-center justify-center gap-2 text-center">
      <h1 class="mb-4 text-4xl font-bold">Sign In</h1>
      <SignInForm />
      <p>
        Don't have an account? <Link href={InternalLink.signUp}>Sign up</Link>
      </p>
    </section>
  </>
)
