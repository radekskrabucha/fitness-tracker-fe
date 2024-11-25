import type { WorkoutWithExercises } from '~/models/workout'
import type { WorkoutPlan } from '~/models/workoutPlan'

type UserTodayWorkout = {
  workoutPlan: WorkoutPlan
  workout: WorkoutWithExercises
}

export type GetUserTodayWorkoutsResponse = Array<UserTodayWorkout>
