import { Match, Show, Switch, type Component, type JSXElement } from 'solid-js'
import { Icon } from '~/components/Icon'
import type { WorkoutAttribute } from '~/models/workoutAttributes'
import {
  getWorkoutAttributeDaysOfWeekName,
  getWorkoutAttributeIntensityLevelName,
  getWorkoutAttributeName
} from '../utils'

export const WorkoutAttributeBadge: Component<WorkoutAttribute> = props => (
  <Switch>
    <Match when={props.name === 'days_of_week' && props}>
      {attribute => (
        <Badge
          shouldExpand
          icon={
            <Icon
              icon="calendar"
              class="size-5"
            />
          }
          label={getWorkoutAttributeName(attribute().name)}
          value={getWorkoutAttributeDaysOfWeekName(attribute().value)}
        />
      )}
    </Match>
    <Match when={props.name === 'intensity_level' && props}>
      {attribute => (
        <Badge
          icon={
            <Icon
              icon="speedometer"
              class="size-5"
            />
          }
          label={getWorkoutAttributeName(attribute().name)}
          value={getWorkoutAttributeIntensityLevelName(attribute().value)}
        />
      )}
    </Match>
    <Match
      when={
        (props.name === 'rest_period_between_sets' ||
          props.name === 'duration_goal') &&
        props
      }
    >
      {attribute => (
        <Badge
          icon={
            <Icon
              icon="timer"
              class="size-5"
            />
          }
          label={getWorkoutAttributeName(attribute().name)}
          value={attribute().value}
          unit="min"
        />
      )}
    </Match>
    <Match
      when={
        (props.name === 'cooldown_required' ||
          props.name === 'warmup_required') &&
        props
      }
    >
      {attribute => (
        <Badge
          icon={
            <Icon
              icon="termometer"
              class="size-5"
            />
          }
          label={getWorkoutAttributeName(attribute().name)}
          value={attribute().value ? 'Yes' : 'No'}
        />
      )}
    </Match>
  </Switch>
)

type BadgeProps = {
  icon: JSXElement
  label: JSXElement
  value: JSXElement
  unit?: JSXElement
  shouldExpand?: boolean
}

const Badge: Component<BadgeProps> = props => (
  <div
    class="flex shrink-0 items-center gap-4 rounded-lg bg-white px-4 py-2 shadow-sm max-sm:flex-1"
    classList={{
      'flex-1': props.shouldExpand
    }}
  >
    {props.icon}
    <div class="flex flex-col">
      <span class="text-sm whitespace-nowrap text-black/50">{props.label}</span>
      <h3 class="text-xl font-bold whitespace-nowrap text-black/80">
        {props.value}
        <Show when={props.unit}>
          {unit => <span class="text-sm text-black/50"> {unit()}</span>}
        </Show>
      </h3>
    </div>
  </div>
)
