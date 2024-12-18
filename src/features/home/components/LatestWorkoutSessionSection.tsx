import { createQuery } from '@tanstack/solid-query'
import type { Component } from 'solid-js'
import { buttonVariants } from '~/components/Button'
import { Card } from '~/components/Card'
import { Header } from '~/components/Header'
import { Icon } from '~/components/Icon'
import { Link } from '~/components/Link'
import { QueryBoundary } from '~/components/QueryBoundary'
import { InternalLink } from '~/config/app'
import { getUserLatestWorkoutSessionQueryOptions } from '~/features/userWorkoutSessions/actions'
import { WorkoutSessionTile } from '~/features/userWorkoutSessions/components/WorkoutSessionTile'

type LatestWorkoutSessionSectionProps = {
  userId: string
}

export const LatestWorkoutSessionSection: Component<
  LatestWorkoutSessionSectionProps
> = props => {
  const getUserLatestWorkoutSessionQuery = createQuery(() =>
    getUserLatestWorkoutSessionQueryOptions(props.userId)
  )

  return (
    <section class="layout-section gap-8">
      <Header
        title="Latest Workout Session"
        description="Below you can see your newest workout session."
        icon={
          <Link
            href={InternalLink.userWorkoutSessions}
            class={buttonVariants({ variant: 'primaryWhite' })}
          >
            See all
          </Link>
        }
        class="flex-wrap"
        variant="black"
      />
      <QueryBoundary
        query={getUserLatestWorkoutSessionQuery}
        noDataFallback={<NoWorkoutSession />}
        errorFallback={() => <NoWorkoutSession />}
      >
        {workoutSession => (
          <Link href={InternalLink.userWorkoutSession(workoutSession.id)}>
            <WorkoutSessionTile {...workoutSession}>
              <div class="-mt-2 flex flex-wrap items-center justify-between gap-2 text-current/80">
                <span
                  class={buttonVariants({ variant: 'link', class: 'ml-auto' })}
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
      </QueryBoundary>
    </section>
  )
}

const NoWorkoutSession = () => (
  <Card class="gap-10">
    <div class="flex flex-col gap-2">
      <h3 class="text-2xl font-bold text-current/80">
        No workout session yet.
      </h3>
      <p class="text-lg text-current/50">
        Select your workout plan and add new workout session.
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
