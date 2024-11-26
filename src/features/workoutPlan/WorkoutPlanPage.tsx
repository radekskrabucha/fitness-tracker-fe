import { useParams } from '@solidjs/router'
import { createQuery } from '@tanstack/solid-query'
import { Index, Show, type FlowComponent } from 'solid-js'
import { Badge } from '~/components/Badge'
import { buttonVariants } from '~/components/Button'
import { Header } from '~/components/Header'
import { Link } from '~/components/Link'
import { QueryBoundary } from '~/components/QueryBoundary'
import { InternalLink } from '~/config/app'
import { getWorkoutPlanDifficultyName } from '~/features/workoutPlans/utils'
import { getWorkoutPlanQueryOptions } from './actions'
import { WorkoutCard } from './components/WorkoutCard'

export type WorkoutPlanPageParams = {
  id: string
}

export const WorkoutPlanPage: FlowComponent = props => {
  const params = useParams<WorkoutPlanPageParams>()
  const getWorkoutPlanQuery = createQuery(() =>
    getWorkoutPlanQueryOptions(params.id)
  )

  return (
    <>
      <section class="layout-section gap-12">
        <QueryBoundary query={getWorkoutPlanQuery}>
          {data => (
            <>
              <Header
                title={
                  <div class="flex flex-wrap-reverse items-center gap-x-4 gap-y-2">
                    <h2>{data.name}</h2>
                    <Show
                      when={getWorkoutPlanDifficultyName(data.difficultyLevel)}
                    >
                      {difficultyName => (
                        <Badge variant="white">{difficultyName()}</Badge>
                      )}
                    </Show>
                  </div>
                }
                description={data.description}
                variant="white"
                class="flex-wrap gap-y-10"
                icon={
                  <Link
                    href={InternalLink.chooseWorkoutPlan(params.id)}
                    replace
                    noScroll
                    class={buttonVariants()}
                  >
                    Start
                  </Link>
                }
              />
              <Index each={data.workouts}>
                {workout => <WorkoutCard {...workout()} />}
              </Index>
              <Header
                class="max-sm:flex-wrap"
                variant="white"
                title="Start a workout plan"
                description="Customize your workout plan and start your workout journey."
                icon={
                  <Link
                    href={InternalLink.chooseWorkoutPlan(params.id)}
                    replace
                    noScroll
                    class={buttonVariants()}
                  >
                    Start
                  </Link>
                }
              />
            </>
          )}
        </QueryBoundary>
      </section>
      {props.children}
    </>
  )
}