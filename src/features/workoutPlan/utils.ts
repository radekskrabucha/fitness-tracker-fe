import type {
  WorkoutAttributeDaysOfWeek,
  WorkoutAttributeIntensityLevel,
  WorkoutAttributeName
} from '~/models/workoutAttributes'
import type { WorkoutExerciseAttributeName } from '~/models/workoutExerciseAttributes'

export const workoutAttributeNameMap: Record<WorkoutAttributeName, string> = {
  days_of_week: 'Day of week',
  intensity_level: 'Intensity level',
  duration_goal: 'Duration goal',
  warmup_required: 'Should warmup?',
  cooldown_required: 'Should cooldown?',
  rest_period_between_sets: 'Rest period between sets'
} as const

export const getWorkoutAttributeName = (name: WorkoutAttributeName) =>
  workoutAttributeNameMap[name]

export const workoutAttributeDaysOfWeekMap: Record<
  WorkoutAttributeDaysOfWeek,
  string
> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday'
} as const

export const getWorkoutAttributeDaysOfWeekName = (
  daysOfWeek: WorkoutAttributeDaysOfWeek
) => workoutAttributeDaysOfWeekMap[daysOfWeek]

export const workoutAttributeIntensityLevelMap: Record<
  WorkoutAttributeIntensityLevel,
  string
> = {
  easy: 'Low',
  medium: 'Medium',
  high: 'High'
} as const

export const getWorkoutAttributeIntensityLevelName = (
  intensityLevel: WorkoutAttributeIntensityLevel
) => workoutAttributeIntensityLevelMap[intensityLevel]

export const workoutExerciseAttributeNameMap: Record<
  WorkoutExerciseAttributeName,
  string
> = {
  sets: 'Sets',
  distance: 'Distance',
  duration: 'Duration',
  reps: 'Reps',
  weight: 'Weight'
} as const

export const getWorkoutExerciseAttributeName = (
  name: WorkoutExerciseAttributeName
) => workoutExerciseAttributeNameMap[name]
