import type { WorkoutExerciseAttribute } from './workoutExerciseAttributes'

export type WorkoutSessionExercise<
  // @ts-expect-error - we use empty object to make it work
  T extends WorkoutSessionExerciseExtras = {}
> = {
  id: string
  notes: string | undefined
  completed: boolean | undefined
} & T
export type WorkoutSessionExerciseWithAttributes =
  WorkoutSessionExercise<WorkoutSessionExerciseExtraAttributes>

export type WorkoutSessionExerciseExtraAttributes = {
  attributes: Array<WorkoutExerciseAttribute>
}

export type WorkoutSessionExerciseExtras = WorkoutSessionExerciseExtraAttributes
