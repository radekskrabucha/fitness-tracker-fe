import { createQuery } from '@tanstack/solid-query'
import { Index, type Component } from 'solid-js'
import { buttonVariants } from '~/components/Button'
import { Card } from '~/components/Card'
import { Header } from '~/components/Header'
import { Link } from '~/components/Link'
import { QueryBoundary } from '~/components/QueryBoundary'
import { InternalLink } from '~/config/app'
import { getUserWorkoutPlansQueryOptions } from '../actions'
import { TodayWorkoutTile } from './TodayWorkoutTile'

type TodayWorkoutsSectionProps = {
  userId: string
  userName: string
}

export const TodayWorkoutsSection: Component<
  TodayWorkoutsSectionProps
> = props => {
  const getUserWorkoutPlansQuery = createQuery(() =>
    getUserWorkoutPlansQueryOptions(props.userId)
  )

  return (
    <section class="layout-section gap-12">
      <Header
        title={`Welcome back, ${props.userName}!`}
        description="It's nice to see you again! Check the plan for today."
        variant="black"
      />

      <div class="flex flex-col gap-10">
        <QueryBoundary
          query={getUserWorkoutPlansQuery}
          noDataFallback={<NoWorkoutsYet />}
        >
          {data => (
            <Index each={data}>
              {workout => <TodayWorkoutTile {...workout()} />}
            </Index>
          )}
        </QueryBoundary>
      </div>
    </section>
  )
}

const NoWorkoutsYet = () => (
  <Card class="gap-10">
    <div class="flex flex-col gap-2">
      <h3 class="text-2xl font-bold text-current/80">
        You don't have any workouts planned for today.
      </h3>
      <p class="text-lg text-current/50">
        Today is your day off. Relax, take a nap, or just enjoy the sunshine.
      </p>
    </div>
    <Link
      href={InternalLink.userWorkoutPlans}
      class={buttonVariants({
        variant: 'primary',
        class: 'w-full max-w-52 self-center'
      })}
    >
      See my workout plans
    </Link>
  </Card>
)
