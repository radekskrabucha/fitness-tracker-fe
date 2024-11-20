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
import { editUser } from '../actions'
import { editUserSchema, type Form } from '../form/editUserForm'

type EditUserFormProps = {
  initialValues: Form
}

export const EditUserForm: Component<EditUserFormProps> = props => {
  const navigate = useNavigate()
  const form = createForm<Form, ZodValidator>(() => ({
    defaultValues: props.initialValues,
    onSubmit: ({ value }) => editUserMutation.mutate(value),
    validatorAdapter: zodValidator(),
    validators: {
      onChange: editUserSchema
    }
  }))
  const queryClient = useQueryClient()
  const editUserMutation = createMutation(() => ({
    mutationFn: editUser,
    mutationKey: ['editUser'],
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
      toast.show({
        title: 'Profile updated successfully!',
        description: 'Your profile has been updated successfully.',
        variant: 'success',
        priority: 'high'
      })
      navigate(InternalLink.profile)
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
        if (form.state.isDirty) {
          form.handleSubmit()
        }
      }}
      class="my-auto flex w-full max-w-96 flex-col gap-4 self-center"
    >
      <form.Field name="name">
        {field => (
          <TextInput
            label="Name"
            disabled={editUserMutation.isPending}
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
        class="mt-8"
        disabled={editUserMutation.isPending}
      >
        {editUserMutation.isPending && <LoaderCircle />}
        Update your profile
      </Button>
    </form>
  )
}
