import type { RouteDefinition } from '@solidjs/router'
import { useQueryClient } from '@tanstack/solid-query'
import { SEOTitle } from '~/components/Seo'
import { SelectWorkoutPlanPage } from '~/features/workoutPlan/SelectWorkoutPlanPage'
import { getWorkoutPlanQueryOptions } from '~/features/workoutPlan/actions'

export const route = {
  load: ({ params }) => {
    if (params.id) {
      const queryClient = useQueryClient()
      queryClient.prefetchQuery(getWorkoutPlanQueryOptions(params.id))
    }
  }
} satisfies RouteDefinition

const SelectWorkoutPlan = () => (
  <>
    <SEOTitle title="Select Workout Plan" />
    <SelectWorkoutPlanPage />
  </>
)

export default SelectWorkoutPlan
