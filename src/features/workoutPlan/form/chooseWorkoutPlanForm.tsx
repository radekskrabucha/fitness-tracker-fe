import { createForm } from '@modular-forms/solid'
import type { ChooseWorkoutPlanRequest } from '../types/request'

export type ChooseWorkoutPlanForm = Omit<
  ChooseWorkoutPlanRequest,
  'workoutPlanId'
>

export const useChooseWorkoutPlanForm = (
  initialValues: ChooseWorkoutPlanForm
) => {
  const [form, { Form, Field, FieldArray }] = createForm<ChooseWorkoutPlanForm>(
    {
      initialValues
    }
  )

  return {
    form,
    Form,
    Field,
    FieldArray
  }
}
