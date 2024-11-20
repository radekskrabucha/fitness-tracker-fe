import { z } from 'zod'

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string({ message: 'Current password is required' })
      .min(8, {
        message: 'Password must be at least 8 characters long'
      }),
    newPassword: z
      .string({ message: 'New password is required' })
      .min(8, { message: 'New password must be at least 8 characters long' }),
    confirmPassword: z.string({ message: 'Confirm password is required' })
  })
  .refine(data => data.newPassword !== data.currentPassword, {
    message: 'New password must be different from current password',
    path: ['newPassword']
  })
  .refine(data => data.confirmPassword === data.currentPassword, {
    message: 'Confirm password must match current password',
    path: ['confirmPassword']
  })

export type Form = z.infer<typeof changePasswordSchema>
