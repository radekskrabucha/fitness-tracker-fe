import { createForm, required, minRange, maxRange } from '@modular-forms/solid'
import type {
  CreateFitnessProfile,
  FitnessProfileDietaryPreference
} from '~/models/profile'

export type CreateFitnessProfileForm = Omit<
  CreateFitnessProfile,
  'height' | 'weight' | 'age' | 'dietaryPreference'
> & {
  height: string
  weight: string
  age: string
  dietaryPreference: FitnessProfileDietaryPreference
}

export const [form, { Form, Field }] = createForm<CreateFitnessProfileForm>()

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
export const minAge = 1
export const maxAge = 120
export const ageValidation = [
  required('Age is required'),
  minRange(minAge, 'Age must be at least 1 year.'),
  maxRange(maxAge, 'Age must be at most 120 years.')
]
export const genderValidation = [required('Gender is required')]
export const activityLevelValidation = [required('Activity level is required')]
export const fitnessGoalValidation = [required('Fitness goal is required')]
