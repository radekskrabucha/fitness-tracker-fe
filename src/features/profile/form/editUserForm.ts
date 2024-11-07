import { createForm, minLength, required } from '@modular-forms/solid'

export type EditUserForm = {
  name: string
}

export const [form, { Form, Field }] = createForm<EditUserForm>({
  initialValues: {
    name: ''
  }
})

export const nameValidation = [
  required('Name is required'),
  minLength(2, 'Name must be at least 2 characters')
]
