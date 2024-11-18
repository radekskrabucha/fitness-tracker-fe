import { Match, Switch, type Component } from 'solid-js'
import { Icon } from '~/components/Icon'
import type { WorkoutAttribute } from '~/models/workoutAttributes'
import {
  getWorkoutAttributeDaysOfWeekName,
  getWorkoutAttributeIntensityLevelName,
  getWorkoutAttributeName
} from '../utils'
import { AttributeBadge } from './AttributeBadge'

export const WorkoutAttributeBadge: Component<WorkoutAttribute> = props => (
  <Switch>
    <Match when={props.name === 'days_of_week' && props}>
      {attribute => (
        <AttributeBadge
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
        <AttributeBadge
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
        <AttributeBadge
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
        <AttributeBadge
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
