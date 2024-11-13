type WorkoutAttributeNameValuePair =
  | {
      attributeName: 'days_of_week'
      value: string
    }
  | {
      attributeName: 'intensity_level'
      value: string
    }
  | {
      attributeName: 'duration_goal'
      value: number
    }
  | {
      attributeName: 'warmup_required'
      value: boolean
    }
  | {
      attributeName: 'cooldown_required'
      value: boolean
    }
  | {
      attributeName: 'rest_period_between_sets'
      value: number
    }

export type WorkoutAttribute = {
  id: string
  createdAt: string
  updatedAt: string
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
