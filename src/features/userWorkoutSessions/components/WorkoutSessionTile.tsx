import {
  Show,
  type Component,
  type JSXElement,
  type ParentComponent
} from 'solid-js'
import { Badge } from '~/components/Badge'
import { Card } from '~/components/Card'
import { Icon } from '~/components/Icon'
import { Skeleton } from '~/components/Skeleton'
import { getDisplayDate } from '~/utils/date'
import type { GetUserWorkoutSessionsResponse } from '../types/response'

type WorkoutSessionTileProps = GetUserWorkoutSessionsResponse[number]

export const WorkoutSessionTile: ParentComponent<
  WorkoutSessionTileProps
> = props => (
  <Card
    variant="black"
    class="gap-4 p-0"
  >
    <div class="flex flex-col gap-3 rounded-3xl bg-black/60 p-8 text-white">
      <div class="flex flex-col gap-2">
        <Badge
          variant="white"
          class="w-max"
        >
          {props.workoutPlan.name}
        </Badge>
        <h2 class="line-clamp-2 text-3xl font-bold text-current/80">
          {props.workout.name}
        </h2>
      </div>
      <Show when={props.workout.description}>
        {description => <p class="text-lg text-current/50">{description()}</p>}
      </Show>
    </div>
    <div class="flex flex-col gap-10 p-8">
      <div class="flex flex-row flex-wrap gap-10">
        <WorkoutSessionAttribute
          label="Date"
          value={getDisplayDate(props.date)}
          icon={
            <Icon
              icon="calendar"
              class="size-5"
            />
          }
        />
        <WorkoutSessionAttribute
          label="Duration"
          value={props.duration}
          unit="min"
          icon={
            <Icon
              icon="timer"
              class="size-5"
            />
          }
        />
      </div>
      <Show when={props.notes}>
        {notes => (
          <div class="flex shrink-0 flex-col gap-2 rounded-2xl bg-white px-8 py-3 shadow-sm">
            <h3 class="text-xl font-bold whitespace-nowrap text-black/80">
              Notes
            </h3>
            <p class="text-sm text-black/50">{notes()}</p>
          </div>
        )}
      </Show>
      {props.children}
    </div>
  </Card>
)

type WorkoutSessionAttributeProps = {
  label: JSXElement
  value: JSXElement
  icon: JSXElement
  unit?: JSXElement
}

export const WorkoutSessionAttribute: Component<
  WorkoutSessionAttributeProps
> = props => (
  <div class="flex flex-1 shrink-0 items-center gap-6 rounded-2xl bg-white px-8 py-3 shadow-sm">
    {props.icon}
    <div class="flex flex-col">
      <span class="text-sm text-black/50">{props.label}</span>
      <h3 class="text-xl font-bold whitespace-nowrap text-black/80">
        {props.value}
        <Show when={props.unit}>
          {unit => <span class="text-sm text-black/50"> {unit()}</span>}
        </Show>
      </h3>
    </div>
  </div>
)

export const WorkoutSessionTileSkeleton: ParentComponent = props => (
  <Skeleton class="flex flex-col gap-4 rounded-3xl bg-black/50">
    <Skeleton class="flex flex-col gap-3 rounded-3xl bg-black/50 p-8">
      <Skeleton class="min-h-[26px] max-w-[160px]" />
      <Skeleton class="min-h-[36px] max-w-[180px]" />
      <Skeleton class="min-h-[28px]" />
    </Skeleton>
    <div class="flex flex-col gap-10 p-8">
      <div class="flex flex-row flex-wrap gap-10">
        <WorkoutSessionAttributeSkeleton />
        <WorkoutSessionAttributeSkeleton />
      </div>
      <Skeleton class="min-h-[100px]" />
      {props.children}
    </div>
  </Skeleton>
)

const WorkoutSessionAttributeSkeleton = () => <Skeleton class="min-h-[72px]" />
