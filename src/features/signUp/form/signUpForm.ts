import {
  createForm,
  email,
  maxLength,
  minLength,
  required
} from '@modular-forms/solid'

export type SignUpForm = {
  email: string
  password: string
  name?: string
}

export const [form, { Form, Field }] = createForm<SignUpForm>({
  initialValues: {
    email: '',
    password: '',
    name: ''
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

export const nameValidation = [
  maxLength(50, 'Name must be at most 50 characters'),
  minLength(2, 'Name must be at least 2 characters')
]
