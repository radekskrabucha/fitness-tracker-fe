import type { Workout } from './workout'
import type { WorkoutPlan } from './workoutPlan'
import type { WorkoutSessionExerciseWithExtras } from './workoutSessionExercise'

export type WorkoutSession<
  // @ts-expect-error - we use empty object to make it work
  T extends WorkoutSessionExtras = {}
> = {
  id: string
  date: string
  notes: string | undefined
  duration: number
} & T

export type WorkoutSessionWithDetails =
  WorkoutSession<WorkoutSessionExtraDetails>
export type WorkoutSessionWithOverview =
  WorkoutSession<WorkoutSessionExtraOverview>

export type WorkoutSessionExtraExercises = {
  exercises: Array<WorkoutSessionExerciseWithExtras>
}
export type WorkoutSessionExtraWorkout = {
  workout: Workout
}
export type WorkoutSessionExtraWorkoutPlan = {
  workoutPlan: WorkoutPlan
}

export type WorkoutSessionExtraOverview = WorkoutSessionExtraWorkout &
  WorkoutSessionExtraWorkoutPlan
export type WorkoutSessionExtraDetails = WorkoutSessionExtraOverview &
  WorkoutSessionExtraExercises

export type WorkoutSessionExtras =
  | WorkoutSessionExtraDetails
  | WorkoutSessionExtraOverview
