import { z } from 'zod'

export const signUpSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().optional()
})

export type Form = z.infer<typeof signUpSchema>
