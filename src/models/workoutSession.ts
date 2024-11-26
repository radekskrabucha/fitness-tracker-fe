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

export type WorkoutSessionExtraExercises = {
  exercises: Array<WorkoutSessionExerciseWithAttributes>
}

export type WorkoutSessionExtras = WorkoutSessionExtraExercises
