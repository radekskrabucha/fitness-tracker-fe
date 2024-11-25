import { createQuery } from '@tanstack/solid-query'
import { Index, type Component } from 'solid-js'
import { Header } from '~/components/Header'
import { QueryBoundary } from '~/components/QueryBoundary'
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
        <QueryBoundary query={getUserWorkoutPlansQuery}>
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
