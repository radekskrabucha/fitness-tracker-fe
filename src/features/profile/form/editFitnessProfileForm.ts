import { createForm, minRange, maxRange } from '@modular-forms/solid'
import type {
  CreateFitnessProfile,
  FitnessProfileDietaryPreference
} from '~/models/profile'
import { getInitialDateValue } from '~/utils/date'
import {
  maxHeight,
  maxWeight,
  minHeight,
  minWeight
} from './createFitnessProfileForm'

export type EditFitnessProfileForm = Partial<
  Omit<
    CreateFitnessProfile,
    'height' | 'weight' | 'dateOfBirth' | 'dietaryPreference'
  > & {
    height: string
    weight: string
    dateOfBirth: string
    dietaryPreference: FitnessProfileDietaryPreference
  }
>

export const useEditFitnessProfileForm = (
  initialValues: CreateFitnessProfile
) => {
  const [form, { Form, Field }] = createForm<EditFitnessProfileForm>({
    initialValues: {
      ...initialValues,
      height: initialValues.height.toString(),
      weight: initialValues.weight.toString(),
      dateOfBirth: getInitialDateValue(initialValues.dateOfBirth),
      dietaryPreference: initialValues.dietaryPreference
        ? initialValues.dietaryPreference
        : undefined
    }
  })

  return {
    form,
    Form,
    Field
  }
}
export const heightValidation = [
  minRange(minHeight, 'Height must be at least 1 cm.'),
  maxRange(maxHeight, 'Height must be at most 300 cm.')
]
export const weightValidation = [
  minRange(minWeight, 'Weight must be at least 1 kg.'),
  maxRange(maxWeight, 'Weight must be at most 300 kg.')
]
