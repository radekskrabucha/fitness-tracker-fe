import type { Exercise } from './exercise'

export type WorkoutExercise<
  T extends WorkoutExerciseExtras = WorkoutExerciseExtras
> = {
  id: string
  workoutId: string
  exerciseId: string
  orderIndex: number
  createdAt: string
  updatedAt: string
} & T

export type WorkoutExerciseWithDetails<E extends Exercise = Exercise> =
  WorkoutExercise<WorkoutExerciseExtrasDetails<E>>
export type WorkoutExerciseWithAttributes =
  WorkoutExercise<WorkoutExerciseExtrasAttributes>
export type WorkoutExerciseWithDetailsAndAttributes<
  E extends Exercise = Exercise
> = WorkoutExercise<
  WorkoutExerciseExtrasDetails<E> & WorkoutExerciseExtrasAttributes
>

export const WorkoutExerciseAttributeNames = [
  'sets',
  'reps',
  'weight',
  'duration',
  'distance'
] as const
export type WorkoutExerciseAttributeName =
  (typeof WorkoutExerciseAttributeNames)[number]

export type WorkoutExerciseAttribute = {
  id: string
  createdAt: string
  updatedAt: string
  value: number
  userId: string
  workoutExerciseId: string
  attributeName: WorkoutExerciseAttributeName
}

export type WorkoutExerciseExtras =
  | (WorkoutExerciseExtrasDetails & WorkoutExerciseExtrasAttributes)
  | WorkoutExerciseExtrasAttributes
  | WorkoutExerciseExtrasDetails
export type WorkoutExerciseExtrasDetails<E extends Exercise = Exercise> = {
  details: E
}

export type WorkoutExerciseExtrasAttributes = {
  attributes: Array<WorkoutExerciseAttribute>
}
