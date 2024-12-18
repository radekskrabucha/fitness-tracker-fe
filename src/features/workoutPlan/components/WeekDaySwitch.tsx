import { createMemo, type Component } from 'solid-js'
import type {
  WorkoutAttribute,
  WorkoutAttributeDaysOfWeek
} from '~/models/workoutAttributes'
import { getWorkoutAttributeDaysOfWeekAbbreviation } from '../utils'

type OnClickCallbackArgs = {
  isSelected: boolean
  dayOfWeek: WorkoutAttributeDaysOfWeek
  index: number
}

type WeekDaySwitchProps = {
  dayOfWeek: WorkoutAttributeDaysOfWeek
  onClick: (args: OnClickCallbackArgs) => void
  attributes: Array<WorkoutAttribute>
  disabled?: boolean
}

export const WeekDaySwitch: Component<WeekDaySwitchProps> = props => {
  const isSelected = createMemo(() => {
    const index = props.attributes.findIndex(
      ({ value }) => value === props.dayOfWeek
    )

    return {
      index,
      isSelected: index !== -1
    }
  })

  return (
    <button
      class="flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/10 p-2 text-xs font-bold text-black shadow-lg transition-colors"
      classList={{
        'bg-white': isSelected().isSelected,
        'bg-white/30': !isSelected().isSelected,
        'opacity-50 !cursor-not-allowed': props.disabled
      }}
      disabled={props.disabled}
      onClick={() =>
        props.onClick({
          isSelected: isSelected().isSelected,
          dayOfWeek: props.dayOfWeek,
          index: isSelected().index
        })
      }
      type="button"
    >
      {getWorkoutAttributeDaysOfWeekAbbreviation(props.dayOfWeek)}
    </button>
  )
}
