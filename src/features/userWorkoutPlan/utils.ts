import { getNow, parseToDatePickerFormat } from '~/utils/date'
import type { GetWorkoutPlanResponse } from '../workoutPlan/types/response'
import type { Form } from './form/addWorkoutSessionForm'
import type { AddWorkoutSessionRequest } from './types/request'

type TransformFormToRequestParams = {
  workout: Form
  workoutPlanId: string
  workoutId: string
}

export const transformFormToRequest = ({
  workout: { exercises, notes, ...workout },
  workoutPlanId,
  workoutId
}: TransformFormToRequestParams): AddWorkoutSessionRequest => ({
  workoutPlanId,
  workoutId,
  notes: notes ? notes : undefined,
  ...workout,
  exercises: exercises.map(exercise => ({
    exerciseId: exercise.id,
    completed: exercise.completed,
    notes: exercise.notes ? exercise.notes : undefined,
    attributes: exercise.completed
      ? exercise.attributes.map(attribute => ({
          name: attribute.name,
          value: attribute.value
        }))
      : []
  }))
})

export const workoutToFormDefaultValues = (
  exercises: GetWorkoutPlanResponse['workouts'][number]['exercises']
): Form => ({
  date: parseToDatePickerFormat(getNow()),
  duration: 60,
  notes: '',
  exercises: exercises.map(exercise => ({
    ...exercise,
    completed: false,
    notes: ''
  }))
})
