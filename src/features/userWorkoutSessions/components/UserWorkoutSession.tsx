import { useParams } from '@solidjs/router'
import { createQuery } from '@tanstack/solid-query'
import { Index, type Component } from 'solid-js'
import { buttonVariants } from '~/components/Button'
import { Header } from '~/components/Header'
import { Link } from '~/components/Link'
import { QueryBoundary } from '~/components/QueryBoundary'
import { InternalLink } from '~/config/app'
import { getUserWorkoutSessionQueryOptions } from '../actions'
import { WorkoutSessionExercise } from './WorkoutSessionExercise'
import { WorkoutSessionTile } from './WorkoutSessionTile'

type UserWorkoutSessionPageParams = {
  id: string
}
type UserWorkoutSessionProps = {
  userId: string
}

export const UserWorkoutSession: Component<UserWorkoutSessionProps> = props => {
  const params = useParams<UserWorkoutSessionPageParams>()
  const getUserWorkoutSessionQuery = createQuery(() =>
    getUserWorkoutSessionQueryOptions(params.id, props.userId)
  )

  return (
    <QueryBoundary query={getUserWorkoutSessionQuery}>
      {data => (
        <>
          <WorkoutSessionTile {...data}>
            <div class="grid grid-cols-1 gap-8">
              <Index each={data.exercises}>
                {(exercise, index) => (
                  <WorkoutSessionExercise
                    {...exercise()}
                    order={index}
                  />
                )}
              </Index>
            </div>
          </WorkoutSessionTile>

          <Header
            variant="black"
            title="Want to add new workout session?"
            description="Browse your workout plans, choose one and add your workout session."
            icon={
              <Link
                href={InternalLink.userWorkoutPlans}
                class={buttonVariants({ variant: 'primaryWhite' })}
              >
                Browse my plans
              </Link>
            }
            class="flex-wrap"
          />
        </>
      )}
    </QueryBoundary>
  )
}
