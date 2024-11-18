import { useParams } from '@solidjs/router'
import { createQuery } from '@tanstack/solid-query'
import { ModalPage } from '~/components/ModalPage'
import { QueryBoundary } from '~/components/QueryBoundary'
import { InternalLink } from '~/config/app'
import type { WorkoutPlanPageParams } from './WorkoutPlanPage'
import { getWorkoutPlanQueryOptions } from './actions'

export const SelectWorkoutPlanPage = () => {
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
            >
              <p>{data.description}</p>
            </ModalPage>
          </>
        )}
      </QueryBoundary>
    </section>
  )
}
