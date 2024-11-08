export const workoutPlanDifficultyLevel = [
  'beginner',
  'intermediate',
  'advanced',
  'expert'
] as const
export type WorkoutPlanDifficultyLevel =
  (typeof workoutPlanDifficultyLevel)[number]

export type WorkoutPlan = {
  description: string | null
  id: string
  name: string
  createdAt: string
  updatedAt: string
  difficultyLevel: WorkoutPlanDifficultyLevel
}
