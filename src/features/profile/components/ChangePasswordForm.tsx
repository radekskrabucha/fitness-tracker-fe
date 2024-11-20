import { useNavigate } from '@solidjs/router'
import { createForm } from '@tanstack/solid-form'
import { createMutation } from '@tanstack/solid-query'
import { zodValidator, type ZodValidator } from '@tanstack/zod-form-adapter'
import { Button } from '~/components/Button'
import { LoaderCircle } from '~/components/LoaderCircle'
import { TextInput } from '~/components/TextInput'
import { toast } from '~/components/Toast'
import { InternalLink } from '~/config/app'
import { changePassword } from '../actions'
import { changePasswordSchema, type Form } from '../form/changePasswordForm'

export const ChangePasswordForm = () => {
  const navigate = useNavigate()
  const form = createForm<Form, ZodValidator>(() => ({
    onSubmit: ({ value }) => changePasswordMutation.mutate(value),
    validatorAdapter: zodValidator(),
    validators: {
      onSubmit: changePasswordSchema
    }
  }))
  const changePasswordMutation = createMutation(() => ({
    mutationFn: changePassword,
    mutationKey: ['changePassword'],
    onSuccess: async () => {
      form.reset()
      toast.show({
        title: 'Password changed successfully!',
        description: 'Your password has been changed successfully.',
        variant: 'success',
        priority: 'high'
      })
      navigate(InternalLink.profile)
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
    <form
      onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      class="my-auto flex w-full max-w-96 flex-col gap-4 self-center"
    >
      <form.Field name="currentPassword">
        {field => (
          <TextInput
            type="password"
            label="Current password"
            disabled={changePasswordMutation.isPending}
            id={field().name}
            name={field().name}
            value={field().state.value}
            onBlur={field().handleBlur}
            onChange={field().handleChange}
            error={field().state.meta.errors[0]}
          />
        )}
      </form.Field>
      <form.Field name="confirmPassword">
        {field => (
          <TextInput
            type="password"
            label="Confirm password"
            disabled={changePasswordMutation.isPending}
            id={field().name}
            name={field().name}
            value={field().state.value}
            onBlur={field().handleBlur}
            onChange={field().handleChange}
            error={field().state.meta.errors[0]}
          />
        )}
      </form.Field>
      <form.Field name="newPassword">
        {field => (
          <TextInput
            type="password"
            label="New password"
            disabled={changePasswordMutation.isPending}
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
        disabled={changePasswordMutation.isPending}
      >
        {changePasswordMutation.isPending && <LoaderCircle />}
        Change password
      </Button>
    </form>
    // <Form
    //   onSubmit={values => changePasswordMutation.mutate(values)}
    //   class="my-auto flex w-full max-w-96 flex-col gap-4 self-center"
    // >
    //   <Field
    //     name="currentPassword"
    //     validate={passwordValidation}
    //   >
    //     {(field, props) => (
    //       <TextInput
    //         label="Current password"
    //         disabled={changePasswordMutation.isPending}
    //         {...field}
    //         {...props}
    //         type="password"
    //       />
    //     )}
    //   </Field>
    //   <Field
    //     name="newPassword"
    //     validate={newPasswordValidation(
    //       () => getValue(form, 'currentPassword') || ''
    //     )}
    //   >
    //     {(field, props) => (
    //       <TextInput
    //         label="New password"
    //         disabled={changePasswordMutation.isPending}
    //         {...field}
    //         {...props}
    //         type="password"
    //       />
    //     )}
    //   </Field>
    //   <Field
    //     name="confirmPassword"
    //     validate={confirmPasswordValidation(
    //       () => getValue(form, 'newPassword') || ''
    //     )}
    //   >
    //     {(field, props) => (
    //       <TextInput
    //         label="Confirm password"
    //         disabled={changePasswordMutation.isPending}
    //         {...field}
    //         {...props}
    //         type="password"
    //         ref={props.ref}
    //       />
    //     )}
    //   </Field>

    // </Form>
  )
}
