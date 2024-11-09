import type { RouteDefinition } from '@solidjs/router'
import { useQueryClient } from '@tanstack/solid-query'
import { SEOTitle } from '~/components/Seo'
import { WorkoutPlansPage } from '~/features/workoutPlans/WorkoutPlansPage'
import { getWorkoutPlansQueryOptions } from '~/features/workoutPlans/actions'

export const route: RouteDefinition = {
  load: () => {
    const queryClient = useQueryClient()
    queryClient.prefetchQuery(getWorkoutPlansQueryOptions())
  }
}

const WorkoutPlans = () => (
  <>
    <SEOTitle title="Workout Plans" />
    <WorkoutPlansPage />
  </>
)

export default WorkoutPlans
