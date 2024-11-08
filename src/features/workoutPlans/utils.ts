import type { WorkoutPlanDifficultyLevel } from '~/models/workoutPlan'

export const workoutPlanDifficultyMap: Record<
  WorkoutPlanDifficultyLevel,
  string
> = {
  advanced: 'Advanced',
  intermediate: 'Intermediate',
  beginner: 'Beginner',
  expert: 'Expert'
}

export const getWorkoutPlanDifficultyName = (
  difficulty: WorkoutPlanDifficultyLevel
) => workoutPlanDifficultyMap[difficulty]
