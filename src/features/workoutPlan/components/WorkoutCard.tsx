import { Index, type Component } from 'solid-js'
import { Card } from '~/components/Card'
import type { GetWorkoutPlanResponse } from '../types/response'
import { WorkoutExercise } from './WorkoutExercise'

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
      <p class="text-lg text-current/50">{props.description}</p>
    </div>
    <div class="grid grid-cols-2 gap-8 p-8 max-md:grid-cols-1">
      <Index each={props.exercises}>
        {exercise => <WorkoutExercise {...exercise()} />}
      </Index>
    </div>
  </Card>
)
