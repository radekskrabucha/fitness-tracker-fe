import type { ExerciseCategory } from './exerciseCategory'
import type { MuscleGroup } from './muscleGroup'

export type Exercise<T extends ExerciseExtras = ExerciseExtras> = {
  description: string | null
  id: string
  name: string
  createdAt: string
  updatedAt: string
  categoryId: string
} & T

export type ExerciseWithCategory = Exercise<ExerciseExtrasCategory>

export type ExerciseWithDetails = Exercise<
  ExerciseExtrasMuscleGroups & ExerciseExtrasCategory
>

export type ExerciseExtras =
  | (ExerciseExtrasMuscleGroups & ExerciseExtrasCategory)
  | ExerciseExtrasMuscleGroups
  | ExerciseExtrasCategory

export type ExerciseExtrasCategory = {
  category: ExerciseCategory
}
export type ExerciseExtrasMuscleGroups = {
  muscleGroups: Array<MuscleGroup>
}
