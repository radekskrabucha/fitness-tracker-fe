import type { ExerciseWithDetails } from '~/models/exercise'
import type {
  WorkoutWithExercises,
  WorkoutWithOrderIndex
} from '~/models/workout'
import type { WorkoutExerciseWithDetails } from '~/models/workoutExercise'
import type { WorkoutPlanWithWorkouts } from '~/models/workoutPlan'

export type GetWorkoutPlanResponse = WorkoutPlanWithWorkouts<
  WorkoutWithExercises<
    WorkoutExerciseWithDetails<ExerciseWithDetails>,
    WorkoutWithOrderIndex
  >
>
