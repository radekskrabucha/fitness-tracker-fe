import { reset } from '@modular-forms/solid'
import { useNavigate } from '@solidjs/router'
import { createMutation, useQueryClient } from '@tanstack/solid-query'
import { BetterAuthError } from 'better-auth'
import { Button } from '~/components/Button'
import { LoaderCircle } from '~/components/LoaderCircle'
import { TextInput } from '~/components/TextInput'
import { toast } from '~/components/Toast'
import { InternalLink } from '~/config/app'
import { getSessionQueryOptions } from '~/features/signIn/actions'
import { authClient } from '~/lib/auth'
import { getNameFromEmail } from '~/utils/email'
import {
  Form,
  Field,
  emailValidation,
  passwordValidation,
  form
} from '../form/signUpForm'

export const SignUpForm = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const signUpMutation = createMutation(() => ({
    mutationFn: authClient.signUp.email,
    mutationKey: ['signUp'],
    onSuccess: async () => {
      await queryClient.invalidateQueries(
        {
          queryKey: getSessionQueryOptions().queryKey,
          exact: true,
          refetchType: 'all'
        },
        { throwOnError: true, cancelRefetch: true }
      )
      reset(form)
      navigate(InternalLink.home, { replace: true })
    },
    onError: error => {
      console.error(error)
      console.log(error instanceof BetterAuthError)
      return toast.show({
        title: 'Oops! Something went wrong 🤓',
        description: 'Seems like account already exists, please log in.',
        variant: 'error',
        priority: 'high'
      })
    }
  }))

  return (
    <Form
      onSubmit={values =>
        signUpMutation.mutate({
          ...values,
          name: getNameFromEmail(values.email) || values.email
        })
      }
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
            disabled={signUpMutation.isPending}
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
            disabled={signUpMutation.isPending}
            {...field}
            {...props}
            type="password"
          />
        )}
      </Field>
      <Button
        type="submit"
        class="mt-8"
        disabled={signUpMutation.isPending}
      >
        {signUpMutation.isPending && <LoaderCircle />}
        Create account
      </Button>
    </Form>
  )
}
