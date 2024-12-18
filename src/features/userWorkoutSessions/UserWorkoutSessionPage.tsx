import { buttonVariants } from '~/components/Button'
import { ClientOnly } from '~/components/ClientOnly'
import { Header } from '~/components/Header'
import { Link } from '~/components/Link'
import { InternalLink } from '~/config/app'
import { SessionWrapper } from '~/features/profile/components/SessionWrapper'
import { UserWorkoutSession } from './components/UserWorkoutSession'

export const UserWorkoutSessionPage = () => (
  <>
    <section class="layout-section gap-12">
      <Header
        title="Workout Session"
        description="Here you can see all the details of your workout session."
        icon={
          <Link
            href={InternalLink.userWorkoutSessions}
            class={buttonVariants()}
          >
            See all
          </Link>
        }
        class="flex-wrap"
      />
      <ClientOnly>
        <SessionWrapper>
          {user => <UserWorkoutSession userId={user.id} />}
        </SessionWrapper>
      </ClientOnly>
    </section>
  </>
)
