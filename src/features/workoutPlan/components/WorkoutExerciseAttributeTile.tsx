import { Match, Switch, type Component } from 'solid-js'
import { Icon } from '~/components/Icon'
import { Skeleton } from '~/components/Skeleton'
import type { WorkoutExerciseAttribute } from '~/models/workoutExerciseAttributes'
import type { GetWorkoutPlanResponse } from '../types/response'
import { getWorkoutExerciseAttributeName } from '../utils'
import { AttributeBadge } from './AttributeBadge'

type WorkoutExerciseAttributeTile =
  GetWorkoutPlanResponse['workouts'][number]['exercises'][number]['attributes'][number]

export const WorkoutExerciseAttributeTile: Component<
  WorkoutExerciseAttribute
> = props => (
  <Switch>
    <Match when={props.name === 'sets' && props}>
      {attribute => (
        <AttributeBadge
          shouldExpand
          icon={
            <Icon
              icon="repeat"
              class="size-5"
            />
          }
          label={getWorkoutExerciseAttributeName(attribute().name)}
          value={attribute().value}
        />
      )}
    </Match>
    <Match when={props.name === 'reps' && props}>
      {attribute => (
        <AttributeBadge
          shouldExpand
          icon={
            <Icon
              icon="repeat"
              class="size-5 stroke-black"
            />
          }
          label={getWorkoutExerciseAttributeName(attribute().name)}
          value={attribute().value}
        />
      )}
    </Match>
    <Match when={props.name === 'distance' && props}>
      {attribute => (
        <AttributeBadge
          shouldExpand
          icon={
            <Icon
              icon="ruler"
              class="size-5"
            />
          }
          label={getWorkoutExerciseAttributeName(attribute().name)}
          value={attribute().value}
          unit="m"
        />
      )}
    </Match>
    <Match when={props.name === 'duration' && props}>
      {attribute => (
        <AttributeBadge
          shouldExpand
          icon={
            <Icon
              icon="timer"
              class="size-5"
            />
          }
          label={getWorkoutExerciseAttributeName(attribute().name)}
          value={attribute().value}
          unit="min"
        />
      )}
    </Match>
    <Match when={props.name === 'weight' && props}>
      {attribute => (
        <AttributeBadge
          shouldExpand
          icon={
            <Icon
              icon="dumbbell"
              class="size-5"
            />
          }
          label={getWorkoutExerciseAttributeName(attribute().name)}
          value={attribute().value}
          unit="kg"
        />
      )}
    </Match>
  </Switch>
)

export const WorkoutExerciseAttributeTileSkeleton = () => (
  <Skeleton class="min-h-[64px]" />
)
