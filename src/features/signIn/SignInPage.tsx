import { ClientOnly } from '~/components/ClientOnly'
import { Session } from './components/Session'
import { SignInForm } from './components/SignInForm'

export const SignInPage = () => (
  <>
    <section class="layout-section flex-1 items-center justify-center gap-2 text-center">
      <h1 class="mb-4 text-4xl font-bold">Sign In</h1>
      <SignInForm />
      <ClientOnly>
        <Session />
      </ClientOnly>
    </section>
  </>
)
