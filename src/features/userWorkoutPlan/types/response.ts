import type {
  WorkoutPlanWithWorkouts,
  WorkoutPlanWithWorkoutsWithDetails
} from '~/models/workoutPlan'
import type { WorkoutSession } from '~/models/workoutSession'
import type { ResponseWithPagination } from '~/types/pagination'

export type GetUserWorkoutPlansResponse = ResponseWithPagination<
  Array<WorkoutPlanWithWorkouts>
>

export type GetUserWorkoutPlanResponse = WorkoutPlanWithWorkoutsWithDetails

export type AddWorkoutSessionResponse = WorkoutSession
