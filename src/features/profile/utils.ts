import type {
  FitnessProfileGender,
  FitnessProfileActivityLevel,
  FitnessProfileDietaryPreference,
  FitnessProfileFitnessGoal
} from '~/models/profile'

export const genderMap: Record<FitnessProfileGender, string> = {
  male: 'Male',
  female: 'Female',
  other: 'Other',
  prefer_not_to_say: 'Prefer not to say'
}
export const getGenderName = (gender: FitnessProfileGender) => genderMap[gender]

export const activityLevelMap: Record<FitnessProfileActivityLevel, string> = {
  sedentary: 'Sedentary',
  lightly_active: 'Lightly active',
  moderately_active: 'Moderately active',
  very_active: 'Very active',
  extra_active: 'Extra active'
}
export const getActivityLevelName = (
  activityLevel: FitnessProfileActivityLevel
) => activityLevelMap[activityLevel]

export const fitnessGoalMap: Record<FitnessProfileFitnessGoal, string> = {
  lose_weight: 'Lose weight',
  gain_muscle: 'Gain muscle',
  maintain_weight: 'Maintain weight',
  improve_endurance: 'Improve endurance',
  increase_flexibility: 'Increase flexibility'
}
export const getFitnessGoalName = (fitnessGoal: FitnessProfileFitnessGoal) =>
  fitnessGoalMap[fitnessGoal]

export const dietaryPreferenceMap: Record<
  FitnessProfileDietaryPreference,
  string
> = {
  no_preference: 'No preference',
  vegetarian: 'Vegetarian',
  vegan: 'Vegan',
  pescatarian: 'Pescatarian',
  keto: 'Keto',
  paleo: 'Paleo',
  mediterranean: 'Mediterranean'
}
export const getDietaryPreferenceName = (
  dietaryPreference: FitnessProfileDietaryPreference
) => dietaryPreferenceMap[dietaryPreference]
