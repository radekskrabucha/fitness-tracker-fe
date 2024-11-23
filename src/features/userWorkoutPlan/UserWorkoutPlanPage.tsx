import { useParams } from '@solidjs/router'
import { Header } from '~/components/Header'

export type UserWorkoutPlanPageParams = {
  id: string
}

export const UserWorkoutPlanPage = () => {
  const params = useParams<UserWorkoutPlanPageParams>()

  return (
    <>
      <section class="layout-section gap-12">
        <Header
          title="Your Workout Plan"
          description={params.id}
        />
      </section>
    </>
  )
}
