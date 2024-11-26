import { createQuery } from '@tanstack/solid-query'
import { Index, type Component } from 'solid-js'
import { buttonVariants } from '~/components/Button'
import { Card } from '~/components/Card'
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
    getUserWorkoutPlansQueryOptions(props.userId, {
      limit: 2
    })
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
        variant="black"
      />
      <QueryBoundary
        query={getUserWorkoutPlansQuery}
        isDataEmpty={res => res?.data.length === 0}
        noDataFallback={<NoWorkoutPlans />}
      >
        {workoutPlans => (
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
        )}
      </QueryBoundary>
    </section>
  )
}

const NoWorkoutPlans = () => (
  <Card class="gap-10">
    <div class="flex flex-col gap-2">
      <h3 class="text-2xl font-bold text-current/80">
        You don't have any workout plans yet.
      </h3>
      <p class="text-lg text-current/50">
        Create your first workout plan and start tracking your progress.
      </p>
    </div>
    <Link
      href={InternalLink.workoutPlans}
      class={buttonVariants({
        variant: 'primary',
        class: 'w-full max-w-52 self-center'
      })}
    >
      Explore workout plans
    </Link>
  </Card>
)
