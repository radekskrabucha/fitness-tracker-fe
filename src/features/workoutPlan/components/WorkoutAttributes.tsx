import { Index, type Component, createMemo, Show } from 'solid-js'
import type {
  WorkoutAttribute,
  WorkoutAttributeDaysOfWeekValuePair,
  WorkoutAttributeIntensityLevelValuePair
} from '~/models/workoutAttributes'
import { WorkoutAttributeBadge } from './WorkoutAttributeBadge'

type WorkoutAttributesProps = {
  attributes: Array<WorkoutAttribute>
}

type SortedWorkoutAttributes = [
  Array<WorkoutAttribute<WorkoutAttributeDaysOfWeekValuePair>>,
  Array<WorkoutAttribute<WorkoutAttributeIntensityLevelValuePair>>,
  Array<WorkoutAttribute>
]

export const WorkoutAttributes: Component<WorkoutAttributesProps> = props => {
  const sortedAttributes = createMemo(() => {
    return props.attributes.reduce<SortedWorkoutAttributes>(
      ([daysOfWeek, intensityLevel, others], attribute) => {
        if (attribute.name === 'days_of_week') {
          return [daysOfWeek.concat(attribute), intensityLevel, others]
        }
        if (attribute.name === 'intensity_level') {
          return [daysOfWeek, intensityLevel.concat(attribute), others]
        }
        return [daysOfWeek, intensityLevel, others.concat(attribute)]
      },
      [[], [], []] as SortedWorkoutAttributes
    )
  })

  const [daysOfWeek, intensityLevel, others] = sortedAttributes()

  return (
    <div class="my-4 flex flex-col gap-6">
      <Show when={daysOfWeek.length}>
        <div class="flex flex-row flex-wrap gap-6">
          <Index each={daysOfWeek}>
            {attribute => <WorkoutAttributeBadge {...attribute()} />}
          </Index>
        </div>
      </Show>
      <Show when={intensityLevel.length || others.length}>
        <div class="flex flex-row flex-wrap gap-6">
          <Index each={intensityLevel}>
            {attribute => <WorkoutAttributeBadge {...attribute()} />}
          </Index>
          <Index each={others}>
            {attribute => <WorkoutAttributeBadge {...attribute()} />}
          </Index>
        </div>
      </Show>
    </div>
  )
}
