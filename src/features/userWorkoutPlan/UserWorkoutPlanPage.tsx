import { ClientOnly } from '~/components/ClientOnly'
import { SessionWrapper } from '~/features/profile/components/SessionWrapper'
import { WorkoutPlan } from './components/WorkoutPlan'

export const UserWorkoutPlanPage = () => (
  <>
    <section class="layout-section gap-12">
      <ClientOnly>
        <SessionWrapper>
          {user => <WorkoutPlan userId={user.id} />}
        </SessionWrapper>
      </ClientOnly>
    </section>
  </>
)
