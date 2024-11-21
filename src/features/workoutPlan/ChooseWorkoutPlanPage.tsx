import { useParams } from '@solidjs/router'
import { createQuery } from '@tanstack/solid-query'
import { ModalPage } from '~/components/ModalPage'
import { QueryBoundary } from '~/components/QueryBoundary'
import { InternalLink } from '~/config/app'
import type { WorkoutPlanPageParams } from './WorkoutPlanPage'
import { getWorkoutPlanQueryOptions } from './actions'
import { ChooseWorkoutPlanForm } from './components/ChooseWorkoutPlanForm'

export const ChooseWorkoutPlanPage = () => {
  const params = useParams<WorkoutPlanPageParams>()
  const getWorkoutPlanQuery = createQuery(() =>
    getWorkoutPlanQueryOptions(params.id)
  )

  return (
    <section class="layout-section gap-12">
      <QueryBoundary query={getWorkoutPlanQuery}>
        {data => (
          <>
            <ModalPage
              href={InternalLink.workoutPlan(params.id)}
              title={data.name}
              description={data.description}
            >
              <ChooseWorkoutPlanForm
                defaultValues={{
                  workouts: JSON.parse(JSON.stringify(data.workouts))
                }}
                workoutPlanId={data.id}
              />
            </ModalPage>
          </>
        )}
      </QueryBoundary>
    </section>
  )
}
