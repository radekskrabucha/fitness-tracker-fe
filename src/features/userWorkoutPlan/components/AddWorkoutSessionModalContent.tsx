import type { Component } from 'solid-js'
import type { GetWorkoutPlanResponse } from '~/features/workoutPlan/types/response'

type WorkoutCardProps = {
  workoutPlanId: string
} & GetWorkoutPlanResponse['workouts'][number]

export const AddWorkoutSessionModalContent: Component<
  WorkoutCardProps
> = props => (
  <div class="flex flex-col gap-10">
    <div class="flex flex-col gap-2 rounded-xl border-white/30 bg-white/40 px-4 py-2 text-black shadow-lg">
      <h2 class="text-2xl font-bold">{props.name}</h2>
      <p class="text-sm text-current/50">{props.description}</p>
    </div>
  </div>
)
