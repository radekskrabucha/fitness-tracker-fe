import type { WorkoutAttributeNameValuePair } from '~/models/workoutAttributes'
import type { WorkoutExerciseAttributeName } from '~/models/workoutExerciseAttributes'

export type ChooseWorkoutPlanRequest = {
  workoutPlanId: string
  workouts: Workout[]
}
type Workout = {
  id: string
  attributes: WorkoutAttribute[]
  exercises: Exercise[]
}
type WorkoutAttribute = WorkoutAttributeNameValuePair
type Exercise = {
  id: string
  attributes: ExerciseAttribute[]
}
type ExerciseAttribute = {
  name: WorkoutExerciseAttributeName
  value: number
}
