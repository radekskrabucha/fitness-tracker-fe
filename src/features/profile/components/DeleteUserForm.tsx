import { useNavigate } from '@solidjs/router'
import { createForm } from '@tanstack/solid-form'
import { createMutation, useQueryClient } from '@tanstack/solid-query'
import { zodValidator, type ZodValidator } from '@tanstack/zod-form-adapter'
import type { Component } from 'solid-js'
import { Button } from '~/components/Button'
import { LoaderCircle } from '~/components/LoaderCircle'
import { TextInput } from '~/components/TextInput'
import { toast } from '~/components/Toast'
import { InternalLink } from '~/config/app'
import { getSessionQueryOptions } from '~/features/signIn/actions'
import { deleteUser, getUserFitnessProfileQueryOptions } from '../actions'
import { deleteUserSchema, type Form } from '../form/deleteUserForm'

type DeleteUserFormProps = {
  userId: string
}

export const DeleteUserForm: Component<DeleteUserFormProps> = props => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const form = createForm<Form, ZodValidator>(() => ({
    onSubmit: ({ value }) => deleteUserMutation.mutate(value),
    validatorAdapter: zodValidator(),
    validators: {
      onChange: deleteUserSchema
    }
  }))
  const deleteUserMutation = createMutation(() => ({
    mutationFn: deleteUser,
    mutationKey: ['deleteUser'],
    onSuccess: async () => {
      navigate(InternalLink.home, { replace: true })
      toast.show({
        title: 'Profile deleted successfully!',
        description: 'Your profile has been deleted successfully.',
        variant: 'success',
        priority: 'high'
      })
      await queryClient.invalidateQueries(
        {
          queryKey: getUserFitnessProfileQueryOptions(props.userId).queryKey,
          exact: true,
          refetchType: 'all'
        },
        { throwOnError: true, cancelRefetch: true }
      )
      await queryClient.invalidateQueries(
        {
          queryKey: getSessionQueryOptions().queryKey,
          exact: true,
          refetchType: 'all'
        },
        { throwOnError: true, cancelRefetch: true }
      )
      form.reset()
    },
    onError: () => {
      return toast.show({
        title: 'Oops! Something went wrong 🤓',
        description: 'Please try again later.',
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
      class="my-auto flex w-full max-w-96 flex-col gap-4 self-center"
    >
      <form.Field name="password">
        {field => (
          <TextInput
            type="password"
            label="Password"
            disabled={deleteUserMutation.isPending}
            id={field().name}
            name={field().name}
            value={field().state.value}
            onBlur={field().handleBlur}
            onChange={field().handleChange}
            error={field().state.meta.errors[0]}
          />
        )}
      </form.Field>
      <Button
        type="submit"
        variant="primaryDanger"
        disabled={deleteUserMutation.isPending}
      >
        {deleteUserMutation.isPending && <LoaderCircle />}
        Delete your profile
      </Button>
    </form>
  )
}
