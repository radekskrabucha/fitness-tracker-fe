import { createForm, minLength, required } from '@modular-forms/solid'

export type EditUserForm = {
  name: string
}

export const nameValidation = [
  required('Name is required'),
  minLength(2, 'Name must be at least 2 characters')
]

export const useEditUserForm = (initialValues: EditUserForm) => {
  const [form, { Form, Field }] = createForm<EditUserForm>({
    initialValues: initialValues
  })

  return {
    form,
    Form,
    Field
  }
}
