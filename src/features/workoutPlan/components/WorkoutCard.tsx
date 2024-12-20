import { Index, Show, type JSXElement, type ParentComponent } from 'solid-js'
import { Card } from '~/components/Card'
import { Skeleton } from '~/components/Skeleton'
import type { GetWorkoutPlanResponse } from '../types/response'
import { WorkoutAttributes } from './WorkoutAttributes'
import { WorkoutExercise, WorkoutExerciseSkeleton } from './WorkoutExercise'

type WorkoutCardProps = GetWorkoutPlanResponse['workouts'][number] & {
  action?: JSXElement
}

export const WorkoutCard: ParentComponent<WorkoutCardProps> = props => (
  <Card
    variant="black"
    class="gap-4 p-0"
  >
    <div class="flex flex-col gap-3 rounded-3xl bg-black/60 p-8 text-white">
      <div class="flex flex-wrap-reverse items-center justify-between gap-2">
        <h2 class="line-clamp-2 text-3xl font-bold text-current/80">
          {props.name}
        </h2>
        <Show when={props.action}>{props.action}</Show>
      </div>
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
    <Show when={props.children}>{props.children}</Show>
  </Card>
)

export const WorkoutCardSkeleton = () => (
  <Skeleton class="flex flex-col gap-4 rounded-3xl bg-black/50">
    <Skeleton class="flex flex-col gap-3 rounded-3xl bg-black/50 p-8">
      <Skeleton class="min-h-[36px] max-w-[180px]" />
      <Skeleton class="min-h-[28px]" />

      <div class="mt-4 flex gap-8">
        <Skeleton class="min-h-[64px]" />
        <Skeleton class="min-h-[64px]" />
        <Skeleton class="min-h-[64px]" />
      </div>
    </Skeleton>
    <div class="grid grid-cols-2 gap-8 p-8 max-md:grid-cols-1">
      <WorkoutExerciseSkeleton />
      <WorkoutExerciseSkeleton />
      <WorkoutExerciseSkeleton />
      <WorkoutExerciseSkeleton />
    </div>
  </Skeleton>
)
