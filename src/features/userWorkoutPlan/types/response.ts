import type {
  WorkoutPlanWithWorkouts,
  WorkoutPlanWithWorkoutsWithDetails
} from '~/models/workoutPlan'

export type GetUserWorkoutPlansResponse = Array<WorkoutPlanWithWorkouts>

export type GetUserWorkoutPlanResponse = WorkoutPlanWithWorkoutsWithDetails
