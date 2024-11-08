import { Header } from '~/components/Header'
import WorkoutPlans from '~/routes/workout-plans'

export const WorkoutPlansPage = () => {
  return (
    <>
      <section class="layout-section">
        <Header
          title="Workouts"
          description="Explore workouts and select one that suits you. Start tracking your progress today."
        />
        <WorkoutPlans />
      </section>
    </>
  )
}
