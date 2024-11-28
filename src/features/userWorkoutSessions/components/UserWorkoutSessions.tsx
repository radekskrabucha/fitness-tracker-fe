import { createQuery } from '@tanstack/solid-query'
import { Index, type Component } from 'solid-js'
import { buttonVariants } from '~/components/Button'
import { Card } from '~/components/Card'
import { Header } from '~/components/Header'
import { Link } from '~/components/Link'
import { QueryBoundary } from '~/components/QueryBoundary'
import { InternalLink } from '~/config/app'
import { getUserWorkoutSessionsQueryOptions } from '../actions'
import { WorkoutSessionTile } from './WorkoutSessionTile'

type UserWorkoutSessionsProps = {
  userId: string
}

export const UserWorkoutSessions: Component<
  UserWorkoutSessionsProps
> = props => {
  const getUserWorkoutSessionsQuery = createQuery(() =>
    getUserWorkoutSessionsQueryOptions(props.userId)
  )

  return (
    <QueryBoundary
      query={getUserWorkoutSessionsQuery}
      noDataFallback={<NoWorkoutSessions />}
    >
      {data => (
        <>
          <div class="flex flex-col gap-10">
            <Index each={data}>
              {workoutSession => (
                <Link
                  href={InternalLink.userWorkoutSession(workoutSession().id)}
                >
                  <WorkoutSessionTile {...workoutSession()} />
                </Link>
              )}
            </Index>
          </div>

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

const NoWorkoutSessions = () => (
  <Card class="gap-10">
    <div class="flex flex-col gap-2">
      <h3 class="text-lg font-bold text-current/80">
        You don't have any workout plans yet.
      </h3>
      <p class="text-lg text-current/50">
        Create your first workout plan and start tracking your progress.
      </p>
    </div>
    <Link
      href={InternalLink.workoutPlans}
      class={buttonVariants({ variant: 'primary' })}
    >
      Explore workout plans
    </Link>
  </Card>
)
