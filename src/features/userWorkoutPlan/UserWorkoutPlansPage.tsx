import { ClientOnly } from '~/components/ClientOnly'
import { Header } from '~/components/Header'
import { SessionWrapper } from '~/features/profile/components/SessionWrapper'
import { UserWorkoutPlans } from './components/UserWorkoutPlans'

export const UserWorkoutPlansPage = () => (
  <>
    <section class="layout-section gap-12">
      <Header
        title="Your Workout Plans"
        description="Here you can see all your workout plans."
      />
      <ClientOnly>
        <SessionWrapper>
          {user => <UserWorkoutPlans userId={user.id} />}
        </SessionWrapper>
      </ClientOnly>
    </section>
  </>
)
