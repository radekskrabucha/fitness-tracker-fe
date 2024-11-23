import { createQuery } from '@tanstack/solid-query'
import { Index, type Component } from 'solid-js'
import { QueryBoundary } from '~/components/QueryBoundary'
import { InternalLink } from '~/config/app'
import { WorkoutPlanCard } from '~/features/workoutPlans/components/WorkoutPlanCard'
import { getUserWorkoutPlansQueryOptions } from '../actions'

type UserWorkoutPlansProps = {
  userId: string
}

export const UserWorkoutPlans: Component<UserWorkoutPlansProps> = props => {
  const getUserWorkoutPlansQuery = createQuery(() =>
    getUserWorkoutPlansQueryOptions(props.userId)
  )

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
