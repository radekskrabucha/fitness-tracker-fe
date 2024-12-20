import { Index, Show, type Component } from 'solid-js'
import { Badge } from '~/components/Badge'
import { Skeleton } from '~/components/Skeleton'
import { WorkoutExerciseAttributeTile } from '~/features/workoutPlan/components/WorkoutExerciseAttributeTile'
import type { GetUserWorkoutSessionResponse } from '../types/response'

type WorkoutSessionExerciseProps =
  GetUserWorkoutSessionResponse['exercises'][number] & {
    order: number
  }

export const WorkoutSessionExercise: Component<
  WorkoutSessionExerciseProps
> = props => (
  <div class="flex flex-col gap-8 rounded-3xl bg-black/30 px-8 py-6 shadow-md">
    <div class="flex flex-col gap-1">
      <div class="flex flex-wrap-reverse items-center gap-x-4">
        <h3 class="text-lg font-bold text-current/80">
          {props.order + 1}. {props.exercise.name}
        </h3>
        <Show when={!props.completed}>
          <Badge
            variant="info"
            class="w-max"
          >
            Not Completed
          </Badge>
        </Show>
        <Badge>{props.exercise.category.name}</Badge>
      </div>
      <Show when={props.exercise.description}>
        {description => <p class="text-sm text-current/50">{description()}</p>}
      </Show>
    </div>
    <div class="flex flex-wrap gap-4">
      <Index each={props.exercise.muscleGroups}>
        {muscleGroup => <Badge variant="black">{muscleGroup().name}</Badge>}
      </Index>
    </div>
    <Show when={props.attributes.length}>
      <div class="flex flex-row flex-wrap gap-6 text-black">
        <Index each={props.attributes}>
          {attribute => <WorkoutExerciseAttributeTile {...attribute()} />}
        </Index>
      </div>
    </Show>
    <Show when={props.notes}>
      {notes => (
        <div class="flex shrink-0 flex-col gap-2 rounded-lg bg-white px-8 py-3 shadow-sm">
          <h3 class="text-xl font-bold whitespace-nowrap text-black/80">
            Notes
          </h3>
          <p class="text-sm text-black/50">{notes()}</p>
        </div>
      )}
    </Show>
  </div>
)

export const WorkoutSessionExerciseSkeleton = () => (
  <Skeleton class="flex flex-col gap-8 rounded-3xl bg-black/50 px-8 py-6">
    <div class="flex flex-col gap-1">
      <Skeleton class="min-h-[28px] max-w-[240px]" />
      <Skeleton class="min-h-[20px]" />
    </div>
    <div class="flex flex-wrap gap-4">
      <Skeleton class="min-h-[26px] max-w-[80px] bg-black/50" />
      <Skeleton class="min-h-[26px] max-w-[80px] bg-black/50" />
      <Skeleton class="min-h-[26px] max-w-[80px] bg-black/50" />
    </div>
    <div class="flex flex-row flex-wrap gap-6">
      <Skeleton class="min-h-[26px]" />
      <Skeleton class="min-h-[64px]" />
    </div>
    <Skeleton class="min-h-[100px]" />
  </Skeleton>
)
