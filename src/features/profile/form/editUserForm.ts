import { z } from 'zod'

export const editUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters')
})

export type Form = z.infer<typeof editUserSchema>
