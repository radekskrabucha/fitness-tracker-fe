import type { RouteDefinition } from '@solidjs/router'
import { useQueryClient } from '@tanstack/solid-query'
import { SEOTitle } from '~/components/Seo'
import { ChooseWorkoutPlanPage } from '~/features/workoutPlan/ChooseWorkoutPlanPage'
import { getWorkoutPlanQueryOptions } from '~/features/workoutPlan/actions'

export const route = {
  load: ({ params }) => {
    if (params.id) {
      const queryClient = useQueryClient()
      queryClient.prefetchQuery(getWorkoutPlanQueryOptions(params.id))
    }
  }
} satisfies RouteDefinition

const ChooseWorkoutPlan = () => (
  <>
    <SEOTitle title="Start Workout Plan" />
    <ChooseWorkoutPlanPage />
  </>
)

export default ChooseWorkoutPlan
