import { z } from 'zod'

export const emailSchema = z.string().email('Invalid email')
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
export const nameSchema = z.string().optional()
export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema
})

export type Form = z.infer<typeof signUpSchema>
