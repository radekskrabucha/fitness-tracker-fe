import type {
  WorkoutSessionWithDetails,
  WorkoutSessionWithOverview
} from '~/models/workoutSession'

export type GetUserWorkoutSessionsResponse = Array<WorkoutSessionWithDetails>

export type GetUserWorkoutSessionResponse = WorkoutSessionWithOverview

export type GetUserLatestWorkoutSessionResponse = WorkoutSessionWithOverview
