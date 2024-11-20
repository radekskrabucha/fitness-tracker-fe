import { z } from 'zod'

export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
export const signInSchema = z.object({
  name: nameSchema
})

export type Form = z.infer<typeof signInSchema>
