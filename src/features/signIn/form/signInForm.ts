import { z } from 'zod'

export const emailSchema = z.string().email('Invalid email')
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema
})

export type Form = z.infer<typeof signInSchema>
