import { subMonths } from 'date-fns'
import { getNow } from '~/utils/date'
import type { GetUserWorkoutPlanResponse } from '../types/response'

export type FormExercise = {
  completed: boolean
  notes: string
} & GetUserWorkoutPlanResponse['workouts'][number]['exercises'][number]

export type Form = {
  date: string
  duration: number
  notes: string
  exercises: Array<FormExercise>
}

export const maxDateOfWorkout = getNow()
export const minDateOfWorkout = subMonths(maxDateOfWorkout, 1)
