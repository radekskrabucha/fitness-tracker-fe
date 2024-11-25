import { Index, Show, type Component } from 'solid-js'
import { Badge } from '~/components/Badge'
import { buttonVariants } from '~/components/Button'
import { cardVariants } from '~/components/Card'
import { Icon } from '~/components/Icon'
import { Link } from '~/components/Link'
import { InternalLink } from '~/config/app'
import type { GetUserTodayWorkoutsResponse } from '../types/response'

type TodayWorkoutTileProps = GetUserTodayWorkoutsResponse[number]

export const TodayWorkoutTile: Component<TodayWorkoutTileProps> = props => (
  <Link
    href={InternalLink.userWorkoutPlan(props.workoutPlan.id)}
    class={cardVariants({
      class: 'overflow-hidden !p-0'
    })}
  >
    <div class="flex flex-col gap-3 rounded-3xl bg-black px-8 py-4 text-white">
      <Badge
        variant="white"
        class="w-max"
      >
        {props.workoutPlan.name}
      </Badge>
      <h2 class="line-clamp-2 text-4xl font-bold text-current/80 max-sm:text-3xl">
        {props.workout.name}
      </h2>
      <Show when={props.workout.description}>
        {description => (
          <p class="line-clamp-2 text-current/50">{description()}</p>
        )}
      </Show>
    </div>
    <span class="w-" />
    <div class="mt-auto flex flex-col gap-6 p-8">
      <div class="grid grid-cols-2 gap-4">
        <Index each={props.workout.exercises}>
          {(workout, index) => (
            <Exercise
              {...workout()}
              orderIndex={index + 1}
            />
          )}
        </Index>
      </div>
      <div class="-mt-2 flex flex-wrap items-center justify-between gap-2">
        <span class={buttonVariants({ variant: 'link', class: 'ml-auto' })}>
          See details{' '}
          <Icon
            icon="arrow"
            class="size-4"
          />
        </span>
      </div>
    </div>
  </Link>
)

type ExerciseProps = {
  orderIndex: number
} & TodayWorkoutTileProps['workout']['exercises'][number]

const Exercise: Component<ExerciseProps> = props => (
  <div class="flex flex-1 shrink-0 flex-col rounded-xl bg-white px-4 py-3 shadow-sm">
    <div class="inline-flex flex-wrap-reverse items-center gap-x-3">
      <h3 class="text-md line-clamp-1 font-bold text-black/80">
        {props.orderIndex}. {props.name}
      </h3>
      <Badge variant="outline">{props.category.name}</Badge>
    </div>
    <Show when={props.description}>
      {description => (
        <p class="line-clamp-2 text-sm text-black/50">{description()}</p>
      )}
    </Show>
  </div>
)
