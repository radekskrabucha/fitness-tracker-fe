import { createQuery } from '@tanstack/solid-query'
import { Index } from 'solid-js'
import { QueryBoundary } from '~/components/QueryBoundary'
import { getWorkoutPlansQueryOptions } from '../actions'
import { WorkoutPlanCard } from './WorkoutPlanCard'

export const WorkoutPlans = () => {
  const getWorkoutPlansQuery = createQuery(getWorkoutPlansQueryOptions)

  return (
    <QueryBoundary query={getWorkoutPlansQuery}>
      {data => (
        <Index each={data}>
          {workoutPlan => <WorkoutPlanCard {...workoutPlan()} />}
        </Index>
      )}
    </QueryBoundary>
  )
}
