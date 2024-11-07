export type FitnessProfileGender =
  | 'male'
  | 'female'
  | 'other'
  | 'prefer_not_to_say'
export type FitnessProfileActivityLevel =
  | 'sedentary'
  | 'lightly_active'
  | 'moderately_active'
  | 'very_active'
  | 'extra_active'
export type FitnessProfileFitnessGoal =
  | 'lose_weight'
  | 'gain_muscle'
  | 'maintain_weight'
  | 'improve_endurance'
  | 'increase_flexibility'
export type FitnessProfileDietaryPreference =
  | 'no_preference'
  | 'vegetarian'
  | 'vegan'
  | 'pescatarian'
  | 'keto'
  | 'paleo'
  | 'mediterranean'

export type FitnessProfile = {
  id: string
  createdAt: string
  updatedAt: string
  userId: string
  height: number
  weight: number
  age: number
  gender: FitnessProfileGender
  activityLevel: FitnessProfileActivityLevel
  fitnessGoal: FitnessProfileFitnessGoal
  dietaryPreference: FitnessProfileDietaryPreference | null
}
