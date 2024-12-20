import { createQuery } from '@tanstack/solid-query'
import { Index, type Component } from 'solid-js'
import { buttonVariants } from '~/components/Button'
import { Card } from '~/components/Card'
import { Header } from '~/components/Header'
import { Icon } from '~/components/Icon'
import { Link } from '~/components/Link'
import { QueryBoundary } from '~/components/QueryBoundary'
import { Skeleton } from '~/components/Skeleton'
import { InternalLink } from '~/config/app'
import { getUserWorkoutSessionsQueryOptions } from '../actions'
import {
  WorkoutSessionTile,
  WorkoutSessionTileSkeleton
} from './WorkoutSessionTile'

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
      loadingFallback={<UserWorkoutSessionsSkeleton />}
    >
      {data => (
        <>
          <div class="flex flex-col gap-10">
            <Index each={data}>
              {workoutSession => (
                <Link
                  href={InternalLink.userWorkoutSession(workoutSession().id)}
                >
                  <WorkoutSessionTile {...workoutSession()}>
                    <div class="-mt-2 flex flex-wrap items-center justify-between gap-2 text-current/80">
                      <span
                        class={buttonVariants({
                          variant: 'link',
                          class: 'ml-auto'
                        })}
                      >
                        See details{' '}
                        <Icon
                          icon="arrow"
                          class="size-4 fill-current"
                        />
                      </span>
                    </div>
                  </WorkoutSessionTile>
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

const UserWorkoutSessionsSkeleton = () => (
  <>
    <div class="flex flex-col gap-10">
      <WorkoutSessionTileSkeleton>
        <Skeleton class="min-h-[20px] max-w-[88px] self-end" />
      </WorkoutSessionTileSkeleton>
      <WorkoutSessionTileSkeleton>
        <Skeleton class="min-h-[20px] max-w-[88px] self-end" />
      </WorkoutSessionTileSkeleton>
    </div>

    <Skeleton class="flex items-center justify-between gap-x-8 gap-y-4 rounded-3xl bg-black/50 px-8 py-4">
      <div class="flex flex-1 flex-col gap-4">
        <Skeleton class="min-h-[36px] max-w-[400px]" />
        <Skeleton class="min-h-[28px] max-w-[685px]" />
      </div>
      <Skeleton class="min-h-[36px] max-w-[64px]" />
    </Skeleton>
  </>
)
