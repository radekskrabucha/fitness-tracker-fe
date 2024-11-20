import { z } from 'zod'

export const passwordSchema = z.string().min(1, 'Password is required')
export const deleteUserSchema = z.object({
  password: passwordSchema
})

export type Form = z.infer<typeof deleteUserSchema>
