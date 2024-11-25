import type {
  WorkoutPlanWithWorkouts,
  WorkoutPlanWithWorkoutsWithDetails
} from '~/models/workoutPlan'
import type { ResponseWithPagination } from '~/types/pagination'

export type GetUserWorkoutPlansResponse = ResponseWithPagination<
  Array<WorkoutPlanWithWorkouts>
>

export type GetUserWorkoutPlanResponse = WorkoutPlanWithWorkoutsWithDetails
