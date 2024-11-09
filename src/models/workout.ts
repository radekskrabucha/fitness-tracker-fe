import type { WorkoutExercise } from './workoutExercise'

export type Workout<T extends WorkoutExtras = WorkoutExtras> = {
  description: string | null
  id: string
  name: string
  createdAt: string
  updatedAt: string
} & T

export type WorkoutWithOrderIndex = Workout<WorkoutExtras>

export type WorkoutWithExercises<
  E extends WorkoutExercise = WorkoutExercise,
  W extends Workout = Workout
> = W & {
  exercises: Array<E>
}

export type WorkoutExtras = {
  orderIndex: number
}
