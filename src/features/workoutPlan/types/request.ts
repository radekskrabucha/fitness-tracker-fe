export type ChooseWorkoutPlanRequest = {
  workoutPlanId: string
  workouts: Workout[]
}
type Workout = {
  id: string
  attributes: WorkoutAttribute[]
  exercises: Exercise[]
}
type WorkoutAttribute = {
  name: string
  value: number | string | boolean
}
type Exercise = {
  id: string
  attributes: ExerciseAttribute[]
}
type ExerciseAttribute = {
  name: string
  value: number
}
