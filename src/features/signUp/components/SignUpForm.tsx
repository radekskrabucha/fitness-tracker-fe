import { useNavigate } from '@solidjs/router'
import { createForm } from '@tanstack/solid-form'
import { createMutation, useQueryClient } from '@tanstack/solid-query'
import { Button } from '~/components/Button'
import { LoaderCircle } from '~/components/LoaderCircle'
import { TextInput } from '~/components/TextInput'
import { toast } from '~/components/Toast'
import { InternalLink } from '~/config/app'
import { getSessionQueryOptions } from '~/features/signIn/actions'
import { getNameFromEmail } from '~/utils/email'
import { signUp } from '../actions'
import { signUpSchema } from '../form/signUpForm'

export const SignUpForm = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const form = createForm(() => ({
    defaultValues: {
      email: '',
      password: '',
      name: ''
    },
    validators: {
      onSubmit: signUpSchema
    },
    onSubmit: ({ value }) =>
      signUpMutation.mutate({
        ...value,
        name: value.name
          ? value.name
          : getNameFromEmail(value.email) || value.email
      })
  }))
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
      form.reset()
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
    <form
      onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      class="flex w-full max-w-96 flex-col gap-4 text-left"
    >
      <form.Field name="name">
        {field => (
          <TextInput
            type="text"
            label="Name"
            description="Optional"
            disabled={signUpMutation.isPending}
            id={field().name}
            name={field().name}
            value={field().state.value}
            onBlur={field().handleBlur}
            onChange={field().handleChange}
            error={field().state.meta.errors[0]?.message}
          />
        )}
      </form.Field>
      <form.Field name="email">
        {field => (
          <TextInput
            type="email"
            label="Email"
            disabled={signUpMutation.isPending}
            id={field().name}
            name={field().name}
            value={field().state.value}
            onBlur={field().handleBlur}
            onChange={field().handleChange}
            error={field().state.meta.errors[0]?.message}
          />
        )}
      </form.Field>
      <form.Field name="password">
        {field => (
          <TextInput
            type="password"
            label="Password"
            disabled={signUpMutation.isPending}
            id={field().name}
            name={field().name}
            value={field().state.value}
            onBlur={field().handleBlur}
            onChange={field().handleChange}
            error={field().state.meta.errors[0]?.message}
          />
        )}
      </form.Field>

      <Button
        type="submit"
        class="mt-8"
        disabled={signUpMutation.isPending}
      >
        {signUpMutation.isPending && <LoaderCircle />}
        Create account
      </Button>
    </form>
  )
}
