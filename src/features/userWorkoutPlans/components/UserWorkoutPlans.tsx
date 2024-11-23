import { createQuery } from '@tanstack/solid-query'
import { Index } from 'solid-js'
import { QueryBoundary } from '~/components/QueryBoundary'
import { InternalLink } from '~/config/app'
import { WorkoutPlanCard } from '~/features/workoutPlans/components/WorkoutPlanCard'
import { getUserWorkoutPlansQueryOptions } from '../actions'

export const UserWorkoutPlans = () => {
  const getUserWorkoutPlansQuery = createQuery(getUserWorkoutPlansQueryOptions)

  return (
    <QueryBoundary query={getUserWorkoutPlansQuery}>
      {data => (
        <Index each={data}>
          {workoutPlan => (
            <WorkoutPlanCard
              {...workoutPlan()}
              href={InternalLink.userWorkoutPlan}
            />
          )}
        </Index>
      )}
    </QueryBoundary>
  )
}
