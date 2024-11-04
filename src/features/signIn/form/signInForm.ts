import { createForm, email, minLength, required } from '@modular-forms/solid'

export type SignInForm = {
  email: string
  password: string
}

export const [form, { Form, Field }] = createForm<SignInForm>({
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
  required('Message is required'),
  minLength(8, 'Message must be at least 8 characters')
]
