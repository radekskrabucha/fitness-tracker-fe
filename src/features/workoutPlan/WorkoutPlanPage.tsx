import { useParams } from '@solidjs/router'
import { createQuery } from '@tanstack/solid-query'
import { Index, Show } from 'solid-js'
import { Badge } from '~/components/Badge'
import { Header } from '~/components/Header'
import { QueryBoundary } from '~/components/QueryBoundary'
import { getWorkoutPlanDifficultyName } from '~/features/workoutPlans/utils'
import { getWorkoutPlanQueryOptions } from './actions'
import { WorkoutCard } from './components/WorkoutCard'

export type WorkoutPlanPageParams = {
  id: string
}

export const WorkoutPlanPage = () => {
  const params = useParams<WorkoutPlanPageParams>()
  const getWorkoutPlanQuery = createQuery(() =>
    getWorkoutPlanQueryOptions(params.id)
  )

  return (
    <section class="layout-section gap-12">
      <QueryBoundary query={getWorkoutPlanQuery}>
        {data => (
          <>
            <Header
              title={data.name}
              description={data.description}
              variant="white"
              class="flex-wrap-reverse"
              icon={
                <Show when={getWorkoutPlanDifficultyName(data.difficultyLevel)}>
                  {difficultyName => (
                    <Badge variant="black">{difficultyName()}</Badge>
                  )}
                </Show>
              }
            />
            <Index each={data.workouts}>
              {workout => <WorkoutCard {...workout()} />}
            </Index>
          </>
        )}
      </QueryBoundary>
    </section>
  )
}
