import { createQuery } from '@tanstack/solid-query'
import { Index } from 'solid-js'
import { QueryBoundary } from '~/components/QueryBoundary'
import { InternalLink } from '~/config/app'
import { getWorkoutPlansQueryOptions } from '../actions'
import { WorkoutPlanCard } from './WorkoutPlanCard'

export const WorkoutPlans = () => {
  const getWorkoutPlansQuery = createQuery(getWorkoutPlansQueryOptions)

  return (
    <QueryBoundary query={getWorkoutPlansQuery}>
      {data => (
        <Index each={data}>
          {workoutPlan => (
            <WorkoutPlanCard
              {...workoutPlan()}
              href={InternalLink.workoutPlan}
            />
          )}
        </Index>
      )}
    </QueryBoundary>
  )
}
