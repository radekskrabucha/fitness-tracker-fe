import { Index, Show, type Component } from 'solid-js'
import { Badge } from '~/components/Badge'
import type { GetWorkoutPlanResponse } from '../types/response'
import { WorkoutExerciseAttributeTile } from './WorkoutExerciseAttributeTile'

type WorkoutExerciseProps =
  GetWorkoutPlanResponse['workouts'][number]['exercises'][number] & {
    order: number
  }

export const WorkoutExercise: Component<WorkoutExerciseProps> = props => (
  <div class="flex flex-col gap-4 rounded-3xl bg-black/30 px-8 py-6 shadow-md">
    <div class="flex flex-col gap-1">
      <div class="flex flex-wrap-reverse items-center gap-x-4">
        <h3 class="text-lg font-bold text-current/80">
          {props.order + 1}. {props.name}
        </h3>
        <Badge variant="black">{props.category.name}</Badge>
      </div>
      <Show when={props.description}>
        {description => <p class="text-sm text-current/50">{description()}</p>}
      </Show>
    </div>
    <div class="flex flex-wrap gap-4">
      <Index each={props.muscleGroups}>
        {muscleGroup => <Badge>{muscleGroup().name}</Badge>}
      </Index>
    </div>
    <Show when={props.attributes.length}>
      <div class="mt-6 flex flex-row flex-wrap gap-6 text-black">
        <Index each={props.attributes}>
          {attribute => <WorkoutExerciseAttributeTile {...attribute()} />}
        </Index>
      </div>
    </Show>
  </div>
)
