import type { ExerciseCategory } from './exerciseCategory'
import type { MuscleGroup } from './muscleGroup'
import type { WorkoutExerciseAttribute } from './workoutExerciseAttributes'

// @ts-expect-error - we use empty object to make it work
export type Exercise<T extends ExerciseExtras = {}> = {
  description: string | null
  id: string
  name: string
} & T

export type ExerciseWithDetails = Exercise<ExerciseExtraDetails>
export type ExerciseWithDetailsAndAttribute = Exercise<
  ExerciseExtraDetails & ExerciseExtraAttributes
>

export type ExerciseExtras =
  | (ExerciseExtraDetails & ExerciseExtraAttributes)
  | ExerciseExtraDetails

export type ExerciseExtraDetails = ExerciseExtraMuscleGroups &
  ExerciseExtraCategory
export type ExerciseExtraCategory = {
  category: ExerciseCategory
}
export type ExerciseExtraMuscleGroups = {
  muscleGroups: Array<MuscleGroup>
}
export type ExerciseExtraAttributes = {
  attributes: Array<WorkoutExerciseAttribute>
  workoutExerciseId: string
}
