import { useParams } from '@solidjs/router'
import { createQuery } from '@tanstack/solid-query'
import { Index, Show, type Component } from 'solid-js'
import { Badge } from '~/components/Badge'
import { buttonVariants } from '~/components/Button'
import { Header } from '~/components/Header'
import { Link } from '~/components/Link'
import { QueryBoundary } from '~/components/QueryBoundary'
import { InternalLink } from '~/config/app'
import { WorkoutCard } from '~/features/workoutPlan/components/WorkoutCard'
import { getWorkoutPlanDifficultyName } from '~/features/workoutPlans/utils'
import { getUserWorkoutPlanQueryOptions } from '../actions'

export type UserWorkoutPlanPageParams = {
  id: string
}

type WorkoutPlanProps = {
  userId: string
}

export const WorkoutPlan: Component<WorkoutPlanProps> = props => {
  const params = useParams<UserWorkoutPlanPageParams>()
  const getUserWorkoutPlanQuery = createQuery(() =>
    getUserWorkoutPlanQueryOptions(params.id, props.userId)
  )

  return (
    <QueryBoundary query={getUserWorkoutPlanQuery}>
      {data => (
        <>
          <Header
            title={data.name}
            description={data.description}
            variant="white"
            class="flex-wrap gap-y-10"
            icon={
              <Show when={getWorkoutPlanDifficultyName(data.difficultyLevel)}>
                {difficultyName => (
                  <Badge variant="white">{difficultyName()}</Badge>
                )}
              </Show>
            }
          />
          <Index each={data.workouts}>
            {workout => (
              <WorkoutCard {...workout()}>
                {id => (
                  <Link
                    href={InternalLink.userWorkoutPlan(id)}
                    class={buttonVariants()}
                  >
                    Add workout session
                  </Link>
                )}
              </WorkoutCard>
            )}
          </Index>
        </>
      )}
    </QueryBoundary>
  )
}
