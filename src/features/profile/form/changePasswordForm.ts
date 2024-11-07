import { createForm, custom, minLength, required } from '@modular-forms/solid'
import type { Accessor } from 'solid-js'

export type ChangePasswordForm = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export const [form, { Form, Field }] = createForm<ChangePasswordForm>({
  initialValues: {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
})

export const passwordValidation = [
  required('Password is required'),
  minLength(8, 'Password must be at least 8 characters')
]

const validateEqualPassword = (compareValue: Accessor<string>, error: string) =>
  custom(value => value === compareValue(), error)
const validateDifferentPassword = (
  compareValue: Accessor<string>,
  error: string
) => custom(value => value !== compareValue(), error)

export const newPasswordValidation = (compareValue: Accessor<string>) => [
  ...passwordValidation,
  validateDifferentPassword(
    compareValue,
    'New password must be different from the current one'
  )
]
export const confirmPasswordValidation = (compareValue: Accessor<string>) => [
  ...passwordValidation,
  validateEqualPassword(compareValue, 'Passwords must be the same')
]
