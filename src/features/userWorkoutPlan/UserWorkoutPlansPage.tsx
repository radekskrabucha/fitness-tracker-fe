import { ClientOnly } from '~/components/ClientOnly'
import { Header } from '~/components/Header'
import { SessionWrapper } from '~/features/profile/components/SessionWrapper'
import { UserWorkoutPlans } from './components/UserWorkoutPlans'

export const UserWorkoutPlansPage = () => (
  <>
    <section class="layout-section gap-12">
      <Header title="Your Workout Plans" />
      <div class="grid grid-cols-2 gap-10 max-lg:grid-cols-1">
        <ClientOnly>
          <SessionWrapper>
            {user => <UserWorkoutPlans userId={user.id} />}
          </SessionWrapper>
        </ClientOnly>
      </div>
    </section>
  </>
)
