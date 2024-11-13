import { Header } from '~/components/Header'
import { WorkoutPlans } from './components/WorkoutPlans'

export const WorkoutPlansPage = () => (
  <>
    <section class="layout-section gap-12">
      <Header
        title="Workout Plans"
        description="Explore workouts and select one that suits you. Start tracking your progress today."
      />
      <div class="grid grid-cols-2 gap-10 max-lg:grid-cols-1">
        <WorkoutPlans />
      </div>
    </section>
  </>
)
