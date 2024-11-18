export type WorkoutExerciseAttribute = {
  id: string
  name: WorkoutExerciseAttributeName
  value: number
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
