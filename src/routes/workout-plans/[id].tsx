import type { RouteDefinition } from '@solidjs/router'
import { useQueryClient } from '@tanstack/solid-query'
import { WorkoutPlanPage } from '~/features/workoutPlan/WorkoutPlanPage'
import { getWorkoutPlanQueryOptions } from '~/features/workoutPlan/actions'

export const route = {
  load: ({ params }) => {
    if (params.id) {
      const queryClient = useQueryClient()
      queryClient.prefetchQuery(getWorkoutPlanQueryOptions(params.id))
    }
  }
} satisfies RouteDefinition

export default WorkoutPlanPage
