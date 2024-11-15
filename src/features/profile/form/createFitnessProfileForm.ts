import { createForm, required, minRange, maxRange } from '@modular-forms/solid'
import type {
  CreateFitnessProfile,
  FitnessProfileDietaryPreference
} from '~/models/profile'

export type CreateFitnessProfileForm = Omit<
  CreateFitnessProfile,
  'height' | 'weight' | 'dietaryPreference' | 'dateOfBirth'
> & {
  dateOfBirth: string
  height: string
  weight: string
  dietaryPreference: FitnessProfileDietaryPreference
}

export const [form, { Form, Field }] = createForm<CreateFitnessProfileForm>({
  initialValues: {
    height: '170',
    weight: '70'
  }
})

export const minHeight = 1
export const maxHeight = 300
export const heightValidation = [
  required('Height is required'),
  minRange(minHeight, 'Height must be at least 1 cm.'),
  maxRange(maxHeight, 'Height must be at most 300 cm.')
]
export const minWeight = 1
export const maxWeight = 300
export const weightValidation = [
  required('Weight is required'),
  minRange(minWeight, 'Weight must be at least 1 kg.'),
  maxRange(maxWeight, 'Weight must be at most 300 kg.')
]
export const genderValidation = [required('Gender is required')]
export const activityLevelValidation = [required('Activity level is required')]
export const fitnessGoalValidation = [required('Fitness goal is required')]

export const minDateOfBirthDate = new Date(1900, 0, 1)
export const maxDateOfBirthDate = new Date()
