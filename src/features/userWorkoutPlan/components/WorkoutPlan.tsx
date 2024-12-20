import { useParams } from '@solidjs/router'
import { createQuery } from '@tanstack/solid-query'
import { Index, Show, type Component } from 'solid-js'
import { Badge } from '~/components/Badge'
import { Header } from '~/components/Header'
import { QueryBoundary } from '~/components/QueryBoundary'
import { Skeleton } from '~/components/Skeleton'
import {
  WorkoutCard,
  WorkoutCardSkeleton
} from '~/features/workoutPlan/components/WorkoutCard'
import { getWorkoutPlanDifficultyName } from '~/features/workoutPlans/utils'
import { getUserWorkoutPlanQueryOptions } from '../actions'
import { AddWorkoutSessionModalContent } from './AddWorkoutSessionModalContent'

export type UserWorkoutPlanPageParams = {
  id: string
}

type WorkoutPlanProps = {
  userId: string
}

export const WorkoutPlan: Component<WorkoutPlanProps> = props => {
  const params = useParams<UserWorkoutPlanPageParams>()
  const getUserWorkoutPlanQuery = createQuery(() =>
    getUserWorkoutPlanQueryOptions(params.id, props.userId)
  )

  return (
    <QueryBoundary
      query={getUserWorkoutPlanQuery}
      loadingFallback={<WorkoutPlanSkeleton />}
    >
      {data => (
        <>
          <Header
            title={data.name}
            description={data.description}
            variant="white"
            class="flex-wrap gap-y-10"
            icon={
              <Show when={getWorkoutPlanDifficultyName(data.difficultyLevel)}>
                {difficultyName => (
                  <Badge variant="white">{difficultyName()}</Badge>
                )}
              </Show>
            }
          />
          <Index each={data.workouts}>
            {workout => (
              <WorkoutCard
                {...workout()}
                action={
                  <AddWorkoutSessionModalContent
                    {...workout()}
                    workoutPlanId={params.id}
                  />
                }
              >
                <div class="flex flex-1 flex-col p-8">
                  <AddWorkoutSessionModalContent
                    {...workout()}
                    workoutPlanId={params.id}
                  />
                </div>
              </WorkoutCard>
            )}
          </Index>
        </>
      )}
    </QueryBoundary>
  )
}

const WorkoutPlanSkeleton = () => (
  <>
    <Skeleton class="flex items-center justify-between gap-x-8 gap-y-4 rounded-3xl px-8 py-4">
      <div class="flex flex-1 flex-col gap-4">
        <Skeleton class="min-h-[36px] max-w-[400px]" />
        <Skeleton class="min-h-[28px] max-w-[685px]" />
      </div>
      <Skeleton class="min-h-[36px] max-w-[64px]" />
    </Skeleton>

    <WorkoutCardSkeleton />
  </>
)
