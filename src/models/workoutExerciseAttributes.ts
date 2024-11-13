export type WorkoutExerciseAttribute = {
  id: string
  attributeName: WorkoutExerciseAttributeName
  value: number
  createdAt: string
  updatedAt: string
}

export const WorkoutExerciseAttributeNames = [
  'sets',
  'reps',
  'weight',
  'duration',
  'distance'
] as const
export type WorkoutExerciseAttributeName =
  (typeof WorkoutExerciseAttributeNames)[number]
