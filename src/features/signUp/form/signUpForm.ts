import { createForm, email, minLength, required } from '@modular-forms/solid'

export type SignUpForm = {
  email: string
  password: string
}

export const [form, { Form, Field }] = createForm<SignUpForm>({
  initialValues: {
    email: '',
    password: ''
  }
})

export const emailValidation = [
  required('Email is required'),
  email('Email is not valid')
]

export const passwordValidation = [
  required('Password is required'),
  minLength(8, 'Password must be at least 8 characters')
]
