import type {
  ExerciseExtras,
  ExerciseWithDetails,
  ExerciseWithDetailsAndAttribute
} from './exercise'
import type { WorkoutAttribute } from './workoutAttributes'

// @ts-expect-error - we use empty object to make it work
export type Workout<T extends WorkoutExtras = {}> = {
  id: string
  name: string
  description: string | null
} & T
export type WorkoutWithExercises = Workout<
  WorkoutExtraExercises<ExerciseWithDetails>
>
export type WorkoutWithAttributesAndExercises = Workout<
  WorkoutExtraAttributes &
    WorkoutExtraExercises<ExerciseWithDetailsAndAttribute>
>

export type WorkoutExtras =
  | (WorkoutExtraExercises & WorkoutExtraAttributes)
  | WorkoutExtraExercises

// @ts-expect-error - we use empty object to make it work
export type WorkoutExtraExercises<E extends ExerciseExtras = {}> = {
  exercises: Array<E>
}
export type WorkoutExtraAttributes = {
  attributes: Array<WorkoutAttribute>
}
