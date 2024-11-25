import { createQuery } from '@tanstack/solid-query'
import { Index, type Component } from 'solid-js'
import { buttonVariants } from '~/components/Button'
import { Card } from '~/components/Card'
import { Link } from '~/components/Link'
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
    <QueryBoundary
      query={getUserWorkoutPlansQuery}
      noDataFallback={<NoWorkoutPlans />}
    >
      {data => (
        <div class="grid grid-cols-2 gap-10 max-lg:grid-cols-1">
          <Index each={data}>
            {workoutPlan => (
              <WorkoutPlanCard
                {...workoutPlan()}
                href={InternalLink.userWorkoutPlan}
              />
            )}
          </Index>
        </div>
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
