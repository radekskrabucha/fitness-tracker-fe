import { useNavigate } from '@solidjs/router'
import { createForm } from '@tanstack/solid-form'
import { createMutation, useQueryClient } from '@tanstack/solid-query'
import { Button } from '~/components/Button'
import { LoaderCircle } from '~/components/LoaderCircle'
import { TextInput } from '~/components/TextInput'
import { toast } from '~/components/Toast'
import { InternalLink } from '~/config/app'
import { getSessionQueryOptions, signInWithEmail } from '../actions'
import { signInSchema } from '../form/signInForm'

export const SignInForm = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const form = createForm(() => ({
    onSubmit: ({ value }) => signInMutation.mutate(value),
    defaultValues: {
      email: '',
      password: ''
    },
    validators: {
      onSubmit: signInSchema
    }
  }))
  const signInMutation = createMutation(() => ({
    mutationFn: signInWithEmail,
    mutationKey: ['signIn'],
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
    <form
      onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      class="flex w-full max-w-96 flex-col gap-4 text-left"
    >
      <form.Field name="email">
        {field => (
          <TextInput
            type="email"
            label="Email"
            disabled={signInMutation.isPending}
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
            disabled={signInMutation.isPending}
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
        disabled={signInMutation.isPending}
      >
        {signInMutation.isPending && <LoaderCircle />}
        Sign in
      </Button>
    </form>
  )
}
