export const fitnessProfileGender = [
  'male',
  'female',
  'other',
  'prefer_not_to_say'
] as const

export const fitnessProfileActivityLevel = [
  'sedentary',
  'lightly_active',
  'moderately_active',
  'very_active',
  'extra_active'
] as const
export const fitnessProfileFitnessGoal = [
  'lose_weight',
  'gain_muscle',
  'maintain_weight',
  'improve_endurance',
  'increase_flexibility'
] as const
export const fitnessProfileDietaryPreference = [
  'no_preference',
  'vegetarian',
  'vegan',
  'pescatarian',
  'keto',
  'paleo',
  'mediterranean'
] as const

export type FitnessProfileGender = (typeof fitnessProfileGender)[number]
export type FitnessProfileActivityLevel =
  (typeof fitnessProfileActivityLevel)[number]
export type FitnessProfileFitnessGoal =
  (typeof fitnessProfileFitnessGoal)[number]
export type FitnessProfileDietaryPreference =
  (typeof fitnessProfileDietaryPreference)[number]

export type FitnessProfile = {
  userId: string
  height: number
  weight: number
  dateOfBirth: string
  gender: FitnessProfileGender
  activityLevel: FitnessProfileActivityLevel
  fitnessGoal: FitnessProfileFitnessGoal
  dietaryPreference: FitnessProfileDietaryPreference | null
}

export type CreateFitnessProfile = Pick<
  FitnessProfile,
  | 'height'
  | 'weight'
  | 'dateOfBirth'
  | 'gender'
  | 'activityLevel'
  | 'fitnessGoal'
  | 'dietaryPreference'
>
