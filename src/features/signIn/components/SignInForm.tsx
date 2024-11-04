import { reset } from '@modular-forms/solid'
import { useNavigate } from '@solidjs/router'
import { createMutation } from '@tanstack/solid-query'
import { Button } from '~/components/Button'
import { LoaderCircle } from '~/components/LoaderCircle'
import { TextInput } from '~/components/TextInput'
import { toast } from '~/components/Toast'
import { InternalLink } from '~/config/app'
import { authClient } from '~/lib/auth'
import {
  Form,
  Field,
  emailValidation,
  passwordValidation,
  form
} from '../form/signInForm'

export const SignInForm = () => {
  const navigate = useNavigate()
  const signInMutation = createMutation(() => ({
    mutationFn: authClient.signIn.email,
    mutationKey: ['signIn'],
    onSuccess: () => {
      reset(form)
      navigate(InternalLink.home, { replace: true })
    },
    onError: () => {
      return toast.show({
        title: 'Oops! Something went wrong 🤓',
        description: 'Please check your credentials and try again.',
        variant: 'error',
        priority: 'high'
      })
    }
  }))

  return (
    <Form
      onSubmit={values => signInMutation.mutate(values)}
      class="flex w-full max-w-80 flex-col gap-4"
    >
      <Field
        name="email"
        validate={emailValidation}
      >
        {(field, props) => (
          <TextInput
            label="Email"
            placeholder=" "
            disabled={signInMutation.isPending}
            {...field}
            {...props}
            type="email"
          />
        )}
      </Field>

      <Field
        name="password"
        validate={passwordValidation}
      >
        {(field, props) => (
          <TextInput
            label="Password"
            placeholder=" "
            disabled={signInMutation.isPending}
            {...field}
            {...props}
            type="password"
          />
        )}
      </Field>
      <Button
        type="submit"
        class="mt-8"
        disabled={signInMutation.isPending}
      >
        {signInMutation.isPending && <LoaderCircle class="animate-spin" />}
        Sign in
      </Button>
    </Form>
  )
}
