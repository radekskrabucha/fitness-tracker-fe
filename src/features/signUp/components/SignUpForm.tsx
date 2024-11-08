import { reset } from '@modular-forms/solid'
import { useNavigate } from '@solidjs/router'
import { createMutation, useQueryClient } from '@tanstack/solid-query'
import { Button } from '~/components/Button'
import { LoaderCircle } from '~/components/LoaderCircle'
import { TextInput } from '~/components/TextInput'
import { toast } from '~/components/Toast'
import { InternalLink } from '~/config/app'
import { getSessionQueryOptions } from '~/features/signIn/actions'
import { getNameFromEmail } from '~/utils/email'
import { signUp } from '../actions'
import {
  Form,
  Field,
  emailValidation,
  passwordValidation,
  form,
  nameValidation
} from '../form/signUpForm'

export const SignUpForm = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const signUpMutation = createMutation(() => ({
    mutationFn: signUp,
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
      navigate(InternalLink.createFitnessProfile, { replace: true })
    },
    onError: () => {
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
          name: values.name
            ? values.name
            : getNameFromEmail(values.email) || values.email
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
            disabled={signUpMutation.isPending}
            {...field}
            {...props}
            type="email"
          />
        )}
      </Field>

      <Field
        name="name"
        validate={nameValidation}
      >
        {(field, props) => (
          <TextInput
            label="Name"
            disabled={signUpMutation.isPending}
            {...field}
            {...props}
            type="text"
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
