import { ClientOnly } from '~/components/ClientOnly'
import { Header } from '~/components/Header'
import { SessionWrapper } from '~/features/profile/components/SessionWrapper'
import { UserWorkoutSessions } from './components/UserWorkoutSessions'

export const UserWorkoutSessionsPage = () => (
  <>
    <section class="layout-section gap-12">
      <Header
        title="Your Workout Sessions"
        description="Here you can see all your workout sessions."
      />
      <ClientOnly>
        <SessionWrapper>
          {user => <UserWorkoutSessions userId={user.id} />}
        </SessionWrapper>
      </ClientOnly>
    </section>
  </>
)
