import { createForm, required } from '@modular-forms/solid'

export type DeleteUserForm = {
  password: string
}

export const passwordValidation = [required('Password is required')]

export const [form, { Form, Field }] = createForm<DeleteUserForm>({
  initialValues: {
    password: ''
  }
})
