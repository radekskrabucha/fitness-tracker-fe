import type { WorkoutExerciseAttributeName } from '~/models/workoutExerciseAttributes'

export type AddWorkoutSessionRequest = {
  workoutPlanId: string
  workoutId: string
  duration: number
  date: string
  notes: string | undefined
  exercises: Array<Exercise>
}

type Exercise = {
  exerciseId: string
  notes: string | undefined
  completed: boolean | undefined
  attributes: Array<ExerciseAttribute>
}
type ExerciseAttribute = {
  name: WorkoutExerciseAttributeName
  value: number
}
