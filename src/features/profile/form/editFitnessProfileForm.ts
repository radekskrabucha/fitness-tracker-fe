import type { z } from 'zod'
import { createFitnessProfileSchema } from './createFitnessProfileForm'

export const editFitnessProfileSchema = createFitnessProfileSchema
export type Form = z.infer<typeof editFitnessProfileSchema>
