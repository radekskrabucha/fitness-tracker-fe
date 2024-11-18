type WorkoutAttributeNameValuePair =
  | {
      name: 'days_of_week'
      value: string
    }
  | {
      name: 'intensity_level'
      value: string
    }
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

export type WorkoutAttribute = {
  id: string
} & WorkoutAttributeNameValuePair

export const WorkoutAttributeNames = [
  'days_of_week',
  'intensity_level',
  'duration_goal',
  'warmup_required',
  'cooldown_required',
  'rest_period_between_sets'
] as const
export type WorkoutAttributeName = (typeof WorkoutAttributeNames)[number]
