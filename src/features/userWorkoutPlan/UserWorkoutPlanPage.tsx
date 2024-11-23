import { ClientOnly } from '~/components/ClientOnly'
import { WorkoutPlan } from './components/WorkoutPlan'

export const UserWorkoutPlanPage = () => {
  return (
    <>
      <section class="layout-section gap-12">
        <ClientOnly>
          <WorkoutPlan />
        </ClientOnly>
      </section>
    </>
  )
}
