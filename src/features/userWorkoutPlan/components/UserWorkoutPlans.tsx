import { createQuery } from '@tanstack/solid-query'
import { Index, type Component } from 'solid-js'
import { buttonVariants } from '~/components/Button'
import { Card } from '~/components/Card'
import { Header } from '~/components/Header'
import { Link } from '~/components/Link'
import { QueryBoundary } from '~/components/QueryBoundary'
import { Skeleton } from '~/components/Skeleton'
import { InternalLink } from '~/config/app'
import {
  WorkoutPlanCard,
  WorkoutPlanCardSkeleton
} from '~/features/workoutPlans/components/WorkoutPlanCard'
import { getUserWorkoutPlansQueryOptions } from '../actions'

type UserWorkoutPlansProps = {
  userId: string
}

export const UserWorkoutPlans: Component<UserWorkoutPlansProps> = props => {
  const getUserWorkoutPlansQuery = createQuery(() =>
    getUserWorkoutPlansQueryOptions(props.userId)
  )

  return (
    <QueryBoundary
      query={getUserWorkoutPlansQuery}
      noDataFallback={<NoWorkoutPlans />}
      loadingFallback={<WorkoutPlansSkeleton />}
    >
      {workoutPlans => (
        <>
          <div class="grid grid-cols-2 gap-10 max-lg:grid-cols-1">
            <Index each={workoutPlans.data}>
              {workoutPlan => (
                <WorkoutPlanCard
                  {...workoutPlan()}
                  href={InternalLink.userWorkoutPlan}
                />
              )}
            </Index>
          </div>

          <Header
            variant="black"
            title="Want to start a new workout plan?"
            description="Check out all available workout plans."
            icon={
              <Link
                href={InternalLink.workoutPlans}
                class={buttonVariants({ variant: 'primaryWhite' })}
              >
                Browse all
              </Link>
            }
            class="flex-wrap"
          />
        </>
      )}
    </QueryBoundary>
  )
}

const NoWorkoutPlans = () => (
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

export const WorkoutPlansSkeleton = () => (
  <>
    <div class="grid grid-cols-2 gap-10 max-lg:grid-cols-1">
      <WorkoutPlanCardSkeleton />
      <WorkoutPlanCardSkeleton />
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
