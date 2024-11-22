import { Index, Show, type Component } from 'solid-js'
import { Card } from '~/components/Card'
import { WorkoutAttributes } from './WorkoutAttributes'
import { WorkoutExercise } from './WorkoutExercise'
import type { GetWorkoutPlanResponse } from '../types/response'

type WorkoutCardProps = GetWorkoutPlanResponse['workouts'][number]

export const WorkoutCard: Component<WorkoutCardProps> = props => (
  <Card
    variant="black"
    class="gap-4 p-0"
  >
    <div class="flex flex-col gap-3 rounded-3xl bg-black/60 px-8 py-4 text-white">
      <h2 class="line-clamp-2 text-3xl font-bold text-current/80">
        {props.name}
      </h2>
      <Show when={props.description}>
        {description => <p class="text-lg text-current/50">{description()}</p>}
      </Show>
      <Show when={props.attributes.length}>
        <WorkoutAttributes attributes={props.attributes} />
      </Show>
    </div>
    <div class="grid grid-cols-2 gap-8 p-8 max-md:grid-cols-1">
      <Index each={props.exercises}>
        {(exercise, index) => (
          <WorkoutExercise
            {...exercise()}
            order={index}
          />
        )}
      </Index>
    </div>
  </Card>
)
