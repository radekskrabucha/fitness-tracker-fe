import type {
  WorkoutAttributeDaysOfWeek,
  WorkoutAttributeIntensityLevel,
  WorkoutAttributeName,
  WorkoutAttributeNameValuePair
} from '~/models/workoutAttributes'
import type { WorkoutExerciseAttributeName } from '~/models/workoutExerciseAttributes'
import type { Form } from './form/chooseWorkoutPlanForm'

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
export const workoutAttributeDaysOfWeekAbbreviationMap: Record<
  WorkoutAttributeDaysOfWeek,
  string
> = {
  monday: 'M',
  tuesday: 'T',
  wednesday: 'W',
  thursday: 'T',
  friday: 'F',
  saturday: 'S',
  sunday: 'S'
} as const

export const getWorkoutAttributeDaysOfWeekName = (
  daysOfWeek: WorkoutAttributeDaysOfWeek
) => workoutAttributeDaysOfWeekMap[daysOfWeek]
export const getWorkoutAttributeDaysOfWeekAbbreviation = (
  daysOfWeek: WorkoutAttributeDaysOfWeek
) => workoutAttributeDaysOfWeekAbbreviationMap[daysOfWeek]

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

export const transformFormToRequest = (workoutPlan: Form) => ({
  workouts: workoutPlan.workouts.map(workout => ({
    id: workout.id,
    attributes: workout.attributes.map(attribute => ({
      name: attribute.name,
      value: attribute.value
    })) as Array<WorkoutAttributeNameValuePair>,
    exercises: workout.exercises.map(exercise => ({
      id: exercise.workoutExerciseId,
      attributes: exercise.attributes.map(attribute => ({
        name: attribute.name,
        value: attribute.value
      }))
    }))
  }))
})
