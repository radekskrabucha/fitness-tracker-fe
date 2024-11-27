import type {
  WorkoutSessionWithDetails,
  WorkoutSessionWithOverview
} from '~/models/workoutSession'

export type GetUserWorkoutSessionsResponse = Array<WorkoutSessionWithOverview>

export type GetUserWorkoutSessionResponse = WorkoutSessionWithDetails

export type GetUserLatestWorkoutSessionResponse = WorkoutSessionWithOverview
