import { createQuery } from '@tanstack/solid-query'
import { Index, type Component } from 'solid-js'
import { buttonVariants } from '~/components/Button'
import { Header } from '~/components/Header'
import { Link } from '~/components/Link'
import { QueryBoundary } from '~/components/QueryBoundary'
import { InternalLink } from '~/config/app'
import { getUserWorkoutPlansQueryOptions } from '~/features/userWorkoutPlan/actions'
import { WorkoutPlanCard } from '~/features/workoutPlans/components/WorkoutPlanCard'

type WorkoutPlansSectionProps = {
  userId: string
}

export const WorkoutPlansSection: Component<
  WorkoutPlansSectionProps
> = props => {
  const getUserWorkoutPlansQuery = createQuery(() =>
    getUserWorkoutPlansQueryOptions(props.userId)
  )

  return (
    <section class="layout-section gap-12">
      <Header
        title="Your Workout Plans"
        description="Below you can see your newest workout plans."
        icon={
          <Link
            href={InternalLink.userWorkoutPlans}
            class={buttonVariants()}
          >
            See all
          </Link>
        }
        class="flex-wrap"
      />
      <div class="grid grid-cols-2 gap-10 max-lg:grid-cols-1">
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
      </div>
    </section>
  )
}
