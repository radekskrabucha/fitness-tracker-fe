import { Index, Show, type Component } from 'solid-js'
import { Badge } from '~/components/Badge'
import { buttonVariants } from '~/components/Button'
import { cardVariants } from '~/components/Card'
import { Icon } from '~/components/Icon'
import { Link } from '~/components/Link'
import type { Workout } from '~/models/workout'
import type { GetWorkoutPlansResponse } from '../types/response'
import { getWorkoutPlanDifficultyName } from '../utils'

type WorkoutPlanCardProps = {
  href: (id: string) => string
} & GetWorkoutPlansResponse[number]

const WORKOUTS_LIMIT = 2

export const WorkoutPlanCard: Component<WorkoutPlanCardProps> = props => (
  <Link
    href={props.href(props.id)}
    class={cardVariants({
      class: 'overflow-hidden !p-0'
    })}
  >
    <div class="flex flex-col gap-3 rounded-3xl bg-black px-8 py-4 text-white">
      <h2 class="line-clamp-2 text-4xl font-bold text-current/80 max-sm:text-3xl">
        {props.name}
      </h2>
      <Show when={props.description}>
        {description => (
          <p class="line-clamp-2 text-current/50">{description()}</p>
        )}
      </Show>
    </div>
    <span class="w-" />
    <div class="mt-auto flex flex-col gap-6 p-8">
      <Show when={getWorkoutPlanDifficultyName(props.difficultyLevel)}>
        {difficultyName => <Badge>{difficultyName()}</Badge>}
      </Show>
      <div class="grid grid-cols-2 gap-4">
        <Index each={props.workouts.slice(0, WORKOUTS_LIMIT)}>
          {workout => <Workout {...workout()} />}
        </Index>
      </div>
      <div class="-mt-2 flex flex-wrap items-center justify-between gap-2">
        <Show when={props.workouts.length > WORKOUTS_LIMIT}>
          <p class="text-sm text-current/50">
            ...and {props.workouts.length - WORKOUTS_LIMIT} more
          </p>
        </Show>
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

type WorkoutProps = GetWorkoutPlansResponse[number]['workouts'][number]

const Workout: Component<WorkoutProps> = props => (
  <div class="flex flex-1 shrink-0 flex-col rounded-xl bg-white px-4 py-3 shadow-sm">
    <h3 class="text-md line-clamp-1 font-bold text-black/80">{props.name}</h3>
    <Show when={props.description}>
      {description => (
        <p class="line-clamp-2 text-sm text-black/50">{description()}</p>
      )}
    </Show>
  </div>
)
