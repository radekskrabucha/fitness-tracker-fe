import { createQuery } from '@tanstack/solid-query'
import { Index } from 'solid-js'
import { QueryBoundary } from '~/components/QueryBoundary'
import { InternalLink } from '~/config/app'
import { getWorkoutPlansQueryOptions } from '../actions'
import { WorkoutPlanCard, WorkoutPlanCardSkeleton } from './WorkoutPlanCard'

export const WorkoutPlans = () => {
  const getWorkoutPlansQuery = createQuery(getWorkoutPlansQueryOptions)

  return (
    <QueryBoundary
      query={getWorkoutPlansQuery}
      loadingFallback={
        <>
          <WorkoutPlanCardSkeleton />
          <WorkoutPlanCardSkeleton />
          <WorkoutPlanCardSkeleton />
          <WorkoutPlanCardSkeleton />
        </>
      }
    >
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
