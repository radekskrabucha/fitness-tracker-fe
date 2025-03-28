export type WorkoutAttributeNameValuePair =
  | WorkoutAttributeDaysOfWeekValuePair
  | WorkoutAttributeIntensityLevelValuePair
  | {
      name: 'duration_goal'
      value: number
    }
  | {
      name: 'warmup_required'
      value: boolean
    }
  | {
      name: 'cooldown_required'
      value: boolean
    }
  | {
      name: 'rest_period_between_sets'
      value: number
    }
export type WorkoutAttributeDaysOfWeekValuePair = {
  name: 'days_of_week'
  value: WorkoutAttributeDaysOfWeek
}
export type WorkoutAttributeIntensityLevelValuePair = {
  name: 'intensity_level'
  value: WorkoutAttributeIntensityLevel
}

export type WorkoutAttribute<
  T extends WorkoutAttributeNameValuePair = WorkoutAttributeNameValuePair
> = {
  id: string
} & T

export const workoutAttributeNames = [
  'days_of_week',
  'intensity_level',
  'duration_goal',
  'warmup_required',
  'cooldown_required',
  'rest_period_between_sets'
] as const
export type WorkoutAttributeName = (typeof workoutAttributeNames)[number]

export const daysOfWeekOptions = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
] as const
export type WorkoutAttributeDaysOfWeek = (typeof daysOfWeekOptions)[number]

export const intensityLevelOptions = ['easy', 'medium', 'high'] as const
export type WorkoutAttributeIntensityLevel =
  (typeof intensityLevelOptions)[number]
