import type { Workout } from './workout'
import type { WorkoutPlan } from './workoutPlan'
import type { WorkoutSessionExerciseWithAttributes } from './workoutSessionExercise'

export type WorkoutSession<
  // @ts-expect-error - we use empty object to make it work
  T extends WorkoutSessionExtras = {}
> = {
  id: string
  date: string
  notes: string | undefined
  duration: number
} & T

export type WorkoutSessionWithExtras = WorkoutSession<WorkoutSessionExtras>

export type WorkoutSessionExtraExercises = {
  exercises: Array<WorkoutSessionExerciseWithAttributes>
}
export type WorkoutSessionExtraWorkout = {
  workout: Workout
}
export type WorkoutSessionExtraWorkoutPlan = {
  workoutPlan: WorkoutPlan
}

export type WorkoutSessionExtras = WorkoutSessionExtraExercises &
  WorkoutSessionExtraWorkout &
  WorkoutSessionExtraWorkoutPlan
