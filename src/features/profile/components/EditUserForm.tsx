import { reset } from '@modular-forms/solid'
import { createMutation, useQueryClient } from '@tanstack/solid-query'
import { Button } from '~/components/Button'
import { LoaderCircle } from '~/components/LoaderCircle'
import { TextInput } from '~/components/TextInput'
import { toast } from '~/components/Toast'
import { getSessionQueryOptions } from '~/features/signIn/actions'
import { editUser } from '../actions'
import { Form, Field, nameValidation, form } from '../form/editUserForm'

export const EditUserForm = () => {
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
      reset(form)
      return toast.show({
        title: 'Profile updated successfully!',
        description: 'Your profile has been updated successfully.',
        variant: 'success',
        priority: 'high'
      })
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
      onSubmit={values => editUserMutation.mutate(values)}
      class="my-auto flex w-full max-w-80 flex-col gap-4 self-center"
    >
      <Field
        name="name"
        validate={nameValidation}
      >
        {(field, props) => (
          <TextInput
            label="Name"
            disabled={editUserMutation.isPending}
            {...field}
            {...props}
            type="text"
          />
        )}
      </Field>

      <Button
        type="submit"
        class="mt-8"
        disabled={editUserMutation.isPending}
      >
        {editUserMutation.isPending && <LoaderCircle />}
        Update your profile
      </Button>
    </Form>
  )
}
