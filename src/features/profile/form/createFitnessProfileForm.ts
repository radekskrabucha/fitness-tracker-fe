import { z } from 'zod'
import {
  fitnessProfileActivityLevel,
  fitnessProfileDietaryPreference,
  fitnessProfileFitnessGoal,
  fitnessProfileGender
} from '~/models/profile'
import { getNow } from '~/utils/date'

export const minHeight = 1
export const maxHeight = 300
export const minWeight = 1
export const maxWeight = 300

export const createFitnessProfileSchema = z.object({
  gender: z.enum(fitnessProfileGender, {
    message: 'Gender is required'
  }),
  activityLevel: z.enum(fitnessProfileActivityLevel, {
    message: 'Activity level is required'
  }),
  fitnessGoal: z.enum(fitnessProfileFitnessGoal, {
    message: 'Fitness goal is required'
  }),
  dateOfBirth: z.string({ message: 'Date of birth is required' }),
  height: z
    .string({ message: 'Height is required' })
    .refine(
      value => {
        return Number(value) >= minHeight
      },
      { message: `Height must be greater or equal to ${minHeight}` }
    )
    .refine(
      value => {
        return Number(value) <= maxHeight
      },
      { message: `Height must be less than or equal to ${maxHeight}` }
    ),
  weight: z
    .string({ message: 'Weight is required' })
    .refine(
      value => {
        return Number(value) >= minWeight
      },
      { message: `Weight must be greater or equal to ${minWeight}` }
    )
    .refine(
      value => {
        return Number(value) <= maxWeight
      },
      { message: `Weight must be less than or equal to ${maxWeight}` }
    ),
  dietaryPreference: z.enum(fitnessProfileDietaryPreference).optional()
})

export type Form = z.infer<typeof createFitnessProfileSchema>

export const minDateOfBirthDate = new Date(1900, 0, 1)
export const maxDateOfBirthDate = getNow()
