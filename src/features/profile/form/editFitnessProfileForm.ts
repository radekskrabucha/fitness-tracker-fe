import { createForm, minRange, maxRange } from '@modular-forms/solid'
import type {
  CreateFitnessProfile,
  FitnessProfileDietaryPreference
} from '~/models/profile'
import {
  maxAge,
  maxHeight,
  maxWeight,
  minAge,
  minHeight,
  minWeight
} from './createFitnessProfileForm'

export type EditFitnessProfileForm = Partial<
  Omit<
    CreateFitnessProfile,
    'height' | 'weight' | 'age' | 'dietaryPreference'
  > & {
    height: string
    weight: string
    age: string
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
      age: initialValues.age.toString(),
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
export const ageValidation = [
  minRange(minAge, 'Age must be at least 1 year.'),
  maxRange(maxAge, 'Age must be at most 120 years.')
]
