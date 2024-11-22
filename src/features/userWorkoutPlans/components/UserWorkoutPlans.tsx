import { createQuery } from '@tanstack/solid-query'
import { Index } from 'solid-js'
import { QueryBoundary } from '~/components/QueryBoundary'
import { WorkoutPlanCard } from '~/features/workoutPlans/components/WorkoutPlanCard'
import { getUserWorkoutPlansQueryOptions } from '../actions'

export const UserWorkoutPlans = () => {
  const getUserWorkoutPlansQuery = createQuery(getUserWorkoutPlansQueryOptions)

  return (
    <QueryBoundary query={getUserWorkoutPlansQuery}>
      {data => (
        <Index each={data}>
          {workoutPlan => <WorkoutPlanCard {...workoutPlan()} />}
        </Index>
      )}
    </QueryBoundary>
  )
}
