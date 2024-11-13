import type {
  WorkoutExtras,
  WorkoutWithAttributesAndExercises
} from './workout'

export const workoutPlanDifficultyLevel = [
  'beginner',
  'intermediate',
  'advanced',
  'expert'
] as const
export type WorkoutPlanDifficultyLevel =
  (typeof workoutPlanDifficultyLevel)[number]

// @ts-expect-error - we use empty object to make it work
export type WorkoutPlan<T extends WorkoutPlanExtras = {}> = {
  id: string
  name: string
  description: string | null
  difficultyLevel: WorkoutPlanDifficultyLevel
  createdAt: string
  updatedAt: string
} & T
export type WorkoutPlanWithWorkouts = WorkoutPlan<
  WorkoutPlanExtraWorkouts<WorkoutWithAttributesAndExercises>
>

export type WorkoutPlanExtras = WorkoutPlanExtraWorkouts

// @ts-expect-error - we use empty object to make it work
export type WorkoutPlanExtraWorkouts<W extends WorkoutExtras = {}> = {
  workouts: Array<W>
}
