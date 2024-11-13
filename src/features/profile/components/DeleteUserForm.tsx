import { reset } from '@modular-forms/solid'
import { useNavigate } from '@solidjs/router'
import { createMutation, useQueryClient } from '@tanstack/solid-query'
import type { Component } from 'solid-js'
import { Button, buttonVariants } from '~/components/Button'
import { Link } from '~/components/Link'
import { LoaderCircle } from '~/components/LoaderCircle'
import { TextInput } from '~/components/TextInput'
import { toast } from '~/components/Toast'
import { InternalLink } from '~/config/app'
import { getSessionQueryOptions } from '~/features/signIn/actions'
import { deleteUser, getUserFitnessProfileQueryOptions } from '../actions'
import { Form, Field, form, passwordValidation } from '../form/deleteUserForm'

type DeleteUserFormProps = {
  userId: string
}

export const DeleteUserForm: Component<DeleteUserFormProps> = props => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
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
      reset(form)
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
    <Form
      onSubmit={values => deleteUserMutation.mutate(values)}
      class="my-auto flex w-full max-w-96 flex-col gap-4 self-center"
      shouldTouched
      shouldDirty
    >
      <p class="text-center text-lg text-black/50">
        Are you sure you want to delete your account? This action is
        irreversible.
      </p>
      <Field
        name="password"
        validate={passwordValidation}
      >
        {(field, props) => (
          <TextInput
            label="Password"
            disabled={deleteUserMutation.isPending}
            {...field}
            {...props}
            type="text"
          />
        )}
      </Field>
      <Link
        href={InternalLink.profile}
        class={buttonVariants({ variant: 'primary', class: 'mt-8' })}
      >
        Go back
      </Link>

      <Button
        type="submit"
        variant="primaryDanger"
        disabled={deleteUserMutation.isPending}
      >
        {deleteUserMutation.isPending && <LoaderCircle />}
        Delete your profile
      </Button>
    </Form>
  )
}
