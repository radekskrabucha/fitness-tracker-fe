import { getValue, reset } from '@modular-forms/solid'
import { createMutation } from '@tanstack/solid-query'
import { Button } from '~/components/Button'
import { LoaderCircle } from '~/components/LoaderCircle'
import { TextInput } from '~/components/TextInput'
import { toast } from '~/components/Toast'
import { changePassword } from '../actions'
import {
  Form,
  Field,
  passwordValidation,
  confirmPasswordValidation,
  newPasswordValidation,
  form
} from '../form/changePasswordForm'

export const ChangePasswordForm = () => {
  const changePasswordMutation = createMutation(() => ({
    mutationFn: changePassword,
    mutationKey: ['changePassword'],
    onSuccess: () => {
      reset(form)
      return toast.show({
        title: 'Password changed successfully!',
        description: 'Your password has been changed successfully.',
        variant: 'success',
        priority: 'high'
      })
    },
    onError: () => {
      return toast.show({
        title: 'Oops! Something went wrong 🤓',
        description: 'Please check your passwords and try again.',
        variant: 'error',
        priority: 'high'
      })
    }
  }))

  return (
    <Form
      onSubmit={values => changePasswordMutation.mutate(values)}
      class="my-auto flex w-full max-w-80 flex-col gap-4 self-center"
    >
      <Field
        name="currentPassword"
        validate={passwordValidation}
      >
        {(field, props) => (
          <TextInput
            label="Current password"
            placeholder=" "
            disabled={changePasswordMutation.isPending}
            {...field}
            {...props}
            type="password"
          />
        )}
      </Field>
      <Field
        name="newPassword"
        validate={newPasswordValidation(
          () => getValue(form, 'currentPassword') || ''
        )}
      >
        {(field, props) => (
          <TextInput
            label="New password"
            placeholder=" "
            disabled={changePasswordMutation.isPending}
            {...field}
            {...props}
            type="password"
          />
        )}
      </Field>
      <Field
        name="confirmPassword"
        validate={confirmPasswordValidation(
          () => getValue(form, 'newPassword') || ''
        )}
      >
        {(field, props) => (
          <TextInput
            label="Confirm password"
            placeholder=" "
            disabled={changePasswordMutation.isPending}
            {...field}
            {...props}
            type="password"
            ref={props.ref}
          />
        )}
      </Field>

      <Button
        type="submit"
        class="mt-8"
        disabled={changePasswordMutation.isPending}
      >
        {changePasswordMutation.isPending && <LoaderCircle />}
        Change password
      </Button>
    </Form>
  )
}
